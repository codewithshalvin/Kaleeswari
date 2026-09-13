import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

const AUTOPLAY_MS = 4000;

/* ─────────────────────────────────────────────
   FESTIVE CELEBRATION SVG COMPONENTS (Kolam, Vilakku, Dance)
───────────────────────────────────────────── */

// 1. Traditional Kolam / Rangoli Motif
const KolamSVG = ({ size = 65, color = '#D4AF37', strokeColor = '#B91C1C' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
  >
    {/* Outer dash ring */}
    <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
    {/* Petal pattern */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        <path d="M50 50 C40 25 50 10 50 10 C50 10 60 25 50 50" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
        <circle cx="50" cy="12" r="3" fill={strokeColor} />
      </g>
    ))}
    {/* Inner flower */}
    <circle cx="50" cy="50" r="14" fill={strokeColor} stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="6" fill={color} />
  </motion.svg>
);

// 2. Traditional Vilakku / Diya Lamp with flickering flame
const VilakkuSVG = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Flame flickering animation */}
    <motion.path
      d="M50 5 C45 20 40 28 50 42 C60 28 55 20 50 5 Z"
      fill="#F59E0B"
      animate={{ scale: [0.95, 1.12, 0.95], y: [-2, 2, -2] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M50 15 C47 24 45 28 50 38 C55 28 53 24 50 15 Z"
      fill="#EF4444"
      animate={{ scale: [0.9, 1.05, 0.9] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
    />
    <circle cx="50" cy="28" r="4" fill="#FEF08A" />
    {/* Oil Lamp Bowl */}
    <path d="M20 45 C20 70 80 70 80 45 L70 45 C70 60 30 60 30 45 Z" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2.5" />
    {/* Lamp Spout */}
    <path d="M15 45 C25 40 35 45 50 45 C65 45 75 40 85 45 L80 50 C70 48 30 48 20 50 Z" fill="#F59E0B" stroke="#B91C1C" strokeWidth="1.5" />
    {/* Pedestal Base */}
    <path d="M42 62 L40 82 L30 88 L70 88 L60 82 L58 62 Z" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2" />
    <rect x="25" y="88" width="50" height="7" rx="3" fill="#B91C1C" />
  </svg>
);

// 3. Vilakku Dance / Classical Dancer Silhouette holding lit lamps
const VilakkuDanceSVG = ({ size = 65 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Dancer crown/bun */}
    <circle cx="50" cy="14" r="5" fill="#D4AF37" />
    <circle cx="50" cy="22" r="8" fill="#B91C1C" stroke="#D4AF37" strokeWidth="1.5" />
    {/* Arms holding lit lamps */}
    <path d="M50 35 Q25 25 18 32" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M50 35 Q75 25 82 32" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Small lit lamps in hands */}
    <motion.path
      d="M18 24 C16 28 14 30 18 34 C22 30 20 28 18 24 Z"
      fill="#F59E0B"
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <motion.path
      d="M82 24 C80 28 78 30 82 34 C86 30 84 28 82 24 Z"
      fill="#F59E0B"
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
    />
    {/* Torso & Saree drape */}
    <path d="M50 30 L40 52 L60 52 Z" fill="#B91C1C" stroke="#D4AF37" strokeWidth="1.5" />
    {/* Dance Skirt / Pleats */}
    <path d="M40 52 L20 85 C35 92 65 92 80 85 L60 52 Z" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2" />
    <path d="M50 52 L50 89" stroke="#B91C1C" strokeWidth="2" />
    <path d="M40 52 L35 87" stroke="#B91C1C" strokeWidth="1.5" />
    <path d="M60 52 L65 87" stroke="#B91C1C" strokeWidth="1.5" />
  </svg>
);

/* ─────────────────────────────────────────────
   SIDE FLOATING ANIMATION COLUMNS
───────────────────────────────────────────── */

const sideIconsLeft = [
  { Component: KolamSVG, delay: 0, scale: 1 },
  { Component: VilakkuSVG, delay: 0.8, scale: 1.05 },
  { Component: VilakkuDanceSVG, delay: 1.5, scale: 1.1 },
  { Component: KolamSVG, delay: 2.2, scale: 0.95 },
  { Component: VilakkuSVG, delay: 1.2, scale: 1 },
];

const sideIconsRight = [
  { Component: VilakkuDanceSVG, delay: 0.3, scale: 1.1 },
  { Component: KolamSVG, delay: 1.1, scale: 1 },
  { Component: VilakkuSVG, delay: 0.6, scale: 1.05 },
  { Component: VilakkuDanceSVG, delay: 1.8, scale: 0.95 },
  { Component: KolamSVG, delay: 2.5, scale: 1.05 },
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
          opacity: [0.5, 1, 0.8, 1],
          scale: [scale * 0.85, scale * 1.1, scale],
          y: [0, -14, 0],
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
          background: 'rgba(255, 255, 255, 0.75)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          boxShadow: '0 8px 30px 0 rgba(185, 28, 28, 0.15)',
        }}
      >
        <Component size={46} />
      </motion.div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN FESTIVE CELEBRATION THEME COMPONENT
───────────────────────────────────────────── */
const FestiveCelebration = ({ theme, media }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const progressRef = useRef(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (media.length ? (prev + 1) % media.length : 0));
  }, [media.length]);

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (media.length ? (prev - 1 + media.length) % media.length : 0));
  };

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Automatic slide effect
  useEffect(() => {
    if (paused || media.length <= 1) return;
    const id = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, nextSlide, media.length, index]);

  const colors = {
    primary: theme?.colorPalette?.primary || '#B91C1C',
    secondary: theme?.colorPalette?.secondary || '#D4AF37',
    accent: theme?.colorPalette?.accent || '#F59E0B',
    background: theme?.colorPalette?.background || '#FFFDF7',
  };

  const currentMedia = media[index];
  const streamId = currentMedia?.gridFsFileId || currentMedia?._id;

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? 25 : -25,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 25 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.5 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? -25 : 25,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 25 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col justify-between py-6 px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, #FFF6E5 50%, #FFFDF7 100%)`,
        fontFamily: theme?.fontFamily,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Side Popping SVG Columns (Kolam, Vilakku, Vilakku Dance) */}
      <SideColumn icons={sideIconsLeft} position="left" />
      <SideColumn icons={sideIconsRight} position="right" />

      {/* Ambient gold sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 30%, rgba(212,175,55,0.15) 45%, transparent 60%)',
        }}
        animate={{ backgroundPositionX: ['-100%', '200%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Falling confetti (SVG shapes) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => {
          const shapes = ['rect', 'circle', 'triangle'];
          const shape = shapes[i % shapes.length];
          const palette = [colors.primary, colors.secondary, colors.accent, '#ffffff'];
          const color = palette[i % palette.length];
          const size = 6 + Math.random() * 8;
          const left = Math.random() * 100;
          const duration = 5 + Math.random() * 6;
          const delay = Math.random() * 5;

          return (
            <motion.svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 10 10"
              className="absolute"
              style={{ left: `${left}%`, top: '-5%' }}
              initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
              animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            >
              {shape === 'rect' && <rect width="10" height="10" rx="2" fill={color} />}
              {shape === 'circle' && <circle cx="5" cy="5" r="5" fill={color} />}
              {shape === 'triangle' && <polygon points="5,0 10,10 0,10" fill={color} />}
            </motion.svg>
          );
        })}
      </div>

      {/* Twinkling sparkle stars */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {[...Array(16)].map((_, i) => (
          <motion.svg
            key={`spark-${i}`}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <path
              d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
              fill={colors.secondary}
            />
          </motion.svg>
        ))}
      </div>

      {/* Festive Header / Quote Banner */}
      <header className="z-20 relative max-w-4xl mx-auto w-full mb-4">
        {theme?.quote ? (
          <div className="relative rounded-2xl overflow-hidden shadow-lg text-center px-6 py-4 bg-white/90 backdrop-blur-md border-2 border-amber-300">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B91C1C]" />
              <span className="text-[#B91C1C] font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5">
                <span>🪔</span> Festive Celebration <span>🪔</span>
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B91C1C]" />
            </div>
            <motion.p
              key={theme.quote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#B91C1C] font-bold text-base sm:text-lg italic"
            >
              ❝ {theme.quote} ❞
            </motion.p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-orange-100/50">
            <div className="flex items-center gap-3">
              <img src="/assets/kalees.jpg" alt="Kaleesuwari" className="h-10 object-contain" />
              <div className="border-l border-gray-200 pl-3">
                <h2 className="text-sm font-bold text-gray-900 leading-tight">Kaleesuwari Refinery</h2>
                <p className="text-[10px] text-[#B91C1C] font-medium">Festive Celebration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-red-50 text-[#B91C1C] rounded-full border border-red-100">
                🎉 Festivities
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Main Slideshow Box */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-6xl mx-auto">
        {media.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold p-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-red-100 text-center"
            style={{ color: colors.primary }}
          >
            <span className="text-5xl block mb-3">✨</span>
            No photos yet — check back soon!
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full rounded-3xl p-4 sm:p-6 lg:p-8"
            style={{
              background: 'white',
              boxShadow: `0 25px 70px -15px ${colors.primary}44`,
            }}
          >
            {/* Animated gold border glow */}
            <motion.div
              className="absolute -inset-[4px] rounded-3xl -z-10"
              style={{
                background: `linear-gradient(120deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
                backgroundSize: '300% 300%',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Corner ribbon SVG */}
            <svg
              className="absolute -top-4 -left-4 w-16 h-16 z-30 drop-shadow-lg"
              viewBox="0 0 64 64"
            >
              <motion.path
                d="M0 0 L32 0 L0 32 Z"
                fill={colors.primary}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              />
              <motion.circle
                cx="12"
                cy="12"
                r="4"
                fill={colors.secondary}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>

            {/* ENLARGED IMAGE CONTAINER */}
            <div className="relative h-[480px] sm:h-[580px] lg:h-[680px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-inner">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full flex items-center justify-center p-2"
                >
                  {/* Ambient background blur for seamless box fitting */}
                  {currentMedia?.fileType !== 'video' && (
                    <img
                      src={`${API_BASE_URL}/api/media/stream/${streamId}`}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none select-none"
                    />
                  )}

                  {currentMedia?.fileType === 'video' ? (
                    <video
                      src={`${API_BASE_URL}/api/media/stream/${streamId}`}
                      className="w-full h-full object-cover rounded-xl shadow-2xl"
                      autoPlay
                      controls
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={`${API_BASE_URL}/api/media/stream/${streamId}`}
                      className="w-full h-full object-cover rounded-xl shadow-2xl"
                      alt={currentMedia?.title || currentMedia?.caption || 'Festive Media'}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Automatic slide progress bar */}
              {!paused && media.length > 1 && (
                <motion.div
                  key={`progress-${index}`}
                  ref={progressRef}
                  className="absolute bottom-0 left-0 h-1.5 z-30"
                  style={{
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}

              {/* Pause status indicator */}
              {paused && (
                <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                  <span>⏸ Paused</span>
                </div>
              )}
            </div>

            {/* Caption Banner */}
            <AnimatePresence mode="wait">
              {(currentMedia?.title || currentMedia?.caption || currentMedia?.description) && (
                <motion.div
                  key={`caption-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-50/80 via-amber-50/50 to-red-50/80 border border-red-100/60 text-center"
                >
                  <h3 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2" style={{ color: colors.primary }}>
                    <span style={{ color: colors.secondary }}>❝</span>
                    {currentMedia?.title || currentMedia?.caption}
                    <span style={{ color: colors.secondary }}>❞</span>
                  </h3>
                  {currentMedia?.description && (
                    <p className="text-sm text-gray-600 mt-1 max-w-2xl mx-auto">{currentMedia.description}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white shadow-lg transition-all"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)` }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Previous
              </motion.button>

              {/* Indicator Dots */}
              <div className="flex space-x-2.5 items-center">
                {media.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => goTo(i)}
                    whileHover={{ scale: 1.3 }}
                    className="h-3 rounded-full transition-all cursor-pointer"
                    animate={{
                      width: i === index ? 28 : 12,
                      backgroundColor: i === index ? colors.secondary : '#e5c9c9',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white shadow-lg transition-all"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)` }}
              >
                Next
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default FestiveCelebration;