import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, formatDate } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
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
      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs tracking-[0.18em] uppercase" style={{ color: "#B8B0A4" }}>
          {formatDate(post.created_at) || "Article"}
        </div>
        <h3 className="font-serif text-white mt-3 leading-snug text-xl md:text-2xl">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "#D4CCBE" }}>
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold)]">
          Read article
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
