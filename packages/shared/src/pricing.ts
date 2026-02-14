export type PurchaseMode = 'retail' | 'business';
export type BusinessTier = 'small' | 'large';

export type ProductPrices = {
  retail: number;
  smallWholesale: number;
  largeWholesale: number;
};

export type ResolvePriceInput = {
  prices: ProductPrices;
  mode: PurchaseMode;
  tier?: BusinessTier;
  promoDiscountPercent?: number;
};

function toSafePrice(value: number): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, value);
}

export function applyPromoDiscount(price: number, promoDiscountPercent = 0): number {
  const safePrice = toSafePrice(price);
  const safeDiscount = Number.isFinite(promoDiscountPercent)
    ? Math.max(0, Math.min(100, promoDiscountPercent))
    : 0;

  return Number((safePrice * (1 - safeDiscount / 100)).toFixed(2));
}

export function selectBasePrice(prices: ProductPrices, mode: PurchaseMode, tier: BusinessTier = 'small'): number {
  if (mode === 'retail') {
    return toSafePrice(prices.retail);
  }

  return tier === 'large' ? toSafePrice(prices.largeWholesale) : toSafePrice(prices.smallWholesale);
}

export function resolveUnitPrice(input: ResolvePriceInput): number {
  const basePrice = selectBasePrice(input.prices, input.mode, input.tier);
  return applyPromoDiscount(basePrice, input.promoDiscountPercent ?? 0);
}
