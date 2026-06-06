"use client";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { BarChart2, TrendingUp, Download, Eye, Users, CheckSquare, MessageSquare } from "lucide-react";
import { performanceData, weeklyActivityData } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "0.75rem", color: p.color }}>{p.name}: {p.value}{p.name === "hours" ? " hrs" : "%"}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FacultyAnalyticsPage() {
  const cohortStats = [
    { label: "Cohort Size", value: "312", sub: "Active students", color: "var(--secondary)" },
    { label: "Completion Rate", value: "76.4%", sub: "+4.2% since mid-term", color: "#10b981" },
    { label: "Quiz Success Rate", value: "82.1%", sub: "912 quiz attempts logged", color: "#f59e0b" },
    { label: "Avg Study Time", value: "3.4h/day", sub: "Meets curriculum target", color: "#6366f1" },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Cohort Analytics</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>In-depth insights, cohort grading distributions, and telemetry logs</p>
        </div>
        <button className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Download size={14} /> Export CSV Report
        </button>
      </div>

      {/* Cohort KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
        {cohortStats.map((s, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
        
        {/* Engagement over time */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} color="var(--secondary)" /> Student Platform Engagement (Weekly)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyActivityData}>
              <defs>
                <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="hours" name="hours" stroke="var(--secondary)" fill="url(#hoursGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distributions */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <BarChart2 size={18} color="#6366f1" /> Grade Distribution Ranges
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[
              { range: "F (<50)", count: 4 },
              { range: "D (50-60)", count: 12 },
              { range: "C (60-70)", count: 45 },
              { range: "B (70-80)", count: 112 },
              { range: "A (80-90)", count: 98 },
              { range: "S (90-100)", count: 41 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="range" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        
        {/* Concept Strengths heatmap mock */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Curriculum Strength Heatmap</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { concept: "Relational DB Normalization", strength: 94, status: "Mastered", color: "#10b981" },
              { concept: "REST API Endpoint Routing", strength: 88, status: "Proficient", color: "#6366f1" },
              { concept: "Linear Regression Derivatives", strength: 68, status: "Friction Point", color: "#f59e0b" },
              { concept: "Graph Traversal Algorithms", strength: 48, status: "Critical Support Needed", color: "#ef4444" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "0.875rem", background: "rgba(255,255,255,0.01)", borderRadius: 10, border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700 }}>{c.concept}</h4>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{c.status}</p>
                </div>
                <strong style={{ color: c.color, fontSize: "0.95rem" }}>{c.strength}%</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Cohort Feedback alerts */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Cohort Activity Feed</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { icon: <Users size={14} />, msg: "24 new student signups synchronized today", time: "1h ago" },
              { icon: <CheckSquare size={14} />, msg: "RESTful API Server quiz completion average dropped to 72%", time: "3h ago" },
              { icon: <MessageSquare size={14} />, msg: "Dr. Priya Nair posted in announcements general", time: "5h ago" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "center", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p>{item.msg}</p>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
