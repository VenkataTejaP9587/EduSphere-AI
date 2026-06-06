"use client";
import { useState } from "react";
import { MessageSquare, CheckCircle2, Clock, AlertCircle, Send, Shield, ChevronDown } from "lucide-react";

const initialGrievances = [
  { id: "GRV-2026-051", category: "Infrastructure", subject: "Broken projector in Lab 2", date: "May 22, 2026", status: "Open", priority: "Low", response: "", steps: [true, false, false, false] },
  { id: "GRV-2026-047", category: "Examination", subject: "Hall ticket blocked despite fee payment", date: "May 18, 2026", status: "In Progress", priority: "High", response: "Finance dept verifying transaction.", steps: [true, true, false, false] },
  { id: "GRV-2026-042", category: "Examination", subject: "Internal marks not updated in portal", date: "May 10, 2026", status: "Resolved", priority: "High", response: "Marks updated. Please check portal again.", steps: [true, true, true, true] },
  { id: "GRV-2026-039", category: "Infrastructure", subject: "AC not working in Room 203 for 2 weeks", date: "May 5, 2026", status: "Resolved", priority: "Medium", response: "Maintenance done on May 8. AC functional.", steps: [true, true, true, true] },
  { id: "GRV-2026-038", category: "Academic", subject: "Lab schedule clashes with theory class", date: "Apr 28, 2026", status: "Resolved", priority: "High", response: "Timetable corrected from next week.", steps: [true, true, true, true] },
  { id: "GRV-2026-035", category: "Fee-related", subject: "Paid fee but portal shows unpaid", date: "Apr 15, 2026", status: "Resolved", priority: "High", response: "Records updated. Sorry for inconvenience.", steps: [true, true, true, true] },
  { id: "GRV-2026-033", category: "Faculty Conduct", subject: "Class consistently starting 20 mins late", date: "Apr 10, 2026", status: "Resolved", priority: "Medium", response: "Matter escalated to HOD.", steps: [true, true, true, true] },
];

const statusColor: Record<string, { bg: string; color: string }> = {
  Open: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  "In Progress": { bg: "rgba(34,211,238,0.15)", color: "#22d3ee" },
  Resolved: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  Closed: { bg: "rgba(100,116,139,0.15)", color: "#64748b" },
};
const priorityColor: Record<string, string> = { High: "#ef4444", Medium: "#f59e0b", Low: "#10b981" };
const categories = ["Academic", "Infrastructure", "Faculty Conduct", "Examination", "Hostel", "Fee-related", "Other"];
const stepLabels = ["Submitted", "Received", "Under Review", "Resolved"];

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState(initialGrievances);
  const [form, setForm] = useState({ category: "Academic", subject: "", description: "", anonymous: false, priority: "Medium" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.subject || !form.description) return;
    const newG = {
      id: `GRV-2026-0${60 + grievances.length}`,
      category: form.category,
      subject: form.subject,
      date: "May 25, 2026",
      status: "Open",
      priority: form.priority,
      response: "",
      steps: [true, false, false, false],
    };
    setGrievances([newG, ...grievances]);
    setForm({ category: "Academic", subject: "", description: "", anonymous: false, priority: "Medium" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const open = grievances.filter(g => g.status === "Open").length;
  const resolved = grievances.filter(g => g.status === "Resolved").length;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Grievance Portal</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Raise concerns and track their resolution status</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Open Grievances", value: String(open), sub: "Awaiting resolution", color: "#f59e0b", icon: <Clock size={20} /> },
          { label: "Resolved", value: String(resolved), sub: "Successfully addressed", color: "#10b981", icon: <CheckCircle2 size={20} /> },
          { label: "Avg Resolution", value: "4.2 days", sub: "Response time", color: "#6366f1", icon: <AlertCircle size={20} /> },
          { label: "Total Filed", value: String(grievances.length), sub: "All time", color: "#22d3ee", icon: <MessageSquare size={20} /> },
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

      {/* Submit Form */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(99,102,241,0.2)" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
          <Send size={16} color="#6366f1" /> Submit New Grievance
        </h3>
        {submitted && (
          <div style={{ padding: "0.875rem 1rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, marginBottom: "1rem", color: "#10b981", fontSize: "0.83rem", display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle2 size={16} /> Grievance submitted successfully! Ticket ID assigned.
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Category</label>
            <div style={{ position: "relative" }}>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: "100%", padding: "0.625rem 2rem 0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", appearance: "none", cursor: "pointer" }}>
                {categories.map(c => <option key={c} value={c} style={{ background: "#1e1e2e" }}>{c}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Priority</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["Low", "Medium", "High"].map(p => (
                <button key={p} onClick={() => setForm({ ...form, priority: p })} style={{ flex: 1, padding: "0.575rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", border: "1px solid", transition: "all 0.2s", borderColor: form.priority === p ? priorityColor[p] : "var(--border)", background: form.priority === p ? `${priorityColor[p]}22` : "transparent", color: form.priority === p ? priorityColor[p] : "var(--text-muted)" }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Subject</label>
          <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Brief subject of your grievance..." style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe your grievance in detail. Include dates, persons involved, and what outcome you expect..." rows={4} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)", cursor: "pointer" }}>
            <input type="checkbox" checked={form.anonymous} onChange={e => setForm({ ...form, anonymous: e.target.checked })} />
            <Shield size={14} /> Submit anonymously (your name will be hidden from department)
          </label>
          <button onClick={handleSubmit} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Send size={15} /> Submit Grievance
          </button>
        </div>
      </div>

      {/* Grievance List */}
      <div>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>My Grievances</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {grievances.map((g, i) => {
            const sc = statusColor[g.status];
            return (
              <div key={i} className="glass" style={{ borderRadius: 16, padding: "1.25rem", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.72rem", padding: "2px 10px", background: "rgba(99,102,241,0.12)", color: "#818cf8", borderRadius: 6, fontWeight: 700 }}>{g.id}</span>
                    <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", fontWeight: 600 }}>{g.category}</span>
                    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 999, background: `${priorityColor[g.priority]}18`, color: priorityColor[g.priority], fontWeight: 700 }}>{g.priority}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{g.date}</span>
                    <span style={{ fontSize: "0.72rem", padding: "3px 12px", borderRadius: 999, background: sc.bg, color: sc.color, fontWeight: 700 }}>{g.status}</span>
                  </div>
                </div>
                <h4 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.625rem" }}>{g.subject}</h4>
                {g.response && (
                  <div style={{ padding: "0.625rem 0.875rem", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.875rem" }}>
                    <span style={{ color: "#10b981", fontWeight: 700 }}>Admin Response: </span>{g.response}
                  </div>
                )}
                {/* Timeline */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: "0.5rem" }}>
                  {stepLabels.map((label, si) => (
                    <div key={si} style={{ display: "flex", alignItems: "center", flex: si < 3 ? 1 : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: g.steps[si] ? "#10b981" : "rgba(255,255,255,0.08)", border: `2px solid ${g.steps[si] ? "#10b981" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {g.steps[si] && <CheckCircle2 size={12} color="white" />}
                        </div>
                        <span style={{ fontSize: "0.62rem", color: g.steps[si] ? "#10b981" : "var(--text-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
                      </div>
                      {si < 3 && <div style={{ flex: 1, height: 2, background: g.steps[si + 1] ? "#10b981" : "rgba(255,255,255,0.08)", margin: "0 4px", marginBottom: 20 }} />}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
