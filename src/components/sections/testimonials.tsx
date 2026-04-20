import { useReveal } from "@/hooks/use-reveal";

const items = [
  {
    quote:
      "I used to spend Sunday evenings figuring out who to contact next week. Now I open my inbox on Monday and it's already there. It's a different week entirely.",
    initials: "MK",
    name: "Mark K.",
    role: "Owner · MK Roofing, Toronto",
  },
  {
    quote:
      "We landed two property management contracts in the first six weeks. Both were companies we'd never have found through referrals. The quality of the contacts was the real surprise.",
    initials: "DL",
    name: "Dan L.",
    role: "Director · Lakefront Exterior",
  },
  {
    quote:
      "I've tried ads, I've hired people for outreach. This is the first thing where I didn't have to think about it after the setup call. It just runs.",
    initials: "RB",
    name: "Ryan B.",
    role: "Owner · Broadview Roofing",
  },
];

export function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="results" className="py-[120px] px-6" style={{ background: "#0F1713" }}>
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto" data-reveal-child>
          <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
            What contractors say
          </span>
          <h2 className="font-serif text-white mt-4 leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            From the people who
            <br />
            made the switch.
          </h2>
          <p className="mt-5 text-white/55 font-light text-lg">
            Roofing and exterior contractors now working with commercial clients they couldn't reach before.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div
              key={t.name}
              data-reveal-child
              className="rounded-[14px] p-7 lift flex flex-col"
              style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-[color:var(--gold)] tracking-widest text-sm">★★★★★</div>
              <p className="font-serif italic text-white/85 mt-5 leading-relaxed text-lg">
                "{t.quote}"
              </p>
              <div className="mt-auto pt-7 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ background: "var(--gold)", color: "#0F1713" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-white/45 text-xs font-light">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
