import { useCallback } from 'react';

// Custom hook to convert Latin digits to Persian digits
export const useConvertToPersianDigits = () => {
  const latinToPersianDigitsMap = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  // Callback function to convert Latin digits to Persian digits
  const convertToPersianDigits = useCallback((input: string): string => {
    return input?.replace(/\d/g, (digit) => latinToPersianDigitsMap[digit]);
  }, []);

  return { convertToPersianDigits };
};
