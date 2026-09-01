'use client';

import { CommonModalForm, FormikUploader, FormInput, t } from "@/components";
import PersianDatePickerFormik from "@/components/form/datePicker/persianDatePickerFormik";
import { CommonForm } from "@/components/form/modalForm/CommonFormProps";
import SelectFormik from "@/components/form/select/selectFormik";
import TexeEditorCKFormik from "@/components/form/textEditorck/textEditor";
import { Col, Row } from "antd";
import { Field } from "formik";
import { useAddViewModel } from "../model/ViewModel";

const NotificationPanelCreate = () => {
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
      <Row gutter={[16, 16]}>
        {/* Title Field */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('title')}
            name="Title"
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

        {/* Start Date */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="startedAtString"
            component={PersianDatePickerFormik}
            label={t('startDate')}
            placeholder={t('chooseStartDate')}
            onChange={() => { }}
            className="w-full"
            format="YYYY/MM/DD HH:mm"
          />
        </Col>

        {/* End Date */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="finishedAtString"
            component={PersianDatePickerFormik}
            label={t('endDate')}
            placeholder={t('chooseEndDate')}
            onChange={() => { }}
            className="w-full"
            format="YYYY/MM/DD HH:mm"
          />
        </Col>

        {/* Status Field */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Field
            name="isPublished"
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
            multiple={false}
          />
        </Col>
      </Row>
    </CommonForm>
  );
};

export default NotificationPanelCreate;