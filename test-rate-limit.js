import { register } from 'ts-node';
register({ transpileOnly: true });

import { RateLimiter } from './src/lib/rate-limiter.ts';

async function testRateLimit() {
    const testIP = '192.168.1.100';

    console.log('🧪 Тестируем rate limiting...');

    // Симуляция 6 запросов подряд (лимит 5 в час)
    for (let i = 1; i <= 7; i++) {
        const result = await RateLimiter.check(testIP, 'verify_code');
        console.log(
            `Запрос ${i}: ${result.allowed ? '✅' : '❌'} (осталось: ${result.remaining})`,
        );

        if (!result.allowed) {
            console.log(`⏳ Блокировка на ${result.retryAfter} сек`);
            break;
        }
    }

    // Сброс для тестов
    await RateLimiter.reset(testIP);
    console.log('✅ Тест завершен, лимиты сброшены');
}

testRateLimit();
