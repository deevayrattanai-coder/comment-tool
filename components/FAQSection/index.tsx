"use client";

import { useState } from "react";

// ✅ All FAQs mapped by tool
const faqsMap: Record<string, { q: string; a: string }[]> = {
  tiktok: [
    {
      q: "Do I need an account to use this tool?",
      a: "Yes, this TikTok Comment Generator requires login so you can securely save and manage your projects.",
    },
    {
      q: "Is this tool free to use?",
      a: "Yes, a basic version is available for free. However, premium features unlock advanced capabilities.",
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
    {
      q: "Is my data secure and private?",
      a: "Yes, since the tool requires login, your data is securely stored and protected.",
    },
  ],

  instagram: [
    {
      q: "Do I need to log in to use this tool?",
      a: "Yes, this Instagram Comment Generator requires login so you can securely save and manage your projects.",
    },
    {
      q: "Is there a free version available?",
      a: "Yes, a free version is available with basic features, while premium unlocks advanced options.",
    },
    {
      q: "What does the premium plan include?",
      a: "The premium plan allows bulk comment generation, helping you save time on large-scale projects.",
    },
    {
      q: "Are these comments real?",
      a: "No, all comments are simulated and intended for mockups, visuals, and demonstration purposes only.",
    },
    {
      q: "Can I use this for client work?",
      a: "Yes, many agencies and freelancers use this tool for campaign visuals and presentations.",
    },
    {
      q: "Can I customize usernames and profile images?",
      a: "Yes, the tool offers full customization to make comments look realistic.",
    },
    {
      q: "Is my data secure?",
      a: "Yes, your data is secure and protected since the tool operates through a secure login system.",
    },
  ],
  youtube: [
    {
      q: "Do I need to log in to use this tool?",
      a: "Yes, this YouTube Comment Generator requires login so you can securely save and manage your projects.",
    },
    {
      q: "Is there a free version available?",
      a: "Yes, a free version is available with basic features, while premium unlocks advanced capabilities.",
    },
    {
      q: "What does the premium plan include?",
      a: "The premium plan allows bulk comment generation, helping you save time on large-scale projects.",
    },
    {
      q: "Are the generated comments real?",
      a: "No, all comments are simulated and designed for mockups, creatives, and demonstration purposes only.",
    },
    {
      q: "Can I use this tool for client work?",
      a: "Yes, it’s widely used by agencies and freelancers for campaign visuals and presentations.",
    },
    {
      q: "Can I customize usernames and profile images?",
      a: "Yes, the tool offers full customization to make comments look realistic.",
    },
    {
      q: "Is my data secure?",
      a: "Yes, your data is secure and protected through a secure login system.",
    },
  ],
  twitter: [
    {
      q: "Do I need to log in to use this tool?",
      a: "Yes, this X (Twitter) Comment Generator requires login so you can securely save and manage your projects.",
    },
    {
      q: "Is there a free version available?",
      a: "Yes, a basic version is available for free, while premium features unlock advanced capabilities.",
    },
    {
      q: "What does the premium plan include?",
      a: "The premium plan allows bulk reply generation, helping you save time on large-scale campaigns.",
    },
    {
      q: "Are the generated replies real?",
      a: "No, all replies are simulated and intended for mockups, visuals, and demonstration purposes only.",
    },
    {
      q: "Can I use this tool for client work?",
      a: "Yes, many agencies and freelancers use it for campaign visuals and presentations.",
    },
    {
      q: "Can I customize usernames and profile images?",
      a: "Yes, full customization is available to make replies look realistic.",
    },
    {
      q: "Is my data secure?",
      a: "Yes, your data is secure and protected through a secure login system.",
    },
  ],
};

export default function FAQSection({ toolName }: { toolName: string }) {
  const [active, setActive] = useState<number | null>(0);

  // ✅ normalize tool name (important)
  const key = toolName.toLowerCase();

  // ✅ fallback to tiktok if not found
  const faqs = faqsMap[key] || faqsMap["tiktok"];

  return (
    <section className="border-t border-border bg-background">
      <div className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Everything you need to know about using the {toolName} Comment
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
