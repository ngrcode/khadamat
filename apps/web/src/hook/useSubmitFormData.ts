import { axiosInstance } from "@/configs/httpService/axios/axiosInterceptors";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { showError, showSuccess } from "./useToust";
import { t } from "@/components";

const buildFormDataUrl = (baseUrl: string | undefined, endpoint: string) => {
  if (typeof window !== 'undefined') {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }

  return `${baseUrl ?? ''}${endpoint}`;
};

export const useSubmitFormData = () => {
  const queryClient = useQueryClient();
  const [sendData, setSendData] = useState(false);
  const [infoData, setInfoData] = useState(false);

  const submitFormData = async <T extends Record<string, any>>(
    values: T,
    {
      baseUrl,
      endpoint,
      queryKey,
    }: {
      baseUrl?: string;
      endpoint: string;
      queryKey?: any;
    },
  ) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (values[key] !== null && values[key] !== undefined) {
        if (Array.isArray(values[key])) {
          // ارسال آرایه با کلید unitIds[]
          values[key].forEach((item: any) => {
            formData.append(`${key}[]`, String(item));
          });
        } else if (values[key] instanceof File) {
          formData.append(key, values[key]);
        } else {
          formData.append(key, String(values[key]));
        }
      }
    });

    try {
      const response = await axiosInstance.post(
        buildFormDataUrl(baseUrl, endpoint),
        formData,
        {
          headers: {
            'accept': 'application/json',
            // Content-Type را تنظیم نکنید
          },
        },
      );

      if (response.data) {
        showSuccess(t('titleActiveTost'));
        setSendData(true);
        setInfoData(response.data);
        if (queryKey) {
          queryClient.invalidateQueries(queryKey);
        }
      }
    } catch (error: unknown) {
      console.error('Submission error:', error);
      showError(t('error'));
      setSendData(false);
    }
  };

  return {
    submitFormData,
    sendData,
    infoData,
  };
};
