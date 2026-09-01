import { CommonModalForm, Field, FormInput, t } from '@/components';
import { useEditViewModel } from '../model/ViewModel';
import { Col, Row } from 'antd';
import MenuPermissionsFormik from '../../../rolesCreate/organisms/MenuPermissionsFormik';

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
    <CommonModalForm
      title="ویرایش نقش"
      visible={!!record}
      onCancel={onClose}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      buttonLabel={t('edit')}
      widthModal="full"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            ویرایش نقش
          </h3>
        </Col>

        <Col xs={24} md={12}>
          <Field
            label="نام نقش"
            name="Name"
            component={FormInput}
            placeholder="نام نقش را وارد کنید"
            variant="outlined"
            size="large"
          />
        </Col>

        <Col xs={24}>
          <Field name="SelectedMenus" component={MenuPermissionsFormik} />
        </Col>
      </Row>
    </CommonModalForm>
  );
};
