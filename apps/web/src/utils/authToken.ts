'use client';

export const AUTH_TOKEN_STORAGE_KEY = 'auth_token';
export const AUTH_PROFILE_STORAGE_KEY = 'auth_profile';

type AuthProfile = {
  userName: string;
  userType: string;
  panelMenu: string;
  firstLogin: boolean;
};

const expireTokenCookies = () => {
  const hostname = window.location.hostname;
  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const domains = ['', hostname, `.${hostname}`];

  domains.forEach((domain) => {
    const domainPart = domain ? `; Domain=${domain}` : '';
    document.cookie = `token=; Path=/; Expires=${expires}${domainPart}`;
    document.cookie = `token=; Path=/; Expires=${expires}; Secure${domainPart}`;
  });
};

export const writeAuthToken = (accessToken: string) => {
  if (typeof window === 'undefined' || !accessToken) {
    return false;
  }

  expireTokenCookies();

  const isHttps = window.location.protocol === 'https:';
  let cookie = `token=${accessToken}; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax`;
  if (isHttps) {
    cookie += '; Secure';
  }
  document.cookie = cookie;

  try {
    sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, accessToken);
  } catch {
    // ignore
  }

  return Boolean(readAuthToken());
};

export const readAuthToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const fromCookie = document.cookie
    .split('; ')
    .find((part) => part.startsWith('token='))
    ?.slice('token='.length);

  if (fromCookie) {
    try {
      return decodeURIComponent(fromCookie);
    } catch {
      return fromCookie;
    }
  }

  try {
    return sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const writeAuthProfile = (profile: AuthProfile) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('userName', profile.userName);
  localStorage.setItem('userType', profile.userType);
  localStorage.setItem('panelMenu', profile.panelMenu);
  localStorage.setItem('firstLogin', String(profile.firstLogin));

  try {
    sessionStorage.setItem(AUTH_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
};

export const readAuthProfile = (): AuthProfile | null => {
  if (typeof window === 'undefined') return null;

  const userName = localStorage.getItem('userName');
  const userType = localStorage.getItem('userType');
  const panelMenu = localStorage.getItem('panelMenu');
  const firstLogin = localStorage.getItem('firstLogin') === 'true';

  if (userName?.trim() && userType?.trim() && panelMenu !== null) {
    return {
      userName: userName.trim(),
      userType: userType.trim(),
      panelMenu,
      firstLogin,
    };
  }

  try {
    const raw = sessionStorage.getItem(AUTH_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthProfile;
    if (parsed?.userName?.trim() && parsed?.userType?.trim() && parsed.panelMenu != null) {
      writeAuthProfile(parsed);
      return parsed;
    }
  } catch {
    // ignore
  }

  return null;
};

export const clearAuthToken = () => {
  if (typeof window === 'undefined') return;

  expireTokenCookies();

  try {
    sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_PROFILE_STORAGE_KEY);
  } catch {
    // ignore
  }
};

export const hasRecoverableSession = () => {
  return Boolean(readAuthToken() && readAuthProfile());
};
