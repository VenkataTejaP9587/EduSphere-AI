"use client";
import { useState } from "react";
import { BookOpen, Users, Star, Plus, MoreVertical, Edit3, Eye, X } from "lucide-react";
import { courses as mockCourses } from "@/lib/mock-data";
import { addCourse } from "@/app/actions/courses";
import Toast from "@/components/shared/Toast";

export default function FacultyCoursesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "info" | "error" }>({ visible: false, message: "", type: "info" });
  const showToast = (msg: string, type: "success" | "info" = "info") => setToast({ visible: true, message: msg, type });
  const [formData, setFormData] = useState({
    title: "", instructor: "Dr. Priya Nair", category: "Computer Science",
    level: "intermediate", price: 0
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
    setSuccessMsg(`Course "${formData.title}" created successfully!`);
    setFormData({ title: "", instructor: "Dr. Priya Nair", category: "Computer Science", level: "intermediate", price: 0 });
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>My Courses</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Create, publish, and manage your student curriculum libraries</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }} onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Add New Course
        </button>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div style={{
          padding: "0.875rem 1.25rem", background: "rgba(16,185,129,0.1)",
          border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12,
          color: "#10b981", fontSize: "0.875rem", fontWeight: 600,
          display: "flex", alignItems: "center", gap: 8
        }}>
          ✅ {successMsg}
        </div>
      )}

      {/* Courses Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
        {mockCourses.map((course) => (
          <div key={course.id} className="glass glass-hover" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            
            {/* Header backdrop */}
            <div style={{
              height: 100, background: `linear-gradient(135deg, ${course.color}25, ${course.color}08)`,
              borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem"
            }}>
              <span style={{
                fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px",
                background: `${course.color}20`, color: course.color, fontWeight: 700
              }}>{course.category}</span>
              <span style={{
                fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px",
                background: course.status === "completed" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                color: course.status === "completed" ? "#10b981" : "#f59e0b", fontWeight: 700, textTransform: "uppercase"
              }}>{course.status.replace("_", " ")}</span>
            </div>

            {/* Core Info */}
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{course.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Instructor: {course.instructor}</p>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <Users size={14} color="var(--text-secondary)" /> {course.enrolled} Enrolled
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating} Rating
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <BookOpen size={14} color="var(--text-secondary)" /> {course.totalLectures} Lectures
                </div>
              </div>

              {/* Course Progress */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  <span>Lectures Released</span>
                  <span>{course.completedLectures} / {course.totalLectures}</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${(course.completedLectures / course.totalLectures) * 100}%`, background: course.color }} />
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div style={{ padding: "0.875rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="badge badge-primary" onClick={() => showToast(`Editing: ${course.title}`, "info")} style={{ cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 3, padding: "4px 8px" }}>
                  <Edit3 size={10} /> Edit
                </button>
                <button className="badge badge-cyan" onClick={() => showToast(`Previewing: ${course.title}`, "info")} style={{ cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 3, padding: "4px 8px" }}>
                  <Eye size={10} /> Preview
                </button>
              </div>
              <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <MoreVertical size={16} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add New Course Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div className="glass" style={{
            background: "var(--bg-elevated)", padding: "2rem", borderRadius: "20px",
            width: "100%", maxWidth: 500, border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>Create New Course</h2>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 4 }}>Fill in the details to publish a new course</p>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>Course Title *</label>
                <input type="text" className="form-input" required
                  placeholder="e.g. Advanced Data Structures"
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>Instructor Name *</label>
                <input type="text" className="form-input" required
                  value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>Category *</label>
                  <input type="text" className="form-input" required
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>Level *</label>
                  <select className="form-input" value={formData.level}
                    onChange={e => setFormData({...formData, level: e.target.value})}
                    style={{ appearance: "none", cursor: "pointer", background: "rgba(255,255,255,0.05)" }}>
                    <option value="beginner" style={{ background: "#1e1e2e" }}>Beginner</option>
                    <option value="intermediate" style={{ background: "#1e1e2e" }}>Intermediate</option>
                    <option value="advanced" style={{ background: "#1e1e2e" }}>Advanced</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>Price (₹) — enter 0 for free</label>
                <input type="number" className="form-input" min={0}
                  value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading} style={{ minWidth: 140 }}>
                  {loading ? "Creating..." : "🚀 Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
