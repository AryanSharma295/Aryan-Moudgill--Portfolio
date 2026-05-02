import { useState, useEffect } from 'react';

const MIN_DISPLAY_MS = 2400;

// ── All assets that get preloaded during the splash ─────────────────────────

const PRELOAD_IMAGES = [
  '/optimized/hero-video.jpg',
  '/optimized/about-video.jpg',
  '/optimized/flow-blue.jpg',
  '/optimized/flow-green-final.jpg',
  '/optimized/flow-white.jpg',
  '/optimized/red_flow.jpg',
  '/favicon.png',
  '/logo-ryoon.jpg',
  '/logo-negi.jpg',
  '/logo-yuhaight.jpg',
  '/reel_thumb_1.jpg',
  '/reel_thumb_2.jpg',
  '/reel_thumb_3.jpg',
  '/strategic_post_thumb.jpg',
  '/meta_ad_1.jpeg',
  '/meta_ad_2.jpeg',
  '/icon-ai-brain.png',
  '/icon-camera.png',
  '/icon-reels.png',
  '/icon-typewriter.png',
];

const PRELOAD_AUDIO = [
  '/music_home.mp3',
  '/music_projects.mp3',
  '/music_expertise.mp3',
  '/music_contact.mp3',
];

const PRELOAD_VIDEOS = [
  '/optimized/hero-video.webm',
  '/optimized/about-video.webm',
  '/optimized/red_flow.webm',
  '/optimized/flow-blue.webm',
  '/optimized/flow-green-final.mp4',
  '/optimized/flow-white.webm',
];

/**
 * Orchestrates all "ready" milestones and exposes progress (0–1).
 */
export function useAppReady() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const milestones = { timer: false, fonts: false, images: false, audio: false, videos: false };
    const weights    = { timer: 0.20, fonts: 0.10, images: 0.25, audio: 0.15, videos: 0.30 };

    function tick() {
      if (cancelled) return;
      const total = Object.keys(milestones).reduce(
        (sum, k) => sum + (milestones[k] ? weights[k] : 0),
        0
      );
      setProgress(Math.min(total, 1));
      if (total >= 0.99) { // Using 0.99 to avoid float precision issues
        setTimeout(() => { if (!cancelled) setIsReady(true); }, 500);
      }
    }

    // 1. Minimum Timer
    const timer = setTimeout(() => { milestones.timer = true; tick(); }, MIN_DISPLAY_MS);

    // 2. Fonts
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      milestones.fonts = true;
      tick();
    });

    // 3. Images
    let imagesLeft = PRELOAD_IMAGES.length;
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      const done = () => { if (--imagesLeft === 0) { milestones.images = true; tick(); } };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });

    // 4. Audio - Fetch into cache
    let audioLeft = PRELOAD_AUDIO.length;
    PRELOAD_AUDIO.forEach((src) => {
      fetch(src, { cache: 'force-cache' })
        .catch(() => {})
        .finally(() => { if (--audioLeft === 0) { milestones.audio = true; tick(); } });
    });

    // 5. Videos - Fetch into cache (More reliable than hidden video elements)
    // We fetch the .webm files. Browsers will then serve these from disk 
    // when the <video> tag requests them.
    let videosLeft = PRELOAD_VIDEOS.length;
    PRELOAD_VIDEOS.forEach((src) => {
      fetch(src, { cache: 'force-cache' })
        .catch(() => {})
        .finally(() => { if (--videosLeft === 0) { milestones.videos = true; tick(); } });
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return { isReady, progress };
}
