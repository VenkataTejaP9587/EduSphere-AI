"use client";
import { useState } from "react";
import { Calendar, CheckCircle, Clock, AlertTriangle, Users, Save } from "lucide-react";
import { facultyStudents } from "@/lib/mock-data";
import { getInitials, avatarColor } from "@/lib/utils";

export default function FacultyAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState("crs-001");
  const [selectedBatch, setSelectedBatch] = useState("CS-2024-B");
  const [attendanceDate, setAttendanceDate] = useState("2026-05-24");
  
  // Set initial status map for students in roster
  const [statusMap, setStatusMap] = useState<Record<string, "present" | "absent" | "late">>(
    facultyStudents.reduce((acc, student) => {
      acc[student.id] = "present"; // Default is present
      return acc;
    }, {} as Record<string, "present" | "absent" | "late">)
  );

  const handleSetStatus = (studentId: string, status: "present" | "absent" | "late") => {
    setStatusMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const counts = Object.values(statusMap).reduce(
    (acc, status) => {
      acc[status]++;
      return acc;
    },
    { present: 0, absent: 0, late: 0 }
  );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Attendance Register</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Record and log student lecture attendance records in bulk</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }}>
          <Save size={16} /> Save Register Log
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.25rem", display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Select Course</span>
          <select className="form-input" style={{ width: 220, padding: "0.5rem" }} value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
            <option value="crs-001">Full Stack Web Development</option>
            <option value="crs-002">Data Structures & Algorithms</option>
            <option value="crs-003">Machine Learning Fundamentals</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Select Batch</span>
          <select className="form-input" style={{ width: 160, padding: "0.5rem" }} value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
            <option value="CS-2024-B">Batch CS-B</option>
            <option value="CS-2024-A">Batch CS-A</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Register Date</span>
          <input type="date" className="form-input" style={{ width: 180, padding: "0.5rem" }} value={attendanceDate} onChange={e => setAttendanceDate(e.target.value)} />
        </div>

        {/* Counter breakdown */}
        <div style={{ display: "flex", gap: "1rem", marginLeft: "auto", flexWrap: "wrap" }}>
          {[
            { label: "Present", value: counts.present, color: "#10b981" },
            { label: "Absent", value: counts.absent, color: "#ef4444" },
            { label: "Late", value: counts.late, color: "#f59e0b" },
          ].map((c, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: c.color }}>{c.value}</p>
              <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roster list */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Overall Attendance Metric</th>
              <th style={{ textAlign: "center" }}>Mark Attendance</th>
            </tr>
          </thead>
          <tbody>
            {facultyStudents.map((student) => {
              const currentStatus = statusMap[student.id] || "present";
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
                        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Batch {student.batch}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{student.attendance}%</span>
                      <div className="progress-bar-track" style={{ width: 80 }}>
                        <div className="progress-bar-fill" style={{ width: `${student.attendance}%`, background: student.attendance >= 85 ? "#10b981" : "#ef4444" }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                      {[
                        { status: "present" as const, label: "Present", color: "#10b981", activeBg: "rgba(16,185,129,0.15)" },
                        { status: "late" as const, label: "Late", color: "#f59e0b", activeBg: "rgba(245,158,11,0.15)" },
                        { status: "absent" as const, label: "Absent", color: "#ef4444", activeBg: "rgba(239,68,68,0.15)" },
                      ].map(opt => {
                        const isActive = currentStatus === opt.status;
                        return (
                          <button key={opt.status} onClick={() => handleSetStatus(student.id, opt.status)} style={{
                            background: isActive ? opt.activeBg : "transparent",
                            border: `1px solid ${isActive ? opt.color : "var(--border)"}`,
                            color: isActive ? opt.color : "var(--text-secondary)",
                            padding: "6px 16px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600,
                            cursor: "pointer", transition: "all 0.2s"
                          }}>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
