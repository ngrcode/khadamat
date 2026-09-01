import crypto from 'crypto';

// کلید 256 بیتی برای AES-256 (برای امنیت، باید این کلید را در محیط ذخیره کنید)
const secretKey = crypto.randomBytes(32); // این فقط برای مثال است، بهتر است از .env استفاده کنید

// بردار اولیه (IV) 16 بایتی برای AES
const iv = crypto.randomBytes(16);

// تابع رمزنگاری با استفاده از AES-256-CBC
export const encrypt = (text) => {
        const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return { iv: iv.toString('hex'), encryptedData: encrypted };
};

// تابع رمزگشایی با استفاده از AES-256-CBC
export const decrypt = (encryptedText, ivHex) => {
        const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(ivHex, 'hex'));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
};
