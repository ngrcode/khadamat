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
import { useGetActiveUnitEmployee } from "../requestLeave/organisms/useGetAllRole";
import MultiSelectFormik from "@/components/form/select/multiSelectFormik";

const PersonnelCreate = () => {
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
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            {t('personalInformation')}
          </h3>
        </Col>

        {/* First Name */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('firstName')}
            name="first_name"
            component={FormInput}
            placeholder={t('enterFirstName')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Last Name */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('lastName')}
            name="last_name"
            component={FormInput}
            placeholder={t('enterLastName')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Father Name */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('fatherName')}
            name="father_name"
            component={FormInput}
            placeholder={t('enterFatherName')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Email */}
        <Col xs={24} sm={24} md={12} lg={12}>
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

        {/* Date of Birth */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="date_of_birth"
            component={PersianDatePickerFormik}
            label={t('dateOfBirth')}
            placeholder={t('chooseDateOfBirth')}
            onChange={() => { }}
            className="w-full"
            format="YYYY/MM/DD"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('employment_id')}
            name="employment_id"
            component={FormInput}
            placeholder={t('enterFatherName')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Passport Number */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('passportNumber')}
            name="passport_number"
            component={FormInput}
            placeholder={t('enterPassportNumber')}
            variant="outlined"
            size="large"
          />
        </Col>
        
        {/* Nationality */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="nationality"
            component={FormInput}
            placeholder={t('selectNationality')}
            variant="outlined"
            label={t('nationality')}
            width="100%"
            size="large"
          />
        </Col>

        {/* Address */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Field
            name="present_address"
            component={textAreaFormik}
            label={t('address')}
            placeholder={t('enterPresentAddress')}
            maxLength={2000}
            className='w-full'
          />
        
        </Col>


        {/* City */}
        <Col xs={24} sm={24} md={12} lg={12} className="!mt-3">
          <Field
            name="city"
            component={SelectFormik}
            options={Provinces.map(province => ({
              value: province,
              label: t(province) || province
            }))}
            placeholder={t('selectCity') || 'انتخاب شهر'}
            variant="outlined"
            title={t('city') || 'شهر'}
            width="100%"
            size="large"
          />
        </Col>


        {/* Designation */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="designations_id"
            component={FormInput}
            placeholder={t('selectNationality')}
            variant="outlined"
            label={t('designations_id')}
            width="100%"
            size="large"

          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          {isSuccessGetActiveUnitEmployee && <Field
            name="unitIds"
            component={MultiSelectFormik}
            options={dataGetActiveUnitEmployee}
            placeholder='انتخاب واحد جدید '
            label='انتخاب واحد جدید '
            variant="outlined"
            title="واحد جدید"
            width="100%"
            size="large"
          />}
        </Col>

        {/* Center Names */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('center_names')}
            name="center_names"
            component={FormInput}
            placeholder={t('enterCenterNames')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Country */}
        <Col xs={24} sm={24} md={12} lg={12}>
          {/* <Field
            name="country_id"
            component={SelectFormik}
            options={[
              { value: 1, label: t('iran') },
              { value: 2, label: t('afghanistan') },
              { value: 3, label: t('turkey') },
              { value: 4, label: t('uae') },
            ]}
            placeholder={t('selectCountry')}
            variant="outlined"
            title={t('country')}
            width="100%"
            size="large"
          /> */}
          <Field
            label={t('country_id')}
            name="country_id"
            component={FormInput}
            placeholder={t('enterCenterNames')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Personnel ID Bank */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('personnelIdBank')}
            name="personnelIdBank"
            component={FormInput}
            placeholder={t('enterPersonnelIdBank')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Mobile */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('mobileNumber')}
            name="mobile"
            component={FormInput}
            placeholder={t('enterMobile')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Phone */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('phoneNumber')}
            name="phone"
            component={FormInput}
            placeholder={t('enterPhone')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Birth Certificate Number */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('birthCertificateNumber')}
            name="birthCertificateNumber"
            component={FormInput}
            placeholder={t('enterBirthCertificateNumber')}
            variant="outlined"
            size="large"
          />
        </Col>

        {/* Degree Education */}
        <Col xs={24} sm={24} md={12} lg={12}>
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

        
        {/* Joining Date */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="joining_date"
            component={PersianDatePickerFormik}
            label={t('joining_date')}
            placeholder={t('chooseJoiningDate')}
            className="w-full"
            format="YYYY/MM/DD"
          />
        </Col>


        {/* Password */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            label={t('password')}
            name="password"
            component={FormInput}
            placeholder={t('enterPassword')}
            variant="outlined"
            size="large"
            type="password"
          />
        </Col>


        {/* Gender */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="gender"
            component={SelectFormik}
            options={[
              { value: "1", label: "مرد" },    // ✅ رشته
              { value: "2", label: "زن" },     // ✅ رشته
            ]}
            placeholder={t('selectGender')}
            variant="outlined"
            title={t('gender')}
            width="100%"
            size="large"
          />
        </Col>

        {/* Marital Status */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="maratial_status"
            component={SelectFormik}
            options={[
              { value: 'مجرد', label: 'مجرد' },
              { value: 'متاهل', label: 'متاهل' },
              // { value: 'widowed', label: t('widowed') },
            ]}
            placeholder={t('selectMaritalStatus')}
            variant="outlined"
            title={t('maratialStatus')}
            width="100%"
            size="large"
          />
        </Col>


        {/* Unit ID */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="velenjakReservation"
            component={SelectFormik}
            options={IsActiveDeactive}
            placeholder={t('selectUnit')}
            variant="outlined"
            title="رزرو ولنجک"
            width="100%"
            size="large"
          />
        </Col>

       

       

       
        {/* Status */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="barberShop"
            component={SelectFormik}
            options={IsActiveDeactive}
            placeholder={t('selectStatus')}
            variant="outlined"
            title='آرایشگاه'
            width="100%"
            size="large"
          />
        </Col>

        {/* Status */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field
            name="status"
            component={SelectFormik}
            options={IsActiveDeactive}
            placeholder={t('selectStatus')}
            variant="outlined"
            title='وضعیت'
            width="100%"
            size="large"
          />
        </Col>
      </Row>
    </CommonForm>
  );
};

export default PersonnelCreate;