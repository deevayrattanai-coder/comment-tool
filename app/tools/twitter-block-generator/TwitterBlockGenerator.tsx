"use client";

import { useState, useRef, useCallback } from "react";
import {
  BlockData,
  defaultBlockData,
  TweetTheme,
  VerifiedBadge,
} from "@/lib/block-types";
import { downloadElement } from "@/lib/download";
import html2canvas from "html2canvas";
import { Upload, Download, Copy } from "lucide-react";
import ToolsSection from "@/components/ToolsSection";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5";

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
        width: 18,
        height: 18,
        fill,
        display: "inline",
      }}
    >
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.8 3.91s2.52 1.26 3.91.8C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
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
      {(["light", "dim", "dark"] as TweetTheme[]).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize transition-all ${value === t
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background hover:bg-muted"
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function BlockPreview({ data }: { data: BlockData }) {
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
        : data.coverColor || "#CFD9DE";

  const avatar = data.blockerAvatarFile || data.blockerAvatarUrl;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        background: bg,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
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
            bottom: -44,
            left: 28,
            width: 70,
            height: 70,
            borderRadius: "50%",
            overflow: "hidden",
            border: `5px solid ${bg}`,
            background: "#fff",
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
                background: "#64748b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 32,
              }}
            >
              {getInitials(data.blockerDisplayName || "U")}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          paddingLeft: 28,
          paddingRight: 28,
          paddingTop: 58,
          paddingBottom: 32,
          background: bg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: text,
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {data.blockerDisplayName || "Display Name"}
          </span>

          <VerifiedSvg type={data.blockerVerified} />
        </div>

        <div
          style={{
            marginTop: 4,
            color: sub,
            fontSize: 16,
          }}
        >
          @{data.blockerUsername || "username"}
        </div>
      </div>

      <div
        className="py-5 px-10 "
        style={{
          background: coverBg,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: text,
            fontSize: 18,
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          @{data.blockerUsername || "username"} blocked you
        </div>

        <div
          style={{
            marginTop: 18,
            color: sub,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          You are blocked from following @{data.blockerUsername || "username"}{" "}
          and viewing @{data.blockerUsername || "username"}’s posts.
        </div>
      </div>
    </div>
  );
}

const COVER_COLORS = [
  "#1D9BF0",
  "#000000",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#8B5CF6",
  "#EC4899",
  "#334155",
  "#06B6D4",
];

export default function BlockScreen() {
  const [data, setData] = useState<BlockData>(defaultBlockData);

  const previewRef = useRef<HTMLDivElement>(null);

  const avatarRef = useRef<HTMLInputElement>(null);

  const [downloading, setDownloading] = useState(false);

  const [active, setActive] = useState<number | null>(0);
  const [showVerifiedDropdown, setShowVerifiedDropdown] = useState(false);

  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";

  const up = (patch: Partial<BlockData>) => setData({ ...data, ...patch });

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

      await downloadElement(previewRef.current, bg, "twitter-block");

      toast.success("Image downloaded!");
    } catch {
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

          toast.success("Image copied!");
        }
      });
    } catch {
      toast.error("Copy failed");
    }
  }, []);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const r = new FileReader();

    r.onload = (ev) =>
      up({
        blockerAvatarFile: ev.target?.result as string,
      });

    r.readAsDataURL(file);
  };

  const faqs = [
    {
      q: "Can I customize usernames and profile images?",
      a: "Yes, all major elements are fully customizable.",
    },
    {
      q: "Is premium required for bulk generation?",
      a: "Yes, bulk generation is available with premium plans.",
    },
    {
      q: "Can I export screenshots in HD?",
      a: "Absolutely. The tool supports high-quality exports.",
    },
    {
      q: "Why is this better than other generators?",
      a: "It provides cleaner UI, realistic visuals, and advanced creator-focused features.",
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
      {/* TOOL */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6">
          {/* Form */}
          <aside className=" lg:w-[300px] lg:h-[480px] h-auto w-full flex-shrink-0 bg-sidebar-bg flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold">Block Screen Builder</h2>
              </div>
              <div className="px-4">
                {/* Blocker profile */}
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
                            onClick={() =>
                              setShowVerifiedDropdown((prev) => !prev)
                            }
                            className=" flex h-5 w-5 items-center justify-center
      rounded-full border border-border
      bg-background transition-all
      hover:border-primary"
                          >
                            <VerifiedIcon type={data.blockerVerified} />
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
                                    up({ blockerVerified: badge });
                                    setShowVerifiedDropdown(false);
                                  }}
                                  className={`
            flex h-9 w-9 items-center justify-center
            rounded-xl transition-all duration-200
                 ${data.blockerVerified === badge
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
                        value={data.blockerDisplayName}
                        onChange={(e) =>
                          up({ blockerDisplayName: e.target.value })
                        }
                        className={inputClass}
                        data-testid="input-display-name"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Username</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          @
                        </span>
                        <input
                          type="text"
                          value={data.blockerUsername}
                          onChange={(e) =>
                            up({
                              blockerUsername: e.target.value.replace(/^@/, ""),
                            })
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


                    <div>
                      <label className={labelClass}>Bio</label>
                      <textarea
                        rows={2}
                        value={data.blockerBio}
                        onChange={(e) => up({ blockerBio: e.target.value })}
                        className={`${inputClass} resize-none`}
                        data-testid="input-bio"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex items-center gap-2 justify-center py-4 ">
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
            <div className="w-full rounded-tr-2xl flex items-center justify-between px-4 py-3 border-b border-border bg-card backdrop-blur-sm">
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
                  <BlockPreview data={data} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-[1200px] mx-auto px-6 py-14 md:py-20">
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
            X / Twitter Tool
          </div>

          <h2 className="mt-5 w-full text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Best Twitter (X) Block Generator Tool Online
          </h2>

          <p className="mt-6 w-full text-base md:text-lg leading-relaxed text-muted-foreground">
            The <b><i className="underline"> Best Twitter (X) Block Generator Tool Online</i> </b> helps users create realistic block screenshots for memes, social media creatives, and engagement mockups. Inspired by the real interface of X, the tool makes customization simple and fast.
          </p>

          <p className="mt-4 w-full text-base md:text-lg leading-relaxed text-muted-foreground">
            Whether you're a creator, marketer, or agency, you can generate professional visuals within seconds.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-6 py-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why Use It
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Why Use a Twitter Block Generator?
          </h2>

          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
            Block screenshots are widely used across memes, social campaigns,
            storytelling content, and viral engagement posts.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="rounded-2xl border border-border bg-background/60 p-5 hover:shadow-md transition-all">
              <h3 className="font-semibold text-foreground">
                Create realistic screenshots instantly
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Generate realistic Twitter block visuals within seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-5 hover:shadow-md transition-all">
              <h3 className="font-semibold text-foreground">
                Save time on manual editing
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                No Photoshop or design experience required.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-5 hover:shadow-md transition-all">
              <h3 className="font-semibold text-foreground">
                Improve social media visuals
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Create better memes and engagement content.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-5 hover:shadow-md transition-all">
              <h3 className="font-semibold text-foreground">
                Perfect for creators and agencies
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Designed for creators, marketers, and content teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-border bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-[1100px] mx-auto px-6 py-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Powerful Features Built for Creators
          </h2>

          <p className="mt-5 text-muted-foreground leading-relaxed">
            Everything you need to create realistic Twitter block screenshots.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              {
                title: "Realistic X Interface",
                desc: "Generate screenshots matching the Twitter/X design.",
              },
              {
                title: "Full Customization",
                desc: "Edit usernames, profile images, and themes easily.",
              },
              {
                title: "HD Export",
                desc: "Download high-quality screenshots instantly.",
              },
              {
                title: "Verified Badges",
                desc: "Support for blue, gold, and government badges.",
              },
              {
                title: "Theme Support",
                desc: "Choose between light, dim, and dark modes.",
              },
              {
                title: "Fast & Responsive",
                desc: "Built for desktop and mobile creators.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background/70 p-5 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 sm:py-16 border-b border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative  p-6 sm:p-8 lg:p-10">
            <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl"></div>

            <div className="relative z-10">
              <span className="inline-flex items-center text-base px-4 py-1 font-medium text-primary">
                Final Thoughts
              </span>

              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Best Twitter (X) Block Generator Tool Online
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-7 text-muted-foreground">
                The <b><i className="underline">Best Twitter (X) Block Generator Tool Online</i></b> helps creators produce realistic and engaging visuals quickly while simplifying content creation workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="max-w-[900px] mx-auto px-6 py-16">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
              FAQs
            </span>

            <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-background overflow-hidden"
                >
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-foreground">
                      {faq.q}
                    </span>

                    <div
                      className={`transition-transform ${isOpen ? "rotate-45" : ""
                        }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.a }} />
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
