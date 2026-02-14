export function normalizeQuantity(quantity: number, min = 1, step = 1): number {
  const safeMin = min > 0 ? min : 1;
  const safeStep = step > 0 ? step : 1;

  if (quantity <= safeMin) {
    return safeMin;
  }

  const stepsFromMin = Math.ceil((quantity - safeMin) / safeStep);
  return safeMin + stepsFromMin * safeStep;
}
