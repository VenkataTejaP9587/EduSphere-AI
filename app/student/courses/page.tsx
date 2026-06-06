"use client";
import Link from "next/link";
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Lock } from "lucide-react";
import { courses } from "@/lib/mock-data";

export default function CoursesPage() {
  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>My Courses</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{courses.length} courses enrolled · {courses.filter(c => c.status === "completed").length} completed</p>
      </div>

      {/* Progress Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
        {[
          { label: "In Progress", value: courses.filter(c => c.status === "in_progress").length, color: "#6366f1" },
          { label: "Completed", value: courses.filter(c => c.status === "completed").length, color: "#10b981" },
          { label: "Nearly Done", value: courses.filter(c => c.status === "nearly_done").length, color: "#f59e0b" },
          { label: "Total Hours", value: "138h", color: "#22d3ee" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 900, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Course Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.25rem" }}>
        {courses.map(course => (
          <div key={course.id} className="glass glass-hover" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}>
            {/* Course Header */}
            <div style={{
              height: 120, background: `linear-gradient(135deg, ${course.color}30, ${course.color}10)`,
              borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center",
              justifyContent: "center", position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: course.color, opacity: 0.1, filter: "blur(20px)" }} />
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${course.color}25`, border: `1px solid ${course.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={24} color={course.color} />
              </div>
              {course.status === "completed" && (
                <div style={{ position: "absolute", top: 12, right: 12, background: "#10b981", borderRadius: "999px", padding: "4px 10px", fontSize: "0.65rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle size={10} /> Completed
                </div>
              )}
              <div style={{ position: "absolute", top: 12, left: 12 }}>
                <span style={{ background: `${course.color}25`, color: course.color, fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px", borderRadius: "999px" }}>{course.category}</span>
              </div>
            </div>

            {/* Course Info */}
            <div style={{ padding: "1.25rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.375rem", color: "var(--text-primary)" }}>{course.title}</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.875rem" }}>by {course.instructor}</p>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "0.875rem" }}>
                {[
                  { icon: <Clock size={12} />, label: course.duration },
                  { icon: <Users size={12} />, label: `${course.enrolled} enrolled` },
                  { icon: <Star size={12} fill="#f59e0b" color="#f59e0b" />, label: course.rating },
                ].map((meta, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    {meta.icon} {meta.label}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
                {course.tags.map(tag => (
                  <span key={tag} style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>{tag}</span>
                ))}
              </div>

              {/* Progress */}
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Progress</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: course.color }}>{course.progress}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}bb)` }} />
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4 }}>
                  {course.completedLectures} / {course.totalLectures} lectures completed
                </p>
              </div>

              {/* Next Lesson */}
              {course.status !== "completed" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem", borderRadius: "10px", background: `${course.color}10`, border: `1px solid ${course.color}20` }}>
                  <Play size={12} color={course.color} />
                  <span style={{ fontSize: "0.75rem", color: course.color, fontWeight: 600 }}>Next: {course.nextLesson}</span>
                </div>
              )}
              {course.status === "completed" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem", borderRadius: "10px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <CheckCircle size={12} color="#10b981" />
                  <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>Course Completed — Get Certificate</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
