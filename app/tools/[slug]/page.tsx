import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentTool from "@/components/CommentTool";
import FAQSection from "@/components/FAQSection";

const VALID = new Set([
  "tiktok-comment-generator",
  "instagram-comment-generator",
  "youtube-comment-generator",
  "twitter-comment-generator",
]);

const COPY: Record<
  string,
  { title: string; tagline: string; description: string }
> = {
  "tiktok-comment-generator": {
    title: "Best TikTok Comment Generator Tool Online | Comment Tools",
    tagline: "Video & reply comments",
    description:
      "Create engaging TikTok comments instantly. Boost interaction, save time, and generate creative replies that match your content style.",
  },
  "instagram-comment-generator": {
    title: "Best Instagram Comment Generator Tool Online | Comment Tools",
    tagline: "Post & Reels comments",
    description:
      "Generate high-quality Instagram comments in seconds. Increase engagement, reply faster, and keep your audience active with smart comments.",
  },
  "youtube-comment-generator": {
    title: "Best YouTube Comment Generator Tool Online | Comment Tools",
    tagline: "Video & Shorts comments",
    description:
      "Write better YouTube comments instantly. Improve engagement, save time, and generate meaningful responses for videos at scale.",
  },
  "twitter-comment-generator": {
    title: "Best X (Twitter) Comment Generator Tool Online | Comment Tools",
    tagline: "Post replies",
    description:
      "Generate smart replies for X (Twitter) posts in seconds. Stay active, boost engagement, and respond faster with AI-powered comments.",
  },
};

