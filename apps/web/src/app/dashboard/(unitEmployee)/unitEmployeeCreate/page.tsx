
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import { t } from '@/configs/language';
import UnitEmployeeCreate from '@/features/dashboard/(unitEmployee)/unitEmployeeCreate/pages/Page';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuUnitEmployeeCreate'),
    description: t('menuUnitEmployeeCreate'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/unitEmployeeCreate',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/unitEmployeeCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const UnitEmployeeCreateCreatePage: React.FC = () => {
  return <UnitEmployeeCreate />;
};

export default UnitEmployeeCreateCreatePage;
