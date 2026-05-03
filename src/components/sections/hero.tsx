import { ChevronDown } from "lucide-react";
import { CtaButton } from "../cta-button";
import { useCountUp } from "@/hooks/use-count-up";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -z-10 w-[1200px] h-[700px] max-w-[120vw]"
        style={{
          top: "-150px",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.08) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative">
        <span
          className="inline-block fade-up rounded-full px-4 py-1.5 text-[13px] font-normal"
          style={{
            border: "1px solid var(--gold-border)",
            color: "var(--gold)",
            animationDelay: "0ms",
          }}
        >
          Built for roofing and exterior contractors
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
          className="fade-up mt-6 mx-auto text-white/55 font-light text-lg leading-relaxed max-w-xl"
          style={{ animationDelay: "300ms" }}
        >
          We find the right property managers for your trade, check they're a fit,
          and have personalised emails in your inbox every Monday.
        </p>

        <div
          className="fade-up mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animationDelay: "450ms" }}
        >
          <CtaButton size="lg">Book A Free 20 Min Strategy Call</CtaButton>
          <a href="#how-it-works">
            <CtaButton variant="secondary" size="lg" onClick={() => {
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}>
              See How It Works
            </CtaButton>
          </a>
        </div>

        <div
          className="fade-up mt-16 flex justify-center text-[color:var(--gold)]"
          style={{ animationDelay: "700ms" }}
        >
          <ChevronDown size={28} className="animate-bounce-down" />
        </div>
      </div>

      <div className="mt-20 w-full max-w-4xl mx-auto grid grid-cols-3 gap-6 sm:gap-12">
        <Stat label="Delivered every" text="Monday" />
        <Stat label="Saved vs typical tools" text="$2–4k" divider />
        <Stat label="Hour of setup. That's it." count={1} divider />
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
      <div className="mt-2 text-xs sm:text-sm text-white/45 font-light tracking-wide">{label}</div>
    </div>
  );
}
