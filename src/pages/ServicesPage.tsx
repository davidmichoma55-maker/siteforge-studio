import React, { useState } from 'react';
import { SiteConfig, PageId, ServiceDetail } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface ServicesPageProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId, data?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  siteConfig,
  themeStyles,
  onNavigate,
}) => {
  const [techCategory, setTechCategory] = useState<'all' | 'frontend' | 'backend' | 'design' | 'devops'>('all');

  const techStack = [
    { name: 'React 19 & TypeScript', category: 'frontend', role: 'Strictly typed component runtime with zero client crashes.' },
    { name: 'Tailwind CSS v4', category: 'design', role: 'Token-driven styling with zero runtime CSS-in-JS overhead.' },
    { name: 'Motion / Framer Engine', category: 'design', role: 'Compositor-only 60fps micro-interactions and smooth physics.' },
    { name: 'Cloud Run & Edge CDNs', category: 'backend', role: 'Sub-20ms global time-to-first-byte (TTFB) and instant horizontal scaling.' },
    { name: 'PostgreSQL & Cloud SQL', category: 'backend', role: 'ACID-compliant relational persistence with automated point-in-time backups.' },
    { name: 'WebSockets & Protobuf', category: 'backend', role: 'Ultra-low latency streaming for hardware telemetry and real-time state.' },
    { name: 'Lighthouse CI & DevTools', category: 'devops', role: 'Automated CI regression testing enforcing 95+ Core Web Vitals.' },
    { name: 'Figma Token Sync', category: 'design', role: 'Automated 1:1 token mapping between design files and production code.' },
  ];

  const filteredTech = techCategory === 'all'
    ? techStack
    : techStack.filter((t) => t.category === techCategory);

  const methodology = [
    {
      num: '01',
      phase: 'Discovery & System Blueprinting',
      timeframe: 'Days 1 – 4',
      desc: 'We map out your business invariants, target user personas, technical requirements, and data architectures before writing a single line of code.',
      outputs: ['Architecture RFC document', 'Information hierarchy', 'API & state contract'],
    },
    {
      num: '02',
      phase: 'Tokenized Design & Motion Polish',
      timeframe: 'Days 5 – 10',
      desc: 'Our design architects establish the typographic hierarchy, color space, and tactile micro-interactions in high-fidelity Figma components.',
      outputs: ['Figma design token library', 'Interactive prototype', 'Component documentation'],
    },
    {
      num: '03',
      phase: 'Full-Stack Engineering & QA',
      timeframe: 'Days 11 – 20',
      desc: 'We implement responsive views, hook up databases and APIs, enforce strict TypeScript definitions, and optimize Core Web Vitals.',
      outputs: ['Complete Git repository', 'Accessible semantic markup', 'Zero-defect test suite'],
    },
    {
      num: '04',
      phase: 'Production Edge Deploy & SLA Warranty',
      timeframe: 'Day 21+',
      desc: 'Continuous deployment to global edge infrastructure, DNS configuration, and a 30-day post-launch stabilization warranty.',
      outputs: ['Global CDN deployment', 'SSL & DNS certification', '30-day warranty coverage'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">
      {/* Page Header */}
      <div>
        <Breadcrumbs
          currentPage="services"
          pageTitle="Services & Disciplines"
          themeStyles={themeStyles}
          onNavigate={onNavigate}
        />
        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
          Technical Scope & Disciplines
        </div>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
          Comprehensive Design & Web Engineering Services
        </h1>
        <p className={`text-base sm:text-lg max-w-3xl leading-relaxed ${themeStyles.textSecondary}`}>
          We build robust, high-performance web systems by unifying visual identity, interface craftsmanship, and enterprise cloud architecture into a single disciplined studio practice.
        </p>
      </div>

      {/* Services List Deep-Dive */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Studio Practice Areas
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Select any discipline to configure into your custom scoping plan.
            </p>
          </div>
          <button
            onClick={() => onNavigate('pricing')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            Calculate Fixed-Fee Sprint Scope →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {siteConfig.servicesDetails.map((service: ServiceDetail) => (
            <div
              key={service.id}
              className={`rounded-2xl border p-8 lg:p-10 transition-all duration-200 ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-600`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 5 cols: Title, Tagline, Summary */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono font-bold text-blue-400">{service.num}</span>
                      <span className="text-xs uppercase tracking-wider text-neutral-400">Core Discipline</span>
                    </div>
                    <h3 className={`text-2xl font-bold font-display mb-2 ${themeStyles.textPrimary}`}>
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-blue-400 mb-4">
                      {service.tagline}
                    </p>
                    <p className={`text-sm leading-relaxed mb-6 ${themeStyles.textSecondary}`}>
                      {service.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
                    <span className="text-xs font-semibold text-neutral-300 block mb-1">
                      Ideal For:
                    </span>
                    <span className="text-xs text-neutral-400">
                      {service.idealFor}
                    </span>
                  </div>
                </div>

                {/* Right 7 cols: Deliverables Checklist + Tech Stack + Action */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                      Production Deliverables Included:
                    </h4>
                    <div className="space-y-2.5 mb-6">
                      {service.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <span className="text-blue-400 font-bold shrink-0">✓</span>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Primary Technology Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.stack.map((item, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 text-xs rounded-md border border-neutral-800 bg-neutral-900 text-neutral-300 font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onNavigate('contact', { project: `Service: ${service.title}` })}
                      className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
                    >
                      Inquire with this Service →
                    </button>
                    <button
                      onClick={() => onNavigate('pricing')}
                      className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      View in Scope Calculator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="space-y-8">
        <div>
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
            Sprint Operating Model
          </div>
          <h2 className={`text-3xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
            How we take projects from concept to production
          </h2>
          <p className={`text-sm max-w-xl mt-2 ${themeStyles.textSecondary}`}>
            Predictable sprints, transparent commits, and zero handoff lag. We operate as an integrated SWAT team alongside your product leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodology.map((m) => (
            <div
              key={m.num}
              className={`rounded-2xl border p-6 flex flex-col justify-between ${themeStyles.surface} ${themeStyles.border}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold font-display text-blue-400">{m.num}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {m.timeframe}
                  </span>
                </div>
                <h3 className={`text-base font-bold font-display mb-2 ${themeStyles.textPrimary}`}>
                  {m.phase}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${themeStyles.textSecondary}`}>
                  {m.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 space-y-1">
                {m.outputs.map((out, oIdx) => (
                  <div key={oIdx} className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                    <span className="text-blue-500 font-bold">·</span>
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Filter Matrix */}
      <section className={`rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Curated Production Stack
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Zero bloatware. Every technology is chosen for predictable runtime performance and zero vendor lock-in.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {(['all', 'frontend', 'backend', 'design', 'devops'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTechCategory(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                  techCategory === tab
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTech.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/50 flex flex-col justify-between"
            >
              <div className="font-semibold text-sm text-neutral-100 font-display mb-1">
                {item.name}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-display text-white">
            Have a custom requirement or legacy migration?
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Our principal engineers review architectural scopes and provide actionable technical proposals within 24h.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`}
          >
            Start Project Inquiry
          </button>
        </div>
      </section>
    </div>
  );
};
