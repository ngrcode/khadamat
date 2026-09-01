import generateMetadata from "@/utils/generateMetadata";
import { Metadata } from "next";
import { t } from "@/configs/language";
import UpdatePhoneCreate from "@/features/dashboard/updatePhone/updatePhoneCreate/pages/Page";

export const metadata: Metadata = generateMetadata(
  {
    title: t('menuUpdatePhoneList'),
    description: t('menuUpdatePhoneList'),
    alternates: {
      canonical:
        'https://report.rptd.ir/dashboard/updatePhone',
    },
    openGraph: {
      url: 'https://report.rptd.ir/dashboard/updatePhone',
    },
  },
  {
    withSuffix: true,
  }
);



const UpdatePhonePage: React.FC = () => {
  return <UpdatePhoneCreate />;
};

export default UpdatePhonePage;
