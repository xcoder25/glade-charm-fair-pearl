export const BOOKINGS_LEAD = "To Ani Chigoziem";

export const PHONE_PRIMARY_E164 = "2347088841879";
export const PHONE_PRIMARY_TEL = "+2347088841879";
export const PHONE_PRIMARY_DISPLAY = "+2347088841879";
export const PHONE_PRIMARY_FORMATTED = "+234 708 884 1879";

export const PHONE_ALT_TEL = "+2348153511177";
export const PHONE_ALT_DISPLAY = "+234 815 351 1177";

export const WHATSAPP_URL = `https://wa.me/${PHONE_PRIMARY_E164}`;

export const CONTACT_EMAIL = "manueljack929@gmail.com";

export const BOOKING_SESSIONS = [
  "1:1 coaching",
  "Raw power session",
  "Brand / appearance",
  "Group training",
] as const;

export type BookingSession = (typeof BOOKING_SESSIONS)[number];

export const BOOKING_STATUSES = ["new", "contacted", "archived"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export function whatsappUrlWithText(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export function whatsappUrlForNumber(phone: string, text?: string) {
  const cleaned = phone.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${cleaned}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
