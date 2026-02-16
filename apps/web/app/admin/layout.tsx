"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Image as ImageIcon,
  BarChart3,
  Users,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { readAdminSession, clearAdminSession } from "../../lib/admin-auth";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  { label: "Обзор", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Товары", href: "/admin/products", icon: <Package className="h-5 w-5" /> },
  { label: "Заказы", href: "/admin/orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { label: "Баннеры", href: "/admin/banners", icon: <ImageIcon className="h-5 w-5" /> },
  { label: "Аналитика", href: "/admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { label: "Пользователи", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
  { label: "Настройки", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = React.useState(() => readAdminSession());

  React.useEffect(() => {
    setSession(readAdminSession());
  }, [pathname]);

  if (!session) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-[720px] px-6">
          <div className="glass-border rounded-3xl bg-white/60 p-6">
            <div className="text-[22px] font-semibold text-[#26292e]">
              Доступ в админ-панель
            </div>
            <div className="mt-2 text-[#26292e]/60">
              Нужно войти. Сейчас это MVP (admin/admin).
            </div>

            <Link
              href={`/auth?next=${encodeURIComponent("/admin")}`}
              className="mt-5 inline-flex h-12 px-6 items-center rounded-2xl bg-[#c6cf13] text-[#26292e] font-semibold glass-border hover:opacity-95 transition"
            >
              Перейти к входу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-0px)] bg-bg">
      <div className="mx-auto max-w-[1440px] px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="glass-border rounded-3xl bg-white/55 p-4 flex flex-col">
            <div className="px-3 py-3">
              <div className="text-[16px] font-semibold text-[#26292e]">
                Админ-панель
              </div>
              <div className="mt-1 text-sm text-[#26292e]/55">
                Симбирские краски
              </div>
            </div>

            <nav className="mt-3 flex flex-col gap-1">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "h-11 rounded-2xl px-3 inline-flex items-center gap-3 transition",
                      active
                        ? "bg-[#c6cf13] text-[#26292e] glass-border"
                        : "text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/50",
                    ].join(" ")}
                  >
                    <span className={active ? "text-[#26292e]" : "text-[#26292e]/60"}>
                      {item.icon}
                    </span>
                    <span className="text-[15px] font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-4">
              <div className="glass-border rounded-2xl bg-white/55 p-3">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-2xl bg-[#26292e]/10 inline-flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-[#26292e]/70" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-[#26292e] truncate">
                      {session.email}
                    </div>
                    <div className="text-[12px] text-[#26292e]/55">
                      роль: {session.role}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    clearAdminSession();
                    router.push("/");
                    router.refresh();
                  }}
                  className="mt-3 w-full h-11 rounded-2xl glass-border bg-white/60 inline-flex items-center justify-center gap-2 text-[#26292e]/70 hover:text-[#26292e] transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-semibold">Выйти</span>
                </button>
              </div>
            </div>
          </aside>

          <main className="glass-border rounded-3xl bg-white/45 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

