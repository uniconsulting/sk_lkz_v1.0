import { describe, expect, it } from 'vitest';
import { normalizeQuantity, normalizeWholesaleQuantity } from '../quantity';

describe('quantity', () => {
  it('returns minimum if quantity is lower than min', () => {
    expect(normalizeQuantity(1, 5, 2)).toBe(5);
  });

  it('rounds up to nearest step from min', () => {
    expect(normalizeQuantity(11, 5, 3)).toBe(11);
    expect(normalizeQuantity(12, 5, 3)).toBe(14);
  });

  it('uses tier specific wholesale min/step config', () => {
    const quantityConfig = {
      retail: { minQty: 1, step: 1 },
      smallWholesale: { minQty: 5, step: 5 },
      largeWholesale: { minQty: 20, step: 10 },
    };

    expect(normalizeWholesaleQuantity(8, quantityConfig, 'small')).toBe(10);
    expect(normalizeWholesaleQuantity(24, quantityConfig, 'large')).toBe(30);
  });
});
