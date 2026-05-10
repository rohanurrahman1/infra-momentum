import { CtaButton } from "../cta-button";
import { useReveal } from "@/hooks/use-reveal";

export function FinalCta() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-[120px] px-6 overflow-hidden" style={{ background: "#0F1713" }}>
      <div
        className="absolute inset-0 -z-0 gold-glow opacity-70"
        style={{ pointerEvents: "none" }}
      />
      <div ref={ref} className="reveal relative max-w-3xl mx-auto text-center">
        <span data-reveal-child className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
          A straight conversation
        </span>
        <h2
          data-reveal-child
          className="font-serif text-white mt-4 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          Twenty minutes.
          <br />
          <span className="italic text-[color:var(--gold)]">We show you the system. You decide if it fits.</span>
        </h2>
        <p data-reveal-child className="mt-6 text-white/60 font-light text-lg max-w-xl mx-auto">
          Book a 20-minute call. We walk you through exactly how it works, what your inbox looks like on Monday, and whether this is the right fit for your business.
        </p>
        <p data-reveal-child className="mt-3 text-white/35 font-light text-sm">
          No commitment. No sales pressure. A straight conversation.
        </p>
        <div data-reveal-child className="mt-10">
          <CtaButton size="lg">Book A Complementary 20min Strategy Call</CtaButton>
        </div>
        <p data-reveal-child className="mt-6 text-white/40 italic font-light text-sm">
          Engagements start from a fraction of what you're already spending. Covered on the call.
        </p>
      </div>
    </section>
  );
}
