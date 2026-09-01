"use client"
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/autoplay'
import Image from 'next/image'
import { useAxiosQuery } from '@/hook/useAxsios/useAxiosQuery'
import Link from 'next/link'
import styles from './carousel.module.css'

interface SlideItem {
  FileURL: string
  Link?: string
  Title?: string
}

const CarouselParall: React.FC = () => {
  const [slides, setSlides] = useState<SlideItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading, isError } = useAxiosQuery({
    url: '/v1/Banner/GetAllActiveAsync',
    queryKey: ['GET_ACTIVE_ASYNC'],
  })

  useEffect(() => {
    if (data && !isError) {
      setSlides(data.Body || [])
      setIsInitialized(true)
    }
  }, [data, isError])

  if (isLoading) {
    return <div>Loading slides...</div>
  }

  if (isError) {
    return <div>Error loading slides</div>
  }

  return (
    <>
      {isInitialized && slides.length > 0 ? (
        <div className={styles.carouselContainer}>
          <Swiper
            slidesPerView={2} // تعداد اسلایدهایی که نمایش داده می‌شوند
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={50} // فاصله بین اسلایدها
            effect="coverflow"
            coverflowEffect={{
              rotate: 0, // چرخش اسلایدها
              stretch: 0, // فاصله کشیده شدن اسلایدها
              depth: 300, // عمق اسلایدها
              modifier: 1,
              slideShadows: false, // حذف سایه‌ها از اسلایدها
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, EffectCoverflow, Autoplay]}
          >
            {slides.map((item, index) => {
              const slideLink = item.Link && item.Link !== "null" ? item.Link : "#";

              return (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <Link href={slideLink}>
                  <Image
                      src={`${process.env.BASE_IMG}${item.FileURL}`}
                      alt={item.Title || 'Carousel Slide'}
                      layout="responsive"
                      width={900}
                      height={500}
                      objectFit="cover"
                      priority
                      style={{
                        minHeight: '300px',
                        maxHeight: '500px',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                      className={styles.circularImage}
                    />
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      ) : (
        <div>No slides to display</div>
      )}
    </>
  )
}

export default CarouselParall
