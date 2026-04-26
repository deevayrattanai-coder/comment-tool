import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentTool from "@/components/CommentTool";
import AdSlot from "@/components/AdSlot";

const VALID = new Set(["tiktok", "instagram", "youtube", "twitter"]);

const COPY: Record<
  string,
  { title: string; tagline: string; description: string }
> = {
  tiktok: {
    title: "Best TikTok Comment Generator Tool Online | Comment Tools",
    tagline: "Video & reply comments",
    description:
      "Create engaging TikTok comments instantly. Boost interaction, save time, and generate creative replies that match your content style.",
  },
  instagram: {
    title: "Best Instagram Comment Generator Tool Online | Comment Tools",
    tagline: "Post & Reels comments",
    description:
      "Generate high-quality Instagram comments in seconds. Increase engagement, reply faster, and keep your audience active with smart comments.",
  },
  youtube: {
    title: "Best YouTube Comment Generator Tool Online | Comment Tools",
    tagline: "Video & Shorts comments",
    description:
      "Write better YouTube comments instantly. Improve engagement, save time, and generate meaningful responses for videos at scale.",
  },
  twitter: {
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

  const baseUrl = "http://localhost:5000";
  const url = `${baseUrl}/${slug}-comment-generator`;

  return {
    title: `${c.title} | Comment Tools`,
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {c.tagline}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-2">
            {c.title}
          </h1>
          <p className="text-sm text-muted-foreground max-w-[640px]">
            {c.description}
          </p>
        </div>
      </section>
      <CommentTool initialPlatform={slug as any} />
      <section className="max-w-[1100px] mx-auto px-6 py-10 w-full">
        <AdSlot label="Sponsored" size="leaderboard" />
      </section>
      <Footer />
    </div>
  );
}
