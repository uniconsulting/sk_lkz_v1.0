import Link from "next/link";

type SiteLogoProps = {
  /** По умолчанию для хедера */
  src?: string; // например "/logo1.png" или "/logo2.png"
  alt?: string;
  className?: string;
};

function withBasePath(path: string) {
  // Если у тебя на Pages есть basePath вида /sk_lkz_v1.0, добавь его в env как NEXT_PUBLIC_BASE_PATH
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function SiteLogo({
  src = "/logo1.png",
  alt = "Симбирские краски",
  className = "",
}: SiteLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label={alt}>
      <img
        src={withBasePath(src)}
        alt={alt}
        className="h-12 w-auto select-none"
        draggable={false}
      />
    </Link>
  );
}
