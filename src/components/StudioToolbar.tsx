import React, { useState } from 'react';
import { SiteConfig, ThemeMode, TemplateId, DeviceViewport, PageId, PageSeoMetadata } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface StudioToolbarProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  currentPage: PageId;
  viewport: DeviceViewport;
  onNavigate: (page: PageId) => void;
  onSetViewport: (vp: DeviceViewport) => void;
  onUpdateConfig: (updater: (prev: SiteConfig) => SiteConfig) => void;
  onSelectTemplate: (template: TemplateId) => void;
  onOpenExport: () => void;
  onCloseStudio: () => void;
  onOpenAnalytics?: () => void;
  telemetryCount?: number;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  siteConfig,
  currentPage,
  viewport,
  onNavigate,
  onSetViewport,
  onUpdateConfig,
  onSelectTemplate,
  onOpenExport,
  onCloseStudio,
  onOpenAnalytics,
  telemetryCount = 0,
}) => {
  // State for which page's SEO is currently being edited in the toolbar
  const [editingSeoPage, setEditingSeoPage] = useState<PageId>(currentPage);
  const [showSerpPreview, setShowSerpPreview] = useState(true);

  const pages: Array<{ id: PageId; label: string; desc: string }> = [
    { id: 'home', label: 'Home Flagship', desc: 'Hero, Proof Strip, Featured Case' },
    { id: 'services', label: 'Services & Stack', desc: '5 Disciplines & Methodology' },
    { id: 'work', label: 'Case Studies', desc: 'Filterable Projects & Metrics' },
    { id: 'about', label: 'About Studio', desc: 'Manifesto, Team & Locations' },
    { id: 'pricing', label: 'Pricing & Scope', desc: 'Interactive Estimator & Sprints' },
    { id: 'contact', label: 'Project Inquiry', desc: 'Scoping Brief & Direct Lines' },
  ];

  const themes: Array<{ id: ThemeMode; label: string; swatch: string }> = [
    { id: 'obsidian', label: 'Obsidian Dark', swatch: 'bg-neutral-900 border-neutral-700' },
    { id: 'light', label: 'Clean Light', swatch: 'bg-white border-neutral-300' },
    { id: 'cobalt', label: 'Cobalt Tech', swatch: 'bg-blue-950 border-blue-600' },
    { id: 'luxury', label: 'Luxury Stone', swatch: 'bg-stone-900 border-amber-500' },
    { id: 'emerald', label: 'Emerald Forest', swatch: 'bg-emerald-950 border-emerald-500' },
  ];

  const templates: Array<{ id: TemplateId; label: string }> = [
    { id: 'agency', label: 'Creative Studio' },
    { id: 'saas', label: 'SaaS Platform' },
    { id: 'hardware', label: 'Industrial Hardware' },
    { id: 'consulting', label: 'Strategic Advisory' },
  ];

  // Current page SEO object (guaranteed fallback if not yet initialized)
  const currentSeo: PageSeoMetadata = siteConfig.seo?.[editingSeoPage] || {
    title: `${siteConfig.brandName} – ${editingSeoPage.toUpperCase()}`,
    description: `${siteConfig.brandName} high-performance web platform.`,
    keywords: 'web engineering, design systems',
  };

  const handleUpdateSeo = (field: keyof PageSeoMetadata, value: string) => {
    onUpdateConfig((prev) => {
      const existingSeo = prev.seo || {};
      const targetPageSeo = existingSeo[editingSeoPage] || {
        title: `${prev.brandName} – ${editingSeoPage.toUpperCase()}`,
        description: `${prev.brandName} web engineering.`,
        keywords: '',
      };

      return {
        ...prev,
        seo: {
          ...existingSeo,
          [editingSeoPage]: {
            ...targetPageSeo,
            [field]: value,
          },
        },
      };
    });
  };

  const handleApplyTemplateTitle = () => {
    const defaultPattern = `${pages.find((p) => p.id === editingSeoPage)?.label} · ${siteConfig.brandName} – ${siteConfig.brandTagline}`;
    handleUpdateSeo('title', defaultPattern);
  };

  // Helper for title character count status
  const titleLen = currentSeo.title.length;
  const isTitleOptimal = titleLen >= 30 && titleLen <= 60;
  const titleStatusText = titleLen < 30 ? 'Too short (<30)' : titleLen > 60 ? 'Too long (>60)' : 'Optimal (30–60)';
  const titleStatusColor = isTitleOptimal
    ? 'text-emerald-400'
    : titleLen > 60
    ? 'text-amber-400'
    : 'text-neutral-400';

  // Helper for description character count status
  const descLen = currentSeo.description.length;
  const isDescOptimal = descLen >= 120 && descLen <= 160;
  const descStatusText = descLen < 120 ? 'Short (<120)' : descLen > 160 ? 'Too long (>160)' : 'Optimal (120–160)';
  const descStatusColor = isDescOptimal
    ? 'text-emerald-400'
    : descLen > 160
    ? 'text-amber-400'
    : 'text-neutral-400';

  return (
    <aside
      className="w-80 shrink-0 border-l flex flex-col justify-between h-full bg-neutral-950 border-neutral-800 text-neutral-100 p-5 overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              SiteForge Studio
            </div>
            <div className="text-[11px] text-neutral-400">
              Multi-Page Customizer & SEO
            </div>
          </div>
          <button
            onClick={onCloseStudio}
            className="p-1.5 text-xs text-neutral-400 hover:text-white rounded border border-neutral-800 cursor-pointer"
            title="Minimize Studio Toolbar"
          >
            ✕
          </button>
        </div>

        {/* Backend Analytics Quick Launcher */}
        {onOpenAnalytics && (
          <button
            onClick={onOpenAnalytics}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-950/40 border border-blue-800/60 hover:bg-blue-900/50 text-blue-300 hover:text-white transition flex items-center justify-between text-xs cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-neutral-200 group-hover:text-white">
                Backend Telemetry
              </span>
            </div>
            <span className="font-mono text-[10px] bg-blue-900/70 border border-blue-700/60 px-2 py-0.5 rounded text-blue-200">
              {telemetryCount} events
            </span>
          </button>
        )}

        {/* Quick Page Navigator */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-2">
            Active Website Page
          </label>
          <div className="space-y-1.5">
            {pages.map((p) => {
              const isActive = currentPage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    onNavigate(p.id);
                    setEditingSeoPage(p.id);
                  }}
                  className={`w-full p-2 rounded-lg border text-left transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'border-blue-500 bg-blue-500/10 text-white font-medium'
                      : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">{p.label}</div>
                    <div className="text-[10px] text-neutral-500">{p.desc}</div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    /{p.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SEO Settings Section */}
        <div className="p-4 rounded-xl border border-blue-900/40 bg-gradient-to-b from-blue-950/20 to-neutral-900/60 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400">SEO</span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                SEO Settings
              </span>
            </div>
            <button
              onClick={() => setShowSerpPreview(!showSerpPreview)}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
            >
              {showSerpPreview ? 'Hide Preview' : 'Show SERP'}
            </button>
          </div>

          {/* Page Target Selector for SEO */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-neutral-300">
                Configure SEO For Page:
              </label>
              {editingSeoPage !== currentPage && (
                <button
                  onClick={() => setEditingSeoPage(currentPage)}
                  className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                >
                  Sync to current (/{currentPage})
                </button>
              )}
            </div>
            <select
              value={editingSeoPage}
              onChange={(e) => setEditingSeoPage(e.target.value as PageId)}
              className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} (/{p.id})
                </option>
              ))}
            </select>
          </div>

          {/* Meta Title Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-300">
                Meta Title (<span className="font-mono text-[10px]">&lt;title&gt;</span>)
              </label>
              <span className={`text-[10px] font-mono ${titleStatusColor}`}>
                {titleLen}/60 · {titleStatusText}
              </span>
            </div>
            <input
              type="text"
              value={currentSeo.title}
              onChange={(e) => handleUpdateSeo('title', e.target.value)}
              placeholder="e.g. Veloce Studio – Bespoke Web Engineering"
              className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleApplyTemplateTitle}
              className="mt-1 text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Generate from Brand Pattern ⚡
            </button>
          </div>

          {/* Meta Description Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-300">
                Meta Description
              </label>
              <span className={`text-[10px] font-mono ${descStatusColor}`}>
                {descLen}/160 · {descStatusText}
              </span>
            </div>
            <textarea
              rows={3}
              value={currentSeo.description}
              onChange={(e) => handleUpdateSeo('description', e.target.value)}
              placeholder="1–2 compelling sentences summarizing the core value proposition..."
              className="w-full p-2.5 text-xs rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          {/* Keywords / Search Query */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
              Target Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={currentSeo.keywords || ''}
              onChange={(e) => handleUpdateSeo('keywords', e.target.value)}
              placeholder="e.g. design engineering, react 19, web performance"
              className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Google Search Snippet Preview */}
          {showSerpPreview && (
            <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 mb-1 flex items-center justify-between">
                <span>Google SERP Preview</span>
                <span className="text-emerald-500 font-sans font-normal">● Live</span>
              </div>
              <div className="text-[10px] text-neutral-400 truncate font-mono">
                https://{siteConfig.brandName.toLowerCase().replace(/\s+/g, '')}.build › {editingSeoPage}
              </div>
              <div className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer line-clamp-1 leading-snug">
                {currentSeo.title || `${siteConfig.brandName} – ${editingSeoPage}`}
              </div>
              <div className="text-[11px] text-neutral-400 line-clamp-2 leading-tight">
                {currentSeo.description || 'Provide a compelling description for optimal search engine click-through rate.'}
              </div>
            </div>
          )}
        </div>

        {/* Responsive Viewport Switcher */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-2">
            Responsive Viewport Simulation
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg border border-neutral-800 bg-neutral-900">
            <button
              onClick={() => onSetViewport('desktop')}
              className={`py-1.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewport === 'desktop' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => onSetViewport('tablet')}
              className={`py-1.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewport === 'tablet' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tablet (768)
            </button>
            <button
              onClick={() => onSetViewport('mobile')}
              className={`py-1.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewport === 'mobile' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mobile (390)
            </button>
          </div>
        </div>

        {/* Industry Template Switcher */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-2">
            Industry Template Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl.id)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                  siteConfig.templateId === tpl.id
                    ? 'border-blue-500 bg-blue-500/10 text-white font-medium'
                    : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Details */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-neutral-300">
            Brand Identity
          </label>
          <div>
            <span className="text-[11px] text-neutral-400 block mb-1">Brand Name</span>
            <input
              type="text"
              value={siteConfig.brandName}
              onChange={(e) =>
                onUpdateConfig((prev) => ({ ...prev, brandName: e.target.value }))
              }
              className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="text-[11px] text-neutral-400 block mb-1">Sub-Tagline</span>
            <input
              type="text"
              value={siteConfig.brandTagline}
              onChange={(e) =>
                onUpdateConfig((prev) => ({ ...prev, brandTagline: e.target.value }))
              }
              className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-2">
            Color Palette & Surface Tone
          </label>
          <div className="grid grid-cols-1 gap-2">
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() =>
                  onUpdateConfig((prev) => ({ ...prev, theme: th.id }))
                }
                className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs text-left transition-colors cursor-pointer ${
                  siteConfig.theme === th.id
                    ? 'border-blue-500 bg-blue-500/10 text-white font-medium'
                    : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border ${th.swatch}`} />
                <span>{th.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Export Action */}
      <div className="pt-6 mt-6 border-t border-neutral-800">
        <button
          onClick={onOpenExport}
          className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
        >
          Export Site Code & JSON →
        </button>
      </div>
    </aside>
  );
};
