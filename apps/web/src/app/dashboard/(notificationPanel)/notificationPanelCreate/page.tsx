
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import NotificationPanelCreate from '@/features/dashboard/(notificationPanel)/notificationPanelCreate/pages/Page';
import { t } from '@/configs/language';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuEventCreate'),
    description: t('menuEventCreate'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/notificationPanelCreate',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/notificationPanelCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const NotificationPanelCreatePage: React.FC = () => {
  return <NotificationPanelCreate />;
};

export default NotificationPanelCreatePage;
