'use client';

import { message } from 'antd';
import type { FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useServiceRouteViewModel } from '@/features/dashboard/shared/serviceRoute/model/ViewModel';

import { getFishman } from '../api';
import type { PayrollFormValues, PayrollStatementResponse } from '../types';

const normalizeDigits = (value: string) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persianDigits.indexOf(digit);
    if (persianIndex !== -1) return String(persianIndex);

    const arabicIndex = arabicDigits.indexOf(digit);
    if (arabicIndex !== -1) return String(arabicIndex);

    return digit;
  });
};

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const getCurrentPersianDatePart = (part: 'year' | 'month') => {
  try {
    const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      [part]: 'numeric',
      timeZone: 'Asia/Tehran',
    });
    const normalized = normalizeDigits(formatter.format(new Date()));
    const value = Number(normalized.replace(/\D/g, ''));

    if (Number.isFinite(value) && value > 0) {
      return value;
    }
  } catch {
    // Fallback below covers runtimes without Persian calendar support.
  }

  const now = new Date();
  return part === 'year' ? now.getFullYear() - 621 : now.getMonth() + 1;
};

const currentPersianYear = getCurrentPersianDatePart('year');
const currentPersianMonth = getCurrentPersianDatePart('month');

const PERSIAN_MONTH_NAMES = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const;

const validationSchema = Yup.object({
  year: Yup.string().required('سال الزامی است.'),
  month: Yup.string().required('ماه الزامی است.'),
});

export const usePayrollViewModel = () =>
  useServiceRouteViewModel('payroll');

export const usePayrollRequestViewModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [fishmanResult, setFishmanResult] =
    useState<PayrollStatementResponse | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialValues = useMemo<PayrollFormValues>(
    () => ({
      year: String(currentPersianYear),
      month:
        PERSIAN_MONTH_NAMES[currentPersianMonth - 1] ?? PERSIAN_MONTH_NAMES[0],
    }),
    [],
  );

  const yearOptions = useMemo(
    () =>
      Array.from(
        { length: currentPersianYear - 1388 + 1 },
        (_, index) => {
          const year = currentPersianYear - index;

          return {
            label: toPersianDigits(year),
            value: String(year),
          };
        },
      ),
    [],
  );

  const monthOptions = useMemo(
    () =>
      PERSIAN_MONTH_NAMES.map((label) => ({
        label,
        value: label,
      })),
    [],
  );

  const handleSubmit = async (
    values: PayrollFormValues,
    helpers: FormikHelpers<PayrollFormValues>,
  ) => {
    try {
      setFishmanResult(null);
      const result = await getFishman(values);
      setFishmanResult(result);
      message.success('فیش حقوقی دریافت شد.');
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در دریافت فیش حقوقی');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    isMounted,
    initialValues,
    validationSchema,
    yearOptions,
    monthOptions,
    fishmanResult,
    handleSubmit,
  };
};
