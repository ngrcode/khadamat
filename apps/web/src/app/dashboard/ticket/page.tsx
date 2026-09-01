import generateMetadata from "@/utils/generateMetadata";
import { Metadata } from "next";
import { t } from "@/configs/language";
import TicketReport from "@/features/dashboard/ticket/ticket/pages/Page";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuMessageList'),
    description: t('menuMessageList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/ticket',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/ticket',
    },
  },
  {
    withSuffix: true,
  }
);



const TicketPage: React.FC = () => {
  return <TicketReport />;
};

export default TicketPage;
