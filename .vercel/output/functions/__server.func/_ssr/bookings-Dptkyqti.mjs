import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as BOOKING_SESSIONS, r as BOOKING_STATUSES, u as authMiddleware } from "./contact-DVXKDbBo.mjs";
import { a as _enum, h as object, m as number, v as string } from "../_libs/zod.mjs";
import { r as getSql } from "./db-HNnKphOW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-Dptkyqti.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var PAGE_SIZE = 50;
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
function mapRow(row) {
	return {
		id: row.id,
		name: row.name,
		phone: row.phone,
		email: row.email,
		session: row.session,
		note: row.note,
		status: row.status,
		createdAt: typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString(),
		updatedAt: typeof row.updated_at === "string" ? row.updated_at : row.updated_at.toISOString()
	};
}
async function requireAdmin(userId) {
	const sql = await getSql();
	await sql`
    insert into admins (user_id)
    select ${userId}
    where not exists (select 1 from admins)
    on conflict (user_id) do nothing
  `;
	if (!(await sql`
    select user_id from admins where user_id = ${userId}
  `).length) {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
}
function sanitizeLike(q) {
	return q.replace(/[%_\\]/g, "");
}
function buildFilter(data) {
	const where = ["1=1"];
	const params = [];
	const q = sanitizeLike(data.q ?? "");
	if (q) {
		params.push(`%${q}%`);
		const i = params.length;
		where.push(`(name ilike $${i} or phone ilike $${i} or email ilike $${i} or note ilike $${i} or session ilike $${i})`);
	}
	if (data.session && data.session !== "all") {
		params.push(data.session);
		where.push(`session = $${params.length}`);
	}
	if (data.status && data.status !== "all" && BOOKING_STATUSES.includes(data.status)) {
		params.push(data.status);
		where.push(`status = $${params.length}`);
	}
	const order = data.sort === "oldest" ? "created_at asc" : data.sort === "name" ? "name asc" : data.sort === "status" ? "status asc, created_at desc" : "created_at desc";
	return {
		whereSql: where.join(" and "),
		params,
		order
	};
}
var createBooking_createServerFn_handler = createServerRpc({
	id: "98d718cc96486a19218ab540e4ff180a1c069dda9e6a933998823510dce56374",
	name: "createBooking",
	filename: "src/lib/bookings.ts"
}, (opts) => createBooking.__executeServer(opts));
var createBooking = createServerFn({ method: "POST" }).validator((data) => createSchema.parse(data)).handler(createBooking_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const id = crypto.randomUUID();
	const email = data.email && data.email.includes("@") ? data.email : "";
	await sql`
      insert into bookings (id, name, phone, email, session, note, status)
      values (${id}, ${data.name}, ${data.phone}, ${email}, ${data.session}, ${data.note}, 'new')
    `;
	return { id };
});
var claimAdmin_createServerFn_handler = createServerRpc({
	id: "ebbaa47ec74265ba47bc814c3a2bfe4e942efed8e9bd76fe6ca0bc527fb99631",
	name: "claimAdmin",
	filename: "src/lib/bookings.ts"
}, (opts) => claimAdmin.__executeServer(opts));
var claimAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(claimAdmin_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return {
		ok: true,
		userId: context.userId
	};
});
var listBookings_createServerFn_handler = createServerRpc({
	id: "54b6453433198a563743971e16034b746511d5dc21fe57a6f464d70b6488cca7",
	name: "listBookings",
	filename: "src/lib/bookings.ts"
}, (opts) => listBookings.__executeServer(opts));
var listBookings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.parse(data ?? {})).handler(listBookings_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const { whereSql, params, order } = buildFilter(data);
	const total = (await sql.query(`select count(*)::int as n from bookings where ${whereSql}`, params))[0]?.n ?? 0;
	const offset = (data.page - 1) * PAGE_SIZE;
	return {
		rows: (await sql.query(`select id, name, phone, email, session, note, status, created_at, updated_at
       from bookings
       where ${whereSql}
       order by ${order}
       limit ${PAGE_SIZE} offset ${offset}`, params)).map(mapRow),
		total,
		page: data.page,
		pageSize: PAGE_SIZE,
		pages: Math.max(1, Math.ceil(total / PAGE_SIZE))
	};
});
var setBookingStatus_createServerFn_handler = createServerRpc({
	id: "2c8729413fa4967fdb47267e50bc193f02c829fa8500fe73b36f1493bf022d8d",
	name: "setBookingStatus",
	filename: "src/lib/bookings.ts"
}, (opts) => setBookingStatus.__executeServer(opts));
var setBookingStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => statusSchema.parse(data)).handler(setBookingStatus_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	await (await getSql())`
      update bookings
      set status = ${data.status}, updated_at = now()
      where id = ${data.id}
    `;
	return { ok: true };
});
var exportBookingsCsv_createServerFn_handler = createServerRpc({
	id: "8a860d2acb5e0b58781edbd0258e2f798a46eaa1506e5243c46af1c325d4464b",
	name: "exportBookingsCsv",
	filename: "src/lib/bookings.ts"
}, (opts) => exportBookingsCsv.__executeServer(opts));
var exportBookingsCsv = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.omit({ page: true }).parse(data ?? {})).handler(exportBookingsCsv_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const { whereSql, params, order } = buildFilter({
		...data,
		page: 1
	});
	const rows = await sql.query(`select id, name, phone, email, session, note, status, created_at, updated_at
       from bookings
       where ${whereSql}
       order by ${order}
       limit 10000`, params);
	const header = [
		"id",
		"name",
		"phone",
		"email",
		"session",
		"note",
		"status",
		"created_at",
		"updated_at"
	];
	const escape = (v) => `"${v.replace(/"/g, "\"\"")}"`;
	return {
		csv: [header.join(","), ...rows.map((r) => [
			r.id,
			r.name,
			r.phone,
			r.email,
			r.session,
			r.note,
			r.status,
			typeof r.created_at === "string" ? r.created_at : r.created_at.toISOString(),
			typeof r.updated_at === "string" ? r.updated_at : r.updated_at.toISOString()
		].map((c) => escape(String(c ?? ""))).join(","))].join("\n"),
		count: rows.length
	};
});
//#endregion
export { claimAdmin_createServerFn_handler, createBooking_createServerFn_handler, exportBookingsCsv_createServerFn_handler, listBookings_createServerFn_handler, setBookingStatus_createServerFn_handler };
