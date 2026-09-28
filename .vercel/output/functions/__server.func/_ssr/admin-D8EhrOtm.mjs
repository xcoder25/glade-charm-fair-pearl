import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { authClient, signOut } from "./client-DEO5hdof.mjs";
import { _ as Link, v as Navigate, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as whatsappUrlForNumber, n as BOOKING_SESSIONS } from "./contact-B9SGFRve.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-BNSOLzGv.mjs";
import { c as getBookingStats, d as setBookingStatus, i as cn, l as listBookings, o as deleteBooking, s as exportBookingsCsv, t as Button, u as seedSampleBookings } from "./button-ys1UZuhp.mjs";
import { D as Clock, E as Download, L as Calendar, M as ChevronsLeft, N as ChevronRight, O as CirclePlus, P as ChevronLeft, S as Eye, U as Archive, f as Search, g as MessageCircle, j as ChevronsRight, k as CircleCheck, l as Sparkles, m as RefreshCw, n as X, p as RotateCcw, s as Trash2, u as Shield, w as ExternalLink, y as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D8EhrOtm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function AdminPage() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-bg px-4 py-20 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-48 animate-pulse rounded-lg bg-elevated" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-4",
					children: [
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-xl bg-elevated" }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-96 animate-pulse rounded-xl bg-elevated" })
			]
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDesk, { user });
}
function AdminDesk({ user }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [qDebounced, setQDebounced] = (0, import_react.useState)("");
	const [session, setSession] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(50);
	const [jumpPage, setJumpPage] = (0, import_react.useState)("");
	const [rows, setRows] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [pages, setPages] = (0, import_react.useState)(1);
	const [stats, setStats] = (0, import_react.useState)({
		total: 0,
		newCount: 0,
		contactedCount: 0,
		archivedCount: 0
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [actionBusy, setActionBusy] = (0, import_react.useState)(null);
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [seeding, setSeeding] = (0, import_react.useState)(false);
	const [forbidden, setForbidden] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const [activeModalBooking, setActiveModalBooking] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setQDebounced(q), 250);
		return () => clearTimeout(t);
	}, [q]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		qDebounced,
		session,
		status,
		sort,
		pageSize
	]);
	const showToast = (0, import_react.useCallback)((msg) => {
		setToastMessage(msg);
		setTimeout(() => {
			setToastMessage((cur) => cur === msg ? null : cur);
		}, 3500);
	}, []);
	const loadData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const [listRes, statsRes] = await Promise.all([listBookings({ data: {
				q: qDebounced,
				session,
				status,
				sort,
				page,
				pageSize
			} }), getBookingStats()]);
			setRows(listRes.rows);
			setTotal(listRes.total);
			setPages(listRes.pages);
			setStats(statsRes);
			setForbidden(false);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to load bookings";
			if (msg === "Forbidden" || msg === "Unauthorized") setForbidden(true);
			else setError(msg);
		} finally {
			setLoading(false);
		}
	}, [
		qDebounced,
		session,
		status,
		sort,
		page,
		pageSize
	]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	async function handleStatusChange(id, nextStatus) {
		setActionBusy(id);
		try {
			await setBookingStatus({ data: {
				id,
				status: nextStatus
			} });
			showToast(`Status updated to "${nextStatus}"`);
			await loadData();
			if (activeModalBooking?.id === id) setActiveModalBooking((prev) => prev ? {
				...prev,
				status: nextStatus
			} : null);
		} catch (err) {
			showToast(err instanceof Error ? err.message : "Failed to update status");
		} finally {
			setActionBusy(null);
		}
	}
	async function handleDelete(id) {
		if (!confirm("Are you sure you want to permanently delete this booking request?")) return;
		setActionBusy(id);
		try {
			await deleteBooking({ data: { id } });
			showToast("Booking request deleted");
			if (activeModalBooking?.id === id) setActiveModalBooking(null);
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
			const { csv, count } = await exportBookingsCsv({ data: {
				q: qDebounced,
				session,
				status,
				sort
			} });
			const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
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
			const res = await seedSampleBookings({ data: { count: 210 } });
			showToast(`Added ${res.seeded} sample bookings to database`);
			await loadData();
		} catch (err) {
			showToast(err instanceof Error ? err.message : "Could not seed bookings");
		} finally {
			setSeeding(false);
		}
	}
	function handleJumpSubmit(e) {
		e.preventDefault();
		const p = parseInt(jumpPage, 10);
		if (!isNaN(p) && p >= 1 && p <= pages) {
			setPage(p);
			setJumpPage("");
		}
	}
	const pageNumbers = (0, import_react.useMemo)(() => {
		const list = [];
		if (pages <= 7) for (let i = 1; i <= pages; i++) list.push(i);
		else {
			list.push(1);
			if (page > 3) list.push("…");
			const start = Math.max(2, page - 1);
			const end = Math.min(pages - 1, page + 1);
			for (let i = start; i <= end; i++) if (!list.includes(i)) list.push(i);
			if (page < pages - 2) list.push("…");
			if (!list.includes(pages)) list.push(pages);
		}
		return list;
	}, [page, pages]);
	if (forbidden) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg px-4 py-16 text-fg font-sans selection:bg-amber-400 selection:text-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-7" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400",
					children: "Admin Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl sm:text-5xl uppercase tracking-wide",
					children: "Access Restricted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						"An administrator account already exists. The signed-in account (",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: user.primaryEmail
						}),
						") has not been granted access to the bookings desk."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: async () => {
							await authClient.signOut();
							window.location.href = "/login";
						},
						className: "w-full gap-2 border-border text-fg hover:bg-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign In with Admin Account"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "w-full bg-amber-400 text-bg hover:bg-amber-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Return to Public Website"
						})
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-bg text-fg font-sans selection:bg-amber-400 selection:text-bg",
		children: [
			toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-amber-400/40 bg-elevated/95 px-4 py-3 text-sm font-medium text-fg shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-amber-400" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setToastMessage(null),
						className: "ml-2 text-muted hover:text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "group flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-md bg-elevated border border-border group-hover:border-amber-400/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg text-amber-400",
									children: "J"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tracking-wider text-fg group-hover:text-amber-400 transition-colors",
								children: "JACK MANUEL"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400",
							children: "Admin Desk"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								className: "hidden sm:inline-flex gap-1.5 text-xs text-muted hover:text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Site" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-border hidden sm:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-[0.25em] text-amber-400",
										children: "Management Portal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-400 animate-pulse" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted",
										children: "Postgres Live DB"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-4xl sm:text-6xl uppercase tracking-wide text-fg",
								children: "Booking Requests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Filter, triage, contact, and export athlete coaching requests."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									disabled: loading,
									onClick: () => void loadData(),
									className: "gap-1.5 border-border bg-surface text-fg hover:border-amber-400/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", loading && "animate-spin") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									disabled: exporting,
									onClick: () => void handleExportCsv(),
									className: "gap-1.5 border-border bg-surface text-fg hover:border-amber-400/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exporting ? "Exporting…" : "Export CSV" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									disabled: seeding,
									onClick: () => void handleSeedSample(),
									className: "gap-1.5 text-xs text-muted hover:text-amber-400",
									title: "Add 210 realistic sample bookings to test pagination beyond 200 rows",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: seeding ? "Seeding…" : "Seed 200+ Demo Rows" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setStatus("all"),
								className: cn("cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-amber-400/50", status === "all" ? "border-amber-400/60 bg-elevated shadow-lg shadow-amber-400/5" : "border-border bg-surface"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-wider",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-3xl sm:text-4xl text-fg",
										children: stats.total
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted",
										children: "All inquiries in database"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setStatus("new"),
								className: cn("cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-amber-400/50", status === "new" ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10" : "border-border bg-surface"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-wider text-amber-400",
											children: "New Action"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative flex size-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-amber-400" })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-3xl sm:text-4xl text-amber-400",
										children: stats.newCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-amber-200/70",
										children: "Awaiting contact"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setStatus("contacted"),
								className: cn("cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-blue-400/50", status === "contacted" ? "border-blue-400/60 bg-blue-500/10 shadow-lg shadow-blue-500/10" : "border-border bg-surface"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-wider text-blue-400",
											children: "Contacted"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-blue-400" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-3xl sm:text-4xl text-blue-400",
										children: stats.contactedCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted",
										children: "In discussion"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setStatus("archived"),
								className: cn("cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:border-zinc-500", status === "archived" ? "border-zinc-500 bg-zinc-800/50 shadow-lg" : "border-border bg-surface"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-wider",
											children: "Archived"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-4" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-3xl sm:text-4xl text-zinc-400",
										children: stats.archivedCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted",
										children: "Completed or closed"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative sm:col-span-2 lg:col-span-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: q,
											onChange: (e) => setQ(e.target.value),
											placeholder: "Search by client name, phone, email, brief…",
											className: "h-11 w-full rounded-lg border border-border bg-elevated pl-10 pr-9 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
										}),
										q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setQ(""),
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-fg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: session,
										onChange: (e) => setSession(e.target.value),
										className: "h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-fg transition-colors focus:border-amber-400 focus:outline-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All Session Types"
										}), BOOKING_SESSIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: status,
										onChange: (e) => setStatus(e.target.value),
										className: "h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-fg transition-colors focus:border-amber-400 focus:outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "All Statuses"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: "new",
												children: [
													"New (",
													stats.newCount,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: "contacted",
												children: [
													"Contacted (",
													stats.contactedCount,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: "archived",
												children: [
													"Archived (",
													stats.archivedCount,
													")"
												]
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: sort,
										onChange: (e) => setSort(e.target.value),
										className: "h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-fg transition-colors focus:border-amber-400 focus:outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "newest",
												children: "Sort: Newest First"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "oldest",
												children: "Sort: Oldest First"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "name",
												children: "Sort: Client Name (A-Z)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "name_desc",
												children: "Sort: Client Name (Z-A)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "status",
												children: "Sort: Status Priority"
											})
										]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Showing:" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-fg",
										children: [
											total,
											" ",
											total === 1 ? "booking" : "bookings"
										]
									}),
									(q || session !== "all" || status !== "all" || sort !== "newest") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setQ("");
											setSession("all");
											setStatus("all");
											setSort("newest");
										},
										className: "ml-2 inline-flex items-center gap-1 text-amber-400 hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), " Clear filters"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rows per page:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									children: [
										25,
										50,
										100,
										200
									].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPageSize(size),
										className: cn("rounded px-2 py-0.5 text-xs font-medium transition-colors", pageSize === size ? "bg-amber-400 text-bg font-bold" : "bg-elevated text-muted hover:text-fg"),
										children: size
									}, size))
								})]
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
						children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 animate-pulse items-center px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-48 rounded bg-elevated" })
							}, i))
						}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-20 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mx-auto size-12 text-subtle stroke-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-display text-2xl uppercase tracking-wider text-fg",
									children: "No matching bookings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: q || session !== "all" || status !== "all" ? "Try loosening your filters or search terms." : "No client booking requests have been received yet."
								}),
								(q || session !== "all" || status !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => {
										setQ("");
										setSession("all");
										setStatus("all");
									},
									className: "mt-4 border-border text-fg hover:border-amber-400/40",
									children: "Reset all filters"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left border-collapse text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border bg-elevated/80 text-[11px] font-semibold uppercase tracking-wider text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 pl-6 pr-4",
											children: "Client"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 px-4",
											children: "Contact & WhatsApp"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 px-4",
											children: "Session"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 px-4",
											children: "Status Workflow"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 px-4",
											children: "Brief / Goal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 px-4",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3.5 pl-4 pr-6 text-right",
											children: "Actions"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60",
									children: rows.map((row) => {
										const waUrl = whatsappUrlForNumber(row.phone, `Hello ${row.name}, this is To Ani Chigoziem from Jack Manuel Fitness regarding your ${row.session} booking request.`);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "group hover:bg-elevated/50 transition-colors duration-100",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 pl-6 pr-4 align-top",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-elevated border border-border text-xs font-display tracking-wider text-amber-400",
															children: row.name.charAt(0).toUpperCase()
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-semibold text-fg leading-snug",
															children: row.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[11px] text-subtle font-mono",
															children: ["#", row.id.slice(0, 8)]
														})] })]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-4 align-top",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																href: `tel:${row.phone}`,
																className: "font-mono text-xs text-fg hover:text-amber-400 hover:underline",
																children: row.phone
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																href: waUrl,
																target: "_blank",
																rel: "noreferrer",
																title: "Open WhatsApp chat with client",
																className: "inline-flex size-6 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" })
															})]
														}), row.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: `mailto:${row.email}`,
															className: "block text-xs text-muted hover:text-fg truncate max-w-[180px]",
															children: row.email
														}) : null]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-4 align-top",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "inline-block rounded-md border border-border bg-elevated px-2.5 py-1 text-xs font-medium text-fg whitespace-nowrap",
														children: row.session
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-4 align-top",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider", row.status === "new" && "bg-amber-400/15 text-amber-400 border border-amber-400/30", row.status === "contacted" && "bg-blue-500/15 text-blue-400 border border-blue-500/30", row.status === "archived" && "bg-zinc-800 text-zinc-400 border border-zinc-700"),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", row.status === "new" && "bg-amber-400 animate-pulse", row.status === "contacted" && "bg-blue-400", row.status === "archived" && "bg-zinc-500") }), row.status]
														})
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-4 align-top max-w-xs",
													children: row.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														onClick: () => setActiveModalBooking(row),
														className: "text-xs text-muted line-clamp-2 cursor-pointer hover:text-fg transition-colors",
														title: "Click to view full note",
														children: row.note
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-subtle italic",
														children: "No note provided"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "py-4 px-4 align-top whitespace-nowrap text-xs text-subtle",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: new Date(row.createdAt).toLocaleDateString() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-subtle/80",
														children: new Date(row.createdAt).toLocaleTimeString([], {
															hour: "2-digit",
															minute: "2-digit"
														})
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 pl-4 pr-6 align-top text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-end gap-1.5",
														children: [
															row.status === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																size: "sm",
																variant: "outline",
																disabled: actionBusy === row.id,
																onClick: () => void handleStatusChange(row.id, "contacted"),
																className: "h-8 gap-1 border-blue-500/40 bg-blue-500/10 text-xs font-medium text-blue-300 hover:bg-blue-500/20",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contacted" })]
															}),
															row.status === "contacted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																size: "sm",
																variant: "ghost",
																disabled: actionBusy === row.id,
																onClick: () => void handleStatusChange(row.id, "archived"),
																className: "h-8 gap-1 text-xs text-muted hover:text-fg hover:bg-elevated",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Archive" })]
															}),
															row.status === "archived" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																size: "sm",
																variant: "outline",
																disabled: actionBusy === row.id,
																onClick: () => void handleStatusChange(row.id, "new"),
																className: "h-8 gap-1 border-amber-400/40 bg-amber-400/10 text-xs font-medium text-amber-400 hover:bg-amber-400/20",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reopen" })]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "sm",
																variant: "ghost",
																onClick: () => setActiveModalBooking(row),
																className: "h-8 px-2 text-subtle hover:text-fg",
																title: "View full booking details",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "sm",
																variant: "ghost",
																disabled: actionBusy === row.id,
																onClick: () => void handleDelete(row.id),
																className: "h-8 px-2 text-subtle hover:text-red-400",
																title: "Delete request",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
															})
														]
													})
												})
											]
										}, row.id);
									})
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 border-t border-border bg-elevated/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"Showing",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: total === 0 ? 0 : (page - 1) * pageSize + 1
								}),
								" ",
								"to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: Math.min(total, page * pageSize)
								}),
								" ",
								"of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: total
								}),
								" requests",
								pages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-subtle",
									children: [
										"(Page ",
										page,
										" of ",
										pages,
										")"
									]
								})
							] }), pages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										disabled: page <= 1,
										onClick: () => setPage(1),
										className: "h-8 px-2 border-border text-xs",
										title: "First Page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										disabled: page <= 1,
										onClick: () => setPage((p) => Math.max(1, p - 1)),
										className: "h-8 px-2 border-border text-xs",
										title: "Previous Page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
									}),
									pageNumbers.map((p, idx) => p === "…" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1 text-subtle",
										children: "…"
									}, `ellipsis-${idx}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setPage(p),
										className: cn("h-8 min-w-8 px-2 text-xs", page === p ? "bg-amber-400 text-bg font-bold border-amber-400 hover:bg-amber-300" : "border-border bg-surface text-muted hover:text-fg"),
										children: p
									}, p)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										disabled: page >= pages,
										onClick: () => setPage((p) => Math.min(pages, p + 1)),
										className: "h-8 px-2 border-border text-xs",
										title: "Next Page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										disabled: page >= pages,
										onClick: () => setPage(pages),
										className: "h-8 px-2 border-border text-xs",
										title: "Last Page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleJumpSubmit,
										className: "ml-2 flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-subtle",
												children: "Go to:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 1,
												max: pages,
												value: jumpPage,
												onChange: (e) => setJumpPage(e.target.value),
												placeholder: String(page),
												className: "h-8 w-12 rounded border border-border bg-surface px-1.5 text-center text-xs text-fg focus:border-amber-400 focus:outline-none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												variant: "ghost",
												size: "sm",
												className: "h-8 px-2 text-xs",
												children: "Go"
											})
										]
									})
								]
							})]
						})]
					})
				]
			}),
			activeModalBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActiveModalBooking(null),
							className: "absolute right-4 top-4 rounded-md text-subtle hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-11 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 font-display text-xl",
								children: activeModalBooking.name.charAt(0).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl uppercase tracking-wide text-fg",
								children: activeModalBooking.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: ["Submitted ", new Date(activeModalBooking.createdAt).toLocaleString()]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4 rounded-xl border border-border bg-elevated/60 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-wider text-subtle font-medium",
											children: "Session"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-fg mt-0.5",
											children: activeModalBooking.session
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-wider text-subtle font-medium",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-amber-400 mt-0.5 uppercase tracking-wide",
											children: activeModalBooking.status
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-wider text-subtle font-medium",
											children: "Phone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `tel:${activeModalBooking.phone}`,
											className: "font-mono text-fg hover:text-amber-400 hover:underline mt-0.5 block",
											children: activeModalBooking.phone
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-wider text-subtle font-medium",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-fg mt-0.5 truncate",
											children: activeModalBooking.email || "None provided"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-wider text-subtle font-medium",
									children: "Client Brief & Notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 rounded-xl border border-border bg-elevated p-4 text-sm leading-relaxed text-fg whitespace-pre-wrap",
									children: activeModalBooking.note || "No additional brief or notes provided."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-wider text-subtle font-medium mb-2",
									children: "Update Workflow Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => void handleStatusChange(activeModalBooking.id, "new"),
											className: cn("rounded-lg border py-2 text-xs font-semibold uppercase tracking-wider transition-colors", activeModalBooking.status === "new" ? "border-amber-400 bg-amber-400/20 text-amber-400" : "border-border bg-elevated text-muted hover:text-fg"),
											children: "New"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => void handleStatusChange(activeModalBooking.id, "contacted"),
											className: cn("rounded-lg border py-2 text-xs font-semibold uppercase tracking-wider transition-colors", activeModalBooking.status === "contacted" ? "border-blue-400 bg-blue-500/20 text-blue-400" : "border-border bg-elevated text-muted hover:text-fg"),
											children: "Contacted"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => void handleStatusChange(activeModalBooking.id, "archived"),
											className: cn("rounded-lg border py-2 text-xs font-semibold uppercase tracking-wider transition-colors", activeModalBooking.status === "archived" ? "border-zinc-500 bg-zinc-800 text-zinc-300" : "border-border bg-elevated text-muted hover:text-fg"),
											children: "Archived"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: whatsappUrlForNumber(activeModalBooking.phone, `Hello ${activeModalBooking.name}, this is To Ani Chigoziem from Jack Manuel Fitness regarding your ${activeModalBooking.session} booking.`),
											target: "_blank",
											rel: "noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Message on WhatsApp"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => setActiveModalBooking(null),
										className: "border-border text-fg hover:bg-elevated",
										children: "Close"
									})]
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
