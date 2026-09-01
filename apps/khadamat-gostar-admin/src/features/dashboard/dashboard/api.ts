import { t } from '@repo/i18n';

import type {
  DashboardNotification,
  DashboardNotificationPanel,
  DashboardTicketResponse,
} from './types';

const readErrorMessage = async (response: Response, fallback: string) => {
  const text = await response.text();

  if (!text) return fallback;

  try {
    const data = JSON.parse(text);

    return data?.message ?? data?.description ?? fallback;
  } catch {
    return text;
  }
};

const unwrapInfo = <T>(data: any): T[] => {
  const response = data?.result ?? data ?? {};

  return Array.isArray(response.info) ? response.info : [];
};

export const getActiveNotificationPanels = async (): Promise<
  DashboardNotificationPanel[]
> => {
  const response = await fetch('/api/notification-panel/active', {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, t('dashboardEventsLoadError')));
  }

  return unwrapInfo<DashboardNotificationPanel>(await response.json());
};

export const getNotificationsByUnit = async (
  unitId: number,
): Promise<DashboardNotification[]> => {
  const params = new URLSearchParams({ unitId: String(unitId) });
  const response = await fetch(`/api/notification/by-unit?${params.toString()}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, t('dashboardBulletinsLoadError')));
  }

  return unwrapInfo<DashboardNotification>(await response.json());
};

export const getDashboardTicketResponses = async (): Promise<
  DashboardTicketResponse[]
> => {
  const response = await fetch('/api/ticket/get-my-ticket', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, t('dashboardMessagesLoadError')));
  }

  const tickets = unwrapInfo<{ responseDetail?: DashboardTicketResponse[] | null }>(
    await response.json(),
  );

  return tickets.flatMap((ticket) => ticket.responseDetail ?? []);
};
