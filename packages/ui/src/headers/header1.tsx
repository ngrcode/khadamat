import { LineOutlined } from '@ant-design/icons';
import { FC } from 'react';

import type { HeadersType } from './headers';
import { cn } from '@repo/utils/cn';

export const Header1: FC<HeadersType  & { noBorder?: boolean }> = ({ title, classNameHeader, children , noBorder }) => {
  return (
    <div
     className={cn(
        classNameHeader,
        "text-lg lg:text-xl font-semibold leading-[30px] pb-8 my-6",
        noBorder ? "" : "border-4 border-transparent h-5  text-text"
      )}
    >
      <span className={`${classNameHeader} p-3`}>{title}</span>
      {children}
    </div>
  );
};
