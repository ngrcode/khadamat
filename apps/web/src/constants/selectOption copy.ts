import moment from 'moment-jalaali';

export const IsActive = [
        { value: true, label: 'فعال' },
        { value: false, label: 'غیر فعال' },
];

export const IsActiveDeactive = [
        { value: 1, label: 'فعال' },
        { value: 0, label: 'غیر فعال' },
];

export const Provinces = [
        'تهران',
        'مشهد',
        'اصفهان',
        'شیراز',
        'تبریز',
        'اهواز',
        'کرج',
        'قم',
        'کرمانشاه',
        'ارومیه',
        'رشت',
        'زنجان',
        'همدان',
        'ساری',
        'کرمان',
        'یزد',
        'بوشهر',
        'بندرعباس',
        'اراک',
        'سنندج',
        'بیرجند',
        'شهرکرد',
        'یاسوج',
        'بجنورد',
        'گرگان',
        'ایلام',
        'خرم‌آباد',
        'سمنان',
        'زاهدان',
];

export const degreeEducationOptions = [
        { value: 'ابتدایی', label: 'ابتدایی' },
        { value: 'راهنمایی', label: 'راهنمایی' },
        { value: 'دبیرستان', label: 'دبیرستان' },
        { value: 'دیپلم', label: 'دیپلم' },
        { value: 'پیش دانشگاهی', label: 'پیش دانشگاهی' },
        { value: 'کاردانی', label: 'کاردانی' },
        { value: 'کارشناسی', label: 'کارشناسی' },
        { value: 'کارشناسی ارشد', label: 'کارشناسی ارشد' },
        { value: 'دکتری تخصصی', label: 'دکتری تخصصی' },
        { value: 'دکتری حرفه‌ای', label: 'دکتری حرفه‌ای' },
];

export const monthOptions = [
        { value: 'فروردین', label: 'فروردین' },
        { value: 'اردیبهشت', label: 'اردیبهشت' },
        { value: 'خرداد', label: 'خرداد' },
        { value: 'تیر', label: 'تیر' },
        { value: 'مرداد', label: 'مرداد' },
        { value: 'شهریور', label: 'شهریور' },
        { value: 'مهر', label: 'مهر' },
        { value: 'آبان', label: 'آبان' },
        { value: 'آذر', label: 'آذر' },
        { value: 'دی', label: 'دی' },
        { value: 'بهمن', label: 'بهمن' },
        { value: 'اسفند', label: 'اسفند' },
];

export const currentJalaliYear = Number(moment().format('jYYYY'));

export const yearOptions = Array.from(
        { length: currentJalaliYear - 1390 + 1 },
        (_, index) => {
                const year = 1390 + index;

                return {
                        value: String(year),
                        label: String(year),
                };
        }
);