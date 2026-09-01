import generateMetadata from "@/utils/generateMetadata";
import HokmReport from "@/features/dashboard/hokmPoshtibani/hokm/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuHokmList'),
    description: t('menuHokmList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/hokm',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/hokm',
    },
  },
  {
    withSuffix: true,
  }
);



const HokmPage: React.FC = () => {

  return (
    <HokmReport />
  );
};

export default HokmPage;
