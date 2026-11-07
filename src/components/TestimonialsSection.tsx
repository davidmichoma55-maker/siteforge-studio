import React from 'react';
import { Testimonial } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  themeStyles: ThemeStyles;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  themeStyles,
}) => {
  return (
    <section className="py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
              Client Endorsements & Partnership Feedback
            </div>
            <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
              Trusted by engineering leaders worldwide
            </h2>
          </div>
          <p className={`text-sm max-w-md ${themeStyles.textSecondary}`}>
            Direct feedback from product founders and engineering executives who launched production platforms with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-8 flex flex-col justify-between ${themeStyles.surface} ${themeStyles.border}`}
            >
              <div className="mb-6">
                <div className="inline-block mb-4 px-2.5 py-1 rounded text-xs font-semibold font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {item.impactMetric}
                </div>
                <blockquote className={`text-sm lg:text-base leading-relaxed italic ${themeStyles.textSecondary}`}>
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className={`font-bold text-sm font-display ${themeStyles.textPrimary}`}>
                    {item.author}
                  </div>
                  <div className={`text-xs ${themeStyles.textMuted}`}>
                    {item.role} · {item.company}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center text-xs font-mono font-bold text-neutral-300">
                  {item.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
