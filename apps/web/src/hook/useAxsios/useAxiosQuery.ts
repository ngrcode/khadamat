import { useQuery } from '@tanstack/react-query';
import { axiosGet, axiosPost } from '@/configs/httpService/axios/httpService';
import { UseAxiosQueryPropsType, UseAxiosQueryType } from '@/type/useAxsios/useAxsios';
import {
  createEmptyDataResponse,
  getApiErrorMessageFromUnknown,
  isEmptyDataApiError,
  shouldRetryApiQuery,
} from '@/utils/apiError';

const DEFAULT_STALE_TIME_MS = 60_000;
const DEFAULT_GC_TIME_MS = 5 * 60_000;

export const useAxiosQuery = (props: UseAxiosQueryPropsType): UseAxiosQueryType => {
  const {
    url,
    selectFn,
    params,
    body,
    onSuccess,
    queryKey,
    queryFn: customQueryFn,
    method = 'get',
    headers,
    enabled = true,
    retry = shouldRetryApiQuery,
    staleTime = DEFAULT_STALE_TIME_MS,
    refetchOnMount = true,
    refetchOnWindowFocus = false,
    ...otherProps
  } = props;

  const gcTime =
    (otherProps as { gcTime?: number }).gcTime ??
    (otherProps as { cacheTime?: number }).cacheTime ??
    DEFAULT_GC_TIME_MS;

  const {
    cacheTime: _ignoredCacheTime,
    gcTime: _ignoredGcTime,
    ...restQueryOptions
  } = otherProps as {
    cacheTime?: number;
    gcTime?: number;
    [key: string]: unknown;
  };

  const defaultQueryFn = async () => {
    if (method === 'post' || method === 'put' || method === 'delete') {
      const requestBody = body || params || {};
      return axiosPost({
        url,
        body: requestBody,
        headers,
      });
    }
    return axiosGet({ url, params });
  };

  const queryFn = async () => {
    try {
      const runner = customQueryFn ?? defaultQueryFn;
      return await runner();
    } catch (error) {
      if (isEmptyDataApiError(error)) {
        return createEmptyDataResponse(
          getApiErrorMessageFromUnknown(error),
        );
      }
      throw error;
    }
  };

  const {
    data,
    isLoading,
    isPending,
    isFetching,
    isSuccess,
    isFetched,
    isError,
    error,
    refetch,
    fetchStatus,
  } = useQuery({
    queryKey,
    queryFn,
    enabled,
    ...restQueryOptions,
    retry,
    select: selectFn,
    staleTime,
    gcTime,
    refetchOnMount,
    refetchOnWindowFocus,
  });

  return {
    data,
    isLoading,
    isPending,
    isFetching,
    isSuccess,
    fetchStatus,
    isFetched,
    isError,
    error,
    refetch,
  };
};
