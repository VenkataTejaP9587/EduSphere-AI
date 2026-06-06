"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Video, FileText, BarChart2,
  CalendarCheck, MessageSquare, Sparkles, Award, ChevronLeft,
  ChevronRight, Bell, Settings, LogOut, Flame, Star, Zap,
  Users, PenSquare, ClipboardList, TrendingUp, CreditCard,
  Shield, Home, ChevronDown, GraduationCap, Wallet, FileCheck,
  Clock, Calculator, Table2, Megaphone, AlertOctagon, Briefcase,
  UserCheck, Building2
} from "lucide-react";
import { getInitials, avatarColor } from "@/lib/utils";
import { logout } from "@/app/actions/auth";
import Toast from "@/components/shared/Toast";


interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const studentNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/student", icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    title: "Learning",
    items: [
      { label: "My Courses", href: "/student/courses", icon: <BookOpen size={18} /> },
      { label: "Assignments", href: "/student/assignments", icon: <FileText size={18} />, badge: 3 },
      { label: "Progress", href: "/student/progress", icon: <BarChart2 size={18} /> },
      { label: "Attendance", href: "/student/attendance", icon: <CalendarCheck size={18} /> },
      { label: "Timetable", href: "/student/timetable", icon: <Table2 size={18} /> },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Academics & CGPA", href: "/student/academics", icon: <Calculator size={18} /> },
      { label: "Examinations", href: "/student/exams", icon: <FileCheck size={18} /> },
      { label: "Leave Application", href: "/student/leave", icon: <Clock size={18} /> },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Fee Payment", href: "/student/fees", icon: <Wallet size={18} /> },
    ],
  },
  {
    title: "Career",
    items: [
      { label: "Placements", href: "/student/placements", icon: <Briefcase size={18} /> },
    ],
  },
  {
    title: "Campus",
    items: [
      { label: "Notice Board", href: "/student/notices", icon: <Megaphone size={18} />, badge: 2 },
      { label: "Grievances", href: "/student/grievances", icon: <AlertOctagon size={18} /> },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { label: "AI Assistant", href: "/student/ai-assistant", icon: <Sparkles size={18} /> },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Community", href: "/student/community", icon: <MessageSquare size={18} />, badge: 47 },
    ],
  },
  {
    title: "Achievements",
    items: [
      { label: "Certificates", href: "/student/certificates", icon: <Award size={18} /> },
    ],
  },
];

const facultyNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/faculty", icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    title: "Teaching",
    items: [
      { label: "My Courses", href: "/faculty/courses", icon: <BookOpen size={18} /> },
      { label: "Students", href: "/faculty/students", icon: <Users size={18} /> },
      { label: "Attendance", href: "/faculty/attendance", icon: <CalendarCheck size={18} /> },
      { label: "Assignments", href: "/faculty/assignments", icon: <ClipboardList size={18} /> },
    ],
  },
  {
    title: "Student Welfare",
    items: [
      { label: "Leave Approvals", href: "/faculty/leaves", icon: <UserCheck size={18} />, badge: 5 },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { label: "AI Quiz Generator", href: "/faculty/quizzes", icon: <Sparkles size={18} /> },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", href: "/faculty/analytics", icon: <TrendingUp size={18} /> },
    ],
  },
];

const adminNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Users", href: "/admin/users", icon: <Users size={18} /> },
      { label: "Students", href: "/admin/students", icon: <GraduationCap size={18} /> },
      { label: "Courses", href: "/admin/courses", icon: <BookOpen size={18} /> },
      { label: "Institutions", href: "/admin/institutions", icon: <Building2 size={18} /> },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Revenue", href: "/admin/revenue", icon: <CreditCard size={18} /> },
      { label: "Fee Management", href: "/admin/fees", icon: <Wallet size={18} />, badge: 47 },
    ],
  },
  {
    title: "Campus",
    items: [
      { label: "Notice Board", href: "/admin/notices", icon: <Megaphone size={18} /> },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: <Settings size={18} /> },
      { label: "Security", href: "/admin/security", icon: <Shield size={18} /> },
    ],
  },
];

const parentNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/parent", icon: <Home size={18} /> },
    ],
  },
];

interface SidebarProps {
  role: "student" | "faculty" | "admin" | "parent";
  user: { name: string; email: string; batch?: string; department?: string; level?: number; xp?: number; streak?: number };
}

export default function Sidebar({ role, user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [toast, setToast] = useState({ visible: false, message: "" });

  const navGroups =
    role === "student" ? studentNav :
    role === "faculty" ? facultyNav :
    role === "admin" ? adminNav : parentNav;

  const roleColor =
    role === "student" ? "#6366f1" :
    role === "faculty" ? "#22d3ee" :
    role === "admin" ? "#f59e0b" : "#10b981";

  const roleBadge =
    role === "student" ? "Student" :
    role === "faculty" ? "Faculty" :
    role === "admin" ? "Admin" : "Parent";

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <Toast visible={toast.visible} message={toast.message} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      {/* Logo */}
      <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1, #22d3ee)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "white"
        }}>E</div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", lineHeight: 1 }}>EduSphere</div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 2 }}>AI Learning Platform</div>
          </div>
        )}
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem", borderRadius: "12px", background: "rgba(255,255,255,0.04)" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: avatarColor(user.name),
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.8rem", fontWeight: 700, color: "white"
            }}>{getInitials(user.name)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: 2 }}>
                <span style={{ fontSize: "0.65rem", padding: "1px 8px", borderRadius: "999px", background: `${roleColor}22`, color: roleColor, fontWeight: 600 }}>{roleBadge}</span>
              </div>
            </div>
          </div>
          {role === "student" && (
            <div style={{ marginTop: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  <Zap size={10} color="#f59e0b" /> <span>Level {user.level ?? 1}</span>
                </div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{user.xp ?? 0} XP</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${Math.min(((user.xp ?? 0) % 1000) / 10, 100)}%` }} />
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.7rem", color: "#f59e0b" }}>
                  <Flame size={10} /> {user.streak ?? 0} streak
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.7rem", color: "#a855f7" }}>
                  <Star size={10} /> Top 15%
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
        {navGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: "0.5rem" }}>
            {!collapsed && (
              <div style={{ padding: "0.5rem 0.75rem 0.25rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                  <div className={`nav-item ${isActive ? "active" : ""}`} style={{ justifyContent: collapsed ? "center" : "flex-start", position: "relative" }}>
                    <span className="nav-icon" style={{ color: isActive ? "#818cf8" : "var(--text-muted)", flexShrink: 0 }}>{item.icon}</span>
                    {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span style={{ background: "#6366f1", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "1px 6px", borderRadius: "999px", minWidth: 18, textAlign: "center" }}>
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, background: "#ef4444", borderRadius: "50%" }} />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div style={{ padding: "0.75rem 0.5rem", borderTop: "1px solid var(--border)" }}>
        <form action={logout}>
          <button type="submit" className="nav-item" style={{ justifyContent: collapsed ? "center" : "flex-start", width: "100%", background: "none", border: "none", cursor: "pointer" }}>
            <LogOut size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </form>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute", top: "50%", right: -12, transform: "translateY(-50%)",
          width: 24, height: 24, borderRadius: "50%",
          background: "var(--bg-elevated)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10, color: "var(--text-muted)", transition: "all 0.2s"
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
