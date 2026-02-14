export type PaymentRequest = {
  orderId: string;
  amount: number;
  currency: 'RUB';
};

export type PaymentResponse = {
  provider: string;
  transactionId: string;
  status: 'created';
};

export interface PaymentProvider {
  createPayment(input: PaymentRequest): Promise<PaymentResponse>;
}

export class StubPaymentProvider implements PaymentProvider {
  async createPayment(input: PaymentRequest): Promise<PaymentResponse> {
    return {
      provider: 'stub',
      transactionId: `stub_${input.orderId}`,
      status: 'created',
    };
  }
}
