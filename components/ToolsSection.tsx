"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Twitter,
  Music,
  Clock,
  FileText,
  Type,
  MessageSquare,
  Download,
  Layout,
  Hash,
  Lock,
} from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/* 🎨 Theme-safe color palette */
const titleColors = [
  "text-purple-400",
  "text-pink-400",
  "text-indigo-400",
  "text-blue-400",
  "text-cyan-400",
  "text-violet-400",
  "text-fuchsia-400",
  "text-yellow-300",
  "text-amber-300",
  "text-lime-300",
  "text-green-300",
  "text-emerald-300",
  "text-teal-300",
  "text-sky-300",
  "text-rose-300",
  "text-orange-300",
  "text-red-300",
];

/* 🔥 Stable color generator */
const getColor = (name: string) => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return titleColors[Math.abs(hash) % titleColors.length];
};

/* ✅ Tools List */
const tools = [
  {
    name: "TikTok Comment Generator",
    slug: "/tools/tiktok-comment-generator",
    desc: "Create realistic TikTok comments instantly.",
    icon: Music,
  },
  {
    name: "Instagram Comment Generator",
    slug: "/tools/instagram-comment-generator",
    desc: "Generate engaging Instagram comments.",
    icon: Instagram,
  },
  {
    name: "YouTube Comment Generator",
    slug: "/tools/youtube-comment-generator",
    desc: "Design authentic YouTube comment sections.",
    icon: Youtube,
  },
  {
    name: "X (Twitter) Comment Generator",
    slug: "/tools/twitter-comment-generator",
    desc: "Create realistic replies and threads.",
    icon: Twitter,
  },
  {
    name: "Fake Tweet Generator",
    slug: "/tools/fake-tweet-generator",
    desc: "Create realistic tweets.",
    icon: Twitter,
  },
  {
    name: "Tweet Reply Generator",
    slug: "/tools/tweet-reply-generator",
    desc: "Design styled reply chains.",
    icon: Twitter,
  },
  {
    name: "Twitter (X) Suspension Generator",
    slug: "/tools/twitter-suspension-generator",
    desc: "Create suspension screens.",
    icon: Twitter,
  },
  {
    name: "Twitter (X) Block Generator",
    slug: "/tools/twitter-block-generator",
    desc: "Generate block screens.",
    icon: Twitter,
  },
  {
    name: "Pomodoro Timer",
    slug: "/tools/pomodoro-timer",
    desc: "Boost productivity with focus sessions.",
    icon: Clock,
  },
  {
    name: "Hashtag Generator",
    slug: "/tools/hashtag-generator",
    desc: "Generate trending hashtags for reach.",
    icon: Hash,
    disabled: true,
  },
  {
    name: "Reddit Post Templates",
    slug: "/tools/reddit-templates",
    desc: "Create viral-style Reddit posts.",
    icon: MessageSquare,
    disabled: true,
  },
  {
    name: "Reddit GIF Downloader",
    slug: "/tools/reddit-gif-downloader",
    desc: "Download Reddit GIFs quickly.",
    icon: Download,
    disabled: true,
  },
  {
    name: "Receipt Generator",
    slug: "/tools/receipt-generator",
    desc: "Create realistic receipts for demos.",
    icon: FileText,
    disabled: true,
  },
  {
    name: "Fake Text Generator",
    slug: "/tools/text-generator",
    desc: "Generate placeholder text instantly.",
    icon: Type,
    disabled: true,
  },
  {
    name: "Textbox Generator",
    slug: "/tools/textbox",
    desc: "Design styled text boxes easily.",
    icon: Layout,
    disabled: true,
  },
];

export default function ToolContent() {
  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden bg-[#050816] text-white">
        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0 -z-30 overflow-hidden">
          {/* Aurora blobs */}
          <div className="absolute top-[-200px] left-[-150px] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[140px] animate-float" />

          <div className="absolute bottom-[-250px] right-[-180px] h-[600px] w-[600px] rounded-full bg-cyan-400/20 blur-[150px] animate-float-delay" />

          <div className="absolute top-[30%] left-[40%] h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[130px] animate-pulse-slow" />

          {/* Mesh Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

          {/* Noise */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[url('/noise.png')]" />
        </div>

        {/* ================= HERO ================= */}
        <section className="relative px-6 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />

              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary">
                Premium Toolkit
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
              Build Stunning{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Social Content
              </span>{" "}
              Faster
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Create realistic comments, tweets, mockups, and social media
              assets with modern glass UI and high-quality export tools.
            </p>
          </motion.div>
        </section>

        {/* ================= TOOLS ================= */}
        <section className="relative max-w-7xl mx-auto px-6 pb-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className={`group relative overflow-hidden rounded-[30px] border backdrop-blur-2xl transition-all duration-700 ${tool.disabled
                      ? "border-white/10 bg-white/[0.03] opacity-60"
                      : "border-white/10 bg-white/[0.06] hover:border-primary/40 hover:shadow-[0_0_60px_rgba(99,102,241,0.25)]"
                    }`}
                >
                  {/* Glass background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent" />

                  {/* Glow Hover */}
                  {!tool.disabled && (
                    <>
                      <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-cyan-400/10 to-pink-500/10" />

                      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150" />
                    </>
                  )}

                  {/* Shine Hover */}
                  {!tool.disabled && (
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition duration-1000">
                      <div className="absolute top-0 left-[-130%] h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[130%]" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-7">
                    {/* Icon */}
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-500 ${tool.disabled
                          ? "text-gray-500"
                          : `${getColor(
                            tool.name,
                          )} group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]`
                        }`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Title */}
                    <h2
                      className={`text-xl font-bold mb-3 transition-all duration-300 ${tool.disabled
                          ? "text-gray-500"
                          : `${getColor(
                            tool.name,
                          )} group-hover:text-white`
                        }`}
                    >
                      {tool.disabled ? (
                        <span className="flex items-center gap-2">
                          {tool.name}
                          <Lock size={14} />
                        </span>
                      ) : (
                        <Link href={tool.slug}>{tool.name}</Link>
                      )}
                    </h2>

                    {/* Description */}
                    <p className="mb-7 text-sm leading-relaxed text-gray-400">
                      {tool.desc}
                    </p>

                    {/* CTA */}
                    {tool.disabled ? (
                      <span className="text-sm text-gray-500">
                        Coming Soon
                      </span>
                    ) : (
                      <Link
                        href={tool.slug}
                        className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${getColor(
                          tool.name,
                        )} group-hover:text-white`}
                      >
                        Try Tool
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    )}

                    {/* Underline */}
                    <div
                      className={`mt-6 h-[3px] rounded-full transition-all duration-700 ${tool.disabled
                          ? "w-10 bg-gray-600/30"
                          : "w-12 bg-gradient-to-r from-primary via-cyan-400 to-pink-500 group-hover:w-28"
                        }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative border-t border-white/10 py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />

          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Create Better Content{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-pink-500 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h2>

            <p className="mt-5 text-lg text-gray-400">
              Powerful generators built for creators, agencies, and marketers.
            </p>

            <Link
              href="/pricing"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/10 px-9 py-4 mt-10 font-semibold text-white backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(99,102,241,0.35)]"
            >
              {/* Glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-400 to-pink-500 opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Shine */}
              <span className="absolute top-0 left-[-120%] h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[120%]" />

              <span className="relative z-10 flex items-center gap-2">
                View Pricing
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}