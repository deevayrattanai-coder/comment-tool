"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TEXT_TYPES = {
  lorem:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  marketing:
    "Boost your brand visibility with high-converting content designed for creators, marketers, and businesses looking to scale faster.",
  social: "This is insane 🔥 You need to try this right now! 🚀",
  startup:
    "We are building the future of digital tools with a focus on speed, automation, and user-first design.",
};

function generateText(type: string, chars: number) {
  const base = TEXT_TYPES[type as keyof typeof TEXT_TYPES];

  let result = "";
  while (result.length < chars) {
    result += base + " ";
  }

  return result.slice(0, chars);
}

export default function FakeTextGenerator() {
  const [type, setType] = useState("lorem");
  const [chars, setChars] = useState(120);
  const [text, setText] = useState("");

  const handleGenerate = () => {
    if (chars < 10) return;

    const limitedChars = Math.min(1500, chars);
    setText(generateText(type, limitedChars));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-canvas-bg grid-dots overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[var(--gradient-glow)] pointer-events-none" />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl glass-panel rounded-2xl p-5 sm:p-7 lg:p-8"
        >
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Fake Text Generator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter character count (max 1500) and generate text.
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {/* Type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="glass-input rounded-lg px-3 py-2 text-sm"
            >
              <option value="lorem">Lorem Ipsum</option>
              <option value="marketing">Marketing Copy</option>
              <option value="social">Social Text</option>
              <option value="startup">Startup Pitch</option>
            </select>

            {/* Character Input */}
            <input
              type="number"
              placeholder="Enter characters (max 1500)"
              value={chars}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (isNaN(value)) return;

                value = Math.max(0, Math.min(1500, value));
                setChars(value);
              }}
              className="glass-input rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="w-full gradient-primary rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 mb-4"
          >
            <RefreshCw size={16} />
            Generate Text
          </button>

          {/* Output */}
          <div className="relative">
            <textarea
              value={text}
              readOnly
              placeholder="Generated text will appear here..."
              className="w-full h-40 sm:h-48 glass-input rounded-xl p-4 text-sm resize-none scrollbar-thin"
            />

            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 text-muted-foreground hover:text-white"
            >
              <Copy size={16} />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>{text.length} / 1500 characters</span>
            <span>Fast • Free • No login required</span>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
