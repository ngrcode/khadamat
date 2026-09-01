'use client';

import { Layout } from 'antd';
import type { ReactNode } from 'react';
import { Typography } from '../../atoms/typography';

export type DashboardLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  navigation?: ReactNode;
  title?: ReactNode;
};

export function DashboardLayout({ children, header, navigation, title }: DashboardLayoutProps) {
  return (
    <Layout>
      {header ? <Layout.Header>{header}</Layout.Header> : null}
      <Layout>
        {navigation ? <Layout.Sider>{navigation}</Layout.Sider> : null}
        <Layout.Content>{title ? <Typography strong>{title}</Typography> : null}{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
