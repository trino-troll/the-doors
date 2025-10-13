'use server';

import { getNameIncommingDoors } from './actions';

export async function askHuggingFace(question: string) {
    try {
        // Сначала получаем контекст из БД если нужно
        const dbContext = await getRelevantDoorsData(question);

        const response = await fetch(
            'https://router.huggingface.co/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'moonshotai/Kimi-K2-Instruct-0905',
                    messages: [
                        {
                            role: 'system',
                            content: `Ты помощник по продаже дверей. У тебя есть доступ к базе данных дверей.                            
                            Если вопрос не о дверях - вежливо откажись отвечать и предложи помощь с подбором дверей.
                             
                             Схема данных входных дверей:
                             - name: название
                             - description: описание
                             - size: размер
                             - opening: направление открытия (LEFT/RIGHT)
                             - color: цвет
                             - innerPanelColor: цвет внутренней панели
                             - count: количество в наличии
                             - protivosem: противосъем (true/false)
                             - porog: порог (true/false)
                             
                             Данные из БД: ${JSON.stringify(dbContext)}
                             
                             Отвечай на вопросы используя эти данные. Если данных недостаточно - скажи об этом.`,
                        },
                        {
                            role: 'user',
                            content: question,
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const completion = await response.json();
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Функция для получения релевантных данных из БД
async function getRelevantDoorsData(question: string) {
    try {
        // Парсим вопрос и определяем какие данные нужны
        const filters = await parseQuestionForFilters(question);

        const response = await fetch(
            `${process.env.PUBLIC_URL}/api/doors?${new URLSearchParams(
                filters
            )}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch doors data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching doors data:', error);
        return []; // возвращаем пустой массив если ошибка
    }
}

// Парсим вопрос пользователя для определения фильтров
async function parseQuestionForFilters(
    question: string
): Promise<Record<string, string>> {
    const filters: Record<string, string> = {};
    const lowerQuestion = question.toLowerCase();

    const arrNameIncommingDoors = await getNameIncommingDoors();

    const doorModels: string[] = [];
    arrNameIncommingDoors.map((item) => {
        doorModels.push(item.name);
    });

    let foundModel = '';
    for (const model of doorModels) {
        if (
            lowerQuestion.includes(model.toLowerCase()) &&
            model.length > foundModel.length
        ) {
            foundModel = model;
        }
    }
    if (foundModel) filters.name = foundModel;

    // Дополнительные паттерны для цифровых моделей
    if (!filters.name) {
        const tdMatch = question.match(/td[-\s]?(\d+)/i);
        if (tdMatch) {
            filters.name = `TD${tdMatch[1]}`;
        }

        const proRabMatch = question.match(/прораб[-\s]?(\d+)/i);
        if (proRabMatch) {
            filters.name = `Прораб ${proRabMatch[1]}`;
        }
    }

    // Остальные фильтры...
    const colors = [
        'белый',
        'черный',
        'коричневый',
        'серый',
        'дуб',
        'орех',
        'капучино',
        'ривьера айс',
        'клен айс',
        'венге',
        'бетон',
        'снежный',
        'бежевый',
        'графит',
        'эмалит',
        'пепельный',
        'рустик',
        'ясень',
        'лиственница',
    ];
    const foundColor = colors.find((color) => lowerQuestion.includes(color));
    if (foundColor) filters.color = foundColor;

    const sizeMatch = question.match(/\d{2,3}[xх]\d{2,3}/);
    if (sizeMatch) filters.size = sizeMatch[0];

    if (lowerQuestion.includes('левое') || lowerQuestion.includes('левую'))
        filters.opening = 'LEFT';
    if (lowerQuestion.includes('правое') || lowerQuestion.includes('правую'))
        filters.opening = 'RIGHT';

    return filters;
}
