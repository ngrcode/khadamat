import { useState, useEffect } from 'react';
import moment from 'moment-jalaali';

// Hook to convert Gregorian date to Persian (Jalali) date
const usePersianDate = (gregorianDate: string | null) => {
  const [persianDate, setPersianDate] = useState<string>('');

  useEffect(() => {
    if (gregorianDate) {
      const formattedDate = moment(gregorianDate).format('jYYYY/jMM/jDD');
      setPersianDate(formattedDate);
    } else {
      setPersianDate('');
    }
  }, [gregorianDate]);

  return persianDate;
};

export default usePersianDate;
