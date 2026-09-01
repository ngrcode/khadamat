import type { AxiosError } from 'axios';

type ApiErrorBody = {
  error?: string;
  message?: string;
  reason?: string;
  out?: string;
  statusCode?: number;
};

export const getAxiosErrorBody = (error: unknown): ApiErrorBody | undefined => {
  const axiosError = error as AxiosError<ApiErrorBody> | undefined;
  return axiosError?.response?.data;
};

export const getAxiosErrorStatus = (error: unknown): number | undefined =>
  (error as AxiosError | undefined)?.response?.status;

export const getApiErrorMessageFromUnknown = (
  error: unknown,
  fallback = '',
): string => {
  const data = getAxiosErrorBody(error);
  return (
    data?.error ||
    data?.reason ||
    data?.message ||
    data?.out ||
    (error as Error | undefined)?.message ||
    fallback
  );
};

/** Backend uses HTTP 400 + `{ error, statusCode }` for empty list / no-data cases. */
export const isEmptyDataApiError = (error: unknown): boolean => {
  const status = getAxiosErrorStatus(error);
  const data = getAxiosErrorBody(error);
  return status === 400 && typeof data?.error === 'string' && data.error.length > 0;
};

export const shouldRetryApiQuery = (
  failureCount: number,
  error: unknown,
): boolean => {
  const status = getAxiosErrorStatus(error);

  // Client/business errors: never retry (max 1 request).
  if (status !== undefined && status >= 400 && status < 500) {
    return false;
  }

  // Transient errors: allow one retry (max 2 requests).
  return failureCount < 1;
};

export const EMPTY_DATA_RESPONSE_KEY = '__emptyDataError';

export const createEmptyDataResponse = (message: string) => ({
  [EMPTY_DATA_RESPONSE_KEY]: message,
  info: [],
  Items: [],
  result: { info: [], data: [] },
  totalCount: 0,
  TotalCount: 0,
});

export const getEmptyDataMessageFromResponse = (
  data: unknown,
): string | undefined => {
  if (!data || typeof data !== 'object') {
    return undefined;
  }

  const message = (data as Record<string, unknown>)[EMPTY_DATA_RESPONSE_KEY];
  return typeof message === 'string' ? message : undefined;
};
