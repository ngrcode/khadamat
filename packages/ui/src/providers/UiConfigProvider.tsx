'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { configureToast } from '../feedback/toast';

export type ToastHandler = (message: string, link?: string | false) => void;

export type MutationHook = <TData = unknown, TVariables = unknown>(
  url?: string,
) => {
  mutateAsync: (variables?: TVariables) => Promise<TData>;
  isPending: boolean;
};

export type UseSubmitFormDataHook = () => {
  submitFormData: (values: Record<string, unknown>, options: Record<string, unknown>) => Promise<void>;
  sendData: boolean;
  infoData: boolean;
};

export type UiConfig = {
  showError: ToastHandler;
  showSuccess: ToastHandler;
  useMutation: MutationHook;
  useSubmitFormData?: UseSubmitFormDataHook;
};

const defaultMutationHook: MutationHook = () => ({
  mutateAsync: async () => undefined as never,
  isPending: false,
});

const defaultConfig: UiConfig = {
  showError: (message) => console.error(message),
  showSuccess: (message) => console.log(message),
  useMutation: defaultMutationHook,
};

const UiConfigContext = createContext<UiConfig>(defaultConfig);

export function UiConfigProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: Partial<UiConfig>;
}) {
  const value = { ...defaultConfig, ...config };

  useEffect(() => {
    configureToast({
      showError: value.showError,
      showSuccess: value.showSuccess,
    });
  }, [value.showError, value.showSuccess]);

  return (
    <UiConfigContext.Provider value={value}>{children}</UiConfigContext.Provider>
  );
}

export function useUiConfig() {
  return useContext(UiConfigContext);
}

export function useToast() {
  const { showError, showSuccess } = useUiConfig();
  return { showError, showSuccess };
}

export function useTableMutation(url?: string) {
  const { useMutation } = useUiConfig();
  return useMutation(url);
}
