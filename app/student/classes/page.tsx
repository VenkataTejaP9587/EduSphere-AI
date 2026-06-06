"use client";
import { useState } from "react";
import { Video, Clock, Users, Calendar, CheckCircle2, Play, Link2, BookOpen, Mic, MicOff } from "lucide-react";
import Toast from "@/components/shared/Toast";

const liveClasses = [
  { id: 1, subject: "Data Structures & Algorithms", faculty: "Dr. Priya Nair", time: "10:00 AM – 11:00 AM", date: "Today, May 25", status: "live", room: "Google Meet", joinLink: "#", topic: "Graph Traversal — BFS & DFS", students: 62, duration: "60 min" },
  { id: 2, subject: "Operating Systems", faculty: "Prof. Rajesh Menon", time: "2:00 PM – 3:00 PM", date: "Today, May 25", status: "upcoming", room: "Google Meet", joinLink: "#", topic: "Deadlock Detection & Recovery", students: 58, duration: "60 min" },
  { id: 3, subject: "Database Management", faculty: "Dr. Anita Sharma", time: "10:00 AM – 11:00 AM", date: "Tomorrow, May 26", status: "upcoming", room: "Zoom", joinLink: "#", topic: "Query Optimization & Indexing", students: 61, duration: "60 min" },
  { id: 4, subject: "Computer Networks", faculty: "Prof. Suresh Kumar", time: "2:00 PM – 3:00 PM", date: "Tomorrow, May 26", status: "upcoming", room: "Google Meet", joinLink: "#", topic: "TCP/IP Protocol Suite", students: 55, duration: "60 min" },
  { id: 5, subject: "Software Engineering", faculty: "Dr. Priya Nair", time: "11:00 AM – 12:00 PM", date: "May 27, 2026", status: "upcoming", room: "Microsoft Teams", joinLink: "#", topic: "Agile & Scrum Methodology", students: 60, duration: "60 min" },
];

const recordings = [
  { subject: "DSA", topic: "Sorting Algorithms — QuickSort & MergeSort", date: "May 22, 2026", duration: "58 min", views: 42 },
  { subject: "OS", topic: "Process Scheduling — FCFS, SJF, Round Robin", date: "May 21, 2026", duration: "62 min", views: 51 },
  { subject: "DBMS", topic: "Normalization — 1NF to BCNF", date: "May 20, 2026", duration: "55 min", views: 38 },
  { subject: "Networks", topic: "OSI Model Deep Dive", date: "May 19, 2026", duration: "60 min", views: 44 },
  { subject: "SE", topic: "Software Development Life Cycle", date: "May 18, 2026", duration: "50 min", views: 36 },
];

const subjectColors: Record<string, string> = { DSA: "#6366f1", OS: "#22d3ee", DBMS: "#10b981", Networks: "#f59e0b", SE: "#a855f7" };

export default function ClassesPage() {
  const [micOn, setMicOn] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "info" | "error" }>({ visible: false, message: "", type: "success" });
  const showToast = (msg: string, type: "success" | "info" = "info") => setToast({ visible: true, message: msg, type });

  const liveClass = liveClasses.find(c => c.status === "live");

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Online Classes</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Live sessions, recordings, and class schedule</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Live Right Now", value: "1", sub: "DSA — Tap to join", color: "#ef4444", icon: <Video size={20} /> },
          { label: "Today's Classes", value: "2", sub: "1 live · 1 upcoming", color: "#6366f1", icon: <Calendar size={20} /> },
          { label: "This Week", value: "8 classes", sub: "Across 5 subjects", color: "#22d3ee", icon: <BookOpen size={20} /> },
          { label: "Recordings", value: "24", sub: "All previous sessions", color: "#10b981", icon: <Play size={20} /> },
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

      {/* Live Class Banner */}
      {liveClass && (
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(239,68,68,0.4)", background: "linear-gradient(135deg,rgba(239,68,68,0.1),rgba(99,102,241,0.08))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Video size={24} color="#ef4444" />
                </div>
                <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14, borderRadius: "50%", background: "#ef4444", border: "2px solid var(--bg-elevated)", animation: "pulse 1.5s infinite" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: "rgba(239,68,68,0.2)", color: "#ef4444", fontWeight: 800, letterSpacing: "0.05em" }}>● LIVE NOW</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{liveClass.time}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>{liveClass.subject}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Topic: {liveClass.topic} • {liveClass.faculty}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <Users size={14} /> {liveClass.students} joined
              </div>
              <button onClick={() => setMicOn(!micOn)} style={{ width: 36, height: 36, borderRadius: "50%", background: micOn ? "rgba(99,102,241,0.2)" : "rgba(239,68,68,0.2)", border: `1px solid ${micOn ? "rgba(99,102,241,0.4)" : "rgba(239,68,68,0.4)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: micOn ? "#818cf8" : "#ef4444" }}>
                {micOn ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button onClick={() => { showToast("Opening Google Meet in a new tab...", "info"); window.open(liveClass.joinLink, '_blank'); }} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Play size={15} /> Join Class
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem" }}>
        {/* Upcoming Classes */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Upcoming Classes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {liveClasses.filter(c => c.status === "upcoming").map((cls, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ textAlign: "center", minWidth: 48, padding: "0.4rem", background: "rgba(99,102,241,0.1)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.62rem", color: "#818cf8", fontWeight: 700 }}>{cls.date.split(",")[0].toUpperCase()}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#818cf8", marginTop: 2 }}>{cls.time.split("–")[0].trim()}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>{cls.subject}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{cls.topic}</p>
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: 4 }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}><Clock size={10} style={{ display: "inline" }} /> {cls.duration}</span>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}><Link2 size={10} style={{ display: "inline" }} /> {cls.room}</span>
                  </div>
                </div>
                <button onClick={() => showToast(`Reminder set for ${cls.subject} at ${cls.time} ✓`, "success")} style={{ fontSize: "0.7rem", padding: "0.35rem 0.75rem", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, color: "#818cf8", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recordings */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Play size={16} color="#a855f7" /> Class Recordings
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {recordings.map((r, i) => {
              const sc = subjectColors[r.subject] || "#6366f1";
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 10, cursor: "pointer", border: "1px solid transparent", transition: "all 0.2s" }}
                  onClick={() => showToast(`Now playing: ${r.topic}`, "info")}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${sc}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Play size={16} color={sc} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: "0.68rem", padding: "1px 8px", borderRadius: 999, background: `${sc}22`, color: sc, fontWeight: 700 }}>{r.subject}</span>
                    </div>
                    <p style={{ fontWeight: 600, fontSize: "0.8rem", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.topic}</p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{r.date} • {r.duration} • {r.views} views</p>
                  </div>
                </div>
              );
            })}
            <button style={{ marginTop: 4, fontSize: "0.78rem", color: "#818cf8", background: "none", border: "none", cursor: "pointer", textAlign: "center", padding: "0.5rem" }}>View all 24 recordings →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
