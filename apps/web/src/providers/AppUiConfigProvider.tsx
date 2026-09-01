'use client';

import { UiConfigProvider } from '@repo/ui/providers';
import { useAxiosMutation } from '@/hook/useAxsios/useAxiosMutation';
import { showError, showSuccess } from '@/hook/useToust';
import { useSubmitFormData } from '@/hook/useSubmitFormData';
import { ReactNode } from 'react';

export function AppUiConfigProvider({ children }: { children: ReactNode }) {
  return (
    <UiConfigProvider
      config={{
        showError,
        showSuccess,
        useMutation: useAxiosMutation,
        useSubmitFormData,
      }}
    >
      {children}
    </UiConfigProvider>
  );
}
