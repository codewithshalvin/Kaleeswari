import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

const AUTOPLAY_MS = 5000;

/* ─────────────────────────────────────────────
   INDUSTRIAL & REFINERY SVG ICON COMPONENTS
───────────────────────────────────────────── */

const RefineryTowerSVG = ({ size = 65, color = '#F97316', accentColor = '#EF4444' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Distillation Column Body */}
    <rect x="35" y="25" width="30" height="65" rx="5" fill="#1C1917" stroke={color} strokeWidth="2.5" />
    <line x1="35" y1="40" x2="65" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="35" y1="55" x2="65" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="35" y1="70" x2="65" y2="70" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    {/* Top Flare Stack */}
    <rect x="45" y="12" width="10" height="13" fill="#292524" stroke={color} strokeWidth="1.5" />
    {/* Flaring Flame */}
    <motion.path
      d="M50 0 C44 5 42 10 50 14 C58 10 56 5 50 0 Z"
      fill={accentColor}
      animate={{ scale: [0.9, 1.2, 0.9], y: [-1, 1, -1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Pipe connections */}
    <path d="M20 50 L35 50 M65 50 L80 50 M20 75 L35 75 M65 75 L80 75" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const GearIndustrialSVG = ({ size = 60, color = '#F97316' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx="50" cy="50" r="22" fill="#1C1917" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="50" r="10" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <rect
        key={i}
        x="45"
        y="6"
        width="10"
        height="18"
        rx="3"
        fill={color}
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
  </motion.svg>
);

const StorageTankSVG = ({ size = 65, color = '#F97316' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Main Cylindrical Tank */}
    <rect x="20" y="35" width="60" height="50" rx="4" fill="#292524" stroke={color} strokeWidth="2.5" />
    {/* Dome Roof */}
    <path d="M20 35 C20 18 80 18 80 35 Z" fill="#44403C" stroke={color} strokeWidth="2.5" />
    {/* Level Indicator line */}
    <rect x="25" y="45" width="50" height="30" fill={color} opacity="0.25" />
    <line x1="20" y1="60" x2="80" y2="60" stroke={color} strokeWidth="2" />
    {/* Ladder */}
    <line x1="72" y1="28" x2="72" y2="85" stroke="#78716C" strokeWidth="2" />
    {[35, 45, 55, 65, 75].map((y, i) => (
      <line key={i} x1="72" y1={y} x2="78" y2={y} stroke="#78716C" strokeWidth="1.5" />
    ))}
  </svg>
);

const OilDropSVG = ({ size = 50, color = '#F97316' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <motion.path
      d="M50 10 C50 10 20 50 20 70 C20 86.5 33.5 100 50 100 C66.5 100 80 86.5 80 70 C80 50 50 10 50 10 Z"
      fill={color}
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <ellipse cx="40" cy="65" rx="8" ry="16" fill="#FFFFFF" opacity="0.3" transform="rotate(-25 40 65)" />
  </svg>
);

const HardHatSVG = ({ size = 55, color = '#F97316' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Cap Dome */}
    <path d="M20 55 C20 28 80 28 80 55 Z" fill={color} stroke="#78716C" strokeWidth="2" />
    {/* Cap Brim */}
    <path d="M10 55 L90 55 C92 55 94 57 94 60 C94 62 92 64 90 64 L10 64 C8 64 6 62 6 60 C6 57 8 55 10 55 Z" fill="#EA580C" stroke="#78716C" strokeWidth="1.5" />
    {/* Center Ridge */}
    <path d="M46 30 C46 30 50 25 54 30 L54 55 L46 55 Z" fill="#FFEDD5" />
  </svg>
);

/* ─────────────────────────────────────────────
   SIDE FLOATING COLUMNS (Popping animation)
───────────────────────────────────────────── */

const sideIconsLeft = [
  { Component: RefineryTowerSVG, delay: 0, scale: 1 },
  { Component: GearIndustrialSVG, delay: 0.8, scale: 1.1 },
  { Component: StorageTankSVG, delay: 1.5, scale: 0.95 },
  { Component: OilDropSVG, delay: 0.4, scale: 1.05 },
  { Component: HardHatSVG, delay: 2.1, scale: 1 },
];

const sideIconsRight = [
  { Component: HardHatSVG, delay: 0.3, scale: 1.05 },
  { Component: StorageTankSVG, delay: 1.1, scale: 1 },
  { Component: GearIndustrialSVG, delay: 0.6, scale: 1.1 },
  { Component: RefineryTowerSVG, delay: 1.8, scale: 0.95 },
  { Component: OilDropSVG, delay: 2.4, scale: 1.05 },
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
          opacity: [0.4, 1, 0.7, 1],
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
          background: 'rgba(28, 25, 23, 0.85)',
          border: '1px solid rgba(249, 115, 22, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(249, 115, 22, 0.2)',
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
  <div className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 py-2 overflow-hidden shadow-lg border-y border-orange-400/40">
    <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
      {[...Array(3)].map((_, i) => (
        <span key={i} className="inline-flex items-center gap-6 text-[13px] font-bold text-black px-8 tracking-wider uppercase">
          <span>🏭 Kaleesuwari Refinery Pvt. Ltd.</span>
          <span>⚡ Industrial Excellence & Safety First</span>
          <span>🛢️ Powering Energy for Tomorrow</span>
          <span>⚙️ Precision · Innovation · Safety</span>
          <span>🔥 World-Class Refining Standards</span>
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN INDUSTRIAL REFINERY THEME COMPONENT
───────────────────────────────────────────── */
const IndustrialRefinery = ({ theme, media }) => {
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
    <div className="min-h-screen relative overflow-hidden bg-[#1C1917] text-white font-sans flex flex-col justify-between">
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
        <div className="relative rounded-2xl overflow-hidden shadow-2xl text-center px-6 py-4 bg-black/80 backdrop-blur-md border border-orange-500/40">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-orange-500" />
            <span className="text-orange-400 font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5">
              <span>🏭</span> Industrial Refinery <span>⚡</span>
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-orange-500" />
          </div>
          <motion.p
            key={theme?.quote || 'default'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-semibold text-base sm:text-lg italic"
          >
            ❝ {theme?.quote || "Refining energy, building strength, powering progress."} ❞
          </motion.p>
        </div>
      </header>

      {/* Ticker Bar */}
      <div className="my-3 z-20">
        <Ticker />
      </div>

      {/* Main Fullscreen Media Container */}
      <main
        className="flex-1 flex flex-col items-center justify-center z-10 px-4 pb-6 w-full max-w-5xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {media.length === 0 ? (
          <div className="text-center p-10 bg-black/60 rounded-3xl border border-orange-500/30">
            <span className="text-5xl block mb-3">🏭</span>
            <h2 className="text-xl font-bold text-orange-400">No Photos or Videos Uploaded</h2>
            <p className="text-xs text-gray-400 mt-1">Upload media for Industrial Refinery in the admin dashboard.</p>
          </div>
        ) : (
          <div className="relative w-full rounded-3xl overflow-hidden border-2 border-orange-500/40 shadow-[0_0_60px_rgba(249,115,22,0.25)] bg-black h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.02 }}
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
                    alt={currentItem?.title || currentItem?.caption || 'Refinery Media'}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Caption overlay */}
                {(currentItem?.title || currentItem?.caption || currentItem?.description) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white z-10">
                    <h3 className="text-xl font-bold">{currentItem.title || currentItem.caption}</h3>
                    {currentItem.description && <p className="text-xs text-gray-300 mt-1">{currentItem.description}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slide counter */}
            <div className="absolute top-4 left-4 z-30 bg-orange-500/90 text-black font-extrabold text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {media.length}
            </div>

            {/* Prev / Next buttons */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 hover:text-black text-white text-lg font-bold flex items-center justify-center transition border border-orange-500/40 z-30"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 hover:text-black text-white text-lg font-bold flex items-center justify-center transition border border-orange-500/40 z-30"
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

export default IndustrialRefinery;
