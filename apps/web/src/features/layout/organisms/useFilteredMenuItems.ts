import { useMemo } from 'react';

/**
 * Filter menu items by user role.
 * @param items menu items
 * @param userRole current user role
 * @returns allowed items
 */
export const useFilteredMenuItems = (items: any[], userRole: string) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (!item.permissions) return true;
      return item.permissions.includes(userRole);
    });
  }, [items, userRole]);

  return filteredItems;
};
