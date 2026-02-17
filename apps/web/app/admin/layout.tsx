import React from "react";
import { AdminSidebar } from "../../components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] w-full">
      <div className="flex min-h-[100svh]">
        <AdminSidebar />

        <main className="flex-1 min-w-0 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
