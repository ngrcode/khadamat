import type { ToastHandler } from '../providers/UiConfigProvider';

let toastHandlers: { showError: ToastHandler; showSuccess: ToastHandler } = {
  showError: (message) => console.error(message),
  showSuccess: (message) => console.log(message),
};

export function configureToast(handlers: Partial<typeof toastHandlers>) {
  toastHandlers = { ...toastHandlers, ...handlers };
}

export const showError = (message: string, link?: string | false) =>
  toastHandlers.showError(message, link);

export const showSuccess = (message: string, link?: string | false) =>
  toastHandlers.showSuccess(message, link);
