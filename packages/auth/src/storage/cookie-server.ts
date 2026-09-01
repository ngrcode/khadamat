'use server';

import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string, maxAge?: number) {
  cookies().set({
    name: key,
    value: value,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    // maxAge: maxAge ?? 60 * 60 * 24 * 7, // پیش‌فرض 7 روز
    path: '/',
  });
}

export async function removeCookie(key: string) {
  cookies().delete(key);
}


export async function removeAllCookies() {
  const allCookies = cookies().getAll();
  allCookies.forEach((cookie) => {
    cookies().delete(cookie.name);
  });
}


export async function getCookie(key: string) {
  const cookie = cookies().get(key);
  return cookie?.value || null;
}
