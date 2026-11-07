import React, { useState, useMemo } from 'react';
import { AnalyticsEvent, AnalyticsSummary, ClientInquiry } from '../types/analytics.ts';

interface BackendAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: AnalyticsEvent[];
  inquiries: ClientInquiry[];
  summary: AnalyticsSummary;
  sessionId: string;
  adminEmail: string;
  onUpdateAdminEmail: (email: string) => void;
  onUpdateInquiryStatus: (id: string, status: 'new' | 'replied' | 'archived', replyNotes?: string) => void;
  onDeleteInquiry: (id: string) => void;
  onAddTestInquiry: () => void;
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
  inquiries,
  summary,
  sessionId,
  adminEmail,
  onUpdateAdminEmail,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onAddTestInquiry,
  simulatedEndpoint,
  autoDispatch,
  onToggleAutoDispatch,
  onFlushQueue,
  onClearEvents,
  onExportJson,
  onSendTestPing,
  isSimulatingDispatch,
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'stream' | 'insights' | 'backend-code'>('inbox');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'replied' | 'archived'>('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [editingAdminEmail, setEditingAdminEmail] = useState(adminEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Filtered inquiries list
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
      const q = inquirySearch.toLowerCase();
      const matchesSearch =
        !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.company.toLowerCase().includes(q) ||
        inq.refId.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [inquiries, inquiryFilter, inquirySearch]);

  // Filtered telemetry event list
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

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAdminEmail.trim()) {
      onUpdateAdminEmail(editingAdminEmail.trim());
      setIsEditingEmail(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const sampleBackendSnippet = `// Production Backend Analytics & Client Inquiries Ingestion (Node.js / Express)
// POST ${simulatedEndpoint}

import express from 'express';
import nodemailer from 'nodemailer'; // Or Resend / SendGrid
const router = express.Router();

// 1. Ingest Client Inquiries & Send Instant Email Notification
router.post('/api/v1/inquiries', async (req, res) => {
  try {
    const { refId, name, email, company, projectCategory, budget, timeline, message } = req.body;

    // Validate client message
    if (!email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Persist to Database (Postgres / Firestore / MongoDB)
    // await db.clientInquiries.create({ refId, name, email, company, budget, timeline, message });

    // Send instant alert email to David
    const transporter = nodemailer.createTransport({ /* SMTP / SendGrid credentials */ });
    await transporter.sendMail({
      from: '"SiteForge Platform" <no-reply@siteforge.io>',
      to: '${adminEmail}',
      replyTo: email,
      subject: \`[New Client Brief] \${name} from \${company || 'Stealth Project'} (\${refId})\`,
      text: \`New Client Inquiry Received:\\n\\nName: \${name}\\nEmail: \${email}\\nCompany: \${company}\\nBudget: \${budget}\\nTimeline: \${timeline}\\n\\nClient Opinion & Goals:\\n\${message}\`
    });

    return res.status(200).json({ status: 'inquiry_acknowledged', refId });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process inquiry' });
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
        className="w-full max-w-5xl h-[92vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg">
              📬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base tracking-wide font-display">
                  Backend Client Inquiries & Telemetry Console
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                <span>Routing to Lead Partner:</span>
                {isEditingEmail ? (
                  <form onSubmit={handleSaveEmail} className="inline-flex items-center gap-1">
                    <input
                      type="email"
                      value={editingAdminEmail}
                      onChange={(e) => setEditingAdminEmail(e.target.value)}
                      className="px-2 py-0.5 text-xs bg-neutral-800 border border-blue-500 rounded text-white font-mono"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2 py-0.5 text-[11px] font-bold bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(false)}
                      className="px-1.5 py-0.5 text-[11px] text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-mono text-blue-400 font-semibold">
                    {adminEmail}
                    <button
                      onClick={() => {
                        setEditingAdminEmail(adminEmail);
                        setIsEditingEmail(true);
                      }}
                      className="text-[10px] text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onAddTestInquiry}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 transition cursor-pointer flex items-center gap-1.5"
              title="Simulates a real prospective client submitting a brief"
            >
              <span>+ Simulate Client Brief</span>
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

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-3 border-b border-neutral-800 bg-neutral-900/40 text-xs">
          <div
            onClick={() => setActiveTab('inbox')}
            className={`border rounded-xl p-3 cursor-pointer transition ${
              activeTab === 'inbox'
                ? 'bg-blue-950/40 border-blue-500/60'
                : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Client Inquiries</span>
              {summary.unreadInquiries > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  {summary.unreadInquiries} New
                </span>
              )}
            </div>
            <div className="text-xl font-bold text-white mt-1 font-mono">{summary.totalInquiries}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Ready for immediate reply</div>
          </div>

          <div
            onClick={() => setActiveTab('stream')}
            className={`border rounded-xl p-3 cursor-pointer transition ${
              activeTab === 'stream'
                ? 'bg-blue-950/40 border-blue-500/60'
                : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Total Events</div>
            <div className="text-xl font-bold text-white mt-1 font-mono">{summary.totalEvents}</div>
            <div className="text-[10px] text-blue-400 mt-0.5">{summary.dispatchedCount} dispatched to backend</div>
          </div>

          <div
            onClick={() => setActiveTab('insights')}
            className={`border rounded-xl p-3 cursor-pointer transition ${
              activeTab === 'insights'
                ? 'bg-blue-950/40 border-blue-500/60'
                : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Page Views</div>
            <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{summary.navigationCount}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Route transitions recorded</div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3">
            <div className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">Admin Recipient</div>
            <div className="text-xs font-mono text-purple-300 mt-1 truncate" title={adminEmail}>
              {adminEmail}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Direct partner inbox</div>
          </div>
        </div>

        {/* Tab Switcher & Action Controls */}
        <div className="px-6 py-2.5 border-b border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inbox'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>Client Inquiries & Opinions</span>
              <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-black/40 text-blue-200">
                {inquiries.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('stream')}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'stream'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Telemetry Stream ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'insights'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Insights & Traffic
            </button>
            <button
              onClick={() => setActiveTab('backend-code')}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'backend-code'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Production API Code
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSendTestPing}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition cursor-pointer"
              title="Send synthetic telemetry ping"
            >
              ⚡ Test Ping
            </button>
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
              Clear Logs
            </button>
          </div>
        </div>

        {/* TAB 1: CLIENT INQUIRIES & OPINIONS INBOX */}
        {activeTab === 'inbox' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Pills and Search */}
            <div className="px-6 py-2.5 bg-neutral-900/30 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-500 mr-1">Status:</span>
                {[
                  { id: 'all', label: `All (${inquiries.length})` },
                  { id: 'new', label: `New (${inquiries.filter((i) => i.status === 'new').length})` },
                  { id: 'replied', label: `Replied (${inquiries.filter((i) => i.status === 'replied').length})` },
                  { id: 'archived', label: `Archived (${inquiries.filter((i) => i.status === 'archived').length})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setInquiryFilter(f.id as any)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                      inquiryFilter === f.id
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 font-bold'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search by client, email, company, keyword..."
                  className="w-full px-3 py-1 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
                {inquirySearch && (
                  <button
                    onClick={() => setInquirySearch('')}
                    className="absolute right-2 top-1 text-neutral-500 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Inquiries List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredInquiries.length === 0 ? (
                <div className="h-56 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-800 rounded-2xl">
                  <div className="text-3xl mb-2">📭</div>
                  <p className="text-sm font-medium text-neutral-300">No client inquiries found</p>
                  <p className="text-xs text-neutral-500 max-w-md mt-1">
                    When visitors submit the Project Discovery Brief on your website, their exact messages, opinions, and budget parameters will appear here immediately.
                  </p>
                  <button
                    onClick={onAddTestInquiry}
                    className="mt-4 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                  >
                    Generate Sample Client Brief
                  </button>
                </div>
              ) : (
                filteredInquiries.map((inq) => {
                  const replyMailto = `mailto:${inq.email}?subject=Re: Your SiteForge Project Brief (${inq.refId}) - Technical Partnership&body=Hi ${encodeURIComponent(
                    inq.name
                  )},%0D%0A%0D%0AThank you for reaching out to SiteForge Studio regarding ${encodeURIComponent(
                    inq.company || 'your project'
                  )}.%0D%0A%0D%0AWe have reviewed your requirements for ${encodeURIComponent(
                    inq.projectCategory
                  )} (${encodeURIComponent(inq.budget)}, ${encodeURIComponent(
                    inq.timeline
                  )}). Our engineering partners would love to discuss architectural feasibility and sprint availability.%0D%0A%0D%0AAre you available for a brief 15-minute introductory call this week?%0D%0A%0D%0ABest regards,%0D%0ADavid Wrekman%0D%0ATechnical Director | SiteForge Studio%0D%0A${encodeURIComponent(
                    adminEmail
                  )}`;

                  const isNew = inq.status === 'new';
                  const isReplied = inq.status === 'replied';

                  return (
                    <div
                      key={inq.id}
                      className={`border rounded-2xl p-5 transition ${
                        isNew
                          ? 'bg-neutral-900/80 border-blue-500/40 shadow-lg'
                          : 'bg-neutral-900/40 border-neutral-800/80'
                      }`}
                    >
                      {/* Top Row: Client Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                              isNew
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : isReplied
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                            }`}
                          >
                            {inq.status}
                          </span>

                          <span className="font-mono text-xs text-blue-400 font-semibold">
                            {inq.refId}
                          </span>

                          <span className="text-neutral-500 text-xs">·</span>
                          <span className="text-xs text-neutral-400 font-mono">
                            {new Date(inq.timestamp).toLocaleString()}
                          </span>
                        </div>

                        {/* Direct Reply Button */}
                        <div className="flex items-center gap-2">
                          <a
                            href={replyMailto}
                            onClick={() => onUpdateInquiryStatus(inq.id, 'replied')}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <span>✉ Reply to Client</span>
                          </a>

                          {isNew ? (
                            <button
                              onClick={() => onUpdateInquiryStatus(inq.id, 'replied')}
                              className="px-2.5 py-1.5 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer"
                              title="Mark as Replied"
                            >
                              ✓ Mark Replied
                            </button>
                          ) : (
                            <button
                              onClick={() => onUpdateInquiryStatus(inq.id, 'new')}
                              className="px-2.5 py-1.5 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition cursor-pointer"
                              title="Mark as New"
                            >
                              ↺ Mark New
                            </button>
                          )}

                          <button
                            onClick={() =>
                              onUpdateInquiryStatus(inq.id, inq.status === 'archived' ? 'replied' : 'archived')
                            }
                            className="px-2 py-1.5 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition cursor-pointer"
                            title="Archive"
                          >
                            {inq.status === 'archived' ? 'Unarchive' : 'Archive'}
                          </button>

                          <button
                            onClick={() => onDeleteInquiry(inq.id)}
                            className="p-1.5 text-xs rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Client Meta Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-3 text-xs">
                        <div>
                          <span className="text-neutral-500 block text-[11px]">Client Name</span>
                          <span className="font-semibold text-white text-sm">{inq.name}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[11px]">Work Email</span>
                          <span className="font-mono text-blue-400 select-all">{inq.email}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[11px]">Company / Project</span>
                          <span className="text-neutral-200">{inq.company || 'Confidential Venture'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[11px]">Budget & Window</span>
                          <span className="text-amber-400 font-mono text-[11px]">
                            {inq.budget} · {inq.timeline}
                          </span>
                        </div>
                      </div>

                      {/* Client's Opinion & Project Brief */}
                      <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/90 text-xs">
                        <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                          <span>Client Requirements & Opinions:</span>
                          <button
                            onClick={() => copyToClipboard(inq.message, inq.id)}
                            className="text-[10px] text-neutral-400 hover:text-white cursor-pointer"
                          >
                            {copiedEmail === inq.id ? '✓ Copied' : 'Copy Text'}
                          </button>
                        </div>
                        <p className="text-neutral-200 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                          {inq.message}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE TELEMETRY STREAM */}
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
              </div>
            </div>

            {/* Event List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
              {filteredEvents.map((ev) => {
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
                        <span className="font-semibold text-white text-xs font-mono">{ev.eventName}</span>
                        <span className="text-neutral-500 text-xs">via</span>
                        <span className="text-xs font-mono text-neutral-300 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">
                          {ev.component}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          HTTP 200 ({ev.simulatedLatencyMs || 120}ms)
                        </span>
                        <span className="text-neutral-500 font-mono text-[11px]">{formattedTime}</span>
                        <span className="text-neutral-500 text-xs">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 py-3 border-t border-neutral-800 bg-neutral-950/80 font-mono text-xs">
                        <pre className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] overflow-x-auto leading-relaxed">
                          {JSON.stringify(ev, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: INSIGHTS & TRAFFIC */}
        {activeTab === 'insights' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
              <h3 className="font-bold text-white text-sm tracking-wide mb-3 flex items-center gap-2">
                <span>📊</span> Page Navigation Distribution
              </h3>
              <div className="space-y-3">
                {Object.entries(summary.pageViews).map(([page, count]) => {
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
                })}
              </div>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
              <h3 className="font-bold text-white text-sm tracking-wide mb-3 flex items-center gap-2">
                <span>🛠</span> Top Builder Interactions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(summary.topActions).map(([action, count]) => (
                  <div
                    key={action}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-neutral-300 truncate mr-2">{action}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {count}×
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTION API CODE & INTEGRATION */}
        {activeTab === 'backend-code' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">
                    Live Email Dispatch & Ingestion API
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Connect your backend or mail provider to forward briefs directly to{' '}
                    <span className="text-blue-400 font-mono">{adminEmail}</span>:
                  </p>
                </div>
                <button
                  onClick={copyBackendCode}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                >
                  {copiedCode ? '✓ Copied Code!' : 'Copy Backend Handler'}
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
            <span>
              Inquiries and telemetry are completely separate from the public client layout
            </span>
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
