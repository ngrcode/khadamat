export interface RolesSearchParams {
  fromDate?: string;
  toDate?: string;
  globalSearch?: string;
}

export interface RoleApiItem {
  id?: number;
  name?: string | null;
  panelMenu?: string | null;
}

export interface RoleRow extends RoleApiItem {
  panelMenuLabel: string;
}

export interface RoleListResponse {
  status?: string;
  info?: RoleApiItem[] | null;
  data?: RoleApiItem[] | null;
  items?: RoleApiItem[] | null;
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: RoleApiItem[] | null;
    data?: RoleApiItem[] | null;
    items?: RoleApiItem[] | null;
    total?: number;
    totalCount?: number;
    recordsTotal?: number;
    recordsFiltered?: number;
    statusCode?: number;
    doTime?: string | null;
    description?: string | null;
    type?: string | null;
  };
}
