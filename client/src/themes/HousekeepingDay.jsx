import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

const AUTOPLAY_MS = 5000;

/* ─────────────────────────────────────────────
   HOUSEKEEPING SVG ICON COMPONENTS (Light Blue Theme)
───────────────────────────────────────────── */

const BroomSVG = ({ size = 60, color = '#38BDF8', strokeColor = '#0284C7' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Broom handle */}
    <line x1="75" y1="15" x2="35" y2="60" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
    {/* Broom head band */}
    <rect x="25" y="55" width="22" height="10" rx="3" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(-35 36 60)" />
    {/* Broom bristles */}
    <path
      d="M18 72 L12 90 C12 92 14 94 17 94 L42 80 C44 79 43 76 40 75 Z"
      fill="#7DD3FC"
      stroke={strokeColor}
      strokeWidth="2"
    />
    <line x1="22" y1="74" x2="16" y2="88" stroke={strokeColor} strokeWidth="1.5" />
    <line x1="28" y1="70" x2="25" y2="86" stroke={strokeColor} strokeWidth="1.5" />
    <line x1="34" y1="67" x2="33" y2="83" stroke={strokeColor} strokeWidth="1.5" />
  </svg>
);

const SprayBottleSVG = ({ size = 55, color = '#0EA5E9', accentColor = '#BAE6FD' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Bottle Body */}
    <path d="M35 45 C35 38 40 35 45 35 L55 35 C60 35 65 38 65 45 L70 82 C70 88 65 92 58 92 L42 92 C35 92 30 88 30 82 Z" fill={color} opacity="0.85" stroke="#0369A1" strokeWidth="2.5" />
    <path d="M40 55 C40 55 45 58 55 58 C60 58 65 55 65 55 L67 78 C67 82 63 85 57 85 L43 85 C37 85 33 82 33 78 Z" fill={accentColor} opacity="0.4" />
    {/* Neck */}
    <rect x="44" y="24" width="12" height="12" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    {/* Trigger head */}
    <path d="M42 24 L42 16 C42 14 44 12 48 12 L60 12 C64 12 66 14 66 16 L66 24 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    {/* Spray nozzle */}
    <rect x="30" y="14" width="12" height="8" rx="2" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
    {/* Trigger handle */}
    <path d="M56 24 C56 30 50 36 44 36" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Spray droplets */}
    <circle cx="22" cy="14" r="2.5" fill="#7DD3FC" />
    <circle cx="15" cy="10" r="2" fill="#BAE6FD" />
    <circle cx="18" cy="20" r="1.5" fill="#38BDF8" />
  </svg>
);

const BucketMopSVG = ({ size = 65, color = '#0284C7', waterColor = '#38BDF8' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Bucket */}
    <path d="M25 40 L32 85 C33 90 40 94 50 94 C60 94 67 90 68 85 L75 40 Z" fill={color} stroke="#0369A1" strokeWidth="2.5" />
    {/* Water line */}
    <ellipse cx="50" cy="45" rx="23" ry="6" fill={waterColor} opacity="0.8" />
    {/* Bucket Rim */}
    <ellipse cx="50" cy="40" rx="25" ry="7" fill="none" stroke="#0369A1" strokeWidth="3" />
    {/* Bucket Handle */}
    <path d="M25 40 C25 22 75 22 75 40" stroke="#7DD3FC" strokeWidth="3" fill="none" />
    {/* Mop handle leaning */}
    <line x1="52" y1="44" x2="80" y2="8" stroke="#E0F2FE" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="80" cy="8" r="3.5" fill="#38BDF8" />
    {/* Soap bubbles */}
    <circle cx="40" cy="42" r="3" fill="#E0F2FE" opacity="0.9" />
    <circle cx="58" cy="41" r="4" fill="#E0F2FE" opacity="0.8" />
    <circle cx="48" cy="38" r="2.5" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

const SparkleStarSVG = ({ size = 45, color = '#7DD3FC' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z"
      fill={color}
    />
  </svg>
);

const VacuumSVG = ({ size = 60, color = '#0284C7' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Base body */}
    <rect x="25" y="55" width="50" height="30" rx="15" fill={color} stroke="#0369A1" strokeWidth="2.5" />
    {/* Wheels */}
    <circle cx="35" cy="85" r="8" fill="#334155" stroke="#0284C7" strokeWidth="2" />
    <circle cx="65" cy="85" r="8" fill="#334155" stroke="#0284C7" strokeWidth="2" />
    {/* Hose connection */}
    <path d="M50 55 C50 35 30 30 25 15" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* Handle */}
    <path d="M25 15 L20 10" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
    {/* Power Light */}
    <circle cx="50" cy="65" r="4" fill="#38BDF8" />
  </svg>
);

const SoapBubbleSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="url(#bubbleGrad)" stroke="#7DD3FC" strokeWidth="2" opacity="0.85" />
    <ellipse cx="35" cy="32" rx="12" ry="6" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 35 32)" />
    <circle cx="65" cy="68" r="4" fill="#FFFFFF" opacity="0.4" />
    <defs>
      <radialGradient id="bubbleGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.6" />
      </radialGradient>
    </defs>
  </svg>
);

