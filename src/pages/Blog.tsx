import { useEffect, useState } from "react";
import { LeadModalProvider } from "@/components/lead-modal";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog-card";
import { BlogPost, fetchPosts } from "@/lib/blog";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog | Infrakore — Insights for Contractors";
    const desc = "Articles, ideas, and field-tested playbooks for roofing, exterior, and trade contractors.";
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

  return (
    <LeadModalProvider>
      <div className="min-h-screen" style={{ background: "#0F1713" }}>
        <SiteNav />
        <main className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
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
                Practical writing on B2B lead generation, outreach systems, and the work behind winning property-management accounts.
              </p>
            </div>

            <div className="mt-16">
              {error ? (
                <p className="text-center" style={{ color: "#B8B0A4" }}>{error}</p>
              ) : posts === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden animate-pulse"
                      style={{ background: "#0F1713", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div className="aspect-[16/10] bg-white/5" />
                      <div className="p-6 space-y-3">
                        <div className="h-3 w-24 bg-white/5 rounded" />
                        <div className="h-5 w-3/4 bg-white/10 rounded" />
                        <div className="h-4 w-full bg-white/5 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <p className="text-center" style={{ color: "#B8B0A4" }}>
                  No posts published yet. Check back soon.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((p) => (
                    <BlogCard key={p.slug} post={p} />
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
