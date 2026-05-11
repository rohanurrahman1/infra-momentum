import { Check } from "lucide-react";
import { CtaButton } from "../cta-button";
import { useReveal } from "@/hooks/use-reveal";

const setupFeatures = [
  "Full system build and testing",
  "Property managers identified and verified",
  "Outreach emails written and tested - one time",
];

const retainerFeatures = [
  "Property manager outreach - twice per week",
  "Follow-up tracking",
  "Outreach emails refreshed - 3x per month",
  { text: "Dashboard and metric visibility", tag: "included" },
  "Admin portal access",
];

export function Pricing() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="pricing" className="py-[120px] px-6" style={{ background: "#0F1713" }}>
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div data-reveal-child>
          <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
            Investment
          </span>
          <h2
            className="font-serif text-white mt-4 leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            One setup. Runs every week after.
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: "#D4CCBE" }}>
            No ongoing contracts. No tools to manage. Everything is done before Monday.
          </p>
        </div>

        <div className="mt-12 h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <PricingCard
            label="One-time setup"
            badge="One time"
            price="$2,799"
            sub="Paid once. Yours to keep."
            features={setupFeatures}
            highlight
          />
          <PricingCard
            label="Monthly retainer"
            badge="Ongoing"
            price="$299"
            priceSuffix="/mo"
            sub="Cancel any time. No contracts."
            features={retainerFeatures}
          />
        </div>

        <div
          data-reveal-child
          className="mt-6 rounded-[14px] px-6 py-6 text-center"
          style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="font-serif italic text-[color:var(--gold)] text-base md:text-lg">
            "Most contractors working with property managers spend $2,000-$4,000 a month across separate tools. This replaces all of it."
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-light mb-6" style={{ color: "#B8B0A4" }}>
            One-time setup - $2,799 &nbsp;·&nbsp; Monthly retainer - $299 &nbsp;·&nbsp; No contracts. Cancel anytime.
          </p>
          <CtaButton size="lg">Book A Complementary 20min Strategy Call</CtaButton>
        </div>
      </div>
    </section>
  );
}

type Feature = string | { text: string; tag?: string };

function PricingCard({
  label,
  badge,
  price,
  priceSuffix,
  sub,
  features,
  highlight,
}: {
  label: string;
  badge: string;
  price: string;
  priceSuffix?: string;
  sub: string;
  features: Feature[];
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-[18px] p-8 flex flex-col"
      style={{
        background: highlight
          ? "linear-gradient(160deg, rgba(212,175,90,0.08), #111A14 60%)"
          : "#111A14",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
          {label}
        </span>
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", color: "#D4CCBE" }}
        >
          {badge}
        </span>
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-serif text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          {price}
        </span>
        {priceSuffix && <span className="text-white/50 text-lg">{priceSuffix}</span>}
      </div>
      <p className="mt-2 text-sm" style={{ color: "#D4CCBE" }}>{sub}</p>

      <div className="my-7 h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

      <div className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase mb-4">
        What's included
      </div>
      <ul className="space-y-3">
        {features.map((f, i) => {
          const text = typeof f === "string" ? f : f.text;
          const tag = typeof f === "string" ? undefined : f.tag;
          return (
            <li key={i} className="flex items-start gap-3 text-white/90">
              <Check size={18} className="text-[color:var(--gold)] shrink-0 mt-0.5" />
              <span className="font-light">
                {text}
                {tag && (
                  <span className="ml-2 text-[color:var(--gold)] text-xs">{tag}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
