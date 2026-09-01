import generateMetadata from "@/utils/generateMetadata";
import { Metadata } from "next";
import { t } from "@/configs/language";
import UnitEmployeeReport from "@/features/dashboard/(unitEmployee)/unitEmployee/pages/Page";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuUnitList'),
    description: t('menuUnitList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/unitEmployee',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/unitEmployee',
    },
  },
  {
    withSuffix: true,
  }
);



const UnitEmployeePage: React.FC = () => {
  return <UnitEmployeeReport />;
};

export default UnitEmployeePage;
