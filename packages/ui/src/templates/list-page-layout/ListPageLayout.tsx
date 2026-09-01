'use client';

import { Space } from 'antd';
import type { ReactNode } from 'react';
import { Typography } from '../../atoms/typography';
import { FilterPanel } from '../../organisms/filter-panel';

export type ListPageLayoutProps = {
  actions?: ReactNode;
  children: ReactNode;
  filters?: ReactNode;
  title: ReactNode;
};

export function ListPageLayout({ actions, children, filters, title }: ListPageLayoutProps) {
  return (
    <section>
      <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography strong>{title}</Typography>{actions}
      </Space>
      {filters ? <FilterPanel>{filters}</FilterPanel> : null}
      {children}
    </section>
  );
}
