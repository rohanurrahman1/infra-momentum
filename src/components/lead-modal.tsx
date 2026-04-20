import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type Ctx = { open: () => void; close: () => void };
const LeadModalContext = createContext<Ctx>({ open: () => {}, close: () => {} });

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <LeadModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 py-6"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-border overflow-hidden fade-up"
            style={{
              backgroundColor: "#111A14",
              borderTop: "2px solid var(--gold)",
            }}
          >
            <div className="flex items-start justify-between p-6 pb-2">
              <div>
                <h3 className="font-serif text-3xl text-white leading-tight">
                  Book your <span className="text-[color:var(--gold)] italic">strategy call</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-light">
                  20 minutes. No commitment. No sales pressure.
                </p>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="text-white/60 hover:text-[color:var(--gold)] transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4"
                     style={{ background: "color-mix(in oklab, var(--gold) 20%, transparent)" }}>
                  <span className="text-[color:var(--gold)] text-2xl">✓</span>
                </div>
                <h4 className="font-serif text-2xl text-white">Request received.</h4>
                <p className="text-muted-foreground mt-2 font-light">
                  We'll be in touch within one business day to confirm your call.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-6 pt-4 space-y-4">
                <Field label="Full Name" name="name" required />
                <Field label="Business Name" name="business" required />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone Number" name="phone" type="tel" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1.5 font-medium">
                    What type of work do you do?
                  </label>
                  <textarea
                    name="work"
                    rows={3}
                    required
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:border-[color:var(--gold)] focus:outline-none transition-colors"
                    placeholder="e.g. Commercial roofing, exterior renovations, Toronto + GTA"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl py-3.5 font-medium transition-all duration-300 hover:brightness-110"
                  style={{ background: "var(--gold)", color: "#0F1713" }}
                >
                  Request My Free Call
                </button>
                <p className="text-xs text-white/40 text-center font-light">
                  We typically reply within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
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
