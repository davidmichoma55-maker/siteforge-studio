import React, { useState, useEffect } from 'react';
import { SiteConfig, PageId } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface ContactPageProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId) => void;
  preloadedData?: any;
  onTrackSubmit?: (data: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  siteConfig,
  themeStyles,
  onNavigate,
  preloadedData,
  onTrackSubmit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectCategory, setProjectCategory] = useState('High-Impact Web Flagship');
  const [budget, setBudget] = useState('$6k – $15k (Full Platform)');
  const [timeline, setTimeline] = useState('Within 30 Days');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preloadedData?.project) {
      setProjectCategory(preloadedData.project);
    }
    if (preloadedData?.scopeSummary) {
      setProjectCategory(preloadedData.scopeSummary.projectType);
      setMessage(
        `Pre-configured scope parameters:\n- Architecture: ${preloadedData.scopeSummary.projectType}\n- Scope Scale: ${preloadedData.scopeSummary.pageCount} Views\n- Delivery Velocity: ${preloadedData.scopeSummary.timeline}\n- Capabilities: ${preloadedData.scopeSummary.addOns.join(', ')}\n- Estimated Investment: ${preloadedData.scopeSummary.estimatedRange}`
      );
      setBudget(preloadedData.scopeSummary.estimatedRange);
    }
  }, [preloadedData]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim()) {
      errs.email = 'Please provide your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim()) errs.message = 'Please provide a brief outline of what you want to achieve.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const generatedId = `VF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefId(generatedId);
      setSubmitted(true);
      if (onTrackSubmit) {
        onTrackSubmit({
          refId: generatedId,
          name,
          email,
          company,
          projectCategory,
          budget,
          timeline,
          messagePreview: message.slice(0, 100),
        });
      }
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Header */}
      <div>
        <Breadcrumbs
          currentPage="contact"
          pageTitle="Initiate Project Discovery"
          themeStyles={themeStyles}
          onNavigate={onNavigate}
        />
        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
          Direct Engagement Brief
        </div>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
          Initiate Your Project Scoping Brief
        </h1>
        <p className={`text-base sm:text-lg max-w-3xl leading-relaxed ${themeStyles.textSecondary}`}>
          Submit your requirements to our technical partners. We review every brief personally and return with architectural recommendations, budget guidance, and sprint availability within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Inquiries Info & Studio Process */}
        <div className="lg:col-span-5 space-y-8">
          <div className={`rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border}`}>
            <h3 className="text-lg font-bold font-display text-white mb-4">
              Direct Contact Channels
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-neutral-400 block mb-1">Partnership Inquiries</span>
                <span className="font-mono text-blue-400 font-semibold text-sm">partnerships@veloce.build</span>
              </div>
              <div className="pt-3 border-t border-neutral-800">
                <span className="text-neutral-400 block mb-1">London Studio</span>
                <span className="text-neutral-200">King's Cross Tech Hub, York Way, London N1C 4AG</span>
              </div>
              <div className="pt-3 border-t border-neutral-800">
                <span className="text-neutral-400 block mb-1">Zurich Studio</span>
                <span className="text-neutral-200">Technoparkstrasse 1, 8005 Zürich, Switzerland</span>
              </div>
              <div className="pt-3 border-t border-neutral-800">
                <span className="text-neutral-400 block mb-1">Confidentiality Guarantee</span>
                <span className="text-neutral-300">
                  Standard mutual NDAs provided upon request before any sensitive codebase or business disclosure.
                </span>
              </div>
            </div>
          </div>

          {/* The 24h Discovery Timeline */}
          <div className={`rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border}`}>
            <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider mb-4">
              The 24-Hour Discovery Process
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-blue-400 shrink-0">00:00</span>
                <div>
                  <strong className="text-white block">Brief Ingestion</strong>
                  <span className="text-neutral-400">Brief routed to principal design and engineering partners.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-blue-400 shrink-0">12:00</span>
                <div>
                  <strong className="text-white block">Architectural Feasibility Review</strong>
                  <span className="text-neutral-400">We inspect requirements, third-party integrations, and performance targets.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-blue-400 shrink-0">24:00</span>
                <div>
                  <strong className="text-white block">Fixed-Fee Sprint Proposal</strong>
                  <span className="text-neutral-400">You receive a formal proposal with timeline, milestones, and deliverables.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form or Success Receipt */}
        <div className="lg:col-span-7">
          <div className={`rounded-2xl border p-8 lg:p-10 ${themeStyles.surface} ${themeStyles.border}`}>
            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-4 font-bold">
                  ✓
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-800 text-blue-400 mb-3">
                  REFERENCE #{refId}
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  Project Brief Received
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mb-6 leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{name}</span>. A principal engineer will review your brief and contact you at <span className="font-mono text-blue-400">{email}</span> within 24 hours.
                </p>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs text-neutral-400 text-left w-full max-w-md mb-6 space-y-1.5">
                  <div><strong>Focus:</strong> {projectCategory}</div>
                  <div><strong>Budget:</strong> {budget}</div>
                  <div><strong>Target Timeline:</strong> {timeline}</div>
                  {company && <div><strong>Company:</strong> {company}</div>}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border ${themeStyles.border} ${themeStyles.surfaceAlt} text-neutral-300 hover:text-white transition-colors cursor-pointer`}
                  >
                    Submit Another Brief
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover} transition-colors cursor-pointer`}
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Elena Vance"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : themeStyles.border
                      } ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Work Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : themeStyles.border
                      } ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Company or Project Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Aethel Technologies"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Target Launch Window
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={`w-full px-3 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    >
                      <option value="Urgent (14 Days)">Urgent Sprint (14 Days)</option>
                      <option value="Within 30 Days">Standard Window (30 Days)</option>
                      <option value="60 - 90 Days">Quarterly Scope (60 - 90 Days)</option>
                      <option value="Exploratory">Flexible / Exploratory</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Architecture Category
                    </label>
                    <input
                      type="text"
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      placeholder="e.g. Flagship SaaS Platform or Redesign"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Allocated Investment Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={`w-full px-3 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    >
                      <option value="$3.8k – $5k (Sprint Flagship)">$3.8k – $5k (Sprint Flagship)</option>
                      <option value="$6k – $15k (Full Platform)">$6k – $15k (Full Platform)</option>
                      <option value="$15k – $35k (Enterprise Custom)">$15k – $35k (Enterprise Custom)</option>
                      <option value="$35k+ (Quarterly Embedded Retainer)">$35k+ (Quarterly Retainer)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Project Brief & Goals <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the project goals, current performance bottlenecks, reference websites, or deliverables needed..."
                    className={`w-full p-3 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.message ? 'border-red-500' : themeStyles.border
                    } ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-xl text-xs font-semibold transition-all duration-150 shadow-md cursor-pointer ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
                >
                  Submit Scoping Brief for Review →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
