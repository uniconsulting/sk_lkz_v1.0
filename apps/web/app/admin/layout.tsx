import React from "react";
import { AdminSidebar } from "../../components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100svh]">
      <div className="grid grid-cols-[280px_1fr] min-h-[100svh]">
        <AdminSidebar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
