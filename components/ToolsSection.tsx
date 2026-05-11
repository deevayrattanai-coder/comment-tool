"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  {
    name: "Tweet Generator",
    path: "/tools/fake-tweet-generator",
  },
  {
    name: "Block Generator",
    path: "/tools/twitter-block-generator",

  },
  {
    name: "Reply Chain",
    path: "/tools/tweet-reply-generator",

  },
  {
    name: "Suspension",
    path: "/tools/twitter-suspension-generator",

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
              ${active
                ? "bg-purple-600/20 border-purple-500 text-purple-400"
                : "bg-gradient-primary border-neutral-800 text-gray-400 hover:text-white hover:border-purple-500"
              }`}
          >
            <span className="text-xs font-medium">{tool.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
