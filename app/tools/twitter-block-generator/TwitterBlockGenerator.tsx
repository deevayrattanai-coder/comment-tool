"use client";
import { useState, useRef, useCallback } from "react";
import {
  BlockData,
  defaultBlockData,
  TweetTheme,
  VerifiedBadge,
} from "@/lib/block-types";
// import NavHeader from "@/components/nav-header";
import { downloadElement } from "@/lib/download";
import html2canvas from "html2canvas";
import { Upload, Download, Copy } from "lucide-react";
import ToolsSection from "@/components/ToolsSection";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function formatNum(n: number) {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

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
      style={{ width: 16, height: 16, fill, display: "inline", marginLeft: 3 }}
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
      {(["light", "dim", "dark"] as TweetTheme[]).map((t) => {
        const bg = t === "dark" ? "#000" : t === "dim" ? "#15202b" : "#fff";
        const col = t === "light" ? "#0f1419" : "#e7e9ea";
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`flex-1 py-1 px-2 rounded-xl border-2 text-xs font-medium transition-all capitalize ${value === t ? "border-primary" : "border-border"}`}
            style={{ backgroundColor: bg, color: col }}
          >
            {t}
          </button>
        );
      })}
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
        : "#CFD9DE";

  const avatar = data.blockerAvatarFile || data.blockerAvatarUrl;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        background: bg,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      {/* Top Cover */}
      <div
        style={{
          height: 60,
          background: coverBg,
          position: "relative",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            position: "absolute",
            bottom: -52,
            left: 32,
            width: 80,
            height: 80,
            borderRadius: "50%",
            overflow: "hidden",
            border: `5px solid ${bg}`,
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
              {getInitials(data.blockerDisplayName || "U")}
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 68,
          paddingBottom: 44,
          background: bg,
        }}
      >
        {/* Name */}
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
              fontSize: 24,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            {data.blockerDisplayName || "Display Name"}
          </span>

          <VerifiedSvg type={data.blockerVerified} />
        </div>

        {/* Username */}
        <div
          style={{
            marginTop: 10,
            color: sub,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          @{data.blockerUsername || "username"}
        </div>
      </div>

      {/* Block Message Section */}
      <div
        style={{
          background: coverBg,
          padding: "50px",
          textAlign: "center",
        }}
      >
        {/* Main Heading */}
        <div
          style={{
            color: text,
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          @{data.blockerUsername || "username"} blocked you
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: 18,
            color: sub,
            fontSize: 24,
            lineHeight: 1.55,
            fontWeight: 400,
          }}
        >
          You are blocked from following @
          {data.blockerUsername || "username"} and viewing @
          {data.blockerUsername || "username"}’s Tweets.
        </div>
      </div>
    </div>
  );
}

const COVER_COLORS = [
  "#1D9BF0",
  "#000000",
  "#FF4444",
  "#FF7700",
  "#FFCC00",
  "#44BB44",
  "#9944FF",
  "#FF44BB",
  "#334155",
  "#7C3AED",
];

