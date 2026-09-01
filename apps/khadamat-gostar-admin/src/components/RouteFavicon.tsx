'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const FALLBACK_ICON = '/loading-center.svg';

const getIconCandidates = (pathname: string): string[] => {
  const segments = pathname.split('/').filter(Boolean);
  const candidates: string[] = [];

  while (segments.length > 0) {
    candidates.push(`/route-icons/${segments.join('/')}.svg`);
    segments.pop();
  }

  return [...candidates, '/route-icons/home.svg', FALLBACK_ICON];
};

const loadFirstAvailableIcon = (candidates: string[]): Promise<string> =>
  new Promise((resolve) => {
    const tryCandidate = (index: number) => {
      const candidate = candidates[index] ?? FALLBACK_ICON;

      if (candidate === FALLBACK_ICON) {
        resolve(FALLBACK_ICON);
        return;
      }

      const image = new Image();
      image.onload = () => resolve(candidate);
      image.onerror = () => tryCandidate(index + 1);
      image.src = candidate;
    };

    tryCandidate(0);
  });

export default function RouteFavicon() {
  const pathname = usePathname();

  useEffect(() => {
    let active = true;

    void loadFirstAvailableIcon(getIconCandidates(pathname || '/')).then((href) => {
      if (!active) return;

      let icon = document.querySelector<HTMLLinkElement>('link[data-route-favicon="true"]');

      if (!icon) {
        icon = document.createElement('link');
        icon.rel = 'icon';
        icon.type = 'image/svg+xml';
        icon.dataset.routeFavicon = 'true';
        document.head.appendChild(icon);
      }

      icon.href = href;
    });

    return () => {
      active = false;
    };
  }, [pathname]);

  return null;
}
