// components/DynamicSwiper.js
import React from 'react';
import dynamic from 'next/dynamic';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then((mod) => mod.SwiperSlide), { ssr: false });

const DynamicSwiperComponent = ({ children, ...props }) => {
  return <Swiper {...props}>{children}</Swiper>;
};

DynamicSwiperComponent.SwiperSlide = SwiperSlide;

export default DynamicSwiperComponent;
