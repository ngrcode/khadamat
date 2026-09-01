
import type { Metadata } from 'next';

import generateMetadata from '@/utils/generateMetadata';
import NotificationCreate from '@/features/dashboard/(notification)/notificationCreate/pages/Page';
import { t } from '@/configs/language';


export const metadata: Metadata = generateMetadata(
  {
    title: t('menuNotificationCreate'),
    description: t('menuNotificationCreate'),
    alternates: {
canonical:'https://report.rptd.ir/dashboard/notificationCreate',
    },
    openGraph: {  url:'https://report.rptd.ir/dashboard/notificationCreate',
    },
  },
  {
    withSuffix: true,
  }
);

const NotificationCreatePage: React.FC = () => {
  return <NotificationCreate />;
};

export default NotificationCreatePage;
