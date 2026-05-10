import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { BlogPost, fetchPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";

export function LatestBlogs() {
  const ref = useReveal<HTMLDivElement>();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    fetchPosts()
      .then((p) => setPosts(p.slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  if (posts && posts.length === 0) return null;

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
              Insights & ideas.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold)] hover:gap-2.5 transition-all"
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-child>
          {posts === null
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden animate-pulse"
                  style={{
                    background: "#0F1713",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="aspect-[16/10] bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 bg-white/5 rounded" />
                    <div className="h-5 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                  </div>
                </div>
              ))
            : posts.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
}
