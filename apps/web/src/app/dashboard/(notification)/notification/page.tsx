import generateMetadata from "@/utils/generateMetadata";
import NotificationReport from "@/features/dashboard/(notification)/notification/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuNotificationList'),
    description: t('menuNotificationList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/notification',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/notification',
    },
  },
  {
    withSuffix: true,
  }
);



const NotificationPage: React.FC = () => {

  return (
    <NotificationReport />
  );
};

export default NotificationPage;