/* ─────────────────────────────────────────────
   SIDE SVG FLOATING COLUMNS (Popping animation)
───────────────────────────────────────────── */

const sideIconsLeft = [
  { Component: BroomSVG, delay: 0, scale: 1 },
  { Component: SparkleStarSVG, delay: 0.8, scale: 0.9 },
  { Component: SprayBottleSVG, delay: 1.5, scale: 1.1 },
  { Component: SoapBubbleSVG, delay: 0.4, scale: 0.85 },
  { Component: BucketMopSVG, delay: 2.1, scale: 1 },
  { Component: VacuumSVG, delay: 1.2, scale: 0.95 },
  { Component: SparkleStarSVG, delay: 2.7, scale: 1.1 },
];

const sideIconsRight = [
  { Component: BucketMopSVG, delay: 0.3, scale: 1.05 },
  { Component: SoapBubbleSVG, delay: 1.1, scale: 0.9 },
  { Component: SprayBottleSVG, delay: 0.6, scale: 1 },
  { Component: SparkleStarSVG, delay: 1.8, scale: 1.15 },
  { Component: BroomSVG, delay: 2.3, scale: 0.95 },
  { Component: VacuumSVG, delay: 1.6, scale: 1 },
  { Component: SoapBubbleSVG, delay: 2.8, scale: 0.85 },
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
          scale: [scale * 0.8, scale * 1.1, scale],
          y: [0, -12, 0],
          rotate: i % 2 === 0 ? [0, 8, -8, 0] : [0, -8, 8, 0],
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
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(125, 211, 252, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(14, 165, 233, 0.15)',
        }}
      >
        <Component size={42} />
      </motion.div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   SCROLLING TICKER
