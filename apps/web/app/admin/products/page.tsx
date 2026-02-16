"use client";

import React from "react";
import Image from "next/image";
import {
  Search,
  Download,
  Copy,
  RefreshCcw,
  Home,
  BadgePercent,
  Check,
} from "lucide-react";

import {
  getAllProducts,
  type Product as StoreProduct,
} from "../../../lib/products-store";

type DraftProduct = StoreProduct & Record<string, unknown>;

const LS_KEY = "sk_admin_products_draft_v1";

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function safeParseDraft(): DraftProduct[] | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const cleaned: DraftProduct[] = parsed
      .filter(isObject)
      .map((o) => o as DraftProduct);

    return cleaned.length ? cleaned : null;
  } catch {
    return null;
  }
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function normalizeRank(v: unknown, fallback: number) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function AdminProductsPage() {
  const base = React.useMemo<DraftProduct[]>(
    () => getAllProducts().map((p) => ({ ...p } as DraftProduct)),
    [],
  );

  const [items, setItems] = React.useState<DraftProduct[]>(base);
  const [q, setQ] = React.useState<string>("");
  const [savedMark, setSavedMark] = React.useState<"idle" | "saved">("idle");

  React.useEffect(() => {
    const draft = safeParseDraft();
    if (draft?.length) setItems(draft);
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
      setSavedMark("saved");
      const t = window.setTimeout(() => setSavedMark("idle"), 900);
      return () => window.clearTimeout(t);
    } catch {}
  }, [items]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;

    return items.filter((p) => {
      const hay = `${p.brand ?? ""} ${p.title ?? ""} ${p.id ?? ""}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [items, q]);

  const counts = React.useMemo(() => {
    const home = items.filter((p) => Boolean(p.showOnHome)).length;
    const mega = items.filter((p) => Boolean(p.showInMega)).length;
    return { home, mega };
  }, [items]);

  function patch(id: string, next: Partial<DraftProduct>) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...next } : p)));
  }

  function toggleFlag(id: string, field: "showOnHome" | "showInMega") {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const nextVal = !Boolean(p[field]);
        const rankField: "homeRank" | "megaRank" =
          field === "showOnHome" ? "homeRank" : "megaRank";

        const rank = normalizeRank(p[rankField], 0);

        return {
          ...p,
          [field]: nextVal,
          [rankField]: nextVal ? (rank > 0 ? rank : 10) : p[rankField],
        } as DraftProduct;
      }),
    );
  }

  function setRank(id: string, field: "homeRank" | "megaRank", value: string) {
    const raw = value.trim();
    if (raw === "") {
      patch(id, { [field]: undefined } as Partial<DraftProduct>);
      return;
    }
    const n = Number(raw);
    patch(id, { [field]: Number.isFinite(n) ? n : undefined } as Partial<DraftProduct>);
  }

  function autorank(
    field: "homeRank" | "megaRank",
    flag: "showOnHome" | "showInMega",
  ) {
    setItems((prev) => {
      const selected = prev.filter((p) => Boolean(p[flag]));
      const selectedSorted = selected
        .slice()
        .sort(
          (a, b) => normalizeRank(a[field], 999999) - normalizeRank(b[field], 999999),
        );

      const nextMap = new Map<string, number>();
      selectedSorted.forEach((p, idx) => nextMap.set(p.id, (idx + 1) * 10));

      return prev.map((p) => {
        if (!p[flag]) return p;
        return { ...p, [field]: nextMap.get(p.id) } as DraftProduct;
      });
    });
  }

  function resetToRepo() {
    setItems(base);
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  }

  function exportJson() {
    const json = JSON.stringify(items, null, 2);
    downloadText("products.json", json);
  }

  async function copyJson() {
    const json = JSON.stringify(items, null, 2);
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = json;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[22px] font-semibold text-[#26292e]">Товары</div>
          <div className="mt-1 text-sm text-[#26292e]/60">
            Управляй витриной главной: 4x3 (showOnHome) и “Спецпредложение” (showInMega).
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm text-[#26292e]/70">
            <span className="inline-flex items-center gap-2">
              <Home className="h-4 w-4 text-[#9caf88]" />
              На главной: <b className="text-[#26292e]">{counts.home}</b>
            </span>
            <span className="mx-3 text-[#26292e]/20">|</span>
            <span className="inline-flex items-center gap-2">
              <BadgePercent className="h-4 w-4 text-[#c6cf13]" />
              Спец: <b className="text-[#26292e]">{counts.mega}</b>
            </span>
          </div>

          <button
            type="button"
            onClick={() => autorank("homeRank", "showOnHome")}
            className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
          >
            Авторанг витрина
          </button>

          <button
            type="button"
            onClick={() => autorank("megaRank", "showInMega")}
            className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
          >
            Авторанг спец
          </button>

          <button
            type="button"
            onClick={exportJson}
            className="glass-border rounded-2xl bg-[#c6cf13] px-3 py-2 text-sm font-semibold text-[#26292e] hover:opacity-90 transition"
            title="Скачать products.json"
          >
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              Скачать JSON
            </span>
          </button>

          <button
            type="button"
            onClick={copyJson}
            className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Скопировать JSON"
          >
            <span className="inline-flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Копировать
            </span>
          </button>

          <button
            type="button"
            onClick={resetToRepo}
            className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/60 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Сбросить к данным из репозитория"
          >
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Сброс
            </span>
          </button>
        </div>
      </div>

      {/* Поиск + статус сохранения */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass-border rounded-2xl bg-white h-12 px-4 flex items-center gap-3 w-full sm:max-w-[520px]">
          <Search className="h-5 w-5 text-[#9caf88]" />
          <input
            value={q}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
            placeholder="Поиск по бренду, названию, id..."
            className="w-full bg-transparent outline-none text-sm text-fg placeholder:text-fg/40"
          />
        </div>

        <div className="text-sm text-[#26292e]/50 flex items-center gap-2">
          {savedMark === "saved" ? (
            <>
              <Check className="h-4 w-4 text-[#9caf88]" /> Черновик сохранён (локально)
            </>
          ) : null}
        </div>
      </div>

      {/* Список */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="glass-border rounded-3xl bg-white/35 p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="glass-border rounded-2xl bg-white/40 relative h-16 w-16 overflow-hidden">
                <Image
                  src={withBasePath(p.imageSrc)}
                  alt={p.title}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>

              <div className="min-w-0">
                <div className="text-sm text-[#26292e] font-semibold truncate">
                  {p.brand}
                </div>
                <div className="text-sm text-[#26292e]/60 truncate">
                  {p.title}
                </div>
                <div className="text-xs text-[#26292e]/35 mt-1">id: {p.id}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {/* Витрина */}
              <div className="glass-border rounded-2xl bg-white/35 px-3 py-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleFlag(p.id, "showOnHome")}
                  className={[
                    "glass-border rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300",
                    p.showOnHome
                      ? "bg-[#9caf88] text-[#26292e]"
                      : "bg-white/50 text-[#26292e]/60 hover:text-[#26292e]",
                  ].join(" ")}
                  title="Показывать в сетке 4x3"
                >
                  Главная
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#26292e]/45">rank</span>
                  <input
                    value={p.homeRank ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRank(p.id, "homeRank", e.target.value)
                    }
                    className="glass-border rounded-xl bg-white/55 h-10 w-[92px] px-3 text-sm outline-none text-[#26292e]"
                    inputMode="numeric"
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Спец */}
              <div className="glass-border rounded-2xl bg-white/35 px-3 py-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleFlag(p.id, "showInMega")}
                  className={[
                    "glass-border rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300",
                    p.showInMega
                      ? "bg-[#c6cf13] text-[#26292e]"
                      : "bg-white/50 text-[#26292e]/60 hover:text-[#26292e]",
                  ].join(" ")}
                  title="Показывать в Спецпредложении (4x2)"
                >
                  Спец
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#26292e]/45">rank</span>
                  <input
                    value={p.megaRank ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRank(p.id, "megaRank", e.target.value)
                    }
                    className="glass-border rounded-xl bg-white/55 h-10 w-[92px] px-3 text-sm outline-none text-[#26292e]"
                    inputMode="numeric"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {!filtered.length ? (
          <div className="glass-border rounded-3xl bg-white/35 p-6 text-sm text-[#26292e]/60">
            Ничего не найдено.
          </div>
        ) : null}
      </div>

      <div className="mt-8 text-sm text-[#26292e]/55">
        Чтобы витрина на главной обновилась на сайте: скачай products.json и замени файл
        <span className="text-[#26292e] font-semibold"> apps/web/data/products.json</span>, потом commit/push.
      </div>
    </div>
  );
}
