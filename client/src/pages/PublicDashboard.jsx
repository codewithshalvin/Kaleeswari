import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import ThemeRenderer from '../components/ThemeRenderer';

// Make sure framer-motion is installed in client/:  npm install framer-motion

const PublicDashboard = () => {
  const [activeTheme, setActiveTheme] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchActiveThemeAndMedia = async (isInitial = false) => {
    try {
      const themeRes = await api.get('/themes/active');
      setActiveTheme(themeRes.data);

      if (themeRes.data) {
        const mediaRes = await api.get(`/media?theme=${themeRes.data.slug}`);
        setMedia(mediaRes.data);
      }
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load dashboard data.');
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveThemeAndMedia(true);

    // Polling every 30 seconds, silent refresh (no loading flicker)
    const intervalId = setInterval(() => fetchActiveThemeAndMedia(false), 30000);

    return () => clearInterval(intervalId);
  }, []);

  // ---------- Animated Header ----------
  // Logo file expected at: client/public/assets/kalees.jpg
  const Header = () => (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative overflow-hidden w-full py-2.5 px-4 shadow-lg
                 bg-gradient-to-r from-red-900 via-red-700 to-red-900"
    >
      {/* Animated glowing accent line */}
      <motion.div
        className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-300 via-yellow-300 to-red-300"
        animate={{ backgroundPositionX: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 100%' }}
      />

      {/* Narrower centered content so the header reads slightly more compact */}
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3">
        <motion.img
          src="/assets/kalees.jpg"
          alt="Kaleesuwari Refinery Private Limited logo"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-yellow-300/70 shadow-md"
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        />

        <motion.h1
          className="text-lg md:text-2xl font-bold tracking-wide text-white text-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Kaleesuwari Refinery Private Limited
        </motion.h1>
      </div>

      {/* {lastUpdated && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
          className="mt-1 text-center text-[10px] text-red-100"
        >
          Updated {lastUpdated.toLocaleTimeString()}
        </motion.p>
      )} */}
    </motion.header>
  );

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-950">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-amber-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          className="text-lg font-semibold text-slate-300"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Loading Engineer's Day celebration...
        </motion.p>
      </div>
    );
  }

  // ---------- Error State ----------
  if (error || !activeTheme) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-8 py-6 text-center"
        >
          <p className="text-lg font-semibold text-red-400">
            {error || 'No active theme found.'}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Please check back shortly, or contact the admin.
          </p>
        </motion.div>
      </div>
    );
  }

  // ---------- Main Dashboard ----------
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={activeTheme.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="px-4 py-6"
        >
          {media.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-[50vh] items-center justify-center text-center"
            >
              <p className="text-xl text-slate-400">
                No photos yet — check back soon! 🎉
              </p>
            </motion.div>
          ) : (
            <ThemeRenderer theme={activeTheme} media={media} />
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default PublicDashboard;