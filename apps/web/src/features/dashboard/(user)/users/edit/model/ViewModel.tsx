import { t, useMemo, useQueryClient, Yup } from '@/components';
import { QUERY_USERS } from '@/constants/endPoint/users';
import { showError, showSuccess } from '@/hook/useToust';
import { useMutation } from '@tanstack/react-query';

import { updateEmployeeByAdminV10 } from '../../employeeAdminApi';
import {
  buildEmployeeInitialValues,
  buildEmployeePayload,
  type EmployeeFormValues,
} from '../../formModel';

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
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateEmployeeByAdminV10,
  });

  const initialValues = useMemo(
    () => buildEmployeeInitialValues(dataEdit),
    [dataEdit],
  );

  const validationSchema = Yup.object({});

  const onSubmit = async (values: EmployeeFormValues) => {
    const employeeData = buildEmployeePayload({
      ...values,
      id: values.id || dataEdit?.id || '',
    });

    if (!employeeData.id) {
      showError(t('recordIdNotFound'));
      return;
    }

    try {
      await updateMutation.mutateAsync(employeeData);
      showSuccess(t('userUpdateSuccess'));
      await queryClient.invalidateQueries({ queryKey: [QUERY_USERS] });
      onSuccess?.();
      handleData?.();
    } catch (error) {
      showError(t('userUpdateError'));
      throw error;
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isModified: true,
    isSubmitting: updateMutation.isPending,
  };
};
