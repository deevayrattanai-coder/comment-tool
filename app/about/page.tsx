import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { Target, Users, Lightbulb, ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";

const values = [
  {
    icon: <Target size={20} />,
    title: "Pixel-Perfect",
    desc: "Every template is reverse-engineered from the actual platform UI to ensure indistinguishable results.",
  },
  {
    icon: <Users size={20} />,
    title: "Community First",
    desc: "Feature requests from our users shape the roadmap. We ship what creators actually need.",
  },
  {
    icon: <Lightbulb size={20} />,
    title: "Always Free Core",
    desc: "Single-mode generation stays free forever. No hidden paywalls on exports.",
  },
];

const milestones = [
  {
    year: "2025",
    title: "Comment tools launches",
    desc: "TikTok-only, born out of frustration with clunky design tools.",
  },
  {
    year: "2025",
    title: "Instagram + YouTube",
    desc: "Added the two most-requested platforms within the first quarter.",
  },
  {
    year: "2026",
    title: "X support + bulk mode",
    desc: "Rounded out the four-platform set and shipped batch generation for power users.",
  },
];

export const metadata = createMetadata({
  title: "About Us | Comment Tools",
  description:
    "Learn how Comment Tools helps creators and marketers generate engaging comments faster. Built to save time and improve social media growth.",
  path: "/about-us",
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
            Creating Realistic Comment Screenshots Shouldn’t Be This Hard
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
              desc: "Designed specifically for marketers, agencies, and serious creators — not casual or entertainment use.",
            },
            {
              title: "Accuracy First",
              desc: "Interfaces are carefully crafted to closely match real platform UI for maximum authenticity.",
            },
            {
              title: "Scalable Workflow",
              desc: "From single comments to bulk generation, the platform adapts seamlessly to your needs.",
            },
            {
              title: "High-Quality Output",
              desc: "Export high-resolution visuals optimized for ads, presentations, and content.",
            },
            {
              title: "Clean & Professional",
              desc: "No clutter, no gimmicks — just a focused tool built for performance and usability.",
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
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
      <section className="max-w-[1000px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Vision
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 leading-snug">
              Becoming the Standard for Social Proof Creation
            </h2>
          </div>

          {/* RIGHT */}
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              We aim to become the go-to platform for creating social proof
              visuals across all major digital platforms.
            </p>

            <p>
              As content continues to evolve, the tools behind it must evolve as
              well. Our focus is on improving accuracy, expanding platform
              support, and building features that help professionals move faster
              without compromising quality.
            </p>
          </div>
        </div>

        {/* Supporting points */}
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {[
            {
              title: "Continuous Innovation",
              desc: "Regular updates to improve accuracy and usability.",
            },
            {
              title: "Platform Expansion",
              desc: "Support for emerging and evolving social platforms.",
            },
            {
              title: "Performance Focused",
              desc: "Built to help teams move faster without sacrificing quality.",
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
                Deevay Rattan Puri is the visionary behind DevAIHumanizer. With
                a deep passion for artificial intelligence and content
                technology, Deevay founded DevAIHumanizer to bridge the gap
                between AI efficiency and authentic human expression. Under his
                leadership, the platform has grown to serve over 50,000 users
                across 120+ countries, processing millions of words every month.
                Deevay believes that AI should augment human creativity — not
                replace it — and is committed to building tools that empower
                writers, students, and professionals worldwide.
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
                Pankaj Pal is the technical mastermind powering DevAIHumanizer.
                As Co-Founder and CTO, Pankaj leads the engineering and research
                teams, architecting the advanced NLP engine that drives our
                industry-leading 99.8% AI detection bypass rate. With deep
                expertise in computational linguistics and machine learning,
                Pankaj ensures the platform remains at the cutting edge —
                continuously refining humanization algorithms to stay ahead of
                evolving AI detectors while maintaining the natural quality
                users expect.
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
                Vipul Goel drives the marketing vision behind DevAIHumanizer. As
                CMO, Vipul leads brand strategy, growth initiatives, and user
                acquisition across 120+ countries. With a keen understanding of
                digital marketing, content strategy, and data-driven campaigns,
                Vipul ensures DevAIHumanizer reaches the writers, students, and
                professionals who need it most — building a brand that stands
                for authenticity in the age of AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & RELIABILITY */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Trust & Reliability
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mt-3 mb-4">
              Built with Reliability in Mind
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              We prioritize performance, stability, and user experience. Whether
              you're generating a single comment or managing large-scale
              creative production, the platform is designed to handle your needs
              efficiently.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Fast Performance",
                desc: "Optimized for quick generation and smooth workflows.",
              },
              {
                title: "Stable & Reliable",
                desc: "Built to handle consistent usage without interruptions.",
              },
              {
                title: "Scalable System",
                desc: "Supports both individual users and high-volume teams.",
              },
              {
                title: "User-Focused",
                desc: "Designed with simplicity, clarity, and usability in mind.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-sm"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
                href="/"
                className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition"
              >
                Get Started →
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
