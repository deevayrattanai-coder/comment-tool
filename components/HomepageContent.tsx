import Link from "next/link";
import AdSlot from "./AdSlot";

const platforms = [
  {
    slug: "tiktok",
    name: "TikTok",
    description:
      "Video & reply comment templates with verified badges and engagement metrics.",
    color: "from-[#010101] to-[#25F4EE]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.42-.01 6.83-.02 10.25-.17 4.14-4.23 7.25-8.26 6.5-3.91-.6-6.51-4.74-5.16-8.48 1.05-3.15 4.75-4.88 7.74-3.83.15.05.3.11.44.18v4.11c-.95-.41-2.06-.46-3.03-.09-1.57.55-2.5 2.37-1.92 3.93.5 1.52 2.27 2.37 3.75 1.83 1.25-.4 1.9-1.74 1.87-3.01-.01-5.3-.01-10.6-.01-15.91z" />
      </svg>
    ),
  },
  {
    slug: "instagram",
    name: "Instagram",
    description:
      "Pixel-perfect Post and Reels comments with timestamps and like counts.",
    color: "from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    slug: "youtube",
    name: "YouTube",
    description:
      "Video & Shorts threaded replies with like / dislike counts and verification.",
    color: "from-[#ff0000] to-[#cc0000]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    slug: "twitter",
    name: "X (Twitter)",
    description:
      "Authentic post replies with retweet, quote, and bookmark metrics.",
    color: "from-[#000000] to-[#1d1d1d]",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
];

const HomepageContent = () => {
  return (
    <div className="bg-background border-t border-border">
      <section className="max-w-[1100px] mx-auto px-6 pt-10 pb-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 mb-6">
          {/* Animated gradient background blur */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Animated Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                Create Scroll-Stopping Comments
              </span>
            </h1>

            {/* Animated Subtext */}
            <p className="text-base md:text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
              Instantly craft high-converting, platform-ready comments that look
              real, feel engaging, and boost your content presence across social
              media.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/platforms/tiktok"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
              >
                Start Generating →
              </a>
              <a
                href="/pricing"
                className="px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted transition"
              >
                View Plans
              </a>
            </div>
          </div>
        </div>

        <AdSlot label="Sponsored · Top Banner" size="leaderboard" />
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Pick a platform
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-3"
            style={{ textWrap: "balance" }}
          >
            Generate platform-specific comments
          </h2>
          <p className="text-base text-muted-foreground max-w-[520px] mx-auto">
            Open a dedicated workspace for each social network and start
            exporting in seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((p) => (
            <Link
              key={p.slug}
              href={`/platforms/${p.slug}`}
              className="group rounded-2xl border border-border bg-card p-5 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-md mb-4`}
              >
                {p.icon}
              </div>
              <h3 className="font-bold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {p.description}
              </p>
              <span className="text-xs font-semibold text-primary mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Open generator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-6">
        <AdSlot label="Sponsored · Mid Page" size="banner" />
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pt-6 pb-16">
        <div className="grid md:grid-cols-3 gap-5">
          <Link
            href="/bulk"
            className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 hover:shadow-md transition-all"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Power feature
            </span>
            <h3 className="font-bold text-foreground text-lg mt-1.5 mb-2">
              Bulk Generator
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload a CSV or Excel file with hundreds of comments and download
              every screenshot as a single ZIP.
            </p>
          </Link>
          <Link
            href="/pricing"
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-all"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Plans
            </span>
            <h3 className="font-bold text-foreground text-lg mt-1.5 mb-2">
              Pricing
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free for occasional creators. Upgrade for unlimited exports and
              bulk generation.
            </p>
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-all"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Account
            </span>
            <h3 className="font-bold text-foreground text-lg mt-1.5 mb-2">
              Your profile
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              View your export history, manage your password, and check usage
              against your plan limits.
            </p>
          </Link>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-12">
        <AdSlot label="Sponsored · Bottom" size="leaderboard" />
      </section>
    </div>
  );
};

export default HomepageContent;
