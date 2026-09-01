import { CommonModalForm, Field, FormikUploader, FormInput, t } from '@/components';
import { useEditViewModel } from '../model/ViewModel';
import { Col, Row } from 'antd';
import PersianDatePickerFormik from '@/components/form/datePicker/persianDatePickerFormik';
import dynamic from 'next/dynamic';
import SelectFormik from '@/components/form/select/selectFormik';
import { IsActiveDeactive } from '@/constants/selectOption copy';

const TexeEditorCKFormik = dynamic(() => import('@/components/form/textEditorck/textEditor'), {
  ssr: false,
});
interface EditProps {
  record: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export const Edit: React.FC<EditProps> = ({ record, onClose, onSuccess }) => {

  const { initialValues, validationSchema, onSubmit } = useEditViewModel({
    dataEdit: record,
    handleData: onClose,
    onSuccess,
  });

  return (
    <>
      {
        initialValues &&
         <CommonModalForm
          title={`${t('edit')} ${t('unitemployee')}`}
          visible={!!record}
          onCancel={onClose}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
          buttonLabel={t('edit')}
          widthModal="full"
        >
          <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12}
              >
                <Field
                  label={t('name') || 'نام'}
                  name="title"
                  component={FormInput}
                  placeholder="نام را وارد کنید"
                  variant="outlined"
                  size="large"
                />
              </Col>



              {/* Status */}
              <Col xs={24} sm={24} md={12} lg={12} className="mt-3">
                <Field
                  name="status"
                  component={SelectFormik}
                  options={IsActiveDeactive}
                  placeholder={t('selectStatus') || 'وضعیت را انتخاب کنید'}
                  variant="outlined"
                  title="وضعیت"
                  width="100%"
                  size="large"
                />
              </Col>
            

          </Row>
        </CommonModalForm>}
    </>
  );
};
