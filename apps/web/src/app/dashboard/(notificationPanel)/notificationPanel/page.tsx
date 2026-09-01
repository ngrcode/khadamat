import generateMetadata from "@/utils/generateMetadata";
import NotificationPanelReport from "@/features/dashboard/(notificationPanel)/notificationPanel/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuEventList'),
    description: t('menuEventList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/notificationPanel',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/notificationPanel',
    },
  },
  {
    withSuffix: true,
  }
);



const KeepWageMonthlyPage: React.FC = () => {

  return (
    <NotificationPanelReport />
  );
};

export default KeepWageMonthlyPage;
