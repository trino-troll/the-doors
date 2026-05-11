import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';

// опция скрывает лог о количестве загруженных сообщений
dotenv.config({ quiet: true });

const wss = new WebSocketServer({ port: +process.env.NEXT_PUBLIC_WSS_PORT! });
const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
    // запись в логи, подключение клиента
    //? Сделать запись конкретного пользователя
    console.log(
        `${new Date().toLocaleString()} Подключение нового пользователя...`,
    );
    clients.add(ws);

    // Приветствие каждого пользователя в чате
    ws.send(
        JSON.stringify({
            type: 'system',
            message: 'Добро пожаловать',
            userId: '-1',
            name: 'The old Troll',
        }),
    );

    ws.on('message', (data) => {
        const message = data.toString();
        console.log('Получено', message);

        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    //логирование отключения
    //? Сделать запись кто и из какого чата отлючается
    ws.on('close', () => {
        console.log(
            `${new Date().toLocaleString()} Пользователь отключился от чата...`,
        );
    });

    ws.on('error', (error) => {
        console.log('Ошибка ws:', error.message);
    });
});

console.log(
    `Сервер запущен на ws:${process.env.NEXT_PUBLIC_WSS_URL}:${process.env.NEXT_PUBLIC_WSS_PORT}`,
);
