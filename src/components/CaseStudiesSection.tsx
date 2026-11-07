import React, { useState } from 'react';
import { CaseStudy } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { CaseStudyDetailModal } from './CaseStudyDetailModal.tsx';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  themeStyles: ThemeStyles;
  onSelectProjectForContact: (client: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
  themeStyles,
  onSelectProjectForContact,
}) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              Proof of Impact & Production Work
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              Proven business outcomes across market leaders
            </h2>
          </div>
          <p className={`text-sm max-w-md ${themeStyles.textSecondary}`}>
            Every project is engineered with quantified KPIs from day one. Here is how our architecture translated into measurable commercial velocity.
          </p>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedCase(study)}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer group flex flex-col justify-between ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-500/60`}
            >
              {/* Media Slot */}
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

              {/* Body */}
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
      </div>

      <CaseStudyDetailModal
        caseStudy={selectedCase}
        themeStyles={themeStyles}
        onClose={() => setSelectedCase(null)}
        onSelectProject={onSelectProjectForContact}
      />
    </section>
  );
};
