import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { Check } from "lucide-react";
import { createMetadata } from "@/lib/seo";

const plans = [
  {
    name: "Free Forever",
    price: "$0",
    period: "/mo",
    description: "Perfect for getting started.",
    features: [
      "5 TikTok, 1 Instagram, 1 YouTube, 1 X exports per day",
      "All platforms (TikTok, IG, YouTube, X)",
      "Basic customization",
      "Standard resolution export",
    ],
    cta: "Signup",
    highlighted: false,
  },
  {
    name: "Annual",
    price: "$20",
    period: "/year",
    description: "The complete toolkit for viral social proof.",
    features: [
      "Everything in Free",
      "Unlimited Comment Exports (No daily limits)",
      "Bulk Comment Generator (Upload CSV, 50+ comments)",
      "4K High-Res Export",
      "Saved Comment Library",
      "Priority Support",
    ],
    cta: "Get Annual Access",
    highlighted: true,
  },
  {
    name: "Monthly",
    price: "$4",
    period: "/mo",
    description: "Full access, pay as you go.",
    features: [
      "Everything in Free",
      "Unlimited Comment Exports (No daily limits)",
      "Bulk Comment Generator (Upload CSV, 50+ comments)",
      "4K High-Res Export",
      "Saved Comment Library",
      "Priority Support",
    ],
    cta: "Unlock Full Access",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I use the free plan forever?",
    a: "Yes, the free plan is available with limited features.",
  },
  {
    q: "What happens if I upgrade?",
    a: "You instantly unlock unlimited generation, higher quality exports, and additional features.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel at any time without any restrictions.",
  },
  {
    q: "Do you offer refunds?",
    a: "Refunds are handled on a case-by-case basis.",
  },
  {
    q: "Is there a difference between monthly and annual plans?",
    a: "Yes, the annual plan includes bulk generation, 4K exports, and cost savings.",
  },
];

export const metadata = createMetadata({
  title: "Pricing | Comment Tools",
  description:
    "Explore affordable pricing plans for Comment Tools. Choose the perfect plan to generate unlimited social media comments and grow faster.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <SiteLayout>
      {/* PRICING HERO */}
      <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-12 text-center">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-600/10 via-background to-primary/10 p-10 md:p-16">
          {/* background glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-[720px] mx-auto">
            {/* label */}
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Pricing
            </span>

            {/* headline */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              Simple, Transparent Pricing
            </h1>

            {/* subheadline */}
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-[620px] mx-auto">
              Start for free. Upgrade when you need more power, higher quality,
              and scale.
            </p>

            {/* CTA (optional but powerful) */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#pricing-table"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                View Plans →
              </a>

              <a
                href="/"
                className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition"
              >
                Start for Free
              </a>
            </div>

            {/* trust line */}
            <p className="text-xs text-muted-foreground mt-5">
              No hidden fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* VALUE JUSTIFICATION */}
      <section className="max-w-[1040px] mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          Why Upgrade?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Save Time",
              desc: "Generate comments instantly instead of designing manually.",
            },
            {
              title: "Improve Quality",
              desc: "Create realistic, high-resolution visuals that look professional.",
            },
            {
              title: "Scale Your Workflow",
              desc: "Perfect for agencies and marketers handling multiple campaigns.",
            },
            {
              title: "Increase Conversions",
              desc: "Use social proof visuals in ads and content to improve performance.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary transition"
            >
              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="border-t border-border bg-card/40">
        <div className="max-w-[1040px] mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
            Choose the Plan That Fits Your Needs
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Free Plan",
                desc: "For users exploring the tool and basic usage.",
              },
              {
                title: "Monthly Plan",
                desc: "For creators and marketers who need consistent output.",
              },
              {
                title: "Annual Plan",
                desc: "For agencies and teams managing high-volume workflows.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background p-6 text-center hover:border-primary transition"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="max-w-[920px] mx-auto px-6 pt-20 pb-10 text-center"
        id="pricing-table"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Pricing
        </span>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05] mt-3 mb-4"
          style={{ textWrap: "balance" }}
        >
          Simple, transparent pricing
        </h1>
        <p className="text-base text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
          Start for free. Upgrade when you need more power, higher quality, and
          scale.
        </p>
        <p className="tex-sm text-muted-foreground my-2">
          No hidden fees. Cancel anytime.
        </p>
      </section>

      <section className="max-w-[1040px] mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 relative min-h-[447px] ${
                plan.highlighted
                  ? "border-primary bg-card shadow-xl md:scale-[1.02]"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Most popular
                </div>
              )}
              <h3 className="font-bold text-foreground text-lg text-center">
                {plan.name}
              </h3>
              <p className="text-xs  text-muted-foreground mb-6 text-center ">
                {plan.description}
              </p>
              <div className="mt-2 mb-1 text-center">
                <span className="text-4xl font-extrabold text-foreground tabular-nums">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                )}
              </div>

              <div className="my-4">
                {plan.name === "Free" ? (
                  <Link
                    href="/"
                    className="block w-full text-center py-2.5 rounded-lg font-semibold text-sm border border-border text-foreground hover:bg-accent transition-all active:scale-[0.97]"
                  >
                    {plan.cta}
                  </Link>
                ) : plan.name === "Enterprise" ? (
                  <Link
                    href="/contact"
                    className="block w-full text-center py-2.5 rounded-lg font-semibold text-sm border border-border text-foreground hover:bg-accent transition-all active:scale-[0.97]"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-lg font-semibold text-sm gradient-primary text-primary-foreground shadow-md opacity-90 cursor-not-allowed"
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <Check
                      size={15}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 my-8 md:gap-10">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-400">
              Secure Payment
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-400">
              Cancel Anytime
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-400">
              4.9/5 Rating
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground tracking-tight text-center mb-8">
            Pricing FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-xl border border-border bg-background p-5 group"
              >
                <summary className="font-medium text-foreground text-sm cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
