'use client';

import type { ReactNode } from 'react';
import { Badge } from '../../atoms/badge';
import type { BadgeProps } from '../../atoms/badge';

export type StatusBadgeProps = Omit<BadgeProps, 'status' | 'text'> & {
  label: ReactNode;
  status: NonNullable<BadgeProps['status']>;
};

export function StatusBadge({ label, status, ...props }: StatusBadgeProps) {
  return <Badge {...props} status={status} text={label} />;
}
