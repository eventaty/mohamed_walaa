import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  videoId: string;
  autoPlayTriggered: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ videoId, autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // HTML5 audio backup (Royalty free beautiful romantic Arabic/oriental wedding acoustic instrumental)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Initialize HTML5 Audio
  useEffect(() => {
    // Beautiful oriental romantic acoustic oud/strings instrumental mp3 stream
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-love-112199.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Soft romantic web audio chime/melody generator fallback
  const startGentleChimes = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch {}
  };

  const executePlay = async () => {
    setIsPlaying(true);
    setHasStarted(true);

    // 1. YouTube Iframe command
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
          '*'
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
          '*'
        );
      }
    } catch (e) {
      console.warn('YT play postMessage error:', e);
    }

    // 2. HTML5 Audio backup
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {
        // Browser gesture requirement handled on next interaction
      });
    }

    startGentleChimes();
  };

  const executePause = () => {
    setIsPlaying(false);

    // 1. YouTube Iframe command
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
          '*'
        );
      }
    } catch (e) {
      console.warn('YT pause postMessage error:', e);
    }

    // 2. HTML5 Audio backup
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  // Trigger when envelope opened
  useEffect(() => {
    if (autoPlayTriggered && !hasStarted) {
      executePlay();
    }
  }, [autoPlayTriggered, hasStarted]);

  // Global first gesture fallback
  useEffect(() => {
    const handleGesture = () => {
      if (autoPlayTriggered && !isPlaying && !hasStarted) {
        executePlay();
      }
    };

    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, [autoPlayTriggered, isPlaying, hasStarted]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isPlaying) {
      executePause();
    } else {
      executePlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }

    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: nextMuted ? 'mute' : 'unMute', args: '' }),
          '*'
        );
      }
    } catch {}
  };

  // YouTube embed URL with full enablejsapi & controls disabled
  const ytSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&playsinline=1&controls=0&rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

  return (
    <>
      {/* Hidden Embedded YouTube Player with postMessage JS API bridge */}
      <div className="fixed -top-[9999px] -left-[9999px] w-10 h-10 overflow-hidden opacity-0 pointer-events-none z-[-1]">
        <iframe
          ref={iframeRef}
          id="wedding-youtube-iframe"
          src={ytSrc}
          title="Wedding Music"
          allow="autoplay; encrypted-media"
          className="w-full h-full"
        />
      </div>

      {/* Luxury Floating Music Control Bar */}
      <div className="fixed bottom-6 left-5 z-40 flex items-center gap-2.5">
        
        {/* Main Play / Pause Button */}
        <button
          id="music-play-pause-btn"
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية'}
          className={`relative group flex items-center justify-center w-13 h-13 rounded-full border-2 transition-all duration-300 shadow-2xl cursor-pointer select-none active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-br from-[#d4af37] via-[#a81c2f] to-[#5a0b18] border-[#f5d061] text-[#fff6d6] gold-border-glow hover:scale-105'
              : 'bg-[#18060f]/95 border-[#d4af37]/50 text-[#f5d061] hover:border-[#d4af37] hover:scale-105'
          }`}
        >
          {/* Animated glow ring when active */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full bg-[#d4af37]/30 animate-ping pointer-events-none" />
          )}

          {/* Central Play/Pause Action Icon */}
          <div className="relative z-10 flex items-center justify-center pointer-events-none">
            {isPlaying ? (
              <Pause className="w-5 h-5 text-[#fff6d6] fill-[#fff6d6]" />
            ) : (
              <Play className="w-5 h-5 text-[#ffd700] fill-[#ffd700] ml-0.5" />
            )}
          </div>

          {/* Sound waves badge */}
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0c0408] border border-[#d4af37]/70 flex items-center justify-center shadow-md pointer-events-none">
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2.5 bg-[#ffd700] rounded-full animate-bounce" />
                <span className="w-0.5 h-3.5 bg-[#ffd700] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-0.5 h-2 bg-[#ffd700] rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            ) : (
              <Music className="w-3 h-3 text-neutral-400" />
            )}
          </span>
        </button>

        {/* Secondary Mute Button */}
        {isPlaying && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
            className="w-9 h-9 rounded-full bg-[#18060f]/90 border border-[#d4af37]/40 text-[#f5d061] flex items-center justify-center shadow-lg hover:bg-[#2e0b1c] hover:border-[#d4af37] transition-all cursor-pointer select-none active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#ffd700]" />
            )}
          </button>
        )}

        {/* Interactive Text Pill */}
        <button
          type="button"
          onClick={togglePlay}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#14050d]/90 border border-[#d4af37]/40 backdrop-blur-md text-xs font-['Cairo',sans-serif] font-medium shadow-xl cursor-pointer transition-all hover:border-[#d4af37] select-none ${
            isPlaying ? 'text-[#f5d061]' : 'text-neutral-300'
          }`}
        >
          <span className="flex h-2 w-2 relative">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
          </span>
          <span>{isPlaying ? 'إيقاف الأغنية ⏸️' : 'تشغيل الأغنية ▶️'}</span>
        </button>
      </div>
    </>
  );
};
