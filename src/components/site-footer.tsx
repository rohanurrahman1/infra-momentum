import { Linkedin, Instagram } from "lucide-react";
import { Logo } from "./site-nav";
import { useLeadModal } from "./lead-modal";

export function SiteFooter() {
  const { open } = useLeadModal();
  return (
    <footer style={{ background: "#0A0E0B", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <Logo />
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <a href="#how-it-works" className="hover:text-[color:var(--gold)] transition-colors">How it works</a>
            <a href="#results" className="hover:text-[color:var(--gold)] transition-colors">Results</a>
            <a href="#faq" className="hover:text-[color:var(--gold)] transition-colors">FAQ</a>
            <button onClick={open} className="hover:text-[color:var(--gold)] transition-colors">Book a Call</button>
          </div>
          <div className="flex md:justify-end gap-4">
            <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-[color:var(--gold)] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://www.instagram.com/meem.recode?igsh=ZnQyMnNxbmV2anM4&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-[color:var(--gold)] transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-white/30 font-light">
          © 2025 Infrakore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
