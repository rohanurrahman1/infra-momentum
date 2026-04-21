import { useReveal } from "@/hooks/use-reveal";

const rows: [string, string, string][] = [
  ["Businesses", "Broad lists, manual search", "Pre-targeted, trade-matched"],
  ["Decision makers", "Unknown, often wrong person", "Already mapped before anything goes out"],
  ["Emails", "Written from scratch each time", "Already written, waiting in your drafts"],
  ["Follow ups", "Missed or inconsistent", "Built in. Nothing falls through"],
  ["Monthly cost", "$2,000 to $4,000 across tools", "A fraction of that on one platform"],
  ["Weekly time", "Hours every week", "10 minutes on Monday"],
];

export function WhyItWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-[120px] px-6" style={{ background: "#0F1713" }}>
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto" data-reveal-child>
          <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
            Why it works
          </span>
          <h2 className="font-serif text-white mt-4 leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            Most approaches require
            <br />
            effort every week. This one doesn't.
          </h2>
          <p className="mt-5 text-white/55 font-light text-lg">
            Built for contractors who are good at the work, not at chasing the next job.
          </p>
        </div>

        <div
          className="mt-14 rounded-[14px] border border-white/7 overflow-x-auto"
          data-reveal-child
          style={{ background: "#111A14" }}
        >
          <div className="min-w-[640px]">
            <div className="grid grid-cols-12 px-6 py-5 text-[11px] uppercase tracking-[0.18em] border-b border-white/5">
              <div className="col-span-4 text-white/40">Category</div>
              <div className="col-span-4" style={{ color: "#e88a8a" }}>Typical Approach</div>
              <div className="col-span-4 text-[color:var(--gold)]">Infrakore</div>
            </div>
            {rows.map(([cat, typ, infra], i) => (
              <div
                key={cat}
                data-reveal-row
                className={`grid grid-cols-12 px-6 py-5 text-sm md:text-base ${
                  i !== rows.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="col-span-4 text-white/70">{cat}</div>
                <div className="col-span-4 font-light" style={{ color: "rgba(232, 138, 138, 0.7)" }}>
                  {typ}
                </div>
                <div className="col-span-4 text-white font-medium" style={{ fontSize: "calc(1em + 1px)" }}>{infra}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="reveal mt-10 rounded-[14px] px-8 py-8 text-center"
          data-reveal-child
          style={{
            background: "color-mix(in oklab, var(--gold) 10%, transparent)",
            border: "1px solid var(--gold-border)",
          }}
        >
          <p className="font-serif italic text-[color:var(--gold)] text-xl md:text-2xl leading-relaxed">
            "Most approaches require effort every week.
            <br className="hidden sm:block" />
            This runs whether you have time or not."
          </p>
        </div>
      </div>
    </section>
  );
}
