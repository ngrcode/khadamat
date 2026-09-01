import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { t } from '@/configs/language';
import NetworkStatusMessage from '@/components/NetworkStatusMessage';

const setOnlineStatus = (isOnline: boolean) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value: isOnline,
  });
};

describe('NetworkStatusMessage', () => {
  it('shows the offline message when the browser goes offline', () => {
    setOnlineStatus(true);
    render(<NetworkStatusMessage />);

    expect(screen.queryByText(t('offlineMessage'))).not.toBeInTheDocument();

    setOnlineStatus(false);
    fireEvent(window, new Event('offline'));

    expect(screen.getByText(t('offlineMessage'))).toBeInTheDocument();
  });

  it('hides the offline message when the browser is online', () => {
    setOnlineStatus(false);
    render(<NetworkStatusMessage />);

    expect(screen.getByText(t('offlineMessage'))).toBeInTheDocument();

    setOnlineStatus(true);
    fireEvent(window, new Event('online'));

    expect(screen.queryByText(t('offlineMessage'))).not.toBeInTheDocument();
  });
});
