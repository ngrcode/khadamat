import React from 'react'
import Image from 'next/image'
import { useFixBaseUrl } from '@/hook/useFixBaseUrl/useConcatUrl'

interface ImageType {
  src?: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  placeholder?: any 
  localSrc?: string
  style?: React.CSSProperties
  quality?: number
}

export const ClubImage: React.FC<ImageType> = ({
  src,
  alt,
  fill = false, // Default to false for non-fill behavior
  width,
  height,
  className,
  sizes,
  placeholder,
  localSrc,
  quality = 75,
  style,
}) => {
  const fixedUrl = src ? useFixBaseUrl(src) : undefined 
  const url = localSrc || fixedUrl

  return (
    <Image
      src={url as string}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width} 
      height={fill ? undefined : height}
      className={className}
      sizes={sizes}
      placeholder={placeholder}
      style={style}
      quality={quality}
    />
  )
}
