import Cookies from 'js-cookie';

// Import Cookies from js-cookie module
import { Cookie } from '../types/cookie';

export function handleCookie({ type, key, value }: Cookie): undefined | string {
  switch (type) {
    case 'setCookie':
      // Set cookie with same settings as server cookie (except httpOnly)
      // path: '/' ensures cookie is available for all routes
      // secure: true is required for HTTPS (will be false automatically on HTTP/localhost)
      // sameSite: 'lax' matches server cookie for consistency
      Cookies.set(key, value, {
        expires: 30, // 30 days
        path: '/', // Available for all routes
        sameSite: 'lax', // CSRF protection
        secure: window.location.protocol === 'https:', // Secure only on HTTPS
      });
      break;
    case 'removeCookie':
      Cookies.remove(key, { path: '/' }); // Remove the cookie from all paths
      break;
    case 'getCookie':
      return Cookies.get(key); // Get the cookie value
    default:
      return undefined; // Return undefined by default if no case matches
  }
}