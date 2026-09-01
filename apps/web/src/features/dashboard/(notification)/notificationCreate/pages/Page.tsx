'use client';

import {  FormikUploader, FormInput, t } from "@/components";
import { CommonForm } from "@/components/form/modalForm/CommonFormProps";
import SelectFormik from "@/components/form/select/selectFormik";
import TexeEditorCKFormik from "@/components/form/textEditorck/textEditor";
import { Col, Row } from "antd";
import { Field } from "formik";
import { useAddViewModel } from "../model/ViewModel";
import MultiSelectFormik from "@/components/form/select/multiSelectFormik";
import { useGetActiveUnitEmployee } from "../organisms/useGetProfile";

const NotificationCreate = () => {
  const { initialValues, validationSchema, onSubmit } = useAddViewModel();
  const { dataGetActiveUnitEmployee, isSuccessGetActiveUnitEmployee } = useGetActiveUnitEmployee();

  return (
    <CommonForm
      title={`${t('add')}`}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
      buttonLabel={t('save')}
    >
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

        {/* Body/Content Field */}
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
            name="unitIds"
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
              { value: true, label: 'فعال' },
              { value: false, label: 'غیر فعال' },
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
    </CommonForm>
  );
};

export default NotificationCreate;
