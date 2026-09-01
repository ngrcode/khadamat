'use client';

import { CheckOutlined, IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import { Field } from 'formik';

import { CustomButton, FormInput, FormikWrapper, TextAreaFormik } from '@repo/ui';
import type { PortalServiceKey } from '@/features/dashboard/services';

import type { RequestModalProps } from '../types';
import { useGenericRequestViewModel } from '../model/ViewModel';

export function GenericRequestModal({
  serviceKey,
  open,
  onClose,
}: RequestModalProps & {
  serviceKey: PortalServiceKey;
}) {
  const {
    service,
    isMounted,
    modalTitle,
    initialValues,
    validationSchema,
    handleSubmit,
  } = useGenericRequestViewModel({ serviceKey, onClose });

  if (!isMounted || !service) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{service.icon}</span>
          <div>
            <Typography.Title level={5} className="!mb-1 !text-slate-800">
              {modalTitle}
            </Typography.Title>
            <Typography.Text className="!text-xs !text-slate-500">
              اطلاعات درخواست را تکمیل کنید.
            </Typography.Text>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={720}
      className="portal-request-modal"
      destroyOnHidden
    >
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <div className="portal-form-grid">
            <Field
              name="personnelCode"
              label="کد پرسنلی"
              required
              component={FormInput}
              prefix={<IdcardOutlined className="text-slate-400" />}
              placeholder="کد پرسنلی را وارد کنید"
              stylesInput="!h-11 !rounded-xl"
            />

            <Field
              name="phoneNumber"
              label="شماره تماس"
              component={FormInput}
              prefix={<PhoneOutlined className="text-slate-400" />}
              placeholder="شماره تماس اختیاری"
              stylesInput="!h-11 !rounded-xl"
            />

            <div className="portal-form-full">
              <Field
                name="subject"
                label="موضوع درخواست"
                required
                component={FormInput}
                placeholder={service.subjectPlaceholder}
                stylesInput="!h-11 !rounded-xl"
              />
            </div>

            <div className="portal-form-full">
              <Field
                name="description"
                label="توضیحات"
                component={TextAreaFormik}
                placeholder={service.descriptionPlaceholder}
                maxLength={600}
                style={{ minHeight: 132 }}
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
                label="ثبت درخواست"
                loading={isSubmitting}
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
