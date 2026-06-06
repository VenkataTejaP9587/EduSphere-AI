"use client";
import { useState } from "react";
import { Bell, Search, Sun, Moon, Menu, X, Zap } from "lucide-react";
import { getInitials, avatarColor } from "@/lib/utils";
import {
  studentNotifications,
  facultyNotifications,
  adminNotifications,
  parentNotifications
} from "@/lib/mock-data";


interface TopbarProps {
  role: "student" | "faculty" | "admin" | "parent";
  user: { name: string; email: string };
  title?: string;
}

export default function Topbar({ role, user, title }: TopbarProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const roleNotifications =
    role === "student" ? studentNotifications :
    role === "faculty" ? facultyNotifications :
    role === "admin" ? adminNotifications : parentNotifications;

  const [prevRole, setPrevRole] = useState(role);
  const [notifs, setNotifs] = useState(roleNotifications);

  if (role !== prevRole) {
    setPrevRole(role);
    setNotifs(roleNotifications);
  }

  const unread = notifs.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  };

  const notifIcon: Record<string, string> = {
    assignment: "📝", grade: "⭐", ai: "🤖", community: "💬", class: "📹"
  };

  return (
    <header style={{
      height: "var(--topbar-height)", background: "var(--bg-secondary)",
      backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 40,
      gap: "1rem"
    }}>
      {/* Left - Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {title && (
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {title}
          </h1>
        )}
      </div>

      {/* Center - Search */}
      <div style={{ flex: 1, maxWidth: 480 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "999px", padding: "0.5rem 1rem", cursor: "text"
        }}>
          <Search size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            placeholder="Search courses, topics, students..."
            style={{
              background: "none", border: "none", outline: "none",
              color: "var(--text-primary)", fontSize: "0.8rem",
              fontFamily: "var(--font-body)", width: "100%"
            }}
          />
          <kbd style={{
            fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px",
            background: "rgba(255,255,255,0.08)", color: "var(--text-muted)",
            border: "1px solid var(--border)", whiteSpace: "nowrap"
          }}>⌘K</kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} style={{
          width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)",
          transition: "all 0.2s"
        }}>
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            style={{
              width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)", position: "relative"
            }}
          >
            <Bell size={14} />
            {unread > 0 && (
              <span style={{
                position: "absolute", top: 6, right: 6, width: 8, height: 8,
                background: "#ef4444", borderRadius: "50%",
                border: "2px solid var(--bg-primary)"
              }} />
            )}
          </button>

          {showNotifs && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              width: 340, background: "var(--bg-elevated)", border: "1px solid var(--border)",
              borderRadius: "16px", boxShadow: "var(--shadow-lg)", zIndex: 100, overflow: "hidden"
            }}>
              <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Notifications</span>
                <span onClick={handleMarkAllRead} style={{ fontSize: "0.75rem", color: "var(--primary-light)", cursor: "pointer" }}>Mark all read</span>
              </div>
              {notifs.map((n) => (
                <div key={n.id} style={{
                  padding: "0.875rem 1rem", display: "flex", gap: "0.75rem",
                  alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: n.read ? "transparent" : "rgba(99,102,241,0.05)",
                  cursor: "pointer", transition: "background 0.2s"
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1rem"
                  }}>{notifIcon[n.type]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{n.body}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4 }}>{n.time}</div>
                  </div>
                  {!n.read && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 4 }} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
          background: avatarColor(user.name),
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.75rem", fontWeight: 700, color: "white",
          border: "2px solid rgba(99,102,241,0.4)"
        }}>{getInitials(user.name)}</div>
      </div>
    </header>
  );
}
