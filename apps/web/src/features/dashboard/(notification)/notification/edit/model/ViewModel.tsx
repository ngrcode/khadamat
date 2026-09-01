import {
  Yup,
  t,
  useAxiosQuery,
  useEffect,
} from '@/components';
import { GET_DETAIL_NOTIFICATION_URL, UPDATE_NOTIFICATION_URL } from '@/constants/endPoint/notification';
import { QUERY_NOTIFICATION_PANEL } from '@/constants/endPoint/notificationPanel';
import { usePutFormData } from '@/hook/usePutFormData';
import { useMemo } from 'react';

interface UseEditViewModelParams {
  dataEdit: any;
  handleData: () => void;
  onSuccess?: () => void;
}

export const useEditViewModel = ({
  dataEdit,
  handleData,
  onSuccess,
}: UseEditViewModelParams) => {
  const { data } = useAxiosQuery({
    queryKey: ['notification', dataEdit?.id],
    params: {
      id: dataEdit?.id,
    },
    url: GET_DETAIL_NOTIFICATION_URL,
  });

  const info = data?.result?.info;

  const { submitFormData, sendData } = usePutFormData();

  const initialValues = useMemo(
    () => ({
      title: info?.title ?? '',
      body: dataEdit?.body ?? '',
      status: info?.status ?? 0,
      attachFile: info?.attachFile ?? '',
      unitIds: info?.unitIds?.map((item: any) => item.id) ?? [],
    }),
    [info]
  );

  const isModified = false;

  useEffect(() => {
    if (sendData) {
      handleData?.();
      onSuccess?.();
    }
  }, [sendData, handleData, onSuccess]);

  const validationSchema = Yup.object({});

  const onSubmit = async (values: any) => {
    // ابتدا مقادیر را آماده کنید
    const newUpdatedValues = {
      title: values.title,
      body: values.body,
      status: values.status ? 1 : 0,
      unitIds: values.unitIds || [], // اطمینان از اینکه آرایه است
      file: values.file || null,
    };

    const updatedValues = Object.keys(newUpdatedValues).reduce(
      (acc: any, key) => {
        if (key === 'unitIds') {
          const currentValue = newUpdatedValues[key] || [];
          const initialValue = initialValues[key] || [];

          if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
            acc[key] = currentValue;
          } else {
            acc[key] = initialValue;
          }
        } else {
          acc[key] =
            newUpdatedValues[key] !== initialValues[key]
              ? newUpdatedValues[key]
              : initialValues[key];
        }
        return acc;
      },
      {}
    );

    if (updatedValues.file === null || updatedValues.file === undefined) {
      delete updatedValues.file;
    }

    if (!updatedValues.unitIds || updatedValues.unitIds.length === 0) {
      updatedValues.unitIds = initialValues.unitIds || [];
    }

    await submitFormData(updatedValues, {
      baseUrl: process.env.BASE_URL,
      endpoint: `${UPDATE_NOTIFICATION_URL}?id=${dataEdit?.id}`,
      queryKey: QUERY_NOTIFICATION_PANEL,
      method: 'patch',
      successMessage: t('profilePut'),
    });
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isModified,
  };
};