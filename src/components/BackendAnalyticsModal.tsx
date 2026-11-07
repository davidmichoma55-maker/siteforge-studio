import React, { useState, useMemo } from 'react';
import { AnalyticsEvent, AnalyticsSummary, AnalyticsEventType } from '../types/analytics.ts';

interface BackendAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: AnalyticsEvent[];
  summary: AnalyticsSummary;
  sessionId: string;
  simulatedEndpoint: string;
  autoDispatch: boolean;
  onToggleAutoDispatch: (val: boolean) => void;
  onFlushQueue: () => void;
  onClearEvents: () => void;
  onExportJson: () => void;
  onSendTestPing: () => void;
  isSimulatingDispatch: boolean;
}

export const BackendAnalyticsModal: React.FC<BackendAnalyticsModalProps> = ({
  isOpen,
  onClose,
  events,
  summary,
  sessionId,
  simulatedEndpoint,
  autoDispatch,
  onToggleAutoDispatch,
  onFlushQueue,
  onClearEvents,
  onExportJson,
  onSendTestPing,
  isSimulatingDispatch,
}) => {
  const [activeTab, setActiveTab] = useState<'stream' | 'insights' | 'backend-code'>('stream');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filtered event list
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'navigation' && ev.eventType === 'navigation') ||
        (selectedFilter === 'builder' && ev.eventType === 'builder_interaction') ||
        (selectedFilter === 'modal' && ev.eventType === 'modal_toggle') ||
        (selectedFilter === 'form' && ev.eventType === 'form_submission');

      const matchesSearch =
        !searchQuery ||
        ev.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
        JSON.stringify(ev.payload).toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [events, selectedFilter, searchQuery]);

  if (!isOpen) return null;

  const sampleBackendSnippet = `// Production Backend Analytics Endpoint (Node.js / Express)
// POST ${simulatedEndpoint}

import express from 'express';
const router = express.Router();

router.post('/api/v1/telemetry/events', async (req, res) => {
  try {
    const { id, timestamp, sessionId, eventType, eventName, component, payload, deviceViewport } = req.body;

    // 1. Validate payload
    if (!eventName || !sessionId) {
      return res.status(400).json({ error: 'Missing required telemetry fields' });
    }

    // 2. Persist to Postgres / BigQuery / Datadog / ClickHouse
    console.log(\`[Analytics Ingested] \${eventName} from \${component} (Session: \${sessionId})\`);
    
    // await db.telemetryEvents.insert({ id, timestamp, sessionId, eventType, eventName, component, payload, deviceViewport });

    return res.status(200).json({
      status: 'acknowledged',
      receivedId: id,
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal telemetry ingestion failure' });
  }
});

export default router;`;

  const copyBackendCode = () => {
    navigator.clipboard.writeText(sampleBackendSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-5xl h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Distinct Backend Observability Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg">
              📡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base tracking-wide font-display">
                  Backend Analytics & Telemetry Console
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Simulated Ingestion Active
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Target Service: <span className="text-blue-400">{simulatedEndpoint}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onSendTestPing}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition cursor-pointer flex items-center gap-1.5"
              title="Dispatches a synthetic telemetry ping through useAnalytics hook"
            >
              <span>⚡ Send Test Ping</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close Console"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Telemetry Summary Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-3 border-b border-neutral-800 bg-neutral-900/40 text-xs">
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3">
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Total Captured</div>
            <div className="text-xl font-bold text-white mt-1 font-mono">{summary.totalEvents}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              {summary.dispatchedCount} dispatched to backend
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3">
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Navigation Views</div>
            <div className="text-xl font-bold text-blue-400 mt-1 font-mono">{summary.navigationCount}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Page transitions & hash routes</div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3">
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Builder Actions</div>
            <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{summary.builderInteractionsCount}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Themes, templates, viewport, SEO</div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3">
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Active Session</div>
            <div className="text-xs font-mono text-purple-300 mt-1 truncate" title={sessionId}>
              {sessionId}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Device: Client Browser</div>
          </div>
        </div>

        {/* Tab Switcher & Action Controls */}
        <div className="px-6 py-2.5 border-b border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            <button
              onClick={() => setActiveTab('stream')}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'stream'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Live Event Stream ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'insights'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Aggregated Insights
            </button>
            <button
              onClick={() => setActiveTab('backend-code')}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'backend-code'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Backend API Schema
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-neutral-300 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => onToggleAutoDispatch(e.target.checked)}
                className="rounded border-neutral-700 text-blue-600 focus:ring-0 bg-neutral-900"
              />
              <span>Auto-dispatch to backend</span>
            </label>

            {!autoDispatch && (
              <button
                onClick={onFlushQueue}
                disabled={isSimulatingDispatch}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer disabled:opacity-50"
              >
                {isSimulatingDispatch ? 'Flushing...' : 'Flush Queue'}
              </button>
            )}

            <button
              onClick={onExportJson}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition cursor-pointer"
            >
              Export JSON
            </button>

            <button
              onClick={onClearEvents}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/50 transition cursor-pointer"
            >
              Clear Log
            </button>
          </div>
        </div>

        {/* Tab 1: Live Event Stream */}
        {activeTab === 'stream' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Pills and Search */}
            <div className="px-6 py-2.5 bg-neutral-900/30 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-neutral-500 mr-1">Filter:</span>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'navigation', label: 'Navigation' },
                  { id: 'builder', label: 'Builder Actions' },
                  { id: 'modal', label: 'Modals' },
                  { id: 'form', label: 'Forms & Leads' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFilter(f.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                      selectedFilter === f.id
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, components, payload..."
                  className="w-full px-3 py-1 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1 text-neutral-500 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Event List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
              {filteredEvents.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-800 rounded-xl">
                  <div className="text-3xl mb-2">📡</div>
                  <p className="text-sm font-medium text-neutral-300">No telemetry events captured yet</p>
                  <p className="text-xs text-neutral-500 max-w-sm mt-1">
                    Interact with the site builder (switch pages, change themes, toggle viewports, or click "Send Test Ping") to simulate live data capture.
                  </p>
                  <button
                    onClick={onSendTestPing}
                    className="mt-4 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                  >
                    Generate Sample Telemetry Event
                  </button>
                </div>
              ) : (
                filteredEvents.map((ev) => {
                  const isExpanded = expandedEventId === ev.id;
                  const formattedTime = new Date(ev.timestamp).toLocaleTimeString();

                  const typeColor =
                    ev.eventType === 'navigation'
                      ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
                      : ev.eventType === 'builder_interaction'
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                      : ev.eventType === 'modal_toggle'
                      ? 'text-purple-400 bg-purple-500/10 border-purple-500/30'
                      : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

                  return (
                    <div
                      key={ev.id}
                      className="border border-neutral-800/90 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/70 transition overflow-hidden"
                    >
                      <div
                        onClick={() => setExpandedEventId(isExpanded ? null : ev.id)}
                        className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${typeColor}`}>
                            {ev.eventType.replace('_', ' ')}
                          </span>

                          <span className="font-semibold text-white text-xs font-mono">
                            {ev.eventName}
                          </span>

                          <span className="text-neutral-500 text-xs">via</span>
                          <span className="text-xs font-mono text-neutral-300 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">
                            {ev.component}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          {ev.dispatchStatus === 'dispatched_simulated' ? (
                            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              HTTP 200 ({ev.simulatedLatencyMs || 120}ms)
                            </span>
                          ) : (
                            <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              Queued
                            </span>
                          )}

                          <span className="text-neutral-500 font-mono text-[11px]">
                            {formattedTime}
                          </span>

                          <span className="text-neutral-500 text-xs">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {/* Expandable Raw Ingest Payload */}
                      {isExpanded && (
                        <div className="px-4 py-3 border-t border-neutral-800 bg-neutral-950/80 font-mono text-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                              Dispatched Payload (JSON Schema):
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(JSON.stringify(ev, null, 2));
                              }}
                              className="px-2 py-0.5 rounded text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition cursor-pointer"
                            >
                              Copy JSON
                            </button>
                          </div>
                          <pre className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] overflow-x-auto leading-relaxed">
                            {JSON.stringify(
                              {
                                id: ev.id,
                                timestamp: ev.timestamp,
                                sessionId: ev.sessionId,
                                eventType: ev.eventType,
                                eventName: ev.eventName,
                                component: ev.component,
                                deviceViewport: ev.deviceViewport,
                                activeTemplate: ev.activeTemplate,
                                payload: ev.payload,
                              },
                              null,
                              2
                            )}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Aggregated Insights */}
        {activeTab === 'insights' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Page View Breakdown */}
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
              <h3 className="font-bold text-white text-sm tracking-wide mb-3 flex items-center gap-2">
                <span>📊</span> Page Navigation Distribution
              </h3>
              <div className="space-y-3">
                {Object.entries(summary.pageViews).length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">No page navigation captured yet.</p>
                ) : (
                  Object.entries(summary.pageViews).map(([page, count]) => {
                    const percentage = Math.round((count / (summary.navigationCount || 1)) * 100);
                    return (
                      <div key={page} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-neutral-200">/{page}</span>
                          <span className="text-neutral-400">
                            {count} visits ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Top Builder Interactions */}
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
              <h3 className="font-bold text-white text-sm tracking-wide mb-3 flex items-center gap-2">
                <span>🛠</span> Top Builder Interactions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(summary.topActions).length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">No builder actions recorded yet.</p>
                ) : (
                  Object.entries(summary.topActions).map(([action, count]) => (
                    <div
                      key={action}
                      className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-neutral-300 truncate mr-2">{action}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        {count}×
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Backend Ingestion Architecture & Ready Code */}
        {activeTab === 'backend-code' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">
                    Live Telemetry Ingestion Contract
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    When you hook this up to your real backend, point the hook's endpoint to your API:
                  </p>
                </div>
                <button
                  onClick={copyBackendCode}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                >
                  {copiedCode ? '✓ Copied Code!' : 'Copy Express Handler'}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-xs overflow-x-auto leading-relaxed">
                {sampleBackendSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Console Bottom Action Bar */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Events are tracked independently from public website layout</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
