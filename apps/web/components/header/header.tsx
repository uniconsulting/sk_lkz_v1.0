import { Topbar } from "./topbar";
import { Stickybar } from "./stickybar";

export function Header() {
  return (
    <header className="w-full bg-white">
      <Topbar />
      {/* Разделитель между частями хедера: #26292e / 20% */}
      <div className="h-px w-full bg-[#26292e]/20" />
      <Stickybar />
    </header>
  );
}
