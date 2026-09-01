import generateMetadata from "@/utils/generateMetadata";
import UsersReport from "@/features/dashboard/(user)/users/pages/Page";
import { Metadata } from "next";
import { t } from "@/configs/language";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuUserList'),
    description: t('menuUserList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/users',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/users',
    },
  },
  {
    withSuffix: true,
  }
);



const UsersPage: React.FC = () => {

  return (
    <UsersReport />
  );
};

export default UsersPage;
