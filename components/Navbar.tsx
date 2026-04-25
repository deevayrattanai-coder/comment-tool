"use client";

import { MessageSquare, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

const isActiveLink = (pathname: string, to: string, end?: boolean) => {
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(to + "/");
};

const Navbar = () => {
  const pathname = usePathname() ?? "/";
  const { user } = useAuth();

  return (
    <nav className="h-14 px-6 md:px-8 flex items-center justify-between bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
          <MessageSquare className="text-primary-foreground" size={17} />
        </div>
        <span className="font-bold text-foreground tracking-tight text-lg">
          CommentCraft
        </span>
      </Link>
      <div className="flex items-center gap-1">
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const isActive = isActiveLink(pathname, l.to, l.end);
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground bg-accent"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        {user ? (
          <Link
            href="/profile"
            className="ml-2 px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold shadow-sm hover:opacity-90 transition-all active:scale-[0.97] flex items-center gap-1.5"
          >
            <UserIcon size={14} />
            <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="ml-2 px-4 py-1.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold shadow-sm hover:opacity-90 transition-all active:scale-[0.97]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
