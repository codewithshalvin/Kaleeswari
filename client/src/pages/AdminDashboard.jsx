import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ThemeSelector from '../components/ThemeSelector';
import UploadForm from '../components/UploadForm';
import MediaLibrary from '../components/MediaLibrary';

/* ── Quote Manager ─────────────────────────────────────────── */
const QuoteManager = ({ activeTheme, accent }) => {
  const [quote, setQuote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Pre-fill when active theme loads / changes
  useEffect(() => {
    setQuote(activeTheme?.quote || '');
    setSaved(false);
  }, [activeTheme?.slug]);

  const handleSave = async () => {
    if (!activeTheme) return;
    setSaving(true);
    setSaved(false);
    try {
      await api.patch(`/admin/themes/${activeTheme.slug}/quote`, { quote });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save quote', err);
    } finally {
      setSaving(false);
    }
  };

  const presets = [
    "Engineers turn dreams into reality, one blueprint at a time.",
    "Engineering is the closest thing to magic that exists in the world. — Elon Musk",
    "Cleanliness and order are not matters of instinct; they are matters of education, care, and dedication.",
    "Sanitation and housekeeping are the backbone of safety, health, and dignity in every workplace.",
    "Every clean room is a canvas of health, safety, and care for our workers and guests.",
  ];

  return (
    <div className="space-y-6">

      {/* Info card */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl border text-sm"
        style={{ background: `${accent}10`, borderColor: `${accent}30` }}
      >
        <span className="text-2xl shrink-0">💬</span>
        <div>
          <p className="font-semibold text-gray-800">Theme Quote Manager ({activeTheme?.name || 'Active Theme'})</p>
          <p className="text-gray-500 text-xs mt-0.5">
            This quote will appear at the header of the active theme (e.g. <strong>Engineering Day</strong> or <strong>Housekeeping Day</strong>).
          </p>
        </div>
      </div>

      {/* Textarea */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Custom Quote
        </label>
        <textarea
          value={quote}
          onChange={e => { setQuote(e.target.value); setSaved(false); }}
          rows={4}
          maxLength={300}
          placeholder="Type an inspiring quote for engineers…"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:border-transparent resize-none transition"
          style={{ focusRingColor: accent }}
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">{quote.length}/300 characters</span>
          <button
            onClick={() => setQuote('')}
            className="text-xs text-gray-400 hover:text-red-500 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Preset quotes */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Presets — click to use
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => { setQuote(p); setSaved(false); }}
              className="text-left text-xs p-3 rounded-xl border border-gray-100 hover:border-gray-300
                         bg-gray-50 hover:bg-white text-gray-600 hover:text-gray-900 transition line-clamp-2"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {quote && (
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-yellow-400 text-lg font-bold italic leading-relaxed">
            ❝ {quote} ❞
          </p>
          <p className="text-slate-500 text-xs mt-3 uppercase tracking-widest">
            — Preview on Engineering Day theme —
          </p>
        </div>
      )}

      {/* Save button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !activeTheme}
          className="px-6 py-2.5 rounded-full text-sm font-bold text-white shadow transition-all disabled:opacity-50"
          style={{ background: accent }}
        >
          {saving ? 'Saving…' : 'Save Quote'}
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
            ✅ Quote saved!
          </span>
        )}
        {!activeTheme && (
          <span className="text-xs text-gray-400">Activate a theme first.</span>
        )}
      </div>
    </div>
  );
};

/* ── Main AdminDashboard ────────────────────────────────────── */
const AdminDashboard = () => {
  const { logout, admin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [themes, setThemes] = useState([]);
  const [activeTheme, setActiveTheme] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const fetchThemes = async () => {
    try {
      const res = await api.get('/admin/themes');
      setThemes(res.data);
      const active = res.data.find(t => t.isActive);
      setActiveTheme(active);
    } catch (err) {
      console.error('Failed to fetch themes', err);
    }
  };

  useEffect(() => { fetchThemes(); }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const handleThemeChange = async (slug) => {
    try {
      await api.patch(`/admin/themes/${slug}/activate`);
      fetchThemes();
    } catch (err) {
      console.error('Failed to activate theme', err);
    }
  };

  const accent = activeTheme?.colorPalette?.primary || '#cc0000';

  const TABS = [
    { key: 'upload',  label: '📤  Upload Media' },
    { key: 'library', label: '🗂️  Media Library' },
    { key: 'quote',   label: '💬  Engineer\'s Quote' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ══ HEADER ══ */}
      <header className="bg-white shadow-xs border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <img src="/assets/kalees.jpg" alt="Kaleesuwari" className="h-10 object-contain" />
            <div className="hidden sm:block border-l border-gray-200 pl-4">
              <p className="text-sm font-bold text-gray-900 leading-tight">Kaleesuwari Refinery Pvt. Ltd.</p>
              <p className="text-xs text-gray-400">Admin Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5">
              <div className="w-6 h-6 bg-[#b80d28] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                {admin?.username?.charAt(0) || 'A'}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">{admin?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-[#b80d28] font-semibold text-xs px-4 py-2 rounded-full transition-colors border border-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ══ MAIN ══ */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Theme Selector */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-lg font-bold text-gray-900">Active Theme</h2>
          </div>
          <ThemeSelector
            themes={themes}
            activeThemeSlug={activeTheme?.slug}
            onThemeChange={handleThemeChange}
            accent={accent}
          />
        </section>

        {/* Tabs Card */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Tab bar */}
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 sm:flex-none px-6 py-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
                    activeTab === tab.key ? 'text-[#cc0000]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#cc0000]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6 sm:p-8">
              {activeTab === 'upload'  && <UploadForm themes={themes} activeThemeSlug={activeTheme?.slug} accent={accent} />}
              {activeTab === 'library' && <MediaLibrary themes={themes} accent={accent} />}
              {activeTab === 'quote'   && <QuoteManager activeTheme={activeTheme} accent={accent} />}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-8 py-5 border-t border-gray-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src="/assets/kalees.jpg" alt="Kaleesuwari" className="h-8 object-contain opacity-50" />
          <p className="text-xs text-gray-400 text-center">
            © 2026 Kaleesuwari Refinery Private Limited, Thoothukudi. Admin Panel — Engineer's Day Celebration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
