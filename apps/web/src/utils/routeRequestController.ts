let routeAbortController =
  typeof AbortController !== 'undefined'
    ? new AbortController()
    : null;

export const getRouteAbortSignal = (): AbortSignal | undefined =>
  routeAbortController?.signal;

export const abortPendingRouteRequests = () => {
  if (!routeAbortController) {
    return;
  }

  routeAbortController.abort();
  routeAbortController = new AbortController();
};

export const mergeAbortSignals = (
  ...signals: Array<AbortSignal | undefined | null>
): AbortSignal | undefined => {
  const active = signals.filter((signal): signal is AbortSignal =>
    Boolean(signal),
  );

  if (active.length === 0) {
    return undefined;
  }

  if (active.length === 1) {
    return active[0];
  }

  if (typeof AbortSignal !== 'undefined' && 'any' in AbortSignal) {
    return AbortSignal.any(active);
  }

  const controller = new AbortController();
  const onAbort = () => {
    controller.abort();
    active.forEach((signal) =>
      signal.removeEventListener('abort', onAbort),
    );
  };

  for (const signal of active) {
    if (signal.aborted) {
      controller.abort();
      break;
    }
    signal.addEventListener('abort', onAbort, { once: true });
  }

  return controller.signal;
};
