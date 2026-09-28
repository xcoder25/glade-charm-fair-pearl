import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  exportBookingsCsv,
  listBookings,
  setBookingStatus,
  type BookingRow,
} from "@/lib/bookings";
import { BOOKING_SESSIONS, BOOKING_STATUSES, type BookingStatus } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type SortKey = "newest" | "oldest" | "name" | "status";

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <main className="min-h-screen bg-bg px-4 py-20 text-fg">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-48 animate-pulse rounded bg-elevated" />
          <div className="mt-8 h-64 animate-pulse rounded-xl bg-elevated" />
        </div>
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return <AdminDesk />;
}

function AdminDesk() {
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  const [session, setSession] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  const filters = useMemo(
    () => ({ q: qDebounced, session, status, sort, page }),
    [qDebounced, session, status, sort, page],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listBookings({ data: filters });
      setRows(res.rows);
      setTotal(res.total);
      setPages(res.pages);
      setForbidden(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      if (msg === "Forbidden" || msg === "Unauthorized") {
        setForbidden(true);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [qDebounced, session, status, sort]);

  async function changeStatus(id: string, next: BookingStatus) {
    await setBookingStatus({ data: { id, status: next } });
    await load();
  }

  async function downloadCsv() {
    const { csv } = await exportBookingsCsv({
      data: { q: qDebounced, session, status, sort },
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (forbidden) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg px-4 text-fg">
        <div className="max-w-md text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-400">Desk</p>
          <h1 className="mt-2 font-display text-5xl tracking-wide">Not authorized</h1>
          <p className="mt-3 text-sm text-muted">
            An admin already exists. This account cannot open the bookings desk.
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-fg underline-offset-4 hover:underline">
            Back to the site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-xl tracking-wide text-fg">
              JACK MANUEL
            </Link>
            <span className="rounded-sm bg-amber-400 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bg">
              Desk
            </span>
          </div>
          <UserButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber-400">Bookings</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-display text-5xl tracking-wide sm:text-6xl">Requests</h1>
          <p className="text-sm text-muted">{total} matching</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, email, note"
              className="h-11 w-full rounded-md border border-border bg-elevated pl-10 pr-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            />
          </label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg"
          >
            <option value="all">All sessions</option>
            {BOOKING_SESSIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg"
          >
            <option value="all">All statuses</option>
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={() => void downloadCsv()}>
            <Download className="size-3.5" />
            Export CSV
          </Button>
        </div>

        {error ? <p className="mt-4 text-sm text-amber-400">{error}</p> : null}

        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
          {loading ? (
            <div className="h-40 animate-pulse bg-elevated" />
          ) : rows.length === 0 ? (
            <p className="px-5 py-16 text-center text-sm text-muted">No requests match these filters.</p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((row) => (
                <li key={row.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-start sm:px-5">
                  <div>
                    <p className="font-medium text-fg">{row.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {row.phone}
                      {row.email ? ` · ${row.email}` : ""}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-subtle">{row.session}</p>
                    {row.note ? <p className="mt-2 text-sm text-muted">{row.note}</p> : null}
                    <p className="mt-2 text-[11px] text-subtle">
                      {new Date(row.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                        row.status === "new" && "bg-amber-400/15 text-amber-400",
                        row.status === "contacted" && "bg-fg/10 text-fg",
                        row.status === "archived" && "bg-border text-muted",
                      )}
                    >
                      {row.status}
                    </span>
                    {row.status === "new" ? (
                      <Button size="sm" type="button" onClick={() => void changeStatus(row.id, "contacted")}>
                        Mark contacted
                      </Button>
                    ) : null}
                    {row.status === "contacted" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => void changeStatus(row.id, "archived")}
                      >
                        Archive
                      </Button>
                    ) : null}
                    {row.status === "archived" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => void changeStatus(row.id, "new")}
                      >
                        Reopen
                      </Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {pages > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted">
              Page {page} of {pages}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
