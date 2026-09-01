import { t, useQueryClient, Yup } from '@/components';
import { QUERY_USERS } from '@/constants/endPoint/users';
import { showError, showSuccess } from '@/hook/useToust';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createEmployeeByAdmin } from '../../users/employeeAdminApi';
import {
  buildEmployeePayload,
  emptyEmployeeFormValues,
  type EmployeeFormValues,
} from '../../users/formModel';

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createEmployeeByAdmin,
  });

  const validationSchema = Yup.object({});

  const onSubmit = async (values: EmployeeFormValues) => {
    const employeeData = buildEmployeePayload(values);

    try {
      await createMutation.mutateAsync(employeeData);
      showSuccess(t('userCreateSuccess'));
      await queryClient.invalidateQueries({ queryKey: [QUERY_USERS] });
      router.push('/dashboard/users');
    } catch (error) {
      showError(t('userCreateError'));
    }
  };

  return {
    initialValues: emptyEmployeeFormValues,
    validationSchema,
    onSubmit,
    isSubmitting: createMutation.isPending,
  };
};
