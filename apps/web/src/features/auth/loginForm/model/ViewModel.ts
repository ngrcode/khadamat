'use client';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAuthStore } from '@/store/authStore';
import { getCurrentLanguage, t } from '@/configs/language';
import { showError, showSuccess } from '@/hook/useToust';
import { clearPreLoginSession } from '@/utils/clearPreLoginSession';
import {
  hasRecoverableSession,
  readAuthToken,
  writeAuthProfile,
  writeAuthToken,
} from '@/utils/authToken';

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
  accessToken?: string;
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

const hasPersianText = (value?: string) =>
  Boolean(value && /[\u0600-\u06FF]/.test(value));

const resolveLoginErrorMessage = (rawMessage?: string) => {
  const message = String(rawMessage ?? '').trim();
  if (hasPersianText(message)) {
    return message;
  }
  return t('genericErrorReceived');
};

const loginSuccessMessage = () => {
  if (getCurrentLanguage() === 'fa') {
    return 'وارد شدید';
  }
  return t('loginSuccess');
};

const loginLoadingMessage = () => {
  if (getCurrentLanguage() === 'fa') {
    return 'در حال ورود...';
  }
  return t('loginLoading');
};

export const useLoginFormViewModel = () => {
  const { login, setUserInfo, setLoading, setError } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirect');
    const token = readAuthToken();

    // IIS bounce: /login?redirect=/dashboard — recover session instead of wiping it.
    if (hasRecoverableSession() && redirectTo?.startsWith('/')) {
      if (token) {
        writeAuthToken(token);
      }
      window.location.replace(`${window.location.origin}${redirectTo}`);
      return;
    }

    if (hasRecoverableSession() && !redirectTo) {
      window.location.replace(`${window.location.origin}/dashboard`);
      return;
    }

    // Fresh login only.
    void clearPreLoginSession();
  }, []);

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
      await clearPreLoginSession();

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
        credentials: 'include',
      });

      const loginData = (await response.json().catch(() => ({}))) as LoginResponse;

      if (!response.ok) {
        throw new Error(resolveLoginErrorMessage(loginData?.message));
      }

      if (!loginData.accessToken) {
        throw new Error(t('genericErrorReceived'));
      }

      const tokenWritten = writeAuthToken(loginData.accessToken);
      if (!tokenWritten && !readAuthToken()) {
        throw new Error(t('genericErrorReceived'));
      }

      login();
      const isAdmin = loginData?.isAdmin === true;
      const userType: string = isAdmin ? 'ADMIN' : 'USER';
      const userName = loginData?.userName ?? processedUserName;
      const firstLogin = loginData?.firstLogin ?? false;
      const panelMenu = loginData?.panelMenu ?? '';

      setUserInfo(userType, userName, firstLogin);
      writeAuthProfile({
        userName,
        userType,
        panelMenu,
        firstLogin,
      });
      window.dispatchEvent(new Event('panelMenu:updated'));

      showSuccess(loginSuccessMessage());
      await new Promise((resolve) => setTimeout(resolve, 300));

      const redirectTo =
        new URLSearchParams(window.location.search).get('redirect') ||
        '/dashboard';
      window.location.href = `${window.location.origin}${
        redirectTo.startsWith('/') ? redirectTo : '/dashboard'
      }`;
      return;
    } catch (err: any) {
      const rawMessage =
        err?.response?.data?.reason ??
        err?.response?.data?.title ??
        err?.response?.data?.message ??
        err?.message;
      const errorMessage = resolveLoginErrorMessage(rawMessage);
      setError(errorMessage);
      showError(errorMessage);
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
    loginLoadingMessage: loginLoadingMessage(),
  };
};
