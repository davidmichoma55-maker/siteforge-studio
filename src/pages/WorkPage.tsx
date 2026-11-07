import React, { useState } from 'react';
import { SiteConfig, PageId, CaseStudy } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { CaseStudyDetailModal } from '../components/CaseStudyDetailModal.tsx';

interface WorkPageProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId, data?: any) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  siteConfig,
  themeStyles,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'fintech' | 'hardware' | 'saas' | 'brand'>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredStudies = filter === 'all'
    ? siteConfig.caseStudies
    : siteConfig.caseStudies.filter((c) => c.industry === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Header */}
      <div>
        <Breadcrumbs
          currentPage="work"
          pageTitle="Case Studies & Work"
          themeStyles={themeStyles}
          onNavigate={onNavigate}
        />
        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
          Proven Engineering Track Record
        </div>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
          Production Work & Quantified Business Outcomes
        </h1>
        <p className={`text-base sm:text-lg max-w-3xl leading-relaxed ${themeStyles.textSecondary}`}>
          We hold ourselves to mathematical standards. Every case study below is documented with verified commercial metrics, engineering constraints, and architectural solutions.
        </p>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'fintech', label: 'Fintech & Assets' },
            { id: 'hardware', label: 'Industrial & Hardware' },
            { id: 'saas', label: 'Developer Infrastructure' },
            { id: 'brand', label: 'Luxury & Commerce' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === tab.id
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-neutral-400">
          Showing <span className="font-semibold text-white">{filteredStudies.length}</span> verified platforms
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            onClick={() => setSelectedCase(study)}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer group flex flex-col justify-between ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-500/70`}
          >
            {/* Visual Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border-b border-neutral-800">
              <img
                src={study.image}
                alt={study.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md text-xs font-medium bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {study.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                  <span className="font-semibold text-neutral-300">{study.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.year}</span>
                </div>
                <h3 className={`text-xl font-bold font-display tracking-tight mb-3 ${themeStyles.textPrimary}`}>
                  {study.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 line-clamp-2 ${themeStyles.textSecondary}`}>
                  {study.summary}
                </p>
              </div>

              {/* Quantified Metric Strip & Action */}
              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold font-display tracking-tight text-white tabular-nums">
                    {study.metric}
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">
                    {study.metricLabel}
                  </div>
                </div>

                <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1">
                  Inspect Architecture →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Highlight Testimonial */}
      <section className={`rounded-2xl border p-8 lg:p-10 ${themeStyles.surface} ${themeStyles.border}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
            Client Verification
          </div>
          <blockquote className="text-base sm:text-lg italic leading-relaxed text-neutral-200 mb-6">
            "{siteConfig.testimonials[2]?.quote || siteConfig.testimonials[0]?.quote}"
          </blockquote>
          <div className="font-bold text-sm text-white font-display">
            {siteConfig.testimonials[2]?.author || siteConfig.testimonials[0]?.author}
          </div>
          <div className="text-xs text-neutral-400">
            {siteConfig.testimonials[2]?.role || siteConfig.testimonials[0]?.role} · {siteConfig.testimonials[2]?.company || siteConfig.testimonials[0]?.company}
          </div>
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
