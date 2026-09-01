'use client';

import { t } from "@/components";
import { CommonForm } from "@/components/form/modalForm/CommonFormProps";
import { useAddViewModel } from "../model/ViewModel";
import FormFields from "../organisms/formField";

const HokmCreateCreatePoshtibani = () => {
  const { initialValues, validationSchema, onSubmit } = useAddViewModel();
 

  return (
    <CommonForm
      title={`${t('add')}`}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
      buttonLabel={t('save')}
    >
      <FormFields/>
    </CommonForm>
  );
};

export default HokmCreateCreatePoshtibani;

