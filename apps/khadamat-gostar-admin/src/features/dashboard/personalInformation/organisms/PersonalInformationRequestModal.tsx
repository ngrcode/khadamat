'use client';

import {
  CheckOutlined,
  IdcardOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Avatar, Button, Modal, Typography } from 'antd';
import { Field } from 'formik';

import { CustomButton, FormInput, FormikWrapper, SelectFormik, TextAreaFormik } from '@repo/ui';
import { getPortalServiceByKey } from '@/features/dashboard/services';
import type { RequestModalProps } from '@/features/dashboard/shared/genericRequest/types';

import { usePersonalInformationRequestViewModel } from '../model/ViewModel';

const maritalStatusOptions = [
  { value: '0', label: 'نامشخص' },
  { value: '1', label: 'مجرد' },
  { value: '2', label: 'متأهل' },
];

const genderOptions = [
  { value: '1', label: 'مرد' },
  { value: '2', label: 'زن' },
];

export function PersonalInformationRequestModal({
  open,
  onClose,
}: RequestModalProps) {
  const service = getPortalServiceByKey('personal-information');
  const {
    isMounted,
    lookupId,
    isLoadingEmployee,
    isUploadingPhoto,
    initialValues,
    validationSchema,
    employee,
    photoSrc,
    uploadEmployeeId,
    loadEmployee,
    handlePhotoChange,
    handleSubmit,
  } = usePersonalInformationRequestViewModel();

  if (!isMounted || !service) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{service.icon}</span>
          <div>
            <Typography.Title level={5} className="!mb-1 !text-slate-800">
              اطلاعات شخصی
            </Typography.Title>
          
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={860}
      className="portal-request-modal"
      destroyOnHidden
    >
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
        <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600">
          <IdcardOutlined className="text-slate-400" />
          <span>شناسه کارمند: {lookupId || '-'}</span>
        </div>
        <Button
          type="primary"
          loading={isLoadingEmployee}
          onClick={loadEmployee}
          className="!h-11 !rounded-xl !bg-[#1d6fd8]"
        >
          دریافت اطلاعات
        </Button>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar size={72} src={photoSrc || undefined} icon={<UserOutlined />} />
            <div>
              <Typography.Text className="block !font-bold !text-slate-800">
                تصویر پروفایل
              </Typography.Text>
             
            </div>
          </div>

          <Button
            icon={<UploadOutlined />}
            loading={isUploadingPhoto}
            className="!h-11 !rounded-xl"
            onClick={() => document.getElementById('profile-photo-input')?.click()}
          >
            انتخاب و آپلود تصویر
          </Button>
          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              void handlePhotoChange(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
        </div>
      </div>

      {!employee && (
        <Alert
          type="info"
          showIcon
          className="!mb-6"
          message="اطلاعات شخصی هنوز دریافت نشده است."
          description="شناسه کارمند از اطلاعات ذخیره‌شده ورود خوانده می‌شود."
        />
      )}

      <FormikWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <div className="portal-form-grid">
            <Field
              name="first_name"
              label="نام"
              component={FormInput}
              disabled
              stylesInput="!h-11 !rounded-xl"
            />
            <Field
              name="last_name"
              label="نام خانوادگی"
              component={FormInput}
              disabled
              stylesInput="!h-11 !rounded-xl"
            />
            <Field
              name="father_name"
              label="نام پدر"
              component={FormInput}
              disabled
              stylesInput="!h-11 !rounded-xl"
            />
            <Field
              name="date_of_birth"
              label="تاریخ تولد"
              component={FormInput}
              disabled
              stylesInput="!h-11 !rounded-xl"
            />
            <Field
              name="birthCertificateNumber"
              label="شماره شناسنامه"
              component={FormInput}
              disabled
              stylesInput="!h-11 !rounded-xl"
            />
            <Field
              name="passport_number"
              label="کد ملی"
              component={FormInput}
              disabled
              stylesInput="!h-11 !rounded-xl"
            />
            <Field
              name="gender"
              title="جنسیت"
              component={SelectFormik}
              options={genderOptions}
              disabled
              placeholder="جنسیت"
              style={{ height: 44 }}
            />
            <Field
              name="maratial_status"
              title="وضعیت تأهل"
              component={SelectFormik}
              options={maritalStatusOptions}
              placeholder="انتخاب وضعیت تأهل"
              style={{ height: 44 }}
            />
            <Field
              name="password"
              label="رمز عبور"
              component={FormInput}
              type="password"
              showPasswordToggle
              stylesInputPassword="!h-11 !rounded-xl"
            />
            <Field
              name="mobile"
              label="شماره موبایل"
              component={FormInput}
              stylesInput="!h-11 !rounded-xl"
            />
            <div className="portal-form-full">
              <Field
                name="present_address"
                label="آدرس"
                component={TextAreaFormik}
                placeholder="آدرس را وارد کنید"
                maxLength={1000}
                style={{ minHeight: 120 }}
              />
            </div>

            <div className="portal-modal-actions">
              <CustomButton
                htmlType="button"
                type="default"
                label="انصراف"
                animated={false}
                onClick={onClose}
                className="!h-11 !rounded-xl !border !border-slate-200 !bg-white !text-slate-600 !shadow-none"
              />
              <CustomButton
                label="ثبت تغییرات"
                loading={isSubmitting}
                disabled={!employee}
                animated={false}
                icon={<CheckOutlined />}
                iconPositionShow
                className="!h-11 !rounded-xl !border-none !bg-[#1d6fd8] !text-white !shadow-none"
              />
            </div>
          </div>
        )}
      </FormikWrapper>
    </Modal>
  );
}
