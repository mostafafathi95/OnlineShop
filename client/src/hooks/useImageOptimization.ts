import { useEffect, useRef } from 'react';

export function useImageOptimization(src: string | undefined) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src || !imgRef.current) return;
    if ('loading' in imgRef.current) imgRef.current.loading = 'lazy';
    const img = new Image();
    img.src = src;
  }, [src]);

  return imgRef;
}
