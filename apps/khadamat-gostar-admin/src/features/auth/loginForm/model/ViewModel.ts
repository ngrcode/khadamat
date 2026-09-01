'use client';

import { useState } from 'react';
import * as Yup from 'yup';

import { t } from '@repo/i18n';
import { useAuthStore } from '@/store/authStore';

export interface LoginFormValues {
  userName: string;
  password: string;
}

interface LoginResponse {
  isAdmin?: boolean;
  panelMenu?: string;
  userName?: string;
  firstLogin?: boolean;
  message?: string;
  accountShow?: unknown;
  accountInfo?: {
    id?: number;
    unitId?: number;
    first_name?: string | null;
    last_name?: string | null;
    photo?: string | null;
    photo_a_path?: string | null;
    unit_name?: string | null;
    center_names?: string | null;
  } | null;
}

const convertFaToEnNumbers = (str: string): string => {
  if (typeof str !== 'string') return str;
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  return str.replace(/[۰-۹٠-٩]/g, (digit) => {
    let index = persianDigits.indexOf(digit);
    if (index !== -1) return index.toString();
    index = arabicDigits.indexOf(digit);
    if (index !== -1) return index.toString();
    return digit;
  });
};

export const useLoginFormViewModel = () => {
  const { login, setUserInfo, setLoading, setError } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required(t('usernameRequired'))
      .transform((value) => convertFaToEnNumbers(value)),
    password: Yup.string().required(t('passwordRequired')),
  });

  const initialValues: LoginFormValues = {
    userName: '',
    password: '',
  };

  const onSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);
    setError(null);

    try {
      const processedUserName = convertFaToEnNumbers(values.userName);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: processedUserName,
          password: values.password,
        }),
        cache: 'no-store',
      });

      const loginData = (await response.json().catch(() => ({}))) as LoginResponse;

      if (!response.ok) {
        throw new Error(loginData?.message ?? t('loginError'));
      }

      login();
      const isAdmin = loginData?.isAdmin === true;
      const userType: string = isAdmin ? 'ADMIN' : 'USER';

      const userName = loginData?.userName ?? processedUserName;
      const firstLogin = loginData?.firstLogin ?? false;
      setUserInfo(userType, userName, firstLogin);

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accountShowResponse');
      localStorage.removeItem('accountInfo');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('unitId');
      localStorage.removeItem('userFullName');
      localStorage.setItem('panelMenu', loginData?.panelMenu ?? '');

      if (loginData?.accountShow) {
        localStorage.setItem(
          'accountShowResponse',
          JSON.stringify(loginData.accountShow),
        );
      }

      if (loginData?.accountInfo) {
        const fullName = [
          loginData.accountInfo.first_name,
          loginData.accountInfo.last_name,
        ]
          .filter(Boolean)
          .join(' ')
          .trim();

        localStorage.setItem('accountInfo', JSON.stringify(loginData.accountInfo));
        localStorage.setItem('employeeId', String(loginData.accountInfo.id ?? ''));
        localStorage.setItem('unitId', String(loginData.accountInfo.unitId ?? ''));
        localStorage.setItem('userFullName', fullName);
      }

      if (loginData?.panelMenu) {
        window.dispatchEvent(new Event('panelMenu:updated'));
      }

      window.location.assign('/dashboard');
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.reason ??
        err?.response?.data?.title ??
        err?.message ??
        t('loginError');
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isSubmitting,
    isPending: isSubmitting,
  };
};
