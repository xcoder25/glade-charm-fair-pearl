import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PHONE_ALT_DISPLAY, c as PHONE_PRIMARY_TEL, d as whatsappUrlWithText, i as CONTACT_EMAIL, l as WHATSAPP_URL, n as BOOKING_SESSIONS, o as PHONE_ALT_TEL, s as PHONE_PRIMARY_DISPLAY, t as BOOKINGS_LEAD } from "./contact-DVXKDbBo.mjs";
import { t as createBooking } from "./bookings-G5smzzt6.mjs";
import { n as cn, t as Button } from "./button-jyh5vPuY.mjs";
import { C as ArrowRight, S as Award, _ as CircleCheck, b as Building2, c as Shield, d as Quote, f as MessageCircle, h as Dumbbell, i as Trophy, l as Send, m as Flame, n as X, o as Star, p as Menu, r as Users, s as Sparkles, t as Zap, v as ChevronDown, w as ArrowDown, x as Bot, y as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CQ-umcGQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#train",
		label: "Programs"
	},
	{
		href: "#clients",
		label: "Clients"
	},
	{
		href: "#testimonials",
		label: "Reviews"
	},
	{
		href: "#faq",
		label: "FAQ"
	},
	{
		href: "#book",
		label: "Book"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "bg-bg/85 backdrop-blur-md border-b border-border/80 shadow-lg shadow-black/20" : "bg-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "group flex items-center gap-2 font-display text-2xl tracking-wide text-fg transition-opacity hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JACK MANUEL" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					"aria-label": "Primary",
					children: [LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						className: "relative text-sm text-muted transition-colors duration-200 hover:text-fg after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-fg after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
						children: link.label
					}, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						className: "group ml-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#book",
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "md:hidden inline-flex size-11 items-center justify-center text-fg rounded-md hover:bg-surface transition-colors",
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "md:hidden border-t border-border bg-bg/95 backdrop-blur-lg px-4 pb-8 pt-3",
			"aria-label": "Mobile",
			children: [LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: link.href,
				className: "mobile-menu-item flex h-14 items-center text-base font-medium text-fg border-b border-border/40 hover:text-amber-400 active:text-amber-400 transition-colors",
				onClick: () => setOpen(false),
				children: link.label
			}, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-menu-item mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "w-full btn-ripple",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#book",
						onClick: () => setOpen(false),
						children: "Book a session"
					})
				})
			})]
		}) : null]
	});
}
var SOCIALS = [
	{
		href: "https://www.instagram.com/jack_manuel_fitness/",
		label: "Instagram"
	},
	{
		href: "https://www.tiktok.com/@jackmanuelfitness1",
		label: "TikTok"
	},
	{
		href: "https://www.facebook.com/jackmanuelfitness",
		label: "Facebook"
	}
];
var NAV_LINKS = [
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#train",
		label: "Programs"
	},
	{
		href: "#clients",
		label: "Clients"
	},
	{
		href: "#testimonials",
		label: "Reviews"
	},
	{
		href: "#faq",
		label: "FAQ"
	},
	{
		href: "#book",
		label: "Book"
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-elevated/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.2em] text-muted",
							children: "Fastest way to reach us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl tracking-wide text-fg sm:text-3xl uppercase",
							children: "Message the desk on WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"Bookings Lead: ",
								BOOKINGS_LEAD,
								" · ",
								PHONE_PRIMARY_DISPLAY
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: WHATSAPP_URL,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-900/50 active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-white" })]
						}), "Open WhatsApp"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tracking-wide text-fg",
								children: "JACK MANUEL FITNESS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xs text-sm leading-relaxed text-muted",
								children: "Jack Manuel Fitness Limited. Raw power coaching, group sessions, and brand work from Lagos, Nigeria."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 flex flex-wrap gap-x-5 gap-y-2",
								children: SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: s.href,
									target: "_blank",
									rel: "noreferrer",
									className: "text-sm text-muted transition-colors duration-150 hover:text-fg",
									children: s.label
								}, s.href))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted",
						children: "Navigate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2.5",
						children: NAV_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: l.href,
							className: "text-sm text-muted transition-colors duration-150 hover:text-fg",
							children: l.label
						}) }, l.href))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "flex flex-col gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-subtle text-xs uppercase tracking-wider mb-0.5",
									children: "Bookings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${PHONE_PRIMARY_TEL}`,
									className: "text-muted transition-colors hover:text-fg",
									children: PHONE_PRIMARY_DISPLAY
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: " · "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${PHONE_ALT_TEL}`,
									className: "text-muted transition-colors hover:text-fg",
									children: PHONE_ALT_DISPLAY
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-subtle text-xs uppercase tracking-wider mb-0.5",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${CONTACT_EMAIL}`,
								className: "text-muted transition-colors hover:text-fg break-all",
								children: CONTACT_EMAIL
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-subtle text-xs uppercase tracking-wider mb-0.5",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Lagos, Nigeria"
							})] })
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border px-4 py-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-xs text-subtle",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Jack Manuel Fitness Limited. All rights reserved."
					]
				})
			})
		]
	});
}
function BookForm() {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [session, setSession] = (0, import_react.useState)(BOOKING_SESSIONS[0]);
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [whatsappUrl, setWhatsappUrl] = (0, import_react.useState)("");
	async function onSubmit(e) {
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
			await createBooking({ data: {
				name: name.trim(),
				phone: phone.trim(),
				email: email.trim(),
				session,
				note: note.trim()
			} });
			const lines = [
				`*New booking request from ${name.trim()}*`,
				`📋 Session: ${session}`,
				`📞 Phone: ${phone.trim()}`,
				email.trim() ? `📧 Email: ${email.trim()}` : "",
				note.trim() ? `📝 Brief: ${note.trim()}` : ""
			].filter(Boolean).join("\n");
			setWhatsappUrl(whatsappUrlWithText(lines));
			setDone(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not save this request. Try again.");
		} finally {
			setBusy(false);
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-emerald-500/30 bg-elevated p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-10 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-display text-3xl tracking-wide text-fg",
				children: "Request received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: [
					name,
					", your ",
					session.toLowerCase(),
					" request is logged. Tap below — your details are pre-filled so the team can reply immediately."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "bg-emerald-600 hover:bg-emerald-500 text-white border-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: whatsappUrl,
						target: "_blank",
						rel: "noreferrer",
						children: "Send via WhatsApp →"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => {
						setDone(false);
						setName("");
						setPhone("");
						setEmail("");
						setNote("");
						setWhatsappUrl("");
					},
					children: "New request"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "rounded-xl border border-border bg-elevated p-5 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
						placeholder: "Full name",
						autoComplete: "name"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
						children: "Phone / WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
						placeholder: "0708…",
						autoComplete: "tel",
						inputMode: "tel"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
					placeholder: "you@email.com",
					autoComplete: "email"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
					children: "What do you need"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: BOOKING_SESSIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSession(s),
						className: cn("min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors duration-150", session === s ? "border-fg bg-fg text-bg" : "border-border bg-surface text-muted hover:text-fg"),
						children: s
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
					children: "Goal or brief"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 4,
					className: "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
					placeholder: "Strength goal, event date, brand, or location"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "mt-5 w-full sm:w-auto",
				size: "lg",
				disabled: busy,
				children: busy ? "Sending…" : "Request a booking"
			})
		]
	});
}
var GREETINGS = [
	"Oya, talk to me. What do you need?",
	"The Power Engine is online. What's the brief?",
	"Jack Manuel here. No time for small talk. What's your goal?",
	"I was in the middle of a set but you have my attention. What's up?",
	"Welcome. Drop the excuses at the door — what can I do for you?"
];
var FALLBACKS = [
	"Hmm. That's not a question I trained for. But I never skip leg day, and I'm not skipping your question either — try asking about sessions, pricing, or location.",
	"I'm a fitness coach, not a philosopher. But I respect the curiosity. Ask me something I can sweat on.",
	"My AI is strong but my English has limits. Ask me about training, booking, or programs — I'll be more useful.",
	"Even I don't have an answer for that. And I can deadlift twice my bodyweight. Ask about sessions or booking.",
	"That question needs a different coach. Try asking me about the programs, pricing, or how to book."
];
var RULES = [
	{
		keywords: [
			"price",
			"cost",
			"how much",
			"fee",
			"rate",
			"charge",
			"expensive",
			"money",
			"naira",
			"₦"
		],
		replies: [{
			text: "1:1 sessions start at ₦25,000. Block bookings come with a discount because commitment deserves reward. Group sessions and brand appearances are quoted per brief.\n\nWant exact pricing? Send me your goal and I'll give you a number.",
			chips: [
				"Book a session",
				"Tell me about group training",
				"What do I get for ₦25k?"
			]
		}, {
			text: "You want price? Fine. ₦25,000 per 1:1 session. That is less than what people spend on fried chicken and excuses in a week.\n\nBlock bookings are cheaper. Drop your brief in the form below.",
			chips: ["Block booking discount?", "How many sessions do I need?"]
		}]
	},
	{
		keywords: [
			"location",
			"where",
			"address",
			"place",
			"gym",
			"lagos",
			"mainland",
			"island",
			"abuja",
			"remote"
		],
		replies: [{
			text: "We operate from Lagos — both Mainland and Island sessions are available. I also do on-site visits to your facility.\n\nAbuja? Remote programming. I write the plan, you execute. No excuses about geography.",
			chips: [
				"Can I train remotely?",
				"Do you do home sessions?",
				"Book a session"
			]
		}]
	},
	{
		keywords: [
			"beginner",
			"new",
			"start",
			"never",
			"first time",
			"scared",
			"nervous",
			"unfit",
			"out of shape"
		],
		replies: [{
			text: "Scared? Good. That means you know this is real.\n\nI've taken people from zero to deadlifting serious weight. You don't need to be fit to START. You just need to START.\n\nFirst session is an assessment — no judgment, just data.",
			chips: [
				"Book first session",
				"What happens in assessment?",
				"I'm really out of shape though"
			]
		}]
	},
	{
		keywords: [
			"i'm really out of shape",
			"really unfit",
			"very unfit",
			"too unfit"
		],
		replies: [{
			text: "Brother/Sister — I have seen EVERYTHING walk through my door. There is no 'too unfit' here. There is only 'too comfortable with excuses.'\n\nBook the session. I'll handle the rest. 💪",
			chips: ["Okay fine, how do I book?", "What if I can't keep up?"]
		}]
	},
	{
		keywords: [
			"excuse",
			"busy",
			"no time",
			"can't",
			"cannot",
			"tired",
			"lazy"
		],
		replies: [{
			text: "Busy? I wake up at 5am. Tired? A bar of iron doesn't care about your feelings. No time? You have time to be asking me questions right now.\n\nLet's schedule around YOUR life. That's what 1:1 is for.",
			chips: [
				"How long are sessions?",
				"Early morning sessions?",
				"Weekend training?"
			]
		}]
	},
	{
		keywords: [
			"how long",
			"duration",
			"session length",
			"minutes",
			"hours"
		],
		replies: [{
			text: "1:1 sessions run 60–90 minutes. Enough time to work, sweat, and feel what real training is.\n\nGroup sessions are 60 minutes. If you're not done in 60 minutes, you were not working hard enough.",
			chips: [
				"What happens in a session?",
				"Book a session",
				"Is 60 mins enough?"
			]
		}]
	},
	{
		keywords: [
			"program",
			"training plan",
			"workout plan",
			"what do you train",
			"training style",
			"method"
		],
		replies: [{
			text: "I train for real-world strength. Compound lifts. Functional movement. Grip, load, carry.\n\nNo mirror-chasing. No gimmicks. Programs are built around your body, your goal, and your timeline. Not a generic template from the internet.",
			chips: [
				"What is Raw Power?",
				"Do you do cardio?",
				"Book a session"
			]
		}]
	},
	{
		keywords: [
			"cardio",
			"running",
			"fat loss",
			"weight loss",
			"slim",
			"burn fat"
		],
		replies: [{
			text: "Cardio? I don't hate cardio. But I'll tell you what burns more calories than a 30-minute jog — a properly loaded strength session.\n\nFat loss is a byproduct of building something. We build strength here. The fat leaves on its own.",
			chips: [
				"I just want to lose weight",
				"Strength vs cardio?",
				"Book a session"
			]
		}]
	},
	{
		keywords: [
			"i just want to lose weight",
			"only weight loss",
			"just fat loss"
		],
		replies: [{
			text: "Okay. I hear you. But here's what happens — people who 'just want to lose weight' come to me, and six months later they're hooked on how strong they've become.\n\nLet's start with your goal and see what the body decides it wants.",
			chips: ["Sounds good, how do I start?", "What's the first session like?"]
		}]
	},
	{
		keywords: [
			"group",
			"team",
			"corporate",
			"offsite",
			"squad",
			"friends",
			"hustle gang"
		],
		replies: [{
			text: "HUSTLE GANG! Yes. Group sessions are high energy, well-programmed, and the room works.\n\nTeams, friend squads, corporate offsites — all welcome. Send the headcount and date and I'll quote you.",
			chips: [
				"How many people minimum?",
				"Corporate offsite pricing",
				"Book group session"
			]
		}]
	},
	{
		keywords: [
			"brand",
			"appearance",
			"event",
			"campaign",
			"activation",
			"influencer",
			"endorsement",
			"stage"
		],
		replies: [{
			text: "You want real strength on stage? A face that commands a room without trying?\n\nI do brand activations, product launches, fitness campaigns, and live demos. One brief. On-time delivery. Real presence you cannot fake with editing.",
			chips: [
				"Book brand appearance",
				"What events have you done?",
				"Tell me the rates"
			]
		}]
	},
	{
		keywords: [
			"book",
			"booking",
			"schedule",
			"appointment",
			"reserve",
			"how to book",
			"sign up"
		],
		replies: [{
			text: `Simple. Two ways:\n\n1️⃣ Fill the form at the bottom of this page — name, number, what you need.\n2️⃣ Message the desk directly on WhatsApp: ${PHONE_PRIMARY_DISPLAY}\n\nWe reply with availability and rate. No back-and-forth drama.`,
			chips: [
				"Go to booking form",
				"WhatsApp now",
				"What info do I need?"
			]
		}]
	},
	{
		keywords: [
			"whatsapp",
			"contact",
			"call",
			"phone",
			"email",
			"reach",
			"message"
		],
		replies: [{
			text: `Fastest path to Jack's team:\n\n📱 WhatsApp: ${PHONE_PRIMARY_DISPLAY} (${BOOKINGS_LEAD} — Bookings Lead)\n📧 Email: ${CONTACT_EMAIL}\n\nWhatsApp gets the fastest reply. Always.`,
			chips: ["Open WhatsApp now", "Book via form instead"]
		}]
	},
	{
		keywords: [
			"who is jack",
			"about jack",
			"who are you",
			"tell me about yourself",
			"background",
			"story",
			"history"
		],
		replies: [{
			text: "Okoro Ogbonna. Born in Ebonyi State. 12+ years of early mornings, heavy iron, and zero shortcuts.\n\nFounder and CEO of Jack Manuel Fitness Limited. Lagos-based. Real strength is my product.\n\nNo filters. No gimmicks. Just results.",
			chips: [
				"How many years experience?",
				"What makes you different?",
				"Book a session"
			]
		}]
	},
	{
		keywords: [
			"what makes you different",
			"why jack",
			"why choose you",
			"better than",
			"other trainers"
		],
		replies: [{
			text: "Most trainers count your reps and take your money.\n\nI build programming around YOUR body, adjust when you plateau, and hold you accountable without being annoying about it.\n\nAlso — 12 years. Not 12 months. There is a difference.",
			chips: [
				"Okay I'm convinced",
				"Book a session",
				"Tell me the pricing"
			]
		}]
	},
	{
		keywords: [
			"nutrition",
			"diet",
			"food",
			"eat",
			"meal",
			"protein",
			"supplement"
		],
		replies: [{
			text: "I train you to move and lift. For detailed nutrition plans you should see a registered dietitian — I respect that boundary.\n\nBUT. I will tell you this for free: eat real food, enough protein, drink water. That handles 80% of it.",
			chips: ["Okay what about the training?", "Book a session"]
		}]
	},
	{
		keywords: [
			"weekend",
			"saturday",
			"sunday",
			"morning",
			"evening",
			"night",
			"time",
			"when"
		],
		replies: [{
			text: "Sessions are available during the week and weekends. Morning, afternoon, and evening slots exist — exact availability depends on current bookings.\n\nSend your preferred times in the brief and we'll match what's open.",
			chips: ["Book now", "WhatsApp to check times"]
		}]
	},
	{
		keywords: [
			"funny",
			"joke",
			"laugh",
			"entertain",
			"boring",
			"serious"
		],
		replies: [{
			text: "You want jokes? Here's one: someone told me they couldn't afford training but they ordered Uber Eats three times this week.\n\nThat's the funniest thing I've heard all year.\n\nNow — you booking or not? 😂",
			chips: ["Okay fine, I'll book", "Tell me another one"]
		}]
	},
	{
		keywords: [
			"tell me another one",
			"another joke",
			"more jokes"
		],
		replies: [{
			text: "Man came to me saying he 'tried the gym once.' ONCE.\n\nI tried cooking once too. Didn't mean I stopped eating.\n\nConsistency is not a gym word — it's a life word. Come train. 💪",
			chips: ["Book a session", "Okay you got me"]
		}]
	},
	{
		keywords: [
			"okay you got me",
			"convinced",
			"sold",
			"let's do this",
			"i'm in",
			"sign me up"
		],
		replies: [{
			text: "THAT'S WHAT I'M TALKING ABOUT! 🔥\n\nScroll to the booking form below. Name, number, what you need. We reply fast.\n\nSee you on the other side of your excuses.",
			chips: ["Go to booking form", "WhatsApp instead"]
		}]
	},
	{
		keywords: [
			"what if i can't keep up",
			"too hard",
			"too difficult",
			"overwhelmed"
		],
		replies: [{
			text: "Can't keep up? That's the point. You're supposed to be challenged.\n\nBut I don't push people off a cliff — I push them to the edge of what THEY can do, then a little past it. Safely. With a plan.\n\nThat's how the body grows.",
			chips: ["Book first session", "What does first session look like?"]
		}]
	},
	{
		keywords: [
			"instagram",
			"social media",
			"tiktok",
			"facebook",
			"follow"
		],
		replies: [{
			text: "You want to see the work? Fair.\n\n📸 Instagram: @jack_manuel_fitness\n🎵 TikTok: @jackmanuelfitness1\n📘 Facebook: Jack Manuel Fitness\n\nFollow. But don't just watch — book.",
			chips: ["Book a session", "Go to booking form"]
		}]
	}
];
function getBotReply(input) {
	const normalized = input.toLowerCase().trim();
	if ([
		"hi",
		"hello",
		"hey",
		"sup",
		"oya",
		"good morning",
		"good afternoon",
		"good evening",
		"hola"
	].some((g) => normalized === g || normalized.startsWith(g + " ") || normalized.startsWith(g + ","))) return {
		text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
		chips: [
			"Pricing",
			"Book a session",
			"Where are you based?",
			"Who is Jack?"
		]
	};
	for (const rule of RULES) if (rule.keywords.some((kw) => normalized.includes(kw))) return rule.replies[Math.floor(Math.random() * rule.replies.length)];
	return {
		text: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)],
		chips: [
			"Pricing",
			"Book a session",
			"Where are you based?",
			"Tell me about programs"
		]
	};
}
var INITIAL_MESSAGES = [{
	id: 1,
	from: "jack",
	text: "Oya, talk to me. What do you need? 💪",
	chips: [
		"Pricing",
		"Book a session",
		"Where are you based?",
		"Who is Jack?"
	]
}];
var msgCounter = 10;
var nextId = () => ++msgCounter;
function JackBot() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)(INITIAL_MESSAGES);
	const [input, setInput] = (0, import_react.useState)("");
	const [typing, setTyping] = (0, import_react.useState)(false);
	const [hasNewMsg, setHasNewMsg] = (0, import_react.useState)(false);
	const bottomRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
			inputRef.current?.focus();
			setHasNewMsg(false);
		}
	}, [open, messages]);
	function sendMessage(text) {
		if (!text.trim()) return;
		const userMsg = {
			id: nextId(),
			from: "user",
			text: text.trim()
		};
		setMessages((m) => [...m, userMsg]);
		setInput("");
		setTyping(true);
		const delay = 700 + Math.random() * 800;
		setTimeout(() => {
			const reply = getBotReply(text);
			setMessages((m) => [...m, {
				id: nextId(),
				from: "jack",
				...reply
			}]);
			setTyping(false);
			if (!open) setHasNewMsg(true);
		}, delay);
	}
	function handleKey(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage(input);
		}
	}
	function handleChip(chip) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		id: "jack-bot-fab",
		"aria-label": "Chat with Jack",
		onClick: () => setOpen((v) => !v),
		className: cn("fixed bottom-5 right-4 z-[80] flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-[0.96] sm:bottom-8 sm:right-7 overflow-visible animate-fab-in", open ? "bg-fg text-bg" : "bg-bg border-2 border-border text-fg hover:border-fg/40 fab-pulse"),
		children: [
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-6" }),
			hasNewMsg && !open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute -top-1 -right-1 flex size-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-3.5 rounded-full bg-amber-400" })]
			}),
			!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-muted pointer-events-none",
				children: "Ask Jack"
			})
		]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "jack-bot-panel",
		className: "fixed bottom-24 right-4 z-[79] w-[calc(100vw-2rem)] max-w-sm sm:right-7 sm:w-96 animate-bot-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-t-2xl border border-b-0 border-border bg-elevated px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex size-9 items-center justify-center rounded-full border border-border bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-amber-400 fill-amber-400/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border border-elevated bg-emerald-500" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-fg leading-none",
						children: "Jack Manuel Bot"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted mt-0.5",
						children: "The Power Engine · Always online"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close chat",
					onClick: () => setOpen(false),
					className: "flex size-7 items-center justify-center rounded-md text-muted hover:text-fg hover:bg-surface transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-h-80 flex-col gap-3 overflow-y-auto border-x border-border bg-bg px-4 py-4 scroll-smooth",
				children: [
					messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex flex-col gap-1.5", msg.from === "user" ? "items-end" : "items-start"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line msg-pop", msg.from === "user" ? "rounded-br-sm bg-fg text-bg" : "rounded-bl-sm border border-border bg-elevated text-fg"),
							children: msg.text
						}), msg.from === "jack" && msg.chips && msg.chips.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5 mt-1",
							children: msg.chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleChip(chip),
								className: "rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted hover:border-fg/40 hover:text-fg transition-colors",
								children: chip
							}, chip))
						})]
					}, msg.id)),
					typing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl rounded-bl-sm border border-border bg-elevated px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-muted animate-bounce [animation-delay:0ms]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-muted animate-bounce [animation-delay:150ms]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-muted animate-bounce [animation-delay:300ms]" })
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottomRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-b-2xl border border-t border-border bg-elevated px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: handleKey,
					placeholder: "Ask Jack anything…",
					className: "min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-subtle focus:outline-none",
					maxLength: 300
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Send message",
					onClick: () => sendMessage(input),
					disabled: !input.trim(),
					className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })
				})]
			})
		]
	})] });
}
function HeroSlideshow() {
	const [manualIndex, setManualIndex] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-hidden select-none pointer-events-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute inset-0 transition-all duration-700 ease-in-out ${manualIndex === null ? "animate-hero-slide-1" : manualIndex === 0 ? "opacity-45 scale-100 z-10" : "opacity-0 scale-105 z-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-gym.jpg",
					alt: "Empty industrial gym, stacked iron plates and a barbell under hard light",
					className: "h-full w-full object-cover object-center filter brightness-95 contrast-105 kenburns-mobile"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute inset-0 transition-all duration-700 ease-in-out ${manualIndex === null ? "animate-hero-slide-2" : manualIndex === 1 ? "opacity-55 scale-100 z-10" : "opacity-0 scale-105 z-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/jack2.jpg",
					alt: "Coach Okoro Ogbonna (Jack Manuel) The Power Engine",
					className: "h-full w-full object-cover object-top md:object-center filter brightness-95 contrast-105 kenburns-mobile"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute inset-0 transition-all duration-700 ease-in-out ${manualIndex === null ? "animate-hero-slide-3" : manualIndex === 2 ? "opacity-50 scale-100 z-10" : "opacity-0 scale-105 z-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/jack3.jpg",
					alt: "Coach Jack Manuel raw strength workout on chest press machine",
					className: "h-full w-full object-cover object-center filter brightness-95 contrast-105 kenburns-mobile"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-20 bg-gradient-to-t from-bg via-bg/75 to-bg/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-20 bg-radial-hero pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain-overlay z-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Go to gym background slide",
						onClick: () => setManualIndex(0),
						className: `h-1.5 rounded-full transition-all duration-300 ${manualIndex === null ? "animate-hero-indicator-1" : manualIndex === 0 ? "w-7 bg-amber-400" : "w-3 bg-white/25 hover:bg-white/50"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Go to Coach Jack photo 1 slide",
						onClick: () => setManualIndex(1),
						className: `h-1.5 rounded-full transition-all duration-300 ${manualIndex === null ? "animate-hero-indicator-2" : manualIndex === 1 ? "w-7 bg-amber-400" : "w-3 bg-white/25 hover:bg-white/50"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Go to Coach Jack workout photo 2 slide",
						onClick: () => setManualIndex(2),
						className: `h-1.5 rounded-full transition-all duration-300 ${manualIndex === null ? "animate-hero-indicator-3" : manualIndex === 2 ? "w-7 bg-amber-400" : "w-3 bg-white/25 hover:bg-white/50"}`
					})
				]
			})
		]
	});
}
function MobileStickyCta() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const y = window.scrollY;
			const book = document.getElementById("book");
			const nearBook = (book ? book.getBoundingClientRect().top : 9999) < window.innerHeight * .72;
			setShow(y > 280 && !nearBook);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("md:hidden fixed inset-x-0 bottom-0 z-[70] pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]", show ? "translate-y-0" : "translate-y-full"),
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto mx-3 mb-3 mr-[4.75rem] flex items-center gap-2 rounded-xl border border-border bg-bg/90 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#book",
				className: "flex h-11 flex-1 items-center justify-center rounded-lg bg-fg text-sm font-medium text-bg active:scale-[0.96] transition-transform duration-150",
				children: "Book a session"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: WHATSAPP_URL,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": "WhatsApp",
				className: "flex size-11 items-center justify-center rounded-lg border border-border text-fg active:scale-[0.96] transition-transform duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" })
			})]
		})
	});
}
function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Reveal({ children, className, delay = 0, direction = "up", duration = 700 }) {
	const ref = (0, import_react.useRef)(null);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
			setRevealed(true);
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setRevealed(true);
				observer.unobserve(el);
			}
		}, {
			threshold: .08,
			rootMargin: "0px 0px -8% 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const hiddenCls = direction === "left" ? "opacity-0 -translate-x-8 blur-[8px]" : direction === "right" ? "opacity-0 translate-x-8 blur-[8px]" : direction === "down" ? "opacity-0 -translate-y-6 blur-[8px]" : direction === "none" ? "opacity-0 blur-[8px]" : "opacity-0 translate-y-10 blur-[8px]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: {
			transitionDelay: revealed ? `${delay}ms` : "0ms",
			transitionDuration: `${duration}ms`
		},
		className: cn("transform-gpu will-change-[opacity,transform,filter] transition-[opacity,transform,filter] ease-[cubic-bezier(0.16,1,0.3,1)]", revealed ? "opacity-100 translate-x-0 translate-y-0 blur-0" : hiddenCls, className),
		children
	});
}
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 1200, className }) {
	const [count, setCount] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const [started, setStarted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
			setCount(end);
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !started) {
				setStarted(true);
				observer.unobserve(el);
			}
		}, {
			threshold: .05,
			rootMargin: "40px 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [started, end]);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		let startTimestamp = null;
		let frameId;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
			setCount(Math.floor(eased * end));
			if (progress < 1) frameId = requestAnimationFrame(step);
			else setCount(end);
		};
		frameId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frameId);
	}, [
		started,
		end,
		duration
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className,
		children: [
			prefix,
			started ? count : end,
			suffix
		]
	});
}
function ScrollProgress() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const update = () => {
			const el = document.documentElement;
			const scrolled = el.scrollTop || document.body.scrollTop;
			const total = el.scrollHeight - el.clientHeight;
			setProgress(total > 0 ? scrolled / total * 100 : 0);
		};
		window.addEventListener("scroll", update, { passive: true });
		update();
		return () => window.removeEventListener("scroll", update);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-amber-400 via-fg to-amber-400 shadow-[0_0_8px_rgba(234,179,8,0.6)] transition-none",
		style: {
			width: `${progress}%`,
			transformOrigin: "left"
		}
	});
}
function SectionDivider({ delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [drawn, setDrawn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setDrawn(true);
				observer.unobserve(el);
			}
		}, { threshold: .3 });
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "px-4 sm:px-6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-px bg-gradient-to-r from-transparent via-border to-transparent",
				style: {
					transform: drawn ? "scaleX(1)" : "scaleX(0)",
					transformOrigin: "left",
					transition: `transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
				}
			})
		})
	});
}
var STATS = [
	{
		isCounter: true,
		end: 12,
		suffix: "+",
		label: "Years coaching"
	},
	{
		value: "1:1",
		label: "And group sessions"
	},
	{
		value: "Ltd",
		label: "Registered in Nigeria"
	},
	{
		value: "Lagos",
		label: "Train here or on-site"
	}
];
var PROGRAMS = [
	{
		icon: Dumbbell,
		title: "1:1 coaching",
		tag: "Individual Mastery",
		copy: "Private sessions with Jack. Strength, conditioning, and a plan you can keep. For beginners through serious athletes."
	},
	{
		icon: Zap,
		title: "Raw power",
		tag: "Functional Output",
		copy: "Functional strength: load, grip, carry, and real output. Built for people who want results they can feel, not a filter."
	},
	{
		icon: Users,
		title: "Group training",
		tag: "Hustle Gang",
		copy: "Hustle Gang sessions. High energy, clear programming, and a room that actually works. Teams and small groups welcome."
	},
	{
		icon: Shield,
		title: "Brand & events",
		tag: "Campaigns & Stage",
		copy: "Appearances, activations, content, and live demos. Book Jack for campaigns, launches, and stages that need real strength."
	}
];
var CLIENTS = [
	{
		icon: Flame,
		title: "Individuals",
		badge: "Personal Growth",
		copy: "Get stronger, move better, and stay consistent. Sessions in Lagos, with a program you can run between visits."
	},
	{
		icon: Users,
		title: "Teams",
		badge: "Squad Energy",
		copy: "Offsites, squads, and friend groups who want a session that is not a gimmick. We run the room. You show up."
	},
	{
		icon: Building2,
		title: "Brands",
		badge: "Commercial",
		copy: "Product launches, fitness campaigns, and talent bookings. One point of contact. Clear brief. On-time delivery."
	}
];
var STEPS = [
	{
		n: "01",
		title: "Send the brief",
		copy: "Tell us the goal, dates, and whether this is training or a booking."
	},
	{
		n: "02",
		title: "We confirm",
		copy: "The team replies on WhatsApp with availability, location, and rate."
	},
	{
		n: "03",
		title: "You train",
		copy: "Show up. Do the work. Leave stronger than you arrived."
	}
];
var MARQUEE_ITEMS_1 = [
	"RAW POWER",
	"FUNCTIONAL STRENGTH",
	"1:1 COACHING",
	"HUSTLE GANG SESSIONS",
	"NO SHORTCUTS",
	"LAGOS NIGERIA",
	"HEAVY IRON",
	"MINDSET FIRST",
	"PROVEN RESULTS",
	"BRAND ACTIVATIONS"
];
var MARQUEE_ITEMS_2 = [
	"DISCIPLINE OVER EXCUSES",
	"UNSTOPPABLE DRIVE",
	"LOAD · GRIP · CARRY",
	"HIGH VOLTAGE ENERGY",
	"LAGOS FITNESS CULTURE",
	"REAL WORK · REAL OUTPUT",
	"RAW POWER",
	"NEVER SETTLE"
];
var COACH_PILLS = [
	"12+ Years Discipline",
	"Ebonyi State Native",
	"Raw Power & Grip",
	"Zero Gimmicks",
	"Lagos Based"
];
var TESTIMONIALS = [
	{
		quote: "Jack doesn't let you cheat the rep. Six months in and I'm deadlifting things I thought were impossible. The programming is serious.",
		name: "Emeka O.",
		role: "1:1 Coaching · Lagos Island",
		stars: 5
	},
	{
		quote: "We booked Jack for our company offsite. The whole team showed up, worked hard, and left with something to prove. He runs a tight room.",
		name: "Tolu A.",
		role: "Group Session · Corporate Team",
		stars: 5
	},
	{
		quote: "The brand activation Jack did for our product launch was electric. Real strength, real crowd energy. Our agency is still talking about it.",
		name: "Chisom N.",
		role: "Brand Appearance · Lagos Mainland",
		stars: 5
	},
	{
		quote: "I was a complete beginner. Jack built a plan, explained everything, and never made me feel behind. I'm now consistent for the first time in my life.",
		name: "Fatima K.",
		role: "1:1 Coaching · Abuja (remote plan)",
		stars: 5
	}
];
var FAQS = [
	{
		q: "Where are sessions held?",
		a: "Our primary base is Lagos, Nigeria. 1:1 and group sessions run at our Lagos HQ or can be arranged on-site at your facility. Remote programming is also available."
	},
	{
		q: "What does a session cost?",
		a: "Rates vary by session type and frequency. 1:1 sessions start at ₦25,000 per session with discounts for block bookings. Group sessions and brand bookings are quoted per brief. Send a request and we'll respond with exact pricing within 24 hours."
	},
	{
		q: "Do I need to be fit already?",
		a: "No. Jack works with complete beginners through competitive athletes. The first session is an assessment — we build the plan around where you are, not where you think you should be."
	},
	{
		q: "How do I book group training or a brand appearance?",
		a: "Use the form below or message the desk on WhatsApp with your brief — dates, headcount (for groups) or event details (for brand work). We'll confirm availability and rate same day."
	},
	{
		q: "Can I get a remote training plan?",
		a: "Yes. Jack provides structured programming for clients who can't train in-person in Lagos. Plans are built to your equipment, schedule, and goals. Book via the form and flag it as remote."
	}
];
function FAQItem({ q, a, index }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `border-b border-border transition-colors duration-200 ${open ? "border-fg/20" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			id: `faq-${index}`,
			"aria-expanded": open,
			onClick: () => setOpen((v) => !v),
			className: "flex w-full items-start justify-between gap-4 py-5 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-medium text-fg sm:text-lg",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `mt-0.5 size-5 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180 text-fg" : ""}` })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pb-5 text-sm leading-relaxed text-muted sm:text-base",
			children: a
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-screen bg-bg text-fg selection:bg-fg selection:text-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JackBot, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStickyCta, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative min-h-[92svh] md:min-h-[100svh] overflow-hidden bg-bg flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlideshow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-animate-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-fg backdrop-blur-md shadow-lg shadow-black/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex size-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-emerald-500" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "uppercase tracking-[0.2em] text-muted text-[11px]",
										children: "Jack Manuel Fitness Limited · Lagos"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-animate-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-5 max-w-4xl font-display text-[clamp(2.6rem,11vw,7.5rem)] leading-[0.88] tracking-wide text-fg drop-shadow-sm uppercase",
									children: "My strength is my superpower".split(" ").map((word, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hero-word inline-block pr-[0.18em]",
										style: { animationDelay: `${180 + i * 90}ms` },
										children: word
									}, `${word}-${i}`))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-animate-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
									children: "Raw power coaching, group sessions, and brand work. Book Jack for training that is real — or a stage that needs the same voltage."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-animate-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "group btn-ripple shadow-lg shadow-white/5 relative overflow-hidden min-h-[52px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#book",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-1" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										size: "lg",
										className: "hover:border-fg/40 transition-colors min-h-[52px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#train",
											children: "See programs"
										})
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-animate-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#about",
									className: "group mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4 transition-transform duration-300 group-hover:translate-y-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scroll to explore" })]
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden border-y border-border bg-elevated/80 py-3.5 backdrop-blur-sm select-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-marquee flex items-center gap-8 text-xs font-semibold tracking-[0.25em] text-muted uppercase",
						children: [
							...MARQUEE_ITEMS_1,
							...MARQUEE_ITEMS_1,
							...MARQUEE_ITEMS_1
						].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-8 whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hover:text-fg transition-colors",
								children: item
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-border" })]
						}, idx))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-b border-border bg-surface relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 relative",
						children: STATS.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 60,
							direction: "up",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `group p-5 sm:px-8 sm:py-8 transition-all duration-300 hover:bg-elevated/60 active:bg-elevated/60 ${i % 2 === 1 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border md:border-t-0" : ""} md:border-l md:first:border-l-0`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl sm:text-5xl tracking-wide text-fg transition-transform duration-300 group-hover:scale-105 inline-block",
									children: stat.isCounter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
										end: stat.end,
										suffix: stat.suffix
									}) : stat.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] sm:text-sm font-medium text-muted uppercase tracking-wider",
									children: stat.label
								})]
							})
						}, stat.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "about",
					className: "scroll-mt-20 relative overflow-hidden py-24 sm:py-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-radial-coach absolute inset-0 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
									direction: "left",
									duration: 600,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5 text-amber-500 fill-amber-500/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "uppercase tracking-[0.2em] text-[11px] text-muted",
												children: "Head Coach & Founder"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-5xl tracking-wide text-fg sm:text-6xl md:text-7xl uppercase",
											children: "Okoro Ogbonna"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-2xl tracking-wide text-muted uppercase",
											children: "Jack Manuel · The Power Engine"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
									delay: 150,
									direction: "left",
									duration: 600,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-6 text-base leading-relaxed text-muted sm:text-lg",
										children: [
											"Founder and CEO of ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg font-medium",
												children: "Jack Manuel Fitness Limited"
											}),
											". Originally from Ebonyi State. Twelve years of unrelenting discipline, early morning sessions, heavy iron, and an athletic standard that never fakes the work."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-base leading-relaxed text-muted",
										children: "Strength is real. Not a social media filter. Jack trains individuals and teams for raw power, durable joints, and functional output — the kind that carries heavy load when it counts most. Clients come for guaranteed progression. Brands come for an undeniable commanding presence that cannot be staged."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: 250,
									direction: "left",
									duration: 600,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 flex flex-wrap gap-2",
										children: COACH_PILLS.map((pill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-fg shadow-sm hover:border-fg/40 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-400" }), pill]
										}, pill))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: 350,
									direction: "up",
									duration: 600,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 rounded-xl border border-border/80 bg-elevated/60 p-5 backdrop-blur-sm relative overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm italic text-fg",
												children: "“We don’t compromise on the standard. When you step into my session, you leave your excuses at the door.”"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-xs font-medium uppercase tracking-wider text-muted",
												children: "— Jack Manuel, Founder & Head Coach"
											})] })]
										})
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								direction: "right",
								duration: 700,
								delay: 100,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative mx-auto max-w-md lg:max-w-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-2xl bg-gradient-to-b from-fg/15 to-transparent opacity-50 blur-lg transition duration-500 group-hover:opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative overflow-hidden rounded-xl border border-border bg-surface shadow-2xl transition-transform duration-500 group-hover:-translate-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: "/images/jack-coach.jpg",
												alt: "Coach Okoro Ogbonna (Jack Manuel) coaching in Lagos",
												loading: "lazy",
												decoding: "async",
												className: "h-[340px] sm:h-[460px] lg:h-[520px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "badge-float absolute bottom-4 inset-x-4 flex items-center justify-between rounded-lg border border-white/10 bg-bg/80 p-3.5 backdrop-blur-md shadow-lg",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-display text-base sm:text-lg tracking-wide text-fg uppercase leading-none",
													children: "Okoro Ogbonna"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-[11px] font-medium uppercase tracking-wider text-muted",
													children: "Lagos · Nigeria"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-9 items-center justify-center rounded-md bg-white/10 text-fg",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4 text-amber-400" })
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-4 left-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-bg/75 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-fg backdrop-blur-md",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3 text-amber-400" }), "Master Trainer"]
												})
											})
										]
									})]
								})
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "train",
					className: "scroll-mt-20 border-t border-border bg-surface relative overflow-hidden py-24 sm:py-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid-pattern absolute inset-0 opacity-30 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 sm:px-6 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							direction: "up",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
									children: "Programs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 max-w-xl font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase",
									children: "We do not train for the mirror"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
									children: "We train for the mindset. Clear programs. Honest coaching. Book the lane that fits."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid gap-5 sm:grid-cols-2",
							children: PROGRAMS.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: index * 100,
								direction: "up",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "group shimmer-card flex flex-col justify-between rounded-xl border border-border bg-elevated/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-fg/40 hover:bg-elevated hover:shadow-xl hover:shadow-black/40 h-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-11 items-center justify-center rounded-lg border border-border bg-surface transition-transform duration-300 group-hover:scale-110 group-hover:border-fg/30",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
													className: "size-5 text-fg transition-colors group-hover:text-amber-400",
													strokeWidth: 1.75
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-medium uppercase tracking-wider text-muted/80 rounded-full border border-border/60 bg-surface/50 px-2.5 py-0.5",
												children: p.tag
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-5 font-display text-3xl sm:text-4xl tracking-wide text-fg uppercase",
											children: p.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-muted sm:text-base",
											children: p.copy
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#book",
										className: "mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg underline-offset-4 hover:underline group/link",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Request this program" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-200 group-hover/link:translate-x-1" })]
									})]
								})
							}, p.title))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDivider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden border-y border-border bg-bg py-3.5 select-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-marquee-reverse flex items-center gap-8 text-xs font-semibold tracking-[0.25em] text-muted/80 uppercase",
						children: [
							...MARQUEE_ITEMS_2,
							...MARQUEE_ITEMS_2,
							...MARQUEE_ITEMS_2
						].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-8 whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hover:text-fg transition-colors",
								children: item
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-border" })]
						}, idx))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "clients",
					className: "scroll-mt-20 py-24 sm:py-32 relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								direction: "up",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
									children: "Clients"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase",
									children: "Who this is for"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-14 grid gap-5 md:grid-cols-3",
								children: CLIENTS.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: idx * 100,
									direction: "up",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "group rounded-xl border border-border bg-surface/80 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-fg/40 hover:bg-surface hover:shadow-xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-10 items-center justify-center rounded-lg border border-border bg-elevated transition-transform duration-300 group-hover:scale-110",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, {
														className: "size-5 text-fg transition-colors group-hover:text-amber-400",
														strokeWidth: 1.75
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-medium uppercase tracking-wider text-muted",
													children: c.badge
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-5 font-display text-3xl tracking-wide text-fg uppercase",
												children: c.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2.5 text-sm leading-relaxed text-muted",
												children: c.copy
											})
										]
									})
								}, c.title))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-16 grid gap-6 md:grid-cols-3",
								children: STEPS.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: idx * 100,
									direction: "up",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "group border-t border-border pt-6 transition-colors duration-300 hover:border-fg",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-3xl tracking-wide text-muted transition-colors duration-300 group-hover:text-fg",
												children: s.n
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-2 text-base font-semibold text-fg",
												children: s.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 text-sm leading-relaxed text-muted",
												children: s.copy
											})
										]
									})
								}, s.n))
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDivider, { delay: 100 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border py-16 sm:py-32 bg-surface/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 sm:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								direction: "up",
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "group relative overflow-hidden rounded-xl border border-border bg-surface",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/images/barbell-chalk.jpg",
											alt: "Chalk dust on a knurled barbell",
											loading: "lazy",
											decoding: "async",
											className: "h-56 w-full object-cover sm:h-80 md:h-72 lg:h-80 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-wider text-muted font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Precision & Grip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lagos HQ" })]
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										direction: "up",
										delay: 80,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
											className: "group relative overflow-hidden rounded-xl border border-border bg-surface",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/images/kettlebell.jpg",
													alt: "Kettlebell and iron chain on concrete",
													loading: "lazy",
													decoding: "async",
													className: "h-24 w-full object-cover sm:h-32 md:h-24 lg:h-28 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute bottom-2 left-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted font-medium",
													children: "Functional Load"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										direction: "up",
										delay: 140,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
											className: "group relative overflow-hidden rounded-xl border border-border bg-surface",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/images/plates.jpg",
													alt: "Stacked iron plates on a gym floor",
													loading: "lazy",
													decoding: "async",
													className: "h-24 w-full object-cover sm:h-32 md:h-24 lg:h-28 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute bottom-2 left-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted font-medium",
													children: "Heavy Iron"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										direction: "up",
										delay: 200,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
											className: "group relative overflow-hidden rounded-xl border border-border bg-surface",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/images/squat-rack.jpg",
													alt: "Loaded squat rack on the gym floor",
													loading: "lazy",
													decoding: "async",
													className: "h-24 w-full object-cover sm:h-32 md:h-24 lg:h-28 transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute bottom-2 left-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted font-medium",
													children: "The rack"
												})
											]
										})
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							direction: "up",
							delay: 150,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "mt-14 max-w-3xl border-l-2 border-fg pl-6 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl leading-tight tracking-wide text-fg sm:text-5xl uppercase",
									children: "Believe in yourself. There is no limit to what you can achieve."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
									className: "mt-4 flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Okoro Ogbonna (Jack Manuel)" })]
								})]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDivider, { delay: 100 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "testimonials",
					className: "scroll-mt-20 py-24 sm:py-32 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-radial-coach absolute inset-0 pointer-events-none opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 sm:px-6 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							direction: "up",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
								children: "Results"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase",
								children: "What clients say"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid gap-5 sm:grid-cols-2",
							children: TESTIMONIALS.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: idx * 80,
								direction: "up",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "group shimmer-card relative rounded-xl border border-border bg-elevated/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-fg/30 hover:shadow-xl hover:shadow-black/40 h-full flex flex-col justify-between",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1 mb-5",
											children: Array.from({ length: t.stars }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 text-amber-400 fill-amber-400" }, i))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-7 text-fg/10 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-base leading-relaxed text-muted italic",
												children: [
													"\"",
													t.quote,
													"\""
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex items-center gap-3 pt-5 border-t border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex size-9 items-center justify-center rounded-full border border-border bg-surface text-xs font-display tracking-wide text-fg",
												children: [t.name.split(" ")[0][0], t.name.split(" ")[1]?.[0] ?? ""]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-fg",
												children: t.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted",
												children: t.role
											})] })]
										})
									]
								})
							}, t.name))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDivider, { delay: 200 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "faq",
					className: "scroll-mt-20 border-t border-border py-24 sm:py-32 bg-surface/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-6xl px-4 sm:px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-16 lg:grid-cols-2 lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								direction: "left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
										children: "FAQ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl uppercase",
										children: "Got questions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-base leading-relaxed text-muted",
										children: "Everything you need to know before you book. Still not sure? WhatsApp the desk — we reply fast."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: WHATSAPP_URL,
										target: "_blank",
										rel: "noreferrer",
										className: "mt-6 inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }), "Ask on WhatsApp"]
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								direction: "right",
								delay: 100,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border rounded-xl border border-border bg-elevated/50 px-6 sm:px-8",
									children: FAQS.map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItem, {
										q: faq.q,
										a: faq.a,
										index: idx
									}, faq.q))
								})
							}) })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDivider, { delay: 200 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "book",
					className: "scroll-mt-20 border-t border-border bg-surface py-24 sm:py-32 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid-pattern absolute inset-0 opacity-30 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							direction: "left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
									children: "Book"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-5xl tracking-wide text-fg sm:text-6xl md:text-7xl uppercase",
									children: "Start here"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base leading-relaxed text-muted sm:text-lg",
									children: "Training, group sessions, and brand bookings. Send your brief and we reply with availability and exact pricing. 1:1 sessions from ₦25,000 — block bookings and group rates available. Lagos-based. Travel by arrangement."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							direction: "left",
							delay: 150,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 rounded-xl border border-border bg-elevated/60 p-6 backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wider text-fg mb-4",
									children: "Direct Contact Channels"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-3.5 text-sm text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center justify-between gap-2 border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Bookings Lead: ", BOOKINGS_LEAD] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												className: "text-fg font-medium underline-offset-4 hover:underline",
												href: `tel:${PHONE_PRIMARY_TEL}`,
												children: PHONE_PRIMARY_DISPLAY
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center justify-between gap-2 border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alt. phone:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												className: "text-fg font-medium underline-offset-4 hover:underline",
												href: `tel:${PHONE_ALT_TEL}`,
												children: PHONE_ALT_DISPLAY
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center justify-between gap-2 border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Official Email:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												className: "text-fg font-medium underline-offset-4 hover:underline",
												href: `mailto:${CONTACT_EMAIL}`,
												children: CONTACT_EMAIL
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center justify-between gap-2 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Instant WhatsApp:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												className: "inline-flex items-center gap-1.5 text-emerald-400 font-medium underline-offset-4 hover:underline",
												href: WHATSAPP_URL,
												target: "_blank",
												rel: "noreferrer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }), "Message the desk"]
											})]
										})
									]
								})]
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							direction: "right",
							delay: 100,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookForm, {})
						})]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Home as component };
