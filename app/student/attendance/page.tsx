"use client";
import { useState } from "react";
import { CalendarCheck, AlertCircle, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { attendanceData } from "@/lib/mock-data";

export default function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState("May 2026");
  
  // Render dynamic grid for May 2026 (Starts on a Friday, 31 days)
  const totalDays = 31;
  const startDayOffset = 5; // Friday offset
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const calendarMap = attendanceData.calendar as Record<string, string>;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Attendance</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Live compliance metrics and classroom registry audits</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
        {[
          { label: "Overall Attendance", value: `${attendanceData.overall}%`, sub: "Meets 80% criteria threshold", color: "#10b981", icon: <CheckCircle2 size={20} /> },
          { label: "Present Lectures", value: "221 lectures", sub: "Total hours attended: 331h", color: "#6366f1", icon: <CalendarCheck size={20} /> },
          { label: "Late / Grace Days", value: "4 instances", sub: "Approved logs and adjustments", color: "#f59e0b", icon: <Clock size={20} /> },
          { label: "Absent Instances", value: "3 days", sub: "Excused: 1, Unexcused: 2", color: "#ef4444", icon: <AlertCircle size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
        {/* Calendar Widget */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Registry Log</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}><ChevronLeft size={16} /></button>
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{selectedMonth}</span>
              <button style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}><ChevronRight size={16} /></button>
            </div>
          </div>

          {/* Weekdays Header */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "0.75rem", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <span key={d}>{d}</span>)}
          </div>

          {/* Days Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.75rem", justifyItems: "center" }}>
            {/* Blank boxes for offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => <div key={`offset-${i}`} />)}
            
            {daysArray.map(day => {
              const formattedDate = `2026-05-${day.toString().padStart(2, "0")}`;
              const status = calendarMap[formattedDate] || "none";
              const isToday = day === 24;

              return (
                <div key={day} className={`cal-day ${status} ${isToday ? "today" : ""}`} style={{
                  width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                  border: isToday ? "2px solid var(--primary)" : "none",
                  background: status === "present" ? "rgba(16, 185, 129, 0.12)" :
                              status === "absent" ? "rgba(239, 68, 68, 0.12)" :
                              status === "late" ? "rgba(245, 158, 11, 0.12)" : "rgba(255, 255, 255, 0.02)",
                  color: status === "present" ? "#10b981" :
                         status === "absent" ? "#ef4444" :
                         status === "late" ? "#f59e0b" : "var(--text-secondary)"
                }}>
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
            {[
              { label: "Present", color: "#10b981", bg: "rgba(16, 185, 129, 0.12)" },
              { label: "Absent", color: "#ef4444", bg: "rgba(239, 68, 68, 0.12)" },
              { label: "Late / Delayed", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: l.bg, border: `1px solid ${l.color}` }} />
                <span style={{ color: "var(--text-secondary)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject wise stats */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Course-wise Breakdowns</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {attendanceData.bySubject.map((sub, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{sub.subject}</span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {sub.present} / {sub.total} classes · <strong style={{ color: sub.percentage >= 85 ? "#10b981" : sub.percentage >= 80 ? "#f59e0b" : "#ef4444" }}>{sub.percentage}%</strong>
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{
                    width: `${sub.percentage}%`,
                    background: sub.percentage >= 85 ? "#10b981" : sub.percentage >= 80 ? "#f59e0b" : "#ef4444"
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: 12, background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              💡 <strong>AI Observation:</strong> Your attendance in <strong>Cloud DevOps</strong> is currently at 80% which is the absolute minimum requirement. Ensure you attend the remaining lectures to avoid registry issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
