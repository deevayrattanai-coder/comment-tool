"use client";
import { useState } from "react";

const testimonials = [
  {
    name: "Liam Carter",
    role: "Growth Marketer, Sydney",
    quote:
      "This tool completely changed how we create ad creatives. We test 5x faster now.",
    rating: 5,
  },
  {
    name: "Olivia Bennett",
    role: "Social Media Manager, Melbourne",
    quote:
      "Super realistic outputs. Clients can’t even tell these are generated.",
    rating: 5,
  },
  {
    name: "Noah Williams",
    role: "Performance Agency Owner, Brisbane",
    quote:
      "We replaced multiple tools with this. It’s now part of our daily workflow.",
    rating: 5,
  },
  {
    name: "Emma Johnson",
    role: "Content Strategist, Perth",
    quote: "The bulk generation feature alone saves us hours every week.",
    rating: 4,
  },
  {
    name: "Mason Clarke",
    role: "Creative Director, Sydney",
    quote: "Insane speed and quality. Perfect for scaling content production.",
    rating: 5,
  },
  {
    name: "Charlotte Davis",
    role: "Digital Marketer, Adelaide",
    quote:
      "We use this for every campaign now. Engagement has noticeably improved.",
    rating: 5,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 text-yellow-400 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 3;

  const next = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage,
    );
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(testimonials.length - itemsPerPage, 0)
        : prev - itemsPerPage,
    );
  };

  const visible = testimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="max-w-[1100px] mx-auto px-6 pb-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-3">
          Trusted by Professionals Worldwide
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-[600px] mx-auto">
          Used daily by marketers, creators, and agencies to create
          high-converting content.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 transition-all">
        {visible.map((t, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg"
          >
            {/* glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition bg-gradient-to-br from-purple-500/10 to-primary/10" />

            <div className="relative z-10">
              {/* quote */}
              <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
                “{t.quote}”
              </p>

              {/* stars */}
              <StarRating rating={t.rating} />

              {/* divider */}
              <div className="h-px bg-border my-3" />

              {/* name */}
              <h4 className="text-sm font-semibold text-foreground">
                {t.name}
              </h4>

              {/* role */}
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="px-5 py-2 rounded-lg border border-border hover:border-primary transition text-sm"
        >
          ← Prev
        </button>

        <button
          onClick={next}
          className="px-5 py-2 rounded-lg border border-border hover:border-primary transition text-sm"
        >
          Next →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({
          length: Math.ceil(testimonials.length / itemsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i * itemsPerPage)}
            className={`h-2 w-2 rounded-full transition ${
              startIndex / itemsPerPage === i ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
