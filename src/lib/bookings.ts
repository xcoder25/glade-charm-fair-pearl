import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  BOOKING_SESSIONS,
  BOOKING_STATUSES,
  type BookingStatus,
} from "@/lib/contact";

export type BookingRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  session: string;
  note: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

export type BookingStats = {
  total: number;
  newCount: number;
  contactedCount: number;
  archivedCount: number;
};

const createSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().trim().min(8, "Phone number is too short").max(32),
  email: z.string().trim().max(120).default(""),
  session: z.enum(BOOKING_SESSIONS),
  note: z.string().trim().max(2000).default(""),
});

const listSchema = z.object({
  q: z.string().trim().max(80).optional().default(""),
  session: z.string().optional().default("all"),
  status: z.string().optional().default("all"),
  sort: z.enum(["newest", "oldest", "name", "name_desc", "status"]).optional().default("newest"),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(5).max(500).optional().default(50),
});

const statusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(BOOKING_STATUSES),
});

function mapRow(row: {
  id: string;
  name: string;
  phone: string;
  email: string;
  session: string;
  note: string;
  status: string;
  created_at: string | Date;
  updated_at: string | Date;
}): BookingRow {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    session: row.session,
    note: row.note,
    status: row.status as BookingStatus,
    createdAt: typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString(),
    updatedAt: typeof row.updated_at === "string" ? row.updated_at : row.updated_at.toISOString(),
  };
}

export async function requireAdmin(userId: string) {
  const sql = await getSql();
  // First user claiming or accessing becomes admin
  await sql`
    insert into admins (user_id)
    select ${userId}
    where not exists (select 1 from admins)
    on conflict (user_id) do nothing
  `;
  const rows = await sql<{ user_id: string }>`
    select user_id from admins where user_id = ${userId}
  `;
  if (!rows.length) {
    const err = new Error("Forbidden");
    (err as Error & { status: number }).status = 403;
    throw err;
  }
}

function sanitizeLike(q: string) {
  return q.replace(/[%_\\]/g, "");
}

function buildFilter(data: z.infer<typeof listSchema>) {
  const where: string[] = ["1=1"];
  const params: unknown[] = [];
  const q = sanitizeLike(data.q ?? "");
  if (q) {
    params.push(`%${q}%`);
    const i = params.length;
    where.push(
      `(name ilike $${i} or phone ilike $${i} or email ilike $${i} or note ilike $${i} or session ilike $${i})`,
    );
  }
  if (data.session && data.session !== "all") {
    params.push(data.session);
    where.push(`session = $${params.length}`);
  }
  if (data.status && data.status !== "all" && (BOOKING_STATUSES as readonly string[]).includes(data.status)) {
    params.push(data.status);
    where.push(`status = $${params.length}`);
  }
  const order =
    data.sort === "oldest"
      ? "created_at asc"
      : data.sort === "name"
        ? "name asc"
        : data.sort === "name_desc"
          ? "name desc"
          : data.sort === "status"
            ? "case status when 'new' then 1 when 'contacted' then 2 when 'archived' then 3 else 4 end asc, created_at desc"
            : "created_at desc";
  return { whereSql: where.join(" and "), params, order };
}

export const createBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    const email = data.email && data.email.includes("@") ? data.email : "";
    await sql`
      insert into bookings (id, name, phone, email, session, note, status)
      values (${id}, ${data.name}, ${data.phone}, ${email}, ${data.session}, ${data.note}, 'new')
    `;
    return { id };
  });

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    return { ok: true as const, userId: context.userId };
  });

export const checkAdminSetup = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{ count: number }>`
      select count(*)::int as count from admins
    `;
    return { hasAdmin: (rows[0]?.count ?? 0) > 0 };
  });

export const getBookingStats = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      total: number;
      new_count: number;
      contacted_count: number;
      archived_count: number;
    }>`
      select
        count(*)::int as total,
        count(*) filter (where status = 'new')::int as new_count,
        count(*) filter (where status = 'contacted')::int as contacted_count,
        count(*) filter (where status = 'archived')::int as archived_count
      from bookings
    `;
    const r = rows[0] ?? { total: 0, new_count: 0, contacted_count: 0, archived_count: 0 };
    return {
      total: r.total,
      newCount: r.new_count,
      contactedCount: r.contacted_count,
      archivedCount: r.archived_count,
    };
  });

export const listBookings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => listSchema.parse(data ?? {}))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const pageSize = data.pageSize ?? 50;
    const { whereSql, params, order } = buildFilter(data);
    const countRows = await sql.query<{ n: number }>(
      `select count(*)::int as n from bookings where ${whereSql}`,
      params,
    );
    const total = countRows[0]?.n ?? 0;
    const offset = (data.page - 1) * pageSize;
    const rows = await sql.query<{
      id: string;
      name: string;
      phone: string;
      email: string;
      session: string;
      note: string;
      status: string;
      created_at: string | Date;
      updated_at: string | Date;
    }>(
      `select id, name, phone, email, session, note, status, created_at, updated_at
       from bookings
       where ${whereSql}
       order by ${order}
       limit ${pageSize} offset ${offset}`,
      params,
    );
    return {
      rows: rows.map(mapRow),
      total,
      page: data.page,
      pageSize,
      pages: Math.max(1, Math.ceil(total / pageSize)),
    };
  });

export const setBookingStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => statusSchema.parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`
      update bookings
      set status = ${data.status}, updated_at = now()
      where id = ${data.id}
    `;
    return { ok: true as const };
  });

export const deleteBooking = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => z.object({ id: z.string().min(1) }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`delete from bookings where id = ${data.id}`;
    return { ok: true as const };
  });

export const exportBookingsCsv = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => listSchema.omit({ page: true, pageSize: true }).parse(data ?? {}))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const { whereSql, params, order } = buildFilter({ ...data, page: 1, pageSize: 10000 });
    const rows = await sql.query<{
      id: string;
      name: string;
      phone: string;
      email: string;
      session: string;
      note: string;
      status: string;
      created_at: string | Date;
      updated_at: string | Date;
    }>(
      `select id, name, phone, email, session, note, status, created_at, updated_at
       from bookings
       where ${whereSql}
       order by ${order}
       limit 10000`,
      params,
    );
    const header = [
      "ID",
      "Client Name",
      "Phone",
      "Email",
      "Session Type",
      "Brief / Goal",
      "Status",
      "Submitted At",
      "Updated At",
    ];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.id,
          r.name,
          r.phone,
          r.email,
          r.session,
          r.note,
          r.status,
          typeof r.created_at === "string" ? r.created_at : r.created_at.toISOString(),
          typeof r.updated_at === "string" ? r.updated_at : r.updated_at.toISOString(),
        ]
          .map((c) => escape(String(c ?? "")))
          .join(","),
      ),
    ];
    return { csv: lines.join("\n"), count: rows.length };
  });

export const seedSampleBookings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => z.object({ count: z.number().int().min(1).max(300).optional().default(50) }).parse(data ?? {}))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();

    const sampleFirstNames = [
      "Chukwuemeka", "Olumide", "Ngozi", "Adebayo", "Fatima",
      "Emeka", "Kehinde", "Zainab", "Chidinma", "Babatunde",
      "Ifeoma", "Tunde", "Amaka", "Damilola", "Somto",
      "Uche", "Folake", "Tari", "Kelechi", "Blessing",
      "Femi", "Halima", "Obinna", "Tiwa", "Segun"
    ];
    const sampleLastNames = [
      "Okafor", "Adeyemi", "Eze", "Balogun", "Ibrahim",
      "Okeke", "Akinwale", "Danladi", "Nwosu", "Ogundele",
      "Okonkwo", "Bakare", "Alabi", "Oni", "Nnamdi"
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
    const statuses: BookingStatus[] = ["new", "contacted", "archived"];
    const sessions = BOOKING_SESSIONS;

    const countToSeed = data.count;
    for (let i = 0; i < countToSeed; i++) {
      const id = crypto.randomUUID();
      const fn = sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)];
      const ln = sampleLastNames[Math.floor(Math.random() * sampleLastNames.length)];
      const name = `${fn} ${ln}`;
      const phoneDigits = Math.floor(10000000 + Math.random() * 90000000);
      const prefix = ["0803", "0708", "0815", "0902", "0818"][Math.floor(Math.random() * 5)];
      const phone = `${prefix}${phoneDigits.toString().slice(0, 7)}`;
      const email = Math.random() > 0.25 ? `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com` : "";
      const session = sessions[Math.floor(Math.random() * sessions.length)];
      const note = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const daysAgo = Math.floor(Math.random() * 45);
      const createdAt = new Date(Date.now() - daysAgo * 86400000 - Math.random() * 86400000).toISOString();

      await sql`
        insert into bookings (id, name, phone, email, session, note, status, created_at, updated_at)
        values (${id}, ${name}, ${phone}, ${email}, ${session}, ${note}, ${status}, ${createdAt}, ${createdAt})
      `;
    }

    return { ok: true as const, seeded: countToSeed };
  });
