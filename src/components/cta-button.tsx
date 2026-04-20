import { useLeadModal } from "./lead-modal";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

export function CtaButton({ children, variant = "primary", size = "md", className = "", onClick }: Props) {
  const { open } = useLeadModal();
  const handle = onClick ?? open;

  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 whitespace-nowrap";
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }[size];

  if (variant === "secondary") {
    return (
      <button
        onClick={handle}
        className={`${base} ${sizes} border border-[color:var(--gold)] text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      className={`${base} ${sizes} ${className}`}
      style={{ background: "var(--gold)", color: "#0F1713" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-hi)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
    >
      {children}
    </button>
  );
}
