'use client';

import { useEffect } from 'react';

const PwaLifecycle = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') return;

    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          void registration.unregister();
        });
      });

      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          cacheNames
            .filter((cacheName) => cacheName.startsWith('khadamat-gostar-'))
            .forEach((cacheName) => {
              void caches.delete(cacheName);
            });
        });
      }

      return;
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch {
        // Service worker registration is progressive enhancement.
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
};

export default PwaLifecycle;
