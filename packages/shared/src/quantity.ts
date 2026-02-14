import type { BusinessTier } from './pricing';

export type QuantityRules = {
  minQty: number;
  step: number;
};

export type ProductQuantityConfig = {
  retail: QuantityRules;
  smallWholesale: QuantityRules;
  largeWholesale: QuantityRules;
};

function sanitizeRuleValue(value: number): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 1;
  }

  return Math.max(1, Math.floor(value));
}

export function normalizeQuantity(quantity: number, min = 1, step = 1): number {
  const safeMin = sanitizeRuleValue(min);
  const safeStep = sanitizeRuleValue(step);
  const safeQuantity = Number.isFinite(quantity) ? quantity : safeMin;

  if (safeQuantity <= safeMin) {
    return safeMin;
  }

  const delta = safeQuantity - safeMin;
  const stepsFromMin = Math.ceil(delta / safeStep);
  return safeMin + stepsFromMin * safeStep;
}

export function getWholesaleRules(config: ProductQuantityConfig, tier: BusinessTier): QuantityRules {
  return tier === 'large' ? config.largeWholesale : config.smallWholesale;
}

export function normalizeWholesaleQuantity(
  quantity: number,
  config: ProductQuantityConfig,
  tier: BusinessTier,
): number {
  const rules = getWholesaleRules(config, tier);
  return normalizeQuantity(quantity, rules.minQty, rules.step);
}
