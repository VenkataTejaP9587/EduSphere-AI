"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Flame, CheckCircle, RefreshCw, AlertTriangle, BookOpen, Wifi, WifiOff, Loader2 } from "lucide-react";
import { aiChatHistory } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function AIAssistantPage() {
  const currentUser = useAuth();
  const userName = currentUser?.name?.split(' ')[0] ?? 'there';
  const [messages, setMessages] = useState(aiChatHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true); // Track if running in demo fallback mode
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    // Append user message
    const userMsg = {
      id: messages.length + 1,
      role: "user",
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Call our backend API that integrates with Gemini
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          message: text,
          userName: currentUser?.name ?? 'Student',
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      // Update isDemoMode based on server response
      setIsDemoMode(data.isDemo);

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: "ai",
        message: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Append a friendly local error handler message
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: "ai",
        message: `Sorry ${userName}, I encountered an issue connecting to my core brain networks. 

Please ensure that your server has a stable internet connection or check if the backend service is running correctly. In the meantime, feel free to try again!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render message content with basic markdown formatting
  const renderMessageContent = (text: string) => {
    if (!text) return null;

    // Split text by lines
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      let content: React.ReactNode = line;

      // Handle simple markdown headers (### Header)
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} style={{ fontSize: '1rem', fontWeight: 700, margin: '12px 0 6px', color: 'white' }}>
            {line.substring(4)}
          </h3>
        );
      }

      // Handle bullet lists (* List Item)
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemContent = line.replace(/^[\s*-]+/, '');
        content = (
          <li key={idx} style={{ marginLeft: '16px', listStyleType: 'disc', marginBottom: '4px' }}>
            {parseInlineStyles(itemContent)}
          </li>
        );
        return content;
      }

      // Handle code snippets (Python/SQL block markers)
      if (line.startsWith('```')) {
        return null; // Skip markdown block code bounds
      }

      return (
        <p key={idx} style={{ margin: '0 0 6px', lineHeight: 1.5 }}>
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Quick helper to parse bold text **text** and `code` inline
  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\$\$.*?\$\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'white', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2px 6px', 
            borderRadius: '4px', 
            fontFamily: 'monospace', 
            fontSize: '0.75rem',
            color: '#818cf8' 
          }}>
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return <span key={i} style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#a5b4fc' }}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", height: "calc(100vh - 120px)" }}>
      {/* Chat Area */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
        {/* Chat Header */}
        <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, rgba(99,102,241,0.08), transparent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(99,102,241,0.2)" }}>
              <Bot size={20} color="#818cf8" />
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                EduSphere AI Assistant 
                {isDemoMode ? (
                  <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: "rgba(245,158,11,0.15)", color: "#f59e0b", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <WifiOff size={10} /> DEMO ACTIVE
                  </span>
                ) : (
                  <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: "rgba(16,185,129,0.15)", color: "#10b981", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Wifi size={10} /> LIVE CO-PILOT
                  </span>
                )}
              </h2>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", margin: "4px 0 0" }}>Personalized academic helper and course-aware mentor</p>
            </div>
          </div>
          <button style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "8px", width: "32px", height: "32px", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setMessages(aiChatHistory.slice(0, 1))} className="glass-hover">
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Message Feed */}
        <div ref={scrollRef} style={{ flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", overflowY: "auto" }}>
          {messages.map((msg) => {
            const isAI = msg.role === "ai";
            return (
              <div key={msg.id} style={{ display: "flex", gap: "0.75rem", flexDirection: isAI ? "row" : "row-reverse", alignItems: "flex-start" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: isAI ? "rgba(99,102,241,0.12)" : "rgba(34,211,238,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  border: `1px solid ${isAI ? "rgba(99,102,241,0.2)" : "rgba(34,211,238,0.2)"}`
                }}>
                  {isAI ? <Bot size={16} color="#818cf8" /> : <User size={16} color="#22d3ee" />}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "80%" }}>
                  <div className={isAI ? "chat-bubble-ai" : "chat-bubble-user"} style={{
                    padding: "10px 14px", fontSize: "0.825rem", borderRadius: isAI ? "0px 16px 16px 16px" : "16px 0px 16px 16px",
                    background: isAI ? "rgba(255,255,255,0.03)" : "var(--primary)",
                    border: isAI ? "1px solid var(--border)" : "none",
                    color: isAI ? "var(--text-secondary)" : "white",
                  }}>
                    {isAI ? renderMessageContent(msg.message) : msg.message}
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", alignSelf: isAI ? "flex-start" : "flex-end" }}>{msg.timestamp}</span>
                </div>
              </div>
            );
          })}
          {loading && (
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={16} color="#818cf8" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="chat-bubble-ai" style={{
                  padding: "12px 18px", 
                  borderRadius: "0px 16px 16px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  <Loader2 size={14} className="animate-spin" color="#818cf8" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>EduSphere AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{ padding: "1rem", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Quick Prompts */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              "Generate DSA study tips",
              "Explain vanishing gradient problem",
              "Review my computer networks internal marks",
            ].map((p, idx) => (
              <button key={idx} onClick={() => handleSendMessage(p)} disabled={loading} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
                borderRadius: "999px", padding: "4px 12px", fontSize: "0.72rem",
                color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s"
              }} className="glass-hover">
                {p}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Ask a doubt or request practice tasks..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              disabled={loading} 
            />
            <button className="btn-primary" onClick={() => handleSendMessage()} disabled={loading} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={16} /> Send
            </button>
          </div>
        </div>
      </div>

      {/* AI Context Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Recommendation card */}
        <div className="glass animate-pulse-glow" style={{ borderRadius: "var(--radius-lg)", padding: "1.25rem", border: "1px solid rgba(245,158,11,0.3)" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
            <Flame size={16} color="#f59e0b" />
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b", margin: 0 }}>Focus Suggestion</h3>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
            Our model detects that <strong>Computer Networks</strong> is a key area of risk for you based on internal assessment telemetry.
          </p>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", background: "#f59e0b", border: "none", fontSize: "0.75rem", padding: "0.5rem", cursor: 'pointer' }} onClick={() => handleSendMessage("Help me recover my grade in Computer Networks")}>
            Review Networks Concepts
          </button>
        </div>

        {/* Course contexts */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, margin: 0 }}>
            <BookOpen size={14} color="#6366f1" /> Enrolled Subjects
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { name: "Full Stack Web Dev", status: "Active context" },
              { name: "DSA Algorithms", status: "Active context" },
              { name: "Machine Learning Fundamentals", status: "Weak concepts found" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "0.625rem", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, margin: 0 }}>{c.name}</p>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", margin: "2px 0 0" }}>{c.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
