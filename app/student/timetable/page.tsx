"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";

type SlotData = { subject: string; room: string; type: "theory" | "lab" | "break" | "lunch" | "free" | "study" };

const timeSlots = ["9:00–10:00", "10:00–11:00", "11:00–12:00", "12:00–1:00", "1:00–2:00", "2:00–3:00", "3:00–4:00", "4:00–5:00"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const schedule: Record<string, (SlotData | null)[]> = {
  Monday: [
    { subject: "DSA", room: "R201", type: "theory" },
    { subject: "OS", room: "R203", type: "theory" },
    { subject: "Free Period", room: "", type: "free" },
    { subject: "DBMS Lab", room: "Lab 3", type: "lab" },
    { subject: "Lunch", room: "", type: "lunch" },
    { subject: "Networks", room: "R301", type: "theory" },
    { subject: "SE Lab", room: "Lab 1", type: "lab" },
    null,
  ],
  Tuesday: [
    { subject: "OS", room: "R203", type: "theory" },
    { subject: "DSA", room: "R201", type: "theory" },
    { subject: "SE", room: "R205", type: "theory" },
    { subject: "Lunch", room: "", type: "lunch" },
    { subject: "Networks", room: "R301", type: "theory" },
    { subject: "DBMS", room: "R202", type: "theory" },
    { subject: "Free Period", room: "", type: "free" },
    null,
  ],
  Wednesday: [
    { subject: "DBMS", room: "R202", type: "theory" },
    { subject: "Free Period", room: "", type: "free" },
    { subject: "Networks", room: "R301", type: "theory" },
    { subject: "DSA Lab", room: "Lab 2", type: "lab" },
    { subject: "Lunch", room: "", type: "lunch" },
    { subject: "SE", room: "R205", type: "theory" },
    { subject: "OS Lab", room: "Lab 1", type: "lab" },
    null,
  ],
  Thursday: [
    { subject: "Networks", room: "R301", type: "theory" },
    { subject: "DBMS", room: "R202", type: "theory" },
    { subject: "OS", room: "R203", type: "theory" },
    { subject: "Lunch", room: "", type: "lunch" },
    { subject: "DSA", room: "R201", type: "theory" },
    { subject: "Free Period", room: "", type: "free" },
    { subject: "DSA Tutorial", room: "R201", type: "theory" },
    null,
  ],
  Friday: [
    { subject: "SE", room: "R205", type: "theory" },
    { subject: "Networks", room: "R301", type: "theory" },
    { subject: "DSA", room: "R201", type: "theory" },
    { subject: "Lunch", room: "", type: "lunch" },
    { subject: "OS", room: "R203", type: "theory" },
    { subject: "DBMS Lab", room: "Lab 3", type: "lab" },
    { subject: "Free Period", room: "", type: "free" },
    null,
  ],
  Saturday: [
    { subject: "Library / Self Study", room: "Library", type: "study" },
    { subject: "Library / Self Study", room: "Library", type: "study" },
    null, null, null, null, null, null,
  ],
};

const typeColor: Record<string, { bg: string; color: string }> = {
  theory: { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
  lab: { bg: "rgba(34,211,238,0.15)", color: "#22d3ee" },
  break: { bg: "rgba(255,255,255,0.05)", color: "var(--text-muted)" },
  lunch: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  free: { bg: "rgba(16,185,129,0.08)", color: "#10b981" },
  study: { bg: "rgba(168,85,247,0.1)", color: "#a855f7" },
};

const faculty = [
  { name: "Dr. Priya Nair", subject: "DSA, SE Lab", room: "Room 201", email: "priya.nair@dit.edu" },
  { name: "Prof. Rajesh Menon", subject: "Operating Systems", room: "Room 203", email: "rajesh.menon@dit.edu" },
  { name: "Dr. Anita Sharma", subject: "Database Management", room: "Lab 3", email: "anita.sharma@dit.edu" },
  { name: "Prof. Suresh Kumar", subject: "Computer Networks", room: "Room 301", email: "suresh.kumar@dit.edu" },
];

export default function TimetablePage() {
  const [activeDay, setActiveDay] = useState("Monday");

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Class Timetable</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Your weekly schedule for Semester VI — Computer Science</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
        {[
          { label: "Classes Today", value: "4", sub: "Monday schedule", color: "#6366f1", icon: <BookOpen size={20} /> },
          { label: "Free Periods Today", value: "2", sub: "Use for self-study", color: "#10b981", icon: <Clock size={20} /> },
          { label: "Total Weekly Hours", value: "28 hrs", sub: "Theory + Lab", color: "#22d3ee", icon: <Calendar size={20} /> },
          { label: "Next Class", value: "Networks", sub: "2:00 PM • Room 301", color: "#f59e0b", icon: <Clock size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: c.color, marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Day Selector + Today's Schedule */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Daily Schedule</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {days.map(d => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                style={{
                  padding: "0.35rem 0.85rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                  background: activeDay === d ? "#6366f1" : "rgba(255,255,255,0.05)",
                  color: activeDay === d ? "white" : "var(--text-secondary)",
                  border: activeDay === d ? "none" : "1px solid var(--border)",
                  transition: "all 0.2s"
                }}
              >{d.slice(0, 3)}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {timeSlots.map((time, i) => {
            const slot = schedule[activeDay][i];
            if (!slot) return null;
            const tc = typeColor[slot.type];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", borderRadius: 12, background: tc.bg, border: `1px solid ${tc.color}30` }}>
                <div style={{ minWidth: 90, fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>{time}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>{slot.subject}</p>
                  {slot.room && <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}><MapPin size={10} style={{ display: "inline", marginRight: 3 }} />{slot.room}</p>}
                </div>
                <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 999, background: `${tc.color}22`, color: tc.color, fontWeight: 700, textTransform: "capitalize" }}>{slot.type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Weekly Grid */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", overflowX: "auto" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Full Week Overview</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, fontSize: "0.75rem" }}>
          <thead>
            <tr>
              <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "var(--text-muted)", fontWeight: 700, width: 110 }}>Time</th>
              {days.map(d => (
                <th key={d} style={{ padding: "0.5rem 0.5rem", textAlign: "center", color: d === "Monday" ? "#818cf8" : "var(--text-muted)", fontWeight: 700 }}>{d.slice(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, ti) => (
              <tr key={ti} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>{time}</td>
                {days.map(d => {
                  const slot = schedule[d][ti];
                  if (!slot) return <td key={d} style={{ padding: "0.4rem" }}></td>;
                  const tc = typeColor[slot.type];
                  return (
                    <td key={d} style={{ padding: "0.4rem" }}>
                      <div style={{ padding: "0.375rem 0.5rem", borderRadius: 8, background: tc.bg, textAlign: "center", minHeight: 34, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ fontWeight: 700, color: tc.color, fontSize: "0.7rem", lineHeight: 1.2 }}>{slot.subject}</div>
                        {slot.room && <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 1 }}>{slot.room}</div>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Legend */}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "1rem", flexWrap: "wrap" }}>
          {Object.entries(typeColor).map(([type, tc]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: tc.bg, border: `1px solid ${tc.color}` }} />
              <span style={{ color: "var(--text-secondary)", textTransform: "capitalize" }}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Reference */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Faculty Quick Reference</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem" }}>
          {faculty.map((f, i) => (
            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "white", flexShrink: 0 }}>
                {f.name.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>{f.name}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{f.subject}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><MapPin size={10} style={{ display: "inline" }} /> {f.room}</p>
                <p style={{ fontSize: "0.72rem", color: "#818cf8", marginTop: 3 }}>{f.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
