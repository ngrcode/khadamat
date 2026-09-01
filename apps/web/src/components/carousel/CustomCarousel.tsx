import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import './carousel.css'
import { BannerType } from '@/type/carousel/carousel'
import { ClubImage } from '../image/image'
import { cn } from '@/lib/talwindeMergeCn'

function CustomCarousel({ slides }: { slides: BannerType[] }) {
  const [current, setCurrent] = useState<number>(0)
  const [prev, setPrev] = useState<number>(0)
  const [next, setNext] = useState<number>(0)

  useEffect(() => {
    if (slides.length > 0) {
      setInterval(
        () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1)),
        3000,
      )
    }
  }, [slides.length])

  useEffect(() => {
    setPrev(() => (current === 0 ? slides.length - 1 : current - 1))
    setNext(() => (current === slides.length - 1 ? 0 : current + 1))
  }, [current, slides.length])

  return slides?.length > 0 ? (
    <div className="pt-4">
      <div className={cn("w-full  gap-8  h-64 py-8  relative")}>
        {slides?.map((item, index) => (
          <Link key={index} href={item.Link ? item.Link : '#'}>
            <ClubImage
              src={item.FileURL}
              alt={item.Title}
              width={1000}
              height={200}
              key={index}
              className={cn(`${index === current
                ? ' current absolute opacity-100 transition-all duration-800  rounded-xl '
                : 'opacity-0 '
                }  ${slides.length > 1 && index === prev
                  ? 'absolute prev flex opacity-100 scale-80 rounded-xl transition-all duration-800'
                  : slides.length > 1 &&
                  index === next &&
                  'absolute next opacity-100 scale-80 rounded-xl transition-all duration-800'
                }
              ${slides.length === 1 && '!w-full !left-0'} `)}
            />
          </Link>
        ))}
      </div>
      <div className={cn("absolute botom-4 right-0 left-0 flex justify-center gap-4")}>
        {slides?.map((_, index) => (
          <button
            onClick={() => setCurrent(index)}
            key={index}
            className={cn(`w-2 h-2 rounded-full border-white border ${current === index ? 'bg-white' : 'border-2'
              } `)}
          ></button>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default CustomCarousel
