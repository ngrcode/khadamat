import moment from 'moment-jalaali';

export const IsActive = [
        { value: 1, label: 'فعال' },
        { value: 0, label: 'غیر فعال' },
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
