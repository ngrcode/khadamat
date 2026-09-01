import { CommonModalForm, t } from '@/components';
import type { FC } from 'react';

import UserFormFields from '../../userFormFields';
import { useEditViewModel } from '../model/ViewModel';

interface EditProps {
  record: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export const Edit: FC<EditProps> = ({ record, onClose, onSuccess }) => {
  const { initialValues, validationSchema, onSubmit, isModified } =
    useEditViewModel({
      dataEdit: record,
      handleData: onClose,
      onSuccess,
    });

  return (
    <CommonModalForm
      title={`${t('edit')} ${t('users')}`}
      visible={!!record}
      onCancel={onClose}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      buttonLabel={t('edit')}
      widthModal="full"
      isModified={isModified}
    >
      <UserFormFields disableId />
    </CommonModalForm>
  );
};
