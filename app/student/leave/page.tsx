"use client";
import { useState } from "react";
import { FileText, CheckCircle2, XCircle, Clock, AlertCircle, ChevronDown } from "lucide-react";

const leaveTypes = ["Medical", "Personal", "Family Emergency", "Cultural Event", "Sports"];

const initialHistory = [
  { id: 1, from: "Apr 10", to: "Apr 12", type: "Medical", days: 3, reason: "Fever and viral infection", status: "Approved", remarks: "Get well soon" },
  { id: 2, from: "Mar 5", to: "Mar 5", type: "Personal", days: 1, reason: "Family function", status: "Approved", remarks: "Noted" },
  { id: 3, from: "Feb 20", to: "Feb 21", type: "Medical", days: 2, reason: "Dental procedure", status: "Approved", remarks: "Submit medical certificate on return" },
  { id: 4, from: "May 15", to: "May 16", type: "Cultural Event", days: 2, reason: "Inter-college cultural fest participation", status: "Pending", remarks: "Under review" },
  { id: 5, from: "May 20", to: "May 20", type: "Personal", days: 1, reason: "Personal work", status: "Pending", remarks: "Awaiting HOD approval" },
];

const statusStyles: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  Approved: { bg: "rgba(16,185,129,0.15)", color: "#10b981", icon: <CheckCircle2 size={12} /> },
  Pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", icon: <Clock size={12} /> },
  Rejected: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", icon: <XCircle size={12} /> },
};

const typeColors: Record<string, string> = {
  Medical: "#ef4444", Personal: "#6366f1", "Family Emergency": "#f59e0b",
  "Cultural Event": "#a855f7", Sports: "#10b981",
};

export default function LeavePage() {
  const [history, setHistory] = useState(initialHistory);
  const [form, setForm] = useState({ type: "Medical", from: "", to: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const taken = history.filter(h => h.status === "Approved").reduce((s, h) => s + h.days, 0);
  const pending = history.filter(h => h.status === "Pending").length;

  const handleSubmit = () => {
    if (!form.from || !form.to || !form.reason.trim()) {
      setError("Please fill all fields before submitting.");
      return;
    }
    const days = Math.max(1, Math.round((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000) + 1);
    const fromStr = new Date(form.from).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const toStr = new Date(form.to).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    setHistory([{ id: Date.now(), from: fromStr, to: toStr, type: form.type, days, reason: form.reason, status: "Pending", remarks: "Submitted, awaiting faculty review" }, ...history]);
    setForm({ type: "Medical", from: "", to: "", reason: "" });
    setError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Leave Applications</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Apply for leave and track your approval status</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Leaves Taken", value: String(taken), sub: `Out of 15 total`, color: "#6366f1", icon: <FileText size={20} /> },
          { label: "Leaves Remaining", value: String(15 - taken), sub: "Available balance", color: "#10b981", icon: <CheckCircle2 size={20} /> },
          { label: "Pending Approvals", value: String(pending), sub: "Awaiting faculty review", color: "#f59e0b", icon: <Clock size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: c.color, marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "1.5rem" }}>
        {/* Application Form */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Apply for Leave</h3>

          {submitted && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, marginBottom: "1rem", color: "#10b981", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle2 size={14} /> Application submitted! Awaiting faculty review.
            </div>
          )}
          {error && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, marginBottom: "1rem", color: "#ef4444", fontSize: "0.82rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Leave Type</label>
              <div style={{ position: "relative" }}>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ width: "100%", padding: "0.625rem 2rem 0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", appearance: "none", cursor: "pointer" }}>
                  {leaveTypes.map(t => <option key={t} value={t} style={{ background: "#1e1e2e" }}>{t}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>From Date</label>
                <input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>To Date</label>
                <input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Reason</label>
              <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Briefly describe the reason for leave..." rows={4} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div style={{ padding: "0.75rem", background: "rgba(245,158,11,0.07)", borderRadius: 10, border: "1px solid rgba(245,158,11,0.2)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              <AlertCircle size={12} style={{ display: "inline", color: "#f59e0b", marginRight: 6 }} />
              Supporting documents (medical certificates, etc.) must be submitted physically at the admin office.
            </div>
            <button onClick={handleSubmit} className="btn-primary" style={{ width: "100%" }}>Submit Application</button>
          </div>
        </div>

        {/* Leave History */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Leave History</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {history.map((h, i) => {
              const ss = statusStyles[h.status];
              const tc = typeColors[h.type] || "#6366f1";
              return (
                <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: `${tc}22`, color: tc, fontWeight: 700 }}>{h.type}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{h.days} day{h.days > 1 ? "s" : ""}</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: ss.bg, color: ss.color, fontWeight: 700 }}>
                      {ss.icon} {h.status}
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>{h.from} — {h.to}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{h.reason}</p>
                  {h.remarks && (
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", padding: "0.4rem 0.75rem", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
                      💬 {h.remarks}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
