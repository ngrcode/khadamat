import moment from 'moment-jalaali';


export const formatJalaliDate = (date: string | undefined): string => {
        if (!date) return '';
        const cleanDate = date.replace(/\D/g, '');
        if (cleanDate.length === 8) return cleanDate;
        const parsed = moment(date, 'jYYYY/MM/DD');
        if (!parsed.isValid()) return '';
        return parsed.format('jYYYYjMMjDD');
};


export const formatDateFields = <T extends Record<string, any>>(
        obj: T,
        dateFields: (keyof T)[]
): T => {
        const result = { ...obj };
        dateFields.forEach((field) => {
                if (result[field]) {
                        (result as any)[field] = formatJalaliDate(result[field] as string);
                }
        });
        return result;
};


export const formatInstallationDate = (value: string | undefined): string => {
        if (!value) return '';
        if (typeof value === 'string' && value.length === 8 && /^\d+$/.test(value)) {
                return `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`;
        }
        return value;
};
