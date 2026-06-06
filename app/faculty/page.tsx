"use client";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { BookOpen, Users, Star, Clock, AlertTriangle, ArrowRight, ClipboardList, CheckCircle } from "lucide-react";
import { performanceData, facultyStudents } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "0.75rem", color: p.color }}>{p.name}: {p.value}%</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FacultyDashboard() {
  const facultyUser = useAuth();
  if (!facultyUser) return null;
  const atRiskStudents = facultyStudents.filter(s => s.status === "at_risk" || s.risk === "critical");
  
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(99,102,241,0.1))",
        border: "1px solid rgba(34,211,238,0.25)", borderRadius: "var(--radius-xl)",
        padding: "1.75rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
      }}>
        <div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Welcome back,</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.375rem" }}>
            {facultyUser.name}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Department of <strong style={{ color: "var(--secondary)" }}>{facultyUser.department}</strong> · You have <strong style={{ color: "#ef4444" }}>{atRiskStudents.length} students at risk</strong> to review.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {[
            { label: "Active Cohort", value: "CS-2024-B", color: "var(--secondary)" },
            { label: "Pending Reviews", value: "12 submissions", color: "var(--accent)" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
        {[
          { label: "Enrolled Students", value: facultyUser.studentsCount, icon: <Users size={20} />, color: "var(--secondary)" },
          { label: "Active Courses", value: facultyUser.coursesCount, icon: <BookOpen size={20} />, color: "#6366f1" },
          { label: "Cohort Attendance", value: "88%", icon: <CheckCircle size={20} />, color: "#10b981" },
          { label: "Avg Test Grade", value: "79.2%", icon: <ClipboardList size={20} />, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</span>
              <div style={{ color: s.color }}>{s.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts / Risk Alerts layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        {/* Cohort Performance Chart */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Cohort Performance Trends</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Yearly telemetry averages</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" name="Cohort Average" stroke="var(--secondary)" fill="url(#scoreGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Alerts Panel */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6, color: "#ef4444" }}>
            <AlertTriangle size={18} /> Student Performance Alerts
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {atRiskStudents.map((stud) => (
              <div key={stud.id} style={{
                padding: "0.75rem", borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{stud.name}</h4>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                    Attendance: {stud.attendance}% · Avg Score: {stud.avgScore}%
                  </p>
                </div>
                <Link href="/faculty/students" style={{ textDecoration: "none" }}>
                  <button className="badge badge-danger" style={{ cursor: "pointer", border: "none" }}>
                    Action
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "1.5rem" }}>
        {/* Course shortcut panel */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>My Courses</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { title: "Full Stack Web Development", enrolled: 312, progress: 68 },
              { title: "Database Systems", enrolled: 220, progress: 100 },
              { title: "Software Engineering Principles", enrolled: 185, progress: 40 },
            ].map((crs, idx) => (
              <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.825rem", fontWeight: 700 }}>{crs.title}</h4>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{crs.enrolled} active students enrolled</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--secondary)" }}>{crs.progress}%</p>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews / Tasks */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Grading Queue</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { task: "RESTful API Server Submissions", count: 8, due: "Today" },
              { task: "Graph Algorithm Quiz Submissions", count: 4, due: "Tomorrow" },
              { task: "Linear Regression Analysis Review", count: 2, due: "Finished" },
            ].map((tsk, idx) => (
              <div key={idx} style={{ padding: "0.875rem 1rem", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.825rem", fontWeight: 700 }}>{tsk.task}</h4>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{tsk.count} students waiting for feedback</p>
                </div>
                <Link href="/faculty/assignments" style={{ textDecoration: "none" }}>
                  <button className="btn-secondary" style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem", border: "1px solid var(--border)" }}>
                    Grade <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
