"use client";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { BookOpen, Clock, Flame, Star, Zap, ArrowRight, AlertTriangle, Sparkles, TrendingUp, CheckCircle, Calendar, Award } from "lucide-react";
import { courses, assignments, performanceData, subjectPerformance, aiRecommendations, leaderboard, badges } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { getInitials, avatarColor, daysUntil } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "0.75rem", color: p.color }}>{p.name}: {p.value}{p.name === "score" || p.name === "attendance" ? "%" : ""}</p>
        ))}
      </div>
    );
  }
  return null;
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function StudentDashboard() {
  const currentUser = useAuth();
  if (!currentUser) return null;
  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const inProgressCourses = courses.filter(c => c.status === "in_progress");

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(34,211,238,0.1))",
        border: "1px solid rgba(99,102,241,0.2)", borderRadius: "var(--radius-xl)",
        padding: "1.75rem 2rem", marginBottom: "1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem"
      }}>
        <div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{getGreeting()},</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.375rem" }}>
            {currentUser.name} 👋
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            You have <strong style={{ color: "#ef4444" }}>{pendingAssignments.length} pending assignments</strong> and a
            <strong style={{ color: "#f59e0b" }}> {currentUser.streak}-day streak</strong>. Keep it up!
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { label: "Streak", value: `${currentUser.streak ?? 0}🔥`, color: "#f59e0b" },
            { label: "Level", value: `Lv.${currentUser.level ?? 1}`, color: "#6366f1" },
            { label: "Total XP", value: `${(currentUser.xp ?? 0).toLocaleString()} XP`, color: "#22d3ee" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Courses Enrolled", value: courses.length, icon: <BookOpen size={20} />, color: "#6366f1", change: "+2 this month" },
          { label: "Avg Score", value: "84%", icon: <Star size={20} />, color: "#f59e0b", change: "+6% from last month" },
          { label: "Study Hours", value: "23.1h", icon: <Clock size={20} />, color: "#22d3ee", change: "This week" },
          { label: "Attendance", value: "87%", icon: <CheckCircle size={20} />, color: "#10b981", change: "+2% this month" },
        ].map((stat, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2, marginTop: 4 }}>{stat.value}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${stat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#10b981" }}>↑ {stat.change}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Performance Chart */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>Performance Overview</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" name="score" stroke="#6366f1" fill="url(#scoreGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="attendance" name="attendance" stroke="#22d3ee" fill="url(#attendGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.75rem", justifyContent: "center" }}>
            {[{ label: "Score", color: "#6366f1" }, { label: "Attendance", color: "#22d3ee" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />{l.label}
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <Sparkles size={18} color="#818cf8" />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>AI Recommendations</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {aiRecommendations.map((rec, i) => (
              <div key={i} style={{
                padding: "1rem", borderRadius: "12px",
                background: `${rec.color}0d`, border: `1px solid ${rec.color}25`,
                transition: "all 0.2s", cursor: "pointer"
              }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${rec.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {rec.type === "weak_topic" ? <AlertTriangle size={14} color={rec.color} /> :
                     rec.type === "next_course" ? <Sparkles size={14} color={rec.color} /> :
                     <Flame size={14} color={rec.color} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>{rec.title}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{rec.body}</p>
                    <button style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: rec.color, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 3 }}>
                      {rec.action} <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Continue Learning */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>Continue Learning</h2>
            <Link href="/student/courses" style={{ fontSize: "0.8rem", color: "var(--primary-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View all <ArrowRight size={12} /></Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {inProgressCourses.slice(0, 3).map((course, i) => (
              <Link key={course.id} href={`/student/courses`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = course.color; e.currentTarget.style.background = `${course.color}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${course.color}20`, border: `1px solid ${course.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <BookOpen size={18} color={course.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.title}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.375rem" }}>Next: {course.nextLesson}</p>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: course.color }}>{course.progress}%</p>
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)"  }}>{course.completedLectures}/{course.totalLectures}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <TrendingUp size={18} color="#f59e0b" />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>Leaderboard</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {leaderboard.slice(0, 6).map((entry, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem",
                borderRadius: "10px", background: entry.isMe ? "rgba(99,102,241,0.12)" : "transparent",
                border: entry.isMe ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent"
              }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: i < 3 ? ["#f59e0b","#94a3b8","#cd7f32"][i] : "var(--text-muted)", width: 20, textAlign: "center" }}>
                  {entry.badge || `#${entry.rank}`}
                </span>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: avatarColor(entry.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                  {getInitials(entry.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: entry.isMe ? 700 : 500, color: entry.isMe ? "var(--text-primary)" : "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {entry.name} {entry.isMe && <span style={{ color: "#818cf8" }}>(You)</span>}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.7rem", color: "#f59e0b" }}>
                  <Zap size={10} />{(entry.xp / 1000).toFixed(1)}k
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>⚡ Upcoming Deadlines</h2>
          <Link href="/student/assignments" style={{ fontSize: "0.8rem", color: "var(--primary-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View all <ArrowRight size={12} /></Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
          {pendingAssignments.map(a => {
            const days = daysUntil(a.dueDate);
            const urgency = days <= 1 ? "#ef4444" : days <= 3 ? "#f59e0b" : "#10b981";
            return (
              <div key={a.id} style={{
                padding: "1rem", borderRadius: "12px",
                background: "rgba(255,255,255,0.03)", border: `1px solid ${a.courseColor}25`,
                borderLeft: `3px solid ${a.courseColor}`, transition: "all 0.2s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", flex: 1, marginRight: "0.5rem" }}>{a.title}</p>
                  <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: `${urgency}18`, color: urgency, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}>
                    {days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `${days}d left`}
                  </span>
                </div>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{a.course} · {a.marks} marks</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>🏅 Recent Badges</h2>
          <Link href="/student/certificates" style={{ fontSize: "0.8rem", color: "var(--primary-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View all <ArrowRight size={12} /></Link>
        </div>
        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
          {badges.map(badge => (
            <div key={badge.id} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem",
              padding: "1rem 0.875rem", borderRadius: "12px",
              background: badge.unlocked ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
              border: badge.unlocked ? "1px solid rgba(99,102,241,0.2)" : "1px solid var(--border)",
              opacity: badge.unlocked ? 1 : 0.5, minWidth: 80, textAlign: "center", cursor: "pointer",
              transition: "all 0.2s", filter: badge.unlocked ? "none" : "grayscale(100%)"
            }}>
              <span style={{ fontSize: "1.5rem" }}>{badge.emoji}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, color: badge.unlocked ? "var(--text-secondary)" : "var(--text-muted)", lineHeight: 1.3 }}>{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
