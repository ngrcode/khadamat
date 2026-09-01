'use client';

import { message } from 'antd';
import type { FormikHelpers } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';

import { useAuthStore } from '@/store/authStore';
import { useServiceRouteViewModel } from '@/features/dashboard/shared/serviceRoute/model/ViewModel';

import { getEmployeeShow, updateEmployee, uploadProfilePhoto } from '../api';
import type {
  EmployeeProfileInfo,
  PersonalInformationFormValues,
} from '../types';

const toFormString = (value: unknown) =>
  value === undefined || value === null ? '' : String(value);

const emptyInitialValues: PersonalInformationFormValues = {
  id: '',
  first_name: '',
  last_name: '',
  father_name: '',
  date_of_birth: '',
  birthCertificateNumber: '',
  passport_number: '',
  password: '',
  maratial_status: '',
  gender: '',
  mobile: '',
  present_address: '',
};

const mapEmployeeToFormValues = (
  employee?: EmployeeProfileInfo | null,
): PersonalInformationFormValues => ({
  id: toFormString(employee?.id),
  first_name: toFormString(employee?.first_name),
  last_name: toFormString(employee?.last_name),
  father_name: toFormString(employee?.father_name),
  date_of_birth: toFormString(employee?.date_of_birth),
  birthCertificateNumber: toFormString(employee?.birthCertificateNumber),
  passport_number: toFormString(employee?.passport_number),
  password: toFormString(employee?.password),
  maratial_status: toFormString(employee?.maratial_status),
  gender: toFormString(employee?.gender),
  mobile: toFormString(employee?.mobile),
  present_address: toFormString(employee?.present_address),
});

const validationSchema = Yup.object({
  id: Yup.string().required('شناسه کارمند الزامی است.'),
  maratial_status: Yup.string().required('وضعیت تأهل الزامی است.'),
  mobile: Yup.string(),
  password: Yup.string(),
  present_address: Yup.string(),
});

const readStoredEmployeeId = () => {
  if (typeof window === 'undefined') return '';

  const employeeId = window.localStorage.getItem('employeeId')?.trim();

  if (employeeId) return employeeId;

  try {
    const accountInfo = JSON.parse(
      window.localStorage.getItem('accountInfo') ?? '{}',
    );

    return accountInfo?.id ? String(accountInfo.id) : '';
  } catch {
    return '';
  }
};

export const usePersonalInformationViewModel = () =>
  useServiceRouteViewModel('personal-information');

export const usePersonalInformationRequestViewModel = () => {
  const userName = useAuthStore((state) => state.userName);
  const hasLoadedEmployee = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lookupId, setLookupId] = useState('');
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [employee, setEmployee] = useState<EmployeeProfileInfo | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialValues = useMemo(
    () => (employee ? mapEmployeeToFormValues(employee) : emptyInitialValues),
    [employee],
  );

  const uploadEmployeeId = userName || 'admin';
  const photoSrc = employee?.photo || employee?.photo_a_path || '';

  const loadEmployee = useCallback(async () => {
    const employeeId = readStoredEmployeeId();
    setLookupId(employeeId);

    if (!employeeId) {
      message.warning('شناسه کارمند در اطلاعات ورود پیدا نشد.');
      return;
    }

    setIsLoadingEmployee(true);

    try {
      const response = await getEmployeeShow(employeeId);

      if (!response.info) {
        setEmployee(null);
        message.warning(response.description ?? 'اطلاعاتی برای این شناسه یافت نشد.');
        return;
      }

      setEmployee(response.info);
      message.success('اطلاعات شخصی دریافت شد.');
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در دریافت اطلاعات شخصی');
    } finally {
      setIsLoadingEmployee(false);
    }
  }, []);

  useEffect(() => {
    if (!isMounted || hasLoadedEmployee.current) return;

    hasLoadedEmployee.current = true;
    void loadEmployee();
  }, [isMounted, loadEmployee]);

  const handlePhotoChange = async (file?: File) => {
    if (!file) return;

    setIsUploadingPhoto(true);

    try {
      await uploadProfilePhoto({
        employeeId: uploadEmployeeId,
        photo: file,
      });
      message.success('تصویر پروفایل آپلود شد.');
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در آپلود تصویر پروفایل');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async (
    values: PersonalInformationFormValues,
    helpers: FormikHelpers<PersonalInformationFormValues>,
  ) => {
    try {
      const id = Number(values.id);

      if (!Number.isFinite(id)) {
        throw new Error('شناسه کارمند معتبر نیست.');
      }

      await updateEmployee({
        id,
        maratial_status: values.maratial_status,
        mobile: values.mobile,
        password: values.password,
        present_address: values.present_address,
      });
      message.success('اطلاعات شخصی بروزرسانی شد.');
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در بروزرسانی اطلاعات شخصی');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    isMounted,
    lookupId,
    setLookupId,
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
  };
};
