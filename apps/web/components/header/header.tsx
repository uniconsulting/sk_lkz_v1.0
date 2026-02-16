import React from "react";
import { Stickybar } from "./stickybar";
import { Topbar, type TopNavItem } from "./topbar";
import { ThemeToggle } from "./theme-toggle";

export type HeaderProps = {
  logoSlot?: React.ReactNode;
  nav: TopNavItem[];
  regionLabel: string;
  phoneLabel: string;
  phoneHref: string;
};

export function Header(props: HeaderProps) {
  return (
    <>
      {/* Верхняя часть - обычный header */}
      <header className="w-full relative z-[70]">
        <Topbar {...props} themeSlot={<ThemeToggle />} />
      </header>

      {/* Нижняя часть - sticky ДОЛЖНА быть вне <header> */}
      <Stickybar />
    </>
  );
}
