"use client";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminUser = useAuth();
  if (!adminUser) return null;
  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" user={adminUser} />
      <div className="main-content">
        <Topbar role="admin" user={adminUser} />
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
