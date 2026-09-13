import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

const AUTOPLAY_MS = 5000;

/* ─────────────────────────────────────────────
   MODERN & MINIMAL SVG ICON COMPONENTS
───────────────────────────────────────────── */

const ModernCubeSVG = ({ size = 60, color = '#1D4ED8', strokeColor = '#60A5FA' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
  >
    {/* Outer Isometric Cube */}
    <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke={strokeColor} strokeWidth="2.5" fill="none" />
    <path d="M50 10 L50 50 L85 30 M50 50 L15 30 M50 50 L50 90" stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="6" fill={strokeColor} />
  </motion.svg>
);

const MinimalPulseSVG = ({ size = 55, color = '#2563EB' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="2" strokeDasharray="6 3" />
    <motion.circle
      cx="50"
      cy="50"
      r="25"
      stroke={color}
      strokeWidth="2.5"
      animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <circle cx="50" cy="50" r="8" fill={color} />
  </svg>
);

const ArchitecturalNodesSVG = ({ size = 65, color = '#1D4ED8' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <line x1="20" y1="20" x2="80" y2="20" stroke={color} strokeWidth="2" />
    <line x1="80" y1="20" x2="80" y2="80" stroke={color} strokeWidth="2" />
    <line x1="80" y1="80" x2="20" y2="80" stroke={color} strokeWidth="2" />
    <line x1="20" y1="80" x2="20" y2="20" stroke={color} strokeWidth="2" />
    <line x1="20" y1="20" x2="80" y2="80" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="20" cy="20" r="5" fill={color} />
    <circle cx="80" cy="20" r="5" fill={color} />
    <circle cx="80" cy="80" r="5" fill={color} />
    <circle cx="20" cy="80" r="5" fill={color} />
    <circle cx="50" cy="50" r="6" fill="#60A5FA" />
  </svg>
);

const ModernDiamondSVG = ({ size = 50, color = '#3B82F6' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <motion.path
      d="M50 5 L95 50 L50 95 L5 50 Z"
      stroke={color}
      strokeWidth="3"
      fill="none"
      animate={{ scale: [0.9, 1.05, 0.9] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill={color} opacity="0.15" />
  </svg>
);

/* ─────────────────────────────────────────────
   SIDE FLOATING COLUMNS (Popping animation)
───────────────────────────────────────────── */

const sideIconsLeft = [
  { Component: ModernCubeSVG, delay: 0, scale: 1 },
  { Component: MinimalPulseSVG, delay: 0.8, scale: 1.1 },
  { Component: ArchitecturalNodesSVG, delay: 1.5, scale: 0.95 },
  { Component: ModernDiamondSVG, delay: 0.4, scale: 1.05 },
  { Component: ModernCubeSVG, delay: 2.1, scale: 1 },
];

const sideIconsRight = [
  { Component: ModernDiamondSVG, delay: 0.3, scale: 1.05 },
  { Component: ArchitecturalNodesSVG, delay: 1.1, scale: 1 },
  { Component: MinimalPulseSVG, delay: 0.6, scale: 1.1 },
  { Component: ModernCubeSVG, delay: 1.8, scale: 0.95 },
  { Component: ModernDiamondSVG, delay: 2.4, scale: 1.05 },
];

const SideColumn = ({ icons, position }) => (
  <div
    className={`fixed top-0 bottom-0 ${position === 'left' ? 'left-2 sm:left-4 lg:left-6' : 'right-2 sm:right-4 lg:right-6'} 
                w-16 sm:w-20 lg:w-24 z-20 pointer-events-none hidden md:flex flex-col justify-around items-center py-10`}
  >
    {icons.map(({ Component, delay, scale }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0, y: 30 }}
        animate={{
          opacity: [0.5, 1, 0.7, 1],
          scale: [scale * 0.85, scale * 1.1, scale],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4 + (i % 3),
          repeat: Infinity,
          repeatType: 'mirror',
          delay,
          ease: 'easeInOut',
        }}
        className="p-2 rounded-2xl backdrop-blur-md shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid rgba(96, 165, 250, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(37, 99, 235, 0.15)',
        }}
      >
        <Component size={44} />
      </motion.div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   SCROLLING TICKER
───────────────────────────────────────────── */
const Ticker = () => (
  <div className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 py-2 overflow-hidden shadow-lg border-y border-blue-400/30">
    <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
      {[...Array(3)].map((_, i) => (
        <span key={i} className="inline-flex items-center gap-6 text-[13px] font-bold text-white px-8 tracking-widest uppercase">
          <span>🔹 Modern Minimal</span>
          <span>💎 Elegance in Every Detail</span>
          <span>📐 Precision · Innovation · Clarity</span>
          <span>✨ Pure Aesthetics & Architectural Design</span>
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN MODERN MINIMAL THEME COMPONENT
───────────────────────────────────────────── */
const ModernMinimal = ({ theme, media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (media.length ? (prev + 1) % media.length : 0));
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (media.length ? (prev - 1 + media.length) % media.length : 0));
  }, [media.length]);

  useEffect(() => {
    if (paused || media.length <= 1) return;
    const interval = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [paused, nextSlide, media.length, currentIndex]);

  const currentItem = media[currentIndex];
  const fileId = currentItem?.gridFsFileId || currentItem?._id;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F5F9FF] text-[#0F2A4A] font-sans flex flex-col justify-between">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>

      {/* Side Popping SVG Columns */}
      <SideColumn icons={sideIconsLeft} position="left" />
      <SideColumn icons={sideIconsRight} position="right" />

      {/* Header with Quote */}
      <header className="z-20 relative max-w-4xl mx-auto w-full pt-4 px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-sm text-center px-6 py-4 bg-white/90 backdrop-blur-md border border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#1D4ED8]" />
            <span className="text-[#1D4ED8] font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5">
              <span>🔹</span> Modern Minimal <span>🔹</span>
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#1D4ED8]" />
          </div>
          <motion.p
            key={theme?.quote || 'default'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#0F2A4A] font-semibold text-base sm:text-lg italic"
          >
            ❝ {theme?.quote || "Simplicity is the ultimate sophistication."} ❞
          </motion.p>
        </div>
      </header>

      {/* Ticker Bar */}
      <div className="my-3 z-20">
        <Ticker />
      </div>

      {/* Main Slideshow Frame */}
      <main
        className="flex-1 flex flex-col items-center justify-center z-10 px-4 pb-6 w-full max-w-5xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {media.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-3xl border border-blue-200 shadow-md">
            <span className="text-5xl block mb-3">📐</span>
            <h2 className="text-xl font-bold text-[#1D4ED8]">No Media Uploaded</h2>
            <p className="text-xs text-gray-400 mt-1">Upload media for Modern Minimal in the admin dashboard.</p>
          </div>
        ) : (
          <div className="relative w-full rounded-3xl overflow-hidden border border-blue-200 shadow-xl bg-slate-950 h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
              >
                {currentItem?.fileType === 'video' ? (
                  <video
                    ref={videoRef}
                    src={`${API_BASE_URL}/api/media/stream/${fileId}`}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                  />
                ) : (
                  <img
                    src={`${API_BASE_URL}/api/media/stream/${fileId}`}
                    alt={currentItem?.title || currentItem?.caption || 'Modern Media'}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Caption overlay */}
                {(currentItem?.title || currentItem?.caption || currentItem?.description) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white z-10">
                    <h3 className="text-xl font-bold">{currentItem.title || currentItem.caption}</h3>
                    {currentItem.description && <p className="text-xs text-gray-300 mt-1">{currentItem.description}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-30 bg-[#1D4ED8] text-white font-bold text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {media.length}
            </div>

            {/* Prev / Next buttons */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1D4ED8] text-lg font-bold flex items-center justify-center transition shadow-md z-30"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1D4ED8] text-lg font-bold flex items-center justify-center transition shadow-md z-30"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ModernMinimal;