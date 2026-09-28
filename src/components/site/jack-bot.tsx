import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { X, Send, Bot, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  BOOKINGS_LEAD,
  CONTACT_EMAIL,
  PHONE_ALT_DISPLAY,
  PHONE_PRIMARY_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";

/* ─────────────────────────────────────────────
   JACK-BOT BRAIN — keyword → response engine
   ───────────────────────────────────────────── */

type Reply = { text: string; chips?: string[] };

const GREETINGS = [
  "Oya, talk to me. What do you need?",
  "The Power Engine is online. What's the brief?",
  "Jack Manuel here. No time for small talk. What's your goal?",
  "I was in the middle of a set but you have my attention. What's up?",
  "Welcome. Drop the excuses at the door — what can I do for you?",
];

const FALLBACKS = [
  "Hmm. That's not a question I trained for. But I never skip leg day, and I'm not skipping your question either — try asking about sessions, pricing, or location.",
  "I'm a fitness coach, not a philosopher. But I respect the curiosity. Ask me something I can sweat on.",
  "My AI is strong but my English has limits. Ask me about training, booking, or programs — I'll be more useful.",
  "Even I don't have an answer for that. And I can deadlift twice my bodyweight. Ask about sessions or booking.",
  "That question needs a different coach. Try asking me about the programs, pricing, or how to book.",
];

const RULES: { keywords: string[]; replies: Reply[] }[] = [
  {
    keywords: ["price", "cost", "how much", "fee", "rate", "charge", "expensive", "money", "naira", "₦"],
    replies: [
      {
        text: "1:1 sessions start at ₦25,000. Block bookings come with a discount because commitment deserves reward. Group sessions and brand appearances are quoted per brief.\n\nWant exact pricing? Send me your goal and I'll give you a number.",
        chips: ["Book a session", "Tell me about group training", "What do I get for ₦25k?"],
      },
      {
        text: "You want price? Fine. ₦25,000 per 1:1 session. That is less than what people spend on fried chicken and excuses in a week.\n\nBlock bookings are cheaper. Drop your brief in the form below.",
        chips: ["Block booking discount?", "How many sessions do I need?"],
      },
    ],
  },
  {
    keywords: ["location", "where", "address", "place", "gym", "lagos", "mainland", "island", "abuja", "remote"],
    replies: [
      {
        text: "We operate from Lagos — both Mainland and Island sessions are available. I also do on-site visits to your facility.\n\nAbuja? Remote programming. I write the plan, you execute. No excuses about geography.",
        chips: ["Can I train remotely?", "Do you do home sessions?", "Book a session"],
      },
    ],
  },
  {
    keywords: ["beginner", "new", "start", "never", "first time", "scared", "nervous", "unfit", "out of shape"],
    replies: [
      {
        text: "Scared? Good. That means you know this is real.\n\nI've taken people from zero to deadlifting serious weight. You don't need to be fit to START. You just need to START.\n\nFirst session is an assessment — no judgment, just data.",
        chips: ["Book first session", "What happens in assessment?", "I'm really out of shape though"],
      },
    ],
  },
  {
    keywords: ["i'm really out of shape", "really unfit", "very unfit", "too unfit"],
    replies: [
      {
        text: "Brother/Sister — I have seen EVERYTHING walk through my door. There is no 'too unfit' here. There is only 'too comfortable with excuses.'\n\nBook the session. I'll handle the rest. 💪",
        chips: ["Okay fine, how do I book?", "What if I can't keep up?"],
      },
    ],
  },
  {
    keywords: ["excuse", "busy", "no time", "can't", "cannot", "tired", "lazy"],
    replies: [
      {
        text: "Busy? I wake up at 5am. Tired? A bar of iron doesn't care about your feelings. No time? You have time to be asking me questions right now.\n\nLet's schedule around YOUR life. That's what 1:1 is for.",
        chips: ["How long are sessions?", "Early morning sessions?", "Weekend training?"],
      },
    ],
  },
  {
    keywords: ["how long", "duration", "session length", "minutes", "hours"],
    replies: [
      {
        text: "1:1 sessions run 60–90 minutes. Enough time to work, sweat, and feel what real training is.\n\nGroup sessions are 60 minutes. If you're not done in 60 minutes, you were not working hard enough.",
        chips: ["What happens in a session?", "Book a session", "Is 60 mins enough?"],
      },
    ],
  },
  {
    keywords: ["program", "training plan", "workout plan", "what do you train", "training style", "method"],
    replies: [
      {
        text: "I train for real-world strength. Compound lifts. Functional movement. Grip, load, carry.\n\nNo mirror-chasing. No gimmicks. Programs are built around your body, your goal, and your timeline. Not a generic template from the internet.",
        chips: ["What is Raw Power?", "Do you do cardio?", "Book a session"],
      },
    ],
  },
  {
    keywords: ["cardio", "running", "fat loss", "weight loss", "slim", "burn fat"],
    replies: [
      {
        text: "Cardio? I don't hate cardio. But I'll tell you what burns more calories than a 30-minute jog — a properly loaded strength session.\n\nFat loss is a byproduct of building something. We build strength here. The fat leaves on its own.",
        chips: ["I just want to lose weight", "Strength vs cardio?", "Book a session"],
      },
    ],
  },
  {
    keywords: ["i just want to lose weight", "only weight loss", "just fat loss"],
    replies: [
      {
        text: "Okay. I hear you. But here's what happens — people who 'just want to lose weight' come to me, and six months later they're hooked on how strong they've become.\n\nLet's start with your goal and see what the body decides it wants.",
        chips: ["Sounds good, how do I start?", "What's the first session like?"],
      },
    ],
  },
  {
    keywords: ["group", "team", "corporate", "offsite", "squad", "friends", "hustle gang"],
    replies: [
      {
        text: "HUSTLE GANG! Yes. Group sessions are high energy, well-programmed, and the room works.\n\nTeams, friend squads, corporate offsites — all welcome. Send the headcount and date and I'll quote you.",
        chips: ["How many people minimum?", "Corporate offsite pricing", "Book group session"],
      },
    ],
  },
  {
    keywords: ["brand", "appearance", "event", "campaign", "activation", "influencer", "endorsement", "stage"],
    replies: [
      {
        text: "You want real strength on stage? A face that commands a room without trying?\n\nI do brand activations, product launches, fitness campaigns, and live demos. One brief. On-time delivery. Real presence you cannot fake with editing.",
        chips: ["Book brand appearance", "What events have you done?", "Tell me the rates"],
      },
    ],
  },
  {
    keywords: ["book", "booking", "schedule", "appointment", "reserve", "how to book", "sign up"],
    replies: [
      {
        text: `Simple. Two ways:\n\n1️⃣ Fill the form at the bottom of this page — name, number, what you need.\n2️⃣ Message the desk directly on WhatsApp or call: ${PHONE_PRIMARY_DISPLAY} (${BOOKINGS_LEAD})\nAlt: ${PHONE_ALT_DISPLAY}\n\nWe reply with availability and rate. No back-and-forth drama.`,
        chips: ["Go to booking form", "WhatsApp now", "What info do I need?"],
      },
    ],
  },
  {
    keywords: ["whatsapp", "contact", "call", "phone", "email", "reach", "message"],
    replies: [
      {
        text: `Fastest path to Jack's team:\n\n📱 WhatsApp / Tel: ${PHONE_PRIMARY_DISPLAY} (${BOOKINGS_LEAD} — Bookings Lead)\n📞 Alt phone: ${PHONE_ALT_DISPLAY}\n📧 Email: ${CONTACT_EMAIL}\n\nWhatsApp gets the fastest reply. Always.`,
        chips: ["Open WhatsApp now", "Book via form instead"],
      },
    ],
  },
  {
    keywords: ["who is jack", "about jack", "who are you", "tell me about yourself", "background", "story", "history"],
    replies: [
      {
        text: "Okoro Ogbonna. Born in Ebonyi State. 12+ years of early mornings, heavy iron, and zero shortcuts.\n\nFounder and CEO of Jack Manuel Fitness Limited. Lagos-based. Real strength is my product.\n\nNo filters. No gimmicks. Just results.",
        chips: ["How many years experience?", "What makes you different?", "Book a session"],
      },
    ],
  },
  {
    keywords: ["what makes you different", "why jack", "why choose you", "better than", "other trainers"],
    replies: [
      {
        text: "Most trainers count your reps and take your money.\n\nI build programming around YOUR body, adjust when you plateau, and hold you accountable without being annoying about it.\n\nAlso — 12 years. Not 12 months. There is a difference.",
        chips: ["Okay I'm convinced", "Book a session", "Tell me the pricing"],
      },
    ],
  },
  {
    keywords: ["nutrition", "diet", "food", "eat", "meal", "protein", "supplement"],
    replies: [
      {
        text: "I train you to move and lift. For detailed nutrition plans you should see a registered dietitian — I respect that boundary.\n\nBUT. I will tell you this for free: eat real food, enough protein, drink water. That handles 80% of it.",
        chips: ["Okay what about the training?", "Book a session"],
      },
    ],
  },
  {
    keywords: ["weekend", "saturday", "sunday", "morning", "evening", "night", "time", "when"],
    replies: [
      {
        text: "Sessions are available during the week and weekends. Morning, afternoon, and evening slots exist — exact availability depends on current bookings.\n\nSend your preferred times in the brief and we'll match what's open.",
        chips: ["Book now", "WhatsApp to check times"],
      },
    ],
  },
  {
    keywords: ["funny", "joke", "laugh", "entertain", "boring", "serious"],
    replies: [
      {
        text: "You want jokes? Here's one: someone told me they couldn't afford training but they ordered Uber Eats three times this week.\n\nThat's the funniest thing I've heard all year.\n\nNow — you booking or not? 😂",
        chips: ["Okay fine, I'll book", "Tell me another one"],
      },
    ],
  },
  {
    keywords: ["tell me another one", "another joke", "more jokes"],
    replies: [
      {
        text: "Man came to me saying he 'tried the gym once.' ONCE.\n\nI tried cooking once too. Didn't mean I stopped eating.\n\nConsistency is not a gym word — it's a life word. Come train. 💪",
        chips: ["Book a session", "Okay you got me"],
      },
    ],
  },
  {
    keywords: ["okay you got me", "convinced", "sold", "let's do this", "i'm in", "sign me up"],
    replies: [
      {
        text: "THAT'S WHAT I'M TALKING ABOUT! 🔥\n\nScroll to the booking form below. Name, number, what you need. We reply fast.\n\nSee you on the other side of your excuses.",
        chips: ["Go to booking form", "WhatsApp instead"],
      },
    ],
  },
  {
    keywords: ["what if i can't keep up", "too hard", "too difficult", "overwhelmed"],
    replies: [
      {
        text: "Can't keep up? That's the point. You're supposed to be challenged.\n\nBut I don't push people off a cliff — I push them to the edge of what THEY can do, then a little past it. Safely. With a plan.\n\nThat's how the body grows.",
        chips: ["Book first session", "What does first session look like?"],
      },
    ],
  },
  {
    keywords: ["instagram", "social media", "tiktok", "facebook", "follow"],
    replies: [
      {
        text: "You want to see the work? Fair.\n\n📸 Instagram: @jack_manuel_fitness\n🎵 TikTok: @jackmanuelfitness1\n📘 Facebook: Jack Manuel Fitness\n\nFollow. But don't just watch — book.",
        chips: ["Book a session", "Go to booking form"],
      },
    ],
  },
];

/* ─── Engine ─── */
function getBotReply(input: string): Reply {
  const normalized = input.toLowerCase().trim();

  // Greeting detection
  const greetWords = ["hi", "hello", "hey", "sup", "oya", "good morning", "good afternoon", "good evening", "hola"];
  if (greetWords.some((g) => normalized === g || normalized.startsWith(g + " ") || normalized.startsWith(g + ","))) {
    return { text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)], chips: ["Pricing", "Book a session", "Where are you based?", "Who is Jack?"] };
  }

  // Keyword match
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      const r = rule.replies[Math.floor(Math.random() * rule.replies.length)];
      return r;
    }
  }

  // Fallback
  return {
    text: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)],
    chips: ["Pricing", "Book a session", "Where are you based?", "Tell me about programs"],
  };
}

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */
type Message = { id: number; from: "jack" | "user"; text: string; chips?: string[] };

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    from: "jack",
    text: "Oya, talk to me. What do you need? 💪",
    chips: ["Pricing", "Book a session", "Where are you based?", "Who is Jack?"],
  },
];

let msgCounter = 10;
const nextId = () => ++msgCounter;

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
export function JackBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
      inputRef.current?.focus();
      setHasNewMsg(false);
    }
  }, [open, messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId(), from: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate Jack "typing"
    const delay = 700 + Math.random() * 800;
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((m) => [...m, { id: nextId(), from: "jack", ...reply }]);
      setTyping(false);
      if (!open) setHasNewMsg(true);
    }, delay);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleChip(chip: string) {
    // Special chips that navigate
    if (chip === "Go to booking form") {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return;
    }
    if (chip === "WhatsApp now" || chip === "Open WhatsApp now") {
      window.open(WHATSAPP_URL, "_blank");
      return;
    }
    sendMessage(chip);
  }

  return (
    <>
      {/* FAB trigger */}
      <button
        type="button"
        id="jack-bot-fab"
        aria-label="Chat with Jack"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 right-4 z-[80] flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-[0.96] sm:bottom-8 sm:right-7 overflow-visible animate-fab-in",
          open
            ? "bg-fg text-bg"
            : "bg-bg border-2 border-border text-fg hover:border-fg/40 fab-pulse",
        )}
      >
        {open ? (
          <ChevronDown className="size-5" />
        ) : (
          <Bot className="size-6" />
        )}
        {hasNewMsg && !open && (
          <span className="absolute -top-1 -right-1 flex size-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-3.5 rounded-full bg-amber-400" />
          </span>
        )}
        {!open && (
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-muted pointer-events-none">
            Ask Jack
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="jack-bot-panel"
          className="fixed bottom-24 right-4 z-[79] w-[calc(100vw-2rem)] max-w-sm sm:right-7 sm:w-96 animate-bot-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl border border-b-0 border-border bg-elevated px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex size-9 items-center justify-center rounded-full border border-border bg-surface">
                <Zap className="size-4 text-amber-400 fill-amber-400/30" />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border border-elevated bg-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-fg leading-none">Jack Manuel Bot</p>
                <p className="text-[11px] text-muted mt-0.5">The Power Engine · Always online</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex size-7 items-center justify-center rounded-md text-muted hover:text-fg hover:bg-surface transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex max-h-80 flex-col gap-3 overflow-y-auto border-x border-border bg-bg px-4 py-4 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex flex-col gap-1.5", msg.from === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line msg-pop",
                    msg.from === "user"
                      ? "rounded-br-sm bg-fg text-bg"
                      : "rounded-bl-sm border border-border bg-elevated text-fg",
                  )}
                >
                  {msg.text}
                </div>
                {msg.from === "jack" && msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {msg.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChip(chip)}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted hover:border-fg/40 hover:text-fg transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-start">
                <div className="rounded-2xl rounded-bl-sm border border-border bg-elevated px-4 py-3">
                  <div className="flex gap-1">
                    <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:0ms]" />
                    <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:150ms]" />
                    <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 rounded-b-2xl border border-t border-border bg-elevated px-3 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Jack anything…"
              className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-subtle focus:outline-none"
              maxLength={300}
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
