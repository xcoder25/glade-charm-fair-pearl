import { a as _enum, h as object, m as number, v as string } from "../_libs/zod.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as BOOKING_SESSIONS, r as BOOKING_STATUSES, u as authMiddleware } from "./contact-B9SGFRve.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-ys1UZuhp.js
var import_jsx_runtime = require_jsx_runtime();
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
	name: string().trim().min(2, "Name must be at least 2 characters").max(80),
	phone: string().trim().min(8, "Phone number is too short").max(32),
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
		"name_desc",
		"status"
	]).optional().default("newest"),
	page: number().int().min(1).optional().default(1),
	pageSize: number().int().min(5).max(500).optional().default(50)
});
var statusSchema = object({
	id: string().min(1),
	status: _enum(BOOKING_STATUSES)
});
var createBooking = createServerFn({ method: "POST" }).validator((data) => createSchema.parse(data)).handler(createSsrRpc("98d718cc96486a19218ab540e4ff180a1c069dda9e6a933998823510dce56374"));
var claimAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("ebbaa47ec74265ba47bc814c3a2bfe4e942efed8e9bd76fe6ca0bc527fb99631"));
var checkAdminSetup = createServerFn({ method: "GET" }).handler(createSsrRpc("ee154163f8001bedf12461bead04681cd59310f4a8ca9822842fdd349c05c98d"));
var getBookingStats = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("2420e1ed2ad46dfcd1fd22776a423176e316232cd51645fc300c86d7cb753214"));
var listBookings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.parse(data ?? {})).handler(createSsrRpc("54b6453433198a563743971e16034b746511d5dc21fe57a6f464d70b6488cca7"));
var setBookingStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => statusSchema.parse(data)).handler(createSsrRpc("2c8729413fa4967fdb47267e50bc193f02c829fa8500fe73b36f1493bf022d8d"));
var deleteBooking = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => object({ id: string().min(1) }).parse(data)).handler(createSsrRpc("d67ca858695ccf01c8e2fdf66ec2a6a84005ff53bacae7b2a7dd099a49a6c6bc"));
var exportBookingsCsv = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.omit({
	page: true,
	pageSize: true
}).parse(data ?? {})).handler(createSsrRpc("8a860d2acb5e0b58781edbd0258e2f798a46eaa1506e5243c46af1c325d4464b"));
var seedSampleBookings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => object({ count: number().int().min(1).max(300).optional().default(50) }).parse(data ?? {})).handler(createSsrRpc("0e79a541c8326b77a034536a8443842eef83c02963a60cb7a2fcb3e697fb2bbd"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-[opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			outline: "bg-transparent text-fg border border-border hover:bg-elevated hover:border-fg/40",
			ghost: "bg-transparent text-fg border border-border hover:bg-elevated",
			link: "bg-transparent text-fg underline-offset-4 hover:underline px-0"
		},
		size: {
			md: "h-11 px-5 text-sm rounded-md",
			lg: "h-12 px-6 text-sm rounded-md",
			sm: "h-9 px-3 text-xs rounded-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { createBooking as a, getBookingStats as c, setBookingStatus as d, cn as i, listBookings as l, checkAdminSetup as n, deleteBooking as o, claimAdmin as r, exportBookingsCsv as s, Button as t, seedSampleBookings as u };
