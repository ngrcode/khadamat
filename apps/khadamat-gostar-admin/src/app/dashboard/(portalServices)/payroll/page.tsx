import type { Metadata } from 'next';

import PayrollView from '@/features/dashboard/payroll/pages/Page';

export const metadata: Metadata = {
  title: 'حقوق و دستمزد | خدمات گستر',
  description: 'دریافت فیش حقوقی',
};

export default function PayrollPage() {
  return <PayrollView />;
}
