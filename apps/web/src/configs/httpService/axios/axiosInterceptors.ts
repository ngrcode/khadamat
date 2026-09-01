import axios, {
  AxiosHeaders,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';

import { t } from '@/configs/language';
import { showError } from '@/hook/useToust';
import {
  getRouteAbortSignal,
  mergeAbortSignals,
} from '@/utils/routeRequestController';

const defaultBackendBaseUrl = 'http://62.60.165.23:50051/';
const browserProxyBaseUrl = '/api/backend';
const isHttpUrl = (value?: string) => /^https?:\/\//i.test(value ?? '');
const getBackendBaseUrl = (...values: Array<string | undefined>) =>
  values.find((value) => isHttpUrl(value)) ?? defaultBackendBaseUrl;

const directBackendBaseUrl = getBackendBaseUrl(
  process.env.NEXT_PUBLIC_BASE_URL,
  process.env.BASE_URL,
);
const serverBaseUrl = directBackendBaseUrl;

const normalizePath = (path: string) => {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

const shouldUseCredentials = (baseURL?: string) => {
  if (typeof window === 'undefined') {
    return true;
  }

  if (!baseURL || !isHttpUrl(baseURL)) {
    return true;
  }

  try {
    return new URL(baseURL).origin === window.location.origin;
  } catch {
    return false;
  }
};

export const normalizeBrowserApiUrl = (url?: string, baseURL?: string) => {
  if (typeof window === 'undefined' || !url) {
    return { url, baseURL };
  }

  const browserBaseURL =
    baseURL && baseURL !== browserProxyBaseUrl && isHttpUrl(baseURL)
      ? baseURL
      : directBackendBaseUrl;
  const normalizeForBaseUrl = (requestPath: string) => {
    const normalizedPath = normalizePath(requestPath);

    try {
      const backendUrl = new URL(browserBaseURL);
      const backendPath = backendUrl.pathname.replace(/\/$/, '');

      if (
        backendPath &&
        normalizedPath.startsWith(`${backendPath}/`)
      ) {
        return normalizePath(normalizedPath.slice(backendPath.length));
      }
    } catch {
      return normalizedPath;
    }

    return normalizedPath;
  };

  if (url.startsWith(browserProxyBaseUrl)) {
    return {
      url: normalizeForBaseUrl(url.slice(browserProxyBaseUrl.length)),
      baseURL: browserBaseURL,
    };
  }

  if (/^https?:\/\//i.test(url)) {
    try {
      const requestUrl = new URL(url);
      const backendUrl = new URL(browserBaseURL);

      if (requestUrl.origin === backendUrl.origin) {
        return {
          url: normalizeForBaseUrl(`${requestUrl.pathname}${requestUrl.search}`),
          baseURL: browserBaseURL,
        };
      }
    } catch {
      // Keep the original URL if it cannot be parsed as a URL.
    }

    return { url, baseURL };
  }

  return {
    url: normalizeForBaseUrl(url),
    baseURL: browserBaseURL,
  };
};

import { readAuthToken } from '@/utils/authToken';

const getBrowserAuthToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return readAuthToken();
};

const applyBrowserAuthorizationHeader = (config: AxiosRequestConfig) => {
  const token = getBrowserAuthToken();

  if (!token) {
    return;
  }

  const headers = AxiosHeaders.from(config.headers);

  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers = headers;
};

export const axiosInstance = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? serverBaseUrl
      : directBackendBaseUrl,
  withCredentials: typeof window === 'undefined',
  headers: {
    Accept: 'application/json',
  },
});

let isRefreshing = false;

let failedQueue: Array<{
  resolve: () => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

const clearAuthStorage = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  document.cookie = 'token=; Max-Age=0; path=/;';
  document.cookie = 'refreshToken=; Max-Age=0; path=/;';
};

const forceLogout = (error: AxiosError<any>) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.out ||
    error?.message ||
    t('loginAgain');

  showError(message);

  clearAuthStorage();

  if (typeof window !== 'undefined') {
    void fetch('/api/auth/logout', {
      method: 'POST',
    }).finally(() => {
      window.location.href = '/login';
    });
  }
};

const isRequestCanceled = (error: AxiosError<any>) =>
  axios.isCancel(error) ||
  error.code === 'ERR_CANCELED' ||
  error.name === 'CanceledError' ||
  error.message === 'Query was cancelled';

const getApiErrorMessage = (data: any, fallback: string) =>
  data?.error ||
  data?.reason ||
  data?.message ||
  data?.out ||
  fallback;

axiosInstance.interceptors.request.use((config) => {
  const normalized = normalizeBrowserApiUrl(config.url, config.baseURL);
  config.url = normalized.url;
  config.baseURL = normalized.baseURL;
  config.withCredentials = shouldUseCredentials(normalized.baseURL);
  applyBrowserAuthorizationHeader(config);
  config.signal = mergeAbortSignals(
    config.signal,
    getRouteAbortSignal(),
  );

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    if (isRequestCanceled(error)) {
      return Promise.reject(error);
    }

    const originalRequest =
      error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

    if (!error.response) {
      showError(t('networkError'));
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(
          '/api/refresh',
          {
            method: 'POST',
            credentials: 'include',
          },
        );

        if (!refreshResponse.ok) {
          throw error;
        }

        processQueue();

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);

        forceLogout(error);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        // Empty-list / no-data business errors (`{ error, statusCode: 400 }`)
        // are shown in the table UI — do not toast them.
        if (!(typeof data?.error === 'string' && data.error.length > 0)) {
          showError(getApiErrorMessage(data, t('badRequestError')));
        }
        break;

      case 403:
        showError(getApiErrorMessage(data, t('forbiddenError')));
        break;

      case 404:
        showError(
          getApiErrorMessage(data, t('notFoundError')),
        );
        break;

      case 422:
        showError(getApiErrorMessage(data, t('validationError')));
        break;

      case 500:
        showError(getApiErrorMessage(data, t('serverError')));
        break;

      default:
        if (data?.error || data?.message || data?.reason) {
          showError(getApiErrorMessage(data, t('badRequestError')));
        }
        break;
    }

    return Promise.reject(error);
  },
);
