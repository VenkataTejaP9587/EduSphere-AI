"use client";
import { useState } from "react";
import { Users, CheckCircle2, XCircle, Clock, FileText, ChevronDown } from "lucide-react";

const initialRequests = [
  { id: 1, name: "Arjun Sharma", batch: "CS-2024-B", type: "Medical", from: "May 22", to: "May 24", days: 3, reason: "High fever - doctor advised rest", status: "Pending", remarks: "" },
  { id: 2, name: "Priya Reddy", batch: "CS-2024-A", type: "Personal", from: "May 25", to: "May 25", days: 1, reason: "Sister's marriage ceremony", status: "Pending", remarks: "" },
  { id: 3, name: "Rohit Kumar", batch: "EC-2024-A", type: "Cultural", from: "May 28", to: "May 29", days: 2, reason: "State level debate competition", status: "Pending", remarks: "" },
  { id: 4, name: "Ananya Nair", batch: "CS-2024-B", type: "Medical", from: "May 26", to: "May 28", days: 3, reason: "Appendix surgery recovery period", status: "Pending", remarks: "" },
  { id: 5, name: "Karthik Raj", batch: "CS-2024-A", type: "Personal", from: "May 30", to: "May 30", days: 1, reason: "Family emergency - father hospitalised", status: "Pending", remarks: "" },
  { id: 6, name: "Divya Menon", batch: "EC-2024-A", type: "Sports", from: "Jun 1", to: "Jun 3", days: 3, reason: "National athletics meet - state team selection", status: "Pending", remarks: "" },
  { id: 7, name: "Sanjay Pillai", batch: "CS-2024-B", type: "Medical", from: "Jun 2", to: "Jun 4", days: 3, reason: "Viral fever, attached prescription from Dr. Menon", status: "Approved", remarks: "Approved. Submit medical certificate on return." },
  { id: 8, name: "Meera Singh", batch: "CS-2024-A", type: "Cultural", from: "Jun 5", to: "Jun 5", days: 1, reason: "Annual college magazine photo shoot", status: "Approved", remarks: "Approved." },
  { id: 9, name: "Aditya Ghosh", batch: "EC-2024-A", type: "Personal", from: "Jun 6", to: "Jun 7", days: 2, reason: "Parents visiting from abroad, airport pickup", status: "Rejected", remarks: "Cannot approve due to upcoming exam. Please reschedule." },
  { id: 10, name: "Lakshmi Iyer", batch: "CS-2024-B", type: "Medical", from: "Jun 8", to: "Jun 10", days: 3, reason: "Eye infection, doctor recommended rest from screens", status: "Pending", remarks: "" },
];

const typeColors: Record<string, string> = { Medical: "#ef4444", Personal: "#6366f1", Cultural: "#a855f7", Sports: "#10b981", "Family Emergency": "#f59e0b" };
const statusStyle: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  Approved: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  Rejected: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
};

const initials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
const avatarColors = ["#6366f1", "#22d3ee", "#10b981", "#f59e0b", "#a855f7", "#ef4444"];
const avatarColor = (name: string) => avatarColors[name.charCodeAt(0) % avatarColors.length];

export default function FacultyLeavesPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("All");
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectRemark, setRejectRemark] = useState("");

  const filtered = requests.filter(r => filter === "All" || r.status === filter);

  const approve = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Approved", remarks: "Approved by faculty." } : r));
  };

  const reject = (id: number) => {
    if (!rejectRemark.trim()) return;
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Rejected", remarks: rejectRemark } : r));
    setRejectId(null);
    setRejectRemark("");
  };

  const pending = requests.filter(r => r.status === "Pending").length;
  const approved = requests.filter(r => r.status === "Approved").length;
  const rejected = requests.filter(r => r.status === "Rejected").length;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Leave Approvals</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Review and manage student leave requests for your courses</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Pending Requests", value: String(pending), sub: "Awaiting your review", color: "#f59e0b", icon: <Clock size={20} /> },
          { label: "Approved This Month", value: String(approved + 34), sub: "Total approvals", color: "#10b981", icon: <CheckCircle2 size={20} /> },
          { label: "Rejected This Month", value: String(rejected + 5), sub: "With remarks provided", color: "#ef4444", icon: <XCircle size={20} /> },
          { label: "Total Students", value: "78", sub: "Under your supervision", color: "#6366f1", icon: <Users size={20} /> },
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

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {["All", "Pending", "Approved", "Rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "0.45rem 1.25rem", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s", background: filter === f ? "#6366f1" : "rgba(255,255,255,0.06)", color: filter === f ? "white" : "var(--text-muted)" }}>
            {f} {f === "Pending" && pending > 0 && <span style={{ background: "#ef4444", color: "white", fontSize: "0.65rem", padding: "1px 6px", borderRadius: 999, marginLeft: 4 }}>{pending}</span>}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filtered.length === 0 && (
          <div className="glass" style={{ borderRadius: 16, padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>No {filter.toLowerCase()} requests found.</div>
        )}
        {filtered.map((r) => {
          const tc = typeColors[r.type] || "#6366f1";
          const ss = statusStyle[r.status];
          const isRejectOpen = rejectId === r.id;

          return (
            <div key={r.id} className="glass" style={{ borderRadius: 16, padding: "1.25rem", border: r.status === "Pending" ? "1px solid rgba(245,158,11,0.2)" : "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: avatarColor(r.name), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "white", flexShrink: 0 }}>
                    {initials(r.name)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{r.batch} • {r.from} – {r.to} • {r.days} day{r.days > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontSize: "0.7rem", padding: "3px 12px", borderRadius: 999, background: `${tc}22`, color: tc, fontWeight: 700 }}>{r.type}</span>
                  <span style={{ fontSize: "0.7rem", padding: "3px 12px", borderRadius: 999, background: ss.bg, color: ss.color, fontWeight: 700 }}>{r.status}</span>
                </div>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.875rem", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                <FileText size={12} style={{ display: "inline", marginRight: 6, color: "var(--text-muted)" }} />
                {r.reason}
              </p>

              {r.remarks && r.status !== "Pending" && (
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "0.5rem 0.875rem", background: `${ss.color}10`, borderRadius: 8, marginBottom: "0.75rem" }}>
                  💬 <strong>Remark:</strong> {r.remarks}
                </p>
              )}

              {r.status === "Pending" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {!isRejectOpen ? (
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button onClick={() => approve(r.id)} style={{ flex: 1, padding: "0.625rem", borderRadius: 10, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s" }}>
                        <CheckCircle2 size={15} /> Approve
                      </button>
                      <button onClick={() => { setRejectId(r.id); setRejectRemark(""); }} style={{ flex: 1, padding: "0.625rem", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s" }}>
                        <XCircle size={15} /> Reject
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <input value={rejectRemark} onChange={e => setRejectRemark(e.target.value)} placeholder="Enter reason for rejection..." style={{ padding: "0.625rem 0.875rem", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.82rem" }} />
                      <div style={{ display: "flex", gap: "0.625rem" }}>
                        <button onClick={() => reject(r.id)} style={{ flex: 1, padding: "0.575rem", borderRadius: 10, background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Confirm Reject</button>
                        <button onClick={() => setRejectId(null)} style={{ flex: 1, padding: "0.575rem", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-muted)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
