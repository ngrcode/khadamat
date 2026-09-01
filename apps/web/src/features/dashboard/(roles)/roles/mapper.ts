import { t } from '@/components';
import { RoleApiItem, RoleListResponse, RoleRow } from './types';

const getRoleItems = (
  data: RoleListResponse | RoleApiItem[] | any,
): RoleApiItem[] => {
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

export const getRoleTotalCount = (
  data: RoleListResponse | RoleApiItem[] | any,
  items: RoleApiItem[],
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

export const mapRoleItem = (item: RoleApiItem): RoleRow => {
  const panelMenu = item.panelMenu?.trim() || null;

  return {
    ...item,
    name: item.name?.trim() || null,
    panelMenu,
    panelMenuLabel: panelMenu || t('panelMenuEmpty'),
  };
};

export const mapRoleItems = (
  data: RoleListResponse | RoleApiItem[] | any,
) => getRoleItems(data).map(mapRoleItem);
