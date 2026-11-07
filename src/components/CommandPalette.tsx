import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PageId, DeviceViewport, ThemeMode, TemplateId, SiteConfig } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Pages' | 'Studio Settings' | 'Viewport' | 'Themes' | 'Templates' | 'Sections';
  keywords?: string[];
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, data?: any) => void;
  onSetViewport: (vp: DeviceViewport) => void;
  onSetTheme: (theme: ThemeMode) => void;
  onSelectTemplate: (template: TemplateId) => void;
  onToggleStudio: () => void;
  onOpenExport: () => void;
  onOpenAnalytics?: () => void;
  themeStyles: ThemeStyles;
  siteConfig: SiteConfig;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSetViewport,
  onSetTheme,
  onSelectTemplate,
  onToggleStudio,
  onOpenExport,
  onOpenAnalytics,
  themeStyles,
  siteConfig,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Master command registry
  const commands: CommandItem[] = useMemo(() => {
    return [
      // Pages
      {
        id: 'page-home',
        title: 'Home Flagship Overview',
        subtitle: 'Hero headline, proof metrics strip, and marquee case study spotlight',
        category: 'Pages',
        keywords: ['overview', 'homepage', 'index', 'flagship', 'stats', 'hero'],
        badge: '/home',
        action: () => {
          onNavigate('home');
          onClose();
        },
      },
      {
        id: 'page-services',
        title: 'Services & Disciplines',
        subtitle: '5 technical practices, deliverables, and production tech stack matrix',
        category: 'Pages',
        keywords: ['services', 'disciplines', 'full-stack', 'react', 'edge', 'capabilities', 'stack'],
        badge: '/services',
        action: () => {
          onNavigate('services');
          onClose();
        },
      },
      {
        id: 'page-work',
        title: 'Case Studies & Production Work',
        subtitle: 'Verified commercial outcomes across fintech, hardware, and developer SaaS',
        category: 'Pages',
        keywords: ['work', 'portfolio', 'case studies', 'projects', 'fintech', 'hardware', 'metrics'],
        badge: '/work',
        action: () => {
          onNavigate('work');
          onClose();
        },
      },
      {
        id: 'page-about',
        title: 'About Studio & Leadership',
        subtitle: 'Studio manifesto, London & Zurich hubs, and directors (David Wrekman, Atash Mitchun, Hazzin Brian)',
        category: 'Pages',
        keywords: ['about', 'team', 'directors', 'david wrekman', 'atash mitchun', 'hazzin brian', 'london', 'zurich', 'manifesto'],
        badge: '/about',
        action: () => {
          onNavigate('about');
          onClose();
        },
      },
      {
        id: 'page-pricing',
        title: 'Scope Calculator & Sprint Pricing',
        subtitle: 'Interactive cost modeling, sprint packages comparison, and warranty SLA',
        category: 'Pages',
        keywords: ['pricing', 'calculator', 'cost', 'estimate', 'sprint', 'retainer', 'warranty', 'faq'],
        badge: '/pricing',
        action: () => {
          onNavigate('pricing');
          onClose();
        },
      },
      {
        id: 'page-contact',
        title: 'Initiate Project Discovery Brief',
        subtitle: 'Submit project requirements, review the 24h discovery timeline, and direct lines',
        category: 'Pages',
        keywords: ['contact', 'inquiry', 'start project', 'discovery', 'proposal', 'brief', 'email'],
        badge: '/contact',
        action: () => {
          onNavigate('contact');
          onClose();
        },
      },

      // Studio Settings & SEO
      {
        id: 'studio-toggle',
        title: 'Toggle Studio Customizer Drawer',
        subtitle: 'Open or close the visual customizer panel on the right sidebar',
        category: 'Studio Settings',
        keywords: ['studio', 'customizer', 'drawer', 'sidebar', 'panel', 'settings'],
        badge: 'Studio',
        action: () => {
          onToggleStudio();
          onClose();
        },
      },
      {
        id: 'studio-seo',
        title: 'Edit SEO Settings & Meta Tags',
        subtitle: 'Open Studio drawer to customize page titles, descriptions, and view live Google SERP preview',
        category: 'Studio Settings',
        keywords: ['seo', 'meta', 'title', 'description', 'serp', 'google', 'search', 'keywords'],
        badge: 'SEO',
        action: () => {
          onToggleStudio();
          onClose();
        },
      },
      {
        id: 'studio-export',
        title: 'Export Site Code & Configuration JSON',
        subtitle: 'Generate clean standalone Tailwind HTML and site schema for deployment',
        category: 'Studio Settings',
        keywords: ['export', 'download', 'code', 'html', 'json', 'standalone', 'source'],
        badge: 'Export',
        action: () => {
          onOpenExport();
          onClose();
        },
      },
      {
        id: 'studio-analytics',
        title: 'Backend Analytics & Telemetry Console',
        subtitle: 'Inspect real-time ingestion events, navigation logs, and backend API schemas',
        category: 'Studio Settings',
        keywords: ['analytics', 'telemetry', 'backend', 'events', 'logs', 'tracking', 'data', 'metrics', 'api', 'stream', 'inbox'],
        badge: 'Backend Telemetry',
        action: () => {
          if (onOpenAnalytics) onOpenAnalytics();
          onClose();
        },
      },

      // Viewport Simulation
      {
        id: 'vp-desktop',
        title: 'Simulate Desktop Viewport (1440px)',
        subtitle: 'Full-width widescreen presence with split hero and asymmetric bento layouts',
        category: 'Viewport',
        keywords: ['desktop', 'widescreen', '1440', 'full', 'viewport', 'responsive'],
        badge: '1440px',
        action: () => {
          onSetViewport('desktop');
          onClose();
        },
      },
      {
        id: 'vp-tablet',
        title: 'Simulate Tablet Viewport (768px)',
        subtitle: 'Compact medium container with collapsible multi-column grids',
        category: 'Viewport',
        keywords: ['tablet', 'ipad', '768', 'medium', 'viewport', 'responsive'],
        badge: '768px',
        action: () => {
          onSetViewport('tablet');
          onClose();
        },
      },
      {
        id: 'vp-mobile',
        title: 'Simulate Mobile Viewport (390px)',
        subtitle: 'Single-column mobile view with optimized touch targets and 15% sticky top bar cap',
        category: 'Viewport',
        keywords: ['mobile', 'phone', 'iphone', '390', 'touch', 'viewport', 'responsive'],
        badge: '390px',
        action: () => {
          onSetViewport('mobile');
          onClose();
        },
      },

      // Themes
      {
        id: 'theme-obsidian',
        title: 'Theme: Obsidian Dark',
        subtitle: 'Deep neutral obsidian background (#0A0A0A) with crisp white accents',
        category: 'Themes',
        keywords: ['theme', 'dark', 'obsidian', 'black', 'neutral', 'color'],
        badge: 'Dark',
        action: () => {
          onSetTheme('obsidian');
          onClose();
        },
      },
      {
        id: 'theme-light',
        title: 'Theme: Clean Light',
        subtitle: 'Pristine off-white background with high-contrast typography and subtle surfaces',
        category: 'Themes',
        keywords: ['theme', 'light', 'white', 'clean', 'bright', 'color'],
        badge: 'Light',
        action: () => {
          onSetTheme('light');
          onClose();
        },
      },
      {
        id: 'theme-cobalt',
        title: 'Theme: Cobalt Tech',
        subtitle: 'Technical navy slate background with electric blue focal points',
        category: 'Themes',
        keywords: ['theme', 'cobalt', 'blue', 'navy', 'tech', 'color'],
        badge: 'Cobalt',
        action: () => {
          onSetTheme('cobalt');
          onClose();
        },
      },
      {
        id: 'theme-luxury',
        title: 'Theme: Luxury Stone',
        subtitle: 'Warm architectural stone palette with refined champagne amber accents',
        category: 'Themes',
        keywords: ['theme', 'luxury', 'stone', 'amber', 'gold', 'editorial', 'color'],
        badge: 'Stone',
        action: () => {
          onSetTheme('luxury');
          onClose();
        },
      },
      {
        id: 'theme-emerald',
        title: 'Theme: Emerald Forest',
        subtitle: 'High-contrast graphite and forest emerald aesthetic for environmental and tech platforms',
        category: 'Themes',
        keywords: ['theme', 'emerald', 'green', 'forest', 'nature', 'color'],
        badge: 'Emerald',
        action: () => {
          onSetTheme('emerald');
          onClose();
        },
      },

      // Templates
      {
        id: 'tpl-agency',
        title: 'Template: Creative Studio & Design Engineering',
        subtitle: 'Tailored for design engineering agencies, bespoke web development, and digital studios',
        category: 'Templates',
        keywords: ['template', 'agency', 'studio', 'veloce', 'creative', 'design'],
        badge: 'Agency',
        action: () => {
          onSelectTemplate('agency');
          onClose();
        },
      },
      {
        id: 'tpl-saas',
        title: 'Template: Synthetix Developer SaaS Platform',
        subtitle: 'Tailored for cloud developer platforms, edge orchestration, and infrastructure tools',
        category: 'Templates',
        keywords: ['template', 'saas', 'synthetix', 'cloud', 'developer', 'software'],
        badge: 'SaaS',
        action: () => {
          onSelectTemplate('saas');
          onClose();
        },
      },
      {
        id: 'tpl-hardware',
        title: 'Template: Kroma Industrial Hardware & OEM',
        subtitle: 'Tailored for precision prototyping, CNC fabrication, robotics, and connected devices',
        category: 'Templates',
        keywords: ['template', 'hardware', 'kroma', 'industrial', 'oem', 'robotics'],
        badge: 'Hardware',
        action: () => {
          onSelectTemplate('hardware');
          onClose();
        },
      },
      {
        id: 'tpl-consulting',
        title: 'Template: Stratum Advisory & M&A Technology',
        subtitle: 'Tailored for board-level strategic tech consulting and enterprise transformation',
        category: 'Templates',
        keywords: ['template', 'consulting', 'advisory', 'stratum', 'enterprise', 'finance'],
        badge: 'Advisory',
        action: () => {
          onSelectTemplate('consulting');
          onClose();
        },
      },

      // Sections
      {
        id: 'sec-leadership',
        title: 'Meet Leadership: David Wrekman, Atash Mitchun, Hazzin Brian',
        subtitle: 'Read about the studio founders, backgrounds at Apple & Stripe, and direct disciplines',
        category: 'Sections',
        keywords: ['leadership', 'david', 'wrekman', 'atash', 'mitchun', 'hazzin', 'brian', 'partners', 'team'],
        badge: 'About Page',
        action: () => {
          onNavigate('about');
          onClose();
        },
      },
      {
        id: 'sec-calculator',
        title: 'Interactive Scope & Cost Estimator Tool',
        subtitle: 'Model project view counts, sprint velocity, and specialized add-ons in real-time',
        category: 'Sections',
        keywords: ['calculator', 'estimator', 'math', 'pricing', 'views', 'addons'],
        badge: 'Pricing Page',
        action: () => {
          onNavigate('pricing');
          onClose();
        },
      },
    ];
  }, [onNavigate, onSetViewport, onSetTheme, onSelectTemplate, onToggleStudio, onOpenExport, onClose]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const cleanQuery = query.toLowerCase().trim();
    return commands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(cleanQuery);
      const matchSubtitle = cmd.subtitle.toLowerCase().includes(cleanQuery);
      const matchCategory = cmd.category.toLowerCase().includes(cleanQuery);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(cleanQuery));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [commands, query]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Keyboard navigation within palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
    >
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[75vh] ${themeStyles.surface} ${themeStyles.border} ${themeStyles.textPrimary}`}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <span className="text-neutral-400 font-mono text-sm shrink-0">
            ⌘
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a page, command, setting, or theme... (e.g. 'work', 'seo', 'david', 'light')"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
            aria-autocomplete="list"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <span className="text-[11px] font-mono text-neutral-500 px-2 py-0.5 rounded border border-neutral-800 shrink-0">
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-neutral-800/40"
          role="listbox"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              <span className="block font-mono text-neutral-500 mb-1">0 results found</span>
              No pages or configuration commands matching "{query}".
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-4 py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-600/15 border border-blue-500/40 text-white'
                      : 'hover:bg-neutral-800/40 text-neutral-300 border border-transparent'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-white font-display truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-800/80 text-neutral-400 border border-neutral-700/50 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate leading-relaxed">
                      {item.subtitle}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[11px] font-mono text-blue-400 hidden sm:inline">
                        ↵ Jump
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Shortcut Hints Footer */}
        <div className="px-5 py-2.5 border-t border-neutral-800 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[10px]">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[10px]">esc</kbd>
              Close
            </span>
          </div>

          <div className="font-mono text-[10px] text-neutral-400">
            {filteredCommands.length} {filteredCommands.length === 1 ? 'command' : 'commands'} available
          </div>
        </div>
      </div>
    </div>
  );
};
