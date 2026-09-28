import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/lib/bookings";
import { BOOKING_SESSIONS, whatsappUrlWithText } from "@/lib/contact";
import { cn } from "@/lib/cn";

export function BookForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [session, setSession] = useState<(typeof BOOKING_SESSIONS)[number]>(BOOKING_SESSIONS[0]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Add your name.");
      return;
    }
    if (phone.trim().length < 8) {
      setError("Add a working phone or WhatsApp number.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await createBooking({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          session,
          note: note.trim(),
        },
      });
      const lines = [
        `*New booking request from ${name.trim()}*`,
        `📋 Session: ${session}`,
        `📞 Phone: ${phone.trim()}`,
        email.trim() ? `📧 Email: ${email.trim()}` : "",
        note.trim() ? `📝 Brief: ${note.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      setWhatsappUrl(whatsappUrlWithText(lines));
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this request. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-elevated p-6 sm:p-8">
        <div className="flex size-10 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
          <Check className="size-5" />
        </div>
        <h3 className="mt-4 font-display text-3xl tracking-wide text-fg">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {name}, your {session.toLowerCase()} request is logged. Tap below — your details are
          pre-filled so the team can reply immediately.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white border-0">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Send via WhatsApp →
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDone(false);
              setName("");
              setPhone("");
              setEmail("");
              setNote("");
              setWhatsappUrl("");
            }}
          >
            New request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-elevated p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
            Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
            Phone / WhatsApp
          </span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
            placeholder="0708…"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          placeholder="you@email.com"
          autoComplete="email"
        />
      </label>
      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
          What do you need
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {BOOKING_SESSIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSession(s)}
              className={cn(
                "min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors duration-150",
                session === s
                  ? "border-fg bg-fg text-bg"
                  : "border-border bg-surface text-muted hover:text-fg",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="mt-5 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
          Goal or brief
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          placeholder="Strength goal, event date, brand, or location"
        />
      </label>
      {error ? <p className="mt-3 text-sm text-muted">{error}</p> : null}
      <Button type="submit" className="mt-5 w-full sm:w-auto" size="lg" disabled={busy}>
        {busy ? "Sending…" : "Request a booking"}
      </Button>
    </form>
  );
}
