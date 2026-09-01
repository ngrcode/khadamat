import { t } from '@/components';
import {
  UnitEmployeeApiItem,
  UnitEmployeeListResponse,
  UnitEmployeeRow,
} from './types';

const getUnitEmployeeItems = (
  data: UnitEmployeeListResponse | UnitEmployeeApiItem[] | any,
): UnitEmployeeApiItem[] => {
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

export const getUnitEmployeeTotalCount = (
  data: UnitEmployeeListResponse | UnitEmployeeApiItem[] | any,
  items: UnitEmployeeApiItem[],
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

export const getUnitEmployeeStatusLabel = (status?: number | null) => {
  if (status === 1) return t('statusActive');
  if (status === 0) return t('statusInactive');

  return status === undefined || status === null ? t('noData') : String(status);
};

export const mapUnitEmployeeItem = (
  item: UnitEmployeeApiItem,
): UnitEmployeeRow => ({
  ...item,
  title: item.title?.trim() || null,
  statusLabel: getUnitEmployeeStatusLabel(item.status),
});

export const mapUnitEmployeeItems = (
  data: UnitEmployeeListResponse | UnitEmployeeApiItem[] | any,
) => getUnitEmployeeItems(data).map(mapUnitEmployeeItem);
