import {
  CarryOutOutlined,
  HeartOutlined,
  InboxOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

import { t } from '@repo/i18n';

export type PortalServiceKey =
  | 'payroll'
  | 'human-resources'
  | 'personal-information'
  | 'messages'
  | 'welfare-services'
  | 'request-leave';

export type PortalService = {
  key: PortalServiceKey;
  label: string;
  href: string;
  icon: ReactNode;
  description: string;
  subjectPlaceholder: string;
  descriptionPlaceholder: string;
};

type PortalServiceDefinition = Omit<
  PortalService,
  'label' | 'description' | 'subjectPlaceholder' | 'descriptionPlaceholder'
> & {
  labelKey: string;
  descriptionKey: string;
  subjectPlaceholderKey: string;
  descriptionPlaceholderKey: string;
};

type TranslateFn = typeof t;

const portalServices: PortalServiceDefinition[] = [
  {
    key: 'payroll',
    href: '/dashboard/payroll',
    icon: <WalletOutlined />,
    labelKey: 'dashboardServicePayrollLabel',
    descriptionKey: 'dashboardServicePayrollDescription',
    subjectPlaceholderKey: 'dashboardServicePayrollSubjectPlaceholder',
    descriptionPlaceholderKey: 'dashboardServicePayrollDescriptionPlaceholder',
  },
  {
    key: 'human-resources',
    href: '/dashboard/human-resources',
    icon: <TeamOutlined />,
    labelKey: 'dashboardServiceHumanResourcesLabel',
    descriptionKey: 'dashboardServiceHumanResourcesDescription',
    subjectPlaceholderKey: 'dashboardServiceHumanResourcesSubjectPlaceholder',
    descriptionPlaceholderKey: 'dashboardServiceHumanResourcesDescriptionPlaceholder',
  },
  {
    key: 'personal-information',
    href: '/dashboard/personal-information',
    icon: <UserOutlined />,
    labelKey: 'dashboardServicePersonalInformationLabel',
    descriptionKey: 'dashboardServicePersonalInformationDescription',
    subjectPlaceholderKey: 'dashboardServicePersonalInformationSubjectPlaceholder',
    descriptionPlaceholderKey: 'dashboardServicePersonalInformationDescriptionPlaceholder',
  },
  {
    key: 'messages',
    href: '/dashboard/messages',
    icon: <InboxOutlined />,
    labelKey: 'dashboardServiceMessagesLabel',
    descriptionKey: 'dashboardServiceMessagesDescription',
    subjectPlaceholderKey: 'dashboardServiceMessagesSubjectPlaceholder',
    descriptionPlaceholderKey: 'dashboardServiceMessagesDescriptionPlaceholder',
  },
  {
    key: 'welfare-services',
    href: '/dashboard/welfare-services',
    icon: <HeartOutlined />,
    labelKey: 'dashboardServiceWelfareServicesLabel',
    descriptionKey: 'dashboardServiceWelfareServicesDescription',
    subjectPlaceholderKey: 'dashboardServiceWelfareServicesSubjectPlaceholder',
    descriptionPlaceholderKey: 'dashboardServiceWelfareServicesDescriptionPlaceholder',
  },
  {
    key: 'request-leave',
    href: '/dashboard/request-leave',
    icon: <CarryOutOutlined />,
    labelKey: 'dashboardServiceRequestLeaveLabel',
    descriptionKey: 'dashboardServiceRequestLeaveDescription',
    subjectPlaceholderKey: 'dashboardServiceRequestLeaveSubjectPlaceholder',
    descriptionPlaceholderKey: 'dashboardServiceRequestLeaveDescriptionPlaceholder',
  },
];

const translatePortalService = (
  service: PortalServiceDefinition,
  translate: TranslateFn = t,
): PortalService => ({
  key: service.key,
  href: service.href,
  icon: service.icon,
  label: translate(service.labelKey),
  description: translate(service.descriptionKey),
  subjectPlaceholder: translate(service.subjectPlaceholderKey),
  descriptionPlaceholder: translate(service.descriptionPlaceholderKey),
});

export const getTranslatedPortalServices = (translate: TranslateFn = t) =>
  portalServices.map((service) => translatePortalService(service, translate));

export const getPortalServiceByKey = (key: string, translate: TranslateFn = t) => {
  const service = portalServices.find((item) => item.key === key);

  return service ? translatePortalService(service, translate) : undefined;
};
