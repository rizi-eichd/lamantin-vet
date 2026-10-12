import { handleBooking } from "@/lib/booking-handler";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleBooking(request, {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
    publicOrigin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    developmentOrigins:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:3000", "http://127.0.0.1:3000"]
        : undefined,
    limit: () => rateLimit(request),
    send: fetch,
  });
}
