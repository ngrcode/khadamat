'use client';

import { PayrollRequestModal } from '@/features/dashboard/payroll/organisms/PayrollRequestModal';
import { HumanResourcesRequestModal } from '@/features/dashboard/humanResources/organisms/HumanResourcesRequestModal';
import { MessagesRequestModal } from '@/features/dashboard/messages/organisms/MessagesRequestModal';
import { PersonalInformationRequestModal } from '@/features/dashboard/personalInformation/organisms/PersonalInformationRequestModal';
import { RequestLeaveRequestModal } from '@/features/dashboard/requestLeave/organisms/RequestLeaveRequestModal';
import { WelfareServicesRequestModal } from '@/features/dashboard/welfareServices/organisms/WelfareServicesRequestModal';
import type { PortalServiceKey } from '@/features/dashboard/services';

export function ServiceModalHost({
  selectedServiceKey,
  onClose,
}: {
  selectedServiceKey: PortalServiceKey | null;
  onClose: () => void;
}) {
  if (!selectedServiceKey) return null;

  const modalProps = {
    open: true,
    onClose,
  };

  switch (selectedServiceKey) {
    case 'payroll':
      return <PayrollRequestModal {...modalProps} />;
    case 'human-resources':
      return <HumanResourcesRequestModal {...modalProps} />;
    case 'personal-information':
      return <PersonalInformationRequestModal {...modalProps} />;
    case 'messages':
      return <MessagesRequestModal {...modalProps} />;
    case 'welfare-services':
      return <WelfareServicesRequestModal {...modalProps} />;
    case 'request-leave':
      return <RequestLeaveRequestModal {...modalProps} />;
    default:
      return null;
  }
}
