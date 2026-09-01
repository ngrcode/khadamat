'use client';

import {
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useAuth } from '@repo/auth/react';
import { t } from '@repo/i18n';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <Link href="/dashboard">{t('dashboard')}</Link>,
  },
  {
    key: '/dashboard/users',
    icon: <TeamOutlined />,
    label: <Link href="/dashboard/users">{t('user')}</Link>,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const selectedKey = useMemo(() => {
    if (pathname.startsWith('/dashboard/users')) return '/dashboard/users';
    return '/dashboard';
  }, [pathname]);

  return (
    <Sider
      width={260}
      className="admin-sidebar custom-menu"
      style={{
        background: 'var(--sider-bg, #fff)',
        borderLeft: '1px solid var(--app-card-border, rgba(58, 21, 113, 0.08))',
      }}
    >
      <div className="admin-sidebar-brand">
        <span className="admin-sidebar-brand-mark">
          <UserOutlined />
        </span>
        <div>
          <Typography.Title level={4} className="!m-0 !text-[var(--color-primary)]">
            پنل مدیریت
          </Typography.Title>
          <Typography.Text type="secondary">خدمات گستر · بانک رفاه</Typography.Text>
        </div>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        className="custom-menu"
        style={{ border: 'none', padding: '12px 8px', background: 'transparent' }}
      />
    </Sider>
  );
}

export function AdminHeader() {
  const { logout } = useAuth();

  return (
    <div className="admin-header-bar">
      <Typography.Title level={5} className="!m-0 !text-[var(--color-primary)]">
        سامانه مدیریت خدمات گستر
      </Typography.Title>
      <button
        type="button"
        onClick={() => logout()}
        className="admin-header-logout"
      >
        <LogoutOutlined />
        {t('logout')}
      </button>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--app-surface-alt, #f8f4fc)' }}>
      <Layout>
        <AdminHeader />
        <Layout>
          <AdminSidebar />
          <Layout.Content className="p-6">{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export function LoginIcon() {
  return <UserOutlined style={{ color: 'var(--color-primary)', fontSize: 28 }} />;
}
