import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const steps = [
  {
    tag: "Find",
    title: "The right property managers, already identified",
    body: "We surface decision makers managing the kind of properties that need your trade. No broad lists, no wrong contacts.",
    note: "Focused on Ontario-based residential and commercial portfolio managers",
  },
  {
    tag: "Check",
    title: "Checked and matched before anything goes out",
    body: "Every contact is verified and matched to what your business does. You only see the ones worth your time.",
    note: "No contact reaches your inbox without being confirmed as the right fit first",
  },
  {
    tag: "Ready to Send",
    title: "Personalized emails waiting in your inbox",
    body: "Each email is written for that specific contact and saved as a draft. Open Monday. Review. Send.",
    note: "The average contractor spends under 10 minutes on outreach per week",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="py-[120px] px-6" style={{ background: "#0F1713" }}>
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto" data-reveal-child>
          <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
            The process
          </span>
          <h2 className="font-serif text-white mt-4 leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            The work is already done
            <br />
            before you open your inbox.
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: "#D4CCBE" }}>
            Every Monday, the right contacts are found, checked, and ready, so your week starts with conversations, not coordination.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-24 hidden lg:block">
            <Preview active={active} />
          </div>

          <div className="order-1 lg:order-2 space-y-4" data-reveal-child>
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <div key={s.tag}>
                  <button
                    onClick={() => setActive(i)}
                    className="w-full text-left rounded-[14px] p-7 lift block"
                    style={{
                      background: isActive ? "#152019" : "#111A14",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderLeft: isActive ? "3px solid var(--gold)" : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs"
                      style={{
                        border: "1px solid var(--gold-border)",
                        color: "var(--gold)",
                      }}
                    >
                      {s.tag}
                    </span>
                    <h3 className="font-serif text-white mt-4 text-2xl leading-snug">{s.title}</h3>
                    <p className="mt-3 font-light leading-relaxed" style={{ color: "#D4CCBE" }}>{s.body}</p>
                    <p className="mt-3 font-light italic text-sm" style={{ color: "#B8B0A4" }}>{s.note}</p>
                  </button>
                  {isActive && (
                    <div className="lg:hidden mt-4">
                      <Preview active={active} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Preview({ active }: { active: number }) {
  return (
    <div
      key={active}
      className="rounded-[14px] p-6 fade-up min-h-[440px]"
      style={{
        background: "#0A0F0B",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {active === 0 && <FindPreview />}
      {active === 1 && <CheckPreview />}
      {active === 2 && <EmailPreview />}
    </div>
  );
}

function FindPreview() {
  const rows = [
    { c: "Maple Ridge Property Mgmt", l: "Toronto, ON", t: "Residential · 240 units" },
    { c: "Lakeshore Holdings", l: "Mississauga, ON", t: "Mixed · 18 buildings" },
    { c: "Northbridge Realty Group", l: "Ottawa, ON", t: "Commercial · 12 properties" },
    { c: "Cedarwood Residential", l: "Hamilton, ON", t: "Residential · 95 units" },
    { c: "Harbourpoint Asset Mgmt", l: "Burlington, ON", t: "Mixed · 8 buildings" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-white/40 uppercase tracking-wider">Filtered Results · Ontario</div>
        <div className="text-xs text-[color:var(--gold)]">5 matches</div>
      </div>
      <div className="grid grid-cols-12 gap-3 text-[10px] uppercase tracking-wider text-white/35 pb-3 border-b border-white/5">
        <div className="col-span-5">Company</div>
        <div className="col-span-3">Location</div>
        <div className="col-span-3">Portfolio</div>
        <div className="col-span-1 text-right">Status</div>
      </div>
      {rows.map((r) => (
        <div key={r.c} className="grid grid-cols-12 gap-3 text-sm py-3 border-b border-white/5 items-center">
          <div className="col-span-5 text-white/90">{r.c}</div>
          <div className="col-span-3 text-white/55 font-light">{r.l}</div>
          <div className="col-span-3 text-white/55 font-light text-xs">{r.t}</div>
          <div className="col-span-1 flex justify-end">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckPreview() {
  return (
    <div className="flex flex-col h-full">
      <div className="text-xs text-white/40 uppercase tracking-wider mb-6">Contact Profile</div>
      <div className="flex items-start gap-4">
        <div
          className="h-16 w-16 rounded-full flex items-center justify-center font-medium text-lg"
          style={{ background: "var(--gold)", color: "#0F1713" }}
        >
          JT
        </div>
        <div>
          <div className="text-white text-lg font-medium">Jennifer Tran</div>
          <div className="text-white/55 text-sm">Director of Operations</div>
          <div className="text-white/40 text-sm">Maple Ridge Property Mgmt</div>
        </div>
      </div>
      <div className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 self-start"
           style={{ background: "color-mix(in oklab, oklch(0.7 0.18 145) 18%, transparent)", border: "1px solid rgba(72, 187, 120, 0.4)" }}>
        <span className="text-emerald-400">✓</span>
        <span className="text-emerald-300 text-sm font-medium">Verified & Matched</span>
      </div>
      <div className="mt-8 space-y-3 text-sm">
        <Row k="Portfolio" v="240 residential units across 6 buildings" />
        <Row k="Region" v="Greater Toronto Area" />
        <Row k="Trade Match" v="Roofing · Exterior maintenance" />
        <Row k="Last Project Cycle" v="Q4 2024" />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-white/5">
      <span className="text-white/40">{k}</span>
      <span className="text-white/85 text-right">{v}</span>
    </div>
  );
}

function EmailPreview() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-white/40 uppercase tracking-wider">Drafts · Monday 8:00 AM</div>
        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: "color-mix(in oklab, var(--gold) 15%, transparent)", color: "var(--gold)" }}>
          Draft
        </span>
      </div>
      <div className="space-y-3 text-sm border-b border-white/5 pb-4">
        <div className="flex gap-3">
          <span className="text-white/40 w-16">To</span>
          <span className="text-white/90">Jennifer Tran &lt;j.tran@mapleridgepm.ca&gt;</span>
        </div>
        <div className="flex gap-3">
          <span className="text-white/40 w-16">Subject</span>
          <span className="text-white">Roof inspection cycle for the Maple Ridge portfolio</span>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-white/75 leading-relaxed font-light text-[15px]">
        <p>Hi Jennifer,</p>
        <p>
          Saw Maple Ridge manages 240 units across six properties in the GTA, most of those buildings are coming up on the typical re-inspection window.
        </p>
        <button className="text-[color:var(--gold)] text-sm font-medium hover:underline">
          See more...
        </button>
      </div>
    </div>
  );
}
