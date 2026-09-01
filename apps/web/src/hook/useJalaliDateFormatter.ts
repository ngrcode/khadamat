// hooks/useJalaliDateFormatter.ts
import { useCallback } from 'react';
import moment from 'moment-jalaali';

export const useJalaliDateFormatter = () => {
        const formatJalaliDate = useCallback((date: string): string => {
                if (!date) return '';

                const cleanDate = date.replace(/\D/g, '');

                if (cleanDate.length === 8) {
                        return cleanDate;
                }

                const parsed = moment(date, 'jYYYY/MM/DD');

                if (!parsed.isValid()) {
                        console.error('Invalid Jalali date:', date);
                        return '';
                }

                return parsed.format('jYYYYjMMjDD');
        }, []);

        return { formatJalaliDate };
};