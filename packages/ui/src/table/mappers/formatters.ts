import { t } from '@repo/i18n';
import moment from 'moment-jalaali';

export const formatters = {
        number: (value: any) => {
                const num = Number(value);
                if (isNaN(num)) return t('noData');
                return num.toLocaleString('fa-IR');
        },

        currency: (value: any) => {
                const num = Number(value);
                if (isNaN(num)) return t('noData');
                return `${num.toLocaleString('fa-IR')}`;
        },

        percent: (value: any) => {
                const num = Number(value);
                if (isNaN(num)) return t('noData');
                return `${num.toLocaleString('fa-IR')}٪`;
        },

        date: (value: any) => {
                if (!value) return t('noData');
                const dateStr = String(value).replace(/\D/g, '');
                if (dateStr.length === 8) {
                        return `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
                }
                return value;
        },

        // فرمتر جدید: تاریخ شمسی
        shamsiDate: (value: any) => {
                if (!value) return t('noData');

                const dateStr = value.toString();

                // فرمت YYYYMMDD
                if (dateStr.length === 8 && /^\d+$/.test(dateStr)) {
                        const year = dateStr.substring(0, 4);
                        const month = dateStr.substring(4, 6);
                        const day = dateStr.substring(6, 8);
                        return `${year}/${month}/${day}`;
                }

                // فرمت YYYY/MM/DD
                if (dateStr.includes('/')) return dateStr;

                // تلاش با moment
                const parsed = moment(dateStr, 'jYYYYjMMjDD');
                return parsed.isValid() ? parsed.format('jYYYY/jMM/jDD') : dateStr;
        },

        // فرمتر جدید: شماره کارت (اصلاح شده با ۴ رقم آخر در راست)
        cardNumber: (value: any) => {
                if (!value) return t('noData');

                let cleanCardNo = value.toString().replace(/-/g, '');

                // حذف همه کاراکترهای غیر عددی
                cleanCardNo = cleanCardNo.replace(/\D/g, '');

                if (cleanCardNo.length === 16) {
                        // ۴ رقم آخر
                        const last4Digits = cleanCardNo.slice(-4);
                        // ۱۲ رقم اول
                        const first12Digits = cleanCardNo.slice(0, 12);
                        // فرمت کردن ۱۲ رقم اول به صورت ۴-۴-۴
                        const formattedFirstPart = first12Digits.match(/.{1,4}/g)?.join('-') || first12Digits;

                        // برگرداندن به صورت: ۱۲ رقم فرمت شده + ۴ رقم آخر
                        return `${formattedFirstPart} ${last4Digits}`;
                }

                // اگر طول کمتر یا بیشتر بود، فقط خط تیره بزن
                return cleanCardNo.replace(/(\d{4})(?=\d)/g, '$1-');
        },

        // فرمتر جدید: قیمت با ریال
        priceWithRial: (value: any) => {
                const num = Number(value);
                if (isNaN(num)) return t('noData');
                return `${num.toLocaleString('fa-IR')} ${t('rial')}`;
        },

        uppercase: (value: any) => {
                if (!value) return t('noData');
                return String(value).toUpperCase();
        },

        lowercase: (value: any) => {
                if (!value) return t('noData');
                return String(value).toLowerCase();
        },

        mobile: (value: any) => {
                if (!value) return t('noData');
                return String(value);
        },
};