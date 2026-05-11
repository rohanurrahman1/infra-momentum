import { useEffect, useMemo, useState } from "react";
import { LeadModalProvider } from "@/components/lead-modal";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog-card";
import { BlogPost, fetchPosts } from "@/lib/blog";

type Filter = "latest" | "top";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("latest");

  useEffect(() => {
    document.title = "Blog | Infrakore — Insights for Contractors";
    const desc =
      "Articles, ideas, and field-tested playbooks for roofing, exterior, and trade contractors.";
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

  const sorted = useMemo(() => {
    if (!posts) return null;
    if (filter === "latest") return posts;
    // "Top Article" — featured field if present, else longest excerpt as a soft proxy
    const score = (p: BlogPost) => {
      const f = String((p as unknown as { featured?: string }).featured ?? "")
        .trim()
        .toLowerCase();
      const isFeatured = f === "true" || f === "yes" || f === "1";
      return (isFeatured ? 1000 : 0) + (p.excerpt?.length || 0);
    };
    return [...posts].sort((a, b) => score(b) - score(a));
  }, [posts, filter]);

  const TabButton = ({ id, label }: { id: Filter; label: string }) => {
    const active = filter === id;
    return (
      <button
        onClick={() => setFilter(id)}
        className="relative px-4 py-2 text-sm font-medium transition-colors"
        style={{ color: active ? "#FFFFFF" : "#B8B0A4" }}
      >
        {label}
        <span
          className="absolute left-2 right-2 -bottom-px h-px transition-opacity"
          style={{ background: "var(--gold)", opacity: active ? 1 : 0 }}
        />
      </button>
    );
  };

  return (
    <LeadModalProvider>
      <div className="min-h-screen" style={{ background: "#0F1713" }}>
        <SiteNav />
        <main className="pt-32 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <span className="text-[color:var(--gold)] text-xs font-medium tracking-[0.2em] uppercase">
                The Infrakore Blog
              </span>
              <h1
                className="font-serif text-white mt-4 leading-[1.05]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
              >
                Field notes for contractors.
              </h1>
              <p className="mt-5 text-lg" style={{ color: "#D4CCBE" }}>
                Practical writing on B2B lead generation, outreach systems, and the work
                behind winning property-management accounts.
              </p>
            </div>

            <div
              className="mt-12 flex items-center justify-center gap-2 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <TabButton id="latest" label="Latest" />
              <TabButton id="top" label="Top Article" />
            </div>

            <div className="mt-10">
              {error ? (
                <p className="text-center" style={{ color: "#B8B0A4" }}>
                  {error}
                </p>
              ) : sorted === null ? (
                <div className="flex flex-col gap-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden animate-pulse p-5 grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-5"
                      style={{
                        background: "#0F1713",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div className="aspect-[4/3] bg-white/5 rounded-xl" />
                      <div className="space-y-3 py-2">
                        <div className="h-3 w-24 bg-white/5 rounded" />
                        <div className="h-5 w-3/4 bg-white/10 rounded" />
                        <div className="h-4 w-full bg-white/5 rounded" />
                        <div className="h-4 w-5/6 bg-white/5 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : sorted.length === 0 ? (
                <p className="text-center" style={{ color: "#B8B0A4" }}>
                  No posts published yet. Check back soon.
                </p>
              ) : (
                <div className="flex flex-col gap-5">
                  {sorted.map((p) => (
                    <BlogCard key={p.slug} post={p} variant="row" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </LeadModalProvider>
  );
}
