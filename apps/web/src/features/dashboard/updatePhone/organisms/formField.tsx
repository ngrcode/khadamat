import FormikUploader from '@/components/form/uploder/FormikUploader';
import SelectFormik from '@/components/form/select/selectFormik';
import { t } from '@/configs/language';
import { yearOptions } from '@/constants/selectOption';
import { Col, Row } from 'antd';
import { Field } from 'formik';

const FormFields = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Field
          name="year"
          component={SelectFormik}
          options={yearOptions}
          placeholder={t('selectYear')}
          variant="outlined"
          title={t('excelYear')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Field
          label={t('attachment')}
          name="file"
          component={FormikUploader}
        />
      </Col>
    </Row>
  </>
);

export default FormFields;
