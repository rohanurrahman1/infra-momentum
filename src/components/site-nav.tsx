import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { CtaButton } from "./cta-button";
import logoUrl from "@/assets/infrakore-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Infrakore home">
      <img src={logoUrl} alt="Infrakore" className="h-8 md:h-9 w-auto" />
    </Link>
  );
}

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/social", label: "Social Media" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(15,23,19,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-[color:var(--gold)] transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-[color:var(--gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <CtaButton>Book a Call</CtaButton>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? 420 : 0,
          background: "rgba(15,23,19,0.98)",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-white/5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-[color:var(--gold)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <CtaButton>Book a Call</CtaButton>
        </div>
      </div>
    </header>
  );
}
