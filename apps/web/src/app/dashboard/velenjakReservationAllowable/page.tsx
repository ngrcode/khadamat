import generateMetadata from "@/utils/generateMetadata";
import { Metadata } from "next";
import { t } from "@/configs/language";
import VelenjakReservationAllowableReport from "@/features/dashboard/velenjakReservationAllowable/velenjakReservationAllowable/pages/Page";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuVelenjakReservationAllowableList'),
    description: t('menuVelenjakReservationAllowableList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/velenjakReservationAllowable',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/velenjakReservationAllowable',
    },
  },
  {
    withSuffix: true,
  }
);



const VelenjakReservationAllowablePage: React.FC = () => {

  return (
    <VelenjakReservationAllowableReport />
  );
};

export default VelenjakReservationAllowablePage;
