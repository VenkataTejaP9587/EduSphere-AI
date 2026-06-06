"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar } from "recharts";
import { TrendingUp, Clock, AlertTriangle, Sparkles, BookOpen, CheckCircle, Brain } from "lucide-react";
import { performanceData, subjectPerformance, weakTopics, weeklyActivityData } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "0.75rem", color: p.color }}>
            {p.name}: {p.value}{p.name === "score" || p.name === "attendance" ? "%" : " hrs"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProgressPage() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Progress & Analytics</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>AI-generated insights and granular academic metrics</p>
      </div>

      {/* Analytics Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
        {[
          { label: "Overall Score Progress", value: "+16% since Jan", sub: "Currently averaging 88% overall", color: "#6366f1", icon: <TrendingUp size={20} /> },
          { label: "AI Core Strength", value: "Database Design", sub: "92% proficiency ranking", color: "#10b981", icon: <CheckCircle size={20} /> },
          { label: "Critical Focus Area", value: "Graph Algorithms", sub: "48% proficiency ranking", color: "#ef4444", icon: <AlertTriangle size={20} /> },
          { label: "Weekly Study Goal", value: "23.1 hrs / 20 hrs", sub: "115% goal completed", color: "#22d3ee", icon: <Clock size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        {/* Performance Trend */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} color="#6366f1" /> Monthly Growth Metrics
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="assignGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" name="score" stroke="#6366f1" fill="url(#scoreGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="assignments" name="assignments" stroke="#10b981" fill="url(#assignGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: "1.25rem", marginTop: "1rem", justifyContent: "center" }}>
            {[{ label: "Average Test Score", color: "#6366f1" }, { label: "Assignment Completion", color: "#10b981" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />{l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Proficiencies */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Brain size={18} color="#a855f7" /> Subject Radar Graph
          </h3>
          <div style={{ display: "flex", justifyContent: "center", height: 230 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjectPerformance}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Radar name="Proficiency" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", marginTop: 8 }}>Proficiency score out of 100 derived from quiz averages</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Weekly Activity Hours */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={18} color="#22d3ee" /> Weekly Study Activity (Hours)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weak Topics / AI Revision Suggestions */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} color="#f59e0b" /> AI Revision Recommendations
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {weakTopics.map((topic, i) => (
              <div key={i} style={{
                padding: "0.875rem", borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: "rgba(239, 68, 68, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <AlertTriangle size={16} color="#ef4444" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)" }}>{topic.topic}</h4>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{topic.course} · {topic.attempts} review quiz attempts</p>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#ef4444" }}>{topic.score}%</span>
                  <button className="badge badge-danger" style={{ cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 3 }}>
                    <Sparkles size={10} /> Generate Revision Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
