import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios';

const defaultBackendBaseUrl = 'https://portal2.kh-poshtibani.ir/';

const isHttpUrl = (value?: string) => /^https?:\/\//i.test(value ?? '');

const getBackendBaseUrl = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    defaultBackendBaseUrl;

  return isHttpUrl(baseUrl) ? baseUrl : defaultBackendBaseUrl;
};

const getCookieValue = (name: string) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split('=')
      .slice(1)
      .join('=') ?? null
  );
};

const getBrowserAuthToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const cookieToken = getCookieValue('token');
  if (cookieToken) {
    return decodeURIComponent(cookieToken);
  }

  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

const applyBrowserAuthorizationHeader = (config: AxiosRequestConfig) => {
  const token = getBrowserAuthToken();

  if (!token) {
    return;
  }

  const headers = AxiosHeaders.from(config.headers as AxiosHeaders);

  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers = headers;
};

export const axiosInstance = axios.create({
  baseURL: getBackendBaseUrl(),
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  applyBrowserAuthorizationHeader(config);

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
