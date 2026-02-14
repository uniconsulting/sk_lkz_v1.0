// apps/web/components/home-banner.tsx
"use client";

import * as React from "react";
import Image from "next/image";

type Slide = { src: string; alt: string; href?: string };

const DEFAULT_SLIDES: Slide[] = [
  { src: "/banners/01.png", alt: "Баннер 1" },
  { src: "/banners/02.png", alt: "Баннер 2" },
  { src: "/banners/03.png", alt: "Баннер 3" },
];

// для GitHub Pages (если используете NEXT_PUBLIC_BASE_PATH=/sk_lkz_v1.0)
function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function HomeBanner({
  slides = DEFAULT_SLIDES,
  intervalMs = 10_000,
  height = 400,
}: {
  slides?: Slide[];
  intervalMs?: number;
  height?: number;
}) {
  const safeSlides = slides?.length ? slides : DEFAULT_SLIDES;
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (safeSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % safeSlides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs]);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden glass-border"
      style={{ height }}
    >
      {safeSlides.map((s, idx) => {
        const isActive = idx === active;

        const layer = (
          <div
            key={s.src}
            className={[
              "absolute inset-0",
              "transition-opacity duration-700 ease-out",
              isActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden={!isActive}
          >
            <Image
              src={withBasePath(s.src)}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 1416px, 100vw"
              priority={idx === 0}
              className="object-cover"
            />
          </div>
        );

        return s.href ? (
          <a
            key={s.src}
            href={s.href}
            className="absolute inset-0"
            aria-label={s.alt}
          >
            {layer}
          </a>
        ) : (
          layer
        );
      })}

      {safeSlides.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Перейти к баннеру ${i + 1}`}
              className={[
                "h-2.5 w-2.5 rounded-full",
                "transition-all duration-300",
                i === active ? "bg-accent2" : "bg-dark/20",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
