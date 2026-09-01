import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/configs/httpService/axios/axiosInterceptors';
import { showError, showSuccess } from '@/hook/useToust';
import { t } from '@/components';

type Method = 'put' | 'patch';

interface SubmitConfig {
  baseUrl?: string;
  endpoint: string;
  queryKey?: string;
  method?: Method;
  successMessage?: string;
}

const buildFormDataUrl = (baseUrl: string | undefined, endpoint: string) => {
  if (typeof window !== 'undefined') {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }

  return `${baseUrl ?? ''}${endpoint}`;
};

export const usePutFormData = () => {
  const queryClient = useQueryClient();
  const [sendData, setSendData] = useState(false);

  const submitFormData = async <T extends Record<string, any>>(
    values: T,
    {
      baseUrl,
      endpoint,
      queryKey,
      method = 'put',
      successMessage,
    }: SubmitConfig
  ) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (value !== null && value !== undefined) {
        // ✅ اگر کلید unitIds است و مقدار آن آرایه است
        if (key === 'unitIds' && Array.isArray(value)) {
          // ارسال هر آیتم به صورت جداگانه با کلید unitIds[]
          value.forEach((item: any) => {
            formData.append('unitIds[]', String(item));
          });
        }
        // ✅ اگر مقدار آرایه است (برای سایر آرایه‌ها)
        else if (Array.isArray(value)) {
          value.forEach((item: any) => {
            formData.append(`${key}[]`, String(item));
          });
        }
        // ✅ اگر فایل است
        else if (value instanceof File) {
          formData.append(key, value);
        }
        // ✅ برای مقادیر معمولی
        else {
          formData.append(key, String(value));
        }
      }
    });

    try {
      const url = buildFormDataUrl(baseUrl, endpoint);

      // ❌ هدر Content-Type را حذف کنید - اجازه دهید axios خودش تنظیم کند
      const response =
        method === 'patch'
          ? await axiosInstance.patch(url, formData, {
            headers: {
              'accept': 'application/json',
              // 'Content-Type' را حذف کنید
            },
          })
          : await axiosInstance.put(url, formData, {
            headers: {
              'accept': 'application/json',
              // 'Content-Type' را حذف کنید
            },
          });

      if (response.data) {
        showSuccess(successMessage || t('titleEditTost'));
        setSendData(true);

        if (queryKey) {
          queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError(String(error));
      }
      setSendData(false);
    }
  };

  return {
    submitFormData,
    sendData,
  };
};
