import generateMetadata from '@/utils/generateMetadata';
import { t } from '@/configs/language';
import UserTicketChatView from '@/features/dashboard/(user)/users/ticketChat/pages/Page';

export const metadata = generateMetadata(
  {
    title: t('ticketUsersTitle'),
    description: t('ticketUsersSubtitle'),
  },
  {
    withSuffix: true,
  },
);

interface TicketUsersPageProps {
  params: {
    id?: string[];
  };
}

const TicketUsersPage = ({ params }: TicketUsersPageProps) => {
  const userId = Number(params.id?.[0]);

  return (
    <UserTicketChatView
      userId={Number.isFinite(userId) ? userId : null}
    />
  );
};

export default TicketUsersPage;
