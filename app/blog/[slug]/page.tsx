import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';

const categoryGradient = (cat: string) => {
  const palette: Record<string, string> = {
    Marketing: 'from-sky-500 to-indigo-600',
    Psychology: 'from-violet-500 to-fuchsia-600',
    Design: 'from-amber-500 to-rose-600',
    Analytics: 'from-emerald-500 to-teal-600',
    'Creator Economy': 'from-pink-500 to-orange-500',
    YouTube: 'from-red-500 to-rose-700',
    Craft: 'from-slate-500 to-slate-800',
    Trends: 'from-cyan-500 to-blue-700',
    Ethics: 'from-stone-500 to-zinc-700',
    'X / Twitter': 'from-neutral-700 to-neutral-900',
    Process: 'from-lime-500 to-emerald-700',
  };
  return palette[cat] ?? 'from-sky-500 to-indigo-600';
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className={`relative bg-gradient-to-br ${categoryGradient(post.category)}`}>
        <div className="max-w-[820px] mx-auto px-6 pt-16 pb-20 text-white">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={13} /> All articles
          </Link>
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] mb-5" style={{ textWrap: 'balance' }}>
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-[640px] leading-relaxed" style={{ textWrap: 'pretty' }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 mt-7 text-xs text-white/80">
            <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
          </div>
        </div>
      </section>

      <article className="max-w-[680px] mx-auto px-6 py-16">
        <div className="space-y-5 text-[15px] text-foreground/85 leading-[1.75]" style={{ textWrap: 'pretty' }}>
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <section className="border-t border-border bg-card/40">
        <div className="max-w-[1000px] mx-auto px-6 py-14">
          <h2 className="text-xl font-bold text-foreground tracking-tight mb-6">Keep reading</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{r.category}</span>
                <h3 className="font-semibold text-foreground mt-2 mb-2 leading-snug group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.date} · {r.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
