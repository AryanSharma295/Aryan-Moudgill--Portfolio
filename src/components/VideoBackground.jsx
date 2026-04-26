import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

let hlsModulePromise;
async function loadHls() {
  if (!hlsModulePromise) hlsModulePromise = import('hls.js');
  return hlsModulePromise;
}

function shouldPrefetchHeavy() {
  if (typeof navigator === 'undefined') return false;
  const conn = navigator.connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  const et = conn.effectiveType;
  return et ? et === '4g' : true;
}

export default function VideoBackground({
  src,
  sources,
  isHls = false,
  className,
  filter,
  poster,
  rootMargin = '1000px',
}) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const canAutoplay = useMemo(() => {
    if (typeof window === 'undefined') return true;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    return !reduceMotion;
  }, []);

  // Prefetch the HLS runtime on idle (good connections only).
  useEffect(() => {
    if (!isHls) return;
    if (!shouldPrefetchHeavy()) return;

    const prefetch = () => {
      loadHls().catch(() => {});
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(prefetch, { timeout: 1500 });
      return () => cancelIdleCallback(id);
    }

    const t = setTimeout(prefetch, 750);
    return () => clearTimeout(t);
  }, [isHls]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = !!entry?.isIntersecting;

        if (inView) {
          setShouldLoad(true);
          if (canAutoplay) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [canAutoplay, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldLoad) return;

    const pickSource = () => {
      const list = Array.isArray(sources) ? sources : null;
      if (!list?.length) return src;

      for (const s of list) {
        if (!s?.src) continue;
        if (!s.type) return s.src;
        if (video.canPlayType(s.type)) return s.src;
      }
      return list[0].src;
    };

    let onLoadedMetadata;
    let cancelled = false;

    (async () => {
      if (isHls) {
        // HLS via hls.js (most browsers) or native (Safari).
        // Native HLS
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          onLoadedMetadata = () => {
            if (cancelled) return;
            if (canAutoplay) video.play().catch(() => {});
          };
          video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
          return;
        }

        const mod = await loadHls();
        if (cancelled) return;
        const Hls = mod.default;
        if (!Hls?.isSupported?.()) return;

        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (canAutoplay) video.play().catch(() => {});
        });
        return;
      }

      // Regular MP4
      video.src = pickSource();
    })();

    return () => {
      cancelled = true;
      if (onLoadedMetadata) video.removeEventListener('loadedmetadata', onLoadedMetadata);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, sources, isHls, shouldLoad, canAutoplay]);

  return (
    <div className={cn('absolute inset-0', className)} style={{ filter }}>
      {/* Placeholder while buffering/loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: poster
              ? `url(${poster})`
              : 'radial-gradient(circle at 30% 20%, rgba(251,191,36,0.10), transparent 55%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.06), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.9))',
            backgroundSize: poster ? 'cover' : 'auto',
            backgroundPosition: 'center',
          }}
        />
      )}

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="none"
        onLoadedData={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />
    </div>
  );
}
