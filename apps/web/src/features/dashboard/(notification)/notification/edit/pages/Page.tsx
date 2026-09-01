import { CommonModalForm,t } from '@/components';
import { useEditViewModel } from '../model/ViewModel';
import FormFields from '../../organisms/formFieldsCompetitionReport';


interface EditProps {
  record: any;          // رکوردی که قرار است ویرایش شود
  onClose: () => void;  // تابع بستن مودال
  onSuccess?: () => void; // تابع پس از ویرایش موفق (رفرش جدول)
}

export const Edit: React.FC<EditProps> = ({ record, onClose, onSuccess }) => {

  const { initialValues, validationSchema, onSubmit } = useEditViewModel({
    dataEdit: record,
    handleData: onClose,
    onSuccess,
  });
  console.log("initialValues", initialValues);

  return (
    <>
      {
        initialValues &&
         <CommonModalForm
          title={`${t('edit')} ${t('wageMonthly')}`}
          visible={!!record}
          onCancel={onClose}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
          buttonLabel={t('edit')}
          widthModal="full"
        >
            <FormFields />
        </CommonModalForm>}
    </>
  );
};
