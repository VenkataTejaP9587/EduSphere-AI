"use client";
import { useState } from "react";
import { Sparkles, Play, CheckCircle, Save, Sliders, FileText, Plus, HelpCircle } from "lucide-react";
import Toast from "@/components/shared/Toast";


export default function FacultyQuizzesPage() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("crs-001");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [referenceText, setReferenceText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [quizPreview, setQuizPreview] = useState<Array<{ id: number; question: string; options: string[]; answer: number; explanation: string }>>([]);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "info" | "error" }>({ visible: false, message: "", type: "success" });
  const showToast = (msg: string, type: "success" | "info" | "error" = "success") => setToast({ visible: true, message: msg, type });

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setQuizPreview([]);

    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, topic, difficulty, numQuestions, referenceText }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to generate quiz", "error");
      } else {
        setQuizPreview(data.quiz);
        showToast(
          data.isDemo
            ? "Quiz generated successfully (Demo Mode fallback)"
            : "AI Quiz generated successfully using Gemini!",
          data.isDemo ? "info" : "success"
        );
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while generating the quiz", "error");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "360px 1fr", gap: "1.5rem" }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      
      {/* Quiz Config Panel */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", height: "fit-content", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles size={18} color="#818cf8" /> AI Quiz Generator
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Target Course</span>
          <select className="form-input" style={{ padding: "0.5rem" }} value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="crs-001">Full Stack Web Development</option>
            <option value="crs-002">Data Structures & Algorithms</option>
            <option value="crs-003">Machine Learning Fundamentals</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Quiz Topic</span>
          <input type="text" className="form-input" style={{ padding: "0.5rem" }} placeholder="e.g. Backpropagation, React Hooks..." value={topic} onChange={e => setTopic(e.target.value)} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Difficulty Level</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["easy", "medium", "hard"].map(level => (
              <button key={level} onClick={() => setDifficulty(level)} style={{
                flex: 1, padding: "6px 0", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                background: difficulty === level ? "rgba(99,102,241,0.15)" : "transparent",
                border: `1px solid ${difficulty === level ? "var(--primary)" : "var(--border)"}`,
                color: difficulty === level ? "var(--primary-light)" : "var(--text-secondary)",
                textTransform: "capitalize", transition: "all 0.2s"
              }}>
                {level}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Number of Questions: {numQuestions}</span>
          <input type="range" min="2" max="15" step="1" style={{ width: "100%", accentColor: "#6366f1" }} value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Reference Study Note (Optional)</span>
          <textarea className="form-input" style={{ minHeight: 100, fontSize: "0.8rem", resize: "vertical" }} placeholder="Paste syllabus text, lecture note transcript, or paragraphs to target quiz questions precisely..." value={referenceText} onChange={e => setReferenceText(e.target.value)} />
        </div>

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", background: "var(--gradient-primary)" }} onClick={handleGenerateQuiz} disabled={generating || !topic.trim()}>
          <Sparkles size={16} /> {generating ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      {/* Quiz Preview Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {/* Banner */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.25rem", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.25rem" }}>Quiz Compilation Feed</h3>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Review AI-generated multiple choice questions before publishing to cohort calendars</p>
        </div>

        {generating && (
          <div className="glass shimmer" style={{ borderRadius: "var(--radius-lg)", padding: "3rem", textAlign: "center", border: "1px solid var(--border)" }}>
            <Sparkles size={32} color="#6366f1" style={{ margin: "0 auto 1rem", animation: "spin 2s linear infinite" }} />
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>AI Coach is parsing reference texts and generating matching answer choices...</p>
          </div>
        )}

        {quizPreview.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {quizPreview.map((q, idx) => (
              <div key={q.id} className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.4, color: "var(--text-primary)" }}>
                    Question {idx + 1}: {q.question}
                  </h4>
                  <span className="badge badge-primary">MCQ</span>
                </div>
                
                {/* Options */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === q.answer;
                    return (
                      <div key={oIdx} style={{
                        padding: "0.75rem", borderRadius: 8,
                        background: isCorrect ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isCorrect ? "#10b981" : "var(--border)"}`,
                        fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem"
                      }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          background: isCorrect ? "#10b981" : "rgba(255,255,255,0.08)",
                          color: "white", fontSize: "0.65rem", fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>{String.fromCharCode(65 + oIdx)}</div>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div style={{ padding: "0.75rem", borderRadius: 8, background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.15)", fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <strong>💡 AI Explanation:</strong> {q.explanation}
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setQuizPreview([])}>Discard Quiz</button>
              <button className="btn-primary" style={{ background: "var(--gradient-primary)" }}>
                <CheckCircle size={16} /> Publish Quiz to Cohort
              </button>
            </div>
          </div>
        )}

        {!generating && quizPreview.length === 0 && (
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "4rem", textAlign: "center", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            <HelpCircle size={40} style={{ margin: "0 auto 0.75rem", opacity: 0.3 }} />
            <p style={{ fontSize: "0.85rem" }}>Configure options in the generator panel and press &quot;Generate&quot; to preview questions</p>
          </div>
        )}

      </div>
    </div>
  );
}
