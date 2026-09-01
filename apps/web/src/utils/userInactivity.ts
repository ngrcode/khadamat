'use client';

let logoutTimer: any;

export const startUserInactivityTimer = (
  logoutCallback: () => void,
  timeout = 10 * 60 * 1000,
) => {
  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logoutCallback();
    }, timeout);
  };

  const events = ['mousemove', 'keydown', 'click', 'scroll'];

  events.forEach((event) => {
    window.addEventListener(event, resetTimer);
  });

  resetTimer();

  return () => {
    events.forEach((event) => {
      window.removeEventListener(event, resetTimer);
    });
    clearTimeout(logoutTimer);
  };
};
