'use client';

import { Button, Drawer, Layout, Tooltip } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { HeaderTop } from './headerTop';
import { useAuth } from '@/contexts/app/authContext';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { startUserInactivityTimer } from '@/utils/userInactivity';
import { useRouter } from 'next/navigation';
import SidebarMenuItems from './organisms/menuItems/sidebarMenuItems';
import { useLanguage } from '@/configs/language/languageProvider';
import { t } from '@/configs/language';
import { useTheme } from '@/contexts/app/themeContext';

const { Header, Content, Sider } = Layout;

interface LayoutAppProps {
  children: ReactNode;
}

const LayoutApp = ({ children }: LayoutAppProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { tokenValue, logout } = useAuth();
  const { direction } = useLanguage();
  const { appearance } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [hiddenMenuOpen, setHiddenMenuOpen] = useState(false);
  const router = useRouter();
  const navigationPosition = appearance.navigationPosition;
  const isSideNavigation = navigationPosition === 'RIGHT' || navigationPosition === 'LEFT';
  const isNavigationHidden = navigationPosition === 'HIDDEN';
  const navigationSide = navigationPosition === 'RIGHT' ? 'right' : 'left';
  const expandedWidth = appearance.navigationWidth === 'WIDE' ? 280 : appearance.navigationWidth === 'COMPACT' ? 200 : 230;
  const labelsHidden = !appearance.showNavigationLabels;
  const effectiveCollapsed = collapsed || labelsHidden;
  const currentNavigationWidth = effectiveCollapsed ? 88 : expandedWidth;

  useEffect(() => {
    // After login, keep the main sidebar expanded.
    setCollapsed(false);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (!tokenValue) return;

    const cleanup = startUserInactivityTimer(() => {
      logout();
      setTimeout(() => {
        router.push('/');
      }, 1500)
    }, 10 * 60 * 1000);

    return cleanup;
  }, [tokenValue, logout, router]);


  return (
    <>
      <Header
        className="app-dashboard-header sticky top-0 px-0"
        style={{
          zIndex: 999,
          direction,
          height: 75,
          background: 'var(--ant-layout-header)',
          borderBottom: 'var(--glass-border)',
        }}
      >
        {!isMobile && isSideNavigation && !isNavigationHidden && (
          <Tooltip title={t('toggleSidebar')}>
            <Button
              type="text"
              icon={effectiveCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              aria-label={t('toggleSidebar')}
              className="app-header-icon-button"
              style={{
                fontSize: 24,
                marginTop: 16,
                marginInlineStart: 10,
                zIndex: 1000,
              }}
            />
          </Tooltip>
        )}

        <HeaderTop />
      </Header>


      <Layout className="min-h-screen"
        style={{
          marginRight: !isMobile && isSideNavigation && navigationSide === 'right' ? currentNavigationWidth : 0,
          marginLeft: !isMobile && isSideNavigation && navigationSide === 'left' ? currentNavigationWidth : 0,
          paddingTop: !isMobile && navigationPosition === 'TOP' ? 58 : 0,
          paddingBottom: !isMobile && navigationPosition === 'BOTTOM' ? 58 : 0,
        }}>

        {!isMobile && isNavigationHidden && (
          <>
            <Tooltip title={t('menuMain')}>
              <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setHiddenMenuOpen(true)}
                className="!fixed !top-[88px] !z-40"
                style={{ insetInlineStart: 16 }}
              />
            </Tooltip>
            <Drawer
              title={t('menuMain')}
              placement={direction === 'rtl' ? 'right' : 'left'}
              open={hiddenMenuOpen}
              onClose={() => setHiddenMenuOpen(false)}
              styles={{ body: { padding: 0, background: 'var(--sider-bg)' } }}
            >
              <SidebarMenuItems showSearch />
            </Drawer>
          </>
        )}

        {!isMobile && isSideNavigation && !isNavigationHidden && (
          <Sider width={expandedWidth} collapsedWidth={88} collapsible collapsed={effectiveCollapsed} onCollapse={setCollapsed} trigger={null}
            className={`app-dashboard-sider fixed ${navigationSide === 'right' ? 'right-0' : 'left-0'} z-40`}
            style={{
              top: 75,
              height: 'calc(100vh - 75px)',
              background: 'var(--sider-bg)',
            }}>
            <div className="h-full overflow-hidden">
              <SidebarMenuItems showSearch={!effectiveCollapsed} />
            </div>
          </Sider>
        )}

        {!isMobile && (navigationPosition === 'TOP' || navigationPosition === 'BOTTOM') && (
          <nav
            className={`fixed inset-x-0 z-30 h-[58px] border-[var(--app-card-border)] bg-[var(--app-surface)] ${navigationPosition === 'TOP' ? 'top-[75px] border-b' : 'bottom-0 border-t'}`}
          >
            <SidebarMenuItems mode="horizontal" showSearch={false} />
          </nav>
        )}

        <Content
          className="app-dashboard-content overflow-auto min-h-[calc(100vh-75px)] p-3 sm:p-4 lg:p-6"
          style={{
            zIndex: 1,
            background: 'transparent',
          }}
        >
          <div className="app-content-shell w-full">
            {children}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default LayoutApp;
