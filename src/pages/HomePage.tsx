import React, { useState } from 'react';
import { SiteConfig, PageId, CaseStudy } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { CaseStudyDetailModal } from '../components/CaseStudyDetailModal.tsx';

interface HomePageProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId, data?: any) => void;
  onUpdateHeroTitle?: (val: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  siteConfig,
  themeStyles,
  onNavigate,
  onUpdateHeroTitle,
}) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [imageError, setImageError] = useState(false);
  const hero = siteConfig.hero;

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative pt-6 pb-8 lg:pt-12 lg:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Clean unboxed editorial kicker */}
              <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${themeStyles.textMuted}`}>
                {hero.eyebrow}
              </div>

              <h1
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', lineHeight: 1.15 }}
                className={`font-bold tracking-tight font-display mb-6 [text-wrap:balance] ${themeStyles.textPrimary}`}
              >
                {hero.title}
              </h1>

              <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-2xl ${themeStyles.textSecondary}`}>
                {hero.description}
              </p>

              {/* Action Group */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('pricing')}
                  className={`px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-150 shadow-sm whitespace-nowrap shrink-0 cursor-pointer ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
                >
                  {hero.primaryCtaLabel}
                </button>

                <button
                  onClick={() => onNavigate('work')}
                  className={`px-5 py-3 text-sm font-medium rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${themeStyles.border} ${themeStyles.surface} ${themeStyles.textPrimary} hover:border-neutral-500`}
                >
                  {hero.secondaryCtaLabel}
                </button>
              </div>
            </div>

            {/* Right Column: Visual Asset */}
            <div className="lg:col-span-5">
              <div className={`relative rounded-2xl overflow-hidden border ${themeStyles.border} aspect-[16/10] shadow-2xl bg-neutral-900`}>
                {!imageError ? (
                  <img
                    src={hero.image}
                    alt="Creative engineering studio interior"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-900 text-neutral-300">
                    <span className="font-display font-bold text-lg">{siteConfig.brandName}</span>
                    <span className="text-xs text-neutral-500 mt-1">Design Engineering Studio</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Full-width KPI and Proof Strip */}
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

      {/* Featured Services Preview Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              What We Build
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              End-to-end disciplines for digital platforms
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer self-start md:self-auto"
          >
            Explore All 5 Disciplines & Stack →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {siteConfig.capabilities.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-8 flex flex-col justify-between ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-500/50 transition-colors`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono text-neutral-400`}>{item.num}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${themeStyles.tagBg}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className={`text-xl font-bold font-display mb-3 ${themeStyles.textPrimary}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${themeStyles.textSecondary}`}>
                  {item.desc}
                </p>
              </div>

              <ul className="space-y-2 pt-4 border-t border-neutral-800/60">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx} className={`text-xs flex items-center gap-2 ${themeStyles.textSecondary}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Marquee Work Spotlight */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              Marquee Production Work
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              Proven impact on real market pipelines
            </h2>
          </div>
          <button
            onClick={() => onNavigate('work')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer self-start md:self-auto"
          >
            View Complete Case Studies Gallery →
          </button>
        </div>

        {/* Highlight Card */}
        {siteConfig.caseStudies[0] && (
          <div
            onClick={() => setSelectedCase(siteConfig.caseStudies[0])}
            className={`rounded-2xl border overflow-hidden cursor-pointer group ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-500/70 transition-all`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 aspect-video lg:aspect-auto relative bg-neutral-900 overflow-hidden">
                <img
                  src={siteConfig.caseStudies[0].image}
                  alt={siteConfig.caseStudies[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                    <span className="font-semibold text-neutral-300">{siteConfig.caseStudies[0].client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{siteConfig.caseStudies[0].category}</span>
                  </div>
                  <h3 className={`text-2xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
                    {siteConfig.caseStudies[0].title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${themeStyles.textSecondary}`}>
                    {siteConfig.caseStudies[0].summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold font-display text-white tabular-nums">
                      {siteConfig.caseStudies[0].metric}
                    </div>
                    <div className="text-xs text-neutral-400 font-medium">
                      {siteConfig.caseStudies[0].metricLabel}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    Inspect Architecture →
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Scope Calculator Teaser Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className={`rounded-2xl border p-8 lg:p-12 relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-neutral-900/60 to-neutral-950 border-blue-900/40`}>
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Transparent Fixed-Fee Sprints
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold font-display tracking-tight text-white mb-4">
              Estimate your project investment in seconds
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              Use our interactive pricing and scope calculator to model views, velocity, and specialized engineering modules with zero surprise billing.
            </p>
            <button
              onClick={() => onNavigate('pricing')}
              className={`px-5 py-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
            >
              Open Interactive Scope Calculator →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
            Engineering Leader Endorsements
          </div>
          <h2 className={`text-3xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
            What CTOs and founders say about our work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.testimonials.slice(0, 2).map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border p-8 flex flex-col justify-between ${themeStyles.surface} ${themeStyles.border}`}
            >
              <div className="mb-6">
                <span className="inline-block mb-3 px-2 py-0.5 rounded text-xs font-semibold font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {t.impactMetric}
                </span>
                <blockquote className={`text-sm leading-relaxed italic ${themeStyles.textSecondary}`}>
                  "{t.quote}"
                </blockquote>
              </div>
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">{t.author}</div>
                  <div className="text-xs text-neutral-400">{t.role} · {t.company}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center text-xs font-mono font-bold text-neutral-300">
                  {t.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <CaseStudyDetailModal
        caseStudy={selectedCase}
        themeStyles={themeStyles}
        onClose={() => setSelectedCase(null)}
        onSelectProject={(client) => onNavigate('contact', { project: `Case Study: ${client}` })}
      />
    </div>
  );
};
