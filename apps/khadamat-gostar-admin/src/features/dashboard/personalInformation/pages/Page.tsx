'use client';

import { ServiceRouteView } from '@/features/dashboard/shared/serviceRoute/pages/Page';

import { PersonalInformationRequestModal } from '../organisms/PersonalInformationRequestModal';
import { usePersonalInformationViewModel } from '../model/ViewModel';

export default function PersonalInformationView() {
  const { service, isModalOpen, closeModal, goBackToDashboard } =
    usePersonalInformationViewModel();

  if (!service) return null;

  return (
    <ServiceRouteView service={service} onBack={goBackToDashboard}>
      <PersonalInformationRequestModal open={isModalOpen} onClose={closeModal} />
    </ServiceRouteView>
  );
}
