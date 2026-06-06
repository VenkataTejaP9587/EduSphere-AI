"use client";
import { useState } from "react";
import { Users, BookOpen, Calendar, Plus, Edit2, Trash2, ChevronDown, Search, BarChart2 } from "lucide-react";
import Toast from "@/components/shared/Toast";

const initialBatches = [
  { id: "CS-2024-A", name: "CS-2024-A", department: "Computer Science", year: "3rd Year", strength: 78, faculty: "Dr. Priya Nair", courses: 5, startDate: "Aug 2024", endDate: "May 2027", status: "Active", avgAttendance: 87, avgCGPA: 7.9 },
  { id: "CS-2024-B", name: "CS-2024-B", department: "Computer Science", year: "3rd Year", strength: 80, faculty: "Prof. Rajesh Menon", courses: 5, startDate: "Aug 2024", endDate: "May 2027", status: "Active", avgAttendance: 83, avgCGPA: 8.1 },
  { id: "EC-2024-A", name: "EC-2024-A", department: "Electronics & Comm.", year: "3rd Year", strength: 72, faculty: "Dr. Anita Sharma", courses: 5, startDate: "Aug 2024", endDate: "May 2027", status: "Active", avgAttendance: 91, avgCGPA: 7.6 },
  { id: "ME-2024-A", name: "ME-2024-A", department: "Mechanical Eng.", year: "3rd Year", strength: 60, faculty: "Prof. Vikram Joshi", courses: 5, startDate: "Aug 2024", endDate: "May 2027", status: "Active", avgAttendance: 88, avgCGPA: 7.4 },
  { id: "CS-2023-A", name: "CS-2023-A", department: "Computer Science", year: "4th Year", strength: 76, faculty: "Dr. Priya Nair", courses: 4, startDate: "Aug 2023", endDate: "May 2026", status: "Active", avgAttendance: 85, avgCGPA: 8.3 },
  { id: "CS-2022-A", name: "CS-2022-A", department: "Computer Science", year: "Graduated", strength: 74, faculty: "Dr. Priya Nair", courses: 0, startDate: "Aug 2022", endDate: "May 2025", status: "Completed", avgAttendance: 84, avgCGPA: 7.8 },
];

const departments = ["All Departments", "Computer Science", "Electronics & Comm.", "Mechanical Eng."];
const deptColors: Record<string, string> = {
  "Computer Science": "#6366f1",
  "Electronics & Comm.": "#22d3ee",
  "Mechanical Eng.": "#f59e0b",
};

