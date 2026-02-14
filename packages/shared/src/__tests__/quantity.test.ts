import { describe, expect, it } from 'vitest';
import { normalizeQuantity } from '../quantity';

describe('quantity', () => {
  it('normalizes quantity by min and step', () => {
    expect(normalizeQuantity(0, 2, 5)).toBe(2);
    expect(normalizeQuantity(7, 2, 5)).toBe(7);
    expect(normalizeQuantity(8, 2, 5)).toBe(12);
  });
});
