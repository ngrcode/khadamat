import { customInstance } from '@/configs/httpService/orval/customInstance';

import type { EmployeeAdminPayload } from './formModel';

export const createEmployeeByAdmin = (payload: EmployeeAdminPayload) =>
  customInstance({
    url: '/api/1.0/Employee/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  });

export const updateEmployeeByAdminV10 = (payload: EmployeeAdminPayload) =>
  customInstance({
    url: '/api/1.0/Employee/UpdateByAdmin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  });
