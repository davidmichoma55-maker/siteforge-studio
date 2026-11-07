import React, { useState } from 'react';
import { HeroConfig } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface HeroSectionProps {
  hero: HeroConfig;
  themeStyles: ThemeStyles;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  isEditable?: boolean;
  onUpdateHeroTitle?: (val: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  themeStyles,
  onOpenEstimator,
  onOpenContact,
  isEditable,
  onUpdateHeroTitle,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Clean unboxed editorial kicker - NO PILL BADGES */}
            <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${themeStyles.textMuted}`}>
              {hero.eyebrow}
            </div>

            {/* Headline with clamp sizing and balance */}
            {isEditable ? (
              <div className="w-full mb-6">
                <label className="block text-xs font-mono text-blue-400 mb-1">Click to edit headline:</label>
                <textarea
                  value={hero.title}
                  onChange={(e) => onUpdateHeroTitle && onUpdateHeroTitle(e.target.value)}
                  rows={3}
                  className={`w-full p-3 text-2xl lg:text-3xl font-bold tracking-tight font-display rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.surface} ${themeStyles.border} ${themeStyles.textPrimary}`}
                />
              </div>
            ) : (
              <h1
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', lineHeight: 1.15 }}
                className={`font-bold tracking-tight font-display mb-6 [text-wrap:balance] ${themeStyles.textPrimary}`}
              >
                {hero.title}
              </h1>
            )}

            <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-2xl ${themeStyles.textSecondary}`}>
              {hero.description}
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenEstimator}
                className={`px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-150 shadow-sm whitespace-nowrap shrink-0 ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
              >
                {hero.primaryCtaLabel}
              </button>

              <button
                onClick={onOpenContact}
                className={`px-5 py-3 text-sm font-medium rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 ${themeStyles.border} ${themeStyles.surface} ${themeStyles.textPrimary} hover:border-neutral-500`}
              >
                {hero.secondaryCtaLabel}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Fallback */}
          <div className="lg:col-span-5">
            <div className={`relative rounded-2xl overflow-hidden border ${themeStyles.border} aspect-[16/10] shadow-2xl bg-neutral-900`}>
              {!imageError ? (
                <img
                  src={hero.image}
                  alt="Modern creative engineering studio and workspace"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-300">
                  <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center mb-3">
                    <span className="font-display font-bold text-lg">V</span>
                  </div>
                  <span className="font-semibold text-sm">Veloce Design Architecture</span>
                  <span className="text-xs text-neutral-500 mt-1">High-Precision Digital Craft</span>
                </div>
              )}
              {/* Subtle film grain or bottom shadow scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Full-width KPI and Proof Metrics Strip below the hero split */}
        <div className={`mt-16 pt-10 border-t grid grid-cols-1 md:grid-cols-3 gap-8 ${themeStyles.border}`}>
          {hero.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className={`text-3xl lg:text-4xl font-bold font-display tracking-tight tabular-nums mb-1 ${themeStyles.textPrimary}`}>
                {stat.value}
              </div>
              <div className={`text-sm font-semibold mb-1 ${themeStyles.textPrimary}`}>
                {stat.label}
              </div>
              <div className={`text-xs ${themeStyles.textMuted}`}>
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
