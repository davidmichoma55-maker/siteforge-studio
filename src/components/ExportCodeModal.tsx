import React, { useState } from 'react';
import { SiteConfig } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface ExportCodeModalProps {
  siteConfig: SiteConfig;
  themeStyles: ThemeStyles;
  onClose: () => void;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  siteConfig,
  themeStyles,
  onClose,
}) => {
  const [tab, setTab] = useState<'html' | 'json' | 'github'>('github');
  const [copied, setCopied] = useState(false);

  const generateHtml = () => {
    const homeSeo = siteConfig.seo?.home || {
      title: `${siteConfig.brandName} - ${siteConfig.brandTagline}`,
      description: 'Bespoke web platform & high-performance design engineering.',
    };

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${homeSeo.title}</title>
  <meta name="description" content="${homeSeo.description}" />
  <meta property="og:title" content="${homeSeo.title}" />
  <meta property="og:description" content="${homeSeo.description}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Public Sans', sans-serif; }
    h1, h2, h3, h4, .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-neutral-950 text-neutral-100 antialiased selection:bg-neutral-800">

  <!-- Top Navigation Bar -->
  <header class="sticky top-0 z-40 w-full backdrop-blur-md border-b border-neutral-800 bg-neutral-950/90">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
      <a href="#" class="text-lg font-bold tracking-tight font-display text-white whitespace-nowrap shrink-0">
        ${siteConfig.brandName}
      </a>
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
        <a href="#capabilities" class="hover:text-white transition-colors">Capabilities</a>
        <a href="#work" class="hover:text-white transition-colors">Case Studies</a>
        <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
        <a href="#faq" class="hover:text-white transition-colors">FAQ</a>
      </nav>
      <div class="flex items-center gap-3 shrink-0">
        <a href="#contact" class="px-4 py-2 text-xs font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0">
          Start Project
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-16 lg:py-24 max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7">
        <div class="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          ${siteConfig.hero.eyebrow}
        </div>
        <h1 class="text-4xl lg:text-6xl font-bold font-display tracking-tight text-white mb-6">
          ${siteConfig.hero.title}
        </h1>
        <p class="text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
          ${siteConfig.hero.description}
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#contact" class="px-5 py-3 text-sm font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 transition-colors">
            ${siteConfig.hero.primaryCtaLabel}
          </a>
          <a href="#work" class="px-5 py-3 text-sm font-medium rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-600 transition-colors">
            ${siteConfig.hero.secondaryCtaLabel}
          </a>
        </div>
      </div>
      <div class="lg:col-span-5">
        <div class="rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl bg-neutral-900 aspect-[16/10]">
          <img src="${siteConfig.hero.image}" alt="${siteConfig.brandName}" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Proof Strip -->
    <div class="mt-16 pt-10 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-8">
      ${siteConfig.hero.stats
        .map(
          (s) => `
      <div>
        <div class="text-3xl font-bold font-display text-white tabular-nums mb-1">${s.value}</div>
        <div class="text-sm font-semibold text-neutral-200">${s.label}</div>
        <div class="text-xs text-neutral-500">${s.detail}</div>
      </div>`
        )
        .join('')}
    </div>
  </section>

</body>
</html>`;
  };

  const generateGithubInstructions = () => {
    return `# SiteForge Studio – Git & GitHub Deployment Commands
# Remote already set to: https://github.com/davidmichoma55-maker/siteforge-studio.git
# Local Branch: main (57 files staged and committed with all leadership images)

# OPTION 1: Push from your local computer terminal
# If you cloned or downloaded the project code:
git remote add origin https://github.com/davidmichoma55-maker/siteforge-studio.git
git branch -M main
git push -u origin main

# OPTION 2: Push using GitHub Personal Access Token (PAT)
# In GitHub: Settings -> Developer Settings -> Personal Access Tokens (Tokens classic) -> Generate new token with 'repo' scope.
# Then push using:
git push https://<YOUR_GITHUB_PAT_TOKEN>@github.com/davidmichoma55-maker/siteforge-studio.git main

# OPTION 3: Using GitHub CLI (gh)
gh auth login
git push -u origin main`;
  };

  const getExportContent = () => {
    if (tab === 'github') return generateGithubInstructions();
    if (tab === 'html') return generateHtml();
    return JSON.stringify(siteConfig, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border p-6 shadow-2xl ${themeStyles.surface} ${themeStyles.border} ${themeStyles.textPrimary}`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-bold font-display">Export Code & GitHub Setup</h3>
            <p className="text-xs text-neutral-400">
              Download or push your customized website platform and assets directly to GitHub.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-xs border rounded-lg text-neutral-400 hover:text-white border-neutral-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher & Copy Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-neutral-800 bg-neutral-900">
            <button
              onClick={() => setTab('github')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                tab === 'github' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>GitHub Push CLI</span>
            </button>
            <button
              onClick={() => setTab('html')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                tab === 'html' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Standalone HTML
            </button>
            <button
              onClick={() => setTab('json')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                tab === 'json' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Site Config JSON
            </button>
          </div>

          <button
            onClick={handleCopy}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : `${themeStyles.accentBg} ${themeStyles.accentText} ${themeStyles.accentHover}`
            }`}
          >
            {copied ? '✓ Copied to Clipboard' : 'Copy Code'}
          </button>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 overflow-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-300">
          <pre className="whitespace-pre">{getExportContent()}</pre>
        </div>
      </div>
    </div>
  );
};
