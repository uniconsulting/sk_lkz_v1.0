export enum OrderStatus {
  Draft = 'draft',
  PendingPayment = 'pending_payment',
  Paid = 'paid',
  Processing = 'processing',
  Shipped = 'shipped',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export const orderStatusTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.Draft]: [OrderStatus.PendingPayment, OrderStatus.Cancelled],
  [OrderStatus.PendingPayment]: [OrderStatus.Paid, OrderStatus.Cancelled],
  [OrderStatus.Paid]: [OrderStatus.Processing, OrderStatus.Cancelled],
  [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
  [OrderStatus.Shipped]: [OrderStatus.Completed],
  [OrderStatus.Completed]: [],
  [OrderStatus.Cancelled]: [],
};

export function canTransitionOrderStatus(from: OrderStatus, to: OrderStatus): boolean {
  return orderStatusTransitions[from].includes(to);
}
