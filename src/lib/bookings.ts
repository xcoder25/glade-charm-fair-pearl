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

const PAGE_SIZE = 50;

const createSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(32),
  email: z.string().trim().max(120).default(""),
  session: z.enum(BOOKING_SESSIONS),
  note: z.string().trim().max(2000).default(""),
});

const listSchema = z.object({
  q: z.string().trim().max(80).optional().default(""),
  session: z.string().optional().default("all"),
  status: z.string().optional().default("all"),
  sort: z.enum(["newest", "oldest", "name", "status"]).optional().default("newest"),
  page: z.number().int().min(1).optional().default(1),
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

async function requireAdmin(userId: string) {
  const sql = await getSql();
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
        : data.sort === "status"
          ? "status asc, created_at desc"
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

export const listBookings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => listSchema.parse(data ?? {}))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const { whereSql, params, order } = buildFilter(data);
    const countRows = await sql.query<{ n: number }>(
      `select count(*)::int as n from bookings where ${whereSql}`,
      params,
    );
    const total = countRows[0]?.n ?? 0;
    const offset = (data.page - 1) * PAGE_SIZE;
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
       limit ${PAGE_SIZE} offset ${offset}`,
      params,
    );
    return {
      rows: rows.map(mapRow),
      total,
      page: data.page,
      pageSize: PAGE_SIZE,
      pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
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

export const exportBookingsCsv = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => listSchema.omit({ page: true }).parse(data ?? {}))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const { whereSql, params, order } = buildFilter({ ...data, page: 1 });
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
    const header = ["id", "name", "phone", "email", "session", "note", "status", "created_at", "updated_at"];
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
