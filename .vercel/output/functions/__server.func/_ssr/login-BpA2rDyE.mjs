import { o as __toESM } from "../_runtime.mjs";
import { t as GROK_PROVIDERS } from "./server-Dn-9OK9O.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { authClient, signIn } from "./client-DEO5hdof.mjs";
import { _ as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-BNSOLzGv.mjs";
import { n as checkAdminSetup, r as claimAdmin, t as Button } from "./button-ys1UZuhp.mjs";
import { A as CircleAlert, C as EyeOff, S as Eye, V as ArrowRight, b as Lock, i as User, k as CircleCheck, l as Sparkles, u as Shield, v as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BpA2rDyE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [hasAdmin, setHasAdmin] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		checkAdminSetup().then((res) => {
			setHasAdmin(res.hasAdmin);
			if (!res.hasAdmin) setMode("up");
		}).catch(() => setHasAdmin(null));
	}, []);
	async function onEmail(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			if (mode === "up") {
				if (password.length < 8) throw new Error("Password must be at least 8 characters long");
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.split("@")[0],
					callbackURL: "/admin"
				});
				if (err) throw new Error(err.message ?? "Could not create account");
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: "/admin"
				});
				if (err) throw new Error(err.message ?? "Invalid email or password");
			}
			try {
				await claimAdmin();
			} catch {}
			window.location.href = "/admin";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-hidden bg-bg text-fg selection:bg-amber-400 selection:text-bg font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-400/5 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "group inline-flex items-center gap-2 font-display text-2xl tracking-wider text-fg transition-colors hover:text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-md bg-elevated border border-border group-hover:border-amber-400/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg text-amber-400",
									children: "J"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JACK MANUEL" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-xs uppercase tracking-widest text-muted hover:text-fg transition-colors",
							children: "← Back to Site"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-2xl border border-border/80 bg-surface/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin Desk Access" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-2 font-display text-4xl sm:text-5xl uppercase tracking-wide text-fg",
										children: mode === "up" ? "Create Admin Account" : "Sign In to Desk"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted",
										children: "Jack Manuel Fitness management portal for bookings and client inquiries."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-xl border border-amber-400/40 bg-amber-400/[0.08] p-3.5 text-xs leading-relaxed text-amber-200/90 flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0 text-amber-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-amber-400",
									children: "First-Time Setup Rule: "
								}), hasAdmin === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["No admin exists yet. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "The first account created or signed in here automatically becomes the site administrator." })] }) : hasAdmin === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "An administrator is configured. The first account created has admin rights over bookings." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The first account to sign in or register here becomes admin." })] })]
							}),
							isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full animate-pulse rounded-lg bg-elevated" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full animate-pulse rounded-lg bg-elevated" })]
							}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 space-y-4 rounded-xl border border-border bg-elevated/60 p-5 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto flex size-12 items-center justify-center rounded-full bg-amber-400/20 text-amber-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-wider text-muted",
											children: "Signed In As"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-fg",
											children: user.displayName || user.primaryEmail
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: user.primaryEmail
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "w-full bg-amber-400 text-bg hover:bg-amber-300 font-semibold",
										size: "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin",
											children: ["Enter Admin Desk ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 ml-1.5" })]
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								GROK_PROVIDERS.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid gap-2",
									children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => signIn(p.providerId, { callbackURL: "/admin" }),
										className: "flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-elevated px-4 text-sm font-medium text-fg transition-all duration-150 hover:border-amber-400/50 hover:bg-surface active:scale-[0.99]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Continue with ", p.label] })
									}, p.providerId))
								}),
								GROK_PROVIDERS.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-5 flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] uppercase tracking-wider text-subtle font-medium",
											children: "or continue with email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid grid-cols-2 gap-1 rounded-lg border border-border bg-elevated p-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setMode("in");
											setError("");
										},
										className: `rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${mode === "in" ? "bg-amber-400 text-bg shadow-sm" : "text-muted hover:text-fg"}`,
										children: "Sign In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setMode("up");
											setError("");
										},
										className: `rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${mode === "up" ? "bg-amber-400 text-bg shadow-sm" : "text-muted hover:text-fg"}`,
										children: "Create Account"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: onEmail,
									className: "mt-5 space-y-4",
									children: [
										mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
											children: "Full Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: name,
												onChange: (e) => setName(e.target.value),
												placeholder: "Coach or Admin name",
												autoComplete: "name",
												required: true,
												className: "h-11 w-full rounded-lg border border-border bg-elevated/70 pl-10 pr-3 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
											children: "Email Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												placeholder: "admin@jackmanuelfitness.com",
												required: true,
												autoComplete: "email",
												className: "h-11 w-full rounded-lg border border-border bg-elevated/70 pl-10 pr-3 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-1.5 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-medium uppercase tracking-wider text-muted",
												children: "Password"
											}), mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-subtle",
												children: "Min. 8 characters"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: showPassword ? "text" : "password",
													value: password,
													onChange: (e) => setPassword(e.target.value),
													placeholder: "••••••••",
													required: true,
													minLength: 8,
													autoComplete: mode === "up" ? "new-password" : "current-password",
													className: "h-11 w-full rounded-lg border border-border bg-elevated/70 pl-10 pr-10 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowPassword((v) => !v),
													"aria-label": showPassword ? "Hide password" : "Show password",
													className: "absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-fg",
													children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
												})
											]
										})] }),
										error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: busy,
											size: "lg",
											className: "w-full bg-amber-400 text-bg hover:bg-amber-300 font-semibold tracking-wide shadow-lg shadow-amber-400/20 active:scale-[0.99] transition-all",
											children: busy ? "Verifying…" : mode === "up" ? "Create Admin Account & Open Desk" : "Sign In to Admin Desk"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setMode(mode === "up" ? "in" : "up");
											setError("");
										},
										className: "text-xs text-muted hover:text-amber-400 transition-colors",
										children: mode === "up" ? "Already have an account? Sign in here" : "First time here? Create the first administrator account"
									})
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-center text-xs text-subtle",
						children: "Jack Manuel Fitness Limited · Internal Management Console"
					})
				]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
