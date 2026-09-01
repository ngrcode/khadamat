'use client';

import { ServiceRouteView } from '@/features/dashboard/shared/serviceRoute/pages/Page';

import { PayrollRequestModal } from '../organisms/PayrollRequestModal';
import { usePayrollViewModel } from '../model/ViewModel';

export default function PayrollView() {
  const { service, isModalOpen, closeModal, goBackToDashboard } =
    usePayrollViewModel();

  if (!service) return null;

  return (
    <ServiceRouteView service={service} onBack={goBackToDashboard}>
      <PayrollRequestModal open={isModalOpen} onClose={closeModal} />
    </ServiceRouteView>
  );
}
