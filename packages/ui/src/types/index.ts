import type { CSSProperties } from 'react';

export interface AlertType {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
  showIcon: boolean;
  closAble: boolean;
  style: CSSProperties | undefined;
}

export interface SelectOptionType {
  label: string;
  value: string;
}

export interface SelectType {
  mode: 'multiple' | 'tags' | undefined;
  style: React.CSSProperties;
  placeholder: string;
  defaultValue: SelectOptionType;
  onChange: () => void;
  optionRender: () => React.ReactNode;
  options: SelectOptionType[];
}

export interface TabsType {
  key: string;
  label: string;
  children?: React.ReactNode;
}
