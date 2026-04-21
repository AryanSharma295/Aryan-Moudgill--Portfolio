import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Map route pathnames to audio files placed in /public
const PAGE_TRACKS = {
  '/': '/music_home.mp3',
  '/expertise': '/music_expertise.mp3',
  '/projects': '/music_projects.mp3',
  '/work-with-me': '/music_contact.mp3',
};

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const location = useLocation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // user-controlled toggle
  const [userInteracted, setUserInteracted] = useState(false); // browsers block autoplay until interaction
  const [currentTrack, setCurrentTrack] = useState(null);

  // On first user interaction anywhere on the page, allow audio
  useEffect(() => {
    const onInteraction = () => setUserInteracted(true);
    window.addEventListener('click', onInteraction, { once: true });
    window.addEventListener('keydown', onInteraction, { once: true });
    return () => {
      window.removeEventListener('click', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };
  }, []);

  // Switch track when route changes
  useEffect(() => {
    const track = PAGE_TRACKS[location.pathname] || null;
    setCurrentTrack(track);
  }, [location.pathname]);

  // Sync audio element whenever track or mute state changes
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (!currentTrack) {
      audio.pause();
      audio.src = '';
      setIsPlaying(false);
      return;
    }

    audio.src = `${currentTrack}?v=${Date.now()}`;
    audio.loop = true;
    audio.volume = 0.5;
    audio.muted = isMuted;

    if (userInteracted && !isMuted) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentTrack, userInteracted]);

  // When mute toggle changes, apply without reloading src
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.muted = isMuted;
    if (!isMuted && currentTrack && userInteracted) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (isMuted) {
      setIsPlaying(false);
    }
  }, [isMuted]);

  const toggle = () => {
    setUserInteracted(true);
    setIsMuted((prev) => !prev);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, toggle, currentTrack }}>
      <audio ref={audioRef} />
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
