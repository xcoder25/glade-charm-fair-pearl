import {
  BOOKINGS_LEAD,
  CONTACT_EMAIL,
  PHONE_ALT_DISPLAY,
  PHONE_ALT_TEL,
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_TEL,
  WHATSAPP_URL,
} from "@/lib/contact";

const SOCIALS = [
  { href: "https://www.instagram.com/jack_manuel_fitness/", label: "Instagram" },
  { href: "https://www.tiktok.com/@jackmanuelfitness1", label: "TikTok" },
  { href: "https://www.facebook.com/jackmanuelfitness", label: "Facebook" },
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#train", label: "Programs" },
  { href: "#clients", label: "Clients" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#book", label: "Book" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="border-b border-border bg-elevated/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Fastest way to reach us
            </p>
            <p className="mt-1 font-display text-2xl tracking-wide text-fg sm:text-3xl uppercase">
              Message the desk on WhatsApp
            </p>
            <p className="mt-1 text-sm text-muted">
              Bookings Lead: {BOOKINGS_LEAD} · {PHONE_PRIMARY_DISPLAY}
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-900/50 active:scale-95"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            Open WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-1">
          <p className="font-display text-2xl tracking-wide text-fg">JACK MANUEL FITNESS</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Jack Manuel Fitness Limited. Raw power coaching, group sessions, and brand work from
            Lagos, Nigeria.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors duration-150 hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Navigate
          </p>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition-colors duration-150 hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Contact
          </p>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <p className="text-subtle text-xs uppercase tracking-wider mb-0.5">Bookings</p>
              <a href={`tel:${PHONE_PRIMARY_TEL}`} className="text-muted transition-colors hover:text-fg">
                {PHONE_PRIMARY_DISPLAY}
              </a>
              <span className="text-subtle"> · </span>
              <a href={`tel:${PHONE_ALT_TEL}`} className="text-muted transition-colors hover:text-fg">
                {PHONE_ALT_DISPLAY}
              </a>
            </li>
            <li>
              <p className="text-subtle text-xs uppercase tracking-wider mb-0.5">Email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted transition-colors hover:text-fg break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <p className="text-subtle text-xs uppercase tracking-wider mb-0.5">Location</p>
              <span className="text-muted">Lagos, Nigeria</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 sm:px-6">
        <p className="text-center text-xs text-subtle">
          © {new Date().getFullYear()} Jack Manuel Fitness Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
