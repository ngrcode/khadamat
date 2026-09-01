import { FC } from 'react';
import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

import Link from 'next/link';

import {
  ToastIconError,
  ToastIconSuccess,
  ToastIconwarning,
} from '@/components/icons';

interface CustomToastType {
  message: string;
  link?: string | false;
}

const CustomToastWithLink: FC<CustomToastType> = ({ message, link }) => {
  return (
    <>
      <span className="px-2 w-full">{message}</span>
      {link ? (
        <span className="text-link underline decoration-1 py-2">
          <Link href={link}>لطفا وارد شوید </Link>
        </span>
      ) : null}
    </>
  );
};

export function showSuccess(
  message: string,
  link: string | false = false,
  themeTost?: string,
): void {
  toast.success(CustomToastWithLink({ message, link }), {
    theme: themeTost || 'light',
    icon: <ToastIconSuccess className="h-6 w-6" />,
  } as ToastOptions);
}

export function showError(
  message: string,
  link: string | false = false,
  themeTost?: string,
): void {
  toast.error(CustomToastWithLink({ message, link }), {
    theme: themeTost || 'light',
    icon: <ToastIconError className="h-6 w-6" />,
  } as ToastOptions);
}

export function showWarning(
  message: string,
  link: string | false = false,
  themeTost?: string,
): void {
  toast.warning(CustomToastWithLink({ message, link }), {
    theme: themeTost || 'light',
    icon: <ToastIconwarning className="h-6 w-6" />,
  } as ToastOptions);
}

export function showInfo(
  message: string,
  link: string | false = false,
  themeTost?: string,
): void {
  toast.info(CustomToastWithLink({ message, link }), {
    theme: themeTost || 'light',
    icon: <ToastIconSuccess className="h-6 w-6" />,
  } as ToastOptions);
}

export function showDefault(
  message: string,
  link: string | false = false,
  themeTost?: string,
): void {
  toast(CustomToastWithLink({ message, link }), {
    theme: themeTost || 'light',
    icon: <ToastIconError className="h-6 w-6" />,
  } as ToastOptions);
}

const HandelError = {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showDefault,
};

export default HandelError;
