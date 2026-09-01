import type { Metadata } from 'next';

import RequestLeaveView from '@/features/dashboard/requestLeave/pages/Page';

export const metadata: Metadata = {
  title: 'ثبت و درخواست مرخصی | خدمات گستر',
  description: 'ثبت درخواست مرخصی',
};

export default function RequestLeavePage() {
  return <RequestLeaveView />;
}
