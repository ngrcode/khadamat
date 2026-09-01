import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { axiosInstance } from '../axios/axiosInterceptors';
import { mergeAbortSignals } from '@/utils/routeRequestController';

export type ErrorType<Error> = Error;
export type BodyType<BodyData> = BodyData;

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const controller = new AbortController();
  const source = axios.CancelToken.source();
  const signal = mergeAbortSignals(
    options?.signal,
    config.signal,
    controller.signal,
  );

  const promise = axiosInstance({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
    signal,
    cancelToken: source?.token,
  }).then(({ data }: AxiosResponse<T>) => data);

  // Orval / react-query cancellation support.
  (promise as Promise<T> & { cancel?: () => void }).cancel = () => {
    controller.abort();
    source?.cancel('Query was cancelled');
  };

  return promise;
};
