import generateMetadata from '@/utils/generateMetadata';
import { t } from '@/configs/language';
import TicketDetailView from '@/features/dashboard/ticket/ticketDetail/pages/Page';

export const metadata = generateMetadata(
  {
    title: t('ticketDetailTitle'),
    description: t('ticketDetailSubtitle'),
  },
  {
    withSuffix: true,
  },
);

interface TicketDetailPageProps {
  params: {
    id?: string[];
  };
}

const TicketDetailPage = ({ params }: TicketDetailPageProps) => {
  const ticketId = Number(params.id?.[0]);

  return (
    <TicketDetailView
      ticketId={Number.isFinite(ticketId) ? ticketId : null}
    />
  );
};

export default TicketDetailPage;
