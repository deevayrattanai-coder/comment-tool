"use client";

import { useState, useRef, useCallback } from "react";
import TweetPreview from "@/components/tweet-preview";
import TweetForm from "@/components/tweet-form";
import { TweetTheme } from "@/lib/suspension-types";
import { TweetData, defaultTweetData } from "@/lib/tweet-types";
import { downloadTweet } from "@/lib/download";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

function ThemeSelector({
  value,
  onChange,
}: {
  value: TweetTheme;
  onChange: (t: TweetTheme) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["light", "dim", "dark"] as TweetTheme[]).map((t) => {
        const bg = t === "dark" ? "#000" : t === "dim" ? "#15202b" : "#fff";
        const col = t === "light" ? "#0f1419" : "#e7e9ea";

        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${value === t
              ? "border-primary ring-2 ring-primary/20"
              : "border-border hover:border-primary/40"
              }`}
            style={{
              backgroundColor: bg,
              color: col,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default function TweetGenerator() {
  const [tweetData, setTweetData] =
    useState<TweetData>(defaultTweetData);

  const previewRef = useRef<HTMLDivElement>(null);

  const [downloading, setDownloading] = useState(false);

  const [active, setActive] = useState<number | null>(0);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;

    setDownloading(true);

    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user) {
        toast.error("Please login to download");
        setDownloading(false);
        return;
      }

      await downloadTweet(previewRef.current, tweetData.theme);

      toast.success("Tweet image saved successfully!");
    } finally {
      setDownloading(false);
    }
  }, [tweetData.theme]);

  const copyImage = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user) {
        toast.error("Please login to copy image");
        return;
      }

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);

          toast.success("Image copied to clipboard!");
        }
      });
    } catch {
      toast.error("Copy failed");
    }
  }, []);

  const faqs = [
    {
      q: "Do I need to log in to use this tool?",
      a: "Yes, login is required to securely save and manage your projects and exports.",
    },
    {
      q: "Can I customize tweet details?",
      a: "Yes, you can fully customize usernames, profile images, timestamps, likes, reposts, replies, and tweet content.",
    },
    {
      q: "Does premium support bulk generation?",
      a: "Yes, premium users can generate multiple tweets quickly for campaigns and workflows.",
    },
    {
      q: "Who is this tool designed for?",
      a: "This tool is perfect for creators, marketers, agencies, designers, and social media managers.",
    },
    {
      q: "Why is Comment Tools better than Top Comment?",
      a: `
    <a
      href="/"
      class="font-semibold text-purple-400 underline underline-offset-4 transition-colors hover:text-purple-300"
    >
      Comment Tools
    </a>
    is continuously expanding with more social media tools and advanced workflow features.
  `,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}

      <section className="border-b border-border bg-background">

        <div className="max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6 ">
          <aside>
            <div className="bg-card border border-border rounded-l-2xl overflow-hidden">
              <TweetForm tweetData={tweetData} onChange={setTweetData} />
              <div className="flex items-center gap-2 justify-center p-4 ">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1  h-9 gradient-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  <Download size={13} />
                  Export Image
                </button>

                <button
                  onClick={copyImage}
                  className="flex-1 h-9 glass-panel text-sidebar-text rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-sidebar-surface transition-all"
                >
                  <Copy size={13} />
                  Copy
                </button>
              </div>
            </div>
          </aside>
          <div className="flex flex-col flex-1 w-full ">
            <div className="flex rounded-tr-2xl items-center justify-between px-4 py-3 border-b border-border bg-card backdrop-blur-sm">
              <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                Preview
              </span>
              <div className="flex gap-3">
                <ThemeSelector
                  value={tweetData.theme}
                  onChange={(theme) => setTweetData({ ...tweetData, theme })}
                />
              </div>
            </div>
            <main className="flex flex-col items-center justify-start gap-4">
              <div
                className={`w-full rounded-br-2xl lg:h-[413px] h-full overflow-y-auto scrollbar-thin p-14 flex flex-col items-center justify-center transition-colors duration-300 bg-gray-200 dark-grid-dots`}
              >
                <TweetPreview ref={previewRef} tweetData={tweetData} />
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-14">
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              X / Twitter Mockup Tool
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Best Fake Tweet Generator Tool Online
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-4xl text-base md:text-lg leading-relaxed text-muted-foreground">
            The <b><i className="underline">Best Fake Tweet Generator Tool Online</i></b> helps creators, marketers, and agencies generate realistic tweet screenshots within seconds. Whether you're creating social media mockups, ad creatives, memes, or campaign visuals, this tool makes the process fast and effortless.
          </p>

          <p className="mt-4 max-w-4xl text-base md:text-lg leading-relaxed text-muted-foreground">
            Inspired by the real interface of X, our generator allows you to customize tweets with high accuracy while maintaining a clean and professional appearance.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition-all">
              <div className="text-xl mb-2">⚡</div>

              <h3 className="font-semibold text-foreground mb-1">
                Instant Tweet Generation
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Generate realistic tweet screenshots instantly without manual
                editing.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition-all">
              <div className="text-xl mb-2">🎨</div>

              <h3 className="font-semibold text-foreground mb-1">
                Fully Customizable
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Customize tweet content, profile details, engagement metrics,
                themes, and layouts easily.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition-all">
              <div className="text-xl mb-2">🚀</div>

              <h3 className="font-semibold text-foreground mb-1">
                Built for Creators
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Perfect for social media campaigns, meme content, client
                presentations, and marketing visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}


      {/* WHY USE */}
      <section className="border-b border-border bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why Use It
          </span>

          <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Why creators and marketers use fake tweet generators
          </h2>

          <p className="mt-4 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
            Social media visuals are becoming increasingly important for brands,
            creators, agencies, and content teams. Realistic tweet mockups help
            improve storytelling, ad creatives, campaign presentations, and
            engagement-focused content.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="flex gap-4 rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <span className="text-xl">🐦</span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Create realistic tweet screenshots instantly
                </h3>

                <p className="text-sm text-muted-foreground mt-1 leading-6">
                  Generate professional tweet visuals in seconds with a clean
                  interface.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <span className="text-xl">⏱️</span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Save hours of manual editing
                </h3>

                <p className="text-sm text-muted-foreground mt-1 leading-6">
                  Skip complicated design workflows and create tweet mockups
                  faster.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <span className="text-xl">📈</span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Improve campaign visuals
                </h3>

                <p className="text-sm text-muted-foreground mt-1 leading-6">
                  Build better presentations, ad creatives, and social proof
                  mockups.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <span className="text-xl">🎯</span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Perfect for creators and agencies
                </h3>

                <p className="text-sm text-muted-foreground mt-1 leading-6">
                  Designed for marketers, meme pages, freelancers, and social
                  media teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>

          <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Everything you need to generate realistic tweets
          </h2>

          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Built for realistic tweet creation, fast workflows, and professional
            social media presentations.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <div className="text-xl mb-2">💬</div>

              <h3 className="font-semibold text-foreground mb-1">
                Realistic Tweet Layout
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Generate tweet screenshots that closely match the real X
                platform UI.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <div className="text-xl mb-2">⚙️</div>

              <h3 className="font-semibold text-foreground mb-1">
                Advanced Customization
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Edit usernames, profile photos, timestamps, likes, reposts, and
                replies easily.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <div className="text-xl mb-2">⚡</div>

              <h3 className="font-semibold text-foreground mb-1">
                Bulk Generation
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Generate multiple tweet mockups quickly for campaigns and
                content workflows.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <div className="text-xl mb-2">🖼️</div>

              <h3 className="font-semibold text-foreground mb-1">
                High-Quality Export
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Export HD tweet screenshots for ads, portfolios, and social
                media presentations.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <div className="text-xl mb-2">🔒</div>

              <h3 className="font-semibold text-foreground mb-1">
                Secure Access
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Login-based access keeps your projects organized and securely
                managed.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur p-5 hover:shadow-md transition">
              <div className="text-xl mb-2">🌍</div>

              <h3 className="font-semibold text-foreground mb-1">
                Built for Global Creators
              </h3>

              <p className="text-sm text-muted-foreground leading-6">
                Used by creators, freelancers, and marketing teams across
                different industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Final Thoughts
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Create realistic tweet screenshots faster with a cleaner workflow
          </h2>

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            If you're looking to create professional and realistic tweet screenshots quickly, this is the <b><i className="underline">Best Fake Tweet Generator Tool Online</i></b> for creators and marketers. Moreover, Comment Tools continues expanding with more advanced tools and platforms for modern content workflows.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              FAQs
            </span>

            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <article
                  key={i}
                  className={`rounded-2xl border transition-all ${isOpen
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-background"
                    }`}
                >
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-5 px-5 py-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground text-base">
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`text-xl transition-transform ${isOpen ? "rotate-45" : ""
                        }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm md:text-base leading-7 text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.a }} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}