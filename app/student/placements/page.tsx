"use client";
import { useState } from "react";
import { Briefcase, Award, TrendingUp, Star, Building2, Calendar, CheckCircle2, XCircle, Upload, Clock } from "lucide-react";
import Toast from "@/components/shared/Toast";

const drives = [
  { id: 1, company: "TCS", domain: "IT", role: "Software Engineer", package: "₹3.5–7 LPA", cgpaCutoff: 6.0, branches: ["All"], date: "Jun 5, 2026", deadline: "May 28", slots: 200, applied: false, eligible: true },
  { id: 2, company: "Infosys", domain: "IT", role: "Systems Engineer Trainee", package: "₹6.5 LPA", cgpaCutoff: 7.0, branches: ["CS", "IT", "EC"], date: "Jun 8, 2026", deadline: "May 30", slots: 150, applied: true, eligible: true },
  { id: 3, company: "L&T Technology", domain: "Core", role: "Associate Engineer", package: "₹5–8 LPA", cgpaCutoff: 7.5, branches: ["EC", "Mech"], date: "Jun 12, 2026", deadline: "Jun 5", slots: 80, applied: false, eligible: false, ineligibleReason: "Branch not eligible (CS only)" },
  { id: 4, company: "Deloitte", domain: "Finance", role: "Business Analyst", package: "₹8–12 LPA", cgpaCutoff: 7.0, branches: ["All"], date: "Jun 15, 2026", deadline: "Jun 8", slots: 50, applied: false, eligible: true },
  { id: 5, company: "Capgemini", domain: "IT", role: "Senior Software Eng", package: "₹4–9 LPA", cgpaCutoff: 6.5, branches: ["CS", "IT"], date: "Jun 18, 2026", deadline: "Jun 10", slots: 120, applied: false, eligible: true },
  { id: 6, company: "Amazon", domain: "IT", role: "SDE Internship", package: "₹60K/month", cgpaCutoff: 8.0, branches: ["CS", "IT"], date: "Jun 20, 2026", deadline: "Jun 12", slots: 30, applied: true, eligible: true },
];

const applications = [
  { company: "Infosys", role: "Systems Engineer Trainee", date: "May 15", rounds: ["Aptitude ✓", "Technical ✓", "HR ✓", "Offer ✓"], stage: "Completed", outcome: "Offer Received", outcomeColor: "#10b981" },
  { company: "Amazon", role: "SDE Internship", date: "May 20", rounds: ["Aptitude ✓", "Technical (Jun 20)"], stage: "In Progress", outcome: "Under Review", outcomeColor: "#22d3ee" },
  { company: "Wipro", role: "Project Engineer", date: "May 10", rounds: ["Aptitude ✓", "Technical ✗"], stage: "Completed", outcome: "Not Selected", outcomeColor: "#ef4444" },
];

const domainColors: Record<string, string> = { IT: "#6366f1", Core: "#22d3ee", Finance: "#10b981", Internship: "#a855f7" };
const companyInitialColors = ["#6366f1", "#22d3ee", "#10b981", "#f59e0b", "#a855f7", "#ef4444"];
const companyColor = (name: string) => companyInitialColors[name.charCodeAt(0) % companyInitialColors.length];

