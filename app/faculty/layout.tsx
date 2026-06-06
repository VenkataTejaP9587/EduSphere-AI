"use client";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useAuth } from "@/lib/auth-context";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const facultyUser = useAuth();
  if (!facultyUser) return null;
  return (
    <div className="dashboard-layout">
      <Sidebar role="faculty" user={facultyUser} />
      <div className="main-content">
        <Topbar role="faculty" user={facultyUser} />
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
