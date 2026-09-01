'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { t } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';
import { useMenuItems } from '../../organisms/menuItems/model/ViewModel';

interface DrawerResponsiveProps {
        userName?: string | null;
        onLogout?: () => void;
        isLoading?: boolean;
}

const DrawerResponsive: React.FC<DrawerResponsiveProps> = ({
        userName,
        onLogout,
        isLoading = false,
}) => {
        const [open, setOpen] = useState(false);
        const { direction, language } = useLanguage();
        const { items, current, handleActive } = useMenuItems();
        const menuItems = items as MenuProps['items'];

        const handleMenuClick = useCallback((event: { key: string }) => {
                handleActive(event.key);
                setOpen(false);
        }, [handleActive]);

        const handleLogoutClick = useCallback(() => {
                setOpen(false);
                onLogout?.();
        }, [onLogout]);

        const drawerTitle = useMemo(() => (
                <div className="flex items-center justify-between gap-3">
                        <span>{t('menuMain')}</span>
                        {userName && <span className="text-xs opacity-75">{userName}</span>}
                </div>
        ), [language, userName]);

        return (
                <div>
                        <Button
                                onClick={() => setOpen(true)}
                                type="text"
                                className="!h-16 !w-16 !min-w-0 !p-0 !bg-white/10 backdrop-blur-md hover:!bg-white/20 !border !border-white/20 !rounded-2xl transition-all duration-300 hover:scale-105"
                                icon={<MenuOutlined className="text-white text-2xl" />}
                        />

                        <Drawer
                                placement={direction === 'rtl' ? 'right' : 'left'}
                                width={Math.min(360, typeof window !== 'undefined' ? window.innerWidth - 28 : 340)}
                                title={drawerTitle}
                                open={open}
                                onClose={() => setOpen(false)}
                                bodyStyle={{
                                        padding: 0,
                                        background: 'var(--app-surface)',
                                        backdropFilter: 'blur(20px)',
                                        borderInlineEnd: 'var(--glass-border)',
                                        boxShadow: 'var(--glass-shadow)'
                                }}
                                headerStyle={{
                                        background: 'var(--ant-layout-header)',
                                        backdropFilter: 'blur(10px)',
                                        borderBottom: 'var(--glass-border)',
                                        color: 'rgb(var(--foreground-rgb))',
                                }}
                                className="[&_.ant-drawer-content]:!bg-[var(--app-surface)]"
                               
                                
                        >
                                <div className="flex h-full flex-col">
                                        <Menu
                                                mode="vertical"
                                                items={menuItems}
                                                className="custom-menu !border-none"
                                                selectedKeys={[current.toString()]}
                                                onClick={handleMenuClick}
                                                style={{ background: 'transparent', flex: 1 }}
                                        />

                                        <div className="border-t border-[var(--app-card-border)] p-4">
                                                <Button
                                                        danger
                                                        type="text"
                                                        block
                                                        icon={<LogoutOutlined />}
                                                        loading={isLoading}
                                                        onClick={handleLogoutClick}
                                                        className="!flex !h-11 !items-center !justify-center !gap-2"
                                                >
                                                        {t('logout')}
                                                </Button>
                                        </div>
                                </div>
                        </Drawer>
                </div>
        );
};

export default DrawerResponsive;
