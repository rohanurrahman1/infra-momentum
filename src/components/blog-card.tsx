import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, formatDate } from "@/lib/blog";

type Props = {
  post: BlogPost;
  variant?: "default" | "compact" | "row";
};

export function BlogCard({ post, variant = "default" }: Props) {
  if (variant === "row") {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-5 sm:gap-6 rounded-2xl overflow-hidden p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "#0F1713",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl bg-black/40">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[11px] tracking-[0.18em] uppercase" style={{ color: "#B8B0A4" }}>
            {formatDate(post.created_at) || "Article"}
          </div>
          <h3 className="font-serif text-white mt-2 leading-snug text-xl md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: "#D4CCBE" }}>
            {post.excerpt}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold)]">
            Read article
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  const compact = variant === "compact";

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#0F1713",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-black/40">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className={compact ? "p-4 flex flex-col flex-1" : "p-6 flex flex-col flex-1"}>
        <div className="text-[11px] tracking-[0.18em] uppercase" style={{ color: "#B8B0A4" }}>
          {formatDate(post.created_at) || "Article"}
        </div>
        <h3
          className={
            compact
              ? "font-serif text-white mt-2 leading-snug text-base md:text-lg line-clamp-2"
              : "font-serif text-white mt-3 leading-snug text-xl md:text-2xl"
          }
        >
          {post.title}
        </h3>
        <p
          className={
            compact
              ? "mt-2 text-[13px] leading-relaxed flex-1 line-clamp-2"
              : "mt-3 text-sm leading-relaxed flex-1"
          }
          style={{ color: "#D4CCBE" }}
        >
          {post.excerpt}
        </p>
        <span className={`${compact ? "mt-3 text-[13px]" : "mt-5 text-sm"} inline-flex items-center gap-1.5 font-medium text-[color:var(--gold)]`}>
          Read article
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
