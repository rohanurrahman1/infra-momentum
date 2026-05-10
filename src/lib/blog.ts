export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  published: string | boolean;
  created_at: string;
};

const API_URL = "https://sheetdb.io/api/v1/aqkewewxea16a";
const NOTIFY_WEBHOOK =
  "https://launchdigitally777.app.n8n.cloud/webhook-test/blog_status";
const NOTIFIED_KEY = "infrakore_notified_slugs_v1";

const isPublished = (v: BlogPost["published"]) => {
  if (typeof v === "boolean") return v;
  const s = String(v).trim().toLowerCase();
  return s === "true" || s === "ture" || s === "yes" || s === "1";
};

export async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load posts");
  const raw: BlogPost[] = await res.json();
  const posts = raw
    .filter((p) => p && p.slug && isPublished(p.published))
    .sort((a, b) => {
      const da = new Date(a.created_at).getTime() || 0;
      const db = new Date(b.created_at).getTime() || 0;
      return db - da;
    });
  void notifyNewlyPublished(posts);
  return posts;
}

async function notifyNewlyPublished(posts: BlogPost[]) {
  if (typeof window === "undefined") return;
  try {
    const stored = JSON.parse(
      localStorage.getItem(NOTIFIED_KEY) || "[]",
    ) as string[];
    const known = new Set(stored);
    const fresh = posts.filter((p) => !known.has(p.slug));
    if (fresh.length === 0) return;

    await Promise.allSettled(
      fresh.map((p) =>
        fetch(NOTIFY_WEBHOOK, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "blog.published",
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            image: p.image,
            created_at: p.created_at,
            url: `${window.location.origin}/blog/${p.slug}`,
          }),
        }),
      ),
    );

    localStorage.setItem(
      NOTIFIED_KEY,
      JSON.stringify([...known, ...fresh.map((p) => p.slug)]),
    );
  } catch {
    /* ignore */
  }
}

export function formatDate(s: string): string {
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
