"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);

  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {}
}

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    let initial = false;

    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") initial = true;
      if (saved === "light") initial = false;
      if (!saved) initial = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    } catch {
      initial = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    }

    setIsDark(initial);
    applyTheme(initial);
  }, []);

  return (
    <button
      type="button"
      aria-label="Сменить тему"
      aria-pressed={isDark}
      onClick={() =>
        setIsDark((v) => {
          const next = !v;
          applyTheme(next);
          return next;
        })
      }
      className="p-2 -m-2 inline-flex items-center justify-center text-dark/70 hover:text-dark transition leading-none border-0 bg-transparent shadow-none"
      title={isDark ? "Тёмная тема" : "Светлая тема"}
    >
      {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
    </button>
  );
}
