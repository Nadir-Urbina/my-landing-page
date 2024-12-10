'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FallbackImageProps {
  src: string
  alt: string
  fallbackSrc: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
}

export function FallbackImage({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  fill,
  className,
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
} 