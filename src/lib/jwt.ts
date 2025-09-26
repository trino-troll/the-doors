import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

// Генерация токена
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}

// Проверка токена
export function verifyToken(token: string): { userId: string } {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
        throw new Error('Invalid token');
    }
}
