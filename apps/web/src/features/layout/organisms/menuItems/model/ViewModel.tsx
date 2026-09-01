import {
  ApartmentOutlined,
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  IdcardOutlined,
  MessageOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  ScissorOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { handleLocalStorage } from '@/utils/localStorage';
import { useLanguage } from '@/configs/language/languageProvider';
import {
  getServerMenuTranslationKey,
  isDefaultOpenMenuKey,
  resolveServerMenuRoute,
  translateServerMenuTitle,
} from '@/configs/language/menu';

interface StorageMenuItem {
  title: string;
  icon: string;
  url: string;
  child: StorageMenuItem[] | null;
}

export interface MenuItem {
  key: string;
  title: string;
  sourceTitle: string;
  i18nKey?: string;
  label: ReactNode;
  icon: ReactNode;
  href?: string;
  children?: MenuItem[];
}

interface UseMenuItemsReturn {
  items: MenuItem[];
  current: string;
  handleActive: (key: string) => void;
}

const getIconByMenuKey = (menuKey?: string): ReactNode => {
  if (menuKey === 'menuDashboard' || menuKey === 'menuHome' || menuKey === 'menuMain') {
    return <DashboardOutlined />;
  }
  if (menuKey?.includes('Notification') || menuKey === 'menuBulletinBoard') return <BellOutlined />;
  if (menuKey?.includes('Event')) return <CalendarOutlined />;
  if (menuKey?.includes('User')) return <TeamOutlined />;
  if (menuKey?.includes('Leave')) return <FileDoneOutlined />;
  if (menuKey?.includes('Message')) return <MessageOutlined />;
  if (menuKey?.includes('Payroll')) return <FileExcelOutlined />;
  if (menuKey?.includes('Unit')) return <ApartmentOutlined />;
  if (menuKey === 'menuBarberShop') return <ScissorOutlined />;
  if (menuKey === 'menuVelenjak') return <EnvironmentOutlined />;
  if (menuKey?.includes('Role')) return <SafetyCertificateOutlined />;
  if (menuKey === 'menuInstallmentDeduction') return <CreditCardOutlined />;
  if (menuKey === 'menuEmployeePhoneUpdate') return <PhoneOutlined />;
  if (menuKey?.includes('HrOrder')) return <IdcardOutlined />;

  return <AppstoreOutlined />;
};

export const useMenuItems = (): UseMenuItemsReturn => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [current, setCurrent] = useState<string>('');
  const [hrefMap, setHrefMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const loadMenu = () => {
      const storedMenu = handleLocalStorage({
        type: 'getLocalStorage',
        key: 'panelMenu',
      });

      if (!storedMenu) {
        setItems([]);
        setHrefMap(new Map());
        return;
      }

      try {
        const rawMenuData: StorageMenuItem[] =
          typeof storedMenu === 'string' ? JSON.parse(storedMenu) : storedMenu;

        const currentHrefMap = new Map<string, string>();

        const transformMenu = (
          menuList: StorageMenuItem[],
          parentKey = 'menu',
        ): MenuItem[] => {
          return menuList.map((item, index) => {
            const generatedKey = `${parentKey}-${index}`;
            const hasChildren = item.child && item.child.length > 0;
            const menuKey = getServerMenuTranslationKey(item.title, item.url);
            const displayTitle = translateServerMenuTitle(item.title, item.url);
            const resolvedHref = resolveServerMenuRoute(item.title, item.url);

            if (resolvedHref && resolvedHref !== '') {
              currentHrefMap.set(resolvedHref, generatedKey);
            }

            const mappedItem: MenuItem = {
              key: generatedKey,
              title: displayTitle,
              sourceTitle: item.title,
              i18nKey: menuKey,
              href: resolvedHref || undefined,
              icon: getIconByMenuKey(menuKey),
              label:
                resolvedHref && resolvedHref !== '#' && !hasChildren ? (
                  <Link href={resolvedHref}>{displayTitle}</Link>
                ) : (
                  <span>{displayTitle}</span>
                ),
            };

            if (hasChildren && item.child) {
              mappedItem.children = transformMenu(item.child, generatedKey);
            }

            return mappedItem;
          });
        };

        const transformedResult = transformMenu(rawMenuData);
        setItems(transformedResult);
        setHrefMap(currentHrefMap);
      } catch (error) {
        console.error('Error parsing panelMenu from localStorage', error);
      }
    };

    loadMenu();
    window.addEventListener('panelMenu:updated', loadMenu);
    return () => window.removeEventListener('panelMenu:updated', loadMenu);
  }, [language]);

  useEffect(() => {
    if (!pathname || hrefMap.size === 0) return;

    const activeKey = hrefMap.get(pathname);
    if (activeKey) {
      setCurrent(activeKey);
    } else {
      let bestMatchKey = '';
      let maxLength = 0;

      hrefMap.forEach((key, href) => {
        if (href && pathname.startsWith(href) && href.length > maxLength) {
          maxLength = href.length;
          bestMatchKey = key;
        }
      });

      if (bestMatchKey) setCurrent(bestMatchKey);
    }
  }, [pathname, hrefMap]);

  const handleActive = useCallback((key: string) => {
    setCurrent(key);
  }, []);

  return { items, current, handleActive };
};

export { isDefaultOpenMenuKey };
