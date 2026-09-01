'use client';

import React from 'react';

import CustomCarousel from './CustomCarousel';
import { BannerType } from '@/type/carousel/carousel';

const Carousels: React.FC<{ data: BannerType[] }> = ({
  data,
}: {
  data: BannerType[];
}) => {
  return (
    <div className="w-full px-[10%] ">
      {data && <CustomCarousel slides={data} />}
    </div>
  );
};

export default Carousels;
