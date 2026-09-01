'use client';

import { useMemo } from 'react';
import useDownloadExcelGetValues from '@/hook/useDownloadExcel';
import { handleLocalStorage } from '@/utils/localStorage';
import {
  getServerMenuTranslationKey,
  resolveServerMenuRoute,
  translateServerMenuTitle,
} from '@/configs/language/menu';
import { t } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';

interface StorageMenuItem {
  title: string;
  icon?: string;
  url?: string;
  child?: StorageMenuItem[] | null;
}

export interface DashboardModule {
  title: string;
  href: string;
  group: 'people' | 'requests' | 'services' | 'system';
}

export interface DashboardGroup {
  key: DashboardModule['group'];
  label: string;
  count: number;
  color: string;
}

const getFallbackModules = (): DashboardModule[] => [
  { title: t('users'), href: '/dashboard/users', group: 'people' },
  { title: t('requestLeave'), href: '/dashboard/requestLeave', group: 'requests' },
  { title: t('ticket'), href: '/dashboard/ticket', group: 'requests' },
  { title: t('exsel'), href: '/dashboard/excel', group: 'services' },
  { title: t('unitemployee'), href: '/dashboard/unitEmployee', group: 'system' },
  { title: t('roles'), href: '/dashboard/roles', group: 'system' },
  { title: t('hokm'), href: '/dashboard/hokm', group: 'people' },
  { title: t('barbershop'), href: '/dashboard/barbershop', group: 'services' },
  { title: t('velenjakreservationallowable'), href: '/dashboard/velenjakReservationAllowable', group: 'services' },
  { title: t('humanResource'), href: '/dashboard/humanResource', group: 'people' },
];

const getGroupMeta = (): Record<DashboardModule['group'], { label: string; color: string }> => ({
  people: { label: t('dashboardPeople'), color: 'var(--color-primary)' },
  requests: { label: t('dashboardRequests'), color: 'var(--color-accent)' },
  services: { label: t('dashboardServices'), color: 'var(--brand-plot-3)' },
  system: { label: t('dashboardSystem'), color: 'var(--brand-plot-4)' },
});

const getGroupByMenuKey = (menuKey?: string): DashboardModule['group'] => {
  if (menuKey?.includes('User') || menuKey?.includes('HrOrder') || menuKey === 'menuHumanResourceList') {
    return 'people';
  }

  if (menuKey?.includes('Leave') || menuKey?.includes('Message') || menuKey?.includes('Ticket')) {
    return 'requests';
  }

  if (menuKey?.includes('Payroll') || menuKey === 'menuBarberShop' || menuKey === 'menuVelenjak') {
    return 'services';
  }

  return 'system';
};

const flattenMenu = (menu: StorageMenuItem[]): DashboardModule[] => {
  const modules: DashboardModule[] = [];

  const visit = (items: StorageMenuItem[]) => {
    items.forEach((item) => {
      const href = resolveServerMenuRoute(item.title, item.url || '');
      const menuKey = getServerMenuTranslationKey(item.title, item.url || '');

      if (href && href !== '#') {
        modules.push({
          title: translateServerMenuTitle(item.title, item.url || ''),
          href,
          group: getGroupByMenuKey(menuKey),
        });
      }

      if (item.child?.length) {
        visit(item.child);
      }
    });
  };

  visit(menu);
  return modules;
};

const getDashboardModules = (): DashboardModule[] => {
  const fallbackModules = getFallbackModules();
  const storedMenu = handleLocalStorage({
    type: 'getLocalStorage',
    key: 'panelMenu',
  });

  if (!storedMenu) return fallbackModules;

  try {
    const parsedMenu = typeof storedMenu === 'string' ? JSON.parse(storedMenu) : storedMenu;
    const modules = Array.isArray(parsedMenu) ? flattenMenu(parsedMenu) : [];
    return modules.length > 0 ? modules : fallbackModules;
  } catch {
    return fallbackModules;
  }
};

const getGroups = (modules: DashboardModule[]): DashboardGroup[] => {
  const groupMeta = getGroupMeta();
  const counts = modules.reduce<Record<DashboardModule['group'], number>>((acc, item) => {
    acc[item.group] += 1;
    return acc;
  }, {
    people: 0,
    requests: 0,
    services: 0,
    system: 0,
  });

  return Object.entries(counts).map(([key, count]) => ({
    key: key as DashboardModule['group'],
    label: groupMeta[key as DashboardModule['group']].label,
    color: groupMeta[key as DashboardModule['group']].color,
    count,
  }));
};

const getConicGradient = (groups: DashboardGroup[]) => {
  const total = groups.reduce((sum, group) => sum + group.count, 0) || 1;
  let current = 0;

  return groups
    .filter((group) => group.count > 0)
    .map((group) => {
      const start = current;
      const end = current + (group.count / total) * 100;
      current = end;
      return `${group.color} ${start}% ${end}%`;
    })
    .join(', ');
};

const useDashboard = () => {
  const { handleDownloadExcelGetValues, isLoadingExcelGetValues } = useDownloadExcelGetValues();
  const { language } = useLanguage();

  const modules = useMemo(() => getDashboardModules(), [language]);
  const groups = useMemo(() => getGroups(modules), [modules, language]);
  const conicGradient = useMemo(() => getConicGradient(groups), [groups]);
  const quickActions = useMemo(() => modules.slice(0, 6), [modules]);
  const busiestGroup = useMemo(
    () => groups.reduce((top, group) => (group.count > top.count ? group : top), groups[0]),
    [groups],
  );

  const handleExportExcel = () => {
    handleDownloadExcelGetValues('api/1/Employee/ExportExcelAllEmployee', {});
  };

  return {
    handleExportExcel,
    isLoadingExcelGetValues,
    modules,
    groups,
    quickActions,
    conicGradient,
    busiestGroup,
    totalModules: modules.length,
  };
};

export default useDashboard;
