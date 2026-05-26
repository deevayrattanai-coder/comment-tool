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
      <section className="max-w-[1000px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Mission
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 leading-snug">
              Making Social Proof Creation Effortless for Modern Teams
            </h2>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Our mission is simple — to help creators and marketers generate
              realistic, high-quality social proof without relying on manual
              design or unreliable tools.
            </p>

            <p>
              In today’s digital landscape, perception matters. Whether it's for
              ads, presentations, or content, showcasing engagement visually can
              significantly impact performance.
            </p>

            <p>
              We’re building tools that make this process fast, accurate, and
              scalable — so you can focus on growth instead of design work.
            </p>
          </div>
        </div>

        {/* OPTIONAL: PILLARS */}
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {[
            { title: "Fast", desc: "Generate comment visuals in seconds." },
            { title: "Accurate", desc: "Designed to match real platform UI." },
            {
              title: "Scalable",
              desc: "Built for creators, teams, and agencies.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM WE SOLVE */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="max-w-[700px] mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            The Problem
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mt-3">
            Creating realistic social media comment screenshots has always been
            inefficient.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: WHAT PEOPLE DO */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">
              What people rely on today
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Manual design tools like Photoshop",
                "Low-quality generators with inaccurate layouts",
                "Real screenshots that lack control and scalability",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: RESULTING PROBLEMS */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">
              What this leads to
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Inconsistent visuals across campaigns",
                "Time-consuming and repetitive workflows",
                "Limited flexibility and creative control",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-10 rounded-xl border border-border bg-background p-6 text-center">
          <p className="text-sm md:text-base text-muted-foreground max-w-[700px] mx-auto">
            The result? Slower execution, lower-quality assets, and missed
            opportunities to build trust and conversions through social proof.
          </p>
        </div>
      </section>

      {/* OUR SOLUTION */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Solution
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mt-3 mb-4 leading-tight">
              A Smarter Way to Create Social Proof at Scale
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              We built a platform that lets you generate pixel-perfect social
              media comment images across TikTok, Instagram, YouTube, and X —
              all in seconds.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
              With full customization, high-resolution exports, and bulk
              generation, you can replace hours of manual work with a fast,
              professional workflow.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            {[
              "Pixel-perfect platform layouts",
              "Full control over every detail",
              "Bulk generation for scale",
              "High-resolution, ad-ready exports",
            ].map((item, i) => (
              <div
                key={item}
                className="group relative flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary"
              >
                {/* glow on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-purple-500/10 to-primary/10" />

                {/* content */}
                <span className="relative z-10 text-primary text-lg transition-transform duration-300 group-hover:scale-110">
                  ✔
                </span>

                <span className="relative z-10 text-sm text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="max-w-[700px] mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What Sets Us Apart
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mt-3">
            Designed for Professional-Grade Workflows
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              desc: "From single comments to bulk generation, the platform adapts to your workflow",
            },
            {
              title: "High-Quality Output",
              desc: "Export in high resolution, ready for ads, content, and presentations.",
            },
            {
              title: "Clean & Professional",
              desc: "No unnecessary clutter, no gimmicks — just a focused, powerful tool.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              {/* Title */}
              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>

              {/* subtle underline effect */}
              <div className="h-[2px] w-0 bg-primary mt-4 transition-all group-hover:w-10" />
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="max-w-[700px] mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Who Uses Our Platform
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mt-3">
            Built for Teams That Need Speed, Quality, and Scale
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[
            {
              title: "Performance Marketing Teams",
              desc: "Create high-converting ad creatives using realistic engagement visuals.",
            },
            {
              title: "Social Media Creators",
              desc: "Enhance content with viral-style comment formats.",
            },
            {
              title: "Agencies",
              desc: "Deliver polished, client-ready visuals at scale.",
            },
            {
              title: "Designers & Freelancers",
              desc: "Skip manual mockups and generate assets instantly.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>

              {/* subtle hover accent */}
              <div className="h-[2px] w-0 bg-primary mt-4 transition-all group-hover:w-12" />
            </div>
          ))}
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

      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="space-y-6">
          <div className="glass-card-premium p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
              <span className="text-4xl font-display font-bold text-primary-foreground">
                DR
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-1">
                Deevay Rattan Puri
              </h3>
              <p className="text-primary font-medium text-sm mb-4">
                Founder & CEO
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Deevay Rattan Puri is the visionary behind Comment Tools. With
                over a decade of experience in digital marketing and content
                strategy, Deevay built the platform to simplify how creators,
                brands, and agencies design social media engagement. Recognizing
                the growing demand for high-quality visual content on platforms
                like TikTok and Instagram, he launched{" "}
                <b>
                  <a
                    href="/"
                    className="text-primary underline hover:cursor-pointer"
                  >
                    <i> Comment Tools</i>
                  </a>
                </b>{" "}
                to help users generate realistic comment screenshots
                effortlessly. Under his leadership, Comment Tools is evolving
                into a go-to platform for marketers and creators worldwide.
                Deevay strongly believes that tools should enhance creativity
                and speed — enabling users to focus on strategy rather than
                manual work.
              </p>
            </div>
          </div>
          <div className="glass-card-premium p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0">
              <span className="text-4xl font-display font-bold text-primary-foreground">
                PP
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-1">
                Pankaj Pal
              </h3>
              <p className="text-yellow-500 font-medium text-sm mb-4">
                Co-Founder & CTO
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pankaj Pal is the technical force behind Comment Tools. As
                Co-Founder & CTO, he leads the platform’s engineering, ensuring
                seamless performance, scalability, and precision across all
                generators. From building pixel-perfect comment rendering
                systems to optimizing bulk generation features, Pankaj ensures
                the tool replicates real-world interfaces from platforms like
                YouTube and X with high accuracy. With strong expertise in
                system architecture and frontend performance, he continuously
                improves the platform to deliver fast, reliable, and realistic
                outputs for users globally.
              </p>
            </div>
          </div>
          <div className="glass-card-premium p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
              <span className="text-4xl font-display font-bold text-primary-foreground">
                VG
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-1">
                Vipul Goel
              </h3>
              <p
                className="font-medium text-sm mb-4"
                style={{ color: "#f97316" }}
              >
                Co-Founder & CMO
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Vipul Goel leads the growth and marketing strategy at Comment
                Tools. As CMO, he focuses on building a strong global presence
                and connecting the product with creators, agencies, and
                businesses. With a deep understanding of digital marketing
                trends and social media behavior, Vipul ensures that Comment
                Tools reaches professionals in key markets like Mumbai and
                London. His vision is to position Comment Tools as an essential
                resource for content creators looking to enhance engagement,
                improve creatives, and streamline their workflow.
              </p>
            </div>
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
