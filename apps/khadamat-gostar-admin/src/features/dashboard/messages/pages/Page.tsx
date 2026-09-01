'use client';

import { ServiceRouteView } from '@/features/dashboard/shared/serviceRoute/pages/Page';

import { MessagesRequestModal } from '../organisms/MessagesRequestModal';
import { useMessagesViewModel } from '../model/ViewModel';

export default function MessagesView() {
  const { service, isModalOpen, closeModal, goBackToDashboard } =
    useMessagesViewModel();

  if (!service) return null;

  return (
    <ServiceRouteView service={service} onBack={goBackToDashboard}>
      <MessagesRequestModal open={isModalOpen} onClose={closeModal} />
    </ServiceRouteView>
  );
}
