import Link from "next/link";
import Testimonials from "./Testimonials";
import StatsCounter from "./StatsCounter";

const platforms = [
  {
    slug: "tiktok-comment-generator",
    name: " TikTok Comment Generator",
    description:
      "Create realistic TikTok comment screenshots with custom usernames, likes, and replies.",
    color: "from-[#010101] to-[#25F4EE]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.42-.01 6.83-.02 10.25-.17 4.14-4.23 7.25-8.26 6.5-3.91-.6-6.51-4.74-5.16-8.48 1.05-3.15 4.75-4.88 7.74-3.83.15.05.3.11.44.18v4.11c-.95-.41-2.06-.46-3.03-.09-1.57.55-2.5 2.37-1.92 3.93.5 1.52 2.27 2.37 3.75 1.83 1.25-.4 1.9-1.74 1.87-3.01-.01-5.3-.01-10.6-.01-15.91z" />
      </svg>
    ),
    cta: "Try Now",
  },
  {
    slug: "instagram-comment-generator",
    name: "Instagram Comment Generator",
    description:
      "Design authentic Instagram-style comments for reels, posts, and ad creatives.",
    color: "from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    cta: "Try Now",
  },
  {
    slug: "youtube-comment-generator",
    name: " YouTube Comment Generator",
    description:
      "Create YouTube comment mockups for videos, thumbnails, and social proof.",
    color: "from-[#ff0000] to-[#cc0000]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    cta: "Try Now",
  },
  {
    slug: "twitter-comment-generator",
    name: "X (Twitter) Comment Generator",
    description:
      "Generate clean, realistic X (Twitter) comment threads for marketing and content.",
    color: "from-[#000000] to-[#1d1d1d]",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
    cta: "Try Now",
  },
];

