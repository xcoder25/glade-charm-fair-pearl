import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as BOOKING_SESSIONS, r as BOOKING_STATUSES, u as authMiddleware } from "./contact-DVXKDbBo.mjs";
import { a as _enum, h as object, m as number, v as string } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-G5smzzt6.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createSchema = object({
	name: string().trim().min(2).max(80),
	phone: string().trim().min(8).max(32),
	email: string().trim().max(120).default(""),
	session: _enum(BOOKING_SESSIONS),
	note: string().trim().max(2e3).default("")
});
var listSchema = object({
	q: string().trim().max(80).optional().default(""),
	session: string().optional().default("all"),
	status: string().optional().default("all"),
	sort: _enum([
		"newest",
		"oldest",
		"name",
		"status"
	]).optional().default("newest"),
	page: number().int().min(1).optional().default(1)
});
var statusSchema = object({
	id: string().min(1),
	status: _enum(BOOKING_STATUSES)
});
var createBooking = createServerFn({ method: "POST" }).validator((data) => createSchema.parse(data)).handler(createSsrRpc("98d718cc96486a19218ab540e4ff180a1c069dda9e6a933998823510dce56374"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("ebbaa47ec74265ba47bc814c3a2bfe4e942efed8e9bd76fe6ca0bc527fb99631"));
var listBookings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.parse(data ?? {})).handler(createSsrRpc("54b6453433198a563743971e16034b746511d5dc21fe57a6f464d70b6488cca7"));
var setBookingStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => statusSchema.parse(data)).handler(createSsrRpc("2c8729413fa4967fdb47267e50bc193f02c829fa8500fe73b36f1493bf022d8d"));
var exportBookingsCsv = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.omit({ page: true }).parse(data ?? {})).handler(createSsrRpc("8a860d2acb5e0b58781edbd0258e2f798a46eaa1506e5243c46af1c325d4464b"));
//#endregion
export { setBookingStatus as i, exportBookingsCsv as n, listBookings as r, createBooking as t };
