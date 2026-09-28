import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  Search,
  Filter,
  RefreshCw,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Archive,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Shield,
  Sparkles,
  X,
  PlusCircle,
  Trash2,
  Eye,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { authClient } from "@/lib/auth/client";
import {
  deleteBooking,
  exportBookingsCsv,
  getBookingStats,
  listBookings,
  seedSampleBookings,
  setBookingStatus,
  type BookingRow,
  type BookingStats,
} from "@/lib/bookings";
import {
  BOOKING_SESSIONS,
  BOOKING_STATUSES,
  type BookingSession,
  type BookingStatus,
  whatsappUrlForNumber,
} from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type SortKey = "newest" | "oldest" | "name" | "name_desc" | "status";

function AdminPage() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <main className="min-h-screen bg-bg px-4 py-20 text-fg">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-elevated" />
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-elevated" />
            ))}
          </div>
          <div className="mt-8 h-96 animate-pulse rounded-xl bg-elevated" />
        </div>
      </main>
    );
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return <AdminDesk user={user} />;
}

function AdminDesk({ user }: { user: { displayName?: string | null; primaryEmail?: string | null } }) {
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  const [session, setSession] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [jumpPage, setJumpPage] = useState("");

  const [rows, setRows] = useState<BookingRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [stats, setStats] = useState<BookingStats>({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    archivedCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [actionBusy, setActionBusy] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeModalBooking, setActiveModalBooking] = useState<BookingRow | null>(null);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [qDebounced, session, status, sort, pageSize]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3500);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [listRes, statsRes] = await Promise.all([
        listBookings({
          data: {
            q: qDebounced,
            session,
            status,
            sort,
            page,
            pageSize,
          },
        }),
        getBookingStats(),
      ]);

      setRows(listRes.rows);
      setTotal(listRes.total);
      setPages(listRes.pages);
      setStats(statsRes);
      setForbidden(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load bookings";
      if (msg === "Forbidden" || msg === "Unauthorized") {
        setForbidden(true);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [qDebounced, session, status, sort, page, pageSize]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  async function handleStatusChange(id: string, nextStatus: BookingStatus) {
    setActionBusy(id);
    try {
      await setBookingStatus({ data: { id, status: nextStatus } });
      showToast(`Status updated to "${nextStatus}"`);
      await loadData();
      if (activeModalBooking?.id === id) {
        setActiveModalBooking((prev) => (prev ? { ...prev, status: nextStatus } : null));
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setActionBusy(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this booking request?")) return;
    setActionBusy(id);
    try {
      await deleteBooking({ data: { id } });
      showToast("Booking request deleted");
      if (activeModalBooking?.id === id) {
        setActiveModalBooking(null);
      }
      await loadData();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete booking");
    } finally {
      setActionBusy(null);
    }
  }

  async function handleExportCsv() {
    setExporting(true);
    try {
      const { csv, count } = await exportBookingsCsv({
        data: { q: qDebounced, session, status, sort },
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      a.download = `jack-manuel-bookings-${status}-${dateStr}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Exported ${count} bookings to CSV`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to export CSV");
    } finally {
      setExporting(false);
    }
  }

  async function handleSeedSample() {
    setSeeding(true);
    try {
      // Seed 210 realistic rows so pagination beyond 200 rows can be tested immediately
      const res = await seedSampleBookings({ data: { count: 210 } });
      showToast(`Added ${res.seeded} sample bookings to database`);
      await loadData();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Could not seed bookings");
    } finally {
      setSeeding(false);
    }
  }

  function handleJumpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = parseInt(jumpPage, 10);
    if (!isNaN(p) && p >= 1 && p <= pages) {
      setPage(p);
      setJumpPage("");
    }
  }

  // Generate pagination buttons array
  const pageNumbers = useMemo(() => {
    const list: (number | "…")[] = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) list.push(i);
    } else {
      list.push(1);
      if (page > 3) list.push("…");
      const start = Math.max(2, page - 1);
      const end = Math.min(pages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        if (!list.includes(i)) list.push(i);
      }
      if (page < pages - 2) list.push("…");
      if (!list.includes(pages)) list.push(pages);
    }
    return list;
  }, [page, pages]);

  if (forbidden) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg px-4 py-16 text-fg font-sans selection:bg-amber-400 selection:text-bg">
        <div className="max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-2xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            <Shield className="size-7" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Admin Desk
          </p>
          <h1 className="mt-1 font-display text-4xl sm:text-5xl uppercase tracking-wide">
            Access Restricted
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            An administrator account already exists. The signed-in account (
            <span className="font-medium text-fg">{user.primaryEmail}</span>) has not been granted
            access to the bookings desk.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              variant="outline"
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/login";
              }}
              className="w-full gap-2 border-border text-fg hover:bg-elevated"
            >
              <LogOut className="size-4" /> Sign In with Admin Account
            </Button>
            <Button asChild className="w-full bg-amber-400 text-bg hover:bg-amber-300">
              <Link to="/">Return to Public Website</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg text-fg font-sans selection:bg-amber-400 selection:text-bg">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-amber-400/40 bg-elevated/95 px-4 py-3 text-sm font-medium text-fg shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="size-4 text-amber-400" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-muted hover:text-fg"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="group flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-elevated border border-border group-hover:border-amber-400/50">
                <span className="font-display text-lg text-amber-400">J</span>
              </span>
              <span className="font-display text-xl tracking-wider text-fg group-hover:text-amber-400 transition-colors">
                JACK MANUEL
              </span>
            </Link>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Admin Desk
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex gap-1.5 text-xs text-muted hover:text-fg"
            >
              <Link to="/">
                <span>Live Site</span>
                <ExternalLink className="size-3" />
              </Link>
            </Button>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <UserButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header & Desk Title */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Management Portal
              </p>
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-muted">Postgres Live DB</span>
            </div>
            <h1 className="mt-1 font-display text-4xl sm:text-6xl uppercase tracking-wide text-fg">
              Booking Requests
            </h1>
            <p className="mt-1 text-sm text-muted">
              Filter, triage, contact, and export athlete coaching requests.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => void loadData()}
              className="gap-1.5 border-border bg-surface text-fg hover:border-amber-400/40"
            >
              <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
              <span>Refresh</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={exporting}
              onClick={() => void handleExportCsv()}
              className="gap-1.5 border-border bg-surface text-fg hover:border-amber-400/40"
            >
              <Download className="size-3.5 text-amber-400" />
              <span>{exporting ? "Exporting…" : "Export CSV"}</span>
            </Button>

            {/* Seed Sample Data (handy for testing pagination beyond 200 rows) */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={seeding}
              onClick={() => void handleSeedSample()}
              className="gap-1.5 text-xs text-muted hover:text-amber-400"
              title="Add 210 realistic sample bookings to test pagination beyond 200 rows"
            >
              <PlusCircle className="size-3.5" />
              <span>{seeding ? "Seeding…" : "Seed 200+ Demo Rows"}</span>
            </Button>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Card: Total */}
          <div
            onClick={() => setStatus("all")}
            className={cn(
              "cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-amber-400/50",
              status === "all"
                ? "border-amber-400/60 bg-elevated shadow-lg shadow-amber-400/5"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
              <Calendar className="size-4" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl text-fg">{stats.total}</p>
            <p className="mt-1 text-[11px] text-muted">All inquiries in database</p>
          </div>

          {/* Card: New */}
          <div
            onClick={() => setStatus("new")}
            className={cn(
              "cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-amber-400/50",
              status === "new"
                ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                New Action
              </span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
              </span>
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl text-amber-400">{stats.newCount}</p>
            <p className="mt-1 text-[11px] text-amber-200/70">Awaiting contact</p>
          </div>

          {/* Card: Contacted */}
          <div
            onClick={() => setStatus("contacted")}
            className={cn(
              "cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-blue-400/50",
              status === "contacted"
                ? "border-blue-400/60 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Contacted
              </span>
              <Clock className="size-4 text-blue-400" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl text-blue-400">
              {stats.contactedCount}
            </p>
            <p className="mt-1 text-[11px] text-muted">In discussion</p>
          </div>

          {/* Card: Archived */}
          <div
            onClick={() => setStatus("archived")}
            className={cn(
              "cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-zinc-500",
              status === "archived"
                ? "border-zinc-500 bg-zinc-800/50 shadow-lg"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Archived</span>
              <Archive className="size-4" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl text-zinc-400">
              {stats.archivedCount}
            </p>
            <p className="mt-1 text-[11px] text-muted">Completed or closed</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {/* Search input */}
            <div className="relative sm:col-span-2 lg:col-span-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by client name, phone, email, brief…"
                className="h-11 w-full rounded-lg border border-border bg-elevated pl-10 pr-9 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-fg"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Session Filter */}
            <div className="lg:col-span-3">
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-fg transition-colors focus:border-amber-400 focus:outline-none"
              >
                <option value="all">All Session Types</option>
                {BOOKING_SESSIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-fg transition-colors focus:border-amber-400 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New ({stats.newCount})</option>
                <option value="contacted">Contacted ({stats.contactedCount})</option>
                <option value="archived">Archived ({stats.archivedCount})</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="lg:col-span-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-fg transition-colors focus:border-amber-400 focus:outline-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="name">Sort: Client Name (A-Z)</option>
                <option value="name_desc">Sort: Client Name (Z-A)</option>
                <option value="status">Sort: Status Priority</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips / Reset */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3 text-xs text-muted">
            <div className="flex flex-wrap items-center gap-2">
              <span>Showing:</span>
              <span className="font-semibold text-fg">
                {total} {total === 1 ? "booking" : "bookings"}
              </span>
              {(q || session !== "all" || status !== "all" || sort !== "newest") && (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setSession("all");
                    setStatus("all");
                    setSort("newest");
                  }}
                  className="ml-2 inline-flex items-center gap-1 text-amber-400 hover:underline"
                >
                  <X className="size-3" /> Clear filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span>Rows per page:</span>
              <div className="flex gap-1">
                {[25, 50, 100, 200].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPageSize(size)}
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-medium transition-colors",
                      pageSize === size
                        ? "bg-amber-400 text-bg font-bold"
                        : "bg-elevated text-muted hover:text-fg",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Bookings Table View */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          {loading ? (
            <div className="divide-y divide-border">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex h-20 animate-pulse items-center px-6">
                  <div className="h-4 w-48 rounded bg-elevated" />
                </div>
              ))}
            </div>
          ) : rows.length === 0 ? (
            <div className="py-20 text-center">
              <Calendar className="mx-auto size-12 text-subtle stroke-1" />
              <p className="mt-3 font-display text-2xl uppercase tracking-wider text-fg">
                No matching bookings
              </p>
              <p className="mt-1 text-sm text-muted">
                {q || session !== "all" || status !== "all"
                  ? "Try loosening your filters or search terms."
                  : "No client booking requests have been received yet."}
              </p>
              {(q || session !== "all" || status !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQ("");
                    setSession("all");
                    setStatus("all");
                  }}
                  className="mt-4 border-border text-fg hover:border-amber-400/40"
                >
                  Reset all filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-elevated/80 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <th className="py-3.5 pl-6 pr-4">Client</th>
                    <th className="py-3.5 px-4">Contact & WhatsApp</th>
                    <th className="py-3.5 px-4">Session</th>
                    <th className="py-3.5 px-4">Status Workflow</th>
                    <th className="py-3.5 px-4">Brief / Goal</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {rows.map((row) => {
                    const waUrl = whatsappUrlForNumber(
                      row.phone,
                      `Hello ${row.name}, this is To Ani Chigoziem from Jack Manuel Fitness regarding your ${row.session} booking request.`,
                    );

                    return (
                      <tr
                        key={row.id}
                        className="group hover:bg-elevated/50 transition-colors duration-100"
                      >
                        {/* Client Name */}
                        <td className="py-4 pl-6 pr-4 align-top">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-elevated border border-border text-xs font-display tracking-wider text-amber-400">
                              {row.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-fg leading-snug">{row.name}</p>
                              <span className="text-[11px] text-subtle font-mono">
                                #{row.id.slice(0, 8)}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Contact & WhatsApp */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${row.phone}`}
                                className="font-mono text-xs text-fg hover:text-amber-400 hover:underline"
                              >
                                {row.phone}
                              </a>
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Open WhatsApp chat with client"
                                className="inline-flex size-6 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                              >
                                <MessageCircle className="size-3.5" />
                              </a>
                            </div>
                            {row.email ? (
                              <a
                                href={`mailto:${row.email}`}
                                className="block text-xs text-muted hover:text-fg truncate max-w-[180px]"
                              >
                                {row.email}
                              </a>
                            ) : null}
                          </div>
                        </td>

                        {/* Session */}
                        <td className="py-4 px-4 align-top">
                          <span className="inline-block rounded-md border border-border bg-elevated px-2.5 py-1 text-xs font-medium text-fg whitespace-nowrap">
                            {row.session}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                                row.status === "new" &&
                                  "bg-amber-400/15 text-amber-400 border border-amber-400/30",
                                row.status === "contacted" &&
                                  "bg-blue-500/15 text-blue-400 border border-blue-500/30",
                                row.status === "archived" &&
                                  "bg-zinc-800 text-zinc-400 border border-zinc-700",
                              )}
                            >
                              <span
                                className={cn(
                                  "size-1.5 rounded-full",
                                  row.status === "new" && "bg-amber-400 animate-pulse",
                                  row.status === "contacted" && "bg-blue-400",
                                  row.status === "archived" && "bg-zinc-500",
                                )}
                              />
                              {row.status}
                            </span>
                          </div>
                        </td>

                        {/* Brief / Note */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          {row.note ? (
                            <p
                              onClick={() => setActiveModalBooking(row)}
                              className="text-xs text-muted line-clamp-2 cursor-pointer hover:text-fg transition-colors"
                              title="Click to view full note"
                            >
                              {row.note}
                            </p>
                          ) : (
                            <span className="text-xs text-subtle italic">No note provided</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 align-top whitespace-nowrap text-xs text-subtle">
                          <div>{new Date(row.createdAt).toLocaleDateString()}</div>
                          <div className="text-[10px] text-subtle/80">
                            {new Date(row.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Action Workflow Buttons */}
                        <td className="py-4 pl-4 pr-6 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Workflow button: new -> contacted */}
                            {row.status === "new" && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={actionBusy === row.id}
                                onClick={() => void handleStatusChange(row.id, "contacted")}
                                className="h-8 gap-1 border-blue-500/40 bg-blue-500/10 text-xs font-medium text-blue-300 hover:bg-blue-500/20"
                              >
                                <CheckCircle2 className="size-3.5" />
                                <span>Contacted</span>
                              </Button>
                            )}

                            {/* Workflow button: contacted -> archive */}
                            {row.status === "contacted" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={actionBusy === row.id}
                                onClick={() => void handleStatusChange(row.id, "archived")}
                                className="h-8 gap-1 text-xs text-muted hover:text-fg hover:bg-elevated"
                              >
                                <Archive className="size-3.5" />
                                <span>Archive</span>
                              </Button>
                            )}

                            {/* Reopen action for archived */}
                            {row.status === "archived" && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={actionBusy === row.id}
                                onClick={() => void handleStatusChange(row.id, "new")}
                                className="h-8 gap-1 border-amber-400/40 bg-amber-400/10 text-xs font-medium text-amber-400 hover:bg-amber-400/20"
                              >
                                <RotateCcw className="size-3.5" />
                                <span>Reopen</span>
                              </Button>
                            )}

                            {/* View full detail modal trigger */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setActiveModalBooking(row)}
                              className="h-8 px-2 text-subtle hover:text-fg"
                              title="View full booking details"
                            >
                              <Eye className="size-3.5" />
                            </Button>

                            {/* Delete */}
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={actionBusy === row.id}
                              onClick={() => void handleDelete(row.id)}
                              className="h-8 px-2 text-subtle hover:text-red-400"
                              title="Delete request"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls — built to scale beyond 200+ rows */}
          <div className="flex flex-col gap-4 border-t border-border bg-elevated/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted">
            <div>
              Showing{" "}
              <span className="font-semibold text-fg">
                {total === 0 ? 0 : (page - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-fg">
                {Math.min(total, page * pageSize)}
              </span>{" "}
              of <span className="font-semibold text-fg">{total}</span> requests
              {pages > 1 && (
                <span className="ml-1 text-subtle">
                  (Page {page} of {pages})
                </span>
              )}
            </div>

            {pages > 1 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {/* First Page */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(1)}
                  className="h-8 px-2 border-border text-xs"
                  title="First Page"
                >
                  <ChevronsLeft className="size-3.5" />
                </Button>

                {/* Previous Page */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-8 px-2 border-border text-xs"
                  title="Previous Page"
                >
                  <ChevronLeft className="size-3.5" />
                </Button>

                {/* Page Number Buttons */}
                {pageNumbers.map((p, idx) =>
                  p === "…" ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-subtle">
                      …
                    </span>
                  ) : (
                    <Button
                      key={p}
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p)}
                      className={cn(
                        "h-8 min-w-8 px-2 text-xs",
                        page === p
                          ? "bg-amber-400 text-bg font-bold border-amber-400 hover:bg-amber-300"
                          : "border-border bg-surface text-muted hover:text-fg",
                      )}
                    >
                      {p}
                    </Button>
                  ),
                )}

                {/* Next Page */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pages}
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  className="h-8 px-2 border-border text-xs"
                  title="Next Page"
                >
                  <ChevronRight className="size-3.5" />
                </Button>

                {/* Last Page */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pages}
                  onClick={() => setPage(pages)}
                  className="h-8 px-2 border-border text-xs"
                  title="Last Page"
                >
                  <ChevronsRight className="size-3.5" />
                </Button>

                {/* Jump to Page Form */}
                <form onSubmit={handleJumpSubmit} className="ml-2 flex items-center gap-1">
                  <span className="text-subtle">Go to:</span>
                  <input
                    type="number"
                    min={1}
                    max={pages}
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    placeholder={String(page)}
                    className="h-8 w-12 rounded border border-border bg-surface px-1.5 text-center text-xs text-fg focus:border-amber-400 focus:outline-none"
                  />
                  <Button type="submit" variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    Go
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Modal / Drawer */}
      {activeModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModalBooking(null)}
              className="absolute right-4 top-4 rounded-md text-subtle hover:text-fg"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 font-display text-xl">
                {activeModalBooking.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-fg">
                  {activeModalBooking.name}
                </h3>
                <p className="text-xs text-muted">
                  Submitted {new Date(activeModalBooking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-elevated/60 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-subtle font-medium">Session</p>
                  <p className="font-semibold text-fg mt-0.5">{activeModalBooking.session}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-subtle font-medium">Status</p>
                  <p className="font-semibold text-amber-400 mt-0.5 uppercase tracking-wide">
                    {activeModalBooking.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-subtle font-medium">Phone</p>
                  <a
                    href={`tel:${activeModalBooking.phone}`}
                    className="font-mono text-fg hover:text-amber-400 hover:underline mt-0.5 block"
                  >
                    {activeModalBooking.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-subtle font-medium">Email</p>
                  <p className="text-fg mt-0.5 truncate">
                    {activeModalBooking.email || "None provided"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-subtle font-medium">
                  Client Brief & Notes
                </p>
                <div className="mt-1.5 rounded-xl border border-border bg-elevated p-4 text-sm leading-relaxed text-fg whitespace-pre-wrap">
                  {activeModalBooking.note || "No additional brief or notes provided."}
                </div>
              </div>

              {/* Status Update Actions */}
              <div>
                <p className="text-xs uppercase tracking-wider text-subtle font-medium mb-2">
                  Update Workflow Status
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => void handleStatusChange(activeModalBooking.id, "new")}
                    className={cn(
                      "rounded-lg border py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                      activeModalBooking.status === "new"
                        ? "border-amber-400 bg-amber-400/20 text-amber-400"
                        : "border-border bg-elevated text-muted hover:text-fg",
                    )}
                  >
                    New
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleStatusChange(activeModalBooking.id, "contacted")}
                    className={cn(
                      "rounded-lg border py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                      activeModalBooking.status === "contacted"
                        ? "border-blue-400 bg-blue-500/20 text-blue-400"
                        : "border-border bg-elevated text-muted hover:text-fg",
                    )}
                  >
                    Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleStatusChange(activeModalBooking.id, "archived")}
                    className={cn(
                      "rounded-lg border py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                      activeModalBooking.status === "archived"
                        ? "border-zinc-500 bg-zinc-800 text-zinc-300"
                        : "border-border bg-elevated text-muted hover:text-fg",
                    )}
                  >
                    Archived
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  asChild
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-2"
                >
                  <a
                    href={whatsappUrlForNumber(
                      activeModalBooking.phone,
                      `Hello ${activeModalBooking.name}, this is To Ani Chigoziem from Jack Manuel Fitness regarding your ${activeModalBooking.session} booking.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-4" /> Message on WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveModalBooking(null)}
                  className="border-border text-fg hover:bg-elevated"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
