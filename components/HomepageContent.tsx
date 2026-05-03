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
      <section className="max-w-[1100px] mx-auto px-6 pt-10 pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 mb-6">
          {/* Animated gradient background blur */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Animated Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                Best Comment Generator Tools Online
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Create High-Converting Social Media Comment Screenshots in Seconds
            </h2>

            {/* Animated Subtext */}
            <p className="text-base md:text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
              Generate realistic TikTok, Instagram, YouTube, and X (Twitter)
              comment images for ads, content, and presentations — no design
              skills required.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#platforms"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
              >
                Start Creating for Free
              </a>

              <a
                href="/pricing"
                className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

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
      <section className="max-w-[1100px] mx-auto px-6 pb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary text-center block mb-3">
          Features
        </span>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground my-5">
            Everything You Need to Create High-Quality Comment Screenshots
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[600px] mx-auto">
            Built for creators, marketers, and agencies who need speed, quality,
            and scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Pixel-Perfect Platform UI",
              desc: "Every comment layout matches real platform interfaces for maximum authenticity.",
            },
            {
              title: "Full Customization",
              desc: "Control usernames, profile images, timestamps, likes, replies, and more.",
            },
            {
              title: "Bulk Comment Generation",
              desc: "Upload CSV files and generate multiple comments instantly — ideal for agencies.",
            },
            {
              title: "4K High-Resolution Export",
              desc: "Export crystal-clear images optimized for ads, presentations, and content.",
            },
            {
              title: "Saved Comment Library",
              desc: "Store and reuse your best-performing comment formats anytime.",
            },
            {
              title: "No Watermarks",
              desc: "Maintain a clean, professional look across all your assets.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* subtle glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-500/10 to-primary/10" />

              <div className="relative z-10">
                {/* number badge */}
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm mb-4">
                  {i + 1}
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-[1100px] mx-auto px-6 pb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary text-center block mb-3">
          How It Works?
        </span>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-5">
            Create Professional Comment Screenshots in 4 Simple Steps
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[600px] mx-auto">
            Go from idea to ready-to-use visuals in seconds — no design skills
            needed.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Choose a Platform",
              desc: "Select TikTok, Instagram, YouTube, or X.",
            },
            {
              step: "02",
              title: "Enter Comment Details",
              desc: "Add username, comment text, and engagement metrics.",
            },
            {
              step: "03",
              title: "Customize Appearance",
              desc: "Adjust layout, replies, and visual elements.",
            },
            {
              step: "04",
              title: "Export Instantly",
              desc: "Download high-quality images ready for use.",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-border bg-card p-6 text-center hover:border-primary transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* step number */}
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-primary/20 text-primary font-bold">
                {item.step}
              </div>

              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>

              {/* connector line (desktop only) */}
            </div>
          ))}
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
      <section className="max-w-[1100px] mx-auto px-6 pb-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-5">
            Why Not Just Screenshot Real Comments?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[620px] mx-auto">
            Traditional methods are slow, risky, and limit your creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* PROBLEMS */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-4">
              Problems with Screenshots
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "No control over content",
                "Privacy and compliance risks",
                "Low resolution outputs",
                "Not scalable for campaigns",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SOLUTION */}
          <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-purple-500/10 to-primary/10 p-6 overflow-hidden">
            {/* glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-2xl rounded-full" />

            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-primary mb-4">
                The Better Way
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                With this tool, you get complete control, better quality, and
                faster execution — without limitations.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✔</span>
                  Full control over every detail
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✔</span>
                  High-resolution, ad-ready exports
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✔</span>
                  Safe, compliant, and scalable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="max-w-[1100px] mx-auto px-6 pb-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-5">
            Start Free. Upgrade When You Need More Power.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[600px] mx-auto">
            Flexible plans designed for individuals, creators, and growing
            teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Free Plan",
              highlight: false,
              features: [
                "Perfect for getting started",
                "Limited daily exports",
                "Basic customization",
                "Standard resolution",
              ],
            },
            {
              name: "Monthly Plan",
              highlight: true,
              badge: "Most Popular",
              features: [
                "For consistent creators",
                "Unlimited exports",
                "Bulk generation",
                "4K export",
                "Saved library",
              ],
            },
            {
              name: "Annual Plan",
              highlight: false,
              badge: "Best Value",
              features: [
                "For agencies and teams",
                "All features included",
                "Priority support",
                "Cost-effective pricing",
              ],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                plan.highlight
                  ? "border-primary bg-card shadow-xl"
                  : "border-border bg-card"
              }`}
            >
              {/* badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white shadow">
                  {plan.badge}
                </div>
              )}

              <h3 className="font-bold text-foreground text-lg mb-4 text-center">
                {plan.name}
              </h3>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✔</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-white hover:opacity-90 transition shadow-md"
          >
            View Full Pricing →
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ SECTION */}
      <section className="border-t border-border bg-card/40 pb-10">
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-5">
              Frequently Asked Questions
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
              href="/"
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
    </div>
  );
};

export default HomepageContent;
