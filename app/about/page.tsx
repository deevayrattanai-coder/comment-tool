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
    title: "CommentCraft launches",
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
      <section className="max-w-[820px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          About CommentCraft
        </span>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05] mt-3 mb-5"
          style={{ textWrap: "balance" }}
        >
          Built for creators, by creators
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-[560px] mx-auto leading-relaxed"
          style={{ textWrap: "pretty" }}
        >
          Social media mockups should not require Photoshop. We built the
          fastest, most accurate comment screenshot generator on the web — and
          we are just getting started.
        </p>
      </section>

      <section className="max-w-[1000px] mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="max-w-[820px] mx-auto px-6 py-20">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8"
            style={{ textWrap: "balance" }}
          >
            Our story
          </h2>
          <div
            className="space-y-4 text-[15px] text-foreground/80 leading-[1.75]"
            style={{ textWrap: "pretty" }}
          >
            <p>
              In early 2025, we noticed a gap — content creators, marketers and
              educators needed realistic comment mockups but had to rely on
              clunky design tools or outdated generators that looked nothing
              like the real thing.
            </p>
            <p>
              We set out to build something better. CommentCraft launched with
              TikTok support and quickly expanded to Instagram, YouTube and X
              after overwhelming demand from our community.
            </p>
            <p>
              Today, over 240,000 screenshots have been generated through the
              platform. Our goal is to be the definitive toolkit for social
              media content creation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {milestones.map((m) => (
              <div
                key={m.title}
                className="rounded-xl border border-border bg-background p-5"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {m.year}
                </span>
                <h4 className="font-semibold text-foreground mt-2 mb-1.5">
                  {m.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[820px] mx-auto px-6 py-20 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
          style={{ textWrap: "balance" }}
        >
          Ready to try it?
        </h2>
        <p className="text-muted-foreground mb-7 max-w-[440px] mx-auto">
          No signup. No watermark. Open the generator and ship in two minutes.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-90 transition-all active:scale-[0.97]"
        >
          Open the Generator <ArrowRight size={15} />
        </Link>
      </section>
    </SiteLayout>
  );
}
