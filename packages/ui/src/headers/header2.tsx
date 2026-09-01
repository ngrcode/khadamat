import { FC } from 'react';

import type { HeadersType } from './headers';

export const Header2: FC<HeadersType> = ({ title, classNameHeader }) => {
  return (
    <div
      className={`${classNameHeader} text-lg text-trueGray-800 font-semibold leading-9 pb-8`}
    >
      <span>{title}</span>
    </div>
  );
};
