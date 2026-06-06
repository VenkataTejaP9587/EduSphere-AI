"use client";
import { useState } from "react";
import { Plus, GraduationCap, Building, Users, CalendarCheck, MapPin, MoreVertical } from "lucide-react";
import { getInitials, avatarColor } from "@/lib/utils";
import { addInstitution } from "@/app/actions/institutions";

export default function InstitutionsClient({ initialInstitutions = [] }: { initialInstitutions?: any[] }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", campus: "", departments: 1, students: 0, tier: "standard"
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("campus", formData.campus);
    fd.append("departments", formData.departments.toString());
    fd.append("students", formData.students.toString());
    fd.append("tier", formData.tier);
    await addInstitution(fd);
    setShowAddModal(false);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Registered Institutions</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Manage tenant accounts, university credentials, and usage limits</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }} onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Onboard Institution
        </button>
      </div>

      {/* Roster Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
        {initialInstitutions.map((inst) => (
          <div key={inst.id} className="glass glass-hover" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
            
            {/* Context header */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: avatarColor(inst.name),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", fontWeight: 800, color: "white"
              }}>{getInitials(inst.name)}</div>
              <div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{inst.name}</h3>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                  <MapPin size={10} /> {inst.campus}
                </p>
              </div>
            </div>

            {/* Core details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", margin: "0.25rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                <Users size={14} color="var(--text-muted)" /> {inst.students.toLocaleString()} Students
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                <Building size={14} color="var(--text-muted)" /> {inst.departments} Departments
              </div>
            </div>

            {/* Metadata Footer */}
            <div style={{ padding: "0.75rem 0 0", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span className={inst.status === "active" ? "badge badge-success" : "badge badge-danger"} style={{ fontSize: "0.65rem", textTransform: "uppercase" }}>
                  {inst.status}
                </span>
                <span className="badge badge-primary" style={{ fontSize: "0.65rem", textTransform: "uppercase" }}>
                  {inst.tier}
                </span>
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
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Onboard Institution</h2>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Institution Name</label>
                <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Campus Location</label>
                <input type="text" className="form-input" required value={formData.campus} onChange={e => setFormData({...formData, campus: e.target.value})} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Departments</label>
                  <input type="number" className="form-input" required value={formData.departments} onChange={e => setFormData({...formData, departments: Number(e.target.value)})} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Students count</label>
                  <input type="number" className="form-input" required value={formData.students} onChange={e => setFormData({...formData, students: Number(e.target.value)})} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Subscription Tier</label>
                <select className="form-input" value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})} style={{ appearance: "none", cursor: "pointer", background: "rgba(255,255,255,0.05)" }}>
                  <option value="standard" style={{ background: "#1e1e2e" }}>Standard</option>
                  <option value="enterprise" style={{ background: "#1e1e2e" }}>Enterprise</option>
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Onboarding..." : "Onboard Institution"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
