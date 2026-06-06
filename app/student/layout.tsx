"use client";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useAuth } from "@/lib/auth-context";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const currentUser = useAuth();
  if (!currentUser) return null;
  return (
    <div className="dashboard-layout">
      <Sidebar role="student" user={currentUser} />
      <div className="main-content">
        <Topbar role="student" user={currentUser} />
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
