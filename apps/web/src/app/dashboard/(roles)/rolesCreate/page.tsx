
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import RolesCreateCreate from '@/features/dashboard/(roles)/rolesCreate/pages/Page';
import { t } from '@/configs/language';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuRoleCreate'),
    description: t('menuRoleCreate'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/rolesCreate',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/rolesCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const RolesCreateCreatePage: React.FC = () => {
  return <RolesCreateCreate />;
};

export default RolesCreateCreatePage;
