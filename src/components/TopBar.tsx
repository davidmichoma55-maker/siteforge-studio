import React from 'react';
import { PageId } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface TopBarProps {
  brandName: string;
  themeStyles: ThemeStyles;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenStudio?: () => void;
  isStudioOpen?: boolean;
  onOpenCommandPalette?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  brandName,
  themeStyles,
  currentPage,
  onNavigate,
  onOpenStudio,
  isStudioOpen,
  onOpenCommandPalette,
}) => {
  const navItems: Array<{ id: PageId; label: string }> = [
    { id: 'home', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Case Studies' },
    { id: 'about', label: 'About Studio' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 ${themeStyles.border} ${themeStyles.bg}/90`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className={`text-lg font-bold tracking-tight whitespace-nowrap shrink-0 font-display text-left cursor-pointer ${themeStyles.textPrimary}`}
        >
          {brandName}
        </button>

        {/* Zone 2: 4–5 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer relative py-1 ${
                  isActive
                    ? `${themeStyles.textPrimary} font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500`
                    : `${themeStyles.textSecondary} hover:text-white`
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open command palette search (Cmd+K)"
              className={`hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${themeStyles.surface} ${themeStyles.textSecondary} ${themeStyles.border} hover:text-white hover:border-neutral-600`}
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-400 border border-neutral-700">⌘K</kbd>
            </button>
          )}
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              aria-label="Toggle site builder studio mode"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isStudioOpen
                  ? 'bg-blue-600 text-white border-blue-500'
                  : `${themeStyles.surface} ${themeStyles.textSecondary} ${themeStyles.border} hover:text-white`
              }`}
            >
              <span>{isStudioOpen ? 'Studio Mode Active' : 'Customize Website'}</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('contact')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : `${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`
            }`}
          >
            Start Project
          </button>
        </div>
      </div>
    </header>
  );
};
