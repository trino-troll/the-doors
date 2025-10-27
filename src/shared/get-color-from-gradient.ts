// Вспомогательная функция для извлечения основного цвета из градиента
export const getColorFromGradient = (gradient: string): string => {
    const match = gradient.match(/#[a-fA-F0-9]{6}/);
    return match ? match[0] : '#ff6b6b';
};
