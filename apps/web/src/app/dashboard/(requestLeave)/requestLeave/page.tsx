import generateMetadata from "@/utils/generateMetadata";
import RequestLeaveReport from "@/features/dashboard/requestLeave/requestLeave/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuLeaveList'),
    description: t('menuLeaveList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/requestLeave',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/requestLeave',
    },
  },
  {
    withSuffix: true,
  }
);



const RequestLeavePage: React.FC = () => {
  return <RequestLeaveReport />;
};

export default RequestLeavePage;
