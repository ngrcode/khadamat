import {
  Yup,
  t,
  useEffect,
  useQueryClient,
  useState,
  useSubmitFormData,
} from '@/components';
import {
  CREATE_NOTIFICATION_URL,
  QUERY_NOTIFICATION,
} from '@/constants/endPoint/notification';
import { useRouter } from 'next/navigation';

interface NotificationFormValues {
  title: string;
  body: string;
  status: boolean;
  unitIds: number[];
  file: File | null;
}

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialValues] = useState<NotificationFormValues>({
    title: '',
    body: '',
    status: false,
    unitIds: [],
    file: null,
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t('titleRequired') || 'Title is required')
      .max(100, t('titleMax') || 'Title must be at most 100 characters'),

    body: Yup.string()
      .required(t('bodyRequired') || 'Body is required'),

    unitIds: Yup.array()
      .of(Yup.number())
      .min(1, 'حداقل یک واحد انتخاب کنید')
      .required('واحد الزامی است'),

    file: Yup.mixed()
      .nullable()
      .test(
        'fileSize',
        t('fileSize') || 'File size is too large',
        (value: any) => {
          if (!value) return true;
          return value.size <= 150 * 1024 * 1024;
        },
      )
      .test(
        'fileType',
        t('fileType') || 'Unsupported file type',
        (value: any) => {
          if (!value) return true;

          const supportedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
            'application/vnd.ms-excel',
          ];

          return supportedTypes.includes(value.type);
        },
      ),
  });

  const { submitFormData, sendData, infoData } = useSubmitFormData();

  useEffect(() => {
    if (sendData) {
      router.push('/dashboard/notification');
    }
  }, [sendData, router]);

  const onSubmit = async (values: NotificationFormValues) => {
    try {
      const notificationData = {
        title: values.title,
        body: values.body,
        status: values.status ? 1 : 0,
        unitIds: values.unitIds,
        file: values.file,
      };

      await submitFormData(notificationData, {
        baseUrl:
          process.env.NEXT_PUBLIC_BASE_URL ??
          process.env.BASE_URL ??
          '',
        endpoint: CREATE_NOTIFICATION_URL,
        queryKey: QUERY_NOTIFICATION,
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_NOTIFICATION],
      });
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    sendData,
    infoData,
  };
};