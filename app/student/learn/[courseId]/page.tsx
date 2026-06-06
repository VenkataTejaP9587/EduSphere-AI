"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Play, CheckCircle, ArrowLeft, MessageSquare, FileText, Download, Sparkles, Send, Video, ChevronRight, Loader2 } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function LearnPage({ params }: { params: { courseId: string } }) {
  const currentUser = useAuth();
  const course = courses.find(c => c.id === params.courseId) || courses[0];
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa" | "resources">("overview");
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [notesText, setNotesText] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: `Hi! I am your AI assistant for "${course.title}". Ask me anything about the current lecture: "${course.nextLesson}" or previous topics.` }
  ]);

  const mockLectures = Array.from({ length: 8 }, (_, i) => ({
    id: `lec-${i+1}`,
    title: i === 0 ? "Introduction and Overview" : i === 1 ? "Setting up the Environment" : i === 2 ? course.nextLesson : `Deep Dive part ${i-1}`,
    duration: "15:30",
    completed: i < 2,
    isCurrent: i === currentLectureIndex
  }));

  const handleAddNote = () => {
    if (!notesText.trim()) return;
    setSavedNotes([...savedNotes, notesText]);
    setNotesText("");
  };

  const handleAiSummarize = async () => {
    if (summarizing) return;
    setSummarizing(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Summarize the key academic concepts of the lecture: "${mockLectures[currentLectureIndex].title}" in the course "${course.title}" in detail with bullet points.`,
          userName: currentUser?.name ?? "Student",
        }),
      });

      if (!res.ok) throw new Error("Summarization failed");
      const data = await res.json();

      setSavedNotes(prev => [...prev, data.message]);
    } catch (err) {
      console.error(err);
      setSavedNotes(prev => [...prev, "❌ Failed to generate AI summary. Please check your network and try again."]);
    } finally {
      setSummarizing(false);
    }
  };

  const renderNoteContent = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let content: React.ReactNode = line;
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} style={{ fontSize: "0.875rem", fontWeight: 700, margin: "8px 0 4px", color: "white" }}>
            {line.substring(4)}
          </h4>
        );
      }
      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const itemContent = line.replace(/^[\s*-]+/, "");
        content = (
          <li key={idx} style={{ marginLeft: "12px", listStyleType: "disc", marginBottom: "2px", fontSize: "0.78rem" }}>
            {parseInlineNoteStyles(itemContent)}
          </li>
        );
        return content;
      }
      return (
        <p key={idx} style={{ margin: "0 0 4px", lineHeight: 1.4, fontSize: "0.78rem" }}>
          {parseInlineNoteStyles(line)}
        </p>
      );
    });
  };

  const parseInlineNoteStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} style={{ color: "white", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "1px 4px",
            borderRadius: "3px",
            fontFamily: "monospace",
            fontSize: "0.72rem",
            color: "#818cf8"
          }}>{part.slice(1, -1)}</code>
        );
      }
      return part;
    });
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput;
    setChatInput("");
    const updatedMessages = [...chatMessages, { sender: "user" as const, text: userMsg }];
    setChatMessages(updatedMessages);
    setChatLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.sender === "user" ? "user" : "ai",
            message: m.text
          })),
          message: `${userMsg} (Context: I am currently watching the lecture "${mockLectures[currentLectureIndex].title}" in the course "${course.title}")`,
          userName: currentUser?.name ?? "Student",
        }),
      });

      if (!res.ok) throw new Error("AI query failed");
      const data = await res.json();

      setChatMessages(prev => [...prev, {
        sender: "ai",
        text: data.message
      }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        sender: "ai",
        text: "I encountered an issue connecting to the AI brain networks. Please try again in a moment!"
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1600, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Back to courses */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/student/courses" style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem" }}>
          <ArrowLeft size={16} /> Back to Courses
        </Link>
        <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>/</span>
        <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>{course.title}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 1.2fr 1.2fr", gap: "1.25rem" }}>
        {/* Main Content Area: Video & Tabs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Simulated Video Player */}
          <div className="glass" style={{
            borderRadius: "var(--radius-lg)",
            aspectRatio: "16/9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(15, 22, 41, 0.95), rgba(10, 14, 26, 0.98))",
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ opacity: 0.15, position: "absolute", inset: 0, background: `radial-gradient(circle, ${course.color} 0%, transparent 70%)` }} />
            
            <div style={{ zIndex: 1, textAlign: "center" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: `${course.color}25`, border: `1px solid ${course.color}50`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                margin: "0 auto 1.5rem", transition: "all 0.2s"
              }} className="glass-hover">
                <Play size={32} color={course.color} fill={course.color} style={{ marginLeft: 6, marginTop: 20 }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {mockLectures[currentLectureIndex].title}
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Playing Lecture {currentLectureIndex + 1} of {mockLectures.length} · {mockLectures[currentLectureIndex].duration} mins
              </p>
            </div>
            
            {/* Player Controls Bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "1rem", background: "rgba(10, 14, 26, 0.8)",
              borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem"
            }}>
              <Play size={16} color="white" fill="white" />
              <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2 }}>
                <div style={{ width: "35%", height: "100%", background: course.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>05:24 / {mockLectures[currentLectureIndex].duration}</span>
            </div>
          </div>

          {/* Tabs Container */}
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.25rem" }}>
            <div style={{ display: "flex", borderBottom: "1px solid var(--border)", gap: "1.5rem", marginBottom: "1rem" }}>
              {(["overview", "notes", "qa", "resources"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  background: "none", border: "none", color: activeTab === tab ? "var(--text-primary)" : "var(--text-secondary)",
                  paddingBottom: "0.75rem", borderBottom: activeTab === tab ? `2px solid ${course.color}` : "2px solid transparent",
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer",
                  textTransform: "capitalize", transition: "all 0.2s"
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ minHeight: 180 }}>
              {activeTab === "overview" && (
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>About this lecture</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.825rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                    This lecture covers the foundational concepts needed to build robust configurations. We will dive deep into state architecture, routing layers, and how the virtual elements bind in client interactions. Make sure to complete the corresponding module homework in the Assignments section.
                  </p>
                  <div style={{ display: "flex", gap: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                    <div>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Instructor</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{course.instructor}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Category</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{course.category}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Language</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>English</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flex: 1, minWidth: 240 }}>
                      <input type="text" className="form-input" placeholder="Type a note at 05:24..." value={notesText} onChange={e => setNotesText(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddNote()} />
                      <button className="btn-primary" style={{ background: course.color }} onClick={handleAddNote}>Save</button>
                    </div>
                    <button className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6, borderColor: "rgba(99,102,241,0.4)", color: "#818cf8" }} onClick={handleAiSummarize} disabled={summarizing}>
                      {summarizing ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Summarizing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>AI Summarize Lecture</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {savedNotes.map((note, index) => (
                      <div key={index} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "0.75rem", background: `${course.color}20`, color: course.color, padding: "2px 6px", borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>05:24</span>
                        <div style={{ flex: 1, minWidth: 0, color: "var(--text-secondary)" }}>
                          {renderNoteContent(note)}
                        </div>
                      </div>
                    ))}
                    {savedNotes.length === 0 && (
                      <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", textAlign: "center", padding: "1.5rem" }}>No notes added yet. Notes are timestamped to the video timeline!</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input type="text" className="form-input" placeholder="Ask a question to other students..." />
                    <button className="btn-primary" style={{ background: course.color }}>Post</button>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <p style={{ fontSize: "0.8rem", fontWeight: 700 }}>Rahul Verma</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>2 hours ago</p>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>Should we configure hooks with dependencies array containing functions or let them reference state pointers directly?</p>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { name: "Lecture Slides.pdf", size: "4.8 MB" },
                    { name: "Sample Codebase Repo.zip", size: "12.4 MB" },
                    { name: "API Checklist Document.docx", size: "1.2 MB" },
                  ].map((res, index) => (
                    <div key={index} style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <FileText size={16} color={course.color} />
                        <div>
                          <p style={{ fontSize: "0.8rem", fontWeight: 600 }}>{res.name}</p>
                          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{res.size}</p>
                        </div>
                      </div>
                      <button style={{ background: "none", border: "none", color: course.color, cursor: "pointer" }}>
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Playlist Panel */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden", height: "fit-content" }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Video size={16} color={course.color} />
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700 }}>Course Content</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxHeight: 400, overflowY: "auto" }}>
            {mockLectures.map((lec, index) => (
              <div key={lec.id} onClick={() => setCurrentLectureIndex(index)} style={{
                padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)",
                background: lec.isCurrent ? `${course.color}08` : "transparent",
                borderLeft: lec.isCurrent ? `3px solid ${course.color}` : "3px solid transparent",
                cursor: "pointer", display: "flex", gap: "0.5rem", transition: "all 0.2s"
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", flex: 1, minWidth: 0 }}>
                  {lec.completed ? (
                    <CheckCircle size={14} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  ) : (
                    <Play size={12} color="var(--text-muted)" style={{ marginTop: 4, flexShrink: 0 }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: lec.isCurrent ? 700 : 500, color: lec.isCurrent ? "var(--text-primary)" : "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {lec.title}
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{lec.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Sidebar Chat Panel */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden", height: "550px" }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, rgba(99,102,241,0.08), transparent)" }}>
            <Sparkles size={16} color="#818cf8" />
            <div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700 }}>AI Study Coach</h3>
              <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Ask doubts about this lecture</p>
            </div>
          </div>
          <div style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto" }}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-ai"} style={{
                padding: "0.625rem 0.875rem", fontSize: "0.75rem", borderRadius: msg.sender === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                maxWidth: "90%",
                background: msg.sender === "user" ? course.color : "rgba(255,255,255,0.03)",
                border: msg.sender === "user" ? "none" : "1px solid var(--border)"
              }}>
                {msg.text}
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <div style={{
                  padding: "0.625rem 0.875rem", fontSize: "0.72rem", borderRadius: "12px 12px 12px 2px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", width: "fit-content"
                }}>
                  <Loader2 size={12} className="animate-spin" />
                  <span>AI Coach is thinking...</span>
                </div>
              </div>
            )}
          </div>
          <div style={{ padding: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.5rem" }}>
            <input type="text" className="form-input" style={{ fontSize: "0.75rem", padding: "0.5rem" }} placeholder="Ask a doubt..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendChat()} />
            <button className="btn-primary" style={{ padding: "0.5rem", background: course.color }} onClick={handleSendChat}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
