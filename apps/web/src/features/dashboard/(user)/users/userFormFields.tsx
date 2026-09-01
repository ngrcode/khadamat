import { Field, FormInput, t } from '@/components';
import PersianDatePickerFormik from '@/components/form/datePicker/persianDatePickerFormik';
import SelectFormik from '@/components/form/select/selectFormik';
import textAreaFormik from '@/components/form/textArea/textAreaFormik';
import { Col, Row } from 'antd';

import { degreeEducationOptions, Provinces } from '@/constants/selectOption copy';

import { useGetActiveUnitEmployee } from './organisms/useGetActiveUnitEmployee';

const activeOptions = () => [
  { value: 1, label: t('statusActive') },
  { value: 0, label: t('statusInactive') },
];

const genderOptions = () => [
  { value: '1', label: t('male') },
  { value: '2', label: t('female') },
];

const maritalStatusOptions = () => [
  { value: '1', label: t('single') },
  { value: '2', label: t('married') },
];

const provinceOptions = () =>
  Provinces.map((province) => ({
    value: province,
    label: province,
  }));

interface UserFormFieldsProps {
  disableId?: boolean;
}

const UserFormFields = ({ disableId = false }: UserFormFieldsProps) => {
  const { dataGetActiveUnitEmployee, isSuccessGetActiveUnitEmployee } =
    useGetActiveUnitEmployee();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <h3 className="mb-2 text-lg font-semibold app-form-section-title">
          {t('employeeMainInformation')}
        </h3>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('id')}
          name="id"
          component={FormInput}
          placeholder={t('enterId')}
          variant="outlined"
          size="large"
          disabled={disableId}
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('employment_id')}
          name="employment_id"
          component={FormInput}
          placeholder={t('enterEmploymentId')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('firstName')}
          name="first_name"
          component={FormInput}
          placeholder={t('enterFirstName')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('lastName')}
          name="last_name"
          component={FormInput}
          placeholder={t('enterLastName')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('fatherName')}
          name="father_name"
          component={FormInput}
          placeholder={t('enterFatherName')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="gender"
          component={SelectFormik}
          options={genderOptions()}
          placeholder={t('selectGender')}
          variant="outlined"
          title={t('gender')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="maratial_status"
          component={SelectFormik}
          options={maritalStatusOptions()}
          placeholder={t('selectMaritalStatus')}
          variant="outlined"
          title={t('maratialStatus')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="date_of_birth"
          component={PersianDatePickerFormik}
          label={t('dateOfBirth')}
          placeholder={t('chooseDateOfBirth')}
          className="w-full"
          format="YYYY/MM/DD"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('birthCertificateNumber')}
          name="birthCertificateNumber"
          component={FormInput}
          placeholder={t('enterBirthCertificateNumber')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="degreeEducation"
          component={SelectFormik}
          options={degreeEducationOptions}
          placeholder={t('selectDegree')}
          variant="outlined"
          title={t('degreeEducation')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('passportNumber')}
          name="passport_number"
          component={FormInput}
          placeholder={t('enterPassportNumber')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="nationality"
          component={FormInput}
          placeholder={t('enterNationality')}
          variant="outlined"
          label={t('nationality')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('personnelIdBank')}
          name="personnelIdBank"
          component={FormInput}
          placeholder={t('enterPersonnelIdBank')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24}>
        <h3 className="mb-2 mt-2 text-lg font-semibold text-primary-600">
          {t('employeeContactInformation')}
        </h3>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('mobileNumber')}
          name="mobile"
          component={FormInput}
          placeholder={t('enterMobile')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('phoneNumber')}
          name="phone"
          component={FormInput}
          placeholder={t('enterPhone')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('email')}
          name="email"
          component={FormInput}
          placeholder={t('enterEmail')}
          variant="outlined"
          size="large"
          type="email"
        />
      </Col>

      <Col xs={24}>
        <Field
          name="present_address"
          component={textAreaFormik}
          label={t('address')}
          placeholder={t('enterPresentAddress')}
          maxLength={2000}
          className="w-full"
        />
      </Col>

      <Col xs={24}>
        <h3 className="mb-2 mt-2 text-lg font-semibold text-primary-600">
          {t('employeeOrganizationInformation')}
        </h3>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('country_id')}
          name="country_id"
          component={FormInput}
          placeholder={t('enterCountryId')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="city"
          component={SelectFormik}
          options={provinceOptions()}
          placeholder={t('selectCity')}
          variant="outlined"
          title={t('city')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          label={t('center_names')}
          name="center_names"
          component={FormInput}
          placeholder={t('enterCenterNames')}
          variant="outlined"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        {isSuccessGetActiveUnitEmployee && (
          <Field
            name="unitId"
            component={SelectFormik}
            options={dataGetActiveUnitEmployee}
            placeholder={t('selectUnitEmployee')}
            variant="outlined"
            title={t('unitEmployeeTitle')}
            width="100%"
            size="large"
          />
        )}
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="designations_id"
          component={FormInput}
          placeholder={t('enterDesignationId')}
          variant="outlined"
          label={t('designations_id')}
          width="100%"
          size="large"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="joining_date"
          component={PersianDatePickerFormik}
          label={t('joining_date')}
          placeholder={t('chooseJoiningDate')}
          className="w-full"
          format="YYYY/MM/DD"
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Field
          name="status"
          component={SelectFormik}
          options={activeOptions()}
          placeholder={t('selectStatus')}
          variant="outlined"
          title={t('status')}
          width="100%"
          size="large"
        />
      </Col>
    </Row>
  );
};

export default UserFormFields;
