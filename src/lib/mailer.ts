import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true, // true для порта 465
    auth: {
        user: 'verify-code@the-old-troll.ru',
        pass: '3vJWwu3Ha&41',
    },
});

export async function SendEmail({
    email,
    code,
}: {
    email: string;
    code: string;
}) {
    try {
        const info = await transport.sendMail({
            from: 'Ваш Сервис the-old-troll',
            to: email,
            subject: 'Код подтверждения',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Ваш код подтверждения</h2>
          <p>Используйте этот код для завершения регистрации:</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #007bff;">${code}</span>
          </div>
          <p>Код действителен в течение 10 минут.</p>
          <p style="color: #666; font-size: 12px;">Если вы не запрашивали этот код, проигнорируйте это письмо.</p>
        </div>
      `,
            // Текстовая версия для старых клиентов
            text: `Ваш код подтверждения: ${code}\nКод действителен 10 минут.`,
        });

        console.log(
            new Date().toLocaleString(),
            `Письмо отправлено ${info.messageId}`,
        );
        return { succes: true, messageId: info.messageId };
    } catch (error) {
        console.log(
            new Date().toLocaleString(),
            ' Произошла ошибкпи при отправке писма',
            error,
        );
        return { succes: false, error };
    }
}
