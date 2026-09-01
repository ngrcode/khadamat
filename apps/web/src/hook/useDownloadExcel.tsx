import { useState } from 'react';
import { t } from '@/components';
import { axiosInstance } from '@/configs/httpService/axios/axiosInterceptors';
import { showError } from './useToust';

interface UseDownloadExcelProps {
  [key: string]: any;
}

const useDownloadExcelGetValues = (value?: UseDownloadExcelProps) => {
  const [isLoadingExcelGetValues, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadExcelGetValues = async (
    endpoint: string,
    valueData: Record<string, any> = {},
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    debugger
    try {
      const response = await axiosInstance.get(endpoint, {
        params: {
          ...valueData,
          ...value,
        },
      });

      if (response.status !== 200) {
        throw new Error(t('error') || 'خطا در دریافت فایل');
      }
      debugger
      const filePath = response?.data?.result?.filePath;

      if (!filePath) {
        throw new Error('File path not found in response');
      }

      if (typeof window !== 'undefined') {
        debugger
        window.open(
    `${process.env.NEXT_PUBLIC_BASE_EXCEL_URL}${filePath}`,
          '_blank',
        );
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Download failed. Please try again.';

      console.error(err);
      showError(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDownloadExcelGetValues,
    isLoadingExcelGetValues,
    error,
  };
};

export default useDownloadExcelGetValues;