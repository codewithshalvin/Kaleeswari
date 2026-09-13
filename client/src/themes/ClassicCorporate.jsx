import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

/* ─────────────────────────────────────────────
   CLASSIC CORPORATE SVG ICON COMPONENTS
───────────────────────────────────────────── */

const GoldTrophySVG = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M25 20 L75 20 C75 50 60 62 50 65 C40 62 25 50 25 20 Z" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2.5" />
    <path d="M25 25 C10 25 10 45 25 48" stroke="#D4AF37" strokeWidth="3" fill="none" />
    <path d="M75 25 C90 25 90 45 75 48" stroke="#D4AF37" strokeWidth="3" fill="none" />
    <rect x="44" y="65" width="12" height="15" fill="#B91C1C" />
    <rect x="25" y="80" width="50" height="12" rx="3" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2" />
    <motion.path
      d="M50 28 L52 35 L59 35 L53 39 L55 46 L50 42 L45 46 L47 39 L41 35 L48 35 Z"
      fill="#FFFFFF"
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const GrowthChartSVG = ({ size = 55 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M15 85 L85 85 M15 85 L15 15" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
    <rect x="25" y="60" width="10" height="25" fill="#D4AF37" rx="2" />
    <rect x="42" y="45" width="10" height="40" fill="#B91C1C" rx="2" />
    <rect x="59" y="30" width="10" height="55" fill="#D4AF37" rx="2" />
    <rect x="76" y="15" width="10" height="70" fill="#B91C1C" rx="2" />
    <motion.path
      d="M20 70 L40 50 L60 38 L82 18"
      stroke="#F59E0B"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <polygon points="82,12 86,22 76,22" fill="#F59E0B" />
  </svg>
);

const CorporateBadgeSVG = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M35 65 L25 95 L50 82 L75 95 L65 65 Z" fill="#B91C1C" />
    <circle cx="50" cy="45" r="32" fill="#D4AF37" stroke="#B91C1C" strokeWidth="3" />
    <circle cx="50" cy="45" r="24" fill="#B91C1C" />
    <path d="M50 28 L54 39 L65 39 L56 46 L59 57 L50 50 L41 57 L44 46 L35 39 L46 39 Z" fill="#D4AF37" />
  </svg>
);

const PillarSVG = ({ size = 65 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="20" y="15" width="60" height="8" rx="2" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2" />
    <rect x="25" y="23" width="50" height="6" fill="#B91C1C" />
    <rect x="30" y="29" width="8" height="50" fill="#D4AF37" />
    <rect x="46" y="29" width="8" height="50" fill="#D4AF37" />
    <rect x="62" y="29" width="8" height="50" fill="#D4AF37" />
    <rect x="25" y="79" width="50" height="6" fill="#B91C1C" />
    <rect x="20" y="85" width="60" height="8" rx="2" fill="#D4AF37" stroke="#B91C1C" strokeWidth="2" />
  </svg>
);

const sideIconsLeft = [
  { Component: GoldTrophySVG, delay: 0, scale: 1 },
  { Component: GrowthChartSVG, delay: 0.8, scale: 1.05 },
  { Component: CorporateBadgeSVG, delay: 1.5, scale: 1.1 },
  { Component: PillarSVG, delay: 0.4, scale: 0.95 },
  { Component: GoldTrophySVG, delay: 2.1, scale: 1 },
];

const sideIconsRight = [
  { Component: PillarSVG, delay: 0.3, scale: 1.05 },
  { Component: CorporateBadgeSVG, delay: 1.1, scale: 1 },
  { Component: GrowthChartSVG, delay: 0.6, scale: 1.1 },
  { Component: GoldTrophySVG, delay: 1.8, scale: 0.95 },
  { Component: PillarSVG, delay: 2.4, scale: 1.05 },
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
          border: '1px solid rgba(212, 175, 55, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(184, 13, 40, 0.12)',
        }}
      >
        <Component size={44} />
      </motion.div>
    ))}
  </div>
);

