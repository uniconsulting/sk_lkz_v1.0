"use client";

import React from "react";
import Image from "next/image";
import {
  Search,
  Download,
  Copy,
  RefreshCcw,
  Check,
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
} from "lucide-react";

import {
  getAllProducts,
  type Product as StoreProduct,
} from "../../../lib/products-store";

type DraftProduct = StoreProduct & {
  // на будущее, если захочешь расширять карточку
  category?: string;
  status?: "in_stock" | "out_of_stock";
};

type FlagField = "showOnHome" | "showInMega";
type RankField = "homeRank" | "megaRank";

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

function formatRub(v: number) {
  return new Intl.NumberFormat("ru-RU").format(v) + " ₽";
}

function clampPrice(v: number) {
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  return Math.round(v);
}

export default function AdminProductsPage() {
  const base = React.useMemo<DraftProduct[]>(
    () => getAllProducts().map((p) => ({ ...p } as DraftProduct)),
    [],
  );

  const [items, setItems] = React.useState<DraftProduct[]>(base);
  const [q, setQ] = React.useState<string>("");
  const [savedMark, setSavedMark] = React.useState<"idle" | "saved">("idle");
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set());

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
    return { home, mega, total: items.length };
  }, [items]);

  const selectedCount = selected.size;

  function patch(id: string, next: Partial<DraftProduct>) {
    setItems((prev) => prev.map((p) => (p.id === id ? ({ ...p, ...next } as DraftProduct) : p)));
  }

  function toggleFlag(id: string, field: FlagField) {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const nextVal = !Boolean(p[field]);
        const rankField: RankField = field === "showOnHome" ? "homeRank" : "megaRank";
        const rank = normalizeRank(p[rankField], 0);

        return {
          ...p,
          [field]: nextVal,
          [rankField]: nextVal ? (rank > 0 ? rank : 10) : p[rankField],
        } as DraftProduct;
      }),
    );
  }

  function setRank(id: string, field: RankField, value: string) {
    const raw = value.trim();
    if (raw === "") {
      patch(id, { [field]: undefined } as Partial<DraftProduct>);
      return;
    }
    const n = Number(raw);
    patch(id, { [field]: Number.isFinite(n) ? n : undefined } as Partial<DraftProduct>);
  }

  function setPrice(id: string, value: string) {
    const raw = value.replace(/\s+/g, "").replace(/[₽]/g, "").trim();
    if (raw === "") {
      patch(id, { priceRub: 0 });
      return;
    }
    const n = Number(raw);
    patch(id, { priceRub: clampPrice(n) });
  }

  function autorank(field: RankField, flag: FlagField) {
    setItems((prev) => {
      const selectedList = prev.filter((p) => Boolean(p[flag]));
      const sorted = selectedList
        .slice()
        .sort((a, b) => normalizeRank(a[field], 999999) - normalizeRank(b[field], 999999));

      const nextMap = new Map<string, number>();
      sorted.forEach((p, idx) => nextMap.set(p.id, (idx + 1) * 10));

      return prev.map((p) => {
        if (!p[flag]) return p;
        return { ...p, [field]: nextMap.get(p.id) } as DraftProduct;
      });
    });
  }

  function resetToRepo() {
    setItems(base);
    setSelected(new Set());
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

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllVisible() {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((p) => next.add(p.id));
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function setFlagForSelected(field: FlagField, value: boolean) {
    if (!selected.size) return;

    setItems((prev) =>
      prev.map((p) => {
        if (!selected.has(p.id)) return p;

        const rankField: RankField = field === "showOnHome" ? "homeRank" : "megaRank";
        const rank = normalizeRank(p[rankField], 0);

        return {
          ...p,
          [field]: value,
          [rankField]: value ? (rank > 0 ? rank : 10) : p[rankField],
        } as DraftProduct;
      }),
    );
  }

  function RowToggle({
    active,
    onClick,
    label,
    accentClass,
  }: {
    active: boolean;
    onClick: () => void;
    label: string;
    accentClass: string;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          "glass-border rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300",
          active ? accentClass : "bg-white/50 text-[#26292e]/60 hover:text-[#26292e]",
        ].join(" ")}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Верхняя строка: заголовок + основная кнопка */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[28px] font-semibold text-[#26292e]">Товары</div>
          <div className="mt-1 text-sm text-[#26292e]/60">
            Всего: <span className="text-[#26292e] font-semibold">{counts.total}</span>. На главной:{" "}
            <span className="text-[#26292e] font-semibold">{counts.home}</span>. Спец:{" "}
            <span className="text-[#26292e] font-semibold">{counts.mega}</span>.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-[#26292e]/50 flex items-center gap-2">
            {savedMark === "saved" ? (
              <>
                <Check className="h-4 w-4 text-[#9caf88]" />
                Черновик сохранён (локально)
              </>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => alert("Добавление товара сделаем следующим шагом.")}
            className="
              glass-border rounded-2xl
              bg-white/35
              px-4 py-3
              inline-flex items-center gap-2
              text-[#26292e] font-semibold
              hover:bg-white/55 transition-colors duration-300
            "
          >
            <Plus className="h-5 w-5 text-[#9caf88]" />
            Добавить товар
          </button>
        </div>
      </div>

      {/* Панель: поиск + действия */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="glass-border rounded-2xl bg-white h-12 px-4 flex items-center gap-3 w-full lg:max-w-[760px]">
          <Search className="h-5 w-5 text-[#9caf88]" />
          <input
            value={q}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
            placeholder="Поиск по бренду, названию, id..."
            className="w-full bg-transparent outline-none text-sm text-fg placeholder:text-fg/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Фильтры добавим следующим шагом.")}
            className="
              glass-border rounded-2xl bg-white/35
              px-4 py-3 text-sm font-semibold text-[#26292e]/75
              hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300
              inline-flex items-center gap-2
            "
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
          </button>

          <button
            type="button"
            onClick={() => autorank("homeRank", "showOnHome")}
            className="
              glass-border rounded-2xl bg-white/35
              px-4 py-3 text-sm font-semibold text-[#26292e]/75
              hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300
            "
            title="Пересчитать ранги для витрины (главная)"
          >
            Авторанг витрина
          </button>

          <button
            type="button"
            onClick={() => autorank("megaRank", "showInMega")}
            className="
              glass-border rounded-2xl bg-white/35
              px-4 py-3 text-sm font-semibold text-[#26292e]/75
              hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300
            "
            title="Пересчитать ранги для спецпредложения"
          >
            Авторанг спец
          </button>

          <button
            type="button"
            onClick={exportJson}
            className="glass-border rounded-2xl bg-[#c6cf13] px-4 py-3 text-sm font-semibold text-[#26292e] hover:opacity-90 transition"
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
            className="
              glass-border rounded-2xl bg-white/35
              px-4 py-3 text-sm font-semibold text-[#26292e]/75
              hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300
              inline-flex items-center gap-2
            "
            title="Скопировать JSON"
          >
            <Copy className="h-4 w-4" />
            Копировать
          </button>

          <button
            type="button"
            onClick={resetToRepo}
            className="
              glass-border rounded-2xl bg-white/35
              px-4 py-3 text-sm font-semibold text-[#26292e]/60
              hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300
              inline-flex items-center gap-2
            "
            title="Сбросить к данным из репозитория"
          >
            <RefreshCcw className="h-4 w-4" />
            Сброс
          </button>
        </div>
      </div>

      {/* Массовые действия */}
      {selectedCount > 0 ? (
        <div className="glass-border rounded-3xl bg-white/35 px-4 py-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-[#26292e]/70">
            Выбрано: <span className="text-[#26292e] font-semibold">{selectedCount}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={selectAllVisible}
              className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/75 hover:bg-white/55 transition-colors duration-300"
            >
              Выбрать все (по текущему поиску)
            </button>

            <button
              type="button"
              onClick={() => setFlagForSelected("showOnHome", true)}
              className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/75 hover:bg-white/55 transition-colors duration-300"
            >
              На главную: включить
            </button>

            <button
              type="button"
              onClick={() => setFlagForSelected("showOnHome", false)}
              className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/75 hover:bg-white/55 transition-colors duration-300"
            >
              На главную: выключить
            </button>

            <button
              type="button"
              onClick={() => setFlagForSelected("showInMega", true)}
              className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/75 hover:bg-white/55 transition-colors duration-300"
            >
              Спец: включить
            </button>

            <button
              type="button"
              onClick={() => setFlagForSelected("showInMega", false)}
              className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/75 hover:bg-white/55 transition-colors duration-300"
            >
              Спец: выключить
            </button>

            <button
              type="button"
              onClick={clearSelection}
              className="glass-border rounded-2xl bg-white/35 px-3 py-2 text-sm font-semibold text-[#26292e]/60 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            >
              Снять выбор
            </button>
          </div>
        </div>
      ) : null}

      {/* Таблица */}
      <div className="glass-border rounded-3xl bg-white/35 overflow-hidden">
        {/* Заголовок таблицы */}
        <div className="px-4 py-3 bg-white/30 border-b border-dark/10">
          <div className="grid grid-cols-[44px_1fr_170px_240px_240px_52px] items-center gap-4 text-[14px] text-[#26292e]/60">
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                aria-label="Выбрать все"
                checked={filtered.length > 0 && filtered.every((p) => selected.has(p.id))}
                onChange={() => {
                  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));
                  if (allSelected) clearSelection();
                  else selectAllVisible();
                }}
                className="h-4 w-4"
              />
            </div>
            <div>Товар</div>
            <div>Цена</div>
            <div>Витрина (главная)</div>
            <div>Спецпредложение</div>
            <div className="text-right"> </div>
          </div>
        </div>

        {/* Строки */}
        <div className="divide-y divide-dark/10">
          {filtered.map((p) => {
            const isSel = selected.has(p.id);

            return (
              <div key={p.id} className="px-4 py-4 bg-white/20 hover:bg-white/30 transition-colors duration-300">
                <div className="grid grid-cols-[44px_1fr_170px_240px_240px_52px] items-center gap-4">
                  {/* Чекбокс */}
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isSel}
                      onChange={() => toggleSelect(p.id)}
                      aria-label={`Выбрать ${p.title}`}
                      className="h-4 w-4"
                    />
                  </div>

                  {/* Товар */}
                  <div className="min-w-0 flex items-center gap-4">
                    <div className="glass-border rounded-2xl bg-white/40 relative h-14 w-14 overflow-hidden flex-none">
                      <Image
                        src={withBasePath(p.imageSrc)}
                        alt={p.title}
                        fill
                        sizes="56px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[14px] text-[#26292e] font-semibold truncate">
                        {p.brand}
                      </div>
                      <div className="text-[14px] text-[#26292e]/65 truncate">
                        {p.title}
                      </div>
                      <div className="text-[12px] text-[#26292e]/35 mt-1">
                        id: {p.id}
                      </div>
                    </div>
                  </div>

                  {/* Цена */}
                  <div>
                    <div className="glass-border rounded-2xl bg-white/55 h-12 px-3 flex items-center">
                      <input
                        value={String(p.priceRub ?? 0)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPrice(p.id, e.target.value)
                        }
                        inputMode="numeric"
                        className="w-full bg-transparent outline-none text-sm text-[#26292e]"
                        aria-label="Цена"
                      />
                    </div>
                    <div className="mt-1 text-[12px] text-[#26292e]/45">
                      {formatRub(p.priceRub ?? 0)}
                    </div>
                  </div>

                  {/* Витрина */}
                  <div className="flex items-center gap-3">
                    <RowToggle
                      active={Boolean(p.showOnHome)}
                      onClick={() => toggleFlag(p.id, "showOnHome")}
                      label="На главной"
                      accentClass="bg-[#9caf88] text-[#26292e]"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#26292e]/45">rank</span>
                      <input
                        value={p.homeRank ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setRank(p.id, "homeRank", e.target.value)
                        }
                        className="glass-border rounded-xl bg-white/55 h-10 w-[92px] px-3 text-sm outline-none text-[#26292e]"
                        inputMode="numeric"
                        placeholder="10"
                        aria-label="homeRank"
                      />
                    </div>
                  </div>

                  {/* Спец */}
                  <div className="flex items-center gap-3">
                    <RowToggle
                      active={Boolean(p.showInMega)}
                      onClick={() => toggleFlag(p.id, "showInMega")}
                      label="Спец"
                      accentClass="bg-[#c6cf13] text-[#26292e]"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#26292e]/45">rank</span>
                      <input
                        value={p.megaRank ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setRank(p.id, "megaRank", e.target.value)
                        }
                        className="glass-border rounded-xl bg-white/55 h-10 w-[92px] px-3 text-sm outline-none text-[#26292e]"
                        inputMode="numeric"
                        placeholder="10"
                        aria-label="megaRank"
                      />
                    </div>
                  </div>

                  {/* Действия */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => alert("Меню действий добавим следующим шагом.")}
                      className="glass-border rounded-2xl bg-white/45 h-12 w-12 inline-flex items-center justify-center text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/60 transition-colors duration-300"
                      aria-label="Действия"
                      title="Действия"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {!filtered.length ? (
            <div className="p-6 text-sm text-[#26292e]/60">
              Ничего не найдено.
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-sm text-[#26292e]/55">
        Чтобы витрина на главной обновилась на сайте: скачай products.json и замени файл{" "}
        <span className="text-[#26292e] font-semibold">apps/web/data/products.json</span>, потом commit/push.
      </div>
    </div>
  );
}
