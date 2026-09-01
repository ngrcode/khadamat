import generateMetadata from "@/utils/generateMetadata";
import BarbershopReport from "@/features/dashboard/barbershop/barbershop/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuBarbershopList'),
    description: t('menuBarbershopList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/barbershop',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/barbershop',
    },
  },
  {
    withSuffix: true,
  }
);



const BarbershopPage: React.FC = () => {
  return <BarbershopReport />;
};

export default BarbershopPage;