───────────────────────────────────────────── */
const Ticker = () => (
  <div className="w-full bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-500 py-2 overflow-hidden shadow-lg border-y border-sky-300/40">
    <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
      {[...Array(3)].map((_, i) => (
        <span key={i} className="inline-flex items-center gap-6 text-[13px] font-bold text-slate-950 px-8 tracking-wide">
          <span>🧹 Happy Housekeeping Day!</span>
          <span>🧽 Kaleesuwari Refinery Pvt. Ltd.</span>
          <span>✨ Celebrating Our Sanitation & Housekeeping Champions</span>
          <span>🫧 Cleanliness · Hygiene · Perfection</span>
          <span>🪣 Creating Safe & Sparkling Environments Every Day</span>
          <span>🌟 Dedicated to Health & Order</span>
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN HOUSEKEEPING DAY THEME COMPONENT
───────────────────────────────────────────── */
const HousekeepingDay = ({ theme, media }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (media.length ? (prev + 1) % media.length : 0));
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (media.length ? (prev - 1 + media.length) % media.length : 0));
  }, [media.length]);

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    if (paused || media.length <= 1) return;
    const id = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, nextSlide, media.length, index]);

  const currentMedia = media[index];
  const streamId = currentMedia?.gridFsFileId || currentMedia?._id;

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.94,
      x: dir > 0 ? 80 : -80,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.94,
      x: dir > 0 ? -80 : 80,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(165deg, #07192F 0%, #0F2A4A 35%, #0284C7 85%, #07192F 100%)',
        fontFamily: "'Inter', 'Outfit', sans-serif",
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>

      {/* Side Popping SVG Columns */}
      <SideColumn icons={sideIconsLeft} position="left" />
      <SideColumn icons={sideIconsRight} position="right" />

      {/* Soft floating background bubbles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-300/30 blur-md"
            style={{
              width: `${40 + (i * 15) % 80}px`,
              height: `${40 + (i * 15) % 80}px`,
              left: `${(i * 18) % 90}%`,
              top: `${(i * 22) % 85}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ── HEADER WITH QUOTE DISPLAY ── */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-5 px-6 text-center max-w-4xl mx-auto w-full"
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl text-center px-8 py-5 w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(14,165,233,0.12) 50%, rgba(2,132,199,0.1) 100%)',
              border: '1px solid rgba(125,211,252,0.35)',
              boxShadow: '0 20px 50px rgba(2,132,199,0.25)',
            }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.2), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPositionX: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-sky-300" />
              <span className="text-sky-300 font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5">
                <span>🧹</span> Housekeeping Day Celebration <span>✨</span>
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-sky-300" />
            </div>

            {/* Quote text */}
            <motion.p
              key={theme?.quote || 'default'}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative text-white font-semibold text-base sm:text-lg md:text-xl leading-relaxed italic px-2"
              style={{ textShadow: '0 0 20px rgba(56,189,248,0.4)' }}
            >
              ❝ {theme?.quote || "Cleanliness and order are not matters of instinct; they are matters of education, care, and dedication."} ❞
            </motion.p>
          </div>
        </motion.header>

        {/* ── TICKER ── */}
        <Ticker />

        {/* ── MAIN SLIDESHOW ── */}
        <main
          className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 w-full"
          style={{ maxWidth: '100vw' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {media.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-3xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(125,211,252,0.3)',
              }}
            >
              <div className="text-6xl mb-4">🧹</div>
              <p className="text-sky-300 text-2xl font-bold">No housekeeping media uploaded yet!</p>
              <p className="text-slate-300 text-sm mt-2">The admin can upload photos & videos from the admin dashboard.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full"
              style={{ maxWidth: 'min(92vw, 1100px)' }}
            >
              {/* Slideshow Frame */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(14,165,233,0.3)]"
                style={{
                  background: 'rgba(7,25,47,0.75)',
                  border: '2px solid rgba(125,211,252,0.4)',
                }}
              >
                {/* Media area */}
                <div className="relative overflow-hidden w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[640px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950/90 overflow-hidden"
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

                      {/* Foreground media element */}
                      {currentMedia?.fileType === 'video' ? (
                        <video
                          ref={videoRef}
                          src={`${API_BASE_URL}/api/media/stream/${streamId}`}
                          className="w-full h-full object-cover rounded-xl shadow-2xl"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                        />
                      ) : (
                        <img
                          src={`${API_BASE_URL}/api/media/stream/${streamId}`}
                          alt={currentMedia?.title || 'Housekeeping Day'}
                          className="w-full h-full object-cover rounded-xl shadow-2xl"
                        />
                      )}

                      {/* Caption overlay at bottom */}
                      {(currentMedia?.title || currentMedia?.description) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.3 }}
                          className="absolute inset-x-0 bottom-0 px-6 py-4 z-20"
                          style={{
                            background: 'linear-gradient(to top, rgba(7,25,47,0.95) 0%, rgba(7,25,47,0.6) 60%, transparent 100%)',
                          }}
                        >
                          {currentMedia.title && (
                            <h3 className="text-white font-bold text-lg sm:text-2xl drop-shadow-lg">
                              {currentMedia.title}
                            </h3>
                          )}
                          {currentMedia.description && (
                            <p className="text-sky-100 text-sm mt-0.5 line-clamp-2">
                              {currentMedia.description}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress bar */}
                  {!paused && media.length > 1 && (
                    <motion.div
                      key={`prog-${index}`}
                      className="absolute bottom-0 left-0 h-1.5 z-30"
                      style={{ background: 'linear-gradient(90deg, #38BDF8, #7DD3FC)' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}

                  {/* Paused badge */}
                  <AnimatePresence>
                    {paused && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
                        style={{ background: 'rgba(7,25,47,0.85)', border: '1px solid rgba(125,211,252,0.4)' }}
                      >
                        ⏸ Paused
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Media type badge */}
                  <div
                    className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full text-xs font-bold text-slate-950"
                    style={{ background: '#7DD3FC' }}
                  >
                    {currentMedia?.fileType === 'video' ? '🎬 VIDEO' : '📸 PHOTO'}
                  </div>

                  {/* Slide counter */}
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: 'rgba(7,25,47,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    {index + 1} / {media.length}
                  </div>

                  {/* Prev / Next Buttons */}
                  {media.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl z-30 shadow-lg"
                        style={{ background: 'rgba(7,25,47,0.75)', border: '1px solid rgba(125,211,252,0.4)' }}
                      >
                        ‹
                      </motion.button>

                      <motion.button
                        onClick={nextSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl z-30 shadow-lg"
                        style={{ background: 'rgba(7,25,47,0.75)', border: '1px solid rgba(125,211,252,0.4)' }}
                      >
                        ›
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {/* Dots navigation */}
              {media.length > 1 && (
                <div className="flex justify-center items-center gap-2 mt-5">
                  {media.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? 'w-8 bg-sky-400 shadow-[0_0_10px_#38BDF8]'
                          : 'w-2.5 bg-sky-900/60 hover:bg-sky-500/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HousekeepingDay;
