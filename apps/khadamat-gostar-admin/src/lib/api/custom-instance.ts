import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { axiosInstance } from '@/configs/httpService/axios/axiosInterceptors';

export type ErrorType<Error> = Error;
export type BodyType<BodyData> = BodyData;

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axiosInstance({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
    cancelToken: source.token,
  }).then(({ data }: AxiosResponse<T>) => data);

  (promise as Promise<T> & { cancel?: () => void }).cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
