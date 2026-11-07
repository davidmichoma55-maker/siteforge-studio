import React, { useState } from 'react';
import { FaqItem } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface FaqSectionProps {
  faqs: FaqItem[];
  themeStyles: ThemeStyles;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, themeStyles }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.textMuted}`}>
            Common Questions
          </div>
          <h2 className={`text-3xl lg:text-4xl font-bold font-display tracking-tight ${themeStyles.textPrimary}`}>
            Frequently asked questions about our process
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${themeStyles.surface} ${themeStyles.border}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-sm sm:text-base font-display ${themeStyles.textPrimary}`}>
                    {faq.question}
                  </span>
                  <span className={`text-xs font-mono font-bold transition-transform duration-200 ${isOpen ? 'rotate-45 text-blue-400' : 'text-neutral-400'}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <p className={`text-xs sm:text-sm leading-relaxed ${themeStyles.textSecondary}`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
