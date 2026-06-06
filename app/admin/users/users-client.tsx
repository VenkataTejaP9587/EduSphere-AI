"use client";
import { useState } from "react";
import { Search, UserPlus, Filter, UserCheck, ShieldAlert, Ban, Edit, Trash2 } from "lucide-react";
import { getInitials, avatarColor } from "@/lib/utils";
import { addStudent, removeStudent } from "@/app/actions/students";

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", password: "password123", parentName: "", parentEmail: "", batch: "CS-2024-B"
  });

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
    await addStudent(fd);
    setShowAddModal(false);
    setLoading(false);
  };

  const handleRemove = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await removeStudent(id);
    }
  };

  const filteredUsers = initialUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>User Directory</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Manage credentials, roles, and status levels for platform participants</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }} onClick={() => setShowAddModal(true)}>
          <UserPlus size={16} /> Provision User
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flex: 1, minWidth: 260, position: "relative" }}>
          <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12 }} />
          <input type="text" className="form-input" style={{ paddingLeft: 36 }} placeholder="Search name, email or ID..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Filter size={14} color="var(--text-muted)" />
          {["all", "admin", "faculty", "student", "parent"].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} style={{
              background: roleFilter === r ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: "1px solid var(--border)",
              borderRadius: "999px", padding: "4px 12px", fontSize: "0.75rem",
              color: roleFilter === r ? "var(--primary-light)" : "var(--text-secondary)",
              fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s"
            }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>User Info</th>
              <th>System Role</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const roleBadge =
                u.role === "admin" ? <span className="badge badge-warning">Admin</span> :
                u.role === "faculty" ? <span className="badge badge-cyan">Faculty</span> :
                u.role === "parent" ? <span className="badge badge-success">Parent</span> :
                <span className="badge badge-primary">Student</span>;

              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: avatarColor(u.name),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.7rem", fontWeight: 700, color: "white"
                      }}>{getInitials(u.name)}</div>
                      <div>
                        <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{u.name}</p>
                        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{roleBadge}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button className="badge badge-danger" style={{ border: "none", cursor: "pointer", padding: "4px 8px", display: "flex", alignItems: "center", gap: 3 }} onClick={() => handleRemove(u.id)}>
                        <Trash2 size={10} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="glass" style={{ background: "var(--bg-elevated)", padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: 500, border: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Add Student & Parent</h2>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Student Name</label>
                  <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Student Email</label>
                  <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Parent Name</label>
                  <input type="text" className="form-input" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Parent Email</label>
                  <input type="email" className="form-input" required value={formData.parentEmail} onChange={e => setFormData({...formData, parentEmail: e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Default Password</label>
                <input type="text" className="form-input" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Adding..." : "Add User"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
