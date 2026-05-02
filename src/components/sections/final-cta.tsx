import { CtaButton } from "../cta-button";
import { useReveal } from "@/hooks/use-reveal";

export function FinalCta() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-[120px] px-6 overflow-hidden" style={{ background: "#0F1713" }}>
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div ref={ref} className="reveal relative max-w-4xl mx-auto text-center">
        <span data-reveal-child className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
          Ready when you are
        </span>
        <h2
          data-reveal-child
          className="font-serif text-white mt-4 leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)" }}
        >
          The contractors who move first are the ones
          <br />
          <span className="italic text-[color:var(--gold)]">property managers</span> end up calling back.
        </h2>
        <p data-reveal-child className="mt-6 text-white/60 font-light text-lg max-w-xl mx-auto">
          One 20-minute call is all it takes to see whether this fits. We show you exactly what lands in your inbox on Monday and whether the contacts match your trade and location.
        </p>
        <div data-reveal-child className="mt-10">
          <CtaButton size="lg">Book Your Free 20 Min Strategy Call</CtaButton>
        </div>
        <p data-reveal-child className="mt-6 text-white/40 font-light text-sm">
          No commitment. No sales pressure. A straight conversation.
        </p>
        <p data-reveal-child className="mt-1 text-white/40 font-light text-sm">
          Engagements start from <span className="text-[color:var(--gold)]">a fraction of what you're already spending</span> covered on the call.
        </p>
      </div>
    </section>
  );
}
