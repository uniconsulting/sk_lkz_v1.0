"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string; href?: string };

const DEFAULT_SLIDES: Slide[] = [
  { src: "/banners/01.png", alt: "Баннер 1" },
  { src: "/banners/02.png", alt: "Баннер 2" },
  { src: "/banners/03.png", alt: "Баннер 3" },
  { src: "/banners/04.png", alt: "Баннер 4" },
  { src: "/banners/05.png", alt: "Баннер 5" },
  { src: "/banners/06.png", alt: "Баннер 6" },
];

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function HomeBanner({
  slides = DEFAULT_SLIDES,
  intervalMs = 10_000,
}: {
  slides?: Slide[];
  intervalMs?: number;
}) {
  const [active, setActive] = React.useState(0);
  const total = slides.length;

  const next = React.useCallback(() => {
    setActive((v) => (v + 1) % total);
  }, [total]);

  const prev = React.useCallback(() => {
    setActive((v) => (v - 1 + total) % total);
  }, [total]);

  React.useEffect(() => {
    if (total < 2) return;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [next, intervalMs, total]);

  // Радиус выемки. Важно: диаметр кнопки стрелки = 2 * --notch-r
  const notchR = 28; // px (если хочешь меньше выемки, ставь 24-26)

  return (
    <div className="relative">
      {/* Баннер: маска выемок + glass-border на одном элементе */}
      <div
        className="glass-border banner-notch rounded-3xl overflow-hidden relative h-[360px]"
        style={{ ["--notch-r" as unknown as string]: `${notchR}px` }}
      >
        {slides.map((s, idx) => (
          <Image
            key={s.src}
            src={withBasePath(s.src)}
            alt={s.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            priority={idx === 0}
            className={
              "object-cover transition-opacity duration-700 ease-out " +
              (idx === active ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </div>

      {/* Стрелки: центр в точке (0%, 50%) и (100%, 50%), без лишних обводок/теней */}
      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий баннер"
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                   inline-flex items-center justify-center
                   bg-bg text-fg/60 hover:text-fg transition-colors duration-500
                   focus:outline-none focus-visible:ring-0"
        style={{ width: notchR * 2, height: notchR * 2, borderRadius: 9999 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Следующий баннер"
        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10
                   inline-flex items-center justify-center
                   bg-bg text-fg/60 hover:text-fg transition-colors duration-500
                   focus:outline-none focus-visible:ring-0"
        style={{ width: notchR * 2, height: notchR * 2, borderRadius: 9999 }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Точки: под баннером */}
      {total > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((_, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Слайд ${idx + 1}`}
                aria-current={isActive ? "true" : "false"}
                className={
                  "rounded-full transition-colors duration-500 " +
                  (isActive ? "bg-accent1" : "bg-dark/15 hover:bg-dark/25")
                }
                style={{ width: 8, height: 8 }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
