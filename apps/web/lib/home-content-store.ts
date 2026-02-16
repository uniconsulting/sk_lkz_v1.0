import raw from "../data/home-content.json";

export type MiniBanner = {
  id: string;
  src?: string;
  alt?: string;
  href?: string;
};

type HomeContentRaw = {
  miniBanners?: MiniBanner[];
  finalBannerSrc?: string;
};

const DATA: HomeContentRaw = raw as HomeContentRaw;

export function getHomeMiniBanners(limit = 4): MiniBanner[] {
  const list = Array.isArray(DATA.miniBanners) ? DATA.miniBanners : [];
  return list.slice(0, Math.max(0, limit));
}

export function getFinalBannerSrc(): string {
  return typeof DATA.finalBannerSrc === "string" && DATA.finalBannerSrc.trim()
    ? DATA.finalBannerSrc
    : "/banners/final.png";
}
