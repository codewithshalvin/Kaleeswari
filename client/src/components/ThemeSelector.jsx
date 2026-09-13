import React from 'react';

const ThemeSelector = ({ themes, activeThemeSlug, onThemeChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Theme Configuration</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => (
          <div
            key={theme.slug}
            onClick={() => onThemeChange(theme.slug)}
            className={`relative flex cursor-pointer rounded-xl px-5 py-4 shadow-sm focus:outline-none border-2 transition-all ${
              activeThemeSlug === theme.slug
                ? 'border-[#cc0000] ring-2 ring-[#cc0000]/20 bg-red-50/50'
                : 'border-gray-200 hover:border-red-200 bg-white'
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <p className={`font-bold ${activeThemeSlug === theme.slug ? 'text-[#cc0000]' : 'text-gray-900'}`}>
                    {theme.name}
                  </p>
                  <div className="mt-1.5 flex space-x-1.5">
                    <span className="block h-3.5 w-3.5 rounded-full shadow-xs" style={{ backgroundColor: theme.colorPalette.primary }}></span>
                    <span className="block h-3.5 w-3.5 rounded-full shadow-xs" style={{ backgroundColor: theme.colorPalette.accent }}></span>
                    <span className="block h-3.5 w-3.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: theme.colorPalette.background }}></span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-500 capitalize">{theme.layoutType} layout</p>
                </div>
              </div>
              {activeThemeSlug === theme.slug && (
                <div className="shrink-0 text-[#cc0000]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
