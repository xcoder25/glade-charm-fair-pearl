import { useState, useEffect, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, Sparkles, ArrowRight, Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { GROK_PROVIDERS, authEnabled, authClient, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { checkAdminSetup, claimAdmin } from "@/lib/bookings";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    checkAdminSetup()
      .then((res) => {
        setHasAdmin(res.hasAdmin);
        // If no admin exists yet, default mode to create account (sign up)
        if (!res.hasAdmin) {
          setMode("up");
        }
      })
      .catch(() => setHasAdmin(null));
  }, []);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      if (mode === "up") {
        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters long");
        }
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.split("@")[0],
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Invalid email or password");
      }

      // Proactively claim admin right away for the first account
      try {
        await claimAdmin();
      } catch {
        // Continue to /admin where requireAdmin will handle or verify
      }

      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg text-fg selection:bg-amber-400 selection:text-bg font-sans">
      {/* Background ambient lighting and grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-400/5 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
        {/* Brand header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-display text-2xl tracking-wider text-fg transition-colors hover:text-amber-400"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-elevated border border-border group-hover:border-amber-400/50">
              <span className="font-display text-lg text-amber-400">J</span>
            </span>
            <span>JACK MANUEL</span>
          </Link>
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted hover:text-fg transition-colors"
          >
            ← Back to Site
          </Link>
        </div>

        {/* Card Shell */}
        <div className="relative rounded-2xl border border-border/80 bg-surface/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Top highlight bar */}
          <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          {/* Heading */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Shield className="size-3.5" />
              <span>Admin Desk Access</span>
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl uppercase tracking-wide text-fg">
              {mode === "up" ? "Create Admin Account" : "Sign In to Desk"}
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Jack Manuel Fitness management portal for bookings and client inquiries.
            </p>
          </div>

          {/* First Account Banner Callout */}
          <div className="mt-5 rounded-xl border border-amber-400/40 bg-amber-400/[0.08] p-3.5 text-xs leading-relaxed text-amber-200/90 flex items-start gap-2.5">
            <Sparkles className="size-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-400">First-Time Setup Rule: </span>
              {hasAdmin === false ? (
                <span>
                  No admin exists yet. <strong>The first account created or signed in here automatically becomes the site administrator.</strong>
                </span>
              ) : hasAdmin === true ? (
                <span>
                  An administrator is configured. The first account created has admin rights over bookings.
                </span>
              ) : (
                <span>
                  The first account to sign in or register here becomes admin.
                </span>
              )}
            </div>
          </div>

          {!authEnabled ? (
            <div className="mt-8 rounded-lg border border-border bg-elevated p-4 text-center text-sm text-muted">
              Authentication is currently disabled in the environment.
            </div>
          ) : isPending ? (
            <div className="mt-8 space-y-3">
              <div className="h-11 w-full animate-pulse rounded-lg bg-elevated" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-elevated" />
            </div>
          ) : user ? (
            <div className="mt-8 space-y-4 rounded-xl border border-border bg-elevated/60 p-5 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Signed In As</p>
                <p className="font-semibold text-fg">{user.displayName || user.primaryEmail}</p>
                <p className="text-xs text-muted">{user.primaryEmail}</p>
              </div>
              <Button
                asChild
                className="w-full bg-amber-400 text-bg hover:bg-amber-300 font-semibold"
                size="lg"
              >
                <Link to="/admin">
                  Enter Admin Desk <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* OAuth Providers */}
              {GROK_PROVIDERS.length > 0 && (
                <div className="mt-6 grid gap-2">
                  {GROK_PROVIDERS.map((p) => (
                    <button
                      key={p.providerId}
                      type="button"
                      onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-elevated px-4 text-sm font-medium text-fg transition-all duration-150 hover:border-amber-400/50 hover:bg-surface active:scale-[0.99]"
                    >
                      <span>Continue with {p.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {GROK_PROVIDERS.length > 0 && (
                <div className="my-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-[11px] uppercase tracking-wider text-subtle font-medium">
                    or continue with email
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
              )}

              {/* Mode Toggle Tabs */}
              <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-border bg-elevated p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("in");
                    setError("");
                  }}
                  className={`rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    mode === "in"
                      ? "bg-amber-400 text-bg shadow-sm"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("up");
                    setError("");
                  }}
                  className={`rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    mode === "up"
                      ? "bg-amber-400 text-bg shadow-sm"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form onSubmit={onEmail} className="mt-5 space-y-4">
                {mode === "up" && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Coach or Admin name"
                        autoComplete="name"
                        required
                        className="h-11 w-full rounded-lg border border-border bg-elevated/70 pl-10 pr-3 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@jackmanuelfitness.com"
                      required
                      autoComplete="email"
                      className="h-11 w-full rounded-lg border border-border bg-elevated/70 pl-10 pr-3 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted">
                      Password
                    </label>
                    {mode === "up" && (
                      <span className="text-[11px] text-subtle">Min. 8 characters</span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      autoComplete={mode === "up" ? "new-password" : "current-password"}
                      className="h-11 w-full rounded-lg border border-border bg-elevated/70 pl-10 pr-10 text-sm text-fg placeholder:text-subtle transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-fg"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={busy}
                  size="lg"
                  className="w-full bg-amber-400 text-bg hover:bg-amber-300 font-semibold tracking-wide shadow-lg shadow-amber-400/20 active:scale-[0.99] transition-all"
                >
                  {busy
                    ? "Verifying…"
                    : mode === "up"
                      ? "Create Admin Account & Open Desk"
                      : "Sign In to Admin Desk"}
                </Button>
              </form>

              {/* Mode switch link */}
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "up" ? "in" : "up");
                    setError("");
                  }}
                  className="text-xs text-muted hover:text-amber-400 transition-colors"
                >
                  {mode === "up"
                    ? "Already have an account? Sign in here"
                    : "First time here? Create the first administrator account"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer branding */}
        <p className="mt-8 text-center text-xs text-subtle">
          Jack Manuel Fitness Limited · Internal Management Console
        </p>
      </div>
    </main>
  );
}
