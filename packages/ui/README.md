# @repo/ui

کامپوننت‌های مشترک React برای اپ‌های monorepo.

## ساختار

```
src/
├── providers/       # UiConfigProvider (toast, mutation hooks)
├── form/            # FormInput, FormButton, Select, DatePicker, Upload, ModalForm
├── table/           # CustomTable, ReportPage, ActionColumn, Mappers
├── loading/         # ClubLoading, LoadingRoot
├── headers/         # Header1, Header2, Header3
├── layout/          # BreadcrumbNav
├── filter/          # FilterInput
├── feedback/        # ErrorBoundary, NetworkStatus, Toast
├── alert/           # ClubAlert
├── card/            # TotalCard
├── modal/           # CustomModal
├── link/            # CustomLink
├── icons/           # Toast icons, RefahIcon
└── types/           # AlertType, SelectType, TabsType
```

## استفاده

```tsx
import { CustomTable, FormInput, FormikWrapper, ReportPage } from '@repo/ui';
import { UiConfigProvider } from '@repo/ui/providers';
```

## پیکربندی در اپ

```tsx
// apps/web/src/providers/AppUiConfigProvider.tsx
<UiConfigProvider config={{
  showError,
  showSuccess,
  useMutation: useAxiosMutation,
  useSubmitFormData,
}}>
```

## آنچه در اپ باقی می‌ماند

- `pwa/` — مخصوص PWA
- `charts/`, `highCharts/` — نمودارها
- `carousel/` — اسلایدر مارکتینگ
- `image/`, `motion/` — وابسته به CDN اپ
