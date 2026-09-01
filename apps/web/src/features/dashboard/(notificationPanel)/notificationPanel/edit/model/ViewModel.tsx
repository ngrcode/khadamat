import {
  Yup,
  t,
  useAxiosQuery,
  useEffect,
} from '@/components';
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
    url: 'api/1.0/NotificationPanel/show',
  });

  const info = data?.result?.info;

  const { submitFormData, sendData } = usePutFormData();


  const initialValues = useMemo(

    () => ({
      Title: info?.title ?? '',
      Excerpt: info?.excerpt ?? '',
      Body: dataEdit?.body ?? '',
      IsPublished: info?.isPublish ?? false,
      StartedAtString: info?.startedAtString ?? '',
      FinishedAtString: info?.finishedAtString ?? '',
      File: info?.attachFile ?? '',
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

    const newUpdatedValues = {
      Title: values.Title,
      body: values.Body,
      startedAtString: values.StartedAtString,
      finishedAtString: values.FinishedAtString,
      isPublished: values.IsPublished ? 1 : 0,
      file: values.File,
    };


    const updatedValues = Object.keys(newUpdatedValues).reduce(
      (acc: any, key) => {

        acc[key] =
          newUpdatedValues[key] !== initialValues[key]
            ? newUpdatedValues[key]
            : initialValues[key];


        return acc;

      },
      {}
    );


    await submitFormData(updatedValues, {
      baseUrl: process.env.BASE_URL,
      endpoint: `api/1.0/NotificationPanel/update?id=${dataEdit?.id}`,
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