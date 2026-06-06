"use client";
import { useState } from "react";
import { Search, ShieldAlert, CheckCircle, Mail, MessageSquare, ExternalLink, Filter } from "lucide-react";
import { facultyStudents } from "@/lib/mock-data";
import { getInitials, avatarColor } from "@/lib/utils";

export default function FacultyStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredStudents = facultyStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || student.status === filterStatus || (filterStatus === "at_risk" && student.risk === "critical");
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Student Roster</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Monitor academic performance telemetry and intervention triggers</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flex: 1, minWidth: 260, position: "relative" }}>
          <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12 }} />
          <input type="text" className="form-input" style={{ paddingLeft: 36 }} placeholder="Search student name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>

        {/* Filter Badges */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Filter size={14} color="var(--text-muted)" />
          {["all", "excellent", "good", "average", "at_risk"].map((status) => (
            <button key={status} onClick={() => setFilterStatus(status)} style={{
              background: filterStatus === status ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: "1px solid var(--border)",
              borderRadius: "999px", padding: "4px 12px", fontSize: "0.75rem",
              color: filterStatus === status ? "var(--primary-light)" : "var(--text-secondary)",
              fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s"
            }}>
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Table */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Batch</th>
              <th>Attendance</th>
              <th>Assignments Submitted</th>
              <th>Average Score</th>
              <th>Risk Assessment</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const statusColor =
                student.status === "excellent" ? "#10b981" :
                student.status === "good" ? "#6366f1" :
                student.status === "average" ? "#f59e0b" : "#ef4444";

              const riskBadge =
                student.risk === "low" ? <span className="badge badge-success">Low</span> :
                student.risk === "medium" ? <span className="badge badge-warning">Medium</span> :
                <span className="badge badge-danger">Critical</span>;

              return (
                <tr key={student.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: avatarColor(student.name),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.7rem", fontWeight: 700, color: "white"
                      }}>{getInitials(student.name)}</div>
                      <div>
                        <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{student.name}</p>
                        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Last Active: {student.lastActive}</p>
                      </div>
                    </div>
                  </td>
                  <td>{student.batch}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{student.attendance}%</span>
                      <div className="progress-bar-track" style={{ width: 60 }}>
                        <div className="progress-bar-fill" style={{ width: `${student.attendance}%`, background: student.attendance >= 85 ? "#10b981" : "#ef4444" }} />
                      </div>
                    </div>
                  </td>
                  <td>{student.assignments} / 6 tasks</td>
                  <td>
                    <strong style={{ color: statusColor }}>{student.avgScore}%</strong>
                  </td>
                  <td>{riskBadge}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button className="badge badge-cyan" style={{ border: "none", cursor: "pointer", padding: "4px 8px", display: "flex", alignItems: "center", gap: 3 }}>
                        <MessageSquare size={10} /> Message
                      </button>
                      <button className="badge badge-primary" style={{ border: "none", cursor: "pointer", padding: "4px 8px", display: "flex", alignItems: "center", gap: 3 }}>
                        <ExternalLink size={10} /> View details
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "var(--text-muted)" }}>
            <p>No matching student records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
