import SiteLayout from "@/components/SiteLayout";
import { Target, Users, Lightbulb, ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us | Comment Tools",
  description:
    "Learn how Comment Tools helps creators and marketers generate engaging comments faster. Built to save time and improve social media growth.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-10 text-center">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-600/10 via-background to-primary/10 p-10 md:p-16">
          {/* background glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/30 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-[750px] mx-auto">
            {/* badge */}
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Social Proof Generator
            </span>

            {/* headline */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-primary bg-clip-text text-transparent">
                Built for Modern Creators
              </span>
              <br className="hidden md:block" />
              and Marketing Teams
            </h1>

            {/* subheadline */}
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-[620px] mx-auto">
              We help agencies, creators, and brands generate high-quality
              social media comment visuals — faster, smarter, and at scale.
            </p>

            {/* trust line */}
            <p className="text-xs text-muted-foreground mt-4">
              No credit card required • Free plan available
            </p>
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="relative overflow-hidden py-20">
        {/* Aurora Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-72 w-72 bg-primary/30 blur-3xl animate-pulse rounded-full" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 bg-pink-500/20 blur-3xl animate-pulse rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
        </div>

        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary shadow-lg">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                Our Mission
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Making{" "}
                <span className="bg-gradient-to-r from-primary via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Social Proof
                </span>{" "}
                Creation Effortless
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                We help creators, marketers, and modern teams generate realistic
                social proof visuals without wasting hours designing manually.
              </p>
            </div>

            {/* RIGHT - CLAY CARD */}
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-primary/40 via-pink-500/30 to-cyan-400/30 blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-[inset_8px_8px_20px_rgba(255,255,255,0.06),inset_-8px_-8px_20px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="space-y-5 text-sm md:text-base text-gray-300 leading-relaxed">
                  <p>
                    Our mission is simple — to help creators and marketers generate
                    realistic, high-quality social proof without relying on outdated
                    workflows or unreliable tools.
                  </p>

                  <p>
                    In today’s digital landscape, perception matters. Whether it’s
                    for ads, presentations, or content, visual engagement can
                    dramatically increase trust and conversions.
                  </p>

                  <p>
                    We’re building tools that make this process fast, accurate, and
                    scalable — so you can focus on growth instead of repetitive
                    design work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PILLARS */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: "Fast",
                desc: "Generate stunning comment visuals within seconds.",
              },
              {
                title: "Accurate",
                desc: "Pixel-perfect layouts matching real platform UI.",
              },
              {
                title: "Scalable",
                desc: "Built for creators, startups, and large agencies.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-pink-500/10 to-cyan-400/20" />

                {/* Floating Blur */}
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl group-hover:scale-150 transition duration-700" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-lg font-bold text-white shadow-inner">
                    0{index + 1}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM WE SOLVE */}
      <section className="relative overflow-hidden py-24">
        {/* MESH GRADIENT BACKGROUND */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-primary/20 blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-0 h-[450px] w-[450px] bg-pink-500/20 blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] bg-cyan-400/10 blur-[120px] animate-blob animation-delay-4000" />
        </div>

        {/* GRID OVERLAY */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-[1150px] mx-auto px-6">
          {/* TOP HEADER */}
          <div className="max-w-[760px] mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-2 shadow-xl">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                The Problem
              </span>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-white">
              Creating realistic{" "}
              <span className="bg-gradient-to-r from-primary via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                social proof
              </span>{" "}
              visuals has always been slow and inefficient.
            </h2>

            <p className="mt-5 text-lg text-gray-400 leading-relaxed">
              Most creators and marketing teams still rely on outdated workflows that
              waste time, reduce quality, and limit scalability.
            </p>
          </div>

          {/* CONTENT GRID */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT CARD */}
            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]">
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 via-pink-500/10 to-cyan-400/10" />

              {/* Neumorphism Shadow */}
              <div className="absolute inset-0 rounded-[32px] shadow-[inset_8px_8px_20px_rgba(255,255,255,0.06),inset_-8px_-8px_20px_rgba(0,0,0,0.25)]" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 shadow-inner">
                  <span className="text-2xl">⚡</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">
                  What people rely on today
                </h3>

                <ul className="space-y-5">
                  {[
                    "Manual design tools like Photoshop",
                    "Low-quality generators with inaccurate layouts",
                    "Real screenshots that lack flexibility and control",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-gray-300"
                    >
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 border border-primary/20">
                        <span className="text-primary text-sm">✓</span>
                      </div>

                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]">
              {/* Animated Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-pink-500/10 to-orange-400/10" />

              {/* Clay / Neumorphism */}
              <div className="absolute inset-0 rounded-[32px] shadow-[inset_8px_8px_20px_rgba(255,255,255,0.06),inset_-8px_-8px_20px_rgba(0,0,0,0.25)]" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 shadow-inner">
                  <span className="text-2xl">✕</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">
                  What this leads to
                </h3>

                <ul className="space-y-5">
                  {[
                    "Inconsistent visuals across campaigns",
                    "Time-consuming and repetitive workflows",
                    "Limited flexibility and creative control",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-gray-300"
                    >
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 text-sm">✕</span>
                      </div>

                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM GLASS CTA */}
          <div className="relative mt-12 group">
            <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-r from-primary/30 via-pink-500/20 to-cyan-400/20 blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />

            <div className="relative rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 text-center shadow-[inset_8px_8px_20px_rgba(255,255,255,0.04),inset_-8px_-8px_20px_rgba(0,0,0,0.25)]">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-[760px] mx-auto">
                The result? Slower execution, lower-quality assets, and missed
                opportunities to build trust and conversions through visual social
                proof.
              </p>

              <button className="mt-8 rounded-full bg-gradient-to-r from-primary via-pink-500 to-cyan-400 px-8 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-primary/40">
                Claim Offer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTION */}
      <section className="relative overflow-hidden py-24">
        {/* LIQUID BLOBS */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="liquid-blob absolute top-10 left-[-120px] h-[380px] w-[380px] rounded-full bg-primary/20 blur-[90px]" />

          <div className="liquid-blob animation-delay-2000 absolute bottom-0 right-[-100px] h-[420px] w-[420px] rounded-full bg-pink-500/20 blur-[100px]" />

          <div className="liquid-blob animation-delay-4000 absolute top-1/2 left-1/2 h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-[90px]" />
        </div>

        {/* GRID OVERLAY */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-[1150px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* LEFT SIDE */}
            <div className="relative z-10">
              {/* CLAY BADGE */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-2xl px-5 py-2 shadow-[inset_4px_4px_12px_rgba(255,255,255,0.08),inset_-4px_-4px_12px_rgba(0,0,0,0.25)]">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Our Solution
                </span>
              </div>

              {/* HEADING */}
              <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-white">
                A Smarter Way to Create{" "}
                <span className="bg-gradient-to-r from-primary via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Social Proof
                </span>{" "}
                at Scale
              </h2>

              {/* TEXT */}
              <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                We built a platform that lets you generate pixel-perfect social media
                comment visuals across TikTok, Instagram, YouTube, and X — all within
                seconds.
              </p>

              <p className="mt-5 text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
                With full customization, high-resolution exports, and bulk
                generation, you can replace hours of manual work with a fast,
                professional workflow.
              </p>

              {/* CTA BUTTON */}
              <button className="group relative mt-8 overflow-hidden rounded-full border border-white/10 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-cyan-400 opacity-0 transition duration-500 group-hover:opacity-100" />

                <span className="relative z-10 flex items-center gap-2">
                  Start Creating
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative">
              {/* FLOATING CARD GLOW */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-primary/20 via-pink-500/10 to-cyan-400/20 blur-2xl opacity-70" />

              <div className="relative space-y-5 rounded-[36px] border border-white/10 bg-white/10 backdrop-blur-2xl p-7 shadow-[inset_8px_8px_20px_rgba(255,255,255,0.05),inset_-8px_-8px_20px_rgba(0,0,0,0.25)]">
                {[
                  "Pixel-perfect platform layouts",
                  "Full control over every detail",
                  "Bulk generation for scale",
                  "High-resolution, ad-ready exports",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-5 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10"
                  >
                    {/* HOVER GRADIENT */}
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-primary/10 via-pink-500/10 to-cyan-400/10" />

                    {/* LIQUID LIGHT */}
                    <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-150" />

                    <div className="relative z-10 flex items-center gap-4">
                      {/* ICON */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-[inset_4px_4px_12px_rgba(255,255,255,0.08),inset_-4px_-4px_12px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        ✔
                      </div>

                      {/* TEXT */}
                      <span className="text-sm md:text-base font-medium text-gray-200">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="relative overflow-hidden py-24">
        {/* MATRIX RAIN BACKGROUND */}
        <div className="absolute inset-0 -z-20 overflow-hidden opacity-20">
          <div className="matrix-rain" />
        </div>

        {/* GRADIENT GLOW */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%)]" />

        {/* GRID LINES */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-[1150px] mx-auto px-6">
          {/* HEADER */}
          <div className="max-w-[760px] mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl shadow-[inset_4px_4px_10px_rgba(255,255,255,0.06),inset_-4px_-4px_10px_rgba(0,0,0,0.25)]">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                What Sets Us Apart
              </span>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-white">
              Designed for{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient">
                Professional-Grade
              </span>{" "}
              Workflows
            </h2>

            <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl">
              Built for marketers, agencies, and creators who need scalable, accurate,
              and production-ready social proof generation.
            </p>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 relative z-10">
            {[
              {
                title: "Built for Professionals",
                desc: "Unlike casual tools, our platform is designed specifically for marketers, agencies, and serious creators.",
              },
              {
                title: "Accuracy First",
                desc: "Every interface is crafted to closely match real platform UI for maximum authenticity.",
              },
              {
                title: "Scalable Workflow",
                desc: "From single comments to bulk generation, the platform adapts to your workflow.",
              },
              {
                title: "High-Quality Output",
                desc: "Export in high resolution, ready for ads, content, and presentations.",
              },
              {
                title: "Clean & Professional",
                desc: "No unnecessary clutter, no gimmicks — just a focused, powerful tool.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-7 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
              >
                {/* NEUMORPHISM SHADOW */}
                <div className="absolute inset-0 rounded-[30px] shadow-[inset_8px_8px_20px_rgba(255,255,255,0.05),inset_-8px_-8px_20px_rgba(0,0,0,0.25)]" />

                {/* MATRIX GLOW */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-green-400/10 via-primary/10 to-cyan-400/10" />

                {/* SCAN LINE */}
                <div className="absolute -top-full left-0 h-full w-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:top-full group-hover:opacity-100" />

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* NUMBER ICON */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-bold text-white shadow-[inset_4px_4px_10px_rgba(255,255,255,0.06),inset_-4px_-4px_10px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                    0{index + 1}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-white mb-3 transition duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.desc}
                  </p>

                  {/* UNDERLINE */}
                  <div className="mt-6 h-[3px] w-10 rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500 group-hover:w-24" />
                </div>

                {/* CORNER LIGHT */}
                <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan-400/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="relative overflow-hidden py-24">
        {/* ANIMATED BACKGROUND */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {/* Aurora Glow */}
          <div className="absolute top-[-120px] left-[-100px] h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px] animate-float" />

          <div className="absolute bottom-[-150px] right-[-120px] h-[450px] w-[450px] rounded-full bg-cyan-400/20 blur-[140px] animate-float-delay" />

          <div className="absolute top-1/2 left-1/2 h-[320px] w-[320px] rounded-full bg-pink-500/10 blur-[100px] animate-pulse-slow" />
        </div>

        {/* GRID LAYER */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* NOISE OVERLAY */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] mix-blend-soft-light" />

        <div className="max-w-[1150px] mx-auto px-6 relative z-10">
          {/* HEADER */}
          <div className="max-w-[760px] mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Who Uses Our Platform
              </span>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-white">
              Built for Teams That Need{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Speed, Quality,
              </span>{" "}
              and Scale
            </h2>

            <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl">
              Designed for creators, agencies, marketers, and professionals who need
              realistic social proof visuals without wasting hours on manual design.
            </p>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 gap-7">
            {[
              {
                title: "Performance Marketing Teams",
                desc: "Create high-converting ad creatives using realistic engagement visuals.",
                icon: "📈",
              },
              {
                title: "Social Media Creators",
                desc: "Enhance content with viral-style comment formats.",
                icon: "🔥",
              },
              {
                title: "Agencies",
                desc: "Deliver polished, client-ready visuals at scale.",
                icon: "🚀",
              },
              {
                title: "Designers & Freelancers",
                desc: "Skip manual mockups and generate assets instantly.",
                icon: "🎨",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-7 transition-all duration-500 hover:-translate-y-3 hover:border-primary/40 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)]"
              >
                {/* GLOW BACKGROUND */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-cyan-400/10 to-pink-500/10" />

                {/* FLOATING LIGHT */}
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/20 blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-150" />

                {/* GLASS SHADOW */}
                <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.2)]" />

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* ICON */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold text-white mb-3 transition duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-base leading-relaxed text-gray-300">
                    {item.desc}
                  </p>

                  {/* UNDERLINE */}
                  <div className="mt-6 h-[3px] w-10 rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500 group-hover:w-24" />
                </div>

                {/* SHIMMER */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute top-0 left-[-120%] h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[120%] transition-all duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="relative overflow-hidden max-w-[1100px] mx-auto px-6 py-24">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_30%)]" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:75px_75px]" />

        {/* Floating Orbs */}
        <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] rounded-full bg-primary/20 blur-[120px] animate-float-orb" />

        <div className="absolute bottom-[-150px] right-[-120px] w-[360px] h-[360px] rounded-full bg-fuchsia-500/20 blur-[130px] animate-float-orb-delayed" />

        {/* Moving Light Beam */}
        <div className="absolute top-0 left-[-20%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rotate-12 blur-3xl animate-light-pass" />

        <div className="relative z-10">

          {/* ================= TOP SECTION ================= */}

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">

            {/* LEFT */}
            <div className="relative">

              {/* Floating Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl px-4 py-2 shadow-[0_0_30px_rgba(168,85,247,0.12)]">

                <div className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Our Vision
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-7 text-4xl md:text-5xl font-black tracking-[-0.05em] leading-[0.95] text-white">

                <span className="block">
                  Becoming the
                </span>

                <span className="mt-2 block bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Standard for
                </span>

                <span className="mt-2 block text-white/90">
                  Social Proof Creation
                </span>
              </h2>

              {/* Decorative Floating Shape */}
              <div className="absolute -left-8 top-[70%] hidden lg:block">
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">

              {/* Glass Content Card */}
              <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 transition-all duration-700 hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-[0_30px_120px_rgba(168,85,247,0.14)]">

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-pink-500/10" />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-[32px]">
                  <div className="absolute left-[-130%] top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-[1400ms] group-hover:left-[130%]" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-6">

                  <p className="text-lg leading-relaxed text-white/70">
                    We aim to become the go-to platform for creating social proof visuals across all major digital platforms.
                  </p>

                  <p className="text-base leading-relaxed text-white/50">
                    As content continues to evolve, the tools behind it must evolve as well. Our focus is on improving accuracy, expanding platform support, and building features that help professionals move faster without compromising quality.
                  </p>

                  {/* Animated Bottom Line */}
                  <div className="flex items-center gap-3 pt-2">

                    <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-500 transition-all duration-700 group-hover:w-28" />

                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FEATURE CARDS ================= */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

            {[
              {
                title: "Continuous Innovation",
                desc: "Regular updates to improve accuracy, performance, and usability.",
                icon: "⚡",
              },
              {
                title: "Platform Expansion",
                desc: "Support for emerging and evolving social media platforms.",
                icon: "🌍",
              },
              {
                title: "Performance Focused",
                desc: "Built to help teams move faster without sacrificing quality.",
                icon: "🚀",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 transition-all duration-700 hover:-translate-y-3 hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-[0_30px_120px_rgba(168,85,247,0.16)]"
              >

                {/* Background Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-pink-500/10" />
                </div>

                {/* Floating Orb */}
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-primary/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-125" />

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="relative inline-flex">

                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-125 opacity-0 transition duration-700 group-hover:opacity-100" />

                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl text-3xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] text-white transition duration-500 group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-white/50 transition duration-500 group-hover:text-white/70">
                    {item.desc}
                  </p>

                  {/* Accent Line */}
                  <div className="mt-8 flex items-center gap-2">

                    <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-500 transition-all duration-700 group-hover:w-24" />

                    <div className="h-2 w-2 rounded-full bg-primary opacity-0 transition duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {/* Aurora Blobs */}
          <div className="absolute top-[-120px] left-[-100px] h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px] animate-float" />

          <div className="absolute bottom-[-140px] right-[-120px] h-[450px] w-[450px] rounded-full bg-pink-500/20 blur-[130px] animate-float-delay" />

          <div className="absolute top-1/2 left-1/2 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[100px] animate-pulse-slow" />
        </div>

        {/* GRID */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="max-w-[1150px] mx-auto px-6 relative z-10">
          {/* HEADER */}
          <div className="max-w-[760px] mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Leadership Team
              </span>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-white">
              Meet the Minds Behind{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Comment Tools
              </span>
            </h2>

            <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl">
              A passionate team focused on building powerful tools for creators,
              marketers, and agencies worldwide.
            </p>
          </div>

          {/* TEAM CARDS */}
          <div className="space-y-8">
            {[
              {
                initials: "DR",
                name: "Deevay Rattan Puri",
                role: "Founder & CEO",
                color: "from-primary to-cyan-400",
                roleColor: "text-primary",
                desc: "Deevay Rattan Puri is the visionary behind Comment Tools. With over a decade of experience in digital marketing and content strategy, he built the platform to simplify how creators, brands, and agencies design realistic social media engagement visuals.",
              },
              {
                initials: "PP",
                name: "Pankaj Pal",
                role: "Co-Founder & CTO",
                color: "from-pink-500 to-primary",
                roleColor: "text-yellow-400",
                desc: "Pankaj Pal leads engineering and platform architecture at Comment Tools. From scalable rendering systems to high-performance generation workflows, he ensures fast, accurate, and production-ready outputs across every platform.",
              },
              {
                initials: "VG",
                name: "Vipul Goel",
                role: "Co-Founder & CMO",
                color: "from-orange-400 to-primary",
                roleColor: "text-orange-400",
                desc: "Vipul Goel drives marketing and global growth strategy. He focuses on positioning Comment Tools as a go-to platform for creators, agencies, and businesses looking to improve content quality and engagement workflows.",
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 md:p-10 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(99,102,241,0.25)]"
              >
                {/* GLASS OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />

                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-gradient-to-r from-primary/10 via-cyan-400/10 to-pink-500/10" />

                {/* ZOOM BLUR LIGHT */}
                <div className="absolute top-[-120px] right-[-120px] h-[260px] w-[260px] rounded-full bg-primary/20 blur-[90px] opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />

                {/* SHIMMER */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-1000">
                  <div className="absolute top-0 left-[-120%] h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[120%] transition-all duration-1000" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  {/* PROFILE ICON */}
                  <div
                    className={`relative flex h-32 w-32 shrink-0 items-center justify-center rounded-[28px] bg-gradient-to-br ${member.color} shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {/* INNER GLASS */}
                    <div className="absolute inset-[2px] rounded-[26px] border border-white/20 bg-black/10 backdrop-blur-xl" />

                    {/* BLUR RING */}
                    <div className="absolute inset-0 rounded-[28px] opacity-0 blur-2xl transition duration-700 group-hover:opacity-100 bg-white/20" />

                    <span className="relative z-10 text-4xl font-black text-white">
                      {member.initials}
                    </span>
                  </div>

                  {/* TEXT */}
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black text-white mb-2 transition duration-300 group-hover:text-primary">
                      {member.name}
                    </h3>

                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.2em] mb-5 ${member.roleColor}`}
                    >
                      {member.role}
                    </p>

                    <p className="text-gray-300 leading-relaxed text-base md:text-[15px] max-w-3xl transition duration-500 group-hover:text-gray-200">
                      {member.desc}
                    </p>

                    {/* UNDERLINE */}
                    <div className="mt-6 h-[3px] w-14 rounded-full bg-gradient-to-r from-primary via-cyan-400 to-pink-500 transition-all duration-700 group-hover:w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & RELIABILITY */}
      <section className="relative overflow-hidden max-w-[1100px] mx-auto px-6 py-24">

        {/* ================= BACKGROUND ================= */}

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Aurora Glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/15 blur-[140px] animate-pulse" />

        {/* Floating Orbs */}
        <div className="absolute top-[10%] left-[-120px] w-[320px] h-[320px] rounded-full bg-fuchsia-500/15 blur-[120px] animate-float-slow" />

        <div className="absolute bottom-[0%] right-[-140px] w-[360px] h-[360px] rounded-full bg-primary/15 blur-[120px] animate-float-delayed" />

        {/* Light Beam */}
        <div className="absolute top-0 left-[-20%] w-[40%] h-full rotate-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent blur-3xl animate-light-pass" />

        <div className="relative z-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">

          {/* ================= LEFT CONTENT ================= */}

          <div className="relative">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-4 py-2 shadow-[0_0_30px_rgba(168,85,247,0.08)]">

              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Trust & Reliability
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-4xl md:text-5xl font-black tracking-[-0.05em] leading-[0.95] text-white">

              <span className="block transition duration-500 hover:text-primary">
                Built with
              </span>

              <span className="block mt-2 bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Reliability
              </span>

              <span className="block mt-2 text-white/90 transition duration-500 hover:text-fuchsia-400">
                in Mind
              </span>
            </h2>

            {/* Description */}
            <p className="mt-7 text-base md:text-lg leading-relaxed text-white/55 max-w-[560px]">
              We prioritize performance, stability, and user experience. Whether you're generating a single comment or managing large-scale creative production, the platform is designed to handle your needs efficiently.
            </p>

            {/* Decorative Floating Card */}
            <div className="hidden lg:block absolute -left-10 bottom-[-60px] animate-float-card">

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-5 py-4 shadow-[0_20px_60px_rgba(168,85,247,0.08)]">

                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Uptime
                </p>

                <h4 className="mt-1 text-3xl font-black text-white">
                  99.9%
                </h4>
              </div>
            </div>
          </div>

          {/* ================= RIGHT GRID ================= */}

          <div className="grid sm:grid-cols-2 gap-5">

            {[
              {
                title: "Fast Performance",
                desc: "Optimized for quick generation and smooth creative workflows.",
                icon: "⚡",
              },
              {
                title: "Stable & Reliable",
                desc: "Built to handle consistent usage without interruptions.",
                icon: "🛡️",
              },
              {
                title: "Scalable System",
                desc: "Supports both individual creators and high-volume teams.",
                icon: "🚀",
              },
              {
                title: "User-Focused",
                desc: "Designed with clarity, simplicity, and usability in mind.",
                icon: "✨",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 transition-all duration-700 hover:-translate-y-3 hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-[0_30px_120px_rgba(168,85,247,0.14)]"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-pink-500/10" />
                </div>

                {/* Floating Orb */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-125" />

                {/* Shine */}
                <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                  <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-[1400ms] group-hover:left-[120%]" />
                </div>

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="relative inline-flex">

                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-125 opacity-0 transition duration-700 group-hover:opacity-100" />

                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-white transition duration-500 group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-white/50 transition duration-500 group-hover:text-white/75">
                    {item.desc}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-7 flex items-center gap-2">

                    <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-500 transition-all duration-700 group-hover:w-24" />

                    <div className="h-2 w-2 rounded-full bg-primary opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-125" />
                  </div>
                </div>

                {/* Border Overlay */}
                <div className="absolute inset-[1px] rounded-[26px] border border-white/5 pointer-events-none group-hover:border-primary/20 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CONNECT CTA */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-600/15 via-background to-primary/10 p-10 md:p-14 text-center">
          {/* subtle glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-[700px] mx-auto">
            {/* headline */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
              Let’s Build Better Content Together
            </h2>

            {/* content */}
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Have questions, feedback, or partnership inquiries? We’d love to
              hear from you.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                Contact Us
              </a>

              <a
                href="/tools"
                className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition"
              >
                View Tools →
              </a>
            </div>

            {/* trust note */}
            <p className="text-xs text-muted-foreground mt-4">
              Typically responds within 24 hours
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
