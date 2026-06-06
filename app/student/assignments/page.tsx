"use client";
import { useState } from "react";
import { FileText, Clock, CheckCircle, Star, AlertTriangle, Upload, Eye, MessageCircle } from "lucide-react";
import { assignments } from "@/lib/mock-data";
import { daysUntil } from "@/lib/utils";

const columns = [
  { id: "pending",   label: "📋 Pending",   color: "#f59e0b" },
  { id: "submitted", label: "📤 Submitted",  color: "#6366f1" },
  { id: "graded",    label: "✅ Graded",     color: "#10b981" },
];

export default function AssignmentsPage() {
  const [active, setActive] = useState<string | null>(null);

  const byStatus = (status: string) => assignments.filter(a => a.status === status);

  const priorityColor: Record<string, string> = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Assignments</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          {byStatus("pending").length} pending · {byStatus("submitted").length} submitted · {byStatus("graded").length} graded
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total",     value: assignments.length,              color: "#6366f1" },
          { label: "Pending",   value: byStatus("pending").length,      color: "#f59e0b" },
          { label: "Submitted", value: byStatus("submitted").length,    color: "#22d3ee" },
          { label: "Avg Grade", value: "90%",                           color: "#10b981" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 900, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
        {columns.map(col => (
          <div key={col.id} style={{
            background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)", overflow: "hidden"
          }}>
            {/* Column Header */}
            <div style={{
              padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>{col.label}</span>
              <span style={{
                background: `${col.color}18`, color: col.color,
                fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px"
              }}>{byStatus(col.id).length}</span>
            </div>

            {/* Cards */}
            <div style={{ padding: "0.875rem", display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: 300 }}>
              {byStatus(col.id).map(a => {
                const days = daysUntil(a.dueDate);
                return (
                  <div key={a.id} onClick={() => setActive(active === a.id ? null : a.id)}
                    className="kanban-card" style={{ borderLeft: `3px solid ${a.courseColor}` }}>
                    {/* Priority Badge */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>{a.course}</span>
                      <span style={{ fontSize: "0.65rem", background: `${priorityColor[a.priority]}18`, color: priorityColor[a.priority], padding: "2px 6px", borderRadius: "999px", fontWeight: 700 }}>
                        {a.priority}
                      </span>
                    </div>
                    <h4 style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{a.title}</h4>

                    {/* Meta */}
                    <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <FileText size={10} /> {a.marks} marks
                      </span>
                      {a.status === "pending" && (
                        <span style={{ display: "flex", alignItems: "center", gap: 3, color: days <= 1 ? "#ef4444" : days <= 3 ? "#f59e0b" : "#10b981", fontWeight: 600 }}>
                          <Clock size={10} />
                          {days === 0 ? "Due today!" : days < 0 ? "Overdue" : `${days}d left`}
                        </span>
                      )}
                      {a.status === "submitted" && <span style={{ display: "flex", alignItems: "center", gap: 3, color: "#6366f1" }}><Upload size={10} /> Submitted</span>}
                      {a.status === "graded" && (
                        <span style={{ display: "flex", alignItems: "center", gap: 3, color: "#10b981", fontWeight: 700 }}>
                          <Star size={10} fill="#10b981" /> {a.grade}/{a.marks}
                        </span>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {active === a.id && (
                      <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.625rem" }}>{a.description}</p>
                        {a.feedback && (
                          <div style={{ padding: "0.625rem", borderRadius: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                            <p style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 600, marginBottom: 3 }}>📝 Faculty Feedback</p>
                            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{a.feedback}</p>
                          </div>
                        )}
                        {a.status === "pending" && (
                          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.625rem", fontSize: "0.8rem", padding: "0.5rem" }}>
                            <Upload size={14} /> Submit Assignment
                          </button>
                        )}
                        {a.status === "submitted" && (
                          <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: "0.625rem", fontSize: "0.8rem", padding: "0.5rem" }}>
                            <Eye size={14} /> View Submission
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {byStatus(col.id).length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  <CheckCircle size={32} style={{ margin: "0 auto 0.5rem", opacity: 0.3 }} />
                  <p>Nothing here!</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
