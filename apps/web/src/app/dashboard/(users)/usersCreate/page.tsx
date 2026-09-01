
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import UsersCreateCreate from '@/features/dashboard/(user)/usersCreate/pages/Page';
import { t } from '@/configs/language';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuUserCreate'),
    description: t('menuUserCreate'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/usersCreate',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/usersCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const UsersCreateCreatePage: React.FC = () => {
  return <UsersCreateCreate />;
};

export default UsersCreateCreatePage;
