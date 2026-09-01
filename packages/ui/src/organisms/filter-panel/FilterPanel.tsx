'use client';

import { Space } from 'antd';
import type { ReactNode } from 'react';

export type FilterPanelProps = {
  actions?: ReactNode;
  children: ReactNode;
};

export function FilterPanel({ actions, children }: FilterPanelProps) {
  return <Space align="center" wrap>{children}{actions ? <Space>{actions}</Space> : null}</Space>;
}
