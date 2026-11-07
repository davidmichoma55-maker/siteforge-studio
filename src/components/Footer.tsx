import React from 'react';
import { PageId } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface FooterProps {
  brandName: string;
  brandTagline: string;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandName,
  brandTagline,
  themeStyles,
  onNavigate,
}) => {
  return (
    <footer className={`border-t py-14 transition-colors duration-200 ${themeStyles.border} ${themeStyles.bg}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-5">
            <button
              onClick={() => onNavigate('home')}
              className={`text-lg font-bold font-display tracking-tight block mb-2 text-left cursor-pointer ${themeStyles.textPrimary}`}
            >
              {brandName}
            </button>
            <p className={`text-xs max-w-sm leading-relaxed mb-4 ${themeStyles.textSecondary}`}>
              {brandTagline}. Crafting high-converting digital flagships, responsive web applications, and resilient technical foundations.
            </p>
            <div className={`text-[11px] ${themeStyles.textMuted}`}>
              London (King's Cross) · Zurich (Technopark) · Remote Global Engineering
            </div>
          </div>

          {/* Site Navigation mirror */}
          <div className="md:col-span-3">
            <span className={`text-xs font-semibold uppercase tracking-wider block mb-3 ${themeStyles.textMuted}`}>
              Pages
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className={`${themeStyles.textSecondary} hover:text-white transition-colors cursor-pointer`}
                >
                  Overview & Flagship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className={`${themeStyles.textSecondary} hover:text-white transition-colors cursor-pointer`}
                >
                  Services & Disciplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className={`${themeStyles.textSecondary} hover:text-white transition-colors cursor-pointer`}
                >
                  Case Studies & Metrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className={`${themeStyles.textSecondary} hover:text-white transition-colors cursor-pointer`}
                >
                  About Studio & Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className={`${themeStyles.textSecondary} hover:text-white transition-colors cursor-pointer`}
                >
                  Scope Calculator & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className={`${themeStyles.textSecondary} hover:text-white transition-colors cursor-pointer`}
                >
                  Initiate Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Practices */}
          <div className="md:col-span-4">
            <span className={`text-xs font-semibold uppercase tracking-wider block mb-3 ${themeStyles.textMuted}`}>
              Studio Principles
            </span>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>· 100% Core Web Vitals guarantee (Green 95+ score)</li>
              <li>· Pure semantic HTML & WCAG AA contrast compliance</li>
              <li>· Full source code repository ownership transfer</li>
              <li>· Zero third-party tracker bloat or telemetry</li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${themeStyles.border} ${themeStyles.textMuted}`}>
          <div>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Engineering Ethos
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Warranty & SLA
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Direct Office Lines
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
