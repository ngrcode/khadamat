import type { Metadata } from 'next';

import WelfareServicesView from '@/features/dashboard/welfareServices/pages/Page';

export const metadata: Metadata = {
  title: 'خدمات رفاهی | خدمات گستر',
  description: 'درخواست‌های خدمات رفاهی',
};

export default function WelfareServicesPage() {
  return <WelfareServicesView />;
}
