import React, { useState } from 'react';
import { CapabilityItem } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface CapabilitiesBentoProps {
  capabilities: CapabilityItem[];
  themeStyles: ThemeStyles;
}

export const CapabilitiesBento: React.FC<CapabilitiesBentoProps> = ({
  capabilities,
  themeStyles,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="capabilities" className="py-20 border-t transition-colors duration-200" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              Disciplines & Technical Scope
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              End-to-end design engineering for web products
            </h2>
          </div>
          <p className={`text-sm max-w-md ${themeStyles.textSecondary}`}>
            We bridge the gap between creative visual architecture and hardened systems engineering, eliminating handoff friction and technical debt.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const hasImage = Boolean(item.image);
            const isErrored = imageErrors[item.id];

            return (
              <div
                key={item.id}
                className={`${item.colSpan} rounded-2xl border transition-all duration-200 p-8 flex flex-col justify-between overflow-hidden relative group ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-500/50`}
              >
                {/* Top Row: Editorial Index & Tag */}
                <div className="flex items-center justify-between gap-4 mb-6 z-10">
                  <span className={`text-xs font-mono font-medium tracking-wider ${themeStyles.textMuted}`}>
                    {item.num}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${themeStyles.tagBg}`}>
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="z-10 mb-6">
                  <h3 className={`text-xl font-bold font-display mb-3 tracking-tight ${themeStyles.textPrimary}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${themeStyles.textSecondary}`}>
                    {item.desc}
                  </p>

                  {/* Bullet features list */}
                  <ul className="space-y-2">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className={`text-xs flex items-center gap-2 ${themeStyles.textSecondary}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional visual asset slot for Bento Card */}
                {hasImage && (
                  <div className={`mt-4 rounded-xl overflow-hidden border ${themeStyles.border} h-48 relative bg-neutral-900`}>
                    {!isErrored ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-xs text-neutral-400">
                        <span>{item.title} Asset Showcase</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
