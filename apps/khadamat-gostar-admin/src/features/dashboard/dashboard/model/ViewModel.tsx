'use client';

import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@repo/auth/react';
import { useTranslate } from '@repo/i18n/react';
import { useAuthStore } from '@/store/authStore';
import {
  getTranslatedPortalServices,
  type PortalServiceKey,
} from '@/features/dashboard/services';

import {
  getActiveNotificationPanels,
  getDashboardTicketResponses,
  getNotifications,
} from '../api';
import type {
  AccountInfo,
  DashboardMessage,
  DashboardNotification,
  DashboardNotificationPanel,
  DashboardTicketResponse,
} from '../types';

type TranslateFn = ReturnType<typeof useTranslate>;

const readStoredJson = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
};

const readStoredNumber = (key: string) => {
  if (typeof window === 'undefined') return null;

  const value = Number(window.localStorage.getItem(key));

  return Number.isFinite(value) && value > 0 ? value : null;
};

const isAdminSender = (sender?: string | null) => {
  const normalized = sender?.trim().toLowerCase() ?? '';

  return normalized === 'admin' || normalized === '\u0627\u062f\u0645\u06cc\u0646';
};

const mapTicketResponseToMessage = (
  response: DashboardTicketResponse,
  index: number,
  translate: TranslateFn,
): DashboardMessage => ({
  id: String(response.id ?? index),
  sender: response.senderFullName || translate('dashboardUnknownSender'),
  text: response.text?.trim() || translate('dashboardNoMessageText'),
  time: response.entryDateTime || '-',
  align: isAdminSender(response.senderFullName) ? 'end' : 'start',
});

export const useDashboardViewModel = () => {
  const { logout: authLogout } = useAuth();
  const translate = useTranslate();
  const storedUserName =
    useAuthStore((state) => state.userName) ?? translate('dashboardDefaultUser');
  const [selectedServiceKey, setSelectedServiceKey] =
    useState<PortalServiceKey | null>(null);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [events, setEvents] = useState<DashboardNotificationPanel[]>([]);
  const [bulletins, setBulletins] = useState<DashboardNotification[]>([]);
  const [messages, setMessages] = useState<DashboardMessage[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingBulletins, setIsLoadingBulletins] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  useEffect(() => {
    const storedAccountInfo = readStoredJson<AccountInfo>('accountInfo');
    const unitId = storedAccountInfo?.unitId ?? readStoredNumber('unitId');

    setAccountInfo(storedAccountInfo);

    setIsLoadingEvents(true);
    void getActiveNotificationPanels()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setIsLoadingEvents(false));

    if (unitId) {
      setIsLoadingBulletins(true);
      void getNotifications(unitId)
        .then(setBulletins)
        .catch(() => setBulletins([]))
        .finally(() => setIsLoadingBulletins(false));
    }

    setIsLoadingMessages(true);
    void getDashboardTicketResponses()
      .then((responses) => {
        const latestMessages = [...responses]
          .sort((first, second) => (first.id ?? 0) - (second.id ?? 0))
          .slice(-5)
          .map((response, index) =>
            mapTicketResponseToMessage(response, index, translate),
          );

        setMessages(latestMessages);
      })
      .catch(() => setMessages([]))
      .finally(() => setIsLoadingMessages(false));
  }, [translate]);

  const quickActions = useMemo(
    () => getTranslatedPortalServices(translate),
    [translate],
  );

  const profileDisplayName = useMemo(() => {
    const fullName = [accountInfo?.first_name, accountInfo?.last_name]
      .filter(Boolean)
      .join(' ')
      .trim();

    return fullName || storedUserName;
  }, [accountInfo, storedUserName]);

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('accountShowResponse');
      window.localStorage.removeItem('accountInfo');
      window.localStorage.removeItem('employeeId');
      window.localStorage.removeItem('unitId');
      window.localStorage.removeItem('userFullName');
    }

    authLogout();
  };

  return {
    logout,
    userName: profileDisplayName,
    accountInfo,
    quickActions,
    messages,
    events,
    bulletins,
    isLoadingEvents,
    isLoadingBulletins,
    isLoadingMessages,
    selectedServiceKey,
    openServiceModal: setSelectedServiceKey,
    closeServiceModal: () => setSelectedServiceKey(null),
  };
};