export default function PlacementsPage() {
  const [driveList, setDriveList] = useState(drives);
  const [domainFilter, setDomainFilter] = useState("All");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const showToast = (msg: string) => setToast({ visible: true, message: msg });

  const filteredDrives = driveList.filter(d => domainFilter === "All" || d.domain === domainFilter);

  const handleApply = (id: number) => {
    setDriveList(prev => prev.map(d => d.id === id ? { ...d, applied: true } : d));
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Toast visible={toast.visible} message={toast.message} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Placements & Internships</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Upcoming drives, your applications, and career opportunities</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "1rem" }}>
        {[
          { label: "Your CGPA", value: "8.2", sub: "Eligible for most drives", color: "#6366f1", icon: <Star size={20} /> },
          { label: "Drives Applied", value: "3", sub: "This placement season", color: "#22d3ee", icon: <Briefcase size={20} /> },
          { label: "Offer Received", value: "1 🎉", sub: "Infosys — ₹6.5 LPA", color: "#10b981", icon: <Award size={20} /> },
          { label: "Upcoming Drives", value: "4", sub: "Register before deadlines", color: "#f59e0b", icon: <Calendar size={20} /> },
          { label: "Highest Package", value: "₹12 LPA", sub: "Deloitte — Batch 2026", color: "#a855f7", icon: <TrendingUp size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: c.color, marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Offer Card */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(16,185,129,0.4)", background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(99,102,241,0.06))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#10b981,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.25rem", color: "white" }}>I</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: "rgba(16,185,129,0.2)", color: "#10b981", fontWeight: 700 }}>🎉 OFFER RECEIVED</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>Infosys Technologies</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Systems Engineer Trainee • Joining: August 1, 2026</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, color: "#10b981" }}>₹6.5 LPA</p>
            <button onClick={() => showToast("Offer letter PDF downloaded successfully! ✓")} style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, color: "#10b981", cursor: "pointer", fontWeight: 600, fontSize: "0.78rem" }}>
              <Upload size={13} /> Download Offer Letter
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Drives */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Upcoming Campus Drives</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["All", "IT", "Core", "Finance"].map(f => (
              <button key={f} onClick={() => setDomainFilter(f)} style={{ padding: "0.35rem 0.875rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "none", background: domainFilter === f ? "#6366f1" : "rgba(255,255,255,0.06)", color: domainFilter === f ? "white" : "var(--text-muted)", transition: "all 0.2s" }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1rem" }}>
          {filteredDrives.map((d) => {
            const cc = companyColor(d.company);
            const dc = domainColors[d.domain] || "#6366f1";
            return (
              <div key={d.id} style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: 14, border: d.applied ? "1px solid rgba(16,185,129,0.3)" : d.eligible ? "1px solid var(--border)" : "1px solid rgba(100,116,139,0.2)", opacity: d.eligible ? 1 : 0.65 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", marginBottom: "0.875rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cc}22`, border: `1px solid ${cc}44`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.1rem", color: cc, flexShrink: 0 }}>{d.company[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 style={{ fontWeight: 800, fontSize: "0.9rem" }}>{d.company}</h4>
                      <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: 999, background: `${dc}22`, color: dc, fontWeight: 700 }}>{d.domain}</span>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 2 }}>{d.role}</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.875rem" }}>
                  {[
                    { label: "Package", value: d.package },
                    { label: "CGPA Cutoff", value: `${d.cgpaCutoff}+` },
                    { label: "Drive Date", value: d.date },
                    { label: "Deadline", value: d.deadline },
                  ].map((f, i) => (
                    <div key={i}>
                      <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>{f.label}</p>
                      <p style={{ fontSize: "0.78rem", fontWeight: 700, marginTop: 2 }}>{f.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{d.slots} seats</span>
                  {d.applied ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", padding: "0.35rem 0.875rem", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, color: "#10b981", fontWeight: 700 }}>
                      <CheckCircle2 size={13} /> Applied
                    </span>
                  ) : d.eligible ? (
                    <button onClick={() => handleApply(d.id)} className="btn-primary" style={{ fontSize: "0.78rem", padding: "0.375rem 1rem" }}>Apply Now</button>
                  ) : (
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", maxWidth: 140, textAlign: "right" }}>{d.ineligibleReason}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Pipeline */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>My Application Pipeline</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {applications.map((a, i) => (
            <div key={i} style={{ padding: "1rem 1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ minWidth: 130 }}>
                <p style={{ fontWeight: 800, fontSize: "0.87rem" }}>{a.company}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{a.role}</p>
              </div>
              <div style={{ flex: 1, display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {a.rounds.map((r, ri) => (
                  <span key={ri} style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: r.includes("✓") ? "rgba(16,185,129,0.15)" : r.includes("✗") ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)", color: r.includes("✓") ? "#10b981" : r.includes("✗") ? "#ef4444" : "#f59e0b", fontWeight: 600 }}>{r}</span>
                ))}
              </div>
              <span style={{ fontSize: "0.75rem", padding: "3px 12px", borderRadius: 999, background: `${a.outcomeColor}18`, color: a.outcomeColor, fontWeight: 700, whiteSpace: "nowrap" }}>{a.outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Profile */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Profile & Resume</h3>
          <button onClick={() => showToast("Resume uploaded successfully! Profile updated.")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 8, color: "#818cf8", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
            <Upload size={14} /> Upload Resume
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.875rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Profile Completeness</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#6366f1" }}>85%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: "85%", background: "linear-gradient(90deg,#6366f1,#22d3ee)" }} />
            </div>
            <p style={{ fontSize: "0.7rem", color: "#f59e0b", marginTop: 6 }}>💡 Add internship experience to reach 100%</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["Python", "JavaScript", "React", "Node.js", "SQL", "Data Structures", "Machine Learning", "Git", "Linux"].map(s => (
            <span key={s} style={{ fontSize: "0.75rem", padding: "4px 12px", borderRadius: 999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8", fontWeight: 600 }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
