'use client';

import { useServiceRouteViewModel } from '@/features/dashboard/shared/serviceRoute/model/ViewModel';

export const useRequestLeaveViewModel = () =>
  useServiceRouteViewModel('request-leave');
