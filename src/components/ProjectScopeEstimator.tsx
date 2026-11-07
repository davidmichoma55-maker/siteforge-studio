import React, { useState, useMemo } from 'react';
import { ThemeStyles } from '../utils/theme.ts';

interface ProjectScopeEstimatorProps {
  themeStyles: ThemeStyles;
  onApplyScopeToContact: (scopeSummary: {
    projectType: string;
    pageCount: number;
    timeline: string;
    addOns: string[];
    estimatedRange: string;
  }) => void;
}

export const ProjectScopeEstimator: React.FC<ProjectScopeEstimatorProps> = ({
  themeStyles,
  onApplyScopeToContact,
}) => {
  const [projectType, setProjectType] = useState<'flagship' | 'webapp' | 'ecommerce' | 'brand'>('flagship');
  const [pageCount, setPageCount] = useState<number>(3);
  const [timeline, setTimeline] = useState<'express' | 'standard' | 'deep'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'cms']);

  const addOnOptions = [
    { id: 'cms', label: 'Headless CMS Integration', price: 800, desc: 'Client editing for copy and media' },
    { id: 'seo', label: 'Technical SEO & OG Cards', price: 500, desc: 'Structured data, schema & rich cards' },
    { id: 'db', label: 'Authentication & Database Wiring', price: 1600, desc: 'User accounts, records & security rules' },
    { id: 'motion', label: 'Tactile Motion & 3D Interactive', price: 1200, desc: 'Fluid physics-based micro-interactions' },
    { id: 'i18n', label: 'Multi-Region Localization', price: 900, desc: 'Multi-language routing and currency' },
  ];

  const projectTypeConfig = {
    flagship: { label: 'High-Impact Flagship', base: 3200, perPage: 400 },
    webapp: { label: 'Interactive Web Application', base: 5800, perPage: 700 },
    ecommerce: { label: 'E-Commerce & Storefront', base: 4500, perPage: 550 },
    brand: { label: 'Brand & Portal System', base: 4000, perPage: 450 },
  };

  const timelineConfig = {
    express: { label: 'Sprint Express (14 Days)', multiplier: 1.25 },
    standard: { label: 'Standard Delivery (3-4 Weeks)', multiplier: 1.0 },
    deep: { label: 'Enterprise Deep Sprint (6-8 Weeks)', multiplier: 0.95 },
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const base = projectTypeConfig[projectType].base;
    const pageCost = (pageCount - 1) * projectTypeConfig[projectType].perPage;
    const addonCost = selectedAddons.reduce((sum, id) => {
      const match = addOnOptions.find((o) => o.id === id);
      return sum + (match ? match.price : 0);
    }, 0);

    const subtotal = (base + pageCost + addonCost) * timelineConfig[timeline].multiplier;
    const minEst = Math.round(subtotal * 0.95 / 100) * 100;
    const maxEst = Math.round(subtotal * 1.15 / 100) * 100;

    return {
      minEst,
      maxEst,
      displayRange: `$${minEst.toLocaleString()} – $${maxEst.toLocaleString()}`,
    };
  }, [projectType, pageCount, timeline, selectedAddons]);

  const handleApply = () => {
    onApplyScopeToContact({
      projectType: projectTypeConfig[projectType].label,
      pageCount,
      timeline: timelineConfig[timeline].label,
      addOns: selectedAddons.map((id) => addOnOptions.find((o) => o.id === id)?.label || id),
      estimatedRange: calculation.displayRange,
    });
  };

  return (
    <section id="estimator" className="py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              Transparent Investment Modeling
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              Interactive Website & Platform Scope Calculator
            </h2>
          </div>
          <p className={`text-sm max-w-md ${themeStyles.textSecondary}`}>
            Estimate your investment and expected timeline in real time. We operate on fixed-fee transparent sprints with zero surprise billing.
          </p>
        </div>

        {/* Calculator Body */}
        <div className={`rounded-2xl border p-8 lg:p-10 ${themeStyles.surface} ${themeStyles.border}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 cols: Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Project Type */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${themeStyles.textMuted}`}>
                  01. Select Project Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(projectTypeConfig) as Array<keyof typeof projectTypeConfig>).map((key) => {
                    const isSelected = projectType === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setProjectType(key)}
                        className={`p-4 rounded-xl border text-left transition-all duration-150 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 text-white shadow-sm'
                            : `${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textSecondary} hover:text-white hover:border-neutral-600`
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">{projectTypeConfig[key].label}</div>
                        <div className="text-xs text-neutral-400">From ${projectTypeConfig[key].base.toLocaleString()}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Page & View Count */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${themeStyles.textMuted}`}>
                    02. Scope Scale ({pageCount} {pageCount === 1 ? 'Core Page' : 'Custom Views / Pages'})
                  </label>
                  <span className="text-xs font-mono font-medium text-neutral-300 tabular-nums">
                    {pageCount} Views
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-neutral-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-2">
                  <span>1 (Single Page Flagship)</span>
                  <span>6 (Medium Platform)</span>
                  <span>12+ (Enterprise Platform)</span>
                </div>
              </div>

              {/* Step 3: Timeline Velocity */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${themeStyles.textMuted}`}>
                  03. Target Delivery Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(Object.keys(timelineConfig) as Array<keyof typeof timelineConfig>).map((key) => {
                    const isSelected = timeline === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTimeline(key)}
                        className={`p-3 rounded-xl border text-center transition-all duration-150 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : `${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textSecondary} hover:text-white`
                        }`}
                      >
                        <div className="font-semibold text-xs">{timelineConfig[key].label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Add-Ons */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${themeStyles.textMuted}`}>
                  04. Specialized Capabilities & Add-Ons
                </label>
                <div className="space-y-2">
                  {addOnOptions.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150 ${
                          checked
                            ? 'border-blue-500/80 bg-blue-500/5'
                            : `${themeStyles.border} ${themeStyles.surfaceAlt} hover:border-neutral-700`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddon(addon.id)}
                            className="rounded accent-blue-500 w-4 h-4"
                          />
                          <div>
                            <div className="text-xs font-semibold text-neutral-200">{addon.label}</div>
                            <div className="text-xs text-neutral-400">{addon.desc}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-neutral-300 shrink-0 tabular-nums">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Live Estimate Summary Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className={`rounded-xl border p-6 ${themeStyles.surfaceAlt} ${themeStyles.border} h-full flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Scope Breakdown
                    </span>
                    <span className="text-xs font-mono text-neutral-400">Fixed-Fee Sprint</span>
                  </div>

                  <div className="py-4 space-y-3 text-xs">
                    <div className="flex justify-between text-neutral-300">
                      <span>Base Architecture</span>
                      <span className="font-semibold">{projectTypeConfig[projectType].label}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Included Views</span>
                      <span className="font-semibold">{pageCount} Viewports</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Delivery Velocity</span>
                      <span className="font-semibold">{timelineConfig[timeline].label}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Active Capabilities</span>
                      <span className="font-semibold">{selectedAddons.length} Selected</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">
                      Estimated Investment Range (USD)
                    </span>
                    <div className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight tabular-nums">
                      {calculation.displayRange}
                    </div>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      Includes full code repository ownership, responsive styling, design system tokens, and 14 days of post-launch stabilization support.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800">
                  <button
                    onClick={handleApply}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-150 text-center shadow-lg ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
                  >
                    Lock Scope & Inquire with this Estimate →
                  </button>
                  <p className="text-center text-[11px] text-neutral-500 mt-2">
                    Zero obligation · Discovery call scheduled within 24h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
