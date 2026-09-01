import { axiosPutBodyQuery, axiosPutBody } from './../../configs/httpService/axios/httpService';
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  axiosPost,
  axiosDelete,
} from '@/configs/httpService/axios/httpService';

import {
  AxiosMutationResultType,
  MutationArgumentType,
} from '@/type/useAxsios/useAxsios';

export const useAxiosMutation = (url: string): AxiosMutationResultType => {
  const {
    mutateAsync,
    isPending,
    data,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    reset,
    status,
  }: UseMutationResult<AxiosResponse, unknown, MutationArgumentType, unknown> =
    useMutation({
      mutationFn: async (argument: MutationArgumentType) => {
        const { query, deleteId, method = 'POST', ...body } = argument;
        const fullUrl = query ? `${url}/${query}` : url;
        const fullUrlDELETE = deleteId ? `${url}?${deleteId}` : url;

        // Handle different HTTP methods
        switch (method) {
          case 'DELETE':
            return axiosDelete({ url: fullUrlDELETE });
          case 'POST':
            return axiosPost({ url: fullUrl, body });
          case 'PUT':
            return axiosPutBodyQuery({ url: fullUrl, body });
          case 'PUTBODY':
            return axiosPutBody({ url: fullUrl, body });
          default:
            throw new Error(`Unsupported method: ${method}`);
        }
      },
    });

  return {
    mutateAsync,
    isPending,
    data,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    reset,
    status,
  };
};

