'use client';

import { MoonFilled, SunFilled } from '@ant-design/icons';
import { useTheme } from '@repo/theme/react';

type ThemeModeToggleProps = {
  className?: string;
  disabled?: boolean;
  lightLabel?: string;
  darkLabel?: string;
};

export function ThemeModeToggle({
  className,
  disabled = false,
  lightLabel = 'حالت روشن',
  darkLabel = 'حالت تاریک',
}: ThemeModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`portal-theme-mode ${isDark ? 'is-dark' : 'is-light'}${className ? ` ${className}` : ''}`}
      onClick={() => {
        if (!disabled) setTheme(isDark ? 'light' : 'dark');
      }}
      disabled={disabled}
      aria-label={isDark ? darkLabel : lightLabel}
      title={isDark ? darkLabel : lightLabel}
    >
      <span className="portal-theme-mode-track" aria-hidden>
        <span className="portal-theme-mode-icon portal-theme-mode-sun">
          <SunFilled />
        </span>
        <span className="portal-theme-mode-icon portal-theme-mode-moon">
          <MoonFilled />
        </span>
        <span className="portal-theme-mode-knob" />
      </span>
    </button>
  );
}

export default ThemeModeToggle;
