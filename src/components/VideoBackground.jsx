import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from '@/lib/utils';

export default function VideoBackground({ src, isHls = false, className, filter }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log('Auto-play prevented:', e));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log('Auto-play prevented:', e));
      });
    }
  }, [src, isHls]);

  return (
    <video
      ref={videoRef}
      className={cn("absolute inset-0 w-full h-full object-cover", className)}
      style={{ filter }}
      autoPlay
      loop
      muted
      playsInline
      {...(!isHls ? { src } : {})}
    />
  );
}
