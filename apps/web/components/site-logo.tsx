import Link from "next/link";
import Image from "next/image";

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

export function SiteLogo() {
  return (
    <Image
      src="/logo1.png"
      alt="СИМБИРСКИЕ КРАСКИ"
      width={140}
      height={36}
      priority
      className="h-9 w-auto"
    />
  );
}
