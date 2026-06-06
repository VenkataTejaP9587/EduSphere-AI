"use client";
import { useState } from "react";
import { Search, UserPlus, Filter, Trash2, GraduationCap, Users, BookOpen } from "lucide-react";
import { getInitials, avatarColor } from "@/lib/utils";
import { addStudent, removeStudent } from "@/app/actions/students";

export default function AdminStudentsClient({ initialStudents }: { initialStudents: any[] }) {
  const [students, setStudents] = useState<any[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", password: "student@123",
    parentName: "", parentEmail: "", batch: "CS-2024-B"
  });

  const batches = ["all", "CS-2024-A", "CS-2024-B", "EC-2024-A", "ME-2024-A"];

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("parentName", formData.parentName);
    fd.append("parentEmail", formData.parentEmail);
    fd.append("batch", formData.batch);
    const result = await addStudent(fd);
    // Optimistically add the new student to the local list
    if (result?.student) {
      setStudents(prev => [...prev, result.student]);
    }
    setShowAddModal(false);
    setLoading(false);
    setSuccessMsg(`Student "${formData.name}" enrolled successfully!`);
    setFormData({ name: "", email: "", password: "student@123", parentName: "", parentEmail: "", batch: "CS-2024-B" });
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleRemove = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove student "${name}"?`)) {
      // Optimistically remove from list
      setStudents(prev => prev.filter(u => u.id !== id));
      await removeStudent(id);
    }
  };

  const filteredStudents = students
    .filter(u => u.role === "student")
    .filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBatch = batchFilter === "all" || u.batch === batchFilter;
      return matchesSearch && matchesBatch;
    });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
            Student Directory
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Enroll, manage, and monitor all registered students
          </p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }} onClick={() => setShowAddModal(true)}>
          <UserPlus size={16} /> Add Student
        </button>
      </div>

      {/* Success Message */}
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

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total Students", value: filteredStudents.length, icon: <GraduationCap size={20} />, color: "#6366f1" },
          { label: "Active Batches", value: batches.length - 1, icon: <Users size={20} />, color: "#22d3ee" },
          { label: "Courses Enrolled", value: 24, icon: <BookOpen size={20} />, color: "#10b981" },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: c.color }}>{c.value}</h3>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
          <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text" className="form-input" style={{ paddingLeft: 36 }}
            placeholder="Search by name or email..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Filter size={14} color="var(--text-muted)" />
          {batches.map(b => (
            <button key={b} onClick={() => setBatchFilter(b)} style={{
              background: batchFilter === b ? "rgba(99,102,241,0.15)" : "transparent",
              border: "1px solid var(--border)", borderRadius: "999px",
              padding: "4px 12px", fontSize: "0.75rem",
              color: batchFilter === b ? "var(--primary-light)" : "var(--text-secondary)",
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}>
              {b === "all" ? "All Batches" : b}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Batch</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No students found. Click &quot;Add Student&quot; to enroll one.
                </td>
              </tr>
            ) : filteredStudents.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: avatarColor(u.name),
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: 700, color: "white", flexShrink: 0
                    }}>{getInitials(u.name)}</div>
                    <div>
                      <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem" }}>{u.name}</p>
                      <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>ID: {u.id}</p>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{u.email}</td>
                <td>
                  <span className="badge badge-primary" style={{ fontSize: "0.68rem" }}>
                    {u.batch || "—"}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="badge badge-danger"
                    style={{ border: "none", cursor: "pointer", padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 4 }}
                    onClick={() => handleRemove(u.id, u.name)}
                  >
                    <Trash2 size={10} /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div className="glass" style={{
            background: "var(--bg-elevated)", padding: "2rem", borderRadius: "20px",
            width: "100%", maxWidth: 520, border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)"
          }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800 }}>
                Enroll New Student
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 4 }}>
                Fill in the student details. A parent account will be created automatically.
              </p>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Student Info */}
              <div style={{ padding: "1rem", background: "rgba(99,102,241,0.06)", borderRadius: 12, border: "1px solid rgba(99,102,241,0.15)" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary-light)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Student Information
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Full Name *</label>
                    <input type="text" className="form-input" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Arjun Sharma" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Email Address *</label>
                    <input type="email" className="form-input" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="student@college.edu" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Batch *</label>
                    <select className="form-input" value={formData.batch}
                      onChange={e => setFormData({...formData, batch: e.target.value})}
                      style={{ appearance: "none", cursor: "pointer" }}>
                      {["CS-2024-A", "CS-2024-B", "EC-2024-A", "ME-2024-A"].map(b => (
                        <option key={b} value={b} style={{ background: "#1e1e2e" }}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Default Password *</label>
                    <input type="text" className="form-input" required
                      value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div style={{ padding: "1rem", background: "rgba(16,185,129,0.06)", borderRadius: 12, border: "1px solid rgba(16,185,129,0.15)" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10b981", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Parent / Guardian Information
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Parent Name *</label>
                    <input type="text" className="form-input" required
                      value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})}
                      placeholder="e.g. Suresh Sharma" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Parent Email *</label>
                    <input type="email" className="form-input" required
                      value={formData.parentEmail} onChange={e => setFormData({...formData, parentEmail: e.target.value})}
                      placeholder="parent@gmail.com" />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading} style={{ minWidth: 140 }}>
                  {loading ? "Enrolling..." : "✅ Enroll Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
