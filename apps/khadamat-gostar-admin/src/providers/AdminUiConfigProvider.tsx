'use client';

import { UiConfigProvider } from '@repo/ui/providers';
import { ReactNode } from 'react';

export function AdminUiConfigProvider({ children }: { children: ReactNode }) {
  return (
    <UiConfigProvider
      config={{
        showError: (msg) => console.error(msg),
        showSuccess: (msg) => console.log(msg),
      }}
    >
      {children}
    </UiConfigProvider>
  );
}
