"use client";

import { CheckOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Alert, Modal, Typography, message } from "antd";
import { Field } from "formik";
import { useRef, useState } from "react";

import { CustomButton, FormikWrapper, SelectFormik } from "@repo/ui";
import { getPortalServiceByKey } from "@/features/dashboard/services";
import type { RequestModalProps } from "@/features/dashboard/shared/genericRequest/types";

import { downloadPayrollStatementPdf } from "../pdf";
import type { PayrollStatementField, PayrollStatementInfo } from "../types";
import { usePayrollRequestViewModel } from "../model/ViewModel";

const EMPTY_DISPLAY_VALUE = "دیتایی نیست";
const UNTITLED_DISPLAY_VALUE = "بدون عنوان";

const hasDisplayableInfo = (info: unknown) =>
  info !== null && info !== undefined && info !== "";

const isStructuredStatementInfo = (
  info: unknown,
): info is PayrollStatementInfo =>
  typeof info === "object" && info !== null && !Array.isArray(info);

const normalizeText = (value: string) =>
  value.replace(/\s+/g, " ").replace(/ي/g, "ی").replace(/ك/g, "ک").trim();

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const numberFormatter = new Intl.NumberFormat("fa-IR");

const isNumericText = (value: string) => /^\d+$/.test(value);

const formatValue = (
  value: PayrollStatementField["value"],
  variant: "number" | "text" = "text",
) => {
  if (!hasDisplayableInfo(value)) {
    return EMPTY_DISPLAY_VALUE;
  }

  const stringValue = String(value).trim();

  if (variant === "number" && isNumericText(stringValue)) {
    return numberFormatter.format(Number(stringValue));
  }

  return toPersianDigits(stringValue);
};

const getFields = (fields?: PayrollStatementField[] | null) =>
  Array.isArray(fields) ? fields : [];

const getFieldValue = (
  fields: PayrollStatementField[],
  matcher: string | RegExp,
) => {
  const field = fields.find((item) => {
    const title = normalizeText(item.dictionaryTitle ?? "");

    return typeof matcher === "string"
      ? title === matcher
      : matcher.test(title);
  });

  return field?.value;
};

const fieldHasValue = (field: PayrollStatementField) =>
  hasDisplayableInfo(field.value);

const sortByPreferredTitles = (
  fields: PayrollStatementField[],
  preferredTitles: Array<string | RegExp>,
) => {
  const remaining = [...fields];
  const picked = preferredTitles
    .map((matcher) => {
      const index = remaining.findIndex((item) => {
        const title = normalizeText(item.dictionaryTitle ?? "");

        return typeof matcher === "string"
          ? title === matcher
          : matcher.test(title);
      });

      if (index === -1) return null;

      return remaining.splice(index, 1)[0] ?? null;
    })
    .filter(Boolean) as PayrollStatementField[];

  return [...picked, ...remaining.filter(fieldHasValue)];
};

const PayrollSlipLogo = () => (
  <div className="payroll-slip-logo" aria-hidden="true">
    <span className="payroll-slip-logo-diamond" />
    <span className="payroll-slip-logo-box">ر</span>
  </div>
);

const PayrollInfoLine = ({
  label,
  value,
}: {
  label: string;
  value: PayrollStatementField["value"];
}) => (
  <div className="payroll-slip-info-line">
    <span>{label}</span>
    <strong>{formatValue(value)}</strong>
  </div>
);

const PayrollColumnRows = ({
  fields,
  variant = "text",
}: {
  fields: PayrollStatementField[];
  variant?: "number" | "text";
}) => (
  <div className="payroll-slip-column-body">
    {fields.map((field, index) => (
      <div
        key={`${field.dictionaryTitle ?? UNTITLED_DISPLAY_VALUE}-${index}`}
        className="payroll-slip-row"
      >
        <span className="payroll-slip-row-title">
          {field.dictionaryTitle || UNTITLED_DISPLAY_VALUE}
        </span>
        <strong className="payroll-slip-row-value">
          {formatValue(field.value, variant)}
        </strong>
      </div>
    ))}
  </div>
);

