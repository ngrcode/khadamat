import React from 'react';

import { FormikUploader, FormInput } from '@/components';
import SelectFormik from '@/components/form/select/selectFormik';
import { t } from '@/configs/language';
import { monthOptions, yearOptions } from '@/constants/selectOption copy';
import { Col, Row } from 'antd';
import { Field } from 'formik';

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
}) => (
  <Row gutter={[16, 16]}>
    <Col xs={24} md={8}>
      <Field label={title} name={titleName} component={FormInput} />
    </Col>

    <Col xs={24} md={8}>
      <Field label={t('fromColumn')} name={startName} component={FormInput} />
    </Col>

    <Col xs={24} md={8}>
      <Field label={t('toColumn')} name={endName} component={FormInput} />
    </Col>
  </Row>
);

const FormFields = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Field
          name="Year"
          component={SelectFormik}
          options={yearOptions}
          placeholder={t('selectYear')}
          variant="outlined"
          title={t('excelYear')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} md={8}>
        <Field
          name="Month"
          component={SelectFormik}
          options={monthOptions}
          placeholder={t('selectMonth')}
          variant="outlined"
          title={t('excelMonth')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} md={8}>
        <Field label={t('payrollFile')} name="File" component={FormikUploader} />
      </Col>

      <Col xs={24} md={8}>
        <Field label={t('sheetName')} name="SheetName" component={FormInput} />
      </Col>
    </Row>

    <hr className="my-4" />

    <Row gutter={[16, 16]}>
      <Col xs={24} md={6}>
        <Field label={t('nameColumn')} name="NameId" component={FormInput} />
      </Col>

      <Col xs={24} md={6}>
        <Field label={t('lastNameColumn')} name="LastNameId" component={FormInput} />
      </Col>

      <Col xs={24} md={6}>
        <Field label={t('nationalCodeColumn')} name="NationalId" component={FormInput} />
      </Col>

      <Col xs={24} md={6}>
        <Field label={t('personnelCodeColumn')} name="PersonnelCodeId" component={FormInput} />
      </Col>
    </Row>

    <FormSection
      title={t('personnelInfoTitle')}
      titleName="PersonnelInfo"
      startName="PersonnelInfoStart"
      endName="PersonnelInfoEnd"
    />

    <FormSection
      title={t('deductionTitle')}
      titleName="Deduction"
      startName="DeductionStart"
      endName="DeductionEnd"
    />

    <FormSection
      title={t('salaryBenefitTitle')}
      titleName="SalaryBenefit"
      startName="SalaryBenefitStart"
      endName="SalaryBenefitEnd"
    />

    <FormSection
      title={t('loanInformationTitle')}
      titleName="LoanInformation"
      startName="LoanInformationStart"
      endName="LoanInformationEnd"
    />

    <FormSection
      title={t('efficiencyTitle')}
      titleName="Efficiency"
      startName="EfficiencyStart"
      endName="EfficiencyEnd"
    />

    <Row gutter={[16, 16]}>
      <Col xs={24} md={6}>
        <Field label={t('totalPayment')} name="TotalPayment" component={FormInput} />
      </Col>

      <Col xs={24} md={6}>
        <Field label={t('totalIncome')} name="TotalIncome" component={FormInput} />
      </Col>

      <Col xs={24} md={6}>
        <Field label={t('totalDeductions')} name="TotalDeductions" component={FormInput} />
      </Col>

      <Col xs={24} md={6}>
        <Field label={t('totalLoan')} name="TotalLoan" component={FormInput} />
      </Col>
    </Row>
  </>
);

export default FormFields;
