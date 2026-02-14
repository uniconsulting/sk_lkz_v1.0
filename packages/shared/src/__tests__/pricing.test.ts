import { describe, expect, it } from 'vitest';
import { applyPromoDiscount, resolveUnitPrice } from '../pricing';

describe('pricing', () => {
  it('selects retail price for retail mode', () => {
    const price = resolveUnitPrice({
      prices: { retail: 1200, smallWholesale: 1100, largeWholesale: 950 },
      mode: 'retail',
    });

    expect(price).toBe(1200);
  });

  it('selects business tier and applies unified promo discount', () => {
    const price = resolveUnitPrice({
      prices: { retail: 1200, smallWholesale: 1100, largeWholesale: 950 },
      mode: 'business',
      tier: 'large',
      promoDiscountPercent: 10,
    });

    expect(price).toBe(855);
  });

  it('sanitizes invalid or negative values', () => {
    expect(applyPromoDiscount(-100, 15)).toBe(0);
    expect(resolveUnitPrice({
      prices: { retail: Number.NaN, smallWholesale: -10, largeWholesale: 500 },
      mode: 'business',
      tier: 'small',
    })).toBe(0);
  });
});
