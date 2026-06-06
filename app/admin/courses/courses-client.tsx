"use client";
import { useState } from "react";
import { BookOpen, Users, Star, Plus, MoreVertical, ShieldAlert, Award, FileText, CheckCircle } from "lucide-react";
import { addCourse } from "@/app/actions/courses";

export default function CoursesClient({ initialCourses = [] }: { initialCourses?: any[] }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "", instructor: "", category: "Computer Science", level: "beginner", price: 0
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("instructor", formData.instructor);
    fd.append("category", formData.category);
    fd.append("level", formData.level);
    fd.append("price", formData.price.toString());
    await addCourse(fd);
    setShowAddModal(false);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Global Course Catalog</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Supervise curriculum standards, active catalogs, and course telemetry</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }} onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Provision Course
        </button>
      </div>

      {/* Catalog Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
        {initialCourses.map((course) => (
          <div key={course.id} className="glass glass-hover" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            
            {/* Header backdrop */}
            <div style={{
              height: 100, background: `linear-gradient(135deg, ${course.color || '#6366f1'}25, ${course.color || '#6366f1'}08)`,
              borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem"
            }}>
              <span style={{
                fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px",
                background: `${course.color || '#6366f1'}20`, color: course.color || '#6366f1', fontWeight: 700
              }}>{course.category}</span>
              <span className="badge badge-success" style={{ textTransform: "uppercase", fontSize: "0.6rem" }}>{course.status}</span>
            </div>

            {/* Core Info */}
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem", flex: 1 }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{course.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Instructor: {course.instructorName || course.instructor}</p>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Enrolled</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{course.enrolled} students</span>
                </div>
                <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Rating</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" /> {course.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div style={{ padding: "0.875rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="badge badge-warning" style={{ cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 3, padding: "4px 8px" }}>
                  Audited
                </button>
                <button className="badge badge-primary" style={{ cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 3, padding: "4px 8px" }}>
                  Configure
                </button>
              </div>
              <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <MoreVertical size={16} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="glass" style={{ background: "var(--bg-elevated)", padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: 500, border: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Provision New Course</h2>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Course Title</label>
                <input type="text" className="form-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Instructor Name</label>
                <input type="text" className="form-input" required value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Category</label>
                  <input type="text" className="form-input" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Level</label>
                  <select className="form-input" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} style={{ appearance: "none", cursor: "pointer", background: "rgba(255,255,255,0.05)" }}>
                    <option value="beginner" style={{ background: "#1e1e2e" }}>Beginner</option>
                    <option value="intermediate" style={{ background: "#1e1e2e" }}>Intermediate</option>
                    <option value="advanced" style={{ background: "#1e1e2e" }}>Advanced</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Price ($)</label>
                <input type="number" className="form-input" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Provisioning..." : "Provision Course"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
