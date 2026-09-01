'use client';

import { ServiceRouteView } from '@/features/dashboard/shared/serviceRoute/pages/Page';

import { HumanResourcesRequestModal } from '../organisms/HumanResourcesRequestModal';
import { useHumanResourcesViewModel } from '../model/ViewModel';

export default function HumanResourcesView() {
  const { service, isModalOpen, closeModal, goBackToDashboard } =
    useHumanResourcesViewModel();

  if (!service) return null;

  return (
    <ServiceRouteView service={service} onBack={goBackToDashboard}>
      <HumanResourcesRequestModal open={isModalOpen} onClose={closeModal} />
    </ServiceRouteView>
  );
}
