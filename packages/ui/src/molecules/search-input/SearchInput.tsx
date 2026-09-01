'use client';

import { Input as AntInput } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

export type SearchInputProps = Omit<SearchProps, 'onChange'> & {
  onChange?: (value: string) => void;
};

export function SearchInput({ onChange, ...props }: SearchInputProps) {
  return <AntInput.Search allowClear {...props} onChange={(event) => onChange?.(event.target.value)} />;
}
