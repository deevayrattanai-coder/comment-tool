"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  {
    name: "Block Generator",
    path: "/tools/twitter-block-generator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 4l16 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Reply Chain",
    path: "/tools/twitter-reply-chain-generator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M6 6h12M6 12h8M6 18h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 10l4 2-4 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Suspension",
    path: "/tools/twitter-suspension-generator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 4l8 14H4L12 4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 9v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Tweet Generator",
    path: "/tools/twitter-tweet-generator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M4 20h4l10-10-4-4L4 16v4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 6l4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function ToolsSection() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-2 gap-2">
      {tools.map((tool) => {
        const active = pathname === tool.path;

        return (
          <Link
            key={tool.path}
            href={tool.path}
            className={`flex items-center gap-3 p-3 rounded-xl border transition
              ${
                active
                  ? "bg-purple-600/20 border-purple-500 text-purple-400"
                  : "bg-gradient-primary border-neutral-800 text-gray-400 hover:text-white hover:border-purple-500"
              }`}
          >
            <div className="flex items-center justify-center w-4 h-4 rounded-lg bg-black/40">
              {tool.icon}
            </div>
            <span className="text-xs font-medium">{tool.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
