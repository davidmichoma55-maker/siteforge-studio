import React, { useState } from 'react';
import { SiteConfig, PageId, TeamMember } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { STUDIO_TEAM_IMG } from '../data/templates.ts';

interface AboutPageProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId, data?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  siteConfig,
  themeStyles,
  onNavigate,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const invariants = [
    {
      title: 'Zero Third-Party Bloatware',
      desc: 'We never insert unvetted analytics trackers, bulky CSS frameworks, or slow script tags. Every millisecond of latency is rigorously defended.',
    },
    {
      title: 'Full Repository Ownership',
      desc: '100% of the intellectual property, design tokens, and clean TypeScript codebase is transferred to your company upon project completion.',
    },
    {
      title: 'Accessibility as Default',
      desc: 'All our user interfaces adhere strictly to WCAG AA color contrast, logical focus management, and keyboard-first navigation.',
    },
    {
      title: 'Mathematical Typography',
      desc: 'We enforce disciplined type scales, tabular numerals for figures, zero orphaned headline words, and tailored light/dark optical contrast.',
    },
  ];

  const positions = [
    {
      title: 'Senior React & Performance Architect',
      type: 'Full-Time · London or Remote EU',
      desc: 'Leading Core Web Vitals optimization, state synchronization, and complex interactive web platform codebases.',
    },
    {
      title: 'Design Systems Engineer (Figma to Code)',
      type: 'Full-Time · Zurich or Remote EU',
      desc: 'Bridging design tokens in Figma with production React 19 + Tailwind component libraries and tactile motion curves.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">
      {/* Header */}
      <div>
        <Breadcrumbs
          currentPage="about"
          pageTitle="About Studio"
          themeStyles={themeStyles}
          onNavigate={onNavigate}
        />
        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
          Studio Philosophy & Leadership
        </div>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
          Engineering Rigor Meets High-Order Visual Craft
        </h1>
        <p className={`text-base sm:text-lg max-w-3xl leading-relaxed ${themeStyles.textSecondary}`}>
          We founded {siteConfig.brandName} on a singular premise: modern companies should never have to choose between stunning visual distinction and rock-solid technical architecture.
        </p>
      </div>

      {/* Editorial Photo Banner */}
      <div className={`rounded-2xl border overflow-hidden aspect-[16/8] bg-neutral-900 shadow-2xl relative ${themeStyles.border}`}>
        <img
          src={STUDIO_TEAM_IMG}
          alt="Studio partners and engineers reviewing web architecture wireframes"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-400">Design & Systems Review</div>
            <div className="text-sm sm:text-base font-semibold font-display">London & Zurich Design Engineering Labs</div>
          </div>
          <div className="text-xs text-neutral-300">
            Founded 2023 · 28 Flagships Launched
          </div>
        </div>
      </div>

      {/* Studio Manifesto / Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
            Our Manifesto
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight mb-4 ${themeStyles.textPrimary}`}>
            A counter-culture against generic digital templates
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The modern web has become homogenized by cookie-cutter themes, purple gradient templates, and mechanical AI slop. We craft custom platforms engineered to command authentic enterprise trust.
          </p>
        </div>

        <div className={`lg:col-span-7 space-y-4 text-sm leading-relaxed ${themeStyles.textSecondary}`}>
          <p>
            When web visitors encounter an amateurish interface with broken layouts, sluggish rendering, or generic copywriting, subconscious trust evaporates instantly. For companies selling high-ticket B2B solutions or breakthrough technology, digital presentation is directly tied to commercial valuation.
          </p>
          <p>
            At {siteConfig.brandName}, our engineers and designers share the same desk. Designers write production CSS; engineers care about line-heights and easing curves. This eliminates the catastrophic compromises that usually happen during the handoff from Figma to frontend developers.
          </p>
          <p>
            We operate with a lean, partner-led team. When you engage us, you work directly with veteran architects who have built platforms for Stripe, Apple, and Cloudflare—not junior subcontractors.
          </p>
        </div>
      </section>

      {/* Leadership & Principals */}
      <section className="space-y-8">
        <div>
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
            Leadership & Technical Directors
          </div>
          <h2 className={`text-3xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
            Meet the partners behind your platform
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.teamMembers.map((member: TeamMember) => {
            const hasError = imageErrors[member.id];

            return (
              <div
                key={member.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between group transition-all duration-300 ${themeStyles.surface} ${themeStyles.border} hover:border-neutral-500/70 hover:shadow-xl`}
              >
                {/* Photo Portrait Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 border-b border-neutral-800">
                  {member.image && !hasError ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      onError={() => setImageErrors((prev) => ({ ...prev, [member.id]: true }))}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-800 to-neutral-900">
                      <div className="w-16 h-16 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center font-display font-bold text-white text-xl mb-3">
                        {member.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-neutral-300">{member.name}</span>
                    </div>
                  )}

                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Location & Title pill overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-neutral-200 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10">
                      {member.location}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40">
                      Director
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className={`text-xl font-bold font-display tracking-tight mb-1 ${themeStyles.textPrimary}`}>
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-blue-400 mb-2">
                      {member.role}
                    </div>
                    <div className="text-[11px] text-neutral-400 mb-4 pb-3 border-b border-neutral-800">
                      {member.prior}
                    </div>
                    <p className={`text-xs leading-relaxed mb-6 ${themeStyles.textSecondary}`}>
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800">
                    <span className="text-[11px] text-neutral-400 font-medium block mb-1">
                      Direct Discipline Focus:
                    </span>
                    <span className="text-xs font-medium text-neutral-200">
                      {member.focus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 4 Studio Invariants */}
      <section className={`rounded-2xl border p-8 lg:p-10 ${themeStyles.surface} ${themeStyles.border}`}>
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Engineering Code of Conduct
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            The 4 Studio Invariants
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Non-negotiable architectural standards enforced across every single repository we ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invariants.map((inv, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <div className="text-xs font-mono font-bold text-blue-400 mb-1">
                0{idx + 1}.
              </div>
              <h4 className="text-sm font-bold font-display text-white mb-2">
                {inv.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {inv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Hubs & Careers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-6 rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border}`}>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Physical Hubs
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-4">
            London & Zurich
          </h3>
          <div className="space-y-4 text-xs text-neutral-300">
            <div>
              <strong className="text-white block">London Studio:</strong>
              <span>King's Cross Tech Hub, York Way, London N1C 4AG</span>
            </div>
            <div>
              <strong className="text-white block">Zurich Studio:</strong>
              <span>Technoparkstrasse 1, 8005 Zürich, Switzerland</span>
            </div>
            <p className="text-neutral-400 pt-2 border-t border-neutral-800">
              We operate across UK and CET working hours with seamless overlap for US East Coast clients.
            </p>
          </div>
        </div>

        <div className={`lg:col-span-6 rounded-2xl border p-8 ${themeStyles.surface} ${themeStyles.border}`}>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Join the Practice
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-4">
            Open Studio Roles
          </h3>
          <div className="space-y-4">
            {positions.map((pos, pIdx) => (
              <div key={pIdx} className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/50">
                <div className="font-semibold text-xs text-white">{pos.title}</div>
                <div className="text-[11px] text-blue-400 mb-1">{pos.type}</div>
                <div className="text-xs text-neutral-400">{pos.desc}</div>
              </div>
            ))}
            <button
              onClick={() => onNavigate('contact', { project: 'Career Application' })}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              Send engineering portfolio or GitHub →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
