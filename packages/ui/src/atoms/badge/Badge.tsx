'use client';

import { Badge as AntBadge } from 'antd';
import type { BadgeProps as AntBadgeProps } from 'antd';

export type BadgeProps = AntBadgeProps;

export function Badge(props: BadgeProps) {
  return <AntBadge {...props} />;
}
