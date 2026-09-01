'use client';

import { t } from '@/components';
import { CommonForm } from '@/components/form/modalForm/CommonFormProps';

import UserFormFields from '../../users/userFormFields';
import { useAddViewModel } from '../model/ViewModel';

const PersonnelCreate = () => {
  const { initialValues, validationSchema, onSubmit } = useAddViewModel();

  return (
    <CommonForm
      title={t('userCreateTitle')}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      buttonLabel={t('save')}
    >
      <UserFormFields />
    </CommonForm>
  );
};

export default PersonnelCreate;
