'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { FullPageLoading } from '@/components/FullPageLoading';
import { t } from '@/configs/language';
import { abortPendingRouteRequests } from '@/utils/routeRequestController';

/** Only show overlay if navigation is still pending after this delay. */
const ROUTE_LOADING_DELAY_MS = 180;
/** Hard cap so overlay never sticks. */
const ROUTE_LOADING_MAX_MS = 2_500;

const isInternalAppPath = (href: string) => {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    try {
      return new URL(href).origin === window.location.origin;
    } catch {
      return false;
    }
  }

  return href.startsWith('/');
};

const getPathnameFromHref = (href: string) => {
  try {
    const url = new URL(href, window.location.origin);
    return `${url.pathname}${url.search}`;
  } catch {
    return href;
  }
};

export function RouteTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const currentKeyRef = useRef(`${pathname}?${searchParams?.toString() ?? ''}`);
  const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigatingRef = useRef(false);

  const clearTimers = () => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  };

  const endRouteChange = useCallback(() => {
    navigatingRef.current = false;
    clearTimers();
    setLoading(false);
  }, []);

  const beginRouteChange = useCallback(() => {
    // Abort only in-flight HTTP from the previous page; keep React Query cache intact
    // so revisiting a route can show cached data immediately.
    abortPendingRouteRequests();

    navigatingRef.current = true;
    clearTimers();
    setLoading(false);

    delayTimeoutRef.current = setTimeout(() => {
      if (navigatingRef.current) {
        setLoading(true);
      }
    }, ROUTE_LOADING_DELAY_MS);

    maxTimeoutRef.current = setTimeout(() => {
      endRouteChange();
    }, ROUTE_LOADING_MAX_MS);
  }, [endRouteChange]);

  useEffect(() => {
    const nextKey = `${pathname}?${searchParams?.toString() ?? ''}`;
    currentKeyRef.current = nextKey;
    endRouteChange();
  }, [pathname, searchParams, endRouteChange]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');

      if (!anchor) {
        return;
      }

      if (anchor.target && anchor.target !== '_self') {
        return;
      }

      if (anchor.hasAttribute('download')) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || !isInternalAppPath(href)) {
        return;
      }

      const nextKey = getPathnameFromHref(href);
      const currentKey = `${window.location.pathname}${window.location.search}`;

      if (nextKey === currentKey) {
        return;
      }

      beginRouteChange();
    };

    const onPopState = () => {
      beginRouteChange();
    };

    document.addEventListener('click', onDocumentClick, true);
    window.addEventListener('popstate', onPopState);

    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      window.removeEventListener('popstate', onPopState);
      clearTimers();
    };
  }, [beginRouteChange]);

  return (
    <FullPageLoading open={loading} message={t('loadingData')} />
  );
}
