"use client";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const parentUser = {
    name: "Sunita Sharma",
    email: "sunita.sharma@gmail.com",
    role: "parent" as const,
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="parent" user={parentUser} />
      <div className="main-content">
        <Topbar role="parent" user={parentUser} />
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
