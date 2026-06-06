"use client";
import { useState } from "react";
import { TrendingUp, Award, BookOpen, Calculator, AlertTriangle, Brain, BarChart2 } from "lucide-react";

const subjects = [
  { name: "Data Structures & Algorithms", code: "CS601", credits: 4, ia1: 18, ia2: 20, asgn: 8, total: 46, attendance: 87, gradePoints: 9 },
  { name: "Operating Systems", code: "CS602", credits: 3, ia1: 15, ia2: 17, asgn: 7, total: 39, attendance: 83, gradePoints: 8 },
  { name: "Database Management", code: "CS603", credits: 4, ia1: 12, ia2: 16, asgn: 9, total: 37, attendance: 79, gradePoints: 8 },
  { name: "Computer Networks", code: "CS604", credits: 3, ia1: 10, ia2: 13, asgn: 6, total: 29, attendance: 75, gradePoints: 7 },
  { name: "Software Engineering", code: "CS605", credits: 3, ia1: 20, ia2: 19, asgn: 10, total: 49, attendance: 91, gradePoints: 10 },
];

const semHistory = [
  { sem: "Sem I", sgpa: 7.4 }, { sem: "Sem II", sgpa: 7.8 }, { sem: "Sem III", sgpa: 8.6 },
  { sem: "Sem IV", sgpa: 7.9 }, { sem: "Sem V", sgpa: 8.4 },
];

const gradeOptions = [
  { label: "O (Outstanding)", value: 10 },
  { label: "A+ (Excellent)", value: 9 },
  { label: "A (Very Good)", value: 8 },
  { label: "B+ (Good)", value: 7 },
  { label: "B (Above Avg)", value: 6 },
  { label: "C (Average)", value: 5 },
  { label: "F (Fail)", value: 0 },
];

