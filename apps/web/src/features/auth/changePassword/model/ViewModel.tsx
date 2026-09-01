import { useState, useMemo, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { showError, showSuccess } from '@/hook/useToust';
import { axiosInstance } from '@/configs/httpService/axios/axiosInterceptors';
import { UPDATE_PASSWORD_URl } from '@/constants/endPoints';
import { useAuthStore } from '@/store/authStore';

export interface ChangePasswordValues {
  oldPass: string;
  newPass: string;
  confirmNewPass: string;
}

// تابع تبدیل اعداد - خارج از کامپوننت (بهترین performance)
const convertFaToEnNumbers = (str: string): string => {
  if (!str || typeof str !== 'string') return str;

  const persianDigits: { [key: string]: string } = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
  };

  const arabicDigits: { [key: string]: string } = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  };

  const allDigits = { ...persianDigits, ...arabicDigits };

  return str.replace(/[۰-۹٠-٩]/g, (digit) => allDigits[digit] || digit);
};

export const useChangePasswordViewModel = (onClose?: () => void) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ درست: هر selector فقط یک مقدار برگردونه
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const logout = useAuthStore((state) => state.logout);
  const userType = useAuthStore((state) => state.userType);
  const userName = useAuthStore((state) => state.userName);

  // استفاده از useRef برای جلوگیری از submit همزمان
  const isSubmitting = useRef(false);

  const initialValues: ChangePasswordValues = useMemo(() => ({
    oldPass: '',
    newPass: '',
    confirmNewPass: '',
  }), []);

  const validationSchema = useMemo(() => Yup.object({
    oldPass: Yup.string()
      .required('رمز عبور فعلی الزامی است')
      .min(3, 'رمز عبور باید حداقل 3 کاراکتر باشد'),

    newPass: Yup.string()
      .required('رمز عبور جدید الزامی است')
      .min(8, 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'رمز عبور باید شامل حروف بزرگ، حروف کوچک، عدد و کاراکتر ویژه باشد'
      )
      .notOneOf(
        [Yup.ref('oldPass')],
        'رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد'
      ),

    confirmNewPass: Yup.string()
      .required('تأیید رمز عبور الزامی است')
      .oneOf([Yup.ref('newPass')], 'رمز عبورهای وارد شده مطابقت ندارند'),
  }), []);

  const onSubmit = useCallback(async (values: ChangePasswordValues) => {
    // ✅ جلوگیری از submit همزمان
    if (isLoading || isSubmitting.current) {
      console.log('Submitting is in progress, ignoring duplicate call');
      return;
    }

    isSubmitting.current = true;
    setIsLoading(true);

    try {
      const processedValues = {
        oldPass: convertFaToEnNumbers(values.oldPass),
        newPass: convertFaToEnNumbers(values.newPass),
      };

      const response = await axiosInstance.patch(UPDATE_PASSWORD_URl, {
        oldPass: processedValues.oldPass,
        newPass: processedValues.newPass,
      });

      if (response.status === 200) {
        showSuccess('رمز عبور با موفقیت تغییر یافت');

        // ✅ استفاده از مقادیری که قبلاً گرفتم
        setUserInfo(userType || '', userName || '', false);

        router.push('/dashboard');

        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      }
    } catch (error: any) {
      console.error('Error updating password:', error);

      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'خطا در تغییر رمز عبور. لطفاً مجدداً تلاش کنید.';

      showError(errorMessage);

      if (error.response?.status === 400) {
        showError('رمز عبور فعلی صحیح نیست');
      }

      if (error.response?.status === 401) {
        showError('دسترسی غیرمجاز. لطفاً مجدداً وارد شوید');
        await logout();
        router.push('/auth/login');
      }
    } finally {
      setIsLoading(false);
      isSubmitting.current = false;
    }
  }, [onClose, router, setUserInfo, logout, userType, userName]); // ✅ دیپندنسی‌های درست

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isLoading,
  };
};