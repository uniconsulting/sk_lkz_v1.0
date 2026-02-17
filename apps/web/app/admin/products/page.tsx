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
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
  Trash2,
  Tag,
  Package,
} from "lucide-react";

import {
  getAllProducts,
  type Product as StoreProduct,
} from "../../../lib/products-store";

type StockStatus = "in_stock" | "out_of_stock" | "hidden";

type DraftProduct = StoreProduct & {
  // доп. поля “мини-CRM” (пока локально, в JSON можно сохранить)
  category?: string;
  status?: StockStatus;
  wholesalePriceRub?: number;
};

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

    const cleaned = parsed.filter(isObject).map((o) => o as DraftProduct);
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

function articleFromId(id: string) {
  const m = id.match(/\d+/);
  return m?.[0] ? `Арт. ${m[0]}` : `ID: ${id}`;
}

function statusMeta(s: StockStatus) {
  if (s === "in_stock") {
    return { label: "В наличии", cls: "bg-[#9caf88]/25 text-[#26292e]" };
  }
  if (s === "out_of_stock") {
    return { label: "Нет в наличии", cls: "bg-dark/10 text-[#26292e]/70" };
  }
  return { label: "Скрыт", cls: "bg-dark/10 text-[#26292e]/60" };
}

function ModalFrame({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Закрыть"
      />
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div className="glass-border rounded-3xl bg-white/85 w-full max-w-[560px] p-6">
          <div className="text-[18px] font-semibold text-[#26292e]">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 text-sm text-[#26292e]/60">{subtitle}</div>
          ) : null}

          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const base = React.useMemo<DraftProduct[]>(
    () =>
      getAllProducts().map((p) => ({
        ...p,
        // дефолты, чтобы таблица выглядела “живой”
        status: (p as DraftProduct).status ?? "in_stock",
        category: (p as DraftProduct).category ?? "",
        wholesalePriceRub: (p as DraftProduct).wholesalePriceRub,
      })),
    [],
  );

  const [items, setItems] = React.useState<DraftProduct[]>(base);
  const [q, setQ] = React.useState<string>("");
  const [savedMark, setSavedMark] = React.useState<"idle" | "saved">("idle");

  // выбор строк
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  // модалки bulk
  const [priceModalOpen, setPriceModalOpen] = React.useState(false);
  const [bulkRetail, setBulkRetail] = React.useState<string>("");
  const [bulkWholesale, setBulkWholesale] = React.useState<string>("");

  const [statusModalOpen, setStatusModalOpen] = React.useState(false);
  const [bulkStatus, setBulkStatus] = React.useState<StockStatus>("in_stock");

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

  // чистим selected, если товары удалились/поменялись
  React.useEffect(() => {
    setSelected((prev) => {
      const ids = new Set(items.map((p) => p.id));
      const next = new Set<string>();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next;
    });
  }, [items]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;

    return items.filter((p) => {
      const hay = `${p.brand ?? ""} ${p.title ?? ""} ${p.id ?? ""} ${
        p.category ?? ""
      }`.toLowerCase();
      return hay.includes(needle);
    });
  }, [items, q]);

  const counts = React.useMemo(() => {
    const home = items.filter((p) => Boolean(p.showOnHome)).length;
    const mega = items.filter((p) => Boolean(p.showInMega)).length;
    return { total: items.length, home, mega };
  }, [items]);

  const filteredIds = React.useMemo(() => filtered.map((p) => p.id), [filtered]);

  const allFilteredSelected = React.useMemo(() => {
    if (!filteredIds.length) return false;
    return filteredIds.every((id) => selected.has(id));
  }, [filteredIds, selected]);

  const selectedCount = selected.size;

  function patch(id: string, next: Partial<DraftProduct>) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...next } : p)));
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAllFiltered() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filteredIds.forEach((id) => next.delete(id));
      } else {
        filteredIds.forEach((id) => next.add(id));
      }
      return next;
    });
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
        };
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
      const selectedItems = prev.filter((p) => Boolean(p[flag]));
      const selectedSorted = selectedItems
        .slice()
        .sort(
          (a, b) => normalizeRank(a[field], 999999) - normalizeRank(b[field], 999999),
        );

      const nextMap = new Map<string, number>();
      selectedSorted.forEach((p, idx) => nextMap.set(p.id, (idx + 1) * 10));

      return prev.map((p) => {
        if (!p[flag]) return p;
        return { ...p, [field]: nextMap.get(p.id) };
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

  function bulkApplyPrice() {
    const retailRaw = bulkRetail.trim();
    const wholesaleRaw = bulkWholesale.trim();

    const retail =
      retailRaw === "" ? null : Number.isFinite(Number(retailRaw)) ? Number(retailRaw) : null;

    const wholesale =
      wholesaleRaw === ""
        ? null
        : Number.isFinite(Number(wholesaleRaw))
          ? Number(wholesaleRaw)
          : null;

    if (retail === null && wholesale === null) {
      setPriceModalOpen(false);
      return;
    }

    setItems((prev) =>
      prev.map((p) => {
        if (!selected.has(p.id)) return p;
        return {
          ...p,
          priceRub: retail !== null ? retail : p.priceRub,
          wholesalePriceRub: wholesale !== null ? wholesale : p.wholesalePriceRub,
        };
      }),
    );

    setPriceModalOpen(false);
    setBulkRetail("");
    setBulkWholesale("");
  }

  function bulkApplyStatus() {
    setItems((prev) =>
      prev.map((p) => {
        if (!selected.has(p.id)) return p;
        return { ...p, status: bulkStatus };
      }),
    );
    setStatusModalOpen(false);
  }

  function bulkDelete() {
    const ok = window.confirm(`Удалить выбранные товары: ${selectedCount} шт.?`);
    if (!ok) return;

    setItems((prev) => prev.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  }

  return (
    <div>
      {/* Верх: заголовок + кнопка */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[28px] font-semibold text-[#26292e]">Товары</div>
          <div className="mt-1 text-sm text-[#26292e]/60">
            {counts.total} товаров
          </div>
        </div>

        <button
          type="button"
          className="glass-border rounded-2xl bg-[#c6cf13] h-12 px-4 inline-flex items-center gap-2 font-semibold text-[#26292e] hover:opacity-90 transition"
          onClick={() => alert("Добавление товаров подключим следующим шагом.")}
          title="Добавить товар"
        >
          <Plus className="h-5 w-5" />
          Добавить товар
        </button>
      </div>

      {/* Поиск + фильтры + служебные кнопки */}
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 w-full">
          <div className="glass-border rounded-2xl bg-white h-12 px-4 flex items-center gap-3 w-full">
            <Search className="h-5 w-5 text-[#9caf88]" />
            <input
              value={q}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
              placeholder="Поиск товаров..."
              className="w-full bg-transparent outline-none text-sm text-fg placeholder:text-fg/40"
            />
          </div>

          <button
            type="button"
            className="glass-border rounded-2xl bg-white/35 h-12 px-4 inline-flex items-center gap-2 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            onClick={() => alert("Фильтры подключим после полей category/status.")}
            title="Фильтры"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Фильтры
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => autorank("homeRank", "showOnHome")}
            className="glass-border rounded-2xl bg-white/35 h-12 px-4 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Авторанг для витрины"
          >
            Авторанг витрина
          </button>

          <button
            type="button"
            onClick={() => autorank("megaRank", "showInMega")}
            className="glass-border rounded-2xl bg-white/35 h-12 px-4 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Авторанг для спецпредложения"
          >
            Авторанг спец
          </button>

          <button
            type="button"
            onClick={exportJson}
            className="glass-border rounded-2xl bg-white/35 h-12 px-4 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Скачать products.json"
          >
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              JSON
            </span>
          </button>

          <button
            type="button"
            onClick={copyJson}
            className="glass-border rounded-2xl bg-white/35 h-12 px-4 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Скопировать JSON"
          >
            <span className="inline-flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </span>
          </button>

          <button
            type="button"
            onClick={resetToRepo}
            className="glass-border rounded-2xl bg-white/35 h-12 px-4 text-sm font-semibold text-[#26292e]/60 hover:text-[#26292e] hover:bg-white/55 transition-colors duration-300"
            title="Сбросить к данным из репозитория"
          >
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Сброс
            </span>
          </button>

          <div className="text-sm text-[#26292e]/50 flex items-center gap-2 pl-2">
            {savedMark === "saved" ? (
              <>
                <Check className="h-4 w-4 text-[#9caf88]" /> Сохранено (локально)
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bulk bar */}
      {selectedCount > 0 ? (
        <div className="mt-5 glass-border rounded-3xl bg-white/35 px-4 py-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-[#26292e]/70">
            Выбрано: <b className="text-[#26292e]">{selectedCount}</b>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="glass-border rounded-2xl bg-white/55 h-11 px-4 text-sm font-semibold text-[#26292e]/80 hover:text-[#26292e] hover:bg-white/70 transition-colors duration-300"
              onClick={() => setPriceModalOpen(true)}
              title="Изменить цену"
            >
              Изменить цену
            </button>

            <button
              type="button"
              className="glass-border rounded-2xl bg-white/55 h-11 px-4 text-sm font-semibold text-[#26292e]/80 hover:text-[#26292e] hover:bg-white/70 transition-colors duration-300"
              onClick={() => setStatusModalOpen(true)}
              title="Изменить статус"
            >
              Изменить статус
            </button>

            <button
              type="button"
              className="glass-border rounded-2xl bg-[#26292e] h-11 px-4 text-sm font-semibold text-white hover:opacity-90 transition inline-flex items-center gap-2"
              onClick={bulkDelete}
              title="Удалить"
            >
              <Trash2 className="h-4 w-4" />
              Удалить
            </button>
          </div>
        </div>
      ) : null}

      {/* Таблица */}
      <div className="mt-5 glass-border rounded-3xl bg-white/35 overflow-hidden">
        {/* header row */}
        <div className="grid grid-cols-[52px_1.7fr_200px_180px_160px_56px] items-center px-4 h-14 border-b border-white/50 text-sm text-[#26292e]/70">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={toggleSelectAllFiltered}
              aria-label="Выбрать все"
              className="h-4 w-4"
            />
          </div>
          <div className="font-semibold text-[#26292e]/80">Товар</div>
          <div className="font-semibold text-[#26292e]/80">Цена</div>
          <div className="font-semibold text-[#26292e]/80">Категория</div>
          <div className="font-semibold text-[#26292e]/80">Статус</div>
          <div />
        </div>

        {/* body */}
        <div className="divide-y divide-white/40">
          {filtered.map((p) => {
            const isSel = selected.has(p.id);

            const status = (p.status ?? "in_stock") as StockStatus;
            const st = statusMeta(status);

            const categoryLabel = (p.category ?? "").trim() || "—";

            return (
              <div
                key={p.id}
                className={[
                  "grid grid-cols-[52px_1.7fr_200px_180px_160px_56px] items-center px-4 py-4",
                  isSel ? "bg-white/35" : "bg-transparent",
                ].join(" ")}
              >
                {/* чек */}
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isSel}
                    onChange={() => toggleSelect(p.id)}
                    aria-label={`Выбрать ${p.title}`}
                    className="h-4 w-4"
                  />
                </div>

                {/* товар */}
                <div className="min-w-0 flex items-center gap-4">
                  <div className="glass-border rounded-2xl bg-white/40 relative h-14 w-14 overflow-hidden shrink-0">
                    <Image
                      src={withBasePath(p.imageSrc)}
                      alt={p.title}
                      fill
                      sizes="56px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[16px] font-semibold text-[#26292e] truncate">
                      {p.title}
                    </div>
                    <div className="mt-1 text-sm text-[#26292e]/50">
                      {articleFromId(p.id)}
                    </div>

                    {/* настройки витрины/спец прямо в строке, аккуратно */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlag(p.id, "showOnHome")}
                        className={[
                          "glass-border rounded-full px-3 py-1 text-[13px] font-semibold transition-colors duration-300 inline-flex items-center gap-2",
                          p.showOnHome
                            ? "bg-[#9caf88]/35 text-[#26292e]"
                            : "bg-white/55 text-[#26292e]/60 hover:text-[#26292e] hover:bg-white/70",
                        ].join(" ")}
                        title="Показывать на главной в витрине 4x3"
                      >
                        <Home className="h-4 w-4" />
                        Витрина
                      </button>

                      {p.showOnHome ? (
                        <input
                          value={p.homeRank ?? ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setRank(p.id, "homeRank", e.target.value)
                          }
                          className="glass-border rounded-full bg-white/60 h-8 w-[92px] px-3 text-[13px] outline-none text-[#26292e]"
                          inputMode="numeric"
                          placeholder="rank"
                          title="homeRank"
                        />
                      ) : null}

                      <button
                        type="button"
                        onClick={() => toggleFlag(p.id, "showInMega")}
                        className={[
                          "glass-border rounded-full px-3 py-1 text-[13px] font-semibold transition-colors duration-300 inline-flex items-center gap-2",
                          p.showInMega
                            ? "bg-[#c6cf13]/55 text-[#26292e]"
                            : "bg-white/55 text-[#26292e]/60 hover:text-[#26292e] hover:bg-white/70",
                        ].join(" ")}
                        title="Показывать на главной в спецпредложении 4x2"
                      >
                        <BadgePercent className="h-4 w-4" />
                        Спец
                      </button>

                      {p.showInMega ? (
                        <input
                          value={p.megaRank ?? ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setRank(p.id, "megaRank", e.target.value)
                          }
                          className="glass-border rounded-full bg-white/60 h-8 w-[92px] px-3 text-[13px] outline-none text-[#26292e]"
                          inputMode="numeric"
                          placeholder="rank"
                          title="megaRank"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* цена */}
                <div>
                  <div className="text-[16px] font-semibold text-[#26292e]">
                    {formatRub(p.priceRub)}
                  </div>
                  <div className="mt-1 text-sm text-[#26292e]/55">
                    Опт:{" "}
                    {typeof p.wholesalePriceRub === "number"
                      ? formatRub(p.wholesalePriceRub)
                      : "—"}
                  </div>
                </div>

                {/* категория */}
                <div className="flex items-center">
                  <span
                    className={[
                      "glass-border rounded-full px-3 py-1 text-[13px] inline-flex items-center gap-2",
                      categoryLabel === "—"
                        ? "bg-white/55 text-[#26292e]/55"
                        : "bg-[#9caf88]/25 text-[#26292e]",
                    ].join(" ")}
                    title="Категория"
                  >
                    <Tag className="h-4 w-4" />
                    {categoryLabel}
                  </span>
                </div>

                {/* статус */}
                <div className="flex items-center">
                  <span
                    className={[
                      "glass-border rounded-full px-3 py-1 text-[13px] font-semibold",
                      st.cls,
                    ].join(" ")}
                    title="Статус"
                  >
                    {st.label}
                  </span>
                </div>

                {/* actions */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="glass-border rounded-2xl bg-white/55 h-10 w-10 inline-flex items-center justify-center text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/70 transition-colors duration-300"
                    onClick={() =>
                      alert(
                        "Меню действий подключим следующим шагом (редактирование товара / категория / статус).",
                      )
                    }
                    aria-label="Действия"
                    title="Действия"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}

          {!filtered.length ? (
            <div className="px-4 py-10 text-sm text-[#26292e]/60 flex items-center gap-3">
              <Package className="h-5 w-5 text-[#26292e]/40" />
              Ничего не найдено.
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8 text-sm text-[#26292e]/55">
        Чтобы витрина на главной обновилась на сайте: скачай products.json и замени файл{" "}
        <span className="text-[#26292e] font-semibold">apps/web/data/products.json</span>, потом
        commit/push.
      </div>

      {/* Модалка: bulk price */}
      {priceModalOpen ? (
        <ModalFrame
          title="Изменить цену"
          subtitle="Применится ко всем выбранным товарам. Можно заполнить только одно поле."
          onClose={() => setPriceModalOpen(false)}
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="glass-border rounded-2xl bg-white h-12 px-4 flex items-center gap-3">
              <input
                value={bulkRetail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBulkRetail(e.target.value)}
                placeholder="Розница (₽)"
                className="w-full bg-transparent outline-none text-sm text-[#26292e] placeholder:text-[#26292e]/50"
                inputMode="numeric"
              />
            </div>

            <div className="glass-border rounded-2xl bg-white h-12 px-4 flex items-center gap-3">
              <input
                value={bulkWholesale}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBulkWholesale(e.target.value)
                }
                placeholder="Опт (₽)"
                className="w-full bg-transparent outline-none text-sm text-[#26292e] placeholder:text-[#26292e]/50"
                inputMode="numeric"
              />
            </div>

            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPriceModalOpen(false)}
                className="glass-border rounded-2xl bg-white/55 h-11 px-4 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/70 transition-colors duration-300"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={bulkApplyPrice}
                className="glass-border rounded-2xl bg-[#c6cf13] h-11 px-4 text-sm font-semibold text-[#26292e] hover:opacity-90 transition"
              >
                Применить
              </button>
            </div>
          </div>
        </ModalFrame>
      ) : null}

      {/* Модалка: bulk status */}
      {statusModalOpen ? (
        <ModalFrame
          title="Изменить статус"
          subtitle="Применится ко всем выбранным товарам."
          onClose={() => setStatusModalOpen(false)}
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="glass-border rounded-2xl bg-white h-12 px-4 flex items-center">
              <select
                value={bulkStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setBulkStatus(e.target.value as StockStatus)
                }
                className="w-full bg-transparent outline-none text-sm text-[#26292e]"
              >
                <option value="in_stock">В наличии</option>
                <option value="out_of_stock">Нет в наличии</option>
                <option value="hidden">Скрыт</option>
              </select>
            </div>

            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setStatusModalOpen(false)}
                className="glass-border rounded-2xl bg-white/55 h-11 px-4 text-sm font-semibold text-[#26292e]/70 hover:text-[#26292e] hover:bg-white/70 transition-colors duration-300"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={bulkApplyStatus}
                className="glass-border rounded-2xl bg-[#c6cf13] h-11 px-4 text-sm font-semibold text-[#26292e] hover:opacity-90 transition"
              >
                Применить
              </button>
            </div>
          </div>
        </ModalFrame>
      ) : null}
    </div>
  );
}
