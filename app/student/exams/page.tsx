"use client";
import { useState, useCallback } from "react";
import { FileText, Download, Calendar, Clock, Award, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Toast from "@/components/shared/Toast";

const examTimetable = [
  { subject: "Data Structures & Algorithms", code: "CS601", date: "Jun 10, 2026", time: "10:00 AM", duration: "3 hrs", room: "Hall B - R12", status: "Upcoming" },
  { subject: "Operating Systems", code: "CS602", date: "Jun 13, 2026", time: "10:00 AM", duration: "3 hrs", room: "Hall B - R12", status: "Upcoming" },
  { subject: "Database Management", code: "CS603", date: "Jun 16, 2026", time: "10:00 AM", duration: "3 hrs", room: "Hall A - R08", status: "Upcoming" },
  { subject: "Computer Networks", code: "CS604", date: "Jun 19, 2026", time: "2:00 PM", duration: "3 hrs", room: "Hall B - R12", status: "Upcoming" },
  { subject: "Software Engineering", code: "CS605", date: "Jun 22, 2026", time: "10:00 AM", duration: "3 hrs", room: "Hall A - R05", status: "Upcoming" },
];

const results = [
  { sem: "Semester V", sgpa: 8.4, cgpa: 8.2, result: "Pass" },
  { sem: "Semester IV", sgpa: 7.9, cgpa: 8.1, result: "Pass" },
  { sem: "Semester III", sgpa: 8.6, cgpa: 8.2, result: "Pass" },
  { sem: "Semester II", sgpa: 7.8, cgpa: 7.9, result: "Pass" },
  { sem: "Semester I", sgpa: 7.4, cgpa: 7.4, result: "Pass" },
];

const internalMarks = [
  { subject: "Data Structures & Algorithms", ia1: 18, ia2: 20, asgn: 8, total: 46, status: "Safe", color: "#10b981" },
  { subject: "Operating Systems", ia1: 15, ia2: 17, asgn: 7, total: 39, status: "Safe", color: "#10b981" },
  { subject: "Database Management", ia1: 12, ia2: 16, asgn: 9, total: 37, status: "At Risk", color: "#f59e0b" },
  { subject: "Computer Networks", ia1: 10, ia2: 13, asgn: 6, total: 29, status: "Danger!", color: "#ef4444" },
  { subject: "Software Engineering", ia1: 20, ia2: 19, asgn: 10, total: 49, status: "Excellent", color: "#6366f1" },
];

export default function ExamsPage() {
  const currentUser = useAuth();
  const [hallTicketExpanded, setHallTicketExpanded] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "info" | "error" }>({ visible: false, message: "", type: "success" });
  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    setToast({ visible: true, message, type });
  }, []);
  const hideToast = useCallback(() => setToast(t => ({ ...t, visible: false })), []);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={hideToast} />
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Examinations</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Hall tickets, timetable, and semester results</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
        {[
          { label: "Upcoming Exams", value: "5", sub: "Semester VI Finals", color: "#6366f1", icon: <Calendar size={20} /> },
          { label: "Hall Ticket", value: "Available", sub: "Download below", color: "#10b981", icon: <Download size={20} /> },
          { label: "Arrears", value: "0", sub: "Clean academic record", color: "#10b981", icon: <Award size={20} /> },
          { label: "SGPA Last Sem", value: "8.4", sub: "Semester V performance", color: "#a855f7", icon: <Award size={20} /> },
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

      {/* Hall Ticket Card */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(99,102,241,0.4)", background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(34,211,238,0.05))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileText size={20} color="white" />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800 }}>Semester VI — Hall Ticket</h2>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Delhi Institute of Technology • Academic Year 2025–26</p>
            </div>
          </div>
          <button
            onClick={() => setHallTicketExpanded(!hallTicketExpanded)}
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8, padding: "0.4rem 0.75rem", color: "#818cf8", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }}
          >
            {hallTicketExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {hallTicketExpanded ? "Collapse" : "Preview"}
          </button>
        </div>

        {hallTicketExpanded && (
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { label: "Student Name", value: currentUser?.name ?? "Student" },
                { label: "Register No.", value: `21CS${currentUser?.id?.slice(-4).toUpperCase() ?? "1001"}` },
                { label: "Branch", value: "Computer Science" },
                { label: "Semester", value: "VI (Sixth)" },
                { label: "Exam Centre", value: "DIT Main Campus" },
                { label: "Hall", value: "Examination Hall B" },
              ].map((f, i) => (
                <div key={i} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</p>
                  <p style={{ fontWeight: 700, marginTop: 4, fontSize: "0.9rem" }}>{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => showToast("Hall Ticket PDF downloaded successfully!", "success")}
            className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Download size={16} /> Download Hall Ticket
          </button>
          <div style={{ padding: "0.625rem 1rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10 }}>
            <p style={{ fontSize: "0.75rem", color: "#ef4444" }}>
              <AlertTriangle size={12} style={{ display: "inline", marginRight: 4 }} />
              Hall ticket is only valid with a valid college ID card. No entry without both.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem" }}>
        {/* Exam Timetable */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={16} color="#6366f1" /> Examination Timetable
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {examTimetable.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem", background: "rgba(99,102,241,0.05)", borderRadius: 12, border: "1px solid rgba(99,102,241,0.1)" }}>
                <div style={{ textAlign: "center", minWidth: 50, padding: "0.4rem", background: "rgba(99,102,241,0.15)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "#818cf8", fontWeight: 700 }}>{e.date.split(" ")[0].toUpperCase()}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "#818cf8" }}>{e.date.split(" ")[1].replace(",", "")}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>{e.subject}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{e.code} • {e.time} • {e.duration} • {e.room}</p>
                </div>
                <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 999, background: "rgba(99,102,241,0.15)", color: "#818cf8", fontWeight: 600 }}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results History */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={16} color="#a855f7" /> Semester Results
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {results.map((r, i) => (
              <div key={i} style={{ padding: "0.875rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{r.sem}</span>
                  <button onClick={() => showToast(`Grade card for ${r.sem} downloaded!`, "success")} style={{ fontSize: "0.7rem", padding: "2px 10px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 6, color: "#818cf8", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Download size={10} /> Grade Card
                  </button>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div>
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>SGPA</p>
                    <p style={{ fontWeight: 800, color: r.sgpa >= 8 ? "#10b981" : "#f59e0b" }}>{r.sgpa}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>CGPA</p>
                    <p style={{ fontWeight: 800, color: "#6366f1" }}>{r.cgpa}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>Result</p>
                    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 999, background: "rgba(16,185,129,0.15)", color: "#10b981", fontWeight: 700 }}>{r.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal Marks */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Internal Assessment — Semester VI</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Subject", "IA-1 (/25)", "IA-2 (/25)", "Assignment (/10)", "Total (/50)", "Status"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {internalMarks.map((m, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{m.subject}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{m.ia1}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{m.ia2}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{m.asgn}</td>
                  <td style={{ padding: "0.75rem", fontWeight: 800, color: m.color }}>{m.total}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 999, background: `${m.color}20`, color: m.color, fontWeight: 700 }}>{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
