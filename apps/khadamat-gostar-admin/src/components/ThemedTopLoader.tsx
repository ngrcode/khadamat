'use client';

import NextTopLoader from 'nextjs-toploader';
import { useTheme } from '@repo/theme';

export function ThemedTopLoader() {
  const { palette } = useTheme();

  return (
    <NextTopLoader
      color={palette.accent[500]}
      showSpinner={false}
      height={3}
      shadow={`0 0 50px ${palette.colors[500]},0 0 7px ${palette.accent[500]}`}
    />
  );
}