const HomepageContent = () => {
  return (
    <div className="bg-background border-t border-border">
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:90px_90px]" />
        {/* Top Glow */}
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/20 blur-[180px] rounded-full" />
        {/* Left Glow */}
        <div className="absolute top-[20%] left-[-180px] w-[380px] h-[380px] bg-fuchsia-500/10 rounded-full blur-[120px]" />
        {/* Right Glow */}
        <div className="absolute bottom-[10%] right-[-180px] w-[320px] h-[320px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-4 pb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.045em] leading-[0.95] text-center lg:text-left">
            Best Comment Generator Tools Online
          </h1>
          <h2 className="mt-7 text-[34px] sm:text-[44px] md:text-[34px] font-black tracking-[-0.045em] leading-[0.95] text-center lg:text-left">
            <span className="group inline-flex flex-wrap justify-center lg:justify-start gap-x-4">
              <span className="text-white transition-all duration-500 group-hover:text-white/80">
                Create
              </span>
              <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent transition-all duration-700 group-hover:brightness-125 group-hover:scale-[1.02] animate-gradient-x">
                Viral-Looking
              </span>
              <span className="text-white transition-all duration-500 group-hover:text-white/80">
                Social Proof
              </span>
              <span className="text-white/55 transition-all duration-500 group-hover:text-white/80">
                in Seconds
              </span>
            </span>
          </h2>
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-16 lg:gap-10 items-center">

            {/* ================= LEFT CONTENT ================= */}
            <div className="relative text-center lg:text-left">

              {/* Headline */}


              {/* Description */}
              <p className="mt-8 text-lg md:text-xl leading-relaxed text-white/70 max-w-[620px] mx-auto lg:mx-0 animate-in fade-in duration-1000">
                Generate ultra-realistic TikTok, Instagram, YouTube, and X comment screenshots designed for creators, marketers, agencies, and viral campaigns.
              </p>

              {/* Supporting Text */}
              <p className="mt-5 text-base leading-relaxed text-white/45 max-w-[560px] mx-auto lg:mx-0 animate-in fade-in duration-1000">
                No Photoshop. No design skills. Just choose a platform, customize the comments, and export stunning 4K mockups instantly.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4 animate-in fade-in duration-1000">

                {/* Primary Button */}
                <a
                  href="/tools"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-primary px-6 py-3  text-white  hover:opacity-90  font-semibold text-lg shadow-[0_10px_50px_rgba(168,85,247,0.35)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_80px_rgba(168,85,247,0.5)] active:scale-[0.98]"
                >
                  {/* Shine Effect */}
                  <span className="absolute inset-0 overflow-hidden rounded-2xl">
                    <span className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[120%]" />
                  </span>

                  <span className="relative z-10 flex items-center gap-2">
                    Generate  First Comment
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>

                {/* Secondary Button */}
                <a
                  href="/tools"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-7 py-4 text-white font-semibold text-lg transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06] hover:scale-[1.02]"
                >
                  Explore All Tools

                  <span className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>

              {/* Trust Line */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-white/45 animate-in fade-in duration-1000">

                <div className="flex items-center gap-1 text-primary text-base">
                  ★★★★★
                </div>

                <div className="hidden sm:block h-4 w-px bg-white/10" />

                <span>
                  Used by creators, meme pages, agencies, and growth marketers worldwide.
                </span>
              </div>
            </div>

            {/* ================= RIGHT IMAGE ================= */}
            <div className="relative flex items-center justify-center">

              {/* Floating Blur Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[420px] w-[420px] md:h-[520px] md:w-[520px] rounded-full bg-gradient-to-r from-primary/20 via-fuchsia-500/10 to-pink-500/20 blur-3xl animate-pulse" />
              </div>

              {/* Glass Card */}
              <div className="group relative w-full max-w-[520px] animate-in zoom-in-95 duration-1000">

                {/* Glow */}
                <div className="absolute inset-0 rounded-[34px] bg-gradient-to-r from-primary/20 via-fuchsia-500/20 to-pink-500/20 blur-2xl opacity-70 transition duration-500 group-hover:opacity-100" />

                {/* Border */}
                <div className="absolute inset-0 rounded-[34px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl" />

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/40 backdrop-blur-3xl p-3 md:p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.01]">

                  {/* Top Gradient Overlay */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent z-10" />

                  {/* Image */}
                  <img
                    src="/assets/tiktook-screenshot.png"
                    alt="Comment Generator Preview"
                    className="relative z-0 w-full rounded-[24px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Floating Badge */}
                  <div className="absolute top-5 right-5 z-20 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-2 shadow-2xl">
                    <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-sm font-semibold text-transparent">
                      Viral Ready 🚀
                    </span>
                  </div>

                  {/* Bottom Glass Fade */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <StatsCounter />

      <section className="max-w-[1100px] mx-auto px-6 pb-10" id="platforms">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Choose Your Platform
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground my-5"
            style={{ textWrap: "balance" }}
          >
            Generate pixel-perfect comment screenshots tailored for every major
            social platform.
          </h2>
          <p className="text-base text-muted-foreground max-w-[520px] mx-auto">
            Used by creators, agencies, and performance marketers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((p) => (
            <div
              key={p.slug}
              className="group rounded-2xl border border-border bg-card p-5 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-md mb-4`}
              >
                {p.icon}
              </div>
              <h3 className="font-bold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors">
                <Link href={`/tools/${p.slug}`}> {p.name} </Link>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {p.description}
              </p>
              <Link href={`/tools/${p.slug}`}>
                <span className="text-xs font-semibold text-primary mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {p.cta} →
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/tools"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
          >
            Explore More Tools
          </a>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="max-w-[1100px] mx-auto px-6 pb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary text-center block mb-3">
          WHY THIS TOOL EXISTS
        </span>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-500/10 via-background to-primary/10 p-8 md:p-12 text-center">
          {/* subtle glow */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-[720px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
              Built for Real Marketing Use Cases — Not Just Fun
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Most comment generators are built for entertainment. This platform
              is designed for professionals who need accurate, scalable, and
              high-quality social proof assets.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-3">
              Whether you're running ads, building case studies, or creating
              viral content — this tool helps you move faster and look more
              credible.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative overflow-hidden max-w-[1100px] mx-auto px-6 py-20">
        {/* ================= BACKGROUND ================= */}

        {/* Animated Noise Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Animated Aurora Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-fuchsia-500/10 blur-[120px] rounded-full animate-float-slow" />

        <div className="relative z-10">

          {/* ================= HEADER ================= */}

          <div className="text-center mb-16">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl px-4 py-2 shadow-[0_0_30px_rgba(168,85,247,0.12)]">

              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Features
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] leading-[0.95] text-white">

              <span className="block">
                Everything You Need
              </span>

              <span className="block mt-2 bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                to Create High-Quality
              </span>

              <span className="block mt-2 text-white/90">
                Comment Screenshots
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-base md:text-lg text-white/50 max-w-[720px] mx-auto leading-relaxed">
              Built for creators, marketers, and agencies who need speed, realism, quality, and scale.
            </p>
          </div>

          {/* ================= FEATURES GRID ================= */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "Pixel-Perfect Platform UI",
                desc: "Every layout matches real social media interfaces for authentic-looking screenshots.",
                icon: "🎯",
              },
              {
                title: "Full Customization",
                desc: "Control usernames, profile images, timestamps, likes, replies, and more.",
                icon: "✨",
              },
              {
                title: "Bulk Comment Generation",
                desc: "Generate multiple comment screenshots instantly using CSV uploads.",
                icon: "⚡",
              },
              {
                title: "4K High-Resolution Export",
                desc: "Export crystal-clear visuals optimized for ads, presentations, and content.",
                icon: "🖼️",
              },
              {
                title: "Saved Comment Library",
                desc: "Store and reuse your best-performing templates anytime.",
                icon: "📂",
              },
              {
                title: "No Watermarks",
                desc: "Keep your visuals clean, premium, and professional everywhere.",
                icon: "🚀",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 transition-all duration-700 hover:border-primary/40 hover:bg-white/[0.05] hover:shadow-[0_25px_100px_rgba(168,85,247,0.18)] hover:-translate-y-3"
                style={{
                  animationDelay: `${i * 120}ms`,
                }}
              >

                {/* ================= HOVER AURORA ================= */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-pink-500/10" />
                </div>

                {/* Moving Glow Orb */}
                <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-primary/15 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-125" />

                {/* Floating Border Glow */}
                <div className="absolute inset-[1px] rounded-[28px] border border-white/5 pointer-events-none group-hover:border-primary/20 transition duration-500" />

                {/* ================= CONTENT ================= */}

                <div className="relative z-10">

                  {/* Icon */}
                  <div className="relative inline-flex">

                    {/* Animated Ring */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-125 opacity-0 group-hover:opacity-100 transition duration-700" />

                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl text-3xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Number */}
                  <div className="mt-2 flex items-center justify-between">

                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                      Feature
                    </span>

                    <span className="text-2xl font-black tracking-[-0.08em] text-white/[0.06] transition duration-700 group-hover:text-primary/10 group-hover:translate-x-1">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white transition duration-500 group-hover:text-primary">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-white/50 transition duration-500 group-hover:text-white/70">
                    {feature.desc}
                  </p>

                  {/* Bottom Hover Line */}
                  <div className="mt-4 flex items-center gap-2">

                    <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-500 transition-all duration-700 group-hover:w-28" />

                    <div className="h-2 w-2 rounded-full bg-primary opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-125" />
                  </div>
                </div>

                {/* Mouse Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_65%)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden max-w-[1100px] mx-auto px-6 py-20">
        {/* ================= BACKGROUND ================= */}
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        <div className="relative z-10">

          {/* ================= HEADER ================= */}

          <div className="text-center mb-16">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-4 py-2 shadow-[0_0_40px_rgba(168,85,247,0.08)] animate-in fade-in duration-700">

              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                How It Works
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-3xl md:text-5xl font-black tracking-[-0.04em] leading-[1] text-white">
              Create Professional
              <span className="block bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Comment Screenshots
              </span>
              in 4 Simple Steps
            </h2>

            {/* Description */}
            <p className="mt-6 text-base md:text-lg text-white/50 max-w-[680px] mx-auto leading-relaxed">
              Go from idea to ready-to-use visuals in seconds — no design skills needed.
            </p>
          </div>

          {/* ================= STEPS ================= */}

          <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {[
              {
                step: "01",
                title: "Choose a Platform",
                desc: "Select TikTok, Instagram, YouTube, or X.",
                icon: "📱",
              },
              {
                step: "02",
                title: "Enter Comment Details",
                desc: "Add username, comment text, and engagement metrics.",
                icon: "💬",
              },
              {
                step: "03",
                title: "Customize Appearance",
                desc: "Adjust layout, replies, and visual elements.",
                icon: "✨",
              },
              {
                step: "04",
                title: "Export Instantly",
                desc: "Download high-quality images ready for use.",
                icon: "🚀",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-[0_20px_80px_rgba(168,85,247,0.18)] animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${i * 120}ms`,
                }}
              >

                {/* Card Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-pink-500/10" />
                </div>

                {/* Shine Hover Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                  <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[120%]" />
                </div>

                {/* Floating Blur */}
                <div className="absolute -top-16 right-[-30px] w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700" />

                {/* Step Number */}
                <div className="relative z-10 flex items-center justify-between">

                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl text-lg shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30">
                    {item.icon}
                  </div>

                  <span className="text-5xl font-black tracking-[-0.06em] text-white/10 transition duration-500 group-hover:text-primary/20">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-8">

                  <h3 className="text-xl font-bold text-white transition duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-white/50 transition duration-300 group-hover:text-white/70">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="relative z-10 mt-8 h-[2px] w-16 bg-gradient-to-r from-primary to-pink-500 rounded-full transition-all duration-500 group-hover:w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-[1100px] mx-auto px-6 pb-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-5">
            Designed for High-Impact Use Cases
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[620px] mx-auto">
            Built for professionals who need speed, credibility, and scalable
            content creation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Performance Marketers",
              desc: "Increase ad credibility using realistic social proof.",
              icon: "📈",
            },
            {
              title: "Content Creators",
              desc: "Boost engagement with viral-style comment content.",
              icon: "🔥",
            },
            {
              title: "Agencies",
              desc: "Create client-ready visuals for campaigns and reports.",
              icon: "🏢",
            },
            {
              title: "Designers",
              desc: "Skip manual mockups and generate assets instantly.",
              icon: "🎨",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-border bg-card p-6 text-center hover:border-primary transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-500/10 to-primary/10" />

              <div className="relative z-10">
                {/* icon */}
                <div className="text-3xl mb-4">{item.icon}</div>

                <h3 className="font-semibold text-foreground mb-2">
                  For {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM VS SOLUTION */}
      <section className="relative overflow-hidden max-w-[1100px] mx-auto px-6 py-20">

        {/* ================= BACKGROUND ================= */}

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        {/* Glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="relative z-10">

          {/* ================= HEADER ================= */}

          <div className="text-center mb-14">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-4 py-2 shadow-[0_0_40px_rgba(168,85,247,0.08)] animate-in fade-in duration-700">

              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Why Creators Prefer This
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-3xl md:text-5xl font-black tracking-[-0.04em] leading-[1] text-white">
              Why Not Just Screenshot
              <span className="block bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Real Comments?
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-base md:text-lg text-white/50 max-w-[620px] mx-auto leading-relaxed">
              Traditional methods are slow, risky, and limit your creativity.
            </p>
          </div>

          {/* ================= COMPARISON CARDS ================= */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* ================= LEFT CARD ================= */}

            <div className="group relative overflow-hidden rounded-[30px] border border-red-500/10 bg-red-500/[0.03] backdrop-blur-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:bg-red-500/[0.05] hover:shadow-[0_25px_90px_rgba(239,68,68,0.12)]">

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5" />
              </div>

              {/* Blur Orb */}
              <div className="absolute -top-20 -right-16 w-40 h-40 rounded-full bg-red-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100" />

              {/* Top */}
              <div className="relative z-10 flex items-center justify-between">

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl text-2xl shadow-lg transition duration-500 group-hover:scale-110">
                  ❌
                </div>

                {/* Label */}
                <span className="text-5xl font-black tracking-[-0.06em] text-red-500/10 transition duration-500 group-hover:text-red-500/20">
                  BAD
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-8">

                <h3 className="text-2xl font-bold text-red-400">
                  Problems with Screenshots
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  Manual screenshots create limitations, inconsistencies, and workflow problems.
                </p>

                {/* List */}
                <div className="mt-8 space-y-4">

                  {[
                    "No control over content",
                    "Privacy and compliance risks",
                    "Low resolution outputs",
                    "Not scalable for campaigns",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition duration-300 hover:bg-white/[0.04]"
                    >
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-400">
                        ✕
                      </div>

                      <span className="text-sm text-white/65 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT CARD ================= */}

            <div className="group relative overflow-hidden rounded-[30px] border border-primary/20 bg-white/[0.03] backdrop-blur-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-white/[0.05] hover:shadow-[0_25px_90px_rgba(168,85,247,0.16)]">

              {/* Animated Glow */}
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-pink-500/10" />
              </div>

              {/* Orb */}
              <div className="absolute -top-24 -right-10 w-44 h-44 rounded-full bg-primary/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100" />

              {/* Shine */}
              <div className="absolute inset-0 overflow-hidden rounded-[30px]">
                <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[120%]" />
              </div>

              {/* Top */}
              <div className="relative z-10 flex items-center justify-between">

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-primary/20 bg-primary/10 backdrop-blur-xl text-2xl shadow-lg transition duration-500 group-hover:scale-110">
                  ✨
                </div>

                {/* Label */}
                <span className="text-5xl font-black tracking-[-0.06em] text-primary/10 transition duration-500 group-hover:text-primary/20">
                  GOOD
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-8">

                <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:text-primary">
                  The Better Way
                </h3>

                <p className="mt-3 text-sm md:text-base text-white/50 leading-relaxed">
                  Get complete creative control, better quality, and faster execution — without limitations.
                </p>

                {/* List */}
                <div className="mt-8 space-y-4">

                  {[
                    "Full control over every detail",
                    "High-resolution, ad-ready exports",
                    "Safe, compliant, and scalable",
                    "Perfect for creators & marketers",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition duration-300 hover:bg-white/[0.04]"
                    >
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                        ✓
                      </div>

                      <span className="text-sm text-white/70 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 flex items-center gap-3 text-primary font-medium">

                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>

                  <span>
                    Faster workflow. Better results.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ SECTION */}
      <section className="border-t border-border bg-card/40 pb-10">
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold  mb-5 text-foreground flex gap-2 items-center justify-center">
              Frequently Asked <span className=" block bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent"> Questions </span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is this tool free to use?",
                a: "Yes, you can start with the free plan and upgrade anytime.",
              },
              {
                q: "Can I use these images for commercial purposes?",
                a: "Yes, they can be used in ads, presentations, and content.",
              },
              {
                q: "Are exports watermark-free?",
                a: "Yes, all paid plans include clean exports without watermarks.",
              },
              {
                q: "Does it support bulk generation?",
                a: "Yes, bulk generation is available in paid plans.",
              },
              {
                q: "Which platforms are supported?",
                a: "TikTok, Instagram, YouTube, and X (Twitter).",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-border bg-background p-5 transition-all hover:border-primary"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-foreground text-sm md:text-base">
                    {faq.q}
                  </span>

                  {/* plus icon */}
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20 mt-4">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-600/20 via-background to-primary/20 p-10 md:p-16 text-center">
          {/* glow effects */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/30 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-[700px] mx-auto">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-5">
              Start Creating High-Converting Social Proof Today
            </h2>

            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Join creators and marketers using smarter tools to build better
              content.
            </p>

            <Link
              href="/tools"
              className="inline-block px-8 py-3 rounded-xl font-semibold text-sm md:text-base bg-primary text-white shadow-lg hover:opacity-90 transition-all active:scale-[0.97]"
            >
              Start for Free →
            </Link>

            {/* trust note */}
            <p className="text-xs text-muted-foreground mt-4">
              No credit card required • Free plan available
            </p>
          </div>
        </div>
      </section>
    </div >
  );
};

export default HomepageContent;
