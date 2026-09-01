import { Yup, useEffect, useQueryClient, useState } from '@/components';
import { useAxiosMutation } from '@/hook/useAxsios/useAxiosMutation';
import { useRouter } from 'next/navigation';
import { buildPanelMenuString } from '../organisms/MenuPermissionsFormik';
import { QUERY_ROLES } from '@/constants/endPoint/roles';

export interface RoleFormValues {
  Name: string;
  SelectedMenus: string[];
}

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialValues] = useState<RoleFormValues>({
    Name: '',
    SelectedMenus: [],
  });

  const validationSchema = Yup.object({
    Name: Yup.string().required('نام نقش الزامی است'),
    SelectedMenus: Yup.array().min(1, 'حداقل یک دسترسی انتخاب کنید'),
  });

  const { mutateAsync, isSuccess } = useAxiosMutation(
    '/api/1.0/Role/CreateRole'
  );

  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard/roles');
      queryClient.invalidateQueries({
        queryKey: [QUERY_ROLES],
      });
    }
  }, [isSuccess, router]);

  const onSubmit = async (values: RoleFormValues) => {
    const payload = {
      Name: values.Name,
      PanelMenu: buildPanelMenuString(values.SelectedMenus),
    };

    try {
      await mutateAsync(payload);
    } catch (error: any) {
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isSuccess,
  };
};