import React from "react";
import { AdminSidebar } from "../../components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          <AdminSidebar />
          <main className="glass-border rounded-3xl bg-white/35 p-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

