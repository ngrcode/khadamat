import generateMetadata from "@/utils/generateMetadata";
import RolesReport from "@/features/dashboard/(roles)/roles/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuRolesList'),
    description: t('menuRolesList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/roles',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/roles',
    },
  },
  {
    withSuffix: true,
  }
);



const RolesPage: React.FC = () => {

  return (
    <RolesReport />
  );
};

export default RolesPage;
