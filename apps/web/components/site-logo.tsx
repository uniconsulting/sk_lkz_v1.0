import Image from "next/image";

export type SiteLogoProps = {
  /** Например "/logo1.png" или "/logo2.png" */
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBasePath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

export function SiteLogo({
  src = "/logo1.png",
  alt = "СИМБИРСКИЕ КРАСКИ",
  className = "h-9 w-auto",
  width = 140,
  height = 36,
  priority = true,
}: SiteLogoProps) {
  return (
    <Image
      src={withBasePath(src)}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      unoptimized
    />
  );
}
