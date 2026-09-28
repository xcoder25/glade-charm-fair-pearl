import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { WHATSAPP_URL } from "@/lib/contact";

export function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const book = document.getElementById("book");
      const bookTop = book ? book.getBoundingClientRect().top : 9999;
      const nearBook = bookTop < window.innerHeight * 0.72;
      setShow(y > 280 && !nearBook);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "md:hidden fixed inset-x-0 bottom-0 z-[70] pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        show ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="pointer-events-auto mx-3 mb-3 mr-[4.75rem] flex items-center gap-2 rounded-xl border border-border bg-bg/90 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-md">
        <a
          href="#book"
          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-fg text-sm font-medium text-bg active:scale-[0.96] transition-transform duration-150"
        >
          Book a session
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="flex size-11 items-center justify-center rounded-lg border border-border text-fg active:scale-[0.96] transition-transform duration-150"
        >
          <MessageCircle className="size-4" />
        </a>
      </div>
    </div>
  );
}
