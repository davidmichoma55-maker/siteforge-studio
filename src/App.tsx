/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteConfig, TemplateId, DeviceViewport, PageId, ThemeMode } from './types/site.ts';
import { DEFAULT_AGENCY_CONFIG, TEMPLATE_PRESETS } from './data/templates.ts';
import { THEME_MAP } from './utils/theme.ts';

import { TopBar } from './components/TopBar.tsx';
import { Footer } from './components/Footer.tsx';
import { StudioToolbar } from './components/StudioToolbar.tsx';
import { ExportCodeModal } from './components/ExportCodeModal.tsx';
import { CommandPalette } from './components/CommandPalette.tsx';
import { BackendAnalyticsModal } from './components/BackendAnalyticsModal.tsx';
import { useAnalytics } from './hooks/useAnalytics.ts';

import { HomePage } from './pages/HomePage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { WorkPage } from './pages/WorkPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

function getInitialPage(): PageId {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const validPages: PageId[] = ['home', 'services', 'work', 'about', 'pricing', 'contact'];
  if (validPages.includes(hash as PageId)) {
    return hash as PageId;
  }
  return 'home';
}

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_AGENCY_CONFIG);
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [viewport, setViewport] = useState<DeviceViewport>('desktop');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [pageNavigationData, setPageNavigationData] = useState<any>(null);

  const themeStyles = THEME_MAP[siteConfig.theme] || THEME_MAP.obsidian;

  // Custom hook tracking user navigation and builder component interactions
  const {
    events,
    summary,
    sessionId,
    simulatedEndpoint,
    autoDispatch,
    setAutoDispatch,
    isSimulatingDispatch,
    trackEvent,
    trackNavigation,
    trackBuilderInteraction,
    trackModal,
    trackForm,
    flushQueuedEvents,
    clearEvents,
    exportEventsJson,
  } = useAnalytics({
    viewport,
    templateId: siteConfig.templateId,
    theme: siteConfig.theme,
    autoDispatch: true,
  });

  // Track initial page load once
  useEffect(() => {
    trackNavigation(currentPage, 'InitialPageMount');
  }, []);

  // Listen for Cmd+K or Ctrl+K to toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => {
          const next = !prev;
          trackModal('CommandPalette', next ? 'open' : 'close', { trigger: 'keyboard_shortcut' });
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trackModal]);

  // Listen to browser hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      trackNavigation(page, 'BrowserHashRouter');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [trackNavigation]);

  // Synchronize document title and meta tags with active page SEO configuration
  useEffect(() => {
    const pageSeo = siteConfig.seo?.[currentPage];
    if (pageSeo) {
      if (pageSeo.title) {
        document.title = pageSeo.title;
      }

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', pageSeo.description || '');

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', pageSeo.title || '');

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', pageSeo.description || '');
    }
  }, [siteConfig.seo, currentPage]);

  // Programmatic navigation
  const navigateTo = (page: PageId, data?: any) => {
    if (data) {
      setPageNavigationData(data);
      if (data.scopeSummary) {
        trackForm('ProjectScopeEstimator', 'submit', data.scopeSummary);
      }
    }
    setCurrentPage(page);
    trackNavigation(page, 'AppNavigation', data ? { hasPayload: true } : undefined);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Template Switcher
  const handleSelectTemplate = (templateId: TemplateId) => {
    const preset = TEMPLATE_PRESETS[templateId];
    if (!preset) return;

    trackBuilderInteraction('template_switched', 'TemplateSelector', {
      from: siteConfig.templateId,
      to: templateId,
      brandName: preset.brandName,
    });

    setSiteConfig((prev) => ({
      ...prev,
      templateId,
      brandName: preset.brandName || prev.brandName,
      brandTagline: preset.brandTagline || prev.brandTagline,
      seo: preset.seo || prev.seo,
      hero: {
        ...prev.hero,
        ...(preset.hero || {}),
      },
    }));
  };

  // Viewport Switcher
  const handleSetViewport = (vp: DeviceViewport) => {
    trackBuilderInteraction('viewport_switched', 'ViewportToolbar', {
      from: viewport,
      to: vp,
    });
    setViewport(vp);
  };

  // Theme Switcher
  const handleSetTheme = (theme: ThemeMode) => {
    trackBuilderInteraction('theme_switched', 'ThemeSelector', {
      from: siteConfig.theme,
      to: theme,
    });
    setSiteConfig((prev) => ({ ...prev, theme }));
  };

  // Customizer Drawer Toggle
  const handleToggleStudio = () => {
    setIsStudioOpen((prev) => {
      const next = !prev;
      trackModal('StudioCustomizer', next ? 'open' : 'close');
      return next;
    });
  };

  // Export Code Modal Toggle
  const handleOpenExport = () => {
    trackModal('ExportCodeModal', 'open');
    setIsExportOpen(true);
  };

  // Test synthetic ping generator for testing backend ingestion
  const handleSendTestPing = () => {
    trackEvent({
      eventType: 'builder_interaction',
      eventName: 'synthetic_backend_ping',
      component: 'BackendAnalyticsConsole',
      payload: {
        pingTrigger: 'Interactive test from developer console',
        clientTimestamp: new Date().toISOString(),
        activeRoute: currentPage,
        deviceViewport: viewport,
        template: siteConfig.templateId,
      },
    });
  };

  // Viewport Container Widths
  const getViewportContainerClasses = () => {
    if (viewport === 'tablet') {
      return 'max-w-[768px] mx-auto my-6 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden';
    }
    if (viewport === 'mobile') {
      return 'max-w-[390px] mx-auto my-6 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden';
    }
    return 'w-full';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-neutral-700 selection:text-white ${themeStyles.bg} ${themeStyles.textPrimary}`}>
      {/* Studio Banner Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-2 flex items-center justify-between text-xs text-neutral-300 z-50">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-wide">SITEFORGE STUDIO</span>
          <span className="text-neutral-500">·</span>
          <span className="hidden sm:inline text-neutral-400">Multi-Page Platform</span>
          <span className="text-neutral-500 hidden sm:inline">·</span>
          <span className="text-blue-400 font-medium">Page: /{currentPage}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Dedicated Backend Telemetry & Ingestion Console Trigger */}
          <button
            onClick={() => {
              trackModal('BackendAnalyticsModal', 'open');
              setIsAnalyticsOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-950/70 border border-blue-800/80 text-blue-300 hover:bg-blue-900/60 hover:text-white transition-colors cursor-pointer"
            title="Inspect Simulated Backend Analytics & Ingestion Stream (External to public site)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">Backend Analytics</span>
            <span className="sm:hidden">Analytics</span>
            <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-blue-900/80 text-blue-200">
              {summary.totalEvents}
            </span>
          </button>

          <button
            onClick={() => {
              trackModal('CommandPalette', 'open', { trigger: 'top_banner_button' });
              setIsCommandPaletteOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
            title="Quick Command Palette (Cmd+K)"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px] bg-neutral-900 border border-neutral-700">⌘K</kbd>
          </button>

          <button
            onClick={handleToggleStudio}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              isStudioOpen
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
            }`}
          >
            {isStudioOpen ? 'Hide Customizer ✕' : 'Customize Website ⚙'}
          </button>

          <button
            onClick={handleOpenExport}
            className="px-3 py-1 rounded-md text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Export Site Code
          </button>
        </div>
      </div>

      {/* Main Workspace: Website Frame + Studio Toolbar */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        <main className="flex-1 overflow-y-auto relative">
          <div className={getViewportContainerClasses()}>
            {/* Top Bar with 3-Zone Contract and Page Links */}
            <TopBar
              brandName={siteConfig.brandName}
              themeStyles={themeStyles}
              currentPage={currentPage}
              onNavigate={navigateTo}
              onOpenStudio={handleToggleStudio}
              isStudioOpen={isStudioOpen}
              onOpenCommandPalette={() => {
                trackModal('CommandPalette', 'open', { trigger: 'top_bar_search_button' });
                setIsCommandPaletteOpen(true);
              }}
            />

            {/* Page Router Outlet */}
            <div className="min-h-[75vh]">
              {currentPage === 'home' && (
                <HomePage
                  siteConfig={siteConfig}
                  themeStyles={themeStyles}
                  onNavigate={navigateTo}
                  onUpdateHeroTitle={(val) => {
                    trackBuilderInteraction('hero_title_edited', 'HeroInlineEditor', {
                      newTitleLength: val.length,
                    });
                    setSiteConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: val },
                    }));
                  }}
                />
              )}

              {currentPage === 'services' && (
                <ServicesPage
                  siteConfig={siteConfig}
                  themeStyles={themeStyles}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'work' && (
                <WorkPage
                  siteConfig={siteConfig}
                  themeStyles={themeStyles}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage
                  siteConfig={siteConfig}
                  themeStyles={themeStyles}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'pricing' && (
                <PricingPage
                  siteConfig={siteConfig}
                  themeStyles={themeStyles}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  siteConfig={siteConfig}
                  themeStyles={themeStyles}
                  onNavigate={navigateTo}
                  preloadedData={pageNavigationData}
                  onTrackSubmit={(formData) => trackForm('ContactBrief', 'submit', formData)}
                />
              )}
            </div>

            {/* Footer */}
            <Footer
              brandName={siteConfig.brandName}
              brandTagline={siteConfig.brandTagline}
              themeStyles={themeStyles}
              onNavigate={navigateTo}
            />
          </div>
        </main>

        {/* Studio Drawer Toolbar */}
        {isStudioOpen && (
          <StudioToolbar
            siteConfig={siteConfig}
            themeStyles={themeStyles}
            currentPage={currentPage}
            viewport={viewport}
            onNavigate={navigateTo}
            onSetViewport={handleSetViewport}
            onUpdateConfig={setSiteConfig}
            onSelectTemplate={handleSelectTemplate}
            onOpenExport={handleOpenExport}
            onCloseStudio={handleToggleStudio}
            onOpenAnalytics={() => {
              trackModal('BackendAnalyticsModal', 'open', { source: 'StudioToolbar' });
              setIsAnalyticsOpen(true);
            }}
            telemetryCount={summary.totalEvents}
          />
        )}
      </div>

      {/* Export Code Modal */}
      {isExportOpen && (
        <ExportCodeModal
          siteConfig={siteConfig}
          themeStyles={themeStyles}
          onClose={() => {
            trackModal('ExportCodeModal', 'close');
            setIsExportOpen(false);
          }}
        />
      )}

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => {
          trackModal('CommandPalette', 'close');
          setIsCommandPaletteOpen(false);
        }}
        onNavigate={navigateTo}
        onSetViewport={handleSetViewport}
        onSetTheme={handleSetTheme}
        onSelectTemplate={handleSelectTemplate}
        onToggleStudio={handleToggleStudio}
        onOpenExport={handleOpenExport}
        onOpenAnalytics={() => {
          trackModal('BackendAnalyticsModal', 'open', { source: 'CommandPalette' });
          setIsAnalyticsOpen(true);
        }}
        themeStyles={themeStyles}
        siteConfig={siteConfig}
      />

      {/* Dedicated Backend Telemetry & Ingestion Console (Isolated from public website) */}
      <BackendAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => {
          trackModal('BackendAnalyticsModal', 'close');
          setIsAnalyticsOpen(false);
        }}
        events={events}
        summary={summary}
        sessionId={sessionId}
        simulatedEndpoint={simulatedEndpoint}
        autoDispatch={autoDispatch}
        onToggleAutoDispatch={setAutoDispatch}
        onFlushQueue={flushQueuedEvents}
        onClearEvents={clearEvents}
        onExportJson={exportEventsJson}
        onSendTestPing={handleSendTestPing}
        isSimulatingDispatch={isSimulatingDispatch}
      />
    </div>
  );
}
