import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-B9SGFRve.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-DEO5hdof.mjs");
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-Cshm7pu1.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var BOOKINGS_LEAD = "To Ani Chigoziem";
var PHONE_PRIMARY_E164 = "2347088841879";
var PHONE_PRIMARY_TEL = "+2347088841879";
var PHONE_PRIMARY_DISPLAY = "+2347088841879";
var PHONE_ALT_TEL = "+2348153511177";
var PHONE_ALT_DISPLAY = "+234 815 351 1177";
var WHATSAPP_URL = `https://wa.me/${PHONE_PRIMARY_E164}`;
var CONTACT_EMAIL = "manueljack929@gmail.com";
var BOOKING_SESSIONS = [
	"1:1 coaching",
	"Raw power session",
	"Brand / appearance",
	"Group training"
];
var BOOKING_STATUSES = [
	"new",
	"contacted",
	"archived"
];
function whatsappUrlWithText(text) {
	return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
function whatsappUrlForNumber(phone, text) {
	const base = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
	return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
//#endregion
export { PHONE_ALT_DISPLAY as a, PHONE_PRIMARY_TEL as c, whatsappUrlForNumber as d, whatsappUrlWithText as f, CONTACT_EMAIL as i, WHATSAPP_URL as l, BOOKING_SESSIONS as n, PHONE_ALT_TEL as o, BOOKING_STATUSES as r, PHONE_PRIMARY_DISPLAY as s, BOOKINGS_LEAD as t, authMiddleware as u };
