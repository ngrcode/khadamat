'use client';

import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Alert, Modal, Typography } from 'antd';
import { Field } from 'formik';
import type { ReactNode } from 'react';

import { CustomButton, FormikWrapper, SelectFormik } from '@repo/ui';

import type { HokmDetailField, HokmDetailInfo } from '../types';
import { useHokmDetailRequestViewModel } from '../model/ViewModel';

const EMPTY_DISPLAY_VALUE = 'دیتایی نیست';
const UNTITLED_DISPLAY_VALUE = 'بدون عنوان';

const hasDisplayableInfo = (info: unknown) =>
  info !== null && info !== undefined && info !== '';

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const numberFormatter = new Intl.NumberFormat('fa-IR');

const sanitizeInfoForDisplay = (info: unknown): unknown => {
  if (!hasDisplayableInfo(info)) {
    return EMPTY_DISPLAY_VALUE;
  }

  if (Array.isArray(info)) {
    return info.map(sanitizeInfoForDisplay);
  }

  if (typeof info === 'object') {
    return Object.fromEntries(
      Object.entries(info as Record<string, unknown>).map(([key, value]) => [
        key,
        sanitizeInfoForDisplay(value),
      ]),
    );
  }

  return info;
};

const formatInfo = (info: unknown) => {
  if (!hasDisplayableInfo(info)) {
    return EMPTY_DISPLAY_VALUE;
  }

  if (typeof info === 'string') {
    return info;
  }

  return JSON.stringify(sanitizeInfoForDisplay(info), null, 2);
};

const isStructuredHokmInfo = (info: unknown): info is HokmDetailInfo =>
  typeof info === 'object' && info !== null && !Array.isArray(info);

const isNumericText = (value: string) => /^\d+$/.test(value);

const formatValue = (
  value: HokmDetailField['value'],
  variant: 'money' | 'text' = 'text',
) => {
  if (!hasDisplayableInfo(value)) {
    return EMPTY_DISPLAY_VALUE;
  }

  const stringValue = String(value).trim();

  if (variant === 'money' && isNumericText(stringValue)) {
    return `${numberFormatter.format(Number(stringValue))} ریال`;
  }

  return toPersianDigits(stringValue);
};

const getFields = (fields?: HokmDetailField[] | null) =>
  Array.isArray(fields) ? fields : [];

const HokmSummaryItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm">
    <Typography.Text className="block !text-xs !font-bold !text-slate-500">
      {label}
    </Typography.Text>
    <Typography.Text className="mt-2 block !text-lg !font-black !text-slate-900">
      {formatValue(value, 'money')}
    </Typography.Text>
  </div>
);

const HokmFieldGrid = ({
  fields,
  variant = 'text',
}: {
  fields: HokmDetailField[];
  variant?: 'money' | 'text';
}) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
    {fields.map((field, index) => (
      <div
        key={`${field.dictionaryTitle ?? UNTITLED_DISPLAY_VALUE}-${index}`}
        className="rounded-xl border border-slate-200 bg-white p-3"
      >
        <Typography.Text className="block !text-[11px] !font-bold !leading-6 !text-slate-500">
          {field.dictionaryTitle || UNTITLED_DISPLAY_VALUE}
        </Typography.Text>
        <Typography.Text className="mt-1 block break-words !text-sm !font-black !leading-7 !text-slate-800">
          {formatValue(field.value, variant)}
        </Typography.Text>
      </div>
    ))}
  </div>
);

const HokmSection = ({
  title,
  fields,
  variant = 'text',
}: {
  title: string;
  fields: HokmDetailField[];
  variant?: 'money' | 'text';
}) => {
  if (!fields.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Typography.Text className="!text-sm !font-black !text-slate-800">
          {title}
        </Typography.Text>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
          {toPersianDigits(fields.length)} مورد
        </span>
      </div>
      <HokmFieldGrid fields={fields} variant={variant} />
    </section>
  );
};

