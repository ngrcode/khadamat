import generateMetadata from "@/utils/generateMetadata";
import ExcelReport from "@/features/dashboard/(excel)/exsel/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('exsel'),
    description: t('exselReportSubtitle'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/excel',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/excel',
    },
  },
  {
    withSuffix: true,
  }
);



const ExcelPage: React.FC = () => {

  return (
    <ExcelReport />
  );
};

export default ExcelPage;
