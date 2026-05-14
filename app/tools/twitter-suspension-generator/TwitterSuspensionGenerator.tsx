"use client";

import { useState, useRef, useCallback } from "react";
import {
  SuspensionData,
  defaultSuspensionData,
  SUSPENSION_MESSAGES,
  TweetTheme,
  VerifiedBadge,
} from "@/lib/suspension-types";
import { downloadElement } from "@/lib/download";
import { Upload, Download, Copy } from "lucide-react";
import ToolsSection from "@/components/ToolsSection";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function VerifiedSvg({ type }: { type: VerifiedBadge }) {
  if (type === "none") return null;

  const fill =
    type === "gold" ? "#F7BA2A" : type === "government" ? "#829AAB" : "#1D9BF0";

  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: 16,
        height: 16,
        fill,
        display: "inline",
        marginLeft: 3,
      }}
    >
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.8 3.91s2.52 1.26 3.91.8C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
  );
}

function SuspensionPreview({ data }: { data: SuspensionData }) {
  const isDark = data.theme !== "light";

  const bg =
    data.theme === "dark"
      ? "#000"
      : data.theme === "dim"
        ? "#15202b"
        : "#ffffff";

  const text = isDark ? "#E7E9EA" : "#0F1419";
  const sub = "#536471";

  const coverBg =
    data.theme === "dark"
      ? "#16181c"
      : data.theme === "dim"
        ? "#1e2732"
        : "#CFD9DE";

  const avatar = data.avatarFile || data.avatarUrl;

  const message =
    data.reason === "custom"
      ? data.customMessage
      : SUSPENSION_MESSAGES[data.reason];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        background: bg,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
        borderRadius: 20,
      }}
    >
      <div
        style={{
          height: 60,
          background: coverBg,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -52,
            left: 32,
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `5px solid ${bg}`,
            overflow: "hidden",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt=""
              crossOrigin="anonymous"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#5B7083",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 34,
              }}
            >
              {getInitials(data.displayName || "U")}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 68,
          paddingBottom: 44,
          background: bg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: text,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {data.displayName || "Display Name"}
          </span>

          <VerifiedSvg type={data.verified} />
        </div>

        <div
          style={{
            marginTop: 10,
            color: sub,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          @{data.username || "username"}
        </div>
      </div>

      <div
        style={{
          background: coverBg,
          padding: "20px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: text,
            fontSize: 18,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Account suspended
        </div>

        <div
          style={{
            marginTop: 18,
            color: sub,
            fontSize: 12,
            lineHeight: 1.5,
            fontWeight: 400,
          }}
          dangerouslySetInnerHTML={{
            __html:
              message ||
              `Twitter suspends accounts that violate the 
              <span style="color:#1D9BF0">Twitter Rules</span>.`,
          }}
        />
      </div>
    </div>
  );
}

function ThemeSelector({
  value,
  onChange,
}: {
  value: TweetTheme;
  onChange: (t: TweetTheme) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["light", "dim", "dark"] as TweetTheme[]).map((t) => {
        const bg = t === "dark" ? "#000" : t === "dim" ? "#15202b" : "#fff";
        const col = t === "light" ? "#0f1419" : "#e7e9ea";

        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`flex-1 py-1 px-2 rounded-xl border-2 text-xs font-medium transition-all capitalize ${value === t ? "border-primary" : "border-border"
              }`}
            style={{ backgroundColor: bg, color: col }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default function SuspensionScreen() {
  const [data, setData] = useState<SuspensionData>(defaultSuspensionData);

  const previewRef = useRef<HTMLDivElement>(null);

  const [downloading, setDownloading] = useState(false);
  const [showVerifiedDropdown, setShowVerifiedDropdown] = useState(false);

  const avatarRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState<number | null>(0);

  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";

  const up = (patch: Partial<SuspensionData>) => setData({ ...data, ...patch });

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;

    setDownloading(true);

    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user) {
        toast.error("Please login to download");
        setDownloading(false);
        return;
      }

      await downloadElement(previewRef.current, bg, "twitter-suspension");

      toast.success("Image downloaded!");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setDownloading(false);
    }
  }, [bg]);

  const copyImage = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user) {
        toast.error("Please login to copy image");
        return;
      }

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);

          toast.success("Image copied to clipboard!");
        }
      });
    } catch (err) {
      toast.error("Copy failed");
    }
  }, []);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const r = new FileReader();

    r.onload = (ev) =>
      up({
        avatarFile: ev.target?.result as string,
      });

    r.readAsDataURL(file);
  };

  const faqs = [
    {
      q: "Can I customize the suspension message?",
      a: "Yes, usernames, handles, and visuals are fully customizable.",
    },
    {
      q: "Is this tool free to use?",
      a: "Yes, basic features are available for free.",
    },
    {
      q: "Is login required?",
      a: "Yes, login is required to securely manage projects.",
    },
    {
      q: "Why is Comment Tools better than Top Comment?",
      a: `
    <a
      href="/"
      class="font-semibold text-purple-400 underline underline-offset-4 transition-colors hover:text-purple-300"
    >
      Comment Tools
    </a>
    is continuously expanding with more social media tools and advanced workflow features.
  `,
    },
  ];

  const verifiedOptions: VerifiedBadge[] = [
    "none",
    "blue",
    "gold",
    "government",
  ];

  const VerifiedIcon = ({ type }: { type: string }) => {
    if (type === "none") return null;
    if (type === "gold") {
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 inline-block ml-0.5"
          fill="#F7BA2A"
          aria-label="Gold verified"
        >
          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.8 3.91s2.52 1.26 3.91.8C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
        </svg>
      );
    }
    if (type === "government") {
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 inline-block ml-0.5"
          fill="#829AAB"
          aria-label="Government verified"
        >
          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.8 3.91s2.52 1.26 3.91.8C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
        </svg>
      );
    }
    // blue
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 inline-block ml-0.5"
        fill="#1D9BF0"
        aria-label="Blue verified"
      >
        <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.8 3.91s2.52 1.26 3.91.8C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* YOUR EXISTING BUILDER + PREVIEW SECTION HERE */}
      <div className="flex-1 max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center items-stretch max-md:flex-col max-md:gap-6">
        {/* Form */}
        <aside className="w-full lg:h-[480px] h-auto lg:w-[300px] flex-shrink-0 bg-sidebar-bg flex flex-col ">
          <div className="flex-1 overflow-y-auto scrollbar-thin">

            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">Suspension Screen Builder</h2>
            </div>
            <div className="p-4 ">
              {/* Theme */}
              <div className="py-2"> <ToolsSection /> </div>

              <hr className="border-border" />

              {/* Profile */}
              <div>
                <div className="space-y-2">
                  <div>
                    <div className="flex my-2 justify-between items-center">
                      <label className={labelClass}>Display Name</label>
                      <div className="relative">
                        {" "}
                        {/* Trigger */}
                        <button
                          type="button"
                          onClick={() => setShowVerifiedDropdown((prev) => !prev)}
                          className=" flex h-5 w-5 items-center justify-center
      rounded-full border border-border
      bg-background transition-all
      hover:border-primary"
                        >
                          <VerifiedIcon type={data.verified} />
                        </button>
                        {/* Dropdown */}
                        {showVerifiedDropdown && (
                          <div
                            className="
        absolute  right-0 top-full z-50 mt-2
        flex items-center gap-1
        rounded-2xl border border-border
        bg-card p-1.5 shadow-2xl
        backdrop-blur-xl
      "
                          >
                            {verifiedOptions.map((badge) => (
                              <button
                                key={badge}
                                type="button"
                                onClick={() => {
                                  up({ verified: badge });
                                  setShowVerifiedDropdown(false);
                                }}
                                className={`
            flex h-9 w-9 items-center justify-center
            rounded-xl transition-all duration-200
                 ${data.verified === badge
                                    ? "bg-primary/15 ring-1 ring-primary"
                                    : "hover:bg-muted"
                                  }
         
          `}
                              >
                                {badge === "none" ? (
                                  <span className="text-xs text-muted-foreground">
                                    ×
                                  </span>
                                ) : (
                                  <VerifiedIcon type={badge} />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={data.displayName}
                      onChange={(e) => up({ displayName: e.target.value })}
                      className={inputClass}
                      data-testid="input-display-name"
                    />
                  </div>

                  <div className="py-2">
                    <label className={labelClass}>Username</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        value={data.username}
                        onChange={(e) =>
                          up({ username: e.target.value.replace(/^@/, "") })
                        }
                        className={`${inputClass} pl-7`}
                        data-testid="input-username"
                      />
                      <Upload
                        onClick={() => avatarRef.current?.click()}
                        size={11}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted cursor-pointer hover:text-sidebar-text"
                      />
                      <input
                        ref={avatarRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatar}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <hr className="border-border py-2" />

              {/* Suspension reason */}
              <div>
                <h3 className="text-xs py-2 font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Suspension Reason
                </h3>
                <div className="space-y-2">
                  {(["rules", "unusual", "spam", "custom"] as const).map((r) => (
                    <label
                      key={r}
                      className="flex items-start gap-2.5 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={data.reason === r}
                        onChange={() => up({ reason: r })}
                        className="mt-0.5 accent-primary"
                      />
                      <span className="text-sm text-foreground">
                        {r === "rules" && "Twitter Rules violation"}
                        {r === "unusual" && "Unusual activity"}
                        {r === "spam" && "Spam / Platform manipulation"}
                        {r === "custom" && "Custom message"}
                      </span>
                    </label>
                  ))}

                  {data.reason === "custom" && (
                    <textarea
                      rows={3}
                      value={data.customMessage}
                      onChange={(e) => up({ customMessage: e.target.value })}
                      placeholder="Enter your custom suspension message..."
                      className={`${inputClass} resize-none mt-1`}
                      data-testid="input-custom-message"
                    />
                  )}

                  {data.reason !== "custom" && (
                    <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground leading-relaxed">
                      "{SUSPENSION_MESSAGES[data.reason]}"
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>
          <div className="flex items-center gap-2 justify-center py-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1  h-9 gradient-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
            >
              <Download size={13} />
              Export Image
            </button>

            <button
              onClick={copyImage}
              className="flex-1 h-9 glass-panel text-sidebar-text rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-sidebar-surface transition-all"
            >
              <Copy size={13} />
              Copy
            </button>
          </div>
        </aside>

        {/* Preview */}
        <div className="flex-1 w-full lg:h-[480px] overflow-y-auto scrollbar-thin">
          <div className="flex w-full rounded-tr-2xl items-center justify-between px-4 py-3 border-b border-border bg-card backdrop-blur-sm">
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Preview
            </span>
            <div className="flex gap-3">
              <ThemeSelector
                value={data.theme}
                onChange={(theme) => setData({ ...data, theme })}
              />
            </div>
          </div>
          <main className="flex flex-col items-center gap-4">
            <div
              className={`w-full rounded-tb-2xl p-6 flex items-center justify-center transition-colors duration-300 bg-gray-200 dark-grid-dots`}
            >
              <div ref={previewRef} style={{ width: "100%", maxWidth: 560 }}>
                <SuspensionPreview data={data} />
              </div>
            </div>

          </main>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              Twitter (X) Mockup Tool
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight max-w-4xl">
            Best Twitter (X) Suspension Generator Tool Online
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            The <b><i className="underline">Best Twitter (X) Suspension Generator Tool Online</i></b> allows users to generate realistic suspension screenshots instantly. Whether you're creating memes, mockups, creative visuals, or campaign concepts, this tool delivers professional-looking results within seconds.
          </p>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            Built for creators, agencies, and marketers, it closely matches the interface of X for maximum realism.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
              <h3 className="font-semibold text-foreground mb-1">
                ⚡ Realistic Suspension Screens
              </h3>

              <p className="text-sm text-muted-foreground">
                Generate highly realistic Twitter suspension screenshots
                instantly.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
              <h3 className="font-semibold text-foreground mb-1">
                ✏️ Fully Customizable Profiles
              </h3>

              <p className="text-sm text-muted-foreground">
                Customize usernames, handles, badges, avatars, and suspension
                messages.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-md transition">
              <h3 className="font-semibold text-foreground mb-1">
                🚀 Built for Creators
              </h3>

              <p className="text-sm text-muted-foreground">
                Perfect for creators, agencies, marketers, memes, and campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why It Matters
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2 max-w-4xl">
            Why Use a Twitter Suspension Generator?
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {[
              {
                icon: "⚡",
                title: "Generate realistic suspension screenshots",
                desc: "Create authentic-looking Twitter suspension visuals instantly.",
              },
              {
                icon: "✏️",
                title: "Customize usernames and profile details",
                desc: "Easily edit handles, avatars, verification badges, and messages.",
              },
              {
                icon: "😂",
                title: "Create meme-style visuals faster",
                desc: "Produce viral meme screenshots and social content within seconds.",
              },
              {
                icon: "🚀",
                title: "Improve campaign creativity",
                desc: "Enhance marketing concepts and presentation visuals professionally.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition"
              >
                <span className="text-lg">{item.icon}</span>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-border bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2 max-w-4xl">
            Key Features of Our Twitter Suspension Generator Tool
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: "✔",
                title: "Realistic Suspension UI",
                desc: "Generate suspension screenshots that closely match the real X platform.",
              },
              {
                icon: "✏️",
                title: "Full Customization",
                desc: "Customize profile names, handles, badges, avatars, and messages easily.",
              },
              {
                icon: "📥",
                title: "High-Quality Export",
                desc: "Download high-resolution screenshots optimized for social media usage.",
              },
              {
                icon: "🔒",
                title: "Secure Login-Based Access",
                desc: "Login securely to manage and save your generated projects.",
              },
              {
                icon: "⚡",
                title: "Fast & Easy Workflow",
                desc: "Create realistic Twitter suspension visuals within seconds.",
              },
              {
                icon: "🌍",
                title: "Built for Global Creators",
                desc: "Perfect for creators, agencies, and marketers worldwide.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl border border-border bg-background/70 backdrop-blur hover:shadow-md transition"
              >
                <div className="text-xl mb-2">{item.icon}</div>

                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Final Thoughts
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Create realistic tweet screenshots faster with a cleaner workflow
          </h2>

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            If you're searching for the <b><i className="underline">Best Twitter (X) Suspension Generator Tool Online</i></b>, Comment Tools provides a fast, realistic, and highly customizable solution for creators and agencies.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
          <div className="text-center mb-12">
            <span className="text-base font-semibold uppercase tracking-widest text-primary">
              FAQs
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-background/70 backdrop-blur overflow-hidden"
                >
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground text-base md:text-lg">
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                        }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm md:text-base text-muted-foreground leading-7">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
