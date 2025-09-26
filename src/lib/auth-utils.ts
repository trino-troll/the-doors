import bcrypt from 'bcrypt';

// Хэширование пароля
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
}

// Проверка пароля
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