export default function BatchesPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: "", department: "Computer Science", year: "1st Year", strength: "", faculty: "" });
  const [selected, setSelected] = useState<string | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const showToast = (msg: string) => setToast({ visible: true, message: msg });

  const filtered = batches.filter(b => {
    const matchDept = deptFilter === "All Departments" || b.department === deptFilter;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.faculty.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const activeBatches = batches.filter(b => b.status === "Active");
  const totalStudents = batches.reduce((s, b) => s + b.strength, 0);

  const handleAddBatch = () => {
    if (!newBatch.name || !newBatch.faculty || !newBatch.strength) return;
    setBatches(prev => [...prev, {
      id: newBatch.name, name: newBatch.name, department: newBatch.department,
      year: newBatch.year, strength: Number(newBatch.strength), faculty: newBatch.faculty,
      courses: 0, startDate: "Aug 2026", endDate: "May 2029", status: "Active",
      avgAttendance: 0, avgCGPA: 0
    }]);
    setNewBatch({ name: "", department: "Computer Science", year: "1st Year", strength: "", faculty: "" });
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this batch? This cannot be undone.")) {
      setBatches(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Toast visible={toast.visible} message={toast.message} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Batch Management</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Manage student batches, faculty assignments, and performance</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={16} /> Create Batch
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Active Batches", value: String(activeBatches.length), sub: "Across all departments", color: "#10b981", icon: <BookOpen size={20} /> },
          { label: "Total Students", value: String(totalStudents), sub: "Enrolled this year", color: "#6366f1", icon: <Users size={20} /> },
          { label: "Departments", value: "4", sub: "CS, EC, ME, Civil", color: "#22d3ee", icon: <BarChart2 size={20} /> },
          { label: "Graduated Batches", value: String(batches.filter(b => b.status === "Completed").length), sub: "Successfully completed", color: "#a855f7", icon: <Calendar size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: c.color, marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Add Batch Form */}
      {showAdd && (
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid rgba(99,102,241,0.3)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Create New Batch</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginBottom: "1rem" }}>
            {[
              { label: "Batch ID / Name", key: "name", placeholder: "e.g. CS-2026-A" },
              { label: "Faculty In-charge", key: "faculty", placeholder: "e.g. Dr. Priya Nair" },
              { label: "Strength", key: "strength", placeholder: "e.g. 75" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input value={(newBatch as any)[f.key]} onChange={e => setNewBatch({ ...newBatch, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem", boxSizing: "border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Department</label>
              <select value={newBatch.department} onChange={e => setNewBatch({ ...newBatch, department: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: "0.83rem" }}>
                {["Computer Science", "Electronics & Comm.", "Mechanical Eng.", "Civil Eng."].map(d => <option key={d} value={d} style={{ background: "#1e1e2e" }}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={handleAddBatch} className="btn-primary">Create Batch</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.5rem 0.875rem", flex: 1, minWidth: 200 }}>
          <Search size={14} color="var(--text-muted)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search batches or faculty..." style={{ background: "none", border: "none", outline: "none", fontSize: "0.82rem", color: "var(--text-primary)", width: "100%" }} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {departments.map(d => (
            <button key={d} onClick={() => setDeptFilter(d)} style={{ padding: "0.4rem 0.875rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "none", background: deptFilter === d ? "#6366f1" : "rgba(255,255,255,0.06)", color: deptFilter === d ? "white" : "var(--text-muted)", transition: "all 0.2s" }}>
              {d === "All Departments" ? "All" : d.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Batch Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1rem" }}>
        {filtered.map((b) => {
          const dc = deptColors[b.department] || "#6366f1";
          return (
            <div key={b.id} className="glass" style={{ borderRadius: 16, padding: "1.25rem", border: `1px solid ${selected === b.id ? dc + "60" : "var(--border)"}`, cursor: "pointer", transition: "all 0.2s" }} onClick={() => setSelected(selected === b.id ? null : b.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 900, color: dc }}>{b.name}</span>
                    <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: 999, background: b.status === "Active" ? "rgba(16,185,129,0.15)" : "rgba(100,116,139,0.15)", color: b.status === "Active" ? "#10b981" : "#64748b", fontWeight: 700 }}>{b.status}</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{b.department} • {b.year}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={e => { e.stopPropagation(); showToast(`Editing batch: ${b.name}`) }} style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#818cf8" }}>
                    <Edit2 size={12} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); handleDelete(b.id) }} style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem", marginBottom: "1rem" }}>
                <div style={{ padding: "0.625rem", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                  <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 600 }}>STRENGTH</p>
                  <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", marginTop: 2 }}>{b.strength} students</p>
                </div>
                <div style={{ padding: "0.625rem", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                  <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 600 }}>FACULTY</p>
                  <p style={{ fontWeight: 700, fontSize: "0.78rem", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.faculty}</p>
                </div>
              </div>

              {b.status === "Active" && (
                <>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: 5 }}>
                      <span style={{ color: "var(--text-muted)" }}>Avg Attendance</span>
                      <span style={{ fontWeight: 700, color: b.avgAttendance >= 85 ? "#10b981" : "#f59e0b" }}>{b.avgAttendance}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${b.avgAttendance}%`, background: b.avgAttendance >= 85 ? "#10b981" : "#f59e0b" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <span>Avg CGPA: <strong style={{ color: "#6366f1" }}>{b.avgCGPA || "—"}</strong></span>
                    <span>{b.startDate} → {b.endDate}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
