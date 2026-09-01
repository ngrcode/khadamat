'use client';

import { message } from 'antd';
import type { FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useServiceRouteViewModel } from '@/features/dashboard/shared/serviceRoute/model/ViewModel';

import { getHokmDetail, requestInstallmentDeduction } from '../api';
import type {
  HokmDetailFormValues,
  HokmDetailResponse,
  HumanResourcesModalKey,
  InstallmentDeductionFormValues,
} from '../types';

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

const getCurrentPersianYear = () => {
  try {
    const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
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

  return new Date().getFullYear() - 621;
};

const currentPersianYear = getCurrentPersianYear();

const hokmDetailValidationSchema = Yup.object({
  year: Yup.string().required('سال الزامی است.'),
});

const installmentDeductionValidationSchema = Yup.object({
  fullName: Yup.string().required('نام و نام خانوادگی الزامی است.'),
  facilities: Yup.string().required('شرح گواهی الزامی است.'),
  organizationName: Yup.string(),
  branchName: Yup.string(),
});

export const useHumanResourcesViewModel = () =>
  useServiceRouteViewModel('human-resources');

export const useHumanResourcesRequestModalViewModel = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [activeModal, setActiveModal] = useState<HumanResourcesModalKey | null>(
    null,
  );

  const openModal = (modalKey: HumanResourcesModalKey) => {
    setActiveModal(modalKey);
  };

  const backToMenu = () => {
    setActiveModal(null);
  };

  const closeAll = () => {
    setActiveModal(null);
    onClose();
  };

  return {
    activeModal,
    openModal,
    backToMenu,
    closeAll,
  };
};

export const useHokmDetailRequestViewModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hokmDetailResult, setHokmDetailResult] =
    useState<HokmDetailResponse | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialValues = useMemo<HokmDetailFormValues>(
    () => ({
      year: String(currentPersianYear),
    }),
    [],
  );

  const yearOptions = useMemo(
    () =>
      Array.from({ length: currentPersianYear - 1388 + 1 }, (_, index) => {
        const year = currentPersianYear - index;

        return {
          label: toPersianDigits(year),
          value: String(year),
        };
      }),
    [],
  );

  const handleSubmit = async (
    values: HokmDetailFormValues,
    helpers: FormikHelpers<HokmDetailFormValues>,
  ) => {
    try {
      setHokmDetailResult(null);
      const result = await getHokmDetail(values.year);
      setHokmDetailResult(result);
      message.success('پاسخ احکام کارگزینی دریافت شد.');
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در دریافت احکام کارگزینی');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    isMounted,
    initialValues,
    validationSchema: hokmDetailValidationSchema,
    yearOptions,
    hokmDetailResult,
    handleSubmit,
  };
};

export const useInstallmentDeductionRequestViewModel = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialValues = useMemo<InstallmentDeductionFormValues>(
    () => ({
      fullName: '',
      facilities: '',
      organizationName: '',
      branchName: '',
    }),
    [],
  );

  const handleSubmit = async (
    values: InstallmentDeductionFormValues,
    helpers: FormikHelpers<InstallmentDeductionFormValues>,
  ) => {
    try {
      await requestInstallmentDeduction(values);
      message.success('درخواست گواهی کسر اقساط ارسال شد.');
      onClose();
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در ثبت گواهی کسر اقساط');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    isMounted,
    initialValues,
    validationSchema: installmentDeductionValidationSchema,
    handleSubmit,
  };
};
