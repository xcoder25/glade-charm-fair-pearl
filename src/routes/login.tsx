import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, authClient, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0],
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not sign in");
      }
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <Link to="/" className="mb-8 font-display text-2xl tracking-wide text-fg">
          JACK MANUEL
        </Link>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Desk access</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide text-fg">Sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The first account here becomes admin. Use it to run the bookings desk.
        </p>

        {!authEnabled ? (
          <p className="mt-8 text-sm text-muted">Sign-in is disabled.</p>
        ) : user ? (
          <div className="mt-8 space-y-3">
            <p className="text-sm text-muted">Signed in as {user.displayName ?? user.primaryEmail}.</p>
            <Button asChild className="w-full">
              <Link to="/admin">Open the desk</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
                  className="h-12 w-full rounded-md border border-border bg-elevated text-sm font-medium text-fg transition-colors hover:border-amber-400/50 hover:bg-surface"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[11px] uppercase tracking-wider text-subtle">or email</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={onEmail} className="space-y-3">
              {mode === "up" ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  autoComplete="name"
                  className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                />
              ) : null}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="email"
                className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={8}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
                className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              />
              {error ? <p className="text-sm text-amber-400">{error}</p> : null}
              <Button type="submit" className="w-full bg-amber-400 text-bg hover:opacity-90" disabled={busy} size="lg">
                {busy ? "Working…" : mode === "up" ? "Create account" : "Sign in with email"}
              </Button>
            </form>
            <button
              type="button"
              className="mt-4 text-sm text-muted hover:text-fg"
              onClick={() => {
                setMode(mode === "up" ? "in" : "up");
                setError("");
              }}
            >
              {mode === "up" ? "Already have an account? Sign in" : "New here? Create the first admin account"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
