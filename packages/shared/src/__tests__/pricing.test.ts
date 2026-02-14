import { describe, expect, it } from 'vitest';
import { applyPromoDiscount, buildPriceTiers } from '../pricing';

describe('pricing', () => {
  it('applies promo discount correctly', () => {
    expect(applyPromoDiscount(1000, 10)).toBe(900);
  });

  it('builds three price tiers', () => {
    const tiers = buildPriceTiers(1000, 10);
    expect(tiers).toEqual({ retail: 900, wholesale: 828, partner: 792 });
  });
});
