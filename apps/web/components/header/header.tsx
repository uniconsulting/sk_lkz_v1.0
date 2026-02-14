import type { ReactNode } from "react";
import { Stickybar } from "./stickybar";
import { Topbar, type TopNavItem } from "./topbar";

export type HeaderProps = {
  logoSlot?: ReactNode;
  nav: TopNavItem[];
  regionLabel: string;
  phoneLabel: string;
  phoneHref: string;
};

export function Header(props: HeaderProps) {
  return (
    <header className="w-full">
      <Topbar {...props} />
      <div className="h-4" aria-hidden />
      <Stickybar />
    </header>
  );
}
