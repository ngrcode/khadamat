import generateMetadata from "@/utils/generateMetadata";
import { Metadata } from "next";
import { t } from "@/configs/language";
import HumanResourceReport from "@/features/dashboard/humanResource/humanResource/pages/Page";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuHumanResourceList'),
    description: t('menuHumanResourceList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/humanresource',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/humanresource',
    },
  },
  {
    withSuffix: true,
  }
);



const HumanResourcePage: React.FC = () => {

  return (
    <HumanResourceReport />
  );
};

export default HumanResourcePage;
