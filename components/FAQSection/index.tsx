"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need an account to use this tool?",
    a: "Yes, this TikTok Comment Generator requires login so you can securely save and manage your projects.",
  },
  {
    q: "Is this tool free to use?",
    a: "Yes, a basic version is available for free. Premium features unlock advanced capabilities.",
  },
  {
    q: "What does the premium version offer?",
    a: "The premium plan allows you to generate comments in bulk, saving time for large-scale projects.",
  },
  {
    q: "Are the generated comments real?",
    a: "No, all comments are simulated and intended for mockups, creatives, and demonstration purposes.",
  },
  {
    q: "Can I use this tool for client work?",
    a: "Yes, it’s widely used by agencies and freelancers for creating campaign visuals and presentations.",
  },
  {
    q: "Can I customize usernames and profile pictures?",
    a: "Absolutely. You can fully customize all elements to make comments look realistic.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-background">
      <div className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Everything you need to know about using the TikTok Comment
            Generator.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = active === i;

            return (
              <div
                key={i}
                className="border border-border rounded-xl bg-background/70 backdrop-blur transition"
              >
                {/* Question */}
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-5 py-4"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>

                  <span
                    className={`text-primary text-lg transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
