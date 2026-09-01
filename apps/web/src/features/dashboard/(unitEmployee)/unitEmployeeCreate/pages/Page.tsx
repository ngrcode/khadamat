'use client';

import { FormikUploader, FormInput, t } from "@/components";
import PersianDatePickerFormik from "@/components/form/datePicker/persianDatePickerFormik";
import { CommonForm } from "@/components/form/modalForm/CommonFormProps";
import SelectFormik from "@/components/form/select/selectFormik";
import TexeEditorCKFormik from "@/components/form/textEditorck/textEditor";
import { Col, Row } from "antd";
import { Field } from "formik";
import { useAddViewModel } from "../model/ViewModel";
import textAreaFormik from "@/components/form/textArea/textAreaFormik";
import { degreeEducationOptions, IsActiveDeactive, Provinces } from "@/constants/selectOption copy";
import { useGetActiveUnitEmployee } from "../../unitEmployee/organisms/useGetAllRole";
import MultiSelectFormik from "@/components/form/select/multiSelectFormik";

const UnitEmployeeCreate = () => {
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
        {/* Personal Information Section */}
        <Col xs={24}>
          <h3 className="text-lg font-semibold app-form-section-title mb-2">
            {t('menuUnitCreate')}
          </h3>
        </Col>

        {/* Title */}
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
    </CommonForm>
  );
};

export default UnitEmployeeCreate;
