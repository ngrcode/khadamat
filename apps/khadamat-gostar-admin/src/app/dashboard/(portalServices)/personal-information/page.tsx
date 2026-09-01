import type { Metadata } from 'next';

import PersonalInformationView from '@/features/dashboard/personalInformation/pages/Page';

export const metadata: Metadata = {
  title: 'اطلاعات شخصی | خدمات گستر',
  description: 'درخواست‌های اطلاعات شخصی',
};

export default function PersonalInformationPage() {
  return <PersonalInformationView />;
}
