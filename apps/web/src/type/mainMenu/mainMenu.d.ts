import React, { SetStateAction } from 'react';

export interface MenuItemType {
  icon: React.JSX.Element;
  style: string;
  name: string;
  href: string;
}

export interface hideMenuType {
  isMenuHide: boolean;
  setMenuHide: React.Dispatch<SetStateAction<boolean>>;
}
