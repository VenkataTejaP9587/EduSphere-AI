"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, BookOpen, CreditCard, Activity, Database, ShieldCheck, Server, AlertCircle } from "lucide-react";
import { platformStats, revenueData } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "0.75rem", color: p.color }}>{p.name}: ${p.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>System Dashboard</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Global platform operations, security configurations, and tenant analytics</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
        {[
          { label: "Total Students", value: platformStats.totalStudents.toLocaleString(), sub: "+8% this term", icon: <Users size={20} />, color: "#6366f1" },
          { label: "Total Faculty", value: platformStats.totalFaculty, sub: "24 new approvals", icon: <Users size={20} />, color: "#22d3ee" },
          { label: "Platform Courses", value: platformStats.totalCourses, sub: "54 in draft state", icon: <BookOpen size={20} />, color: "#a855f7" },
          { label: "Monthly Revenue", value: `$${platformStats.monthlyRevenue.toLocaleString()}`, sub: "Target: $500k/mo", icon: <CreditCard size={20} />, color: "#10b981" },
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

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        
        {/* Revenue chart */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.025rem", fontWeight: 700 }}>Revenue Growth Timeline</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* System telemetry logs */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.025rem", fontWeight: 700, marginBottom: "1rem" }}>Platform Telemetry</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { icon: <Server size={14} color="#10b981" />, title: "Application Clusters", value: "99.98% uptime", desc: "6 operational nodes" },
              { icon: <Database size={14} color="#22d3ee" />, title: "Database Nodes", value: "Primary latency: 12ms", desc: "Read replica: sync active" },
              { icon: <ShieldCheck size={14} color="#a855f7" />, title: "Security Layers", value: "WAF: Active", desc: "0 alerts in 24 hours" },
              { icon: <Activity size={14} color="#6366f1" />, title: "AI Analytics Worker", value: "Queue empty", desc: "Average response: 840ms" },
            ].map((t, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {t.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{t.title}</h4>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)" }}>{t.value}</span>
                  </div>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom widgets */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
        
        {/* System audit log alerts */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 6 }}>
            <AlertCircle size={18} color="var(--accent)" /> System Security Alerts
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { type: "auth", msg: "Multiple login attempts on tenant: 'CS-Faculty' from ip: 192.168.1.12", time: "10 min ago", severity: "#ef4444" },
              { type: "config", msg: "Branding tokens and global styling parameters updated by 'adm-001'", time: "2 hours ago", severity: "#6366f1" },
              { type: "database", msg: "Automated incremental backup verified successfully (size: 421.2 GB)", time: "6 hours ago", severity: "#10b981" },
            ].map((alert, idx) => (
              <div key={idx} style={{
                padding: "0.875rem", borderRadius: "10px",
                background: "rgba(255,255,255,0.01)", border: `1px solid var(--border)`,
                borderLeft: `3px solid ${alert.severity}`, display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{alert.msg}</p>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 4 }}>{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant overview info */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Tenants & Subscriptions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { name: "Delhi Institute of Technology", students: 4850, renewal: "2026-12-15", cost: "$12,400/yr" },
              { name: "Mumbai Tech University", students: 3120, renewal: "2027-01-20", cost: "$9,500/yr" },
              { name: "Bangalore Science College", students: 1200, renewal: "2026-10-08", cost: "$4,800/yr" },
            ].map((t, idx) => (
              <div key={idx} style={{ padding: "0.875rem", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700 }}>{t.name}</h4>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{t.students} students · Renewal: {t.renewal}</p>
                </div>
                <strong style={{ fontSize: "0.85rem", color: "#10b981" }}>{t.cost}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
