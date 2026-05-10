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
            className={`flex-1 py-1 px-2 rounded-xl border-2 text-xs font-medium transition-all capitalize ${value === t ? "border-primary" : "border-border"}`}
            style={{ backgroundColor: bg, color: col }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default function TweetGenerator() {
  const [tweetData, setTweetData] = useState<TweetData>(defaultTweetData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [active, setActive] = useState<number | null>(0);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      // 🔐 Check login
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
      // 🔐 Check auth
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
    } catch (err) {
      toast.error("Copy failed");
    }
  }, [tweetData.theme]);


  const faqs = [
    {
      q: "Do I need to log in to use this tool?",
      a: "Yes, login is required to securely save and manage projects.",
    },
    {
      q: "Can I customize tweet details?",
      a: "Yes, you can fully customize usernames, profile images, likes, reposts, and tweet text.",
    },
    {
      q: "Does premium support bulk generation?",
      a: "Yes, premium users can generate tweets in bulk for faster workflows.",
    },
    {
      q: "Why is Comment Tools better than Top Comment?",
      a: "Comment Tools continues adding more platforms and advanced tools, giving users a more future-ready all-in-one solution.",
    },
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl mt-5 flex justify-center font-black leading-tight tracking-tight text-white lg:text-5xl">
        <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Best Fake Tweet Generator Tool Online
        </span>
      </h1>

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

        <div className="flex-1 w-full">
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
              className={`w-full rounded-tb-2xl p-8 flex flex-col items-center justify-center transition-colors duration-300 bg-gray-200 dark-grid-dots`}
            >
              <TweetPreview ref={previewRef} tweetData={tweetData} />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              For entertainment purposes only. Not affiliated with X Corp.
            </p>
          </main>
        </div>
      </div>


      <section
        className="relative overflow-hidden py-20 sm:py-28"
        aria-labelledby="fake-tweet-generator-heading"
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-dots opacity-40"
        />

        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Content Card */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] px-6 py-12 shadow-2xl backdrop-blur-2xl sm:px-10 sm:py-16 lg:px-16 lg:py-20">

            {/* Gradient Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 opacity-70"
            />

            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"
            />

            {/* Main Content */}
            <div className="relative z-10 text-center">

              {/* Heading */}
              <h2
                id="fake-tweet-generator-heading"
                className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Create Realistic Fake Tweets Instantly
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
                The Best Fake Tweet Generator Tool Online helps creators,
                marketers, and agencies generate realistic tweet screenshots
                within seconds. Whether you're creating social media mockups,
                ad creatives, memes, or campaign visuals, this tool makes the
                process fast and effortless.
              </p>

              <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-400 sm:text-xl">
                Inspired by the real interface of X, our generator allows you
                to customize tweets with high accuracy while maintaining a clean
                and professional appearance.
              </p>

              {/* Decorative Line */}
              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-[4px] w-32 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-20 sm:py-28"
        aria-labelledby="fake-tweet-generator-benefits"
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-dots opacity-40"
        />

        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                  Why Use a Fake Tweet Generator?
                </span>
              </div>
            </div>

            <h2
              id="fake-tweet-generator-benefits"
              className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Social media visuals are becoming increasingly important for
              creators and brands.
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
              Therefore, realistic tweet mockups can help improve presentations,
              engagement visuals, and creative storytelling.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            {/* Card 1 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all duration-300 group-hover:bg-purple-500/20"
              />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl shadow-lg">
                  🐦
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Create realistic tweet screenshots instantly
                </h3>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition-all duration-300 group-hover:bg-pink-500/20"
              />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                  ✏️
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Customize usernames, likes, reposts, and replies
                </h3>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20"
              />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-lg">
                  🎨
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Design engaging social media creatives
                </h3>
              </div>
            </article>

            {/* Card 4 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition-all duration-300 group-hover:bg-green-500/20"
              />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl shadow-lg">
                  ⏱️
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Save time on manual editing
                </h3>
              </div>
            </article>

            {/* Card 5 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-yellow-500/10 blur-2xl transition-all duration-300 group-hover:bg-yellow-500/20"
              />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl shadow-lg">
                  🚀
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Build better campaign mockups
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-20 sm:py-28"
        aria-labelledby="fake-tweet-features"
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-dots opacity-40"
        />

        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                  Key Features
                </span>
              </div>
            </div>

            <h2
              id="fake-tweet-features"
              className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Designed for realistic tweets and professional social media visuals
            </h2>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            {/* Card 1 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all duration-300 group-hover:bg-purple-500/20"
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl shadow-lg">
                  🐦
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Realistic Tweet UI
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Generate tweet screenshots that closely match the real X interface.
                </p>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition-all duration-300 group-hover:bg-pink-500/20"
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                  ✏️
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Full Customization
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Edit usernames, profile pictures, timestamps, likes, reposts,
                  and tweet text easily.
                </p>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20"
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-lg">
                  ⚡
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Bulk Generation (Premium)
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Generate multiple tweets instantly with premium bulk generation
                  features.
                </p>
              </div>
            </article>

            {/* Card 4 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition-all duration-300 group-hover:bg-green-500/20"
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl shadow-lg">
                  📥
                </div>

                <h3 className="text-2xl font-bold text-white">
                  High-Quality Export
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Download HD tweet screenshots for ads, presentations, and
                  portfolios.
                </p>
              </div>
            </article>

            {/* Card 5 */}
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/40">

              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-28 w-28 rounded-full bg-yellow-500/10 blur-2xl transition-all duration-300 group-hover:bg-yellow-500/20"
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl shadow-lg">
                  🔒
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Secure Login-Based Access
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  This tool requires login so you can securely save and manage
                  your projects.
                </p>
              </div>
            </article>
          </div>

          {/* Perfect For */}
          <div className="mt-24">

            <div className="mb-8 flex justify-center">
              <div className="inline-flex overflow-hidden rounded-full border border-blue-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

                  <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                    🎯 Perfect For
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "Social media managers",
                "Content creators",
                "Marketing agencies",
                "Meme creators",
                "Freelancers and designers",
              ].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.05]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <span className="relative z-10">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-20 sm:py-28"
        aria-labelledby="fake-tweet-final-thoughts"
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-dots opacity-40"
        />

        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] px-6 py-12 shadow-2xl backdrop-blur-2xl sm:px-10 sm:py-16 lg:px-16 lg:py-20">

            {/* Gradient Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10"
            />

            {/* Glow Effects */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-20 right-0 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 text-center">

              {/* Badge */}
              <div className="mb-6 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">

                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                  <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                    Final Thoughts
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h2
                id="fake-tweet-final-thoughts"
                className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                If you're looking to create professional and realistic tweet
                screenshots quickly, this is the Best Fake Tweet Generator Tool
                Online for creators and marketers.
              </h2>

              {/* Description */}
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Moreover, Comment Tools continues expanding with more advanced
                tools and platforms for modern content workflows.
              </p>

              {/* Bottom Accent */}
              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-[4px] w-32 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
              />
            </div>
          </div>
        </div>
      </section>




      <section
        className="relative overflow-hidden py-20 sm:py-28"
        aria-labelledby="faq-heading"
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-dots opacity-40"
        />

        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-14 text-center">

            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">

                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                  FAQs
                </span>
              </div>
            </div>

            <h2
              id="faq-heading"
              className="text-3xl font-black tracking-tight text-white sm:text-5xl"
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion */}
          <div className="space-y-5">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <article
                  key={i}
                  className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${isOpen
                    ? "border-purple-500/40 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.03] hover:border-purple-500/30"
                    } backdrop-blur-2xl`}
                >
                  {/* Hover Glow */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                  />

                  {/* Button */}
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${i}`}
                    className="relative z-10 flex w-full items-center justify-between gap-5 px-6 py-6 text-left sm:px-8"
                  >
                    <div className="flex items-start gap-4">

                      {/* Number */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white shadow-lg">
                        0{i + 1}
                      </div>

                      {/* Question */}
                      <span className="pt-1 text-base font-semibold leading-7 text-white sm:text-lg">
                        {faq.q}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl font-light text-white transition-all duration-300 ${isOpen
                        ? "rotate-45 border-purple-500/40 bg-purple-500/10"
                        : ""
                        }`}
                    >
                      +
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    id={`faq-content-${i}`}
                    className={`grid transition-all duration-500 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative z-10 border-t border-white/5 px-6 pb-6 pt-5 sm:px-8">
                        <p className="max-w-3xl text-sm leading-8 text-slate-400 sm:text-base">
                          {faq.a}
                        </p>
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
