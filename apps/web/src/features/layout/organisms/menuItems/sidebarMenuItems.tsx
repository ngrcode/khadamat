import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { Empty, Input, Menu, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { isDefaultOpenMenuKey, useMenuItems } from '../menuItems/model/ViewModel';
import { t } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';
import type { MenuItem } from '../menuItems/model/ViewModel';

interface SidebarMenuItemsProps {
  className?: string;
  showSearch?: boolean;
  mode?: 'inline' | 'horizontal';
}

const SidebarMenuItems: React.FC<SidebarMenuItemsProps> = ({
  className,
  showSearch = true,
  mode = 'inline',
}) => {
  const { items, handleActive, current } = useMenuItems();
  const { direction } = useLanguage();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!showSearch) setSearchText('');
  }, [showSearch]);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const keysToOpen = new Set<string>();

    // Keep main/top-level menus expanded after login.
    items.forEach((item) => {
      if (item.children?.length) {
        keysToOpen.add(item.key);
      }
      if (isDefaultOpenMenuKey(item.i18nKey)) {
        keysToOpen.add(item.key);
      }
    });

    const traverse = (
      menuItems: typeof items,
      parentKeys: string[] = []
    ): boolean => {
      for (const item of menuItems) {
        if (isDefaultOpenMenuKey(item.i18nKey)) {
          keysToOpen.add(item.key);
        }

        if (item.key === current) {
          parentKeys.forEach((key) => keysToOpen.add(key));
          return true;
        }

        if (item.children && traverse(item.children, [...parentKeys, item.key])) {
          parentKeys.forEach((key) => keysToOpen.add(key));
          return true;
        }
      }

      return false;
    };

    traverse(items);
    setOpenKeys(Array.from(keysToOpen));
  }, [current, items]);

  const styledItems = useMemo(() => {
    if (!items) return [];

    const filterItems = (menuItems: MenuItem[]): MenuItem[] => menuItems
      .map((item) => {
        if (!searchText.trim()) return item;

        const children = item.children ? filterItems(item.children) : undefined;
        const isMatch = item.title.toLowerCase().includes(searchText.trim().toLowerCase());

        if (isMatch || (children && children.length > 0)) {
          return { ...item, children };
        }

        return null;
      })
      .filter(Boolean) as MenuItem[];

    const addTooltips = (menuItems: MenuItem[], depth = 0): NonNullable<MenuProps['items']> => menuItems.map((item) => ({
      ...item,
      className: depth === 0 ? 'dashboard-menu-primary-item' : 'dashboard-menu-child-item',
      label: (
        <Tooltip
          title={item.title}
          placement={direction === 'rtl' ? 'left' : 'right'}
          mouseEnterDelay={0.45}
          overlayClassName="dashboard-menu-tooltip"
        >
          <span className="dashboard-menu-tooltip-target">{item.label}</span>
        </Tooltip>
      ),
      children: item.children ? addTooltips(item.children, depth + 1) : undefined,
    }));

    return addTooltips(filterItems(items));
  }, [direction, items, searchText]);

  const handleClick = useCallback((e: { key: string }) => {
    handleActive(e.key);
  }, [handleActive]);

  const handleOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  return (
    <nav
      aria-label={t('menuMain')}
      data-direction={direction}
      className={`dashboard-navigation flex h-full ${mode === 'inline' ? 'flex-col px-3 pb-4' : 'items-center px-3'} ${className || ''}`}
    >
      {mode === 'inline' && showSearch && (
        <div className="dashboard-menu-heading hidden lg:block">
          <Input
            allowClear
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder={t('searchMenu')}
            className="dashboard-menu-search w-full"
          />
        </div>
      )}

      {styledItems.length > 0 ? (
        <Menu
          selectedKeys={current ? [current] : []}
          openKeys={mode === 'inline' ? openKeys : undefined}
          onOpenChange={mode === 'inline' ? handleOpenChange : undefined}
          mode={mode}
          onClick={handleClick}
          items={styledItems}
          className="dashboard-menu"
          inlineIndent={18}
          style={{ overflow: mode === 'inline' ? 'auto' : 'visible', flex: 1 }}
          subMenuOpenDelay={0.08}
          subMenuCloseDelay={0.08}
        />
      ) : (
        <Empty className="dashboard-menu-empty" image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('noData')} />
      )}
    </nav>
  );
};

export default memo(SidebarMenuItems);
