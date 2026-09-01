export interface UnitEmployeeSearchParams {
  fromDate?: string;
  toDate?: string;
  globalSearch?: string;
}

export interface UnitEmployeeApiItem {
  id?: number;
  title?: string | null;
  status?: number | null;
}

export interface UnitEmployeeRow extends UnitEmployeeApiItem {
  statusLabel: string;
}

export interface UnitEmployeeListResponse {
  status?: string;
  info?: UnitEmployeeApiItem[] | null;
  data?: UnitEmployeeApiItem[] | null;
  items?: UnitEmployeeApiItem[] | null;
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: UnitEmployeeApiItem[] | null;
    data?: UnitEmployeeApiItem[] | null;
    items?: UnitEmployeeApiItem[] | null;
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
