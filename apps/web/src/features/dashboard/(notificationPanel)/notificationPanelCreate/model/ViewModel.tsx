import { Yup, t, useEffect, useQueryClient, useState, useSubmitFormData } from '@/components';
import { QUERY_NOTIFICATION_PANEL } from '@/constants/endPoint/notificationPanel';
import { useRouter } from 'next/navigation';

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialValues] = useState({
    Title: '',
    body: '',
    isPublished: false, 
    startedAtString: '',
    finishedAtString: '',
    file: null, 
  });

  const validationSchema = Yup.object({
    Title: Yup.string()
      .required(t('titleRequired') || 'Title is required')
      .max(100, t('titleMax') || 'Title must be at most 100 characters'),
    body: Yup.string()
      .required(t('bodyRequired') || 'Body is required'),
    startedAtString: Yup.string()
      .required(t('startDateRequired') || 'Start date is required'),
    finishedAtString: Yup.string()
      .required(t('endDateRequired') || 'End date is required'),
    file: Yup.mixed()
      .nullable()
      .test('fileSize', t('fileSize') || 'File size is too large', (value) => {
        if (!value) return true;
        return (value as File).size <= 150 * 1024 * 1024;
      })
      .test('fileType', t('fileType') || 'Unsupported file type', (value) => {
        if (!value) return true;
        const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        return supportedTypes.includes((value as File).type);
      }),
  });

  const { submitFormData, sendData } = useSubmitFormData();

  useEffect(() => {
    if (sendData) {
      router.push('/dashboard/notificationPanel');
    }
    
  }, [sendData, router]);

  const onSubmit = async (values: any) => {
    const notificationData = {
      ...values,
      isPublished: values?.isPublished ? 1 : 0,
      startedAtString: values.startedAtString,
      finishedAtString: values.finishedAtString,
    };

    try {
      await submitFormData(notificationData, {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL, // Use NEXT_PUBLIC for client-side
        endpoint: 'api/1.0/NotificationPanel/create',
        queryKey: QUERY_NOTIFICATION_PANEL,
      });

      await queryClient.invalidateQueries({ queryKey: [QUERY_NOTIFICATION_PANEL] });
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
   
  };
};
