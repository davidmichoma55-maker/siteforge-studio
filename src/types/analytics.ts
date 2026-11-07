export type AnalyticsEventType =
  | 'navigation'
  | 'builder_interaction'
  | 'modal_toggle'
  | 'form_submission'
  | 'system';

export type DispatchStatus = 'captured' | 'queued' | 'dispatched_simulated' | 'failed';

export interface AnalyticsEvent {
  id: string;
  timestamp: string; // ISO string
  sessionId: string;
  eventType: AnalyticsEventType;
  eventName: string;
  component: string;
  payload: Record<string, any>;
  deviceViewport: string;
  activeTemplate: string;
  dispatchStatus: DispatchStatus;
  simulatedLatencyMs?: number;
}

export interface AnalyticsSummary {
  totalEvents: number;
  navigationCount: number;
  builderInteractionsCount: number;
  modalCount: number;
  formSubmissionsCount: number;
  dispatchedCount: number;
  pageViews: Record<string, number>;
  topActions: Record<string, number>;
  sessionStartTime: string;
  simulatedBackendEndpoint: string;
  isBackendConnected: boolean;
}
