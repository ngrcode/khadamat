import React from 'react';

import { FormikUploader, FormInput } from '@/components';
import { Col, Row } from 'antd';
import { Field } from 'formik';
import SelectFormik from '@/components/form/select/selectFormik';
import { monthOptions, yearOptions } from '@/constants/selectOption copy';

const FormSection = ({
  title,
  titleName,
  startName,
  endName,
}: {
  title: string;
  titleName: string;
  startName: string;
  endName: string;
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Field label={title} name={titleName} component={FormInput} />
      </Col>

      <Col xs={24} md={8}>
        <Field label="از ستون" name={startName} component={FormInput} />
      </Col>

      <Col xs={24} md={8}>
        <Field label="تا ستون" name={endName} component={FormInput} />
      </Col>
    </Row>
  );
};

const FormFields = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Field
            name="Year"
            component={SelectFormik}
            options={yearOptions}
            placeholder="انتخاب سال"
            variant="outlined"
            title="سال"
            required
            width="100%"
            size="large"
          />
        </Col>

        <Col xs={24} md={8}>
          <Field
            name="Month"
            component={SelectFormik}
            options={monthOptions}
            placeholder="انتخاب ماه"
            variant="outlined"
            title="ماه"
            required
            width="100%"
            size="large"
          />
        </Col>

        <Col xs={24} md={8}>
          <Field label="فیش حقوقی" name="File" component={FormikUploader} />
        </Col>

        <Col xs={24} md={8}>
          <Field label="نام Sheet" name="SheetName" component={FormInput} />
        </Col>
      </Row>

      <hr className="app-form-divider my-4" />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Field label="ستون نام" name="NameId" component={FormInput} />
        </Col>

        <Col xs={24} md={6}>
          <Field label="ستون نام خانوادگی" name="LastNameId" component={FormInput} />
        </Col>

        <Col xs={24} md={6}>
          <Field label="ستون کد ملی" name="NationalId" component={FormInput} />
        </Col>

        <Col xs={24} md={6}>
          <Field label="ستون کد پرسنلی" name="PersonnelCodeId" component={FormInput} />
        </Col>
      </Row>

      <FormSection
        title="عنوان اطلاعات پرسنل"
        titleName="PersonnelInfo"
        startName="PersonnelInfoStart"
        endName="PersonnelInfoEnd"
      />

      <FormSection
        title="عنوان کسور"
        titleName="Deduction"
        startName="DeductionStart"
        endName="DeductionEnd"
      />

      <FormSection
        title="عنوان مزایا حقوق"
        titleName="SalaryBenefit"
        startName="SalaryBenefitStart"
        endName="SalaryBenefitEnd"
      />

      <FormSection
        title="عنوان اطلاعات وام"
        titleName="LoanInformation"
        startName="LoanInformationStart"
        endName="LoanInformationEnd"
      />

      <FormSection
        title="عنوان بهره وری"
        titleName="Efficiency"
        startName="EfficiencyStart"
        endName="EfficiencyEnd"
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Field label="مبلغ کل قابل پرداخت" name="TotalPayment" component={FormInput} />
        </Col>

        <Col xs={24} md={6}>
          <Field label="درآمد کل" name="TotalIncome" component={FormInput} />
        </Col>

        <Col xs={24} md={6}>
          <Field label="مجموع کسرها" name="TotalDeductions" component={FormInput} />
        </Col>

        <Col xs={24} md={6}>
          <Field label="کل وام" name="TotalLoan" component={FormInput} />
        </Col>
      </Row>
    </>
  );
};

export default FormFields;