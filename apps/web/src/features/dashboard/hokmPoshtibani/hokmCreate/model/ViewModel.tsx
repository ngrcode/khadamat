import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

import { t } from '@/configs/language';
import { QUERY_HOKM } from '@/constants/endPoint/hokm';
import { useSubmitFormData } from '@/hook/useSubmitFormData';

interface EmployeeFormValues {
  year: string | number | null;
  file: File | string | null;
}

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialValues] = useState<EmployeeFormValues>({
    year: '',
    file: null,
  });

  const validationSchema = Yup.object({
    year: Yup.mixed().required(t('required')),
    file: Yup.mixed().required(t('required')),
  });

  const { submitFormData, sendData } = useSubmitFormData();

  useEffect(() => {
    if (sendData) {
      queryClient.invalidateQueries({ queryKey: [QUERY_HOKM] });
      router.push('/dashboard/hokm');
    }
  }, [queryClient, sendData, router]);

  const onSubmit = async (values: EmployeeFormValues) => {
    const employeeData = {
      Year: values?.year,
      File: values?.file,
    };

    try {
      await submitFormData(employeeData, {
        endpoint: 'api/1/Employee/UploadHokm',
        queryKey: QUERY_HOKM,
      });
    } catch (error: any) {
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};
