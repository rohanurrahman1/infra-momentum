import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, Flame } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { BlogPost, fetchPosts, formatDate } from "@/lib/blog";

function readingTime(text: string): number {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function LatestBlogs() {
  const ref = useReveal<HTMLDivElement>();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    fetchPosts()
      .then((p) => setPosts(p))
      .catch(() => setPosts([]));
  }, []);

  if (posts && posts.length === 0) return null;

  const featured = posts?.[0];
  const popular = posts?.[1];
  const third = posts?.[2];
  const trending = posts?.slice(3, 6) ?? [];

  return (
    <section id="blog" className="py-[120px] px-6" style={{ background: "#0F1713" }}>
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6" data-reveal-child>
          <div>
            <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
              From the blog
            </span>
            <h2
              className="font-serif text-white mt-4 leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              Insights &amp; ideas.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold)] hover:gap-2.5 transition-all"
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        {posts === null ? (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5" data-reveal-child>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden animate-pulse ${i === 0 ? "lg:col-span-5" : "lg:col-span-3"}`}
                style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="aspect-[16/10] bg-white/5" />
                <div className="p-4 space-y-3">
                  <div className="h-3 w-20 bg-white/5 rounded" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5" data-reveal-child>
              {featured && (
                <FeaturedCard post={featured} />
              )}
              {popular && (
                <SmallCard post={popular} badge={{ label: "Popular", icon: <Flame size={12} /> }} />
              )}
              {third && (
                <SmallCard post={third} />
              )}
            </div>

            {trending.length > 0 && (
              <div
                data-reveal-child
                className="mt-6 rounded-[14px] px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2"
                style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span className="text-[color:var(--gold)] text-[11px] font-medium tracking-[0.2em] uppercase">
                  Trending now
                </span>
                {trending.map((p, i) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors min-w-0"
                  >
                    <span className="text-[color:var(--gold)] font-medium">#{i + 1}</span>
                    <span className="truncate max-w-[280px]">{p.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const mins = readingTime(post.content || post.excerpt);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group lg:col-span-5 flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ background: "var(--gold)", color: "#0F1713" }}
        >
          Featured
        </span>
        <span
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-white/90"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <Clock size={11} /> {mins} min read
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--gold)]">
          Outreach strategy
        </div>
        <h3 className="font-serif text-white mt-2 leading-snug text-xl md:text-2xl line-clamp-3">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed line-clamp-2" style={{ color: "#D4CCBE" }}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs" style={{ color: "#B8B0A4" }}>
            {formatDate(post.created_at)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold)]">
            Read article
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SmallCard({
  post,
  badge,
}: {
  post: BlogPost;
  badge?: { label: string; icon?: React.ReactNode };
}) {
  const mins = readingTime(post.content || post.excerpt);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group lg:col-span-3 sm:col-span-1 flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: "#111A14", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {badge && (
          <span
            className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase text-[color:var(--gold)]"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid var(--gold-border)", backdropFilter: "blur(4px)" }}
          >
            {badge.icon}
            {badge.label}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-white/90"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <Clock size={11} /> {mins} min
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--gold)]">
          {badge?.label === "Popular" ? "Monday system" : "Property managers"}
        </div>
        <h3 className="font-serif text-white mt-2 leading-snug text-base md:text-lg line-clamp-3">
          {post.title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed flex-1 line-clamp-2" style={{ color: "#D4CCBE" }}>
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "#B8B0A4" }}>
            {formatDate(post.created_at)}
          </span>
          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--gold)]">
            Read
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
