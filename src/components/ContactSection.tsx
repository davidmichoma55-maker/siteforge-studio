import React, { useState, useEffect } from 'react';
import { ThemeStyles } from '../utils/theme.ts';

export interface PreloadedContactData {
  planOrProject?: string;
  scopeSummary?: {
    projectType: string;
    pageCount: number;
    timeline: string;
    addOns: string[];
    estimatedRange: string;
  };
}

interface ContactSectionProps {
  themeStyles: ThemeStyles;
  preloadedData?: PreloadedContactData | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  themeStyles,
  preloadedData,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectCategory, setProjectCategory] = useState('High-Impact Flagship');
  const [budget, setBudget] = useState('$5k – $15k');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preloadedData?.planOrProject) {
      setProjectCategory(preloadedData.planOrProject);
    }
    if (preloadedData?.scopeSummary) {
      setProjectCategory(preloadedData.scopeSummary.projectType);
      setMessage(
        `Pre-configured scope:\n- Architecture: ${preloadedData.scopeSummary.projectType}\n- Scope: ${preloadedData.scopeSummary.pageCount} Views\n- Velocity: ${preloadedData.scopeSummary.timeline}\n- Capabilities: ${preloadedData.scopeSummary.addOns.join(', ')}\n- Estimated: ${preloadedData.scopeSummary.estimatedRange}`
      );
      setBudget(preloadedData.scopeSummary.estimatedRange);
    }
  }, [preloadedData]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name or team name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim()) errs.message = 'Please provide a brief description of your goals.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
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
    <section id="contact" className="py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
                Initiate Project Discovery
              </div>
              <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
                Let us build your next digital flagship
              </h2>
              <p className={`text-sm leading-relaxed mb-8 ${themeStyles.textSecondary}`}>
                Whether you need a bespoke marketing showcase, high-performance web platform, or full brand engineering overhaul, we respond with technical proposals within 24 hours.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-neutral-300">Engineering Office:</span>
                  <span className="text-neutral-400">London & Zurich Hubs</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-neutral-300">Direct Inquiries:</span>
                  <span className="text-blue-400 font-mono">partnerships@veloce.build</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-neutral-300">Average Turnaround:</span>
                  <span className="text-neutral-400">Under 24 hours</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-xl border text-xs ${themeStyles.surfaceAlt} ${themeStyles.border} ${themeStyles.textMuted}`}>
              🔒 Strictly confidential. Non-disclosure agreements (NDAs) executed automatically upon request prior to technical scoping calls.
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border}`}>
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{name}</span>. A principal design engineer will review your project parameters and contact you at <span className="font-mono text-blue-400">{email}</span> within 24 hours.
                  </p>
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs text-neutral-400 text-left w-full max-w-md mb-6 space-y-1">
                    <div><strong>Project Focus:</strong> {projectCategory}</div>
                    <div><strong>Budget Allocation:</strong> {budget}</div>
                    {company && <div><strong>Company:</strong> {company}</div>}
                  </div>
                  <button
                    onClick={handleReset}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border ${themeStyles.border} ${themeStyles.surfaceAlt} text-neutral-300 hover:text-white transition-colors`}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Name / Lead <span className="text-red-400">*</span>
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
                        Work Email <span className="text-red-400">*</span>
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
                        Company / Organization
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
                        Expected Investment Range
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className={`w-full px-3 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                      >
                        <option value="$3k – $6k">$3k – $6k (Sprint Flagship)</option>
                        <option value="$6k – $15k">$6k – $15k (Full Platform)</option>
                        <option value="$15k – $35k">$15k – $35k (Enterprise Custom)</option>
                        <option value="$35k+">$35k+ (Embedded Studio Retainer)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Architecture Category
                    </label>
                    <input
                      type="text"
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      placeholder="e.g. Bespoke SaaS Flagship or Design System"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${themeStyles.border} ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Overview & Target Objectives <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about what you want to build, current challenges, key deadlines, or reference websites..."
                      className={`w-full p-3 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.message ? 'border-red-500' : themeStyles.border
                      } ${themeStyles.surfaceAlt} ${themeStyles.textPrimary}`}
                    />
                    {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 px-6 rounded-xl text-xs font-semibold transition-all duration-150 shadow-md ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
                  >
                    Submit Scoping Inquiry →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
