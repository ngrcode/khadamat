'use client';

import { ServiceRouteView } from '@/features/dashboard/shared/serviceRoute/pages/Page';

import { WelfareServicesRequestModal } from '../organisms/WelfareServicesRequestModal';
import { useWelfareServicesViewModel } from '../model/ViewModel';

export default function WelfareServicesView() {
  const { service, isModalOpen, closeModal, goBackToDashboard } =
    useWelfareServicesViewModel();

  if (!service) return null;

  return (
    <ServiceRouteView service={service} onBack={goBackToDashboard}>
      <WelfareServicesRequestModal open={isModalOpen} onClose={closeModal} />
    </ServiceRouteView>
  );
}
