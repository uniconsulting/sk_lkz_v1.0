"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Image as ImageIcon,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const NAV: NavItem[] = [
  { href: "/admin", label: "Обзор", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/admin/products", label: "Товары", icon: <Package className="h-5 w-5" /> },
  { href: "/admin/orders", label: "Заказы", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/admin/banners", label: "Баннеры", icon: <ImageIcon className="h-5 w-5" /> },
  { href: "/admin/analytics", label: "Аналитика", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/admin/users", label: "Пользователи", icon: <Users className="h-5 w-5" /> },
  { href: "/admin/settings", label: "Настройки", icon: <Settings className="h-5 w-5" /> },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-border rounded-3xl bg-white/35 p-4 sticky top-6">
      <div className="flex items-center justify-between">
        <div className="text-[#26292e] font-semibold">Админ-панель</div>
        <div className="text-xs text-[#26292e]/50">SK</div>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "glass-border rounded-2xl px-3 py-2",
                "flex items-center gap-3",
                "transition-colors duration-300",
                active
                  ? "bg-white/60 text-[#26292e]"
                  : "bg-white/25 text-[#26292e]/70 hover:bg-white/45 hover:text-[#26292e]",
              ].join(" ")}
            >
              <span className={active ? "text-[#9caf88]" : "text-[#26292e]/60"}>
                {item.icon}
              </span>
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Профиль + выход */}
      <div className="mt-6 pt-4 border-t border-white/40">
        <div className="glass-border rounded-2xl bg-white/30 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#26292e]/10 flex items-center justify-center text-[#26292e]/70 font-semibold">
              A
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#26292e] truncate">
                Администратор
              </div>
              <div className="text-xs text-[#26292e]/50">Полный доступ</div>
            </div>
          </div>

          <Link
            href="/auth"
            className="
              mt-3
              glass-border rounded-2xl
              bg-white/35
              w-full
              inline-flex items-center justify-center gap-2
              py-2
              text-sm font-semibold
              text-[#26292e]/70 hover:text-[#26292e]
              transition-colors duration-300
            "
            title="Выход"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </Link>
        </div>
      </div>
    </aside>
  );
}
