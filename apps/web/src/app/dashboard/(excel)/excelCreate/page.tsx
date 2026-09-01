
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import ExselCreate from '@/features/dashboard/(excel)/usersCreate/pages/Page';
import { t } from '@/configs/language';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuPayrollUpload'),
    description: t('menuPayrollUpload'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/excelCreate',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/excelCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const UsersCreateCreatePage: React.FC = () => {
  return <ExselCreate />;
};

export default UsersCreateCreatePage;
