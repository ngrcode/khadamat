import { t } from '@/components';
import {
  RequestLeaveApiItem,
  RequestLeaveListResponse,
  RequestLeaveRow,
} from './types';

const getRequestLeaveItems = (
  data: RequestLeaveListResponse | RequestLeaveApiItem[] | any,
): RequestLeaveApiItem[] => {
  if (Array.isArray(data)) return data;

  return (
    data?.result?.info ??
    data?.result?.data ??
    data?.result?.items ??
    data?.info ??
    data?.data ??
    data?.items ??
    []
  );
};

export const getRequestLeaveTotalCount = (
  data: RequestLeaveListResponse | RequestLeaveApiItem[] | any,
  items: RequestLeaveApiItem[],
) => {
  if (Array.isArray(data)) return items.length;

  return (
    data?.recordsTotal ??
    data?.recordsFiltered ??
    data?.totalCount ??
    data?.total ??
    data?.result?.recordsTotal ??
    data?.result?.recordsFiltered ??
    data?.result?.totalCount ??
    data?.result?.total ??
    items.length
  );
};

export const getRequestLeaveTypeLabel = (value?: number | string | null) => {
  const normalized = String(value ?? '').toLowerCase();

  if (normalized === '0' || normalized === 'hourly') return t('requestLeaveHourly');
  if (normalized === '1' || normalized === 'daily') return t('requestLeaveDaily');

  return value === undefined || value === null || value === '' ? t('noData') : String(value);
};

export const getRequestStatusLabel = (value?: number | null) => {
  if (value === 0) return t('requestLeaveStatusInactive');
  if (value === 1) return t('requestLeaveStatusActive');
  if (value === 2) return t('requestLeaveStatusRejected');
  if (value === 3) return t('requestLeaveStatusPending');

  return value === undefined || value === null ? t('noData') : String(value);
};

export const getRequestLeaveCategoryLabel = (value?: number | null) => {
  if (value === 0) return t('requestLeaveCategoryNormal');
  if (value === 1) return t('requestLeaveCategoryWorkday');
  if (value === 2) return t('requestLeaveCategoryMission');

  return value === undefined || value === null ? t('noData') : String(value);
};

const getBooleanLabel = (value?: boolean | null) =>
  value ? t('yes') : t('no');

export const mapRequestLeaveItem = (item: RequestLeaveApiItem): RequestLeaveRow => {
  const firstName = item.firstName?.trim() ?? '';
  const lastName = item.lastName?.trim() ?? '';
  const employeeFullName = `${firstName} ${lastName}`.trim() || t('noData');

  return {
    ...item,
    employeeFullName,
    enumRequestLeaveLabel: getRequestLeaveTypeLabel(item.enumRequestLeave),
    statusLabel: getRequestStatusLabel(item.status),
    typeLabel: getRequestLeaveCategoryLabel(item.type),
    confirmLabel: getBooleanLabel(item.isConfirm),
    responseLabel: getBooleanLabel(item.isResponse),
  };
};

export const mapRequestLeaveItems = (
  data: RequestLeaveListResponse | RequestLeaveApiItem[] | any,
) => getRequestLeaveItems(data).map(mapRequestLeaveItem);
