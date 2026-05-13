import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Flame, Search } from "lucide-react";
import { LeadModalProvider } from "@/components/lead-modal";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlogPost, fetchPosts, formatDate } from "@/lib/blog";

type Category = "Outreach" | "Property managers" | "Monday system" | "Tools";
type Filter = "All" | Category;
type Sort = "recent" | "oldest" | "popular";

const CATEGORY_META: Record<Category, { emoji: string; bg: string }> = {
  Outreach: { emoji: "✉️", bg: "#16221A" },
  "Property managers": { emoji: "🏗️", bg: "#1A2018" },
  "Monday system": { emoji: "🔄", bg: "#15202A" },
  Tools: { emoji: "💰", bg: "#221E15" },
};

function inferCategory(p: BlogPost): Category {
  const t = `${p.title} ${p.excerpt}`.toLowerCase();
  if (/(tool|stack|software|app)/.test(t)) return "Tools";
  if (/monday|inbox|follow-?up|sequence/.test(t)) return "Monday system";
  if (/property manager|\bpm\b|landlord/.test(t)) return "Property managers";
  return "Outreach";
}

function readingTime(text: string): number {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("recent");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    document.title = "Blog | Infrakore — Insights & Ideas";
    const desc =
      "Outreach strategy, property manager insights, and the Monday system — explained.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);

    fetchPosts()
      .then(setPosts)
      .catch(() => setError("Couldn't load posts. Please try again later."));
  }, []);

  const enriched = useMemo(
    () =>
      (posts ?? []).map((p) => ({
        ...p,
        _category: inferCategory(p),
        _mins: readingTime(p.content || p.excerpt),
      })),
    [posts],
  );

  const filtered = useMemo(() => {
    let list = enriched;
    if (filter !== "All") list = list.filter((p) => p._category === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "recent") {
      sorted.sort(
        (a, b) =>
          (new Date(b.created_at).getTime() || 0) -
          (new Date(a.created_at).getTime() || 0),
      );
    } else if (sort === "oldest") {
      sorted.sort(
        (a, b) =>
          (new Date(a.created_at).getTime() || 0) -
          (new Date(b.created_at).getTime() || 0),
      );
    } else {
      sorted.sort((a, b) => (b.excerpt?.length || 0) - (a.excerpt?.length || 0));
    }
    return sorted;
  }, [enriched, filter, query, sort]);

  const featured = filtered[0];
  const popular = filtered[1];
  const third = filtered[2];
  const rest = filtered.slice(3);

  const FilterPill = ({ id }: { id: Filter }) => {
    const active = filter === id;
    return (
      <button
        onClick={() => {
          setFilter(id);
          setVisible(6);
        }}
        className="px-5 py-2 rounded-full text-sm transition-all"
        style={{
          background: active ? "rgba(201,168,76,0.12)" : "transparent",
          border: `1px solid ${active ? "var(--gold-border)" : "rgba(255,255,255,0.08)"}`,
          color: active ? "var(--gold)" : "#B8B0A4",
        }}
      >
        {id}
      </button>
    );
  };

  return (
    <LeadModalProvider>
      <div className="min-h-screen" style={{ background: "#0B100D" }}>
        <SiteNav />
        <main className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div>
              <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.22em] uppercase">
                All posts
              </span>
              <h1
                className="font-serif text-white mt-4 leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Insights &amp; ideas.
              </h1>
              <p className="mt-4 text-lg max-w-2xl" style={{ color: "#B8B0A4" }}>
                Outreach strategy, property manager insights, and the Monday system — explained.
              </p>
            </div>

            {/* Search */}
            <div
              className="mt-10 flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "#0F1713",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Search size={18} style={{ color: "#7A8077" }} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(6);
                }}
                placeholder="Search posts..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30 text-base"
              />
            </div>

            {/* Filter pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <FilterPill id="All" />
              <FilterPill id="Outreach" />
              <FilterPill id="Property managers" />
              <FilterPill id="Monday system" />
              <FilterPill id="Tools" />
            </div>

            {/* Sort */}
            <div className="mt-5">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="w-full rounded-xl px-5 py-4 text-base text-white outline-none cursor-pointer appearance-none"
                style={{
                  background: "#FFFFFF",
                  color: "#0F1713",
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230F1713' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1.25rem center",
                }}
              >
                <option value="recent">Most recent</option>
                <option value="oldest">Oldest first</option>
                <option value="popular">Most popular</option>
              </select>
            </div>

            {/* Content */}
            {error ? (
              <p className="mt-12 text-center" style={{ color: "#B8B0A4" }}>
                {error}
              </p>
            ) : posts === null ? (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl overflow-hidden animate-pulse ${i === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}
                    style={{
                      background: "#0F1713",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="aspect-[16/10] bg-white/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-3 w-24 bg-white/5 rounded" />
                      <div className="h-5 w-3/4 bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="mt-16 text-center" style={{ color: "#B8B0A4" }}>
                No posts match your filters.
              </p>
            ) : (
              <>
                {/* Featured + 2 small */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {featured && <FeaturedCard post={featured} />}
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                    {popular && (
                      <SmallCard
                        post={popular}
                        badge={{ label: "Popular", icon: <Flame size={12} /> }}
                      />
                    )}
                    {third && <SmallCard post={third} />}
                  </div>
                </div>

                {/* All posts list */}
                {rest.length > 0 && (
                  <div className="mt-16">
                    <div className="flex items-center gap-4 mb-2">
                      <span
                        className="text-xs tracking-[0.22em] uppercase"
                        style={{ color: "#B8B0A4" }}
                      >
                        All posts — {sort === "recent" ? "newest first" : sort === "oldest" ? "oldest first" : "most popular"}
                      </span>
                    </div>
                    <div
                      className="border-t"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      {rest.slice(0, visible).map((p) => (
                        <PostRow key={p.slug} post={p} />
                      ))}
                    </div>

                    {visible < rest.length && (
                      <div className="mt-10 flex justify-center">
                        <button
                          onClick={() => setVisible((v) => v + 6)}
                          className="px-7 py-3 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#FFFFFF",
                          }}
                        >
                          Load more posts
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        <SiteFooter />
      </div>
    </LeadModalProvider>
  );
}

type Enriched = BlogPost & { _category: Category; _mins: number };

function FeaturedCard({ post }: { post: Enriched }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group lg:col-span-7 flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#0F1713",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
            {CATEGORY_META[post._category].emoji}
          </div>
        )}
        <span
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase"
          style={{ background: "var(--gold)", color: "#0F1713" }}
        >
          Featured
        </span>
        <span
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-white/90"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <Clock size={11} /> {post._mins} min read
        </span>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--gold)]">
          {post._category}
        </div>
        <h3 className="font-serif text-white mt-3 leading-[1.15] text-2xl md:text-[28px] line-clamp-3">
          {post.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed line-clamp-3" style={{ color: "#D4CCBE" }}>
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs" style={{ color: "#B8B0A4" }}>
            {formatDate(post.created_at)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold)]">
            Read article →
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
  post: Enriched;
  badge?: { label: string; icon?: React.ReactNode };
}) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#0F1713",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
            {CATEGORY_META[post._category].emoji}
          </div>
        )}
        {badge && (
          <span
            className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--gold)]"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid var(--gold-border)",
              backdropFilter: "blur(4px)",
            }}
          >
            {badge.icon}
            {badge.label}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-white/90"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <Clock size={11} /> {post._mins} min
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--gold)]">
          {post._category}
        </div>
        <h3 className="font-serif text-white mt-2 leading-snug text-lg md:text-xl line-clamp-2">
          {post.title}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "#B8B0A4" }}>
            {formatDate(post.created_at)}
          </span>
          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--gold)]">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostRow({ post }: { post: Enriched }) {
  const meta = CATEGORY_META[post._category];
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid grid-cols-[64px_1fr_auto] gap-5 items-start py-6 border-b transition-colors"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
        style={{
          background: meta.bg,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {meta.emoji}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--gold)]">
            {post._category}
          </span>
        </div>
        <h3 className="mt-2 text-white text-[17px] md:text-lg font-medium leading-snug group-hover:text-[color:var(--gold)] transition-colors">
          {post.title}
        </h3>
        <p
          className="mt-1.5 text-sm leading-relaxed line-clamp-1"
          style={{ color: "#8A867D" }}
        >
          {post.excerpt}
        </p>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm" style={{ color: "#B8B0A4" }}>
          {formatDate(post.created_at)}
        </div>
        <div
          className="mt-1 inline-flex items-center gap-1 text-[12px]"
          style={{ color: "#7A8077" }}
        >
          <Clock size={11} /> {post._mins} min
        </div>
      </div>
      <ArrowUpRight
        size={0}
        className="hidden group-hover:block"
        aria-hidden
      />
    </Link>
  );
}
