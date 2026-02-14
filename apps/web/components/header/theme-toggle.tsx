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
      if (!saved) {
        initial =
          window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
      }
    } catch {
      initial =
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    }
    setIsDark(initial);
    applyTheme(initial);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        setIsDark((v) => {
          const next = !v;
          applyTheme(next);
          return next;
        })
      }
      className="inline-flex items-center justify-center transition
                 w-8 h-8 p-0 bg-transparent border-0 shadow-none
                 hover:opacity-90
                 focus:outline-none focus-visible:ring-0"
      aria-label="Сменить тему"
      title={isDark ? "Тёмная тема" : "Светлая тема"}
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-[#7a72e9]" aria-hidden />
      ) : (
        <Sun className="h-5 w-5 text-[#c6cf13]" aria-hidden />
      )}
    </button>
  );
}
