"use client";

import React from "react";
import Image from "next/image";

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

  React.useEffect(() => {
    if (total < 2) return;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [next, intervalMs, total]);

  return (
    <div className="relative">
      {/* Обычная рамка баннера, без выемок */}
      <div className="glass-border rounded-3xl overflow-hidden relative h-[360px]">
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

      {/* Точки: под баннером */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`Слайд ${idx + 1}`}
            className={
              "h-2 w-2 rounded-full transition " +
              (idx === active ? "bg-accent1" : "bg-dark/15")
            }
          />
        ))}
      </div>
    </div>
  );
}
