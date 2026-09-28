import { r as getSql } from "./db-AZrP0rLX.mjs";
import { a as _enum, h as object, m as number, v as string } from "../_libs/zod.mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as BOOKING_SESSIONS, r as BOOKING_STATUSES, u as authMiddleware } from "./contact-B9SGFRve.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-e7B3pJcF.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
	const order = data.sort === "oldest" ? "created_at asc" : data.sort === "name" ? "name asc" : data.sort === "name_desc" ? "name desc" : data.sort === "status" ? "case status when 'new' then 1 when 'contacted' then 2 when 'archived' then 3 else 4 end asc, created_at desc" : "created_at desc";
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
var checkAdminSetup_createServerFn_handler = createServerRpc({
	id: "ee154163f8001bedf12461bead04681cd59310f4a8ca9822842fdd349c05c98d",
	name: "checkAdminSetup",
	filename: "src/lib/bookings.ts"
}, (opts) => checkAdminSetup.__executeServer(opts));
var checkAdminSetup = createServerFn({ method: "GET" }).handler(checkAdminSetup_createServerFn_handler, async () => {
	return { hasAdmin: ((await (await getSql())`
      select count(*)::int as count from admins
    `)[0]?.count ?? 0) > 0 };
});
var getBookingStats_createServerFn_handler = createServerRpc({
	id: "2420e1ed2ad46dfcd1fd22776a423176e316232cd51645fc300c86d7cb753214",
	name: "getBookingStats",
	filename: "src/lib/bookings.ts"
}, (opts) => getBookingStats.__executeServer(opts));
var getBookingStats = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(getBookingStats_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	const r = (await (await getSql())`
      select
        count(*)::int as total,
        count(*) filter (where status = 'new')::int as new_count,
        count(*) filter (where status = 'contacted')::int as contacted_count,
        count(*) filter (where status = 'archived')::int as archived_count
      from bookings
    `)[0] ?? {
		total: 0,
		new_count: 0,
		contacted_count: 0,
		archived_count: 0
	};
	return {
		total: r.total,
		newCount: r.new_count,
		contactedCount: r.contacted_count,
		archivedCount: r.archived_count
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
	const pageSize = data.pageSize ?? 50;
	const { whereSql, params, order } = buildFilter(data);
	const total = (await sql.query(`select count(*)::int as n from bookings where ${whereSql}`, params))[0]?.n ?? 0;
	const offset = (data.page - 1) * pageSize;
	return {
		rows: (await sql.query(`select id, name, phone, email, session, note, status, created_at, updated_at
       from bookings
       where ${whereSql}
       order by ${order}
       limit ${pageSize} offset ${offset}`, params)).map(mapRow),
		total,
		page: data.page,
		pageSize,
		pages: Math.max(1, Math.ceil(total / pageSize))
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
var deleteBooking_createServerFn_handler = createServerRpc({
	id: "d67ca858695ccf01c8e2fdf66ec2a6a84005ff53bacae7b2a7dd099a49a6c6bc",
	name: "deleteBooking",
	filename: "src/lib/bookings.ts"
}, (opts) => deleteBooking.__executeServer(opts));
var deleteBooking = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => object({ id: string().min(1) }).parse(data)).handler(deleteBooking_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	await (await getSql())`delete from bookings where id = ${data.id}`;
	return { ok: true };
});
var exportBookingsCsv_createServerFn_handler = createServerRpc({
	id: "8a860d2acb5e0b58781edbd0258e2f798a46eaa1506e5243c46af1c325d4464b",
	name: "exportBookingsCsv",
	filename: "src/lib/bookings.ts"
}, (opts) => exportBookingsCsv.__executeServer(opts));
var exportBookingsCsv = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => listSchema.omit({
	page: true,
	pageSize: true
}).parse(data ?? {})).handler(exportBookingsCsv_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const { whereSql, params, order } = buildFilter({
		...data,
		page: 1,
		pageSize: 1e4
	});
	const rows = await sql.query(`select id, name, phone, email, session, note, status, created_at, updated_at
       from bookings
       where ${whereSql}
       order by ${order}
       limit 10000`, params);
	const header = [
		"ID",
		"Client Name",
		"Phone",
		"Email",
		"Session Type",
		"Brief / Goal",
		"Status",
		"Submitted At",
		"Updated At"
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
var seedSampleBookings_createServerFn_handler = createServerRpc({
	id: "0e79a541c8326b77a034536a8443842eef83c02963a60cb7a2fcb3e697fb2bbd",
	name: "seedSampleBookings",
	filename: "src/lib/bookings.ts"
}, (opts) => seedSampleBookings.__executeServer(opts));
var seedSampleBookings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => object({ count: number().int().min(1).max(300).optional().default(50) }).parse(data ?? {})).handler(seedSampleBookings_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const sampleFirstNames = [
		"Chukwuemeka",
		"Olumide",
		"Ngozi",
		"Adebayo",
		"Fatima",
		"Emeka",
		"Kehinde",
		"Zainab",
		"Chidinma",
		"Babatunde",
		"Ifeoma",
		"Tunde",
		"Amaka",
		"Damilola",
		"Somto",
		"Uche",
		"Folake",
		"Tari",
		"Kelechi",
		"Blessing",
		"Femi",
		"Halima",
		"Obinna",
		"Tiwa",
		"Segun"
	];
	const sampleLastNames = [
		"Okafor",
		"Adeyemi",
		"Eze",
		"Balogun",
		"Ibrahim",
		"Okeke",
		"Akinwale",
		"Danladi",
		"Nwosu",
		"Ogundele",
		"Okonkwo",
		"Bakare",
		"Alabi",
		"Oni",
		"Nnamdi"
	];
	const sampleNotes = [
		"Wants to build raw squat and deadlift power before December.",
		"Corporate executive looking for 6:00 AM strength training twice a week.",
		"Sports brand photoshoot and live powerlifting appearance in Victoria Island.",
		"4-week conditioning block for upcoming wedding and holiday trip.",
		"Group training inquiry for 6 gym colleagues on Saturdays.",
		"Powerlifting prep: bench press plateau at 120kg, need technical breakdown.",
		"Recovery and core strength after minor knee strain.",
		"Brand ambassador engagement for local supplement line launching in Ikeja.",
		"Beginner: never touched a barbell, wants disciplined coaching with zero fluff.",
		"Intensive 1:1 hypertrophy and raw power coaching on weekends."
	];
	const statuses = [
		"new",
		"contacted",
		"archived"
	];
	const sessions = BOOKING_SESSIONS;
	const countToSeed = data.count;
	for (let i = 0; i < countToSeed; i++) {
		const id = crypto.randomUUID();
		const fn = sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)];
		const ln = sampleLastNames[Math.floor(Math.random() * sampleLastNames.length)];
		const name = `${fn} ${ln}`;
		const phoneDigits = Math.floor(1e7 + Math.random() * 9e7);
		const phone = `${[
			"0803",
			"0708",
			"0815",
			"0902",
			"0818"
		][Math.floor(Math.random() * 5)]}${phoneDigits.toString().slice(0, 7)}`;
		const email = Math.random() > .25 ? `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com` : "";
		const session = sessions[Math.floor(Math.random() * sessions.length)];
		const note = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		const daysAgo = Math.floor(Math.random() * 45);
		const createdAt = (/* @__PURE__ */ new Date(Date.now() - daysAgo * 864e5 - Math.random() * 864e5)).toISOString();
		await sql`
        insert into bookings (id, name, phone, email, session, note, status, created_at, updated_at)
        values (${id}, ${name}, ${phone}, ${email}, ${session}, ${note}, ${status}, ${createdAt}, ${createdAt})
      `;
	}
	return {
		ok: true,
		seeded: countToSeed
	};
});
//#endregion
export { checkAdminSetup_createServerFn_handler, claimAdmin_createServerFn_handler, createBooking_createServerFn_handler, deleteBooking_createServerFn_handler, exportBookingsCsv_createServerFn_handler, getBookingStats_createServerFn_handler, listBookings_createServerFn_handler, seedSampleBookings_createServerFn_handler, setBookingStatus_createServerFn_handler };
