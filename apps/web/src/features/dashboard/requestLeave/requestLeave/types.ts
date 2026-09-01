export interface RequestLeaveSearchParams {
  fromDate?: string;
  toDate?: string;
  globalSearch?: string;
}

export type WageMonthlySearchParams = RequestLeaveSearchParams;

export interface RequestLeaveApiItem {
  id?: number;
  startedAt?: string | null;
  finishedAt?: string | null;
  startTime?: string | null;
  endtime?: string | null;
  enumRequestLeave?: number | string | null;
  employeeId?: number | null;
  details?: string | null;
  created?: string | null;
  status?: number | null;
  type?: number | null;
  description?: string | null;
  isConfirm?: boolean | null;
  isConfirmint?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  employmentId?: string | null;
  isResponse?: boolean | null;
}

export interface RequestLeaveRow extends RequestLeaveApiItem {
  employeeFullName: string;
  enumRequestLeaveLabel: string;
  statusLabel: string;
  typeLabel: string;
  confirmLabel: string;
  responseLabel: string;
}

export interface RequestLeaveListResponse {
  status?: string;
  info?: RequestLeaveApiItem[];
  data?: RequestLeaveApiItem[];
  items?: RequestLeaveApiItem[];
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: RequestLeaveApiItem[];
    data?: RequestLeaveApiItem[];
    items?: RequestLeaveApiItem[];
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
