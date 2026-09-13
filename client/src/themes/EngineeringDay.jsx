import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

const AUTOPLAY_MS = 5000;

/* ─────────────────────────────────────────────
   ENGINEERING SVG ICON COMPONENTS
───────────────────────────────────────────── */

const GearSVG = ({ size = 60, color = '#F59E0B', strokeColor = '#D97706' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 30a20 20 0 1 1 0 40 20 20 0 0 1 0-40z"
      fill={color}
      stroke={strokeColor}
      strokeWidth="2"
    />
    <circle cx="50" cy="50" r="8" fill={strokeColor} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <rect
        key={i}
        x="46"
        y="5"
        width="8"
        height="16"
        rx="3"
        fill={color}
        stroke={strokeColor}
        strokeWidth="1.5"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
  </svg>
);

const WrenchSVG = ({ size = 55, color = '#60A5FA' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M65 10 C80 10 90 20 90 35 C90 45 85 53 77 57 L55 79 L62 86 C65 89 65 94 62 97 C59 100 54 100 51 97 L28 74 C25 71 25 66 28 63 C31 60 36 60 39 63 L46 70 L68 48 C72 40 65 25 55 22"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="72" cy="28" r="12" stroke={color} strokeWidth="5" fill="none" />
  </svg>
);

const CircuitSVG = ({ size = 70, color = '#34D399' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="5" y="5" width="90" height="90" rx="8" stroke={color} strokeWidth="2" strokeDasharray="6 3" />
    <line x1="20" y1="50" x2="40" y2="50" stroke={color} strokeWidth="3" />
    <rect x="40" y="43" width="20" height="14" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
    <line x1="60" y1="50" x2="80" y2="50" stroke={color} strokeWidth="3" />
    <line x1="50" y1="20" x2="50" y2="43" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="15" r="6" stroke={color} strokeWidth="2.5" fill="none" />
    <line x1="50" y1="57" x2="50" y2="80" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="85" r="6" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="20" cy="50" r="5" fill={color} />
    <circle cx="80" cy="50" r="5" fill={color} />
  </svg>
);

const BlueprintRulerSVG = ({ size = 65, color = '#A78BFA' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="10" y="40" width="80" height="20" rx="4" stroke={color} strokeWidth="3" fill="none" />
    {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
      <line key={i} x1={x} y1="40" x2={x} y2={i % 2 === 0 ? "32" : "36"} stroke={color} strokeWidth="2" />
    ))}
    <line x1="10" y1="20" x2="70" y2="20" stroke={color} strokeWidth="2" strokeDasharray="4 3" />
    <line x1="70" y1="20" x2="70" y2="40" stroke={color} strokeWidth="2" strokeDasharray="4 3" />
    <line x1="10" y1="70" x2="80" y2="70" stroke={color} strokeWidth="2" strokeDasharray="4 3" />
    <path d="M82 68 L90 70 L82 72 Z" fill={color} />
    <path d="M8 18 L16 20 L8 22 Z" fill={color} />
  </svg>
);

const HardHatSVG = ({ size = 60, color = '#FCD34D' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M15 65 Q15 55 25 52 L25 45 C25 28 38 18 50 18 C62 18 75 28 75 45 L75 52 Q85 55 85 65 Z"
      fill={color}
      stroke="#D97706"
      strokeWidth="3"
    />
    <rect x="10" y="65" width="80" height="10" rx="5" fill={color} stroke="#D97706" strokeWidth="3" />
    <rect x="45" y="18" width="10" height="30" rx="3" fill="#D97706" opacity="0.5" />
  </svg>
);

const HelmetBoltSVG = ({ size = 50, color = '#F87171' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,10 90,85 10,85" stroke={color} strokeWidth="5" fill="none" strokeLinejoin="round" />
    <path d="M50 30 L40 60 L55 55 L45 80" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PipelineSVG = ({ size = 80, color = '#94A3B8' }) => (
  <svg width={size} height={size / 3} viewBox="0 0 200 60" fill="none">
    <rect x="0" y="20" width="200" height="20" rx="10" stroke={color} strokeWidth="3" fill="none" />
    <circle cx="50" cy="30" r="8" stroke={color} strokeWidth="3" fill="none" />
    <circle cx="150" cy="30" r="8" stroke={color} strokeWidth="3" fill="none" />
    <line x1="50" y1="0" x2="50" y2="20" stroke={color} strokeWidth="3" />
    <line x1="150" y1="40" x2="150" y2="60" stroke={color} strokeWidth="3" />
  </svg>
);

const FlaskSVG = ({ size = 55, color = '#6EE7B7' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M35 10 L35 45 L10 85 C8 90 12 95 18 95 L82 95 C88 95 92 90 90 85 L65 45 L65 10 Z"
      stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round" />
    <line x1="30" y1="10" x2="70" y2="10" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="50" cy="75" rx="22" ry="10" fill={color} opacity="0.3" />
    <circle cx="40" cy="70" r="4" fill={color} opacity="0.7" />
    <circle cx="58" cy="78" r="3" fill={color} opacity="0.7" />
  </svg>
);

const AngleSVG = ({ size = 60, color = '#FDBA74' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M15 85 L15 15 L85 85 Z" stroke={color} strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <circle cx="15" cy="85" r="6" fill={color} />
    <circle cx="15" cy="15" r="6" fill={color} />
    <circle cx="85" cy="85" r="6" fill={color} />
    <path d="M30 85 A15 15 0 0 0 15 70" stroke={color} strokeWidth="3" fill="none" />
  </svg>
);

/* ─────────────────────────────────────────────
   SIDE SVG FLOATING COLUMNS
───────────────────────────────────────────── */

const leftIcons = [
  { Component: GearSVG,        props: { size: 70, color: '#F59E0B' },   top: '5%',  delay: 0 },
  { Component: WrenchSVG,      props: { size: 60, color: '#60A5FA' },   top: '18%', delay: 0.5 },
  { Component: CircuitSVG,     props: { size: 65, color: '#34D399' },   top: '34%', delay: 0.2 },
  { Component: BlueprintRulerSVG, props: { size: 68, color: '#A78BFA' }, top: '50%', delay: 0.8 },
  { Component: HardHatSVG,     props: { size: 65, color: '#FCD34D' },   top: '66%', delay: 0.3 },
  { Component: FlaskSVG,       props: { size: 58, color: '#6EE7B7' },   top: '80%', delay: 0.6 },
];

const rightIcons = [
  { Component: HelmetBoltSVG,  props: { size: 60, color: '#F87171' },   top: '8%',  delay: 0.4 },
  { Component: GearSVG,        props: { size: 55, color: '#FBBF24', strokeColor: '#B45309' }, top: '22%', delay: 0.1 },
  { Component: AngleSVG,       props: { size: 62, color: '#FDBA74' },   top: '37%', delay: 0.7 },
  { Component: CircuitSVG,     props: { size: 60, color: '#818CF8' },   top: '53%', delay: 0.25 },
  { Component: WrenchSVG,      props: { size: 58, color: '#38BDF8' },   top: '68%', delay: 0.9 },
  { Component: FlaskSVG,       props: { size: 55, color: '#A3E635' },   top: '82%', delay: 0.45 },
];

/* ─────────────────────────────────────────────
   FLOATING SIDE COLUMN COMPONENT
───────────────────────────────────────────── */
const SideIcons = ({ icons, side = 'left' }) => (
  <div className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-20 sm:w-24 z-20 pointer-events-none`}>
    {icons.map(({ Component, props, top, delay }, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ top, [side]: '4px' }}
        initial={{ opacity: 0, x: side === 'left' ? -80 : 80, scale: 0.4 }}
        animate={{
          opacity: [0, 1, 1, 0.85, 1],
          x: 0,
          scale: 1,
          y: [0, -8, 4, -5, 0],
        }}
        transition={{
          opacity: { duration: 1.2, delay },
          x: { duration: 0.8, delay, type: 'spring', stiffness: 120 },
          scale: { duration: 0.8, delay },
          y: {
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 1,
          },
        }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: delay * 0.5 }}
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        <Component {...props} />
      </motion.div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   PARTICLE SPARKS BACKGROUND
───────────────────────────────────────────── */
const Sparks = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(24)].map((_, i) => {
      const colors = ['#F59E0B', '#60A5FA', '#34D399', '#F87171', '#A78BFA', '#FCD34D'];
      const color = colors[i % colors.length];
      const left = 20 + Math.random() * 60; // keep sparks in center, away from side icons
      const duration = 4 + (i % 5);
      const delay = (i * 0.3) % 5;
      return (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: `${left}%`, background: color }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
        />
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────
   SCROLLING TICKER
───────────────────────────────────────────── */
const Ticker = () => (
  <div className="w-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 py-1.5 overflow-hidden shadow-lg">
    <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
      {[...Array(3)].map((_, i) => (
        <span key={i} className="inline-flex items-center gap-6 text-[13px] font-bold text-gray-900 px-8">
          <span>⚙️ Happy Engineer's Day!</span>
          <span>🔧 Kaleesuwari Refinery Pvt. Ltd., Thoothukudi</span>
          <span>🏭 Celebrating the Builders of Tomorrow</span>
          <span>🔩 Innovation · Precision · Excellence</span>
          <span>💡 Engineering the Future Today</span>
          <span>⛏️ 15th September — Engineer's Day</span>
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN ENGINEERING DAY THEME
───────────────────────────────────────────── */
const EngineeringDay = ({ theme, media }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex(prev => (media.length ? (prev + 1) % media.length : 0));
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex(prev => (media.length ? (prev - 1 + media.length) % media.length : 0));
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
      scale: 0.92,
      x: dir > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? -100 : 100,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 30%, #1e293b 60%, #0f172a 100%)',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── CSS KEYFRAMES injected inline ── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .gear-spin { animation: spin-slow 8s linear infinite; }
        .gear-spin-rev { animation: spin-rev 6s linear infinite; }
        @keyframes blueprint-dash {
          to { stroke-dashoffset: -40; }
        }
        .blueprint-line { animation: blueprint-dash 2s linear infinite; }
      `}</style>

      {/* Sparks */}
      <Sparks />

      {/* Side SVG columns */}
      <SideIcons icons={leftIcons} side="left" />
      <SideIcons icons={rightIcons} side="right" />

      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ─────────── MAIN CONTENT ─────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HEADER WITH QUOTE ── */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-4 px-6 text-center max-w-4xl mx-auto w-full"
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl text-center px-8 py-5 w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(99,102,241,0.12) 50%, rgba(16,185,129,0.08) 100%)',
              border: '1px solid rgba(245,158,11,0.35)',
            }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPositionX: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400" />
              <span className="text-yellow-400 font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5">
                <span>⚙️</span> Engineer's Day Celebration <span>⚙️</span>
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400" />
            </div>

            {/* Quote text */}
            <motion.p
              key={theme?.quote || 'default'}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative text-white font-semibold text-base sm:text-lg md:text-xl leading-relaxed italic px-2"
              style={{ textShadow: '0 0 20px rgba(245,158,11,0.3)' }}
            >
              ❝ {theme?.quote || "Scientists dream about doing great things. Engineers do them."} ❞
            </motion.p>
          </div>
        </motion.header>

        {/* ── TICKER — placed below header ── */}
        <Ticker />

        {/* ── LARGE ROTATING GEAR DECORATIONS (Center top/bottom) ── */}
        <div className="pointer-events-none fixed top-16 left-1/2 -translate-x-1/2 z-0 opacity-10">
          <div className="gear-spin">
            <GearSVG size={140} color="#F59E0B" strokeColor="#D97706" />
          </div>
        </div>
        <div className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-0 opacity-10">
          <div className="gear-spin-rev">
            <GearSVG size={100} color="#60A5FA" strokeColor="#3B82F6" />
          </div>
        </div>

        {/* ── MAIN SLIDESHOW ── */}
        <main
          className="flex-1 flex flex-col items-center justify-center px-6 pb-8 w-full"
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
                border: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <div className="text-6xl mb-4">⚙️</div>
              <p className="text-yellow-400 text-2xl font-bold">No media yet!</p>
              <p className="text-slate-400 text-sm mt-2">The admin can upload photos & videos from the dashboard.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="w-full"
              style={{ maxWidth: 'min(92vw, 1100px)' }}
            >
              {/* ── Slideshow Frame ── */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.25)]"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '2px solid rgba(245,158,11,0.35)',
                }}
              >
                {/* Corner accents */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-8 h-8 z-20 pointer-events-none`}
                    style={{
                      background: `linear-gradient(${[135, 225, 315, 45][i]}deg, rgba(245,158,11,0.6) 0%, transparent 60%)`,
                    }}
                  />
                ))}

                {/* Media area */}
                <div
                  className="relative overflow-hidden w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[640px]"
                >
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
                          alt={currentMedia?.title || 'Engineering Day'}
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
                          className="absolute inset-x-0 bottom-0 px-6 py-4 z-10"
                          style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                          }}
                        >
                          {currentMedia.title && (
                            <h3 className="text-white font-bold text-lg sm:text-2xl drop-shadow-lg">
                              {currentMedia.title}
                            </h3>
                          )}
                          {currentMedia.description && (
                            <p className="text-slate-300 text-sm mt-0.5 line-clamp-2">
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
                      className="absolute bottom-0 left-0 h-1 z-30"
                      style={{ background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }}
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
                        style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(245,158,11,0.4)' }}
                      >
                        ⏸ Paused
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Media type badge */}
                  <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(245,158,11,0.85)', color: '#1a1a1a' }}>
                    {currentMedia?.fileType === 'video' ? '🎬 VIDEO' : '📸 PHOTO'}
                  </div>

                  {/* Slide counter */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    {index + 1} / {media.length}
                  </div>

                  {/* Prev / Next Buttons */}
                  {media.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center shadow-xl"
                        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(245,158,11,0.5)' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M15 6l-6 6 6 6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.button>
                      <motion.button
                        onClick={nextSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center shadow-xl"
                        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(245,158,11,0.5)' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 6l6 6-6 6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.button>
                    </>
                  )}
                </div>

                {/* ── Dot indicators ── */}
                {media.length > 1 && (
                  <div className="flex justify-center items-center gap-2 py-4 px-6 flex-wrap">
                    {media.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => goTo(i)}
                        title={media[i]?.title || `Slide ${i + 1}`}
                        className="rounded-full transition-all cursor-pointer shrink-0"
                        animate={{
                          width: i === index ? 28 : 10,
                          height: 10,
                          backgroundColor: i === index ? '#F59E0B' : 'rgba(255,255,255,0.2)',
                        }}
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Thumbnail strip ── */}
              {media.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 px-1"
                  style={{ scrollbarColor: '#F59E0B transparent', scrollbarWidth: 'thin' }}>
                  {media.map((item, i) => {
                    const tid = item?.gridFsFileId || item?._id;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => goTo(i)}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 rounded-xl overflow-hidden relative"
                        style={{
                          width: 90,
                          height: 60,
                          border: i === index ? '2px solid #F59E0B' : '2px solid transparent',
                          boxShadow: i === index ? '0 0 12px rgba(245,158,11,0.5)' : 'none',
                          transition: 'border 0.3s, box-shadow 0.3s',
                          background: '#0f172a',
                        }}
                      >
                        {item.fileType === 'video' ? (
                          <video
                            src={`http://localhost:5000/api/media/stream/${tid}`}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={`http://localhost:5000/api/media/stream/${tid}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {i === index && (
                          <div className="absolute inset-0 bg-yellow-400/20" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </main>

        {/* ── FOOTER ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-5 px-4 relative z-10"
          style={{ borderTop: '1px solid rgba(245,158,11,0.15)' }}
        >
          {/* Decorative gear strip */}
          <div className="flex items-center justify-center gap-4 mb-3 opacity-60">
            {[GearSVG, WrenchSVG, CircuitSVG, WrenchSVG, GearSVG].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
              >
                <Icon size={22} color={['#F59E0B', '#60A5FA', '#34D399', '#60A5FA', '#F59E0B'][i]} />
              </motion.div>
            ))}
          </div>

          <p className="text-slate-400 text-xs font-medium">
            © 2026 Kaleesuwari Refinery Private Limited · Thoothukudi Unit ·{' '}
            <span className="text-yellow-400">Engineer's Day Special Edition</span>
          </p>
          <p className="text-slate-600 text-[10px] mt-0.5">
            "Engineering is the art of organizing and directing men and controlling the forces and materials of nature for the benefit of the human race."
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default EngineeringDay;
