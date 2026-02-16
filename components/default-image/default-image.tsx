'use client';

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface DefaultImageProps extends ImageProps {
    src: string;
    alt: string;
    className?: string;
}

/**
 * Image with placeholder in case of error.
 */
export function DefaultImage({ src, alt, className, ...props }: DefaultImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
  
    return (
      <Image
        src={imgSrc}
        className={className}
        alt={alt}
        onError={() => setImgSrc('/image-placeholder.svg')}
        {...props}
      />
    );
  }
