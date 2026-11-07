import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsSummary,
  ClientInquiry,
} from '../types/analytics.ts';
import { PageId, DeviceViewport, TemplateId, ThemeMode } from '../types/site.ts';

const STORAGE_KEY = 'siteforge_builder_telemetry_events';
const SESSION_KEY = 'siteforge_telemetry_session_id';
const INQUIRIES_KEY = 'siteforge_client_inquiries_db';
const ADMIN_EMAIL_KEY = 'siteforge_admin_email';
const API_ENDPOINT_KEY = 'siteforge_custom_api_endpoint';

const DEFAULT_ENDPOINT = 'https://api.siteforge.io/v1/telemetry/events';
const DEFAULT_ADMIN_EMAIL = 'davidmichoma55@gmail.com';

const INITIAL_DEMO_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq_179354001',
    refId: 'VF-2026-8491',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    name: 'Marcus Vance',
    email: 'marcus.vance@zenithmobility.com',
    company: 'Zenith Mobility AG',
    projectCategory: 'High-Impact Web Flagship',
    budget: '$15k – $35k (Enterprise Custom)',
    timeline: 'Within 30 Days',
    message:
      'We are preparing our Series A announcement for our autonomous urban transit fleet. We need an ultra-fast, visually stunning digital flagship built with sub-second page loads, interactive fleet maps, and investor deck gating. Our board loved your work for Veloce.',
    status: 'new',
  },
  {
    id: 'inq_179354002',
    refId: 'VF-2026-6214',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    name: 'Dr. Aris Thorne',
    email: 'athorne@neuromind.io',
    company: 'Neuromind Analytics',
    projectCategory: 'Interactive Scope / Pricing Engine',
    budget: '$6k – $15k (Full Platform)',
    timeline: 'Urgent Sprint (14 Days)',
    message:
      'We require a bespoke pricing calculator and customer scoping pipeline for our B2B machine learning API. Can David Wrekman and the technical partners lead this architecture sprint?',
    status: 'replied',
    replyNotes: 'Replied via email with scoping sprint breakdown and NDA.',
  },
];

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

function loadInitialInquiries(): ClientInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('[Inquiries] Failed to restore cached client inquiries:', err);
  }
  return INITIAL_DEMO_INQUIRIES;
}

export interface UseAnalyticsOptions {
  viewport?: DeviceViewport;
  templateId?: TemplateId;
  theme?: ThemeMode;
  autoDispatch?: boolean;
}

export function useAnalytics(options?: UseAnalyticsOptions) {
  const [events, setEvents] = useState<AnalyticsEvent[]>(loadInitialEvents);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(loadInitialInquiries);
  const [adminEmail, setAdminEmailState] = useState<string>(() => {
    return localStorage.getItem(ADMIN_EMAIL_KEY) || DEFAULT_ADMIN_EMAIL;
  });
  const [simulatedEndpoint, setSimulatedEndpoint] = useState<string>(DEFAULT_ENDPOINT);
  const [autoDispatch, setAutoDispatch] = useState<boolean>(options?.autoDispatch ?? true);
  const [isSimulatingDispatch, setIsSimulatingDispatch] = useState<boolean>(false);
  const [lastDispatchedAt, setLastDispatchedAt] = useState<string | null>(null);

  const sessionIdRef = useRef<string>(getOrCreateSessionId());
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Persist telemetry events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 150)));
    } catch (e) {
      console.warn('[Analytics] Storage quota exceeded for telemetry cache');
    }
  }, [events]);

  // Persist client inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('[Inquiries] Storage quota exceeded for inquiries');
    }
  }, [inquiries]);

  // Save admin email
  const setAdminEmail = useCallback((email: string) => {
    setAdminEmailState(email);
    localStorage.setItem(ADMIN_EMAIL_KEY, email);
  }, []);

  // Dispatch an event to the simulated backend service
  const dispatchToSimulatedBackend = useCallback((eventItem: AnalyticsEvent) => {
    const latency = Math.floor(80 + Math.random() * 180);

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

  // Specialized: Modal toggles
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

  // Add real client inquiry to backend database
  const addInquiry = useCallback(
    (input: Omit<ClientInquiry, 'id' | 'timestamp' | 'status'>) => {
      const newInquiry: ClientInquiry = {
        ...input,
        id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        status: 'new',
      };

      setInquiries((prev) => [newInquiry, ...prev]);

      // Automatically log telemetry event
      trackEvent({
        eventType: 'form_submission',
        eventName: 'client_inquiry_received',
        component: 'ContactBriefForm',
        payload: {
          refId: newInquiry.refId,
          clientName: newInquiry.name,
          clientEmail: newInquiry.email,
          company: newInquiry.company,
          budget: newInquiry.budget,
          messagePreview: newInquiry.message.slice(0, 80),
          routedTo: adminEmail,
        },
      });

      return newInquiry;
    },
    [adminEmail, trackEvent]
  );

  // Update inquiry status (new, replied, archived)
  const updateInquiryStatus = useCallback(
    (id: string, status: 'new' | 'replied' | 'archived', replyNotes?: string) => {
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id
            ? {
                ...inq,
                status,
                replyNotes: replyNotes !== undefined ? replyNotes : inq.replyNotes,
              }
            : inq
        )
      );

      trackEvent({
        eventType: 'builder_interaction',
        eventName: `inquiry_marked_${status}`,
        component: 'BackendClientInbox',
        payload: { inquiryId: id, status, replyNotes },
      });
    },
    [trackEvent]
  );

  // Delete an inquiry
  const deleteInquiry = useCallback(
    (id: string) => {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      trackEvent({
        eventType: 'builder_interaction',
        eventName: 'inquiry_deleted',
        component: 'BackendClientInbox',
        payload: { inquiryId: id },
      });
    },
    [trackEvent]
  );

  // Batch flush queued events
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

  // Clear telemetry logs
  const clearEvents = useCallback(() => {
    setEvents([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Export events JSON
  const exportEventsJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `siteforge-telemetry-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [events]);

  // Summary computations
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

    const unreadInquiries = inquiries.filter((inq) => inq.status === 'new').length;

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
      totalInquiries: inquiries.length,
      unreadInquiries,
    };
  }, [events, inquiries, simulatedEndpoint]);

  return {
    events,
    inquiries,
    summary,
    sessionId: sessionIdRef.current,
    adminEmail,
    setAdminEmail,
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
    addInquiry,
    updateInquiryStatus,
    deleteInquiry,
    flushQueuedEvents,
    clearEvents,
    exportEventsJson,
  };
}