const HokmDetailInfoView = ({ info }: { info: HokmDetailInfo }) => {
  const personnelInfo = getFields(info.personnelInfo);

  return (
    <div className="max-h-[58vh] overflow-y-auto pl-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <HokmSummaryItem label="خالص پرداختی" value={info.payable} />
        <HokmSummaryItem label="جمع حقوق و مزایا" value={info.sumSalary} />
        <HokmSummaryItem label="جمع کسورات" value={info.sumDeduction} />
        <HokmSummaryItem label="جمع وام‌ها" value={info.sumLoan} />
        <HokmSummaryItem
          label="جمع اقساط وام"
          value={info.sumInstallmentsLoan}
        />
      </div>

      {personnelInfo.length > 0 && (
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4">
          <Typography.Text className="mb-3 block !text-sm !font-black !text-slate-800">
            اطلاعات پرسنلی
          </Typography.Text>
          <HokmFieldGrid fields={personnelInfo} />
        </section>
      )}

      <div className="mt-4 grid gap-4">
        <HokmSection
          title="حقوق و مزایا"
          fields={getFields(info.salaryBenefit)}
          variant="money"
        />
        <HokmSection
          title="تسهیلات و وام‌ها"
          fields={getFields(info.loanInfo)}
          variant="money"
        />
        <HokmSection
          title="کسورات"
          fields={getFields(info.deduction)}
          variant="money"
        />
        <HokmSection title="کارکرد" fields={getFields(info.efficiency)} />
      </div>
    </div>
  );
};

export function HokmDetailRequestModal({
  open,
  onClose,
  onBack,
  icon,
}: {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  icon: ReactNode;
}) {
  const {
    isMounted,
    initialValues,
    validationSchema,
    yearOptions,
    hokmDetailResult,
    handleSubmit,
  } = useHokmDetailRequestViewModel();
  const hasHokmInfo = hasDisplayableInfo(hokmDetailResult?.info);
  const structuredInfo = isStructuredHokmInfo(hokmDetailResult?.info)
    ? hokmDetailResult.info
    : null;

  if (!isMounted) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{icon}</span>
          <div>
            <Typography.Title level={5} className="!mb-1 !text-slate-800">
              احکام کارگزینی
            </Typography.Title>
            <Typography.Text className="!text-xs !text-slate-500">
              سال حکم کارگزینی را انتخاب کنید.
            </Typography.Text>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      centered
      width={1040}
      className="portal-request-modal"
      destroyOnHidden={false}
    >
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <div className="portal-form-grid">
            <div className="portal-form-full">
              <Alert
                type="info"
                showIcon
                message="دریافت احکام کارگزینی"
              />
            </div>

            <div className="portal-form-full">
              <Field
                name="year"
                title="سال"
                required
                component={SelectFormik}
                options={yearOptions}
                placeholder="انتخاب سال"
                allowClear={false}
                style={{ height: 44 }}
              />
            </div>

            {hokmDetailResult && (
              <div className="portal-form-full">
                <Alert
                  type={hasHokmInfo ? 'success' : 'warning'}
                  showIcon
                  message={
                    hasHokmInfo ? 'اطلاعات حکم دریافت شد' : EMPTY_DISPLAY_VALUE
                  }
                  description={
                    <div className="space-y-2 text-right">
                      {structuredInfo ? (
                        <HokmDetailInfoView info={structuredInfo} />
                      ) : (
                        <div>
                          <Typography.Text>
                            {formatInfo(hokmDetailResult.info)}
                          </Typography.Text>
                        </div>
                      )}

                      {hokmDetailResult.description && (
                        <div>
                          <Typography.Text strong>توضیح: </Typography.Text>
                          <Typography.Text>
                            {hokmDetailResult.description}
                          </Typography.Text>
                        </div>
                      )}

                      {hokmDetailResult.doTime && (
                        <div>
                          <Typography.Text strong>زمان: </Typography.Text>
                          <Typography.Text>{hokmDetailResult.doTime}</Typography.Text>
                        </div>
                      )}
                    </div>
                  }
                />
              </div>
            )}

            <div className="portal-modal-actions">
              <CustomButton
                htmlType="button"
                type="default"
                label="بازگشت"
                animated={false}
                onClick={onBack}
                icon={<ArrowRightOutlined />}
                iconPositionShow
                className="!h-11 !rounded-xl !border !border-slate-200 !bg-white !text-slate-600 !shadow-none"
              />
              <CustomButton
                label="دریافت حکم"
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
