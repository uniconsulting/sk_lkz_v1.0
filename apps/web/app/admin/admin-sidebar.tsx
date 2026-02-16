import React from "react";
import Link from "next/link";
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

export function AdminSidebar() {
  return (
    <aside className="glass-border rounded-3xl bg-white/35 p-4">
      <div className="px-2 py-2 text-[14px] text-[#26292e]/60">
        Панель управления
      </div>

      <nav className="mt-3 flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                group
                glass-border
                rounded-2xl
                bg-white/30
                px-3 py-3
                flex items-center gap-3
                text-[#26292e]/80
                hover:text-[#26292e]
                hover:bg-white/45
                transition-colors duration-300
              "
            >
              <Icon className="h-5 w-5 text-[#26292e]/55 group-hover:text-[#9caf88] transition-colors duration-300" />
              <span className="text-[16px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        <div className="glass-border rounded-2xl bg-white/30 p-3">
          <div className="text-[14px] text-[#26292e]/60">Администратор</div>
          <div className="mt-1 text-[16px] text-[#26292e] font-semibold">
            admin@simkraski
          </div>
        </div>

        <button
          type="button"
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
    </aside>
  );
}
