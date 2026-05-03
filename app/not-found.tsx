"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden px-4">
        {/* 🌌 Background */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/20"
        />

        {/* 🔮 Glow Orbs (smaller on mobile) */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-purple-600/30 blur-3xl rounded-full top-[-80px] left-[-80px]"
        />

        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bg-pink-500/30 blur-3xl rounded-full bottom-[-80px] right-[-80px]"
        />

        {/* ✨ Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md sm:max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl sm:rounded-3xl px-5 max-md:py-5 sm:px-8 lg:px-10 py-8 sm:py-10 text-center"
        >
          {/* 🔢 404 */}
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.95, 1.05, 1] }}
            transition={{ duration: 1 }}
            className="max-md:text-2xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text"
          >
            404
          </motion.h1>

          {/* 🎭 SVG */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center my-4 sm:my-6"
          >
            <svg
              width="90"
              height="90"
              className="sm:w-[110px] sm:h-[110px] text-purple-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 15c1.5-2 6.5-2 8 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="10" r="1.2" fill="currentColor" />
              <circle cx="15" cy="10" r="1.2" fill="currentColor" />
            </svg>
          </motion.div>

          {/* 📝 Text */}
          <p className="text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">
            This page drifted into the void 🚀{" "}
            <br className="hidden sm:block" />
            Let’s get you back on track.
          </p>

          {/* 🔘 Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base font-medium hover:scale-105 transition"
            >
              <Home size={16} />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm sm:text-base hover:bg-white/10 hover:scale-105 transition"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          {/* 🔥 Optional CTA */}
          <p className="text-xs text-gray-500 mt-6">
            Try tools: TikTok • Instagram • YouTube
          </p>
        </motion.div>

        {/* ✨ Particles (reduced on mobile) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -80], opacity: [0, 1, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
