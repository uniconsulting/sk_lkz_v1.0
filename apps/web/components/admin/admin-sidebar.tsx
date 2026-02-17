"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-[100svh] sticky top-0 bg-white/35 border-r border-dark/10">
      <div className="h-full flex flex-col px-5 py-6">
        {/* Верх: бренд */}
        <div className="flex items-center gap-3 px-1">
          <div className="glass-border rounded-2xl bg-white/40 h-10 w-10 flex items-center justify-center">
            <span className="text-[#26292e] font-semibold">СК</span>
          </div>
          <div className="leading-tight">
            <div className="text-[14px] text-[#26292e]/60">Админ-панель</div>
            <div className="text-[16px] text-[#26292e] font-semibold">Симбирские краски</div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="mt-7 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group relative",
                  "rounded-2xl",
                  "px-3 py-3",
                  "flex items-center gap-3",
                  "transition-colors duration-300",
                  active
                    ? "bg-white/55 text-[#26292e]"
                    : "text-[#26292e]/75 hover:text-[#26292e] hover:bg-white/45",
                ].join(" ")}
              >
                {/* Левый индикатор активного пункта */}
                <span
                  aria-hidden
                  className={[
                    "absolute left-0 top-2 bottom-2 w-1 rounded-full",
                    active ? "bg-[#9caf88]" : "bg-transparent",
                  ].join(" ")}
                />
                <Icon
                  className={[
                    "h-5 w-5 transition-colors duration-300",
                    active ? "text-[#9caf88]" : "text-[#26292e]/55 group-hover:text-[#9caf88]",
                  ].join(" ")}
                />
                <span className="text-[16px] leading-none">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Низ: профиль + выход */}
        <div className="mt-auto pt-6">
          <div className="glass-border rounded-3xl bg-white/35 p-4">
            <div className="text-[14px] text-[#26292e]/60">Администратор</div>
            <div className="mt-1 text-[16px] text-[#26292e] font-semibold truncate">
              admin@simkraski
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              // На будущее: тут будет нормальный logout.
              // Пока просто редирект на /auth.
              window.location.href = "/auth";
            }}
            className="
              mt-3 w-full
              glass-border rounded-3xl
              bg-white/35
              px-4 py-3
              inline-flex items-center justify-center gap-3
              text-[#26292e]/70
              hover:text-[#26292e]
              hover:bg-white/55
              transition-colors duration-300
            "
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[16px] leading-none font-semibold">Выйти</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
