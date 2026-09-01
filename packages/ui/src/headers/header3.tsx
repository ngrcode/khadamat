import { FC } from 'react';
import { cn } from '@repo/utils/cn';

import type { HeadersType } from './headers';

export const Header3: FC<HeadersType> = ({ title, classNameHeader }) => {
  return (
    <div
      className={cn(
        'app-form-label text-base leading-9 text-right',
        classNameHeader,
      )}
    >
      <span>{title}</span>
    </div>
  );
};
