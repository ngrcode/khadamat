
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import RequestLeaveCreate from '@/features/dashboard/requestLeave/requestLeaveCreate/pages/Page';
import { t } from '@/configs/language';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuLeaveCreate'),
    description: t('menuLeaveCreate'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/requestLeaveCreate',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/requestLeaveCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const RequestLeaveCreatePage: React.FC = () => {
  return <RequestLeaveCreate />;
};

export default RequestLeaveCreatePage;
