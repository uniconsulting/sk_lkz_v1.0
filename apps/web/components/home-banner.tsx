"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  src: string; // например "/banners/01.png"
  alt?: string;
  href?: string;
};

const DEFAULT_SLIDES: Slide[] = Array.from({ length: 6 }).map((_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `/banners/${n}.png`, alt: `Баннер ${n}` };
});

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  if (normalized.startsWith(`${base}/`)) return normalized;
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
  const count = slides.length;

  const go = React.useCallback(
    (dir: -1 | 1) => {
      if (count <= 1) return;
      setActive((i) => (i + dir + count) % count);
    },
    [count]
  );

  React.useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  if (!count) return null;

  return (
    <div className="w-full">
      {/* Рамка баннера */}
      <div className="relative rounded-3xl glass-border overflow-hidden">
        {/* Слайды */}
        <div className="relative h-[260px] sm:h-[320px] lg:h-[400px]">
          {slides.map((s, idx) => {
            const isActive = idx === active;
            const src = withBasePath(s.src);

            const img = (
              <Image
                key={src}
                src={src}
                alt={s.alt ?? ""}
                fill
                priority={idx === 0}
                className={[
                  "object-cover",
                  "transition-opacity duration-700 ease-out",
                  isActive ? "opacity-100" : "opacity-0",
                ].join(" ")}
                sizes="(min-width: 1024px) 1100px, (min-width: 640px) 900px, 100vw"
              />
            );

            return (
              <div key={`${src}-${idx}`} className="absolute inset-0">
                {s.href ? (
                  <a href={s.href} aria-label={s.alt ?? "Открыть баннер"} className="block h-full w-full">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>

        {/* Выемка слева */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущий баннер"
              className={[
                "absolute left-0 top-1/2 -translate-y-1/2",
                "h-24 w-12 sm:h-28 sm:w-14",
                "bg-bg/90 backdrop-blur-md",
                "border border-dark/10 dark:border-white/10",
                "rounded-r-full",
                "flex items-center justify-center",
                "hover:bg-bg/95 transition",
              ].join(" ")}
            >
              <ChevronLeft className="h-6 w-6 text-dark/70 dark:text-white/70" />
            </button>

            {/* Выемка справа */}
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующий баннер"
              className={[
                "absolute right-0 top-1/2 -translate-y-1/2",
                "h-24 w-12 sm:h-28 sm:w-14",
                "bg-bg/90 backdrop-blur-md",
                "border border-dark/10 dark:border-white/10",
                "rounded-l-full",
                "flex items-center justify-center",
                "hover:bg-bg/95 transition",
              ].join(" ")}
            >
              <ChevronRight className="h-6 w-6 text-dark/70 dark:text-white/70" />
            </button>
          </>
        )}
      </div>

      {/* Точки под баннером */}
      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((_, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Баннер ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  "transition",
                  isActive ? "bg-accent2" : "bg-dark/20 dark:bg-white/20",
                ].join(" ")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
