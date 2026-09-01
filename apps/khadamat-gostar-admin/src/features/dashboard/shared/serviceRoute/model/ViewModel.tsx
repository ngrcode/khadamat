'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  getPortalServiceByKey,
  type PortalServiceKey,
} from '@/features/dashboard/services';

export const useServiceRouteViewModel = (serviceKey: PortalServiceKey) => {
  const router = useRouter();
  const service = getPortalServiceByKey(serviceKey);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, [serviceKey]);

  const goBackToDashboard = () => {
    router.push('/dashboard');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/dashboard');
  };

  return {
    service,
    isModalOpen,
    closeModal,
    goBackToDashboard,
  };
};
