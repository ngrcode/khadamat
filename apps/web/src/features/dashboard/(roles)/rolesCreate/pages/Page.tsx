'use client';

import { FormInput, t } from '@/components';
import { CommonForm } from '@/components/form/modalForm/CommonFormProps';
import { Col, Row } from 'antd';
import { Field } from 'formik';
import { useAddViewModel } from '../model/ViewModel';
import MenuPermissionsFormik from '../organisms/MenuPermissionsFormik';

const RolesCreate = () => {
  const { initialValues, validationSchema, onSubmit } = useAddViewModel();

  return (
    <CommonForm
      title={t('addRoles')}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      buttonLabel={t('save')}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <h3 className="text-lg font-semibold app-form-section-title mb-2">
            {t('addRoles')}
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
    </CommonForm>
  );
};

export default RolesCreate;