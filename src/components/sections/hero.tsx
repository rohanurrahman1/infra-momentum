import { ChevronDown } from "lucide-react";
import { CtaButton } from "../cta-button";
import { useCountUp } from "@/hooks/use-count-up";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div
        className="absolute inset-0 z-0 gold-glow opacity-90 pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span
          className="inline-block fade-up font-serif rounded-2xl px-6 py-3 leading-tight"
          style={{
            border: "1.5px solid rgba(255,255,255,0.85)",
            color: "#FFFFFF",
            fontSize: "clamp(1.05rem, 2.6vw, 1.75rem)",
            animationDelay: "0ms",
          }}
        >
          Built for <span style={{ color: "var(--gold)" }}>roofing</span> and{" "}
          <span style={{ color: "var(--gold)" }}>exterior contractors</span>
        </span>

        <h1
          className="fade-up font-serif text-white mt-8 leading-[1.05] tracking-tight"
          style={{
            fontSize: "clamp(2.625rem, 7vw, 5rem)",
            animationDelay: "150ms",
          }}
        >
          Stop waiting for referrals
          <br />
          <em className="italic text-[color:var(--gold)] font-serif not-italic" style={{ fontStyle: "italic" }}>to find you.</em>
        </h1>

        <p
          className="fade-up mt-6 mx-auto font-light text-lg leading-relaxed max-w-xl"
          style={{ animationDelay: "300ms", color: "#D4CCBE" }}
        >
          We find the right property managers for your trade, check they're a fit,
          and have personalised emails in your inbox every Monday.
        </p>

        <div
          className="fade-up mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animationDelay: "450ms" }}
        >
          <CtaButton size="lg">Book A Complementary 20min Strategy Call</CtaButton>
          <a href="#how-it-works">
            <CtaButton variant="secondary" size="lg" onClick={() => {
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}>
              See How It Works
            </CtaButton>
          </a>
        </div>

        <p
          className="fade-up mt-4 font-light text-sm italic"
          style={{ animationDelay: "550ms", color: "#B8B0A4" }}
        >
          Prefer a call? <a href="tel:+16478098469" className="text-[color:var(--gold)] not-italic hover:underline">+1 (647) 809 8469</a>
        </p>

        <div
          className="fade-up mt-16 flex justify-center text-[color:var(--gold)]"
          style={{ animationDelay: "700ms" }}
        >
          <ChevronDown size={28} className="animate-bounce-down" />
        </div>
      </div>

      <div className="relative z-10 mt-16 w-full max-w-4xl mx-auto grid grid-cols-3 gap-6 sm:gap-12">
        <Stat label="Delivered every" text="Monday" />
        <Stat label="Saved vs typical tools" text="$2–4k" divider />
        <Stat label="week of setup. That's it." text="1/2" divider />
      </div>
    </section>
  );
}

function Stat({
  label,
  text,
  count,
  divider,
}: {
  label: string;
  text?: string;
  count?: number;
  divider?: boolean;
}) {
  const { ref, value } = useCountUp(count ?? 0);
  return (
    <div className={`relative text-center px-2 ${divider ? "sm:border-l sm:border-white/10" : ""}`}>
      <div className="font-serif text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
        {count !== undefined ? <span ref={ref}>{value}</span> : text}
      </div>
      <div className="mt-2 text-xs sm:text-sm font-light tracking-wide" style={{ color: "#B8B0A4" }}>{label}</div>
    </div>
  );
}
