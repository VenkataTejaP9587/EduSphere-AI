"use client";
import { useState } from "react";
import { Hash, Volume2, Users, Send, MessageSquare, Megaphone, ShieldAlert, Paperclip, Smile } from "lucide-react";
import { communityChannels, communityMessages } from "@/lib/mock-data";
import { getInitials, avatarColor } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function CommunityPage() {
  const currentUser = useAuth();
  const [activeChannel, setActiveChannel] = useState("ch-001");
  const [messages, setMessages] = useState(communityMessages);
  const [input, setInput] = useState("");

  const currentChannel = communityChannels.find(c => c.id === activeChannel) || communityChannels[0];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      userId: currentUser?.id ?? "stu-001",
      userName: currentUser?.name ?? "Student",
      userAvatar: "",
      isMe: true,
      message: input,
      timestamp: "Just now",
      reactions: [],
      replies: 0
    };

    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "240px 1fr 240px", gap: "1rem", height: "calc(100vh - 120px)" }}>
      
      {/* Channels Sidebar */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Users size={18} color="#6366f1" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>DIT CS Channels</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }} className="channel-list">
          {["General", "Courses", "Support", "Community"].map(cat => {
            const catChannels = communityChannels.filter(c => c.category === cat);
            return (
              <div key={cat} style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", padding: "0 0.5rem 0.25rem", letterSpacing: "0.05em" }}>
                  {cat}
                </p>
                {catChannels.map(ch => {
                  const isActive = ch.id === activeChannel;
                  return (
                    <div key={ch.id} onClick={() => setActiveChannel(ch.id)} className={`channel-item ${isActive ? "active" : ""}`} style={{
                      display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", borderRadius: "8px", cursor: "pointer",
                      background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)", transition: "all 0.2s"
                    }}>
                      {ch.type === "announcement" ? <Megaphone size={14} color="#f59e0b" /> :
                       ch.type === "voice" ? <Volume2 size={14} color="#10b981" /> :
                       <Hash size={14} />}
                      <span style={{ fontSize: "0.8rem", fontWeight: isActive ? 600 : 400, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ch.name}</span>
                      {ch.unread > 0 && (
                        <span style={{ background: "#ef4444", color: "white", fontSize: "0.6rem", fontWeight: 700, padding: "1px 5px", borderRadius: "999px" }}>
                          {ch.unread}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Area */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Active Channel Header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Hash size={18} color="var(--text-muted)" />
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700 }}>{currentChannel.name}</h3>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>|</span>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {currentChannel.type === "announcement" ? "Official announcements channel" : "General discussion and feedback"}
            </p>
          </div>
        </div>

        {/* Message Feed */}
        <div style={{ flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: avatarColor(msg.userName),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700, color: "white"
              }}>{getInitials(msg.userName)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.825rem", fontWeight: 700, color: msg.isFaculty ? "#22d3ee" : "var(--text-primary)" }}>
                    {msg.userName}
                  </span>
                  {msg.isFaculty && (
                    <span style={{ fontSize: "0.65rem", padding: "1px 6px", borderRadius: 4, background: "rgba(34,211,238,0.15)", color: "#22d3ee", fontWeight: 600 }}>
                      Faculty
                    </span>
                  )}
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{msg.timestamp}</span>
                </div>
                <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{msg.message}</p>
                
                {/* Reactions */}
                {msg.reactions.length > 0 && (
                  <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.5rem" }}>
                    {msg.reactions.map((r, ri) => (
                      <span key={ri} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", padding: "2px 6px", borderRadius: 6, cursor: "pointer" }}>
                        {r.emoji} {r.count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: "1rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Paperclip size={18} /></button>
          <input type="text" className="form-input" placeholder={`Message #${currentChannel.name}`} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendMessage()} />
          <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Smile size={18} /></button>
          <button className="btn-primary" onClick={handleSendMessage}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Online Members Panel */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Online — 5</h3>
        </div>
        <div style={{ flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto" }}>
          {[
            { name: "Dr. Priya Nair", role: "Faculty", online: true, color: "#22d3ee" },
            { name: "Rohan Mehta", role: "Student", online: true, color: "#6366f1" },
            { name: "Deepika Nair", role: "Student", online: true, color: "#6366f1" },
            { name: "Anjali Singh", role: "Student", online: true, color: "#6366f1" },
            { name: currentUser?.name ?? "You", role: "Student (You)", online: true, color: "#6366f1" },
          ].map((member, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.5rem", borderRadius: 8 }} className="glass-hover">
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: avatarColor(member.name),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.55rem", fontWeight: 700, color: "white", position: "relative"
              }}>{getInitials(member.name)}
                <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#10b981", border: "1px solid var(--bg-secondary)" }} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</p>
                <p style={{ fontSize: "0.6rem", color: member.color, fontWeight: 600 }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
