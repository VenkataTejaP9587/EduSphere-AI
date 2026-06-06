"use client";
import { useState } from "react";
import { Megaphone, Plus, Trash2, Bell, Users, Pin, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";

const categories = ["Academic", "Examination", "Cultural", "Sports", "Urgent", "General"];
const audiences = ["All Students", "CS-2024-A", "CS-2024-B", "EC-2024-A", "ME-2024-A", "Faculty Only", "Parents"];

const categoryColors: Record<string, { bg: string; color: string }> = {
  Urgent: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  Examination: { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
  Academic: { bg: "rgba(34,211,238,0.15)", color: "#22d3ee" },
  Cultural: { bg: "rgba(168,85,247,0.15)", color: "#a855f7" },
  Sports: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  General: { bg: "rgba(100,116,139,0.15)", color: "#94a3b8" },
};

const initialNotices = [
  { id: 1, title: "Semester VI Exam Fee Deadline", category: "Urgent", audience: "All Students", date: "May 22, 2026", body: "Last date to pay exam fees is June 1. Students who fail to pay will not receive hall tickets.", pinned: true, views: 312, sentBy: "Rajesh Kumar" },
  { id: 2, title: "Summer Internship Drive 2026", category: "Academic", audience: "CS-2024-A", date: "May 21, 2026", body: "TCS, Infosys, and Wipro are visiting on June 5. Register before May 28. CGPA 6.5+ eligible.", pinned: true, views: 278, sentBy: "Rajesh Kumar" },
  { id: 3, title: "End Semester Examination Timetable", category: "Examination", audience: "All Students", date: "May 20, 2026", body: "Semester VI exams will be held June 10 to June 25, 2026. Detailed schedule on portal.", pinned: false, views: 445, sentBy: "Rajesh Kumar" },
  { id: 4, title: "Annual Cultural Fest 'Wavelength 2026'", category: "Cultural", audience: "All Students", date: "May 19, 2026", body: "Annual cultural fest scheduled for June 28–30. Registration open. Prizes worth ₹2L.", pinned: false, views: 201, sentBy: "Rajesh Kumar" },
  { id: 5, title: "Anti-Ragging Complaint Cell", category: "Urgent", audience: "All Students", date: "May 16, 2026", body: "Ragging is a cognizable offense. Report immediately to helpline 1800-xxx-xxxx.", pinned: true, views: 389, sentBy: "Rajesh Kumar" },
];

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Academic", audience: "All Students", body: "", pinned: false });
  const [sent, setSent] = useState(false);
  const [filterCat, setFilterCat] = useState("All");

  const filtered = notices.filter(n => filterCat === "All" || n.category === filterCat);

  const handlePost = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    setNotices(prev => [{
      id: Date.now(), title: form.title, category: form.category,
      audience: form.audience, date: "May 25, 2026", body: form.body,
      pinned: form.pinned, views: 0, sentBy: "Rajesh Kumar"
    }, ...prev]);
    setForm({ title: "", category: "Academic", audience: "All Students", body: "", pinned: false });
    setSent(true);
    setShowForm(false);
    setTimeout(() => setSent(false), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this notice?")) setNotices(prev => prev.filter(n => n.id !== id));
  };

  const togglePin = (id: number) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const totalViews = notices.reduce((s, n) => s + n.views, 0);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Notice Board</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Publish and manage campus-wide announcements</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={16} /> Post Notice
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Total Notices", value: String(notices.length), sub: "Published this month", color: "#6366f1", icon: <Megaphone size={20} /> },
          { label: "Pinned", value: String(notices.filter(n => n.pinned).length), sub: "Always on top", color: "#f59e0b", icon: <Pin size={20} /> },
          { label: "Total Views", value: totalViews.toLocaleString(), sub: "Across all notices", color: "#10b981", icon: <Users size={20} /> },
          { label: "Urgent", value: String(notices.filter(n => n.category === "Urgent").length), sub: "High priority", color: "#ef4444", icon: <AlertCircle size={20} /> },
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

      {sent && (
        <div style={{ padding: "0.875rem 1rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12, color: "#10b981", fontSize: "0.83rem", display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} /> Notice published and sent to all recipients!
        </div>
      )}

      {/* Post Form */}
      {showForm && (
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(99,102,241,0.3)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}><Megaphone size={16} color="#6366f1" /> Create New Notice</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Notice Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Important: Fee Payment Deadline" style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.85rem", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem" }}>
                {categories.map(c => <option key={c} value={c} style={{ background: "#1e1e2e" }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Send To</label>
              <select value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem" }}>
                {audiences.map(a => <option key={a} value={a} style={{ background: "#1e1e2e" }}>{a}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.82rem", color: "var(--text-secondary)", padding: "0.625rem" }}>
                <input type="checkbox" checked={form.pinned} onChange={e => setForm({ ...form, pinned: e.target.checked })} />
                <Pin size={14} color="#f59e0b" /> Pin this notice
              </label>
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Notice Body</label>
              <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Write the full notice content here..." rows={4} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={handlePost} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}><Bell size={15} /> Publish & Notify</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["All", ...categories].map(c => {
          const cc = categoryColors[c] || { bg: "rgba(99,102,241,0.15)", color: "#818cf8" };
          return (
            <button key={c} onClick={() => setFilterCat(c)} style={{ padding: "0.4rem 1rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s", background: filterCat === c ? (c === "All" ? "#6366f1" : cc.bg) : "rgba(255,255,255,0.05)", color: filterCat === c ? (c === "All" ? "white" : cc.color) : "var(--text-muted)" }}>{c}</button>
          );
        })}
      </div>

      {/* Notices Table */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {filtered.length === 0 && <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>No notices in this category.</p>}
          {filtered.map((n) => {
            const cc = categoryColors[n.category] || categoryColors.General;
            return (
              <div key={n.id} style={{ padding: "1.1rem 1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${n.category === "Urgent" ? "rgba(239,68,68,0.25)" : "var(--border)"}`, display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.68rem", padding: "2px 10px", borderRadius: 999, background: cc.bg, color: cc.color, fontWeight: 700 }}>{n.category}</span>
                    {n.pinned && <span style={{ fontSize: "0.68rem", color: "#f59e0b", display: "flex", alignItems: "center", gap: 3 }}><Pin size={10} /> Pinned</span>}
                    <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: 999, background: "rgba(99,102,241,0.1)", color: "#818cf8", fontWeight: 600 }}>→ {n.audience}</span>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{n.date}</span>
                  </div>
                  <h4 style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.375rem" }}>{n.title}</h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{n.body}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>👁 {n.views} views • Posted by {n.sentBy}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => togglePin(n.id)} title={n.pinned ? "Unpin" : "Pin"} style={{ width: 30, height: 30, borderRadius: 8, background: n.pinned ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${n.pinned ? "rgba(245,158,11,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: n.pinned ? "#f59e0b" : "var(--text-muted)" }}>
                    <Pin size={13} />
                  </button>
                  <button onClick={() => handleDelete(n.id)} style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
