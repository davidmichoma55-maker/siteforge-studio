import React, { useState } from 'react';
import { SiteConfig, PageId } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ProjectScopeEstimator } from '../components/ProjectScopeEstimator.tsx';
import { FaqSection } from '../components/FaqSection.tsx';

interface PricingPageProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId, data?: any) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  siteConfig,
  themeStyles,
  onNavigate,
}) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const comparisonRows = [
    { feature: 'Core Target Platform', sprint: 'Single-Page Flagship', growth: 'Up to 8 Custom Pages', enterprise: 'Unlimited Full App' },
    { feature: 'Figma Design System & Tokens', sprint: 'Essential Tokens', growth: 'Full Token Library', enterprise: 'Bespoke Multi-Brand' },
    { feature: 'Interactive Scope / Pricing Engine', sprint: 'Standard Widget', growth: 'Custom Logic & Math', enterprise: 'Full ERP / Stripe Sync' },
    { feature: 'Database & Auth Integration', sprint: '—', growth: 'Supabase / Firebase / Cloud SQL', enterprise: 'Custom RBAC & Multi-tenant' },
    { feature: 'Core Web Vitals SLA Guarantee', sprint: 'Green 90+ Score', growth: 'Green 95+ Score', enterprise: 'Sub-300ms SLA & Monitoring' },
    { feature: 'Dedicated Sprint Velocity', sprint: '10 Business Days', growth: '20 Business Days', enterprise: 'Embedded Sprint Team' },
    { feature: 'Post-Launch Warranty', sprint: '14 Days Bug-Free', growth: '30 Days Bug-Free', enterprise: '90 Days & Ongoing SLA' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">
      {/* Header */}
      <div>
        <Breadcrumbs
          currentPage="pricing"
          pageTitle="Pricing & Scope Calculator"
          themeStyles={themeStyles}
          onNavigate={onNavigate}
        />
        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
          Transparent Fixed-Fee Architecture
        </div>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
          Predictable Pricing with Zero Scope Creep
        </h1>
        <p className={`text-base sm:text-lg max-w-3xl leading-relaxed ${themeStyles.textSecondary}`}>
          We operate exclusively on fixed-fee sprint commitments and transparent quarterly retainers. You know exactly what will be delivered, when it launches, and the exact dollar investment required.
        </p>
      </div>

      {/* Scope Calculator Tool */}
      <ProjectScopeEstimator
        themeStyles={themeStyles}
        onApplyScopeToContact={(scopeSummary) =>
          onNavigate('contact', { scopeSummary })
        }
      />

      {/* Pricing Sprints Grid */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              Studio Sprint Tiers
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Select a package to launch your production sprint or book a discovery consultation.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-xl border bg-neutral-900 border-neutral-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                !isAnnual ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              One-Off Sprint
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isAnnual ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Quarterly Retainer (-15%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.pricingPlans.map((plan) => {
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
                  <h3 className={`text-lg font-bold font-display mb-1 ${themeStyles.textPrimary}`}>
                    {plan.name}
                  </h3>
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

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Deliverables Matrix:
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
                  onClick={() => onNavigate('contact', { project: `Plan: ${plan.name}` })}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
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
      </section>

      {/* Feature Comparison Table */}
      <section className={`rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border} overflow-x-auto`}>
        <h3 className="text-xl font-bold font-display text-white mb-6">
          Detailed Deliverables Comparison
        </h3>

        <table className="w-full text-xs text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 w-1/3">Technical Capability</th>
              <th className="pb-3 w-1/5">Sprint Flagship</th>
              <th className="pb-3 w-1/5 text-blue-400">Growth Platform</th>
              <th className="pb-3 w-1/5">Custom Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {comparisonRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-neutral-800/30 transition-colors">
                <td className="py-3.5 font-medium text-white">{row.feature}</td>
                <td className="py-3.5 text-neutral-300">{row.sprint}</td>
                <td className="py-3.5 text-blue-300 font-medium">{row.growth}</td>
                <td className="py-3.5 text-neutral-300">{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Performance & Warranty Guarantee Banner */}
      <section className="rounded-2xl border border-emerald-900/50 bg-gradient-to-r from-emerald-950/40 via-neutral-900/80 to-neutral-950 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-2">
            <span>🛡</span>
            <span>THE 100% STUDIO WARRANTY</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-2">
            Guaranteed Green Core Web Vitals (95+ score)
          </h3>
          <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
            If your flagship platform fails to achieve green Core Web Vitals on desktop and mobile upon deployment, our engineers work without fee until it does. All code comes with 30 days of complimentary stabilization warranty.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact', { project: 'Guaranteed Sprint Inquiry' })}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-500 text-neutral-950 hover:bg-emerald-400 transition-colors shrink-0 cursor-pointer shadow-md"
        >
          Book Guaranteed Sprint →
        </button>
      </section>

      {/* FAQ Accordion */}
      <FaqSection faqs={siteConfig.faqs} themeStyles={themeStyles} />
    </div>
  );
};
