export type PriceTier = {
  retail: number;
  wholesale: number;
  partner: number;
};

export function applyPromoDiscount(price: number, promoDiscountPercent: number): number {
  const discount = Math.max(0, Math.min(promoDiscountPercent, 100));
  return Number((price * (1 - discount / 100)).toFixed(2));
}

export function buildPriceTiers(basePrice: number, promoDiscountPercent: number): PriceTier {
  return {
    retail: applyPromoDiscount(basePrice, promoDiscountPercent),
    wholesale: applyPromoDiscount(basePrice * 0.92, promoDiscountPercent),
    partner: applyPromoDiscount(basePrice * 0.88, promoDiscountPercent),
  };
}
