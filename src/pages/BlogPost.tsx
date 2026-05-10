import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LeadModalProvider } from "@/components/lead-modal";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlogPost as Post, fetchPosts, formatDate } from "@/lib/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    fetchPosts()
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug) || null;
        setPost(found);
        if (found) {
          document.title = `${found.title} | Infrakore Blog`;
          let m = document.querySelector('meta[name="description"]');
          if (!m) {
            m = document.createElement("meta");
            m.setAttribute("name", "description");
            document.head.appendChild(m);
          }
          m.setAttribute("content", found.excerpt || found.title);
        }
      })
      .catch(() => setPost(null));
  }, [slug]);

  return (
    <LeadModalProvider>
      <div className="min-h-screen" style={{ background: "#0F1713" }}>
        <SiteNav />
        <main className="pt-32 pb-24 px-6">
          <article className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[color:var(--gold)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={16} /> All posts
            </Link>

            {post === undefined ? (
              <div className="mt-10 animate-pulse space-y-6">
                <div className="h-4 w-32 bg-white/5 rounded" />
                <div className="h-10 w-3/4 bg-white/10 rounded" />
                <div className="aspect-[16/9] bg-white/5 rounded-2xl" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-5/6 bg-white/5 rounded" />
                  <div className="h-4 w-4/6 bg-white/5 rounded" />
                </div>
              </div>
            ) : post === null ? (
              <div className="mt-16 text-center">
                <h1 className="font-serif text-white text-3xl">Post not found</h1>
                <p className="mt-3" style={{ color: "#D4CCBE" }}>
                  This article may have been moved or unpublished.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-8">
                  <div className="text-xs tracking-[0.2em] uppercase" style={{ color: "#B8B0A4" }}>
                    {formatDate(post.created_at)}
                  </div>
                  <h1
                    className="font-serif text-white mt-4 leading-[1.05]"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                  >
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="mt-5 text-lg" style={{ color: "#D4CCBE" }}>
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {post.image && (
                  <div
                    className="mt-10 rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <img src={post.image} alt={post.title} className="w-full h-auto block" />
                  </div>
                )}

                <div
                  className="mt-10 font-serif text-[18px] leading-[1.8] whitespace-pre-wrap"
                  style={{ color: "rgba(255,255,255,0.85)", fontWeight: 300 }}
                >
                  {post.content}
                </div>
              </>
            )}
          </article>
        </main>
        <SiteFooter />
      </div>
    </LeadModalProvider>
  );
}
