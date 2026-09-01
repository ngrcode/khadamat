export interface Cookie {
  type: 'setCookie' | 'removeCookie' | 'getCookie';
  key: string;
  value?: string;
}
