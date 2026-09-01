import React from 'react';

import {  FormikUploader, FormInput, t } from '@/components';
import SelectFormik from '@/components/form/select/selectFormik';
import { Col, Row } from 'antd';
import { Field } from 'formik';
import MultiSelectFormik from '@/components/form/select/multiSelectFormik';
import { useGetActiveUnitEmployee } from '../../notificationCreate/organisms/useGetProfile';
import dynamic from 'next/dynamic';
const TexeEditorCKFormik = dynamic(() => import('@/components/form/textEditorck/textEditor'), {
  ssr: false,
});



const FormFields = ({}) => {
  const { dataGetActiveUnitEmployee, isSuccessGetActiveUnitEmployee } = useGetActiveUnitEmployee();
  return (
    <Row gutter={[16, 16]}>
      {/* Title Field */}
      <Col xs={24} sm={24} md={24} lg={24}>
        <Field
          label={t('title')}
          name="title"
          component={FormInput}
          placeholder={t('enterTitle')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <Field
          name="body"
          component={TexeEditorCKFormik}
          placeholder={t('placeholderRichTextEditor')}
          variant="outlined"
          wrapperClassName="h-96"
          label={t('content')}
        />
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        {isSuccessGetActiveUnitEmployee && <Field
          name="unit_name"
          component={MultiSelectFormik}
          options={dataGetActiveUnitEmployee}
          placeholder='انتخاب واحد جدید '
          variant="outlined"
          title="واحد جدید"
          width="100%"
          size="large"
        />}
      </Col>


      {/* Status Field */}
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Field
          name="status"
          component={SelectFormik}
          options={[
            { value: 1, label: 'فعال' },
            { value: 0, label: 'غیر فعال' },
          ]}
          placeholder={t('selectStatus')}
          variant="outlined"
          title={t('status')}
          width="100%"
          size="large"
        />
      </Col>

      {/* File Upload Field */}
      <Col xs={24} sm={24} md={12} lg={12}>
        <Field
          label={t('attachment')}
          name="file"
          component={FormikUploader}

        />
      </Col>
    </Row>
  );
};

export default FormFields;
