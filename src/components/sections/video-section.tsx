import { Play } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export function VideoSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section style={{ background: "#111A14" }} className="py-[120px] px-6">
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto" data-reveal-child>
          <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
            How it works
          </span>
          <h2 className="font-serif text-white mt-4 leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
            What runs in the background
            <br />
            while you work.
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: "#D4CCBE" } max-w-2xl mx-auto">
            Beyond the Monday inbox, the platform keeps running, tracking, and
            surfacing the right information so nothing slips through the week.
          </p>
        </div>

        <div
          className="reveal mt-16 aspect-video rounded-[14px] flex flex-col items-center justify-center gap-5 group cursor-pointer"
          data-reveal-child
          style={{
            background: "#0A0F0B",
            border: "1px dashed rgba(201,168,76,0.3)",
          }}
        >
          <div
            className="h-20 w-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "color-mix(in oklab, var(--gold) 20%, transparent)",
              border: "1px solid var(--gold)",
            }}
          >
            <Play size={28} className="text-[color:var(--gold)] ml-1" fill="currentColor" />
          </div>
          <p className="text-white/50 font-light text-sm">Service Overview Video. Coming Soon</p>
        </div>
      </div>
    </section>
  );
}
