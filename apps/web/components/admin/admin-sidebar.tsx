"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Images,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/orders", label: "Заказы", icon: ShoppingBag },
  { href: "/admin/banners", label: "Баннеры", icon: Images },
  { href: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

const LS_AUTH_KEY = "sk_auth_session_v1";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const adminLabel = React.useMemo(() => {
    try {
      const raw = localStorage.getItem(LS_AUTH_KEY);
      if (!raw) return "admin@simkraski";
      const parsed = JSON.parse(raw) as { login?: unknown };
      const login = typeof parsed?.login === "string" ? parsed.login : "";
      return login || "admin@simkraski";
    } catch {
      return "admin@simkraski";
    }
  }, []);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  }

  function logout() {
    try {
      localStorage.removeItem(LS_AUTH_KEY);
    } catch {}
    router.push("/auth");
    router.refresh();
  }

  return (
    <aside className="relative h-[100svh] w-[300px] shrink-0 bg-white/35 backdrop-blur-md">
      {/* правый разделитель */}
      <div className="absolute right-0 top-0 h-full w-px bg-dark/10" />

      <div className="h-full flex flex-col px-5 py-6">
        <div className="text-[14px] text-[#26292e]/60">Панель управления</div>

        <nav className="mt-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group rounded-2xl px-3 py-3 flex items-center gap-3 transition-colors duration-300",
                  active
                    ? "bg-white/70 text-[#26292e]"
                    : "bg-transparent text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/45",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={[
                    "h-5 w-5 transition-colors duration-300",
                    active
                      ? "text-[#9caf88]"
                      : "text-[#26292e]/50 group-hover:text-[#9caf88]",
                  ].join(" ")}
                />
                <span className="text-[16px] leading-none">{item.label}</span>

                {active ? (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#9caf88]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <div className="glass-border rounded-2xl bg-white/30 p-3">
            <div className="text-[14px] text-[#26292e]/60">Администратор</div>
            <div className="mt-1 text-[16px] text-[#26292e] font-semibold truncate">
              {adminLabel}
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="
              mt-3 w-full
              glass-border rounded-2xl
              bg-white/30
              px-3 py-3
              inline-flex items-center justify-center gap-3
              text-[#26292e]/70
              hover:text-[#26292e]
              hover:bg-white/45
              transition-colors duration-300
            "
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[16px] leading-none">Выйти</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