export default function AcademicsPage() {
  const [calcGrades, setCalcGrades] = useState<number[]>([9, 8, 8, 7, 10]);
  const [showCalc, setShowCalc] = useState(false);

  const projectedSGPA = (() => {
    const totalCredits = subjects.reduce((s, sub) => s + sub.credits, 0);
    const totalPoints = subjects.reduce((s, sub, i) => s + sub.credits * calcGrades[i], 0);
    return (totalPoints / totalCredits).toFixed(2);
  })();

  const totalMarksColor = (t: number) => t >= 45 ? "#10b981" : t >= 35 ? "#f59e0b" : "#ef4444";
  const statusLabel = (t: number) => t >= 45 ? "Safe" : t >= 35 ? "At Risk" : "Danger!";
  const attendanceColor = (a: number) => a >= 85 ? "#10b981" : a >= 80 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Academic Performance</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Internal marks, CGPA tracking, and grade analysis</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem" }}>
        {[
          { label: "Current CGPA", value: "8.2", sub: "Out of 10.0", color: "#6366f1", icon: <Award size={20} /> },
          { label: "Projected SGPA", value: "8.4", sub: "Semester VI estimate", color: "#22d3ee", icon: <TrendingUp size={20} /> },
          { label: "Academic Standing", value: "Good", sub: "No backlogs", color: "#10b981", icon: <Award size={20} /> },
          { label: "Rank in Class", value: "#12 / 78", sub: "Current semester", color: "#a855f7", icon: <BarChart2 size={20} /> },
          { label: "Credits Done", value: "142/180", sub: "Degree completion", color: "#f59e0b", icon: <BookOpen size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: c.color, marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* CGPA Trend */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={16} color="#6366f1" /> CGPA Progression
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {semHistory.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", minWidth: 52 }}>{s.sem}</span>
                <div className="progress-bar-track" style={{ flex: 1 }}>
                  <div className="progress-bar-fill" style={{ width: `${(s.sgpa / 10) * 100}%`, background: s.sgpa >= 8 ? "#10b981" : "#f59e0b", transition: "width 0.6s ease" }} />
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: s.sgpa >= 8 ? "#10b981" : "#f59e0b", minWidth: 32 }}>{s.sgpa}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", minWidth: 52 }}>Current</span>
              <div className="progress-bar-track" style={{ flex: 1, border: "1px dashed rgba(99,102,241,0.4)" }}>
                <div className="progress-bar-fill" style={{ width: "84%", background: "linear-gradient(90deg,#6366f1,#22d3ee)", opacity: 0.8 }} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#818cf8", minWidth: 32 }}>8.4*</span>
            </div>
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>* Projected based on current internals</p>
        </div>

        {/* Credit Structure */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <BookOpen size={16} color="#22d3ee" /> Credit Structure — Sem VI
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Subject", "Credits", "Grade", "Points"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.5rem", fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, i) => {
                  const gp = s.gradePoints;
                  const grade = gp === 10 ? "O" : gp === 9 ? "A+" : gp === 8 ? "A" : gp === 7 ? "B+" : "B";
                  const gradeColor = gp >= 9 ? "#10b981" : gp >= 7 ? "#6366f1" : "#f59e0b";
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "0.6rem 0.5rem", fontWeight: 600, fontSize: "0.76rem" }}>{s.name.split(" ").slice(0, 2).join(" ")}</td>
                      <td style={{ padding: "0.6rem 0.5rem", color: "var(--text-secondary)" }}>{s.credits}</td>
                      <td style={{ padding: "0.6rem 0.5rem" }}><span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 999, background: `${gradeColor}22`, color: gradeColor, fontWeight: 800 }}>{grade}</span></td>
                      <td style={{ padding: "0.6rem 0.5rem", fontWeight: 700, color: gradeColor }}>{s.credits * gp}</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: "1px solid var(--border)", background: "rgba(99,102,241,0.06)" }}>
                  <td style={{ padding: "0.6rem 0.5rem", fontWeight: 800 }}>Total</td>
                  <td style={{ padding: "0.6rem 0.5rem", fontWeight: 800 }}>17</td>
                  <td style={{ padding: "0.6rem 0.5rem", fontWeight: 800, color: "#6366f1" }}>SGPA</td>
                  <td style={{ padding: "0.6rem 0.5rem", fontWeight: 800, color: "#6366f1" }}>8.41</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Internal Assessment Table */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Semester VI — Internal Assessment</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Subject", "Code", "IA-1 /25", "IA-2 /25", "Asgn /10", "Total /50", "Status", "Attendance"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => {
                const mc = totalMarksColor(s.total);
                const ac = attendanceColor(s.attendance);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{s.name.split(" ").slice(0, 2).join(" ")}</td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace", fontSize: "0.75rem" }}>{s.code}</td>
                    <td style={{ padding: "0.75rem" }}>{s.ia1}</td>
                    <td style={{ padding: "0.75rem" }}>{s.ia2}</td>
                    <td style={{ padding: "0.75rem" }}>{s.asgn}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 800, color: mc }}>{s.total}</td>
                    <td style={{ padding: "0.75rem" }}><span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: 999, background: `${mc}20`, color: mc, fontWeight: 700 }}>{statusLabel(s.total)}</span></td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: ac }}>{s.attendance}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CGPA Calculator */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(99,102,241,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <Calculator size={16} color="#6366f1" /> 🧮 CGPA What-If Simulator
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 3 }}>Estimate your SGPA by selecting expected grades in finals</p>
          </div>
          <button onClick={() => setShowCalc(!showCalc)} className="btn-secondary" style={{ fontSize: "0.8rem" }}>
            {showCalc ? "Hide" : "Open"} Calculator
          </button>
        </div>
        {showCalc && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {subjects.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                  <span style={{ flex: 1, fontSize: "0.82rem", fontWeight: 600 }}>{s.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", minWidth: 60 }}>{s.credits} credits</span>
                  <select
                    value={calcGrades[i]}
                    onChange={e => { const g = [...calcGrades]; g[i] = Number(e.target.value); setCalcGrades(g); }}
                    style={{ padding: "0.4rem 0.75rem", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8, color: "#818cf8", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
                  >
                    {gradeOptions.map(o => <option key={o.value} value={o.value} style={{ background: "#1e1e2e" }}>{o.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ padding: "1.25rem", background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(34,211,238,0.1))", borderRadius: 14, border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>PROJECTED SGPA</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 900, color: "#818cf8", lineHeight: 1 }}>{projectedSGPA}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: 4 }}>To maintain 8.0 CGPA, you need at least 7.5 SGPA</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Current CGPA</p>
                <p style={{ fontWeight: 800, fontSize: "1.4rem", color: "#6366f1" }}>8.2</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>After this semester</p>
                <p style={{ fontWeight: 800, fontSize: "1.4rem", color: "#10b981" }}>{((8.2 * 5 + parseFloat(projectedSGPA)) / 6).toFixed(2)}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AI Academic Advisor */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(168,85,247,0.25)", background: "linear-gradient(135deg,rgba(168,85,247,0.05),rgba(99,102,241,0.05))" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
          <Brain size={16} color="#a855f7" /> 🤖 AI Academic Advisor
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[
            { icon: "⚠️", color: "#ef4444", msg: "Your Computer Networks attendance (75%) is below the 80% threshold. 3 more absences will lead to detention. Attend all remaining classes without fail." },
            { icon: "📊", color: "#f59e0b", msg: "DBMS internal marks (37/50) are borderline. You need to score 65+ in the final exam to secure an A grade and avoid grade drop." },
            { icon: "🏆", color: "#10b981", msg: "You are ranked #12 in class. A strong performance in finals (especially Networks and DBMS) could push you into the Top 10." },
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "0.875rem", background: `${tip.color}0d`, borderRadius: 12, border: `1px solid ${tip.color}25` }}>
              <span style={{ fontSize: "1.1rem" }}>{tip.icon}</span>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{tip.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
