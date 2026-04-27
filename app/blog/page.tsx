"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts, POSTS_PER_PAGE } from "@/data/blogPosts";

function BlogList() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = Math.max(1, Number(params.get("page") ?? "1"));
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const visible = blogPosts.slice(start, start + POSTS_PER_PAGE);

  const goTo = (p: number) => {
    const next = new URLSearchParams(params.toString());
    if (p === 1) next.delete("page");
    else next.set("page", String(p));
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="max-w-[1000px] mx-auto px-6 pt-20 pb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Comment tools Journal
        </span>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] mt-3 mb-4"
          style={{ textWrap: "balance" }}
        >
          Insights for content creators
        </h1>
        <p
          className="text-base text-muted-foreground max-w-[520px] mx-auto leading-relaxed"
          style={{ textWrap: "pretty" }}
        >
          Practical writing on social proof, comment culture, and creator
          workflows — straight from the team.
        </p>
      </section>

      <section className="max-w-[1000px] mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {post.category}
              </span>
              <h2
                className="font-semibold text-foreground text-[15px] mt-2 mb-2 leading-snug group-hover:text-primary transition-colors"
                style={{ textWrap: "balance" }}
              >
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border">
                <span>{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 mt-12">
          <button
            onClick={() => goTo(safePage - 1)}
            disabled={safePage === 1}
            className="h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground/70 hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`h-9 min-w-[36px] px-3 rounded-lg text-sm font-semibold transition-colors ${
                p === safePage
                  ? "gradient-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground/70 hover:bg-accent"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => goTo(safePage + 1)}
            disabled={safePage === totalPages}
            className="h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground/70 hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </section>
    </>
  );
}

export default function BlogPage() {
  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <BlogList />
      </Suspense>
    </SiteLayout>
  );
}
