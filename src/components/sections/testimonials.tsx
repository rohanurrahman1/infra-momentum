import { useReveal } from "@/hooks/use-reveal";

const mainReview = {
  quote:
    "Meem was excellent to work with. She delivered a well-structured AI automation exactly within scope and was incredibly thorough throughout the process. What really stood out was her judgment, she focuses on building what actually adds value and will clearly tell you when something isn't necessary instead of creating extra flows that add complexity. She also implemented clear fallback logic, so the workflow had multiple routing points in case something failed, which made the system much more reliable. That level of honesty and clarity is rare and efficient. Communication was smooth, the work was thoughtful, and the final system worked perfectly. Very reliable. Highly recommend!",
  initials: "MK",
  name: "Mark K.",
  role: "Owner · MK Roofing, Toronto",
  url: "https://www.upwork.com/freelancers/~019292b5e09db299a6",
};

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
          <a
            href={mainReview.url}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal-child
            className="rounded-[14px] p-7 lift flex flex-col md:col-span-2 cursor-pointer"
            style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-[color:var(--gold)] tracking-widest text-sm">★★★★★</div>
            <p className="font-serif italic text-white/85 mt-5 leading-relaxed text-lg">
              "{mainReview.quote}"
            </p>
            <div className="mt-auto pt-7 flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium"
                style={{ background: "var(--gold)", color: "#0F1713" }}
              >
                {mainReview.initials}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{mainReview.name}</div>
                <div className="text-white/45 text-xs font-light">{mainReview.role}</div>
              </div>
            </div>
          </a>
          <div
            data-reveal-child
            className="rounded-[14px] p-7 flex items-center justify-center"
            style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)", minHeight: "240px" }}
          >
            <p className="font-serif italic text-white/40 text-xl">Coming soon..</p>
          </div>
        </div>
      </div>
    </section>
  );
}
