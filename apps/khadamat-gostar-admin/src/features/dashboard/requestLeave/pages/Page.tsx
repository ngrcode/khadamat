'use client';

import { ServiceRouteView } from '@/features/dashboard/shared/serviceRoute/pages/Page';

import { RequestLeaveRequestModal } from '../organisms/RequestLeaveRequestModal';
import { useRequestLeaveViewModel } from '../model/ViewModel';

export default function RequestLeaveView() {
  const { service, isModalOpen, closeModal, goBackToDashboard } =
    useRequestLeaveViewModel();

  if (!service) return null;

  return (
    <ServiceRouteView service={service} onBack={goBackToDashboard}>
      <RequestLeaveRequestModal open={isModalOpen} onClose={closeModal} />
    </ServiceRouteView>
  );
}
