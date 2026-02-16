"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AuthClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";

  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // MVP-проверка: admin / admin
    if (email.trim().toLowerCase() !== "admin" || pass !== "admin") {
      setError("Неверные данные. Для MVP: логин admin, пароль admin.");
      return;
    }

    // Временная сессия (без отдельной lib, чтобы не упереться в импорты)
    try {
      localStorage.setItem(
        "admin_session",
        JSON.stringify({
          email: "admin@simkraski",
          role: "admin",
          createdAt: Date.now(),
        })
      );
    } catch {}

    router.push(next);
  }

  return (
    <div className="max-w-[520px]">
      <div className="text-[28px] font-semibold text-[#26292e]">Вход</div>
      <div className="mt-2 text-[#26292e]/60">
        Сейчас это MVP-авторизация. Дальше подключим нормальную.
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 glass-border rounded-3xl bg-white/60 p-6"
      >
        <label className="block text-sm text-[#26292e]/70">Логин</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full glass-border rounded-2xl bg-white h-12 px-4 outline-none text-[#26292e]"
          placeholder="admin"
          autoComplete="username"
        />

        <label className="block mt-5 text-sm text-[#26292e]/70">Пароль</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="mt-2 w-full glass-border rounded-2xl bg-white h-12 px-4 outline-none text-[#26292e]"
          placeholder="admin"
          type="password"
          autoComplete="current-password"
        />

        {error ? <div className="mt-4 text-sm text-red-600">{error}</div> : null}

        <button
          type="submit"
          className="mt-6 h-12 px-6 rounded-2xl bg-[#c6cf13] text-[#26292e] font-semibold glass-border hover:opacity-95 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
