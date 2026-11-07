import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AnalyticsEvent, AnalyticsEventType, AnalyticsSummary, DispatchStatus } from '../types/analytics.ts';
import { PageId, DeviceViewport, TemplateId, ThemeMode } from '../types/site.ts';

const STORAGE_KEY = 'siteforge_builder_telemetry_events';
const SESSION_KEY = 'siteforge_telemetry_session_id';
const DEFAULT_ENDPOINT = 'https://api.siteforge.io/v1/telemetry/events';

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const newId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, newId);
    return newId;
  } catch {
    return `sess_${Date.now()}_fallback`;
  }
}

function loadInitialEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.slice(0, 150);
    }
  } catch (err) {
    console.warn('[Analytics] Failed to restore cached events:', err);
  }
  return [];
}

export interface UseAnalyticsOptions {
  viewport?: DeviceViewport;
  templateId?: TemplateId;
  theme?: ThemeMode;
  autoDispatch?: boolean;
}

export function useAnalytics(options?: UseAnalyticsOptions) {
  const [events, setEvents] = useState<AnalyticsEvent[]>(loadInitialEvents);
  const [simulatedEndpoint, setSimulatedEndpoint] = useState<string>(DEFAULT_ENDPOINT);
  const [autoDispatch, setAutoDispatch] = useState<boolean>(options?.autoDispatch ?? true);
  const [isSimulatingDispatch, setIsSimulatingDispatch] = useState<boolean>(false);
  const [lastDispatchedAt, setLastDispatchedAt] = useState<string | null>(null);

  const sessionIdRef = useRef<string>(getOrCreateSessionId());
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Persist to localStorage whenever events change (capped at 150 items)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 150)));
    } catch (e) {
      console.warn('[Analytics] Storage quota exceeded for telemetry cache');
    }
  }, [events]);

  // Dispatch an event to the simulated backend service
  const dispatchToSimulatedBackend = useCallback((eventItem: AnalyticsEvent) => {
    const latency = Math.floor(80 + Math.random() * 180); // 80ms - 260ms realistic REST latency

    setTimeout(() => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventItem.id
            ? {
                ...ev,
                dispatchStatus: 'dispatched_simulated',
                simulatedLatencyMs: latency,
              }
            : ev
        )
      );
      setLastDispatchedAt(new Date().toISOString());

      // Log in browser developer console with distinct formatting
      console.log(
        `%c[Telemetry Backend Simulator] 📡 POST ${DEFAULT_ENDPOINT} ➔ HTTP 200 OK (${latency}ms)`,
        'color: #38bdf8; font-weight: bold; background: #0f172a; padding: 2px 6px; border-radius: 4px;',
        {
          eventId: eventItem.id,
          eventName: eventItem.eventName,
          component: eventItem.component,
          payload: eventItem.payload,
        }
      );
    }, latency);
  }, []);

  // Primary event tracking dispatcher
  const trackEvent = useCallback(
    (input: {
      eventType: AnalyticsEventType;
      eventName: string;
      component: string;
      payload?: Record<string, any>;
      customViewport?: string;
      customTemplate?: string;
    }) => {
      const id = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newEvent: AnalyticsEvent = {
        id,
        timestamp: new Date().toISOString(),
        sessionId: sessionIdRef.current,
        eventType: input.eventType,
        eventName: input.eventName,
        component: input.component,
        payload: input.payload || {},
        deviceViewport: input.customViewport || optionsRef.current?.viewport || 'desktop',
        activeTemplate: input.customTemplate || optionsRef.current?.templateId || 'agency',
        dispatchStatus: autoDispatch ? 'queued' : 'captured',
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 149)]);

      if (autoDispatch) {
        dispatchToSimulatedBackend(newEvent);
      }

      return newEvent;
    },
    [autoDispatch, dispatchToSimulatedBackend]
  );

  // Specialized: Page & route transitions
  const trackNavigation = useCallback(
    (page: PageId, source: string = 'TopBar', extra?: Record<string, any>) => {
      return trackEvent({
        eventType: 'navigation',
        eventName: 'page_view',
        component: source,
        payload: {
          targetPage: page,
          routePath: `/#/${page}`,
          title: `Page ${page.toUpperCase()}`,
          ...extra,
        },
      });
    },
    [trackEvent]
  );

  // Specialized: Site builder and customizer actions
  const trackBuilderInteraction = useCallback(
    (action: string, component: string, payload?: Record<string, any>) => {
      return trackEvent({
        eventType: 'builder_interaction',
        eventName: action,
        component,
        payload: payload || {},
      });
    },
    [trackEvent]
  );

  // Specialized: Modal toggles (Export, Command Palette, Details)
  const trackModal = useCallback(
    (modalName: string, action: 'open' | 'close', extra?: Record<string, any>) => {
      return trackEvent({
        eventType: 'modal_toggle',
        eventName: action === 'open' ? 'modal_opened' : 'modal_closed',
        component: modalName,
        payload: {
          modalName,
          action,
          ...extra,
        },
      });
    },
    [trackEvent]
  );

  // Specialized: Form submissions and inquiry engagements
  const trackForm = useCallback(
    (formName: string, action: 'start' | 'field_change' | 'submit', payload?: Record<string, any>) => {
      return trackEvent({
        eventType: 'form_submission',
        eventName: `form_${action}`,
        component: formName,
        payload: {
          formName,
          action,
          ...payload,
        },
      });
    },
    [trackEvent]
  );

  // Manually trigger batch flush of all queued/captured events
  const flushQueuedEvents = useCallback(async () => {
    setIsSimulatingDispatch(true);
    const unposted = events.filter((e) => e.dispatchStatus !== 'dispatched_simulated');

    if (unposted.length === 0) {
      setIsSimulatingDispatch(false);
      return;
    }

    await new Promise((res) => setTimeout(res, 350));

    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        dispatchStatus: 'dispatched_simulated',
        simulatedLatencyMs: Math.floor(120 + Math.random() * 100),
      }))
    );

    setIsSimulatingDispatch(false);
    setLastDispatchedAt(new Date().toISOString());
  }, [events]);

  // Clear all events from state and storage
  const clearEvents = useCallback(() => {
    setEvents([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Export events as downloadable JSON
  const exportEventsJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `siteforge-telemetry-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [events]);

  // Summary and aggregation calculations
  const summary: AnalyticsSummary = useMemo(() => {
    const pageViews: Record<string, number> = {};
    const topActions: Record<string, number> = {};

    let navCount = 0;
    let builderCount = 0;
    let modalCount = 0;
    let formCount = 0;
    let dispatchedCount = 0;

    events.forEach((ev) => {
      if (ev.dispatchStatus === 'dispatched_simulated') dispatchedCount++;

      if (ev.eventType === 'navigation') {
        navCount++;
        const target = ev.payload?.targetPage || 'unknown';
        pageViews[target] = (pageViews[target] || 0) + 1;
      } else if (ev.eventType === 'builder_interaction') {
        builderCount++;
        topActions[ev.eventName] = (topActions[ev.eventName] || 0) + 1;
      } else if (ev.eventType === 'modal_toggle') {
        modalCount++;
        topActions[ev.eventName] = (topActions[ev.eventName] || 0) + 1;
      } else if (ev.eventType === 'form_submission') {
        formCount++;
        topActions[ev.eventName] = (topActions[ev.eventName] || 0) + 1;
      }
    });

    return {
      totalEvents: events.length,
      navigationCount: navCount,
      builderInteractionsCount: builderCount,
      modalCount: modalCount,
      formSubmissionsCount: formCount,
      dispatchedCount,
      pageViews,
      topActions,
      sessionStartTime: events[events.length - 1]?.timestamp || new Date().toISOString(),
      simulatedBackendEndpoint: simulatedEndpoint,
      isBackendConnected: true,
    };
  }, [events, simulatedEndpoint]);

  return {
    events,
    summary,
    sessionId: sessionIdRef.current,
    simulatedEndpoint,
    setSimulatedEndpoint,
    autoDispatch,
    setAutoDispatch,
    isSimulatingDispatch,
    lastDispatchedAt,
    trackEvent,
    trackNavigation,
    trackBuilderInteraction,
    trackModal,
    trackForm,
    flushQueuedEvents,
    clearEvents,
    exportEventsJson,
  };
}
