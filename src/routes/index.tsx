import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  Dumbbell,
  Flame,
  Quote,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BookForm } from "@/components/site/book-form";
import { JackBot } from "@/components/site/jack-bot";
import { HeroSlideshow } from "@/components/site/hero-slideshow";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";
import { Button } from "@/components/ui/button";
import { Reveal, AnimatedCounter } from "@/components/ui/reveal";
import {
  BOOKINGS_LEAD,
  CONTACT_EMAIL,
  PHONE_ALT_DISPLAY,
  PHONE_ALT_TEL,
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_TEL,
  WHATSAPP_URL,
} from "@/lib/contact";

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-amber-400 via-fg to-amber-400 shadow-[0_0_8px_rgba(234,179,8,0.6)] transition-none"
      style={{ width: `${progress}%`, transformOrigin: "left" }}
    />
  );
}

/* ── Section Divider — animated line that draws on scroll ── */
function SectionDivider({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-4 sm:px-6" aria-hidden="true">
      <div className="mx-auto max-w-6xl">
        <div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
          style={{
            transform: drawn ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: `transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({ component: Home });

const STATS = [
  { isCounter: true, end: 12, suffix: "+", label: "Years coaching" },
  { value: "1:1", label: "And group sessions" },
  { value: "Ltd", label: "Registered in Nigeria" },
  { value: "Lagos", label: "Train here or on-site" },
];

const PROGRAMS = [
  {
    icon: Dumbbell,
    title: "1:1 coaching",
    tag: "Individual Mastery",
    copy: "Private sessions with Jack. Strength, conditioning, and a plan you can keep. For beginners through serious athletes.",
  },
  {
    icon: Zap,
    title: "Raw power",
    tag: "Functional Output",
    copy: "Functional strength: load, grip, carry, and real output. Built for people who want results they can feel, not a filter.",
  },
  {
    icon: Users,
    title: "Group training",
    tag: "Hustle Gang",
    copy: "Hustle Gang sessions. High energy, clear programming, and a room that actually works. Teams and small groups welcome.",
  },
  {
    icon: Shield,
    title: "Brand & events",
    tag: "Campaigns & Stage",
    copy: "Appearances, activations, content, and live demos. Book Jack for campaigns, launches, and stages that need real strength.",
  },
];

const CLIENTS = [
  {
    icon: Flame,
    title: "Individuals",
    badge: "Personal Growth",
    copy: "Get stronger, move better, and stay consistent. Sessions in Lagos, with a program you can run between visits.",
  },
  {
    icon: Users,
    title: "Teams",
    badge: "Squad Energy",
    copy: "Offsites, squads, and friend groups who want a session that is not a gimmick. We run the room. You show up.",
  },
  {
    icon: Building2,
    title: "Brands",
    badge: "Commercial",
    copy: "Product launches, fitness campaigns, and talent bookings. One point of contact. Clear brief. On-time delivery.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Send the brief",
    copy: "Tell us the goal, dates, and whether this is training or a booking.",
  },
  {
    n: "02",
    title: "We confirm",
    copy: "The team replies on WhatsApp with availability, location, and rate.",
  },
  {
    n: "03",
    title: "You train",
    copy: "Show up. Do the work. Leave stronger than you arrived.",
  },
];

const MARQUEE_ITEMS_1 = [
  "RAW POWER",
  "FUNCTIONAL STRENGTH",
  "1:1 COACHING",
  "HUSTLE GANG SESSIONS",
  "NO SHORTCUTS",
  "LAGOS NIGERIA",
  "HEAVY IRON",
  "MINDSET FIRST",
  "PROVEN RESULTS",
  "BRAND ACTIVATIONS",
];

const MARQUEE_ITEMS_2 = [
  "DISCIPLINE OVER EXCUSES",
  "UNSTOPPABLE DRIVE",
  "LOAD · GRIP · CARRY",
  "HIGH VOLTAGE ENERGY",
  "LAGOS FITNESS CULTURE",
  "REAL WORK · REAL OUTPUT",
  "RAW POWER",
  "NEVER SETTLE",
];

const COACH_PILLS = [
  "12+ Years Discipline",
  "Ebonyi State Native",
  "Raw Power & Grip",
  "Zero Gimmicks",
  "Lagos Based",
];

const TESTIMONIALS = [
  {
    quote: "Jack doesn't let you cheat the rep. Six months in and I'm deadlifting things I thought were impossible. The programming is serious.",
    name: "Emeka O.",
    role: "1:1 Coaching · Lagos Island",
    stars: 5,
  },
  {
    quote: "We booked Jack for our company offsite. The whole team showed up, worked hard, and left with something to prove. He runs a tight room.",
    name: "Tolu A.",
    role: "Group Session · Corporate Team",
    stars: 5,
  },
  {
    quote: "The brand activation Jack did for our product launch was electric. Real strength, real crowd energy. Our agency is still talking about it.",
    name: "Chisom N.",
    role: "Brand Appearance · Lagos Mainland",
    stars: 5,
  },
  {
    quote: "I was a complete beginner. Jack built a plan, explained everything, and never made me feel behind. I'm now consistent for the first time in my life.",
    name: "Fatima K.",
    role: "1:1 Coaching · Abuja (remote plan)",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "Where are sessions held?",
    a: "Our primary base is Lagos, Nigeria. 1:1 and group sessions run at our Lagos HQ or can be arranged on-site at your facility. Remote programming is also available.",
  },
  {
    q: "What does a session cost?",
    a: "Rates vary by session type and frequency. 1:1 sessions start at ₦25,000 per session with discounts for block bookings. Group sessions and brand bookings are quoted per brief. Send a request and we'll respond with exact pricing within 24 hours.",
  },
  {
    q: "Do I need to be fit already?",
    a: "No. Jack works with complete beginners through competitive athletes. The first session is an assessment — we build the plan around where you are, not where you think you should be.",
  },
  {
    q: "How do I book group training or a brand appearance?",
    a: "Use the form below or message the desk on WhatsApp with your brief — dates, headcount (for groups) or event details (for brand work). We'll confirm availability and rate same day.",
  },
  {
    q: "Can I get a remote training plan?",
    a: "Yes. Jack provides structured programming for clients who can't train in-person in Lagos. Plans are built to your equipment, schedule, and goals. Book via the form and flag it as remote.",
  },
];


/* ── FAQ Accordion Item ── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-b border-border transition-colors duration-200 ${
        open ? "border-fg/20" : ""
      }`}
    >
      <button
        type="button"
        id={`faq-${index}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium text-fg sm:text-lg">{q}</span>
        <ChevronDown
          className={`mt-0.5 size-5 shrink-0 text-muted transition-transform duration-300 ${
            open ? "rotate-180 text-fg" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted sm:text-base">{a}</p>
      )}
    </div>
  );
}

function Home() {
  return (
    <div id="top" className="min-h-screen bg-bg text-fg selection:bg-fg selection:text-bg">
      <JackBot />
      <MobileStickyCta />
      <ScrollProgress />
      <Header />
      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[92svh] md:min-h-[100svh] overflow-hidden bg-bg flex items-center">
          {/* Animated Background Slideshow with Smooth Crossfade & Zoom */}
          <HeroSlideshow />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
            {/* Live Availability Badge */}
            <div className="hero-animate-1">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-fg backdrop-blur-md shadow-lg shadow-black/40">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="uppercase tracking-[0.2em] text-muted text-[11px]">
                  Jack Manuel Fitness Limited · Lagos
                </span>
              </div>
            </div>

            {/* Giant Typographic Headline */}
            <div className="hero-animate-2">
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,11vw,7.5rem)] leading-[0.88] tracking-wide text-fg drop-shadow-sm uppercase">
                {"My strength is my superpower".split(" ").map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="hero-word inline-block pr-[0.18em]"
                    style={{ animationDelay: `${180 + i * 90}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* Subheading */}
            <div className="hero-animate-3">
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Raw power coaching, group sessions, and brand work. Book Jack for training that is
                real — or a stage that needs the same voltage.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hero-animate-4">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="group btn-ripple shadow-lg shadow-white/5 relative overflow-hidden min-h-[52px]">
                  <a href="#book" className="flex items-center gap-2">
                    <span>Book a session</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" className="hover:border-fg/40 transition-colors min-h-[52px]">
                  <a href="#train">See programs</a>
                </Button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-animate-5">
              <a
                href="#about"
                className="group mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-fg"
              >
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                <span>Scroll to explore</span>
              </a>
            </div>
          </div>
        </section>

        {/* KINETIC MARQUEE BANNER 1 */}
        <div className="overflow-hidden border-y border-border bg-elevated/80 py-3.5 backdrop-blur-sm select-none">
          <div className="animate-marquee flex items-center gap-8 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            {[...MARQUEE_ITEMS_1, ...MARQUEE_ITEMS_1, ...MARQUEE_ITEMS_1].map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
                <span className="hover:text-fg transition-colors">{item}</span>
                <span className="size-1 rounded-full bg-border" />
              </span>
            ))}
          </div>
        </div>

        {/* STATS SECTION */}
        <section className="border-b border-border bg-surface relative overflow-hidden">
          <div className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />
          <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 relative">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60} direction="up">
                <div
                  className={`group p-5 sm:px-8 sm:py-8 transition-all duration-300 hover:bg-elevated/60 active:bg-elevated/60 ${
                    i % 2 === 1 ? "border-l border-border" : ""
                  } ${i > 1 ? "border-t border-border md:border-t-0" : ""} md:border-l md:first:border-l-0`}
                >
                  <p className="font-display text-3xl sm:text-5xl tracking-wide text-fg transition-transform duration-300 group-hover:scale-105 inline-block">
                    {stat.isCounter ? (
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-sm font-medium text-muted uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* COACH / ABOUT SECTION (Updated with jack-coach.jpg & High-End Visuals) */}
        <section id="about" className="scroll-mt-20 relative overflow-hidden py-24 sm:py-32">
          <div className="bg-radial-coach absolute inset-0 pointer-events-none" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 relative">
            
            {/* Left Column: Coach Bio */}
            <div className="lg:col-span-7">
              <Reveal direction="left" duration={600}>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg mb-4">
                  <Flame className="size-3.5 text-amber-500 fill-amber-500/20" />
                  <span className="uppercase tracking-[0.2em] text-[11px] text-muted">
                    Head Coach & Founder
                  </span>
                </div>
                <h2 className="font-display text-5xl tracking-wide text-fg sm:text-6xl md:text-7xl uppercase">
                  Okoro Ogbonna
                </h2>
                <p className="mt-2 font-display text-2xl tracking-wide text-muted uppercase">
                  Jack Manuel · The Power Engine
                </p>
              </Reveal>

              <Reveal delay={150} direction="left" duration={600}>
                <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                  Founder and CEO of <span className="text-fg font-medium">Jack Manuel Fitness Limited</span>. 
                  Originally from Ebonyi State. Twelve years of unrelenting discipline, early morning sessions, 
                  heavy iron, and an athletic standard that never fakes the work.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Strength is real. Not a social media filter. Jack trains individuals and teams for raw 
                  power, durable joints, and functional output — the kind that carries heavy load when it 
                  counts most. Clients come for guaranteed progression. Brands come for an undeniable 
                  commanding presence that cannot be staged.
                </p>
              </Reveal>

              {/* Coach Credential Chips */}
              <Reveal delay={250} direction="left" duration={600}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {COACH_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-fg shadow-sm hover:border-fg/40 transition-colors"
                    >
                      <CheckCircle2 className="size-3 text-emerald-400" />
                      {pill}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Highlight Quote Box */}
              <Reveal delay={350} direction="up" duration={600}>
                <div className="mt-8 rounded-xl border border-border/80 bg-elevated/60 p-5 backdrop-blur-sm relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm italic text-fg">
                        “We don’t compromise on the standard. When you step into my session, you leave your excuses at the door.”
                      </p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
                        — Jack Manuel, Founder & Head Coach
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Coach Photo with jack-coach.jpg & Athletic Framing */}
            <div className="lg:col-span-5">
              <Reveal direction="right" duration={700} delay={100}>
                <div className="group relative mx-auto max-w-md lg:max-w-none">
                  {/* Subtle Background Glow behind the card */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-fg/15 to-transparent opacity-50 blur-lg transition duration-500 group-hover:opacity-80" />
                  
                  {/* Photo Container */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                    <img
                      src="/images/jack-coach.jpg"
                      alt="Coach Okoro Ogbonna (Jack Manuel) coaching in Lagos"
                      loading="lazy"
                      decoding="async"
                      className="h-[340px] sm:h-[460px] lg:h-[520px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                    />
                    
                    {/* Dark gradient overlay at the base of the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

                    {/* Floating Bottom Badge — animates on mobile */}
                    <div className="badge-float absolute bottom-4 inset-x-4 flex items-center justify-between rounded-lg border border-white/10 bg-bg/80 p-3.5 backdrop-blur-md shadow-lg">
                      <div>
                        <p className="font-display text-base sm:text-lg tracking-wide text-fg uppercase leading-none">
                          Okoro Ogbonna
                        </p>
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">
                          Lagos · Nigeria
                        </p>
                      </div>
                      <div className="flex size-9 items-center justify-center rounded-md bg-white/10 text-fg">
                        <Trophy className="size-4 text-amber-400" />
                      </div>
                    </div>

                    {/* Top corner badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-bg/75 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-fg backdrop-blur-md">
                        <Award className="size-3 text-amber-400" />
                        Master Trainer
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* PROGRAMS SECTION */}
        <section id="train" className="scroll-mt-20 border-t border-border bg-surface relative overflow-hidden py-24 sm:py-32">
          <div className="bg-grid-pattern absolute inset-0 opacity-30 pointer-events-none" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
            <Reveal direction="up">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Programs</p>
              <h2 className="mt-3 max-w-xl font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase">
                We do not train for the mirror
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                We train for the mindset. Clear programs. Honest coaching. Book the lane that fits.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {PROGRAMS.map((p, index) => (
                <Reveal key={p.title} delay={index * 100} direction="up">
                  <article
                    className="group shimmer-card flex flex-col justify-between rounded-xl border border-border bg-elevated/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-fg/40 hover:bg-elevated hover:shadow-xl hover:shadow-black/40 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-surface transition-transform duration-300 group-hover:scale-110 group-hover:border-fg/30">
                          <p.icon className="size-5 text-fg transition-colors group-hover:text-amber-400" strokeWidth={1.75} />
                        </div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted/80 rounded-full border border-border/60 bg-surface/50 px-2.5 py-0.5">
                          {p.tag}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-3xl sm:text-4xl tracking-wide text-fg uppercase">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {p.copy}
                      </p>
                    </div>

                    <a
                      href="#book"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg underline-offset-4 hover:underline group/link"
                    >
                      <span>Request this program</span>
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* KINETIC MARQUEE BANNER 2 */}
        <SectionDivider />
        <div className="overflow-hidden border-y border-border bg-bg py-3.5 select-none">
          <div className="animate-marquee-reverse flex items-center gap-8 text-xs font-semibold tracking-[0.25em] text-muted/80 uppercase">
            {[...MARQUEE_ITEMS_2, ...MARQUEE_ITEMS_2, ...MARQUEE_ITEMS_2].map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
                <span className="hover:text-fg transition-colors">{item}</span>
                <span className="size-1 rounded-full bg-border" />
              </span>
            ))}
          </div>
        </div>

        {/* CLIENTS SECTION */}
        <section id="clients" className="scroll-mt-20 py-24 sm:py-32 relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal direction="up">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Clients</p>
              <h2 className="mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase">
                Who this is for
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {CLIENTS.map((c, idx) => (
                <Reveal key={c.title} delay={idx * 100} direction="up">
                  <article className="group rounded-xl border border-border bg-surface/80 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-fg/40 hover:bg-surface hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-elevated transition-transform duration-300 group-hover:scale-110">
                        <c.icon className="size-5 text-fg transition-colors group-hover:text-amber-400" strokeWidth={1.75} />
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
                        {c.badge}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl tracking-wide text-fg uppercase">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* 3-Step Simple Process */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, idx) => (
                <Reveal key={s.n} delay={idx * 100} direction="up">
                  <div className="group border-t border-border pt-6 transition-colors duration-300 hover:border-fg">
                    <p className="font-display text-3xl tracking-wide text-muted transition-colors duration-300 group-hover:text-fg">
                      {s.n}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-fg">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider delay={100} />

        {/* PHOTO GALLERY & MANIFESTO QUOTE */}
        <section className="border-t border-border py-16 sm:py-32 bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* 2-column main image + 2×2 thumbnail grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
              <Reveal direction="up" className="md:col-span-2">
                <figure className="group relative overflow-hidden rounded-xl border border-border bg-surface">
                  <img
                    src="/images/barbell-chalk.jpg"
                    alt="Chalk dust on a knurled barbell"
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover sm:h-80 md:h-72 lg:h-80 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-wider text-muted font-medium">
                    <span>Precision & Grip</span>
                    <span>Lagos HQ</span>
                  </div>
                </figure>
              </Reveal>

              {/* Thumbnail column — 3 stacked on desktop */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-1">
                <Reveal direction="up" delay={80}>
                  <figure className="group relative overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                      src="/images/kettlebell.jpg"
                      alt="Kettlebell and iron chain on concrete"
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-full object-cover sm:h-32 md:h-24 lg:h-28 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted font-medium">
                      Functional Load
                    </div>
                  </figure>
                </Reveal>

                <Reveal direction="up" delay={140}>
                  <figure className="group relative overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                      src="/images/plates.jpg"
                      alt="Stacked iron plates on a gym floor"
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-full object-cover sm:h-32 md:h-24 lg:h-28 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted font-medium">
                      Heavy Iron
                    </div>
                  </figure>
                </Reveal>

                <Reveal direction="up" delay={200}>
                  <figure className="group relative overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                      src="/images/squat-rack.jpg"
                      alt="Loaded squat rack on the gym floor"
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-full object-cover sm:h-32 md:h-24 lg:h-28 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted font-medium">
                      The rack
                    </div>
                  </figure>
                </Reveal>
              </div>
            </div>

            {/* Powerful Big Quote */}
            <Reveal direction="up" delay={150}>
              <blockquote className="mt-14 max-w-3xl border-l-2 border-fg pl-6 py-1">
                <p className="font-display text-3xl leading-tight tracking-wide text-fg sm:text-5xl uppercase">
                  Believe in yourself. There is no limit to what you can achieve.
                </p>
                <footer className="mt-4 flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-muted">
                  <span className="size-1.5 rounded-full bg-amber-400" />
                  <span>Okoro Ogbonna (Jack Manuel)</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <SectionDivider delay={100} />

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="scroll-mt-20 py-24 sm:py-32 relative overflow-hidden">
          <div className="bg-radial-coach absolute inset-0 pointer-events-none opacity-60" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
            <Reveal direction="up">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Results</p>
              <h2 className="mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase">
                What clients say
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {TESTIMONIALS.map((t, idx) => (
                <Reveal key={t.name} delay={idx * 80} direction="up">
                  <article className="group shimmer-card relative rounded-xl border border-border bg-elevated/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-fg/30 hover:shadow-xl hover:shadow-black/40 h-full flex flex-col justify-between">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="size-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="flex-1">
                      <Quote className="size-7 text-fg/10 mb-3" />
                      <p className="text-base leading-relaxed text-muted italic">"{t.quote}"</p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
                      <div className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-xs font-display tracking-wide text-fg">
                        {t.name.split(" ")[0][0]}{t.name.split(" ")[1]?.[0] ?? ""}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-fg">{t.name}</p>
                        <p className="text-xs text-muted">{t.role}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider delay={200} />

        {/* FAQ SECTION */}
        <section id="faq" className="scroll-mt-20 border-t border-border py-24 sm:py-32 bg-surface/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <Reveal direction="left">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">FAQ</p>
                  <h2 className="mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase">
                    Got questions
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    Everything you need to know before you book.
                    Still not sure? WhatsApp the desk — we reply fast.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Ask on WhatsApp
                  </a>
                </Reveal>
              </div>
              <div>
                <Reveal direction="right" delay={100}>
                  <div className="divide-y divide-border rounded-xl border border-border bg-elevated/50 px-6 sm:px-8">
                    {FAQS.map((faq, idx) => (
                      <FAQItem key={faq.q} q={faq.q} a={faq.a} index={idx} />
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider delay={200} />

        {/* BOOKING SECTION */}
        <section id="book" className="scroll-mt-20 border-t border-border bg-surface py-24 sm:py-32 relative overflow-hidden">
          <div className="bg-grid-pattern absolute inset-0 opacity-30 pointer-events-none" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 relative">
            <div>
              <Reveal direction="left">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Book</p>
                <h2 className="mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl md:text-7xl uppercase">
                  Start here
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  Training, group sessions, and brand bookings. Send your brief and we reply with
                  availability and exact pricing. 1:1 sessions from ₦25,000 — block bookings
                  and group rates available. Lagos-based. Travel by arrangement.
                </p>
              </Reveal>

              <Reveal direction="left" delay={150}>
                <div className="mt-8 rounded-xl border border-border bg-elevated/60 p-6 backdrop-blur-sm">
                  <p className="text-xs font-medium uppercase tracking-wider text-fg mb-4">
                    Direct Contact Channels
                  </p>
                  <ul className="space-y-3.5 text-sm text-muted">
                    <li className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <span>Bookings Lead: {BOOKINGS_LEAD}</span>
                      <a
                        className="text-fg font-medium underline-offset-4 hover:underline"
                        href={`tel:${PHONE_PRIMARY_TEL}`}
                      >
                        {PHONE_PRIMARY_DISPLAY}
                      </a>
                    </li>
                    <li className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <span>Alt. phone:</span>
                      <a
                        className="text-fg font-medium underline-offset-4 hover:underline"
                        href={`tel:${PHONE_ALT_TEL}`}
                      >
                        {PHONE_ALT_DISPLAY}
                      </a>
                    </li>
                    <li className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <span>Official Email:</span>
                      <a
                        className="text-fg font-medium underline-offset-4 hover:underline"
                        href={`mailto:${CONTACT_EMAIL}`}
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </li>
                    <li className="flex items-center justify-between gap-2 pt-1">
                      <span>Instant WhatsApp:</span>
                      <a
                        className="inline-flex items-center gap-1.5 text-emerald-400 font-medium underline-offset-4 hover:underline"
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Message the desk
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={100}>
              <BookForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
