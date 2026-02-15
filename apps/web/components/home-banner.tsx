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
  const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const base = rawBase.replace(/\/$/, ""); // без хвостового /
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (!base) return normalized;
  // если уже с basePath, не дублируем
  if (normalized.startsWith(base + "/")) return normalized;

  return `${base}${normalized}`;
}

export function HomeBanner({
  slides = DEFAULT_SLIDES,
  intervalMs = 10_000,
}: {
  slides?: Slide[];
  intervalMs?: number;
}) {
  const total = slides.length;
  const [active, setActive] = React.useState(0);

  const next = React.useCallback(() => {
    setActive((v) => (total ? (v + 1) % total : 0));
  }, [total]);

  const prev = React.useCallback(() => {
    setActive((v) => (total ? (v - 1 + total) % total : 0));
  }, [total]);

  React.useEffect(() => {
    if (total < 2) return;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [next, intervalMs, total]);

  if (!total) return null;

  const goTo = (idx: number) => setActive(idx);

  return (
    <div className="relative">
      {/* Баннер: маска выемок + тот же контейнер, что и glass-border */}
      <div
        className="glass-border banner-notch rounded-3xl overflow-hidden relative h-[360px]"
        style={
          {
            // можешь тут быстро подкручивать размер выемок, не лезя в global.css
            // (если нужно уменьшить — ставь 24-26px)
            // "--notch-r": "28px",
          } as React.CSSProperties
        }
      >
        {slides.map((s, idx) => {
          const img = (
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
          );

          // если позже захочешь кликабельные баннеры
          if (s.href && idx === active) {
            return (
              <a key={s.src} href={s.href} className="absolute inset-0 block">
                {img}
              </a>
            );
          }

          return img;
        })}
      </div>

      {/* Стрелки: просто иконки в области выемок.
          Без bg/теней, чтобы не было ощущения "кружка поверх баннера". */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущий баннер"
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2
                       h-14 w-14 rounded-full
                       inline-flex items-center justify-center
                       text-fg/70 hover:text-fg transition-colors
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1/30"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Следующий баннер"
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2
                       h-14 w-14 rounded-full
                       inline-flex items-center justify-center
                       text-fg/70 hover:text-fg transition-colors
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1/30"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      {/* Точки: под баннером */}
      {total > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Слайд ${idx + 1}`}
              className={
                "h-2.5 w-2.5 rounded-full transition-colors " +
                (idx === active ? "bg-accent1" : "bg-dark/15 hover:bg-dark/25")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
