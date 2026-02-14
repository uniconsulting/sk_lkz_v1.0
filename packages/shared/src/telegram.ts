export type TelegramNotificationPayload = {
  chatId: string;
  message: string;
};

export async function sendTelegramNotification(
  payload: TelegramNotificationPayload,
): Promise<void> {
  if (!payload.chatId || !payload.message) {
    throw new Error('chatId and message are required');
  }
  console.info('[telegram.stub]', payload);
}
