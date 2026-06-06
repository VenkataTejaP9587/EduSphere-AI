"use client";
import { useState } from "react";
import { FileText, User, Star, Clock, Check, Eye, HelpCircle, AlertCircle } from "lucide-react";
import { assignments, facultyStudents } from "@/lib/mock-data";
import { getInitials, avatarColor } from "@/lib/utils";

export default function FacultyAssignmentsPage() {
  const [submissions, setSubmissions] = useState<any[]>(
    assignments.map((a, idx) => ({
      ...a,
      studentName: facultyStudents[idx % facultyStudents.length].name,
      studentId: facultyStudents[idx % facultyStudents.length].id,
    }))
  );

  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const activeSub = submissions.find(s => s.id === activeSubmissionId);

  const handleGradeSubmission = (subId: string) => {
    if (!gradeInput || !feedbackInput) return;
    setSubmissions(prev =>
      prev.map(s => {
        if (s.id === subId) {
          return {
            ...s,
            status: "graded",
            grade: Number(gradeInput),
            feedback: feedbackInput
          };
        }
        return s;
      })
    );
    setActiveSubmissionId(null);
    setGradeInput("");
    setFeedbackInput("");
  };

  const pendingSubmissions = submissions.filter(s => s.status === "submitted");
  const gradedSubmissions = submissions.filter(s => s.status === "graded");

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
      
      {/* Submissions Queue */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Header */}
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Assignments & Grading</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Review submitted documents and allocate student grading matrices</p>
        </div>

        {/* Pending Card List */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
            <span>Submissions Queue</span>
            <span style={{ color: "var(--accent)" }}>{pendingSubmissions.length} pending</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pendingSubmissions.map((sub) => (
              <div key={sub.id} onClick={() => {
                setActiveSubmissionId(sub.id);
                setGradeInput(sub.grade ? String(sub.grade) : "");
                setFeedbackInput(sub.feedback || "");
              }} style={{
                padding: "1rem", borderRadius: "12px",
                background: activeSubmissionId === sub.id ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeSubmissionId === sub.id ? "var(--primary)" : "var(--border)"}`,
                cursor: "pointer", transition: "all 0.2s"
              }} className="glass-hover">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{sub.title}</p>
                  <span className="badge badge-warning" style={{ textTransform: "uppercase", fontSize: "0.6rem" }}>{sub.priority}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", background: avatarColor(sub.studentName),
                      color: "white", fontSize: "0.55rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
                    }}>{getInitials(sub.studentName)}</div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{sub.studentName}</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} /> {sub.dueDate}
                  </span>
                </div>
              </div>
            ))}
            {pendingSubmissions.length === 0 && (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <Check size={32} style={{ margin: "0 auto 0.5rem", opacity: 0.3 }} />
                <p>All submissions graded! You are caught up.</p>
              </div>
            )}
          </div>
        </div>

        {/* Graded Archive */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Graded Archive</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {gradedSubmissions.map((sub) => (
              <div key={sub.id} style={{
                padding: "0.875rem 1rem", borderRadius: "10px",
                background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700 }}>{sub.title}</h4>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{sub.studentName} · Grade: {sub.grade}/{sub.marks}</p>
                </div>
                <span className="badge badge-success" style={{ fontSize: "0.65rem" }}>Graded</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grading Editor Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {/* Banner info */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.25rem", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.25rem" }}>Assessment Form</h3>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Select a student submission in the queue to grade and append notes</p>
        </div>

        {activeSub ? (
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Active Review Target</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{activeSub.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>Submitted by {activeSub.studentName} (ID: {activeSub.studentId})</p>
            </div>

            <div style={{ padding: "0.875rem", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Task Description:</p>
              <p>{activeSub.description}</p>
            </div>

            {/* Document link mock */}
            <div style={{ padding: "0.75rem 1rem", borderRadius: 8, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FileText size={16} color="#818cf8" />
                <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>student_submission_draft.pdf</span>
              </div>
              <button style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: "0.75rem" }}>
                <Eye size={14} /> Open
              </button>
            </div>

            {/* Grade entry */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Allocate Grade (Max {activeSub.marks})</span>
              <input type="number" className="form-input" placeholder="e.g. 92" max={activeSub.marks} value={gradeInput} onChange={e => setGradeInput(e.target.value)} />
            </div>

            {/* Feedback notes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Evaluation Feedback</span>
              <textarea className="form-input" style={{ minHeight: 120, resize: "vertical", fontSize: "0.8rem" }} placeholder="Provide detailed code reviews, structural suggestions, and marks allocation rationale..." value={feedbackInput} onChange={e => setFeedbackInput(e.target.value)} />
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setActiveSubmissionId(null)}>Cancel</button>
              <button className="btn-primary" style={{ background: "var(--gradient-primary)" }} onClick={() => handleGradeSubmission(activeSub.id)}>
                <Check size={16} /> Submit Grading
              </button>
            </div>

          </div>
        ) : (
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "4rem", textAlign: "center", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            <AlertCircle size={40} style={{ margin: "0 auto 0.75rem", opacity: 0.3 }} />
            <p style={{ fontSize: "0.85rem" }}>No active submission selected in the queue</p>
          </div>
        )}

      </div>
    </div>
  );
}