export default function BlockScreen() {
  const [data, setData] = useState<BlockData>(defaultBlockData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<number | null>(0);

  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";
  const up = (patch: Partial<BlockData>) => setData({ ...data, ...patch });

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      // 🔐 Check login
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.user) {
        toast.error("Please login to download");
        setDownloading(false);
        return;
      }
      await downloadElement(previewRef.current, bg, "twitter-block");
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
      // 🔐 Check auth
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
  }, [bg]);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => up({ blockerAvatarFile: ev.target?.result as string });
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
      q: "Why is Comment Tools better than Top Comment?",
      a: "Comment Tools is continuously growing with more social media tools and advanced creator-focused features.",
    },
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl mt-5 flex justify-center font-black leading-tight tracking-tight text-white lg:text-5xl">
        <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Best Twitter (X) Block Generator Tool Online
        </span>
      </h1>
      <div className="max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6">
        {/* Form */}
        <aside className=" lg:w-[300px] w-full bg-card border border-border rounded-tl-2xl overflow-hidden">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Block Screen Builder</h2>
          </div>

          <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            {/* Theme */}

            <ToolsSection />

            {/* Cover color */}
            <div>
              <label className={labelClass}>Cover Photo Color</label>
              <div className="flex flex-wrap gap-2">
                {COVER_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => up({ coverColor: c })}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${data.coverColor === c ? "border-primary scale-110" : "border-border"}`}
                    style={{ backgroundColor: c }}
                    data-testid={`cover-color-${c}`}
                  />
                ))}
                <input
                  type="color"
                  value={data.coverColor}
                  onChange={(e) => up({ coverColor: e.target.value })}
                  className="w-7 h-7 rounded-full cursor-pointer border border-border"
                  title="Custom color"
                />
              </div>
            </div>

            <hr className="border-border" />

            {/* Blocker profile */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Blocker Profile
              </h3>
              <div className="space-y-2">
                {/* Avatar */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden cursor-pointer border border-border"
                    onClick={() => avatarRef.current?.click()}
                  >
                    {data.blockerAvatarFile || data.blockerAvatarUrl ? (
                      <img
                        src={data.blockerAvatarFile || data.blockerAvatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-primary-foreground" />
                    )}
                  </div>
                  <input
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatar}
                  />
                  <input
                    type="url"
                    placeholder="Avatar URL"
                    value={data.blockerAvatarUrl}
                    onChange={(e) =>
                      up({
                        blockerAvatarUrl: e.target.value,
                        blockerAvatarFile: null,
                      })
                    }
                    className={inputClass}
                    data-testid="input-avatar-url"
                  />
                </div>

                <div>
                  <label className={labelClass}>Display Name</label>
                  <input
                    type="text"
                    value={data.blockerDisplayName}
                    onChange={(e) => up({ blockerDisplayName: e.target.value })}
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
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Verified Badge</label>
                  <div className="grid grid-cols-4 gap-1">
                    {(
                      ["none", "blue", "gold", "government"] as VerifiedBadge[]
                    ).map((b) => (
                      <button
                        key={b}
                        onClick={() => up({ blockerVerified: b })}
                        className={`py-1 rounded text-[10px] font-medium border capitalize transition-all ${data.blockerVerified === b ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                      >
                        {b === "none"
                          ? "None"
                          : b === "blue"
                            ? "🔵"
                            : b === "gold"
                              ? "🟡"
                              : "🏛️"}
                      </button>
                    ))}
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

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>Following</label>
                    <input
                      type="number"
                      min={0}
                      value={data.blockerFollowing}
                      onChange={(e) =>
                        up({ blockerFollowing: +e.target.value })
                      }
                      className={inputClass}
                      data-testid="input-following"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Followers</label>
                    <input
                      type="number"
                      min={0}
                      value={data.blockerFollowers}
                      onChange={(e) =>
                        up({ blockerFollowers: +e.target.value })
                      }
                      className={inputClass}
                      data-testid="input-followers"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center ">
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
              </div>
            </div>
          </div>
        </aside>

        {/* Preview */}
        <div className="flex-1 w-full  ">
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
            <p className="text-xs text-muted-foreground text-center">
              For entertainment purposes only. Not affiliated with X Corp.
            </p>
          </main>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-1/2 h-[420px] w-full -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Content */}
          <div className="flex flex-col items-center text-center">

            <h2 className="text-3xl font-black leading-tight tracking-tight text-white lg:text-4xl">
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Generate Realistic Twitter Block
              </span>
              <br />
              Screenshots Instantly
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
              The Best Twitter (X) Block Generator Tool Online helps users create
              realistic block screenshots for memes, social media creatives, and
              engagement mockups. Inspired by the real interface of X, the tool makes
              customization simple and fast.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
              Whether you're a creator, marketer, or agency, you can generate
              professional visuals within seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-20 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-xl">
              🚀 Why Use a Twitter Block Generator?
            </div>

            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Block screenshots are popular across social media for humor,
              storytelling, and creative campaigns.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Therefore, having a realistic generator saves time while improving
              content quality.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/[0.05]">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all duration-300 group-hover:bg-purple-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl shadow-lg">
                  📸
                </div>

                <h3 className="text-xl font-bold text-white">
                  Generate realistic block screenshots
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40 hover:bg-white/[0.05]">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition-all duration-300 group-hover:bg-pink-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                  ✏️
                </div>

                <h3 className="text-xl font-bold text-white">
                  Customize usernames and messages
                </h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.05]">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-lg">
                  😂
                </div>

                <h3 className="text-xl font-bold text-white">
                  Create engaging meme content
                </h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40 hover:bg-white/[0.05]">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition-all duration-300 group-hover:bg-green-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl shadow-lg">
                  ⚡
                </div>

                <h3 className="text-xl font-bold text-white">
                  Improve social media creatives
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Export HD visuals instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-xl">
              Key Features
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Built for creators, agencies, and viral content
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Powerful customization with realistic visuals and production-ready
              export quality.
            </p>
          </div>

          {/* Features */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all duration-300 group-hover:bg-purple-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl shadow-lg">
                  ✔
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Realistic Block UI
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Generate screenshots that closely match the real X interface.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition-all duration-300 group-hover:bg-pink-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                  ✏️
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Full Customization
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Edit usernames, profile pictures, handles, and block messages
                  easily.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-lg">
                  📥
                </div>

                <h3 className="text-2xl font-bold text-white">
                  High-Quality Export
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Download professional HD screenshots for campaigns and content.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition-all duration-300 group-hover:bg-green-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl shadow-lg">
                  🔒
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Login-Based Access
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Securely save and manage projects anytime.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-yellow-500/10 blur-2xl transition-all duration-300 group-hover:bg-yellow-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl shadow-lg">
                  ⚡
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Bulk Generation (Premium)
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Generate multiple screenshots quickly with premium features.
                </p>
              </div>
            </div>
          </div>

          {/* Ideal For */}
          <div className="mt-20">
            <div className="mb-8 flex items-center justify-center">
              <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 backdrop-blur-xl">
                🎯 Ideal For
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "Meme pages",
                "Social media creators",
                "Marketing agencies",
                "Designers and freelancers",
                "Viral content creators",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.05]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-2xl sm:p-12 lg:p-16">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 opacity-60" />

            {/* Content */}
            <div className="relative z-10 text-center">

              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-300 backdrop-blur-xl">
                Final Thoughts
              </div>

              {/* Heading */}
              <h2 className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                The Best Twitter (X) Block Generator Tool Online helps creators
                produce realistic and engaging visuals quickly while simplifying
                content creation workflows.
              </h2>

              {/* Bottom Glow Line */}
              <div className="mx-auto mt-10 h-[4px] w-32 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
            </div>
          </div>
        </div>
      </section>



      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-xl">
              FAQs
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <div
                  key={i}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30"
                >
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-base font-semibold leading-7 text-white sm:text-lg">
                      {faq.q}
                    </span>

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xl font-medium text-white transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                        }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-400 sm:px-6 sm:text-base">
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
    </div>
  );
}