const PayrollSlipColumn = ({
  title,
  fields,
  variant = "text",
}: {
  title: string;
  fields: PayrollStatementField[];
  variant?: "number" | "text";
}) => (
  <section className="payroll-slip-column">
    <div className="payroll-slip-column-title">{title}</div>
    <PayrollColumnRows fields={fields} variant={variant} />
  </section>
);

const PayrollSlipView = ({
  info,
  year,
  month,
}: {
  info: PayrollStatementInfo;
  year: string;
  month: string;
}) => {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const payrollSlipRef = useRef<HTMLDivElement>(null);
  const personnelInfo = getFields(info.personnelInfo);
  const periodTitle = `${month} ماه ${toPersianDigits(year)}`;
  const salaryBenefit = sortByPreferredTitles(getFields(info.salaryBenefit), [
    /اضافه ثابت/,
    "حق ایاب و ذهاب",
    "بن کارگری",
    "حق خواروبار",
    "حق مسکن",
    "حقوق ماهیانه",
    "حق معیشت",
    "اضافه کاری",
    "حق ناهار",
  ]);
  const deduction = sortByPreferredTitles(getFields(info.deduction), [
    /بیمه تامین اجتماعی/,
    /بیمه تکمیلی/,
    "جمع اقساط وام",
    "سایر کسور",
    "کسر ثابت",
    "مالیات",
  ]);
  const loanInfo = sortByPreferredTitles(getFields(info.loanInfo), []);
  const efficiency = sortByPreferredTitles(getFields(info.efficiency), [
    "کارکرد موثر",
    /مرخصی استحقاقی استفاده شده - روز/,
    /مرخصی استحقاقی استفاده شده - دقیقه/,
    "کارکرد ناهار",
    "کارکرد ایاب و ذهاب",
    /اضافه کار عادی/,
  ]);
  const handleDownloadPdf = async () => {
    try {
      if (!payrollSlipRef.current) {
        message.error("اطلاعات فیش برای ساخت PDF آماده نیست");
        return;
      }

      setIsDownloadingPdf(true);
      await downloadPayrollStatementPdf({
        element: payrollSlipRef.current,
        year,
        month,
      });
    } catch (error: unknown) {
      message.error(
        error instanceof Error ? error.message : "خطا در ساخت فایل PDF",
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="payroll-slip-wrap">
      <button
        type="button"
        className="payroll-slip-pdf-button"
        onClick={handleDownloadPdf}
        disabled={isDownloadingPdf}
      >
        <FilePdfOutlined />
        {isDownloadingPdf ? "در حال دریافت..." : "دریافت فایل pdf"}
      </button>

      <div ref={payrollSlipRef} className="payroll-slip-export">
        <h3 className="payroll-slip-page-title">فیش حقوقی : {periodTitle}</h3>

        <div className="payroll-slip-sheet">
          <div className="payroll-slip-header">
            <PayrollSlipLogo />
            <div className="payroll-slip-company">
              فیش حقوقی شرکت خدماتی پشتیبانی رفاه پردیس
            </div>
            <div className="payroll-slip-personnel-grid">
              <div>
                <PayrollInfoLine
                  label="نام"
                  value={getFieldValue(personnelInfo, "نام")}
                />
                <PayrollInfoLine
                  label="شغل"
                  value={getFieldValue(personnelInfo, "شغل")}
                />
                <PayrollInfoLine label="دوره" value={periodTitle} />
              </div>
              <div>
                <PayrollInfoLine
                  label="تلفن همراه"
                  value={getFieldValue(personnelInfo, "تلفن همراه")}
                />
                <PayrollInfoLine
                  label="پست"
                  value={getFieldValue(personnelInfo, "پست")}
                />
              </div>
              <div>
                <PayrollInfoLine
                  label="واحد سازمانی"
                  value={getFieldValue(
                    personnelInfo,
                    /واحد سازمانی|واحد سازماني/,
                  )}
                />
                <PayrollInfoLine
                  label="شماره حساب"
                  value={getFieldValue(personnelInfo, "شماره حساب")}
                />
              </div>
            </div>
          </div>

          <div className="payroll-slip-table">
            <PayrollSlipColumn title="کارکرد" fields={efficiency} />
            <PayrollSlipColumn
              title="حقوق و مزایا"
              fields={salaryBenefit}
              variant="number"
            />
            <PayrollSlipColumn
              title="کسر حقوق"
              fields={deduction}
              variant="number"
            />
            <PayrollSlipColumn
              title="اطلاعات وام"
              fields={loanInfo}
              variant="number"
            />
          </div>

          <div className="payroll-slip-totals">
            <div />
            <div>جمع مزایا : {formatValue(info.sumSalary, "number")}</div>
            <div>جمع کسورات : {formatValue(info.sumDeduction, "number")}</div>
            <div>
              جمع اقساط وام : {formatValue(info.sumInstallmentsLoan, "number")}
            </div>
          </div>

          <div className="payroll-slip-payable">
            <div />
            <div>خالص پرداختی : {formatValue(info.payable, "number")}</div>
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export function PayrollRequestModal({ open, onClose }: RequestModalProps) {
  const service = getPortalServiceByKey("payroll");
  const {
    isMounted,
    initialValues,
    validationSchema,
    yearOptions,
    monthOptions,
    fishmanResult,
    handleSubmit,
  } = usePayrollRequestViewModel();
  const hasFishmanInfo = hasDisplayableInfo(fishmanResult?.info);
  const structuredInfo = isStructuredStatementInfo(fishmanResult?.info)
    ? fishmanResult.info
    : null;

  if (!isMounted || !service) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{service.icon}</span>
          <div>
            <Typography.Title level={5} className="!mb-1 !text-slate-800">
              فرم {service.label}
            </Typography.Title>
            <Typography.Text className="!text-xs !text-slate-500">
              سال و ماه فیش حقوقی را انتخاب کنید.
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
        {({ isSubmitting, values }) => (
          <div className="portal-form-grid payroll-modal-form">
            <div className="portal-form-full payroll-form-intro">
              <Alert
                type="info"
                showIcon
                message="دریافت فیش حقوقی"
                description="سال و ماه مورد نظر را انتخاب کنید."
              />
            </div>

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

            <Field
              name="month"
              title="ماه"
              required
              component={SelectFormik}
              options={monthOptions}
              placeholder="انتخاب ماه"
              allowClear={false}
              style={{ height: 44 }}
            />

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
                label="دریافت فیش"
                loading={isSubmitting}
                animated={false}
                icon={<CheckOutlined />}
                iconPositionShow
                className="!h-11 !rounded-xl !border-none !bg-[#1d6fd8] !text-white !shadow-none"
              />
            </div>

            {fishmanResult && structuredInfo && (
              <div className="portal-form-full payroll-slip-result">
                <PayrollSlipView
                  info={structuredInfo}
                  year={values.year}
                  month={values.month}
                />
              </div>
            )}

            {fishmanResult && !structuredInfo && (
              <div className="portal-form-full payroll-slip-result">
                <Alert
                  type={hasFishmanInfo ? "success" : "warning"}
                  showIcon
                  message={
                    hasFishmanInfo ? "فیش حقوقی دریافت شد" : EMPTY_DISPLAY_VALUE
                  }
                  description={
                    <div className="space-y-2 text-right">
                      <Typography.Text>
                        {String(fishmanResult.info ?? EMPTY_DISPLAY_VALUE)}
                      </Typography.Text>

                      {fishmanResult.description && (
                        <div>
                          <Typography.Text strong>توضیح: </Typography.Text>
                          <Typography.Text>
                            {fishmanResult.description}
                          </Typography.Text>
                        </div>
                      )}

                      {fishmanResult.doTime && (
                        <div>
                          <Typography.Text strong>زمان: </Typography.Text>
                          <Typography.Text>
                            {fishmanResult.doTime}
                          </Typography.Text>
                        </div>
                      )}
                    </div>
                  }
                />
              </div>
            )}
          </div>
        )}
      </FormikWrapper>
    </Modal>
  );
}