const ClassicCorporate = ({ theme, media }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());

  const images = media.filter(m => m.fileType === 'image');
  const videos = media.filter(m => m.fileType === 'video');
  const heroMedia = media.slice(0, 5);

  useEffect(() => {
    if (heroMedia.length <= 1) return;
    const id = setInterval(() => setCurrentSlide(p => (p + 1) % heroMedia.length), 4500);
    return () => clearInterval(id);
  }, [heroMedia.length]);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true :
                            selectedCategory === 'image' ? item.fileType === 'image' :
                            selectedCategory === 'video' ? item.fileType === 'video' :
                            item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryCards = [
    { title: "Refinery Oils", sub: "Pure & Healthy", icon: "🧴", bg: "bg-amber-50", iconBg: "bg-amber-100", category: "image" },
    { title: "Engineering Teams", sub: "Mechanical & Tech", icon: "⚙️", bg: "bg-orange-50", iconBg: "bg-orange-100", category: "all" },
    { title: "Safety & Quality", sub: "Rich in Nutrition", icon: "🍲", bg: "bg-yellow-50", iconBg: "bg-yellow-100", category: "image" },
    { title: "Events & Festives", sub: "Engineer's Day", icon: "🎁", bg: "bg-pink-50", iconBg: "bg-pink-100", category: "video" },
    { title: "Healthy Living", sub: "For a Better Tomorrow", icon: "🍃", bg: "bg-emerald-50", iconBg: "bg-emerald-100", category: "all" }
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-gray-800 relative overflow-x-hidden">
      {/* Side Popping SVG Columns */}
      <SideColumn icons={sideIconsLeft} position="left" />
      <SideColumn icons={sideIconsRight} position="right" />

      {/* ══════════════ 1. TOP ANNOUNCEMENT MARQUEE BAR ══════════════ */}
      <div className="bg-[#b80d28] text-white py-2 px-4 text-xs font-semibold flex items-center justify-between overflow-hidden shadow-sm">
        {/* Left Side Ticker */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <span className="shrink-0 flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded text-[11px]">
            🏭 Kaleesuwari
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap">
              <span>
                Kaleesuwari Refinery Private Limited &nbsp;|&nbsp; Thoothukudi &nbsp;|&nbsp; Wishing All Our Engineers a Very Happy Engineer's Day! &nbsp;🔧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Kaleesuwari Refinery Private Limited &nbsp;|&nbsp; Thoothukudi &nbsp;|&nbsp; Wishing All Our Engineers a Very Happy Engineer's Day! &nbsp;🔧
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Branding */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 pl-4 border-l border-white/20 text-white/90">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          <span>Kaleesuwari Refinery Private Limited</span>
        </div>
      </div>

      {/* ══════════════ 2. WHITE NAVIGATION HEADER ══════════════ */}
      <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-100">
        <div className="max-w-350 mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
            <img src="/assets/kalees.jpg" alt="Kaleesuwari" className="h-12 sm:h-14 object-contain" />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search for your favourite memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80d28]/30 focus:border-[#b80d28] transition"
              />
              <button className="absolute right-1 w-9 h-9 bg-[#b80d28] hover:bg-[#9a0a21] text-white rounded-full flex items-center justify-center transition shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Nav Dropdown Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <button onClick={() => setSelectedCategory('all')} className={`hover:text-[#b80d28] flex items-center gap-1 transition ${selectedCategory === 'all' ? 'text-[#b80d28]' : ''}`}>
              All Media ▾
            </button>
            <button onClick={() => setSelectedCategory('image')} className={`hover:text-[#b80d28] flex items-center gap-1 transition ${selectedCategory === 'image' ? 'text-[#b80d28]' : ''}`}>
              Photos ({images.length}) ▾
            </button>
            <button onClick={() => setSelectedCategory('video')} className={`hover:text-[#b80d28] flex items-center gap-1 transition ${selectedCategory === 'video' ? 'text-[#b80d28]' : ''}`}>
              Videos ({videos.length}) ▾
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 text-gray-600 shrink-0">
            {/* User Icon */}
            <a href="/admin/login" title="Admin Login" className="p-2 hover:bg-gray-100 rounded-full text-gray-700 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>

            {/* Media Count Cart Icon */}
            <div className="relative p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#b80d28] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {media.length}
              </span>
            </div>

            {/* Favorites Icon */}
            <div className="relative p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <svg className="w-5 h-5 text-gray-700" fill={likedIds.size > 0 ? "#b80d28" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likedIds.size > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#b80d28] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {likedIds.size}
                </span>
              )}
            </div>

            {/* Menu Dropdown */}
            <button className="hidden sm:flex items-center gap-1 font-semibold text-xs text-gray-700 hover:text-[#b80d28] border border-gray-200 rounded-full px-3 py-1.5">
              More ≡
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════ 3. HERO SLIDESHOW BANNER ══════════════ */}
      <section className="max-w-350 mx-auto px-4 sm:px-6 pt-6 pb-8">
        <div className="relative bg-[#fef4ed] border border-orange-100/60 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Side */}
            <div className="lg:col-span-6 z-10">
              {theme?.quote && (
                <div className="mb-4 p-4 rounded-2xl bg-white/90 border border-amber-300 shadow-sm text-center">
                  <p className="text-[#b80d28] font-bold text-sm sm:text-base italic">
                    ❝ {theme.quote} ❞
                  </p>
                </div>
              )}
              <div className="inline-flex items-center gap-2 bg-[#fde2e4] text-[#b80d28] text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                <span>🍃</span>
                <span>Pure Goodness for a Healthier Tomorrow</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-5 tracking-tight">
                Spreading <span className="text-[#b80d28]">Health &amp; Happiness</span> Every Day!
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-7 max-w-lg">
                From our trusted edible oils to our rich tradition of engineering innovation, Kaleesuwari brings purity, quality, and joy to our employees and community. Happy Engineer's Day!
              </p>

              <button
                onClick={() => {
                  const galleryEl = document.getElementById('gallery-section');
                  galleryEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#b80d28] hover:bg-[#9a0a21] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md shadow-red-200 hover:shadow-lg transition-all"
              >
                <span>Explore Media Gallery</span>
                <span>→</span>
              </button>
            </div>

            {/* Right Media Carousel Side */}
            <div className="lg:col-span-6 relative">
              
              {/* Floating Decorative Text Accent */}
              <div className="absolute -top-6 right-4 z-20 text-[#b80d28] font-serif italic text-lg sm:text-xl font-bold opacity-80 pointer-events-none select-none">
                Tradition in Every Drop ♡
              </div>

              {/* Main Media Carousel Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border-4 border-white aspect-16/10">
                {heroMedia.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full relative cursor-pointer flex items-center justify-center bg-gray-950 overflow-hidden"
                      onClick={() => setSelectedMedia(heroMedia[currentSlide])}
                    >
                      {/* Ambient background blur */}
                      {heroMedia[currentSlide].fileType !== 'video' && (
                        <img
                          src={`${API_BASE_URL}/api/media/${heroMedia[currentSlide]._id}/stream`}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none select-none"
                        />
                      )}

                      {heroMedia[currentSlide].fileType === 'video' ? (
                        <video
                          src={`${API_BASE_URL}/api/media/${heroMedia[currentSlide]._id}/stream`}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={`${API_BASE_URL}/api/media/${heroMedia[currentSlide]._id}/stream`}
                          alt={heroMedia[currentSlide].title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Overlay Caption */}
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                        <span className="bg-[#b80d28] text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
                          {heroMedia[currentSlide].category || 'Refinery'}
                        </span>
                        <h3 className="text-lg font-bold mt-1.5">{heroMedia[currentSlide].title}</h3>
                        {heroMedia[currentSlide].description && (
                          <p className="text-xs text-gray-200 line-clamp-1 mt-0.5">{heroMedia[currentSlide].description}</p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-6 text-center">
                    <span className="text-5xl mb-2">📸</span>
                    <p className="font-semibold text-gray-600">No Hero Media Available</p>
                    <p className="text-xs text-gray-400">Admin can upload media from the admin dashboard</p>
                  </div>
                )}

                {/* Carousel Prev/Next Buttons */}
                {heroMedia.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide(p => (p - 1 + heroMedia.length) % heroMedia.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-[#b80d28] rounded-full flex items-center justify-center shadow-md transition z-20"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setCurrentSlide(p => (p + 1) % heroMedia.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-[#b80d28] rounded-full flex items-center justify-center shadow-md transition z-20"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Slider Dots */}
              {heroMedia.length > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  {heroMedia.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === idx ? 'w-6 bg-[#b80d28]' : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ 4. CATEGORY PILL CARDS STRIP ══════════════ */}
      <section className="max-w-350 mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(card.category)}
              className="bg-white border border-gray-100 hover:border-red-200 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 ${card.iconBg} rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#b80d28] transition">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{card.sub}</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-red-50 text-[#b80d28] flex items-center justify-center text-xs font-bold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                ›
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ 5. MEDIA GALLERY SECTION ══════════════ */}
      <section id="gallery-section" className="max-w-350 mx-auto px-4 sm:px-6 pb-20">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#b80d28] uppercase tracking-wider">Kaleesuwari Gallery</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">
              Engineer's Day Memories &amp; Moments
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { key: 'all', label: 'All Media' },
              { key: 'image', label: '📸 Photos' },
              { key: 'video', label: '🎬 Videos' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === tab.key
                    ? 'bg-[#b80d28] text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-xs max-w-md mx-auto my-8">
            <span className="text-5xl">🔍</span>
            <h3 className="text-lg font-bold text-gray-800 mt-3">No Media Found</h3>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms or filter options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map(item => (
              <div
                key={item._id}
                onClick={() => setSelectedMedia(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-red-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                  {item.fileType === 'video' ? (
                    <video
                      src={`${API_BASE_URL}/api/media/${item._id}/stream`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                    />
                  ) : (
                    <img
                      src={`${API_BASE_URL}/api/media/${item._id}/stream`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-xs text-[#b80d28] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {item.fileType === 'video' ? '🎬 Video' : '📸 Photo'}
                    </span>
                    <button
                      onClick={(e) => toggleLike(item._id, e)}
                      className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-xs transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill={likedIds.has(item._id) ? "#b80d28" : "none"}
                        stroke={likedIds.has(item._id) ? "#b80d28" : "currentColor"}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#b80d28] transition line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span className="capitalize">{item.category || 'General'}</span>
                    <span className="text-[#b80d28] font-bold group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ══════════════ 6. MEDIA DETAIL MODAL ══════════════ */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>

            {/* Media Content */}
            <div className="bg-black flex-1 flex items-center justify-center overflow-hidden max-h-[65vh] relative">
              {selectedMedia.fileType !== 'video' && (
                <img
                  src={`${API_BASE_URL}/api/media/${selectedMedia._id}/stream`}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none select-none"
                />
              )}

              {selectedMedia.fileType === 'video' ? (
                <video
                  src={`${API_BASE_URL}/api/media/${selectedMedia._id}/stream`}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`${API_BASE_URL}/api/media/${selectedMedia._id}/stream`}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="bg-[#b80d28] text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                  {selectedMedia.category || 'Refinery'}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-1">{selectedMedia.title}</h2>
                {selectedMedia.description && (
                  <p className="text-sm text-gray-500 mt-1">{selectedMedia.description}</p>
                )}
              </div>

              <button
                onClick={(e) => toggleLike(selectedMedia._id, e)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold border transition flex items-center gap-2 ${
                  likedIds.has(selectedMedia._id)
                    ? 'bg-[#b80d28] text-white border-[#b80d28]'
                    : 'border-gray-300 text-gray-700 hover:border-red-300'
                }`}
              >
                <svg className="w-4 h-4" fill={likedIds.has(selectedMedia._id) ? "white" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likedIds.has(selectedMedia._id) ? 'Liked' : 'Like Memory'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ 7. BRAND FOOTER ══════════════ */}
      <footer className="bg-[#b80d28] text-white py-10 border-t border-red-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/80">
          <div className="flex items-center gap-3">
            <img src="/assets/kalees.jpg" alt="logo" className="h-8 brightness-0 invert object-contain" />
            <span>© 2026 Kaleesuwari Refinery Private Limited. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Thoothukudi Unit</span>
            <span>•</span>
            <span>Engineer's Day Special Edition</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ClassicCorporate;
