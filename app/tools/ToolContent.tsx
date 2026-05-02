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

/* 🔥 Stable color generator (same tool = same color) */
const getColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return titleColors[Math.abs(hash) % titleColors.length];
};

const tools = [
  {
    name: "TikTok Comment Generator",
    slug: "/tools/tiktok-comment-generator",
    desc: "Create realistic TikTok comments instantly.",
    icon: <Music size={20} />,
  },
  {
    name: "Instagram Comment Generator",
    slug: "/tools/instagram-comment-generator",
    desc: "Generate engaging Instagram comments.",
    icon: <Instagram size={20} />,
  },
  {
    name: "YouTube Comment Generator",
    slug: "/tools/youtube-comment-generator",
    desc: "Design authentic YouTube comment sections.",
    icon: <Youtube size={20} />,
  },
  {
    name: "X (Twitter) Reply Generator",
    slug: "/tools/twitter-comment-generator",
    desc: "Create realistic replies and threads.",
    icon: <Twitter size={20} />,
  },
  {
    name: "Caption Generator",
    slug: "/tools/caption-generator",
    desc: "Write high-converting captions instantly.",
    icon: <Type size={20} />,
  },
  {
    name: "Hashtag Generator",
    slug: "/tools/hashtag-generator",
    desc: "Generate trending hashtags for reach.",
    icon: <Hash size={20} />,
  },
  {
    name: "Reddit Post Templates",
    slug: "/tools/reddit-templates",
    desc: "Create viral-style Reddit posts.",
    icon: <MessageSquare size={20} />,
  },
  {
    name: "Reddit GIF Downloader",
    slug: "/tools/reddit-gif-downloader",
    desc: "Download Reddit GIFs quickly.",
    icon: <Download size={20} />,
  },
  {
    name: "Pomodoro Timer",
    slug: "/tools/pomodoro",
    desc: "Boost productivity with focus sessions.",
    icon: <Clock size={20} />,
  },
  {
    name: "Receipt Generator",
    slug: "/tools/receipt-generator",
    desc: "Create realistic receipts for demos.",
    icon: <FileText size={20} />,
  },
  {
    name: "Fake Text Generator",
    slug: "/tools/fake-text",
    desc: "Generate placeholder text instantly.",
    icon: <Type size={20} />,
  },
  {
    name: "Textbox Generator",
    slug: "/tools/textbox",
    desc: "Design styled text boxes easily.",
    icon: <Layout size={20} />,
  },
];

export default function ToolContent() {
  return (
    <>
      <Navbar />
      <div className="bg-background text-foreground">
        {/* 🔥 HERO */}
        <section className="text-center py-20 px-6 bg-gradient-to-b from-primary/10 to-transparent">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            All-in-One Content Tools
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Create social media comments, captions, mockups, and content assets
            in seconds. Built for creators, marketers, and agencies.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/tools/tiktok-comment-generator"
              className="px-6 py-3 bg-primary text-white rounded-full shadow hover:opacity-90"
            >
              Try Tools
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-border rounded-full hover:bg-muted"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* 🧩 TOOLS GRID */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border border-border rounded-2xl p-6 bg-background/70 backdrop-blur hover:shadow-xl hover:border-primary/40 transition"
              >
                {/* Title + Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`${getColor(
                      tool.name,
                    )} group-hover:text-primary`}
                  >
                    {tool.icon}
                  </span>

                  <h3
                    className={`text-lg font-semibold transition ${getColor(
                      tool.name,
                    )} group-hover:text-primary`}
                  >
                    {tool.name}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {tool.desc}
                </p>

                <Link
                  href={tool.slug}
                  className={` text-sm font-medium hover:underline ${getColor(
                    tool.name,
                  )} group-hover:text-primary`}
                >
                  Try Tool →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🚀 CTA */}
        <section className="text-center py-16 border-t border-border">
          <h2 className="text-2xl font-bold">Build Better Content Faster</h2>
          <p className="mt-2 text-muted-foreground">
            Save hours and create high-converting visuals in seconds.
          </p>

          <Link
            href="/pricing"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-primary text-white shadow"
          >
            Get Started
          </Link>
        </section>

        {/* 🧾 FOOTER */}

        <Footer />
      </div>
    </>
  );
}
