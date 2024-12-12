'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface FallbackImageProps extends Omit<ImageProps, 'src'> {
  src: string | undefined;
  fallbackSrc: string;
}

export function FallbackImage({ src, fallbackSrc, alt, ...props }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
} 