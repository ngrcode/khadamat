import type { Metadata } from 'next';

import HumanResourcesView from '@/features/dashboard/humanResources/pages/Page';

export const metadata: Metadata = {
  title: 'منابع انسانی | خدمات گستر',
  description: 'درخواست‌های منابع انسانی',
};

export default function HumanResourcesPage() {
  return <HumanResourcesView />;
}
