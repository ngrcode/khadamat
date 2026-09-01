
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import { t } from '@/configs/language';
import HokmCreateCreatePoshtibani from '@/features/dashboard/hokmPoshtibani/hokmCreate/pages/Page';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuHokmCreate'),
    description: t('menuHokmCreate'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/hokmCreatePoshtibani',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/hokmCreatePoshtibani',
    },
  },
  {
    withSuffix: true,
  }
);

const HokmCreateCreatePage: React.FC = () => {
  return <HokmCreateCreatePoshtibani />;
};

export default HokmCreateCreatePage;
