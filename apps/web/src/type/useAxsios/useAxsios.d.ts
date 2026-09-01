import { AxiosResponse } from 'axios';

import { type UseQueryOptions } from '@tanstack/react-query';

export interface UseAxiosQueryType<TData = unknown> {
  data: any;
  isLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isFetched: boolean;
  isError: boolean;
  error?: unknown;
  fetchStatus: string;
  headers?:any;
  refetch: () => void;
  fetchStatus: 'idle' | 'loading' | 'error' | 'success';
}

export type UseAxiosQueryPropsType<TData = unknown, TError = unknown> = {
  url: string;
  selectFn?: (data: any) => any;
  params?: any; // برای GET
  body?: any;   // برای POST (جدید)
  onSuccess?: (data: any) => void;
  queryKey?: any[];
  queryFn?: () => Promise<any>;
  method?: 'get' | 'post' | 'put' | 'delete';
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  headers?: any;
  retry?: boolean | number;
  refetchOnWindowFocus?: boolean;
} & UseQueryOptions<TData, TError>;

//
export interface MutationArgumentType {
  query?: string;
  [key: string]: unknown;
}

export interface AxiosMutationResultType {
  mutateAsync: (args: MutationArgumentType) => Promise<AxiosResponse>;
  isPending: boolean;
  data: AxiosResponse | undefined;
  error: unknown;
  isError: boolean;
  isIdle: boolean;
  isPaused: boolean;
  isSuccess: boolean;
  failureCount: number;
  failureReason: unknown;
  mutate: (args: MutationArgumentType) => void;
  reset: () => void;
  status: unknown;
}