export function generateStaticParams() {
  return Array.from(VALID).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COPY[slug];

  if (!c) {
    return {
      title: "Not found",
      description: "This page does not exist.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = `${baseUrl}/${slug}-comment-generator`;

  return {
    title: `${c.title}`,
    description: c.description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: c.title,
      description: c.description,
      url,
      siteName: "Comment Tools",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-${slug}.png`, // dynamic per platform
          width: 1200,
          height: 630,
          alt: c.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: [`${baseUrl}/og-${slug}.png`],
    },
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID.has(slug)) notFound();
  const c = COPY[slug];
  const result = slug.split("-")[0];

  console.log(slug, c, result);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <CommentTool initialPlatform={result as any} />

      {"tiktok-comment-generator" === slug && (
        <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                TikTok Engagement Tool
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Best TikTok Comment Generator Tool Online
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-[720px] leading-relaxed">
              Writing TikTok comments shouldn’t feel like a chore. Generate
              engaging, scroll-stopping replies instantly and turn every post
              into a conversation magnet.
            </p>

            {/* Highlight Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  ⚡ Instant Comments
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate high-quality TikTok comments in seconds—no thinking
                  required.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  🎯 Boost Engagement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Keep your audience active with replies that feel natural and
                  engaging.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  🚀 Scale Faster
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create comment strategies at scale and grow your TikTok
                  presence faster.
                </p>
              </div>
            </div>

            {/* Bottom Paragraph */}
            <p className="mt-10 text-sm md:text-base text-muted-foreground max-w-[720px]">
              TikTok thrives on interaction. This tool helps you create
              meaningful comment threads, spark conversations, and build
              stronger connections with your audience— all without wasting time.
            </p>
          </div>
        </section>
      )}

      {"instagram-comment-generator" === slug && (
        <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                Instagram Engagement Tool
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Best Instagram Comment Generator Tool Online
            </h1>

            {/* Description */}
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-[720px] leading-relaxed">
              Writing Instagram comments manually can be slow and repetitive.
              Generate realistic, engaging comments instantly and make your
              posts look active, interactive, and ready to perform.
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  ⚡ Instant Comment Generation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create high-quality Instagram comments in seconds without
                  manual effort.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  💬 Realistic Conversations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate comments that mimic real interactions to enhance
                  visual engagement.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  🚀 Built for Growth
                </h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for creators, marketers, and agencies scaling
                  Instagram campaigns.
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <p className="mt-10 text-sm md:text-base text-muted-foreground max-w-[720px]">
              Whether you're managing content, running campaigns, or building
              your brand, this tool helps you create better-looking posts
              faster—without spending hours writing comments.
            </p>
          </div>
        </section>
      )}

      {"instagram-comment-generator" === slug && (
        <section className="border-b border-border bg-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Header */}
            <div className="max-w-[720px]">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Why It Matters
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
                Why Use an Instagram Comment Generator?
              </h2>

              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                In today’s content-driven world, engagement is a key signal of
                success. Top creators like Cristiano Ronaldo and Kylie Jenner
                don’t just post— they create conversations that drive visibility
                and trust.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">⚡</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Instant Comment Creation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate realistic Instagram comments in seconds without
                    manual effort.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">⏱️</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Save Time Efficiently
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Skip repetitive writing and focus on strategy, creativity,
                    and growth.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">🎯</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Improve Content Presentation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance your posts and campaigns with visually engaging
                    comment sections.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">📈</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Showcase Engagement Potential
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Present realistic engagement visuals to clients, brands, and
                    stakeholders.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <p className="mt-10 max-w-[720px] text-sm md:text-base text-muted-foreground">
              Whether you're a creator, marketer, or agency, this tool helps you
              simulate engagement, improve content perception, and scale your
              Instagram strategy faster.
            </p>
          </div>
        </section>
      )}

      {"tiktok-comment-generator" === slug && (
        <section className="border-b border-border bg-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Header */}
            <div className="max-w-[720px]">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Why It Matters
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
                Why Use a TikTok Comment Generator?
              </h2>

              <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                In today’s competitive social media landscape, engagement is
                everything. Top creators like Charli D’Amelio and Khaby Lame
                don’t just post content— they spark conversations. The more
                interaction your content gets, the more visibility it earns.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mt-10">
              <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60 backdrop-blur hover:shadow-sm transition">
                <span className="text-primary text-lg">⚡</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Generate Comments Instantly
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create authentic, platform-style comments in seconds without
                    manual effort.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60 backdrop-blur hover:shadow-sm transition">
                <span className="text-primary text-lg">⏱️</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Save Time at Scale
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Skip repetitive writing and generate bulk comments
                    efficiently.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60 backdrop-blur hover:shadow-sm transition">
                <span className="text-primary text-lg">🎯</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Boost Engagement Strategy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Make your posts look active and increase perceived
                    interaction instantly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60 backdrop-blur hover:shadow-sm transition">
                <span className="text-primary text-lg">📈</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Impress Clients & Brands
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase engagement potential in campaigns, pitches, and ad
                    creatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <p className="mt-10 max-w-[720px] text-sm md:text-base text-muted-foreground">
              Whether you're a creator, marketer, or agency, this tool helps you
              simulate real engagement, improve content perception, and scale
              faster without extra effort.
            </p>
          </div>
        </section>
      )}

      {"youtube-comment-generator" === slug && (
        <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                YouTube Engagement Tool
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Best YouTube Comment Generator Tool Online
            </h1>

            {/* Description */}
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-[720px] leading-relaxed">
              Writing meaningful YouTube comments can be time-consuming.
              Generate realistic, engaging comments instantly and make your
              videos look more active, interactive, and ready to perform.
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  ⚡ Instant Comment Creation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate high-quality YouTube comments in seconds without
                  manual effort.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  💬 Realistic Video Interactions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mimic real comment threads to enhance the visual engagement of
                  your videos.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  🚀 Built for Creators & Agencies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for creators, marketers, and teams managing video
                  campaigns.
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <p className="mt-10 text-sm md:text-base text-muted-foreground max-w-[720px]">
              Whether you're planning content, building mockups, or presenting
              ideas, this tool helps you create better-looking YouTube comment
              sections faster— without spending hours writing manually.
            </p>
          </div>
        </section>
      )}

      {"youtube-comment-generator" === slug && (
        <section className="border-b border-border bg-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Header */}
            <div className="max-w-[720px]">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Why It Matters
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
                Why Use a YouTube Comment Generator?
              </h2>

              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                In today’s video-first world, engagement plays a major role in
                visibility. Leading creators like MrBeast and PewDiePie don’t
                just get views—they drive conversations that boost reach and
                audience trust.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">⚡</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Instant Comment Creation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate realistic YouTube comments in seconds without
                    manual effort.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">⏱️</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Save Time Efficiently
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Avoid repetitive writing and focus more on content strategy
                    and growth.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">🎯</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Improve Content Presentation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance your video mockups and campaigns with realistic
                    comment sections.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">📈</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Showcase Engagement Potential
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Present convincing engagement visuals to clients, brands,
                    and stakeholders.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <p className="mt-10 max-w-[720px] text-sm md:text-base text-muted-foreground">
              Whether you're a creator, marketer, or agency, this tool helps you
              simulate engagement, improve video presentation, and scale your
              YouTube strategy faster.
            </p>
          </div>
        </section>
      )}

      {"twitter-comment-generator" === slug && (
        <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                X (Twitter) Engagement Tool
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Best X (Twitter) Comment Generator Tool Online
            </h1>

            {/* Description */}
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-[720px] leading-relaxed">
              Writing thoughtful replies on X can take time. Generate realistic,
              engaging responses instantly and make your posts feel active,
              conversational, and ready to stand out.
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  ⚡ Instant Reply Generation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create high-quality X replies in seconds without manual
                  writing.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  💬 Realistic Thread Simulation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate replies that mimic natural conversations and thread
                  dynamics.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
                <h3 className="font-semibold text-foreground mb-1">
                  🚀 Built for Creators & Teams
                </h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for creators, marketers, and agencies managing
                  campaigns at scale.
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <p className="mt-10 text-sm md:text-base text-muted-foreground max-w-[720px]">
              Whether you're building content, showcasing ideas, or creating
              social proof, this tool helps you design better-looking X threads
              faster— without spending hours writing replies.
            </p>
          </div>
        </section>
      )}

      {"twitter-comment-generator" === slug && (
        <section className="border-b border-border bg-background">
          <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
            {/* Header */}
            <div className="max-w-[720px]">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Why It Matters
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
                Why Use an X (Twitter) Comment Generator?
              </h2>

              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                In today’s fast-moving social media landscape, conversations
                drive visibility. High-profile figures like Elon Musk and
                Narendra Modi don’t just post—they actively engage, creating
                threads that boost reach and audience interaction.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">⚡</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Instant Reply & Thread Creation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate realistic X replies and thread-style conversations
                    in seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">⏱️</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Save Time Efficiently
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Avoid manual writing and focus on strategy, engagement, and
                    growth.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">🎯</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Improve Content Presentation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance campaigns and mockups with realistic conversation
                    threads.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
                <span className="text-lg">📈</span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Showcase Engagement Potential
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Present convincing social proof to clients, brands, and
                    stakeholders.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <p className="mt-10 max-w-[720px] text-sm md:text-base text-muted-foreground">
              Whether you're a creator, marketer, or agency, this tool helps you
              simulate real engagement, improve content perception, and scale
              your X strategy faster.
            </p>
          </div>
        </section>
      )}

      <section className="border-b border-border bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <div className="max-w-[720px]">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Features
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
              Key Features of Our {slug.split("-")[0]} comment generator tool
            </h2>

            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Everything you need to create realistic, high-performing{" "}
              {slug.split("-")[0]}
              comment sections—built for creators, marketers, and agencies.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">💬</div>
              <h3 className="font-semibold text-foreground mb-1">
                Realistic Comment Generation
              </h3>
              <p className="text-sm text-muted-foreground">
                Generate comments that feel authentic with emojis, natural tone,
                and platform-style formatting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">⚙️</div>
              <h3 className="font-semibold text-foreground mb-1">
                Advanced Customization
              </h3>
              <p className="text-sm text-muted-foreground">
                Customize usernames, profile images, timestamps, likes, and
                replies to match your exact needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">📦</div>
              <h3 className="font-semibold text-foreground mb-1">
                Bulk Generation (Premium)
              </h3>
              <p className="text-sm text-muted-foreground">
                Create multiple comment sets at once—perfect for agencies
                running large campaigns.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🖼️</div>
              <h3 className="font-semibold text-foreground mb-1">
                High-Quality Export
              </h3>
              <p className="text-sm text-muted-foreground">
                Download comment sections as high-resolution images for ads,
                presentations, or portfolios.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🔐</div>
              <h3 className="font-semibold text-foreground mb-1">
                Secure Account Access
              </h3>
              <p className="text-sm text-muted-foreground">
                Login-based access ensures your projects are saved, secure, and
                available anytime.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🌍</div>
              <h3 className="font-semibold text-foreground mb-1">
                Built for Global Creators
              </h3>
              <p className="text-sm text-muted-foreground">
                Designed for creators and agencies worldwide—ideal for both
                local and international campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <div className="max-w-[720px]">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Target Audience
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
              Who Should Use This Tool?
            </h2>

            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Whether you're building a brand, managing campaigns, or scaling
              content, this tool is designed for anyone who wants to create
              engaging TikTok comment sections faster.
            </p>
          </div>

          {/* Audience Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">📱</div>
              <h3 className="font-semibold text-foreground">
                Social Media Managers
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage multiple accounts and generate engaging comments at
                scale.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🎥</div>
              <h3 className="font-semibold text-foreground">
                Influencers & Creators
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Boost interaction and keep your audience active with engaging
                replies.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🏢</div>
              <h3 className="font-semibold text-foreground">
                Marketing Agencies
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create high-performing campaigns and showcase engagement to
                clients.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🎨</div>
              <h3 className="font-semibold text-foreground">
                Freelancers & Designers
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Build realistic mockups and social proof for creative projects.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <div className="text-xl mb-2">🛒</div>
              <h3 className="font-semibold text-foreground">
                E-commerce Brands
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Improve product storytelling and drive conversions with social
                proof.
              </p>
            </div>

            {/* Optional filler card for symmetry */}
            <div className="p-5 rounded-2xl border border-dashed border-border flex items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                + Anyone looking to improve {slug.split("-")[0]} engagement
              </p>
            </div>
          </div>

          {/* Bottom Line */}
          <p className="mt-10 max-w-[720px] text-sm md:text-base text-muted-foreground">
            In short, if your goal is to create engaging, high-performing{" "}
            {slug.split("-")[0]}
            content without spending hours writing comments, this tool is built
            for you.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <div className="max-w-[720px]">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Strategy Benefits
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
              How It Improves Your Content Strategy
            </h2>

            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              While these comments are designed for mockups and visual use, they
              play a powerful role in planning, testing, and presenting your
              content more effectively.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <span className="text-lg">💡</span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Pitch Ideas More Effectively
                </h3>
                <p className="text-sm text-muted-foreground">
                  Present realistic comment sections to clients and make your
                  concepts easier to understand and approve.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <span className="text-lg">📈</span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Improve Ad Performance
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use high-quality comment visuals to create more engaging and
                  believable ad creatives.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <span className="text-lg">🤝</span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Build Trust with Social Proof
                </h3>
                <p className="text-sm text-muted-foreground">
                  Simulate real engagement to make your content look active and
                  trustworthy.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition">
              <span className="text-lg">🧪</span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Test Content Before Publishing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Experiment with different comment styles and angles before
                  going live.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="mt-10 max-w-[720px]">
            <p className="text-sm md:text-base text-muted-foreground">
              The result? A faster, smarter workflow that helps you plan better
              content, create stronger campaigns, and execute with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <div className="max-w-[720px]">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Getting Started
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
              How to Use the {slug.split("-")[0]} Comment Generator
            </h2>

            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Create realistic TikTok comment sections in just a few simple
              steps—no technical skills required.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mt-12">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute left-4 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Sign Up or Log In
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create your account or log in to securely access your
                    projects.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Enter Your Content
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add the comments or prompts you want to generate.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Customize Details
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Adjust usernames, profile images, timestamps, likes, and
                    replies.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Generate Comments
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create individual or bulk comment sets depending on your
                    plan.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4 items-start">
                <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Download or Share
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Export your comment section as a high-quality image or share
                    it instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-12 max-w-[720px]">
            <p className="text-sm md:text-base text-muted-foreground">
              Within seconds, you’ll have a professional-looking{" "}
              {slug.split("-")[0]} comment section ready for ads, presentations,
              or content planning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16 text-center">
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Final Thoughts
          </h2>

          {/* Main Text */}
          <p className="mt-4 max-w-[720px] mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
            A {slug.split("-")[0]} comment generator helps you create realistic,
            engaging comment sections quickly and efficiently. Whether you're
            building mockups, planning campaigns, or presenting ideas, it
            simplifies your workflow while maintaining high-quality output.
          </p>

          <p className="mt-4 max-w-[720px] mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
            Instead of spending hours writing comments manually, you can focus
            on strategy, creativity, and scaling your content. The result is
            faster execution and more impactful campaigns.
          </p>

          <p className="mt-4 max-w-[720px] mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
            Best Comment Generator Tools Online help you creatively express and
            assist you in competitive ways, and are also tools you should look
            into if you have similar needs for your creativity in the digital
            space.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
              Start Generating Comments
            </button>
          </div>

          {/* Secondary Note */}
          <p className="mt-6 text-xs text-muted-foreground">
            Looking for more tools? Explore other comment generators to enhance
            your workflow.
          </p>
        </div>
      </section>
      <FAQSection toolName={slug.split("-")[0]} />
      <Footer />
    </div>
  );
}
