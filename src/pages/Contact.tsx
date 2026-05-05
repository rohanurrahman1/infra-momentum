import { useEffect, useState } from "react";
import { LeadModalProvider } from "@/components/lead-modal";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    document.title = "Contact Infrakore | Book a Strategy Call";
  }, []);

  return (
    <LeadModalProvider>
      <div className="min-h-screen flex flex-col" style={{ background: "#0F1713" }}>
        <SiteNav />
        <main className="flex-1 px-6 pt-32 pb-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
                Contact
              </span>
              <h1 className="font-serif text-white mt-4 leading-[1.05]" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
                Book a <span className="italic text-[color:var(--gold)]">strategy call.</span>
              </h1>
              <p className="mt-5 text-white/55 font-light text-lg max-w-lg mx-auto">
                20 minutes. We walk you through how it works and whether it's the right fit for your business.
              </p>
            </div>

            <div
              className="mt-12 rounded-2xl p-8"
              style={{
                background: "#111A14",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: "2px solid var(--gold)",
              }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4"
                       style={{ background: "color-mix(in oklab, var(--gold) 20%, transparent)" }}>
                    <span className="text-[color:var(--gold)] text-2xl">✓</span>
                  </div>
                  <h2 className="font-serif text-2xl text-white">Request received.</h2>
                  <p className="text-white/55 mt-2 font-light">
                    We'll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const payload = {
                      name: fd.get("name"),
                      business: fd.get("business"),
                      phone: fd.get("phone"),
                      email: fd.get("email"),
                      work: fd.get("work"),
                      submittedAt: new Date().toISOString(),
                      source: "contact-page",
                    };
                    try {
                      await fetch("https://launchdigitally777.app.n8n.cloud/webhook/leadData", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });
                    } catch (err) {
                      console.error("Lead webhook failed", err);
                    }
                    setSubmitted(true);
                    window.open("https://calendly.com/business-meemcho/30min", "_blank", "noopener,noreferrer");
                  }}
                  className="space-y-5"
                >
                  <Field label="Full Name" name="name" required />
                  <Field label="Business Name" name="business" required />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Phone Number" name="phone" type="tel" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5 font-medium">
                      What type of work do you do?
                    </label>
                    <textarea
                      name="work"
                      rows={4}
                      required
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:border-[color:var(--gold)] focus:outline-none transition-colors"
                      placeholder="e.g. Commercial roofing, exterior renovations, GTA"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl py-3.5 font-medium transition-all duration-300 hover:brightness-110"
                    style={{ background: "var(--gold)", color: "#0F1713" }}
                  >
                    Request My Free Call
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </LeadModalProvider>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-1.5 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:border-[color:var(--gold)] focus:outline-none transition-colors"
      />
    </div>
  );
}
