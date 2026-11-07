import React, { useState } from 'react';
import { PricingPlan } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  themeStyles: ThemeStyles;
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
  themeStyles,
  onSelectPlan,
}) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              Predictable Retainers & Sprint Pricing
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              Clear, transparent engineering investment
            </h2>
          </div>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-xl border bg-neutral-900 border-neutral-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                !isAnnual ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Standard Sprint
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isAnnual ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Quarterly Retainer (-15%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-8 flex flex-col justify-between relative transition-all duration-200 ${
                  isPopular
                    ? 'border-blue-500/80 bg-neutral-900 shadow-xl'
                    : `${themeStyles.surface} ${themeStyles.border} hover:border-neutral-700`
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-8">
                    <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-blue-600 text-white shadow-sm">
                      Most Requested
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg font-bold font-display ${themeStyles.textPrimary}`}>
                      {plan.name}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 ${themeStyles.textSecondary}`}>
                    {plan.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl lg:text-4xl font-bold font-display tracking-tight text-white tabular-nums">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {isAnnual ? '/mo billed quarterly' : '/one-off sprint'}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      What is included:
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <span className="text-blue-400 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                    isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
                      : `${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
