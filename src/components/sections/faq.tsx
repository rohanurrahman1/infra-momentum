import { useState } from "react";
import { Plus } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const faqs = [
  {
    q: "Do I need any technical knowledge?",
    a: "None. You do not configure anything, learn any tools, or set anything up. The only thing you do is open your inbox on Monday, review what is there, and send.",
  },
  {
    q: "What type of contractors is this built for?",
    a: "Roofing, exterior, and commercial trade contractors like HVAC, electrical, and plumbing. Anyone whose work involves property managers and building operators as clients.",
  },
  {
    q: "How are property managers selected?",
    a: "Every contact is matched to the type of work you do and the area you serve. We only surface property managers overseeing the kind of portfolio that needs your trade. No broad lists.",
  },
  {
    q: "How is this different from running ads?",
    a: "Ads put you in front of people who may or may not be looking. This puts a personalised email directly in front of a specific decision-maker who manages a property that already needs your trade. No ad spend. No broad targeting.",
  },
  {
    q: "What does it cost?",
    a: "Simple, one-time investment. Ongoing for less than you think.\n\nGetting started is $2,799. That covers the full setup, your targets identified, your trade matched, your outreach system built, and your first Monday inbox ready to go.\n\nAfter that, it runs for $300/month. That keeps the contacts refreshed, the emails personalised, and the system running every week, whether you're on a job or not.\n\nOne-time setup · $2,799, Monthly retainer · $300. No contracts. Cancel anytime.",
  },
  {
    q: "How quickly does it start?",
    a: "Most contractors see their first set of drafts in their inbox within the first week after the setup call. Timeline details are covered on the discovery call.",
  },
  {
    q: "Is this just email templates?",
    a: "No. The emails are what you see. Behind them is a system that sources contacts from live data, verifies them against your trade and region, and sequences follow-ups based on how each property manager responds. Templates don't track replies. This does.",
  },
  {
    q: "What happens when a property manager replies?",
    a: "The response is flagged and you're notified. Your next message is already drafted and waiting, written for that specific conversation and where it left off.",
  },
  {
    q: "What if they don't reply at all?",
    a: "Two follow-up drafts queue automatically, spaced at the right intervals. Each one is written for that specific contact and references the original outreach. You don't have to remember who you emailed or when, the system holds that for you.",
  },
  {
    q: "How do you make sure emails don't go to spam?",
    a: "Every email is checked before it goes out, deliverability, spam score, and sending behaviour are all monitored. The goal is inbox placement, not just outreach volume. An email that lands in spam is the same as no email at all.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="py-[120px] px-6" style={{ background: "#111A14" }}>
      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <div className="text-center" data-reveal-child>
          <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
            Common questions
          </span>
          <h2 className="font-serif text-white mt-4 leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            Straight answers.
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: "#D4CCBE" }}>
            Questions that most business like yours ask.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                data-reveal-child
                className="rounded-[14px] overflow-hidden"
                style={{
                  background: "#0F1713",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-white font-medium text-base md:text-lg">{f.q}</span>
                  <span
                    className="shrink-0 transition-transform duration-300 text-[color:var(--gold)]"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                  >
                    <Plus size={20} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: isOpen ? 800 : 0 }}
                >
                  <div className="px-6 pb-6 space-y-4">
                    {f.a.split("\n\n").map((para, idx) => (
                      <p
                        key={idx}
                        className="font-serif text-[17px] md:text-[18px] leading-[1.7] tracking-[0.005em]"
                        style={{ color: "rgba(255,255,255,0.78)", fontWeight: 300 }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
