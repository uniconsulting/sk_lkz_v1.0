"use client";

import React from "react";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="block">
      <path
        d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="block">
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
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
        initial = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
      }
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
      onClick={() => {
        setIsDark((v) => {
          const next = !v;
          applyTheme(next);
          return next;
        });
      }}
      className="h-6 w-6 inline-flex items-center justify-center text-dark/70 hover:text-dark transition leading-none p-0 border-0 bg-transparent shadow-none"
      title={isDark ? "Тёмная тема" : "Светлая тема"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
