import React from 'react';
import { CaseStudy } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  themeStyles: ThemeStyles;
  onClose: () => void;
  onSelectProject: (clientName: string) => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  caseStudy,
  themeStyles,
  onClose,
  onSelectProject,
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 relative shadow-2xl ${themeStyles.surface} ${themeStyles.border} ${themeStyles.textPrimary}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-lg border text-sm transition-colors ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textSecondary} hover:text-white`}
          aria-label="Close case study"
        >
          ✕
        </button>

        {/* Metadata Line */}
        <div className="flex items-center gap-3 text-xs mb-3 text-neutral-400">
          <span>{caseStudy.client}</span>
          <span aria-hidden="true">·</span>
          <span>{caseStudy.category}</span>
          <span aria-hidden="true">·</span>
          <span>Delivered {caseStudy.year}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-4">
          {caseStudy.title}
        </h2>

        {/* Highlight Metric Banner */}
        <div className={`p-4 rounded-xl border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${themeStyles.surfaceAlt} ${themeStyles.border}`}>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white tabular-nums">
              {caseStudy.metric}
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              {caseStudy.metricLabel}
            </div>
          </div>
          <button
            onClick={() => {
              onSelectProject(caseStudy.client);
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg self-start sm:self-auto transition-colors ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
          >
            Request Similar Scope
          </button>
        </div>

        {/* Image */}
        <div className={`rounded-xl overflow-hidden border mb-6 aspect-video bg-neutral-900 ${themeStyles.border}`}>
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Narrative Breakdown */}
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="font-semibold text-neutral-200 mb-2 font-display uppercase tracking-wider text-xs">
              Executive Summary
            </h4>
            <p className={`leading-relaxed ${themeStyles.textSecondary}`}>
              {caseStudy.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <h4 className="font-semibold text-neutral-200 mb-2 font-display uppercase tracking-wider text-xs">
                The Core Challenge
              </h4>
              <p className={`leading-relaxed text-xs sm:text-sm ${themeStyles.textSecondary}`}>
                {caseStudy.challenge}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-200 mb-2 font-display uppercase tracking-wider text-xs">
                The Architectural Solution
              </h4>
              <p className={`leading-relaxed text-xs sm:text-sm ${themeStyles.textSecondary}`}>
                {caseStudy.solution}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <h4 className="font-semibold text-neutral-200 mb-3 font-display uppercase tracking-wider text-xs">
              Key Deliverables & Systems
            </h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.deliverables.map((del, dIdx) => (
                <span
                  key={dIdx}
                  className="px-3 py-1.5 rounded-lg border text-xs font-medium border-neutral-800 bg-neutral-900/60 text-neutral-300"
                >
                  {del}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
