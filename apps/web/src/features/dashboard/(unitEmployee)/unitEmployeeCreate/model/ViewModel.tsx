import { Yup, t, useQueryClient, useState } from '@/components';
import { useRouter } from 'next/navigation';
import { useAxiosMutation } from '@/hook/useAxsios/useAxiosMutation';
import { CREATE_UNITEMPLOYEE_URL } from '@/constants/endPoint/unitemployee';

interface EmployeeFormValues {
  title: string;
  status: string;
}

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialValues] = useState<EmployeeFormValues>({
    title: '',
    status: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t('requiredField') || 'عنوان اجباری است')
      .min(3, 'حداقل ۳ کاراکتر وارد کنید')
      .max(50, 'حداکثر ۵۰ کاراکتر مجاز است'),

    status: Yup.string().required(t('requiredField') || 'وضعیت اجباری است'),
  });

  const { mutateAsync, isPending } = useAxiosMutation(
    CREATE_UNITEMPLOYEE_URL
  );

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      const queryParams = new URLSearchParams({
        title: values.title,
        status: values.status,
      }).toString();

      await mutateAsync({
        method: 'POST',
        query: `?${queryParams}`,
      } as any);

      queryClient.invalidateQueries({
        queryKey: ['users'],
      });

      router.push('/dashboard/unitEmployee');
    } catch (error: any) {
      console.error('CreateUnitEmployee Error:', error);

      if (error?.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Message:', error?.message);
      }
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isPending,
  };
};