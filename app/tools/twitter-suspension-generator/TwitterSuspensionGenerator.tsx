"use client";
import { useState, useRef, useCallback } from "react";
import {
  SuspensionData,
  defaultSuspensionData,
  SUSPENSION_MESSAGES,
  TweetTheme,
  VerifiedBadge,
} from "@/lib/suspension-types";
// import NavHeader from "@/components/nav-header";
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
      style={{ width: 16, height: 16, fill, display: "inline", marginLeft: 3 }}
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
  const sub = isDark ? "#536471" : "#536471";

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
      }}
    >
      {/* Cover */}
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

      {/* Profile Section */}
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
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {data.displayName || "Display Name"}
          </span>

          <VerifiedSvg type={data.verified} />
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
          @{data.username || "username"}
        </div>
      </div>

      {/* Suspension Section */}
      <div
        style={{
          background: coverBg,
          padding: "70px 40px 90px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: text,
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Account suspended
        </div>

        <div
          style={{
            marginTop: 28,
            color: sub,
            fontSize: 18,
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

export default function SuspensionScreen() {
  const [data, setData] = useState<SuspensionData>(defaultSuspensionData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<number | null>(0);
  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";
  const up = (patch: Partial<SuspensionData>) => setData({ ...data, ...patch });

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
      // ✅ Proceed if logged in
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
    r.onload = (ev) => up({ avatarFile: ev.target?.result as string });
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
      a: "Comment Tools is designed to expand with more tools, platforms, and advanced features for creators.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl mt-5 flex justify-center font-black leading-tight tracking-tight text-white lg:text-5xl">
        <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Best Twitter (X) Suspension Generator Tool Online
        </span>
      </h1>
      <div className="flex-1 max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6">
        {/* Form */}
        <aside className="lg:w-[300px] w-full  bg-card border border-border rounded-l-2xl overflow-hidden">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Suspension Screen Builder</h2>
          </div>
          <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            <ToolsSection />
          </div>

          <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            {/* Theme */}

            <hr className="border-border" />

            {/* Profile */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Account Profile
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden cursor-pointer border border-border"
                    onClick={() => avatarRef.current?.click()}
                  >
                    {data.avatarFile || data.avatarUrl ? (
                      <img
                        src={data.avatarFile || data.avatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-muted-foreground" />
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
                    value={data.avatarUrl}
                    onChange={(e) =>
                      up({ avatarUrl: e.target.value, avatarFile: null })
                    }
                    className={inputClass}
                    data-testid="input-avatar-url"
                  />
                </div>

                <div>
                  <label className={labelClass}>Display Name</label>
                  <input
                    type="text"
                    value={data.displayName}
                    onChange={(e) => up({ displayName: e.target.value })}
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
                      value={data.username}
                      onChange={(e) =>
                        up({ username: e.target.value.replace(/^@/, "") })
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
                        onClick={() => up({ verified: b })}
                        className={`py-1 rounded text-[10px] font-medium border capitalize transition-all ${data.verified === b ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
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
                  <label className={labelClass}>Post Count</label>
                  <input
                    type="text"
                    value={data.tweetCount}
                    onChange={(e) => up({ tweetCount: e.target.value })}
                    className={inputClass}
                    placeholder="1,204"
                    data-testid="input-tweet-count"
                  />
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Suspension reason */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
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

            <div className="flex items-center gap-2 justify-center  ">
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
        </aside>

        {/* Preview */}
        <div className="flex-1 w-full ">
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
            <p className="text-xs text-muted-foreground text-center">
              For entertainment purposes only. Not affiliated with X Corp.
            </p>
          </main>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8">

          <div className="flex justify-center items-center">

            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                  <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                    Best Twitter (X) Suspension Generator Tool Online
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Create Realistic Twitter
                  Suspension Screenshots   </span>
              </h2>

              {/* Description */}
              <p className="mt-8 text-lg leading-8 text-slate-300 sm:text-xl">
                The Best Twitter (X) Suspension Generator Tool Online allows users to
                generate realistic suspension screenshots instantly. Whether you're
                creating memes, mockups, creative visuals, or campaign concepts, this
                tool delivers professional-looking results within seconds.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-400 sm:text-xl">
                Built for creators, agencies, and marketers, it closely matches the
                interface of X for maximum realism.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                  Why Use a Twitter Suspension Generator?
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Suspension-style mockups are widely used in creative content,
              meme culture, and campaign visuals.
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
              Therefore, having a realistic generator helps creators produce
              engaging content quickly.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all duration-300 group-hover:bg-purple-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl shadow-lg">
                  ⚡
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Generate realistic suspension screenshots
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition-all duration-300 group-hover:bg-pink-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                  ✏️
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Customize usernames and profile details
                </h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-lg">
                  😂
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Create meme-style visuals faster
                </h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition-all duration-300 group-hover:bg-green-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl shadow-lg">
                  🚀
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Improve campaign creativity
                </h3>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-yellow-500/10 blur-2xl transition-all duration-300 group-hover:bg-yellow-500/20" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl shadow-lg">
                  ⏱️
                </div>

                <h3 className="text-xl font-bold leading-8 text-white">
                  Save editing time
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                  Key Features
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Designed for creators, agencies, and campaigns
            </h2>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all duration-300 group-hover:bg-purple-500/20" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl shadow-lg">
                  ✔
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Realistic Suspension UI
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Generate suspension screenshots that look authentic and clean.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition-all duration-300 group-hover:bg-pink-500/20" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                  ✏️
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Full Customization
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Customize usernames, handles, profile images, and messages easily.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-lg">
                  📥
                </div>

                <h3 className="text-2xl font-bold text-white">
                  High-Quality Export
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Download HD screenshots optimized for social media and
                  presentations.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition-all duration-300 group-hover:bg-green-500/20" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-2xl shadow-lg">
                  🔒
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Secure Login-Based Access
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Login is required to save and manage projects securely.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/40">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-yellow-500/10 blur-2xl transition-all duration-300 group-hover:bg-yellow-500/20" />

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl shadow-lg">
                  ⚡
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Fast & Easy Workflow
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Create suspension mockups within seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Best For */}
          <div className="mt-24">

            <div className="mb-8 flex justify-center">
              <div className="inline-flex overflow-hidden rounded-full border border-blue-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

                  <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                    🎯 Best For
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "Meme creators",
                "Content creators",
                "Social media marketers",
                "Agencies and designers",
                "Digital campaigns",
              ].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.05]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="relative z-10">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-2xl sm:p-12 lg:p-16">

            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 opacity-70" />

            {/* Decorative Blur */}
            <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 text-center">

              {/* Badge */}
              <div className="mb-6 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                  <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                    Final Thoughts
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h2 className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                If you're searching for the Best Twitter (X) Suspension Generator
                Tool Online, Comment Tools provides a fast, realistic, and highly
                customizable solution for creators and agencies.
              </h2>

              {/* Bottom Line */}
              <div className="mx-auto mt-10 h-[4px] w-32 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
            </div>
          </div>
        </div>
      </section>



      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-14 text-center">

            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
                  FAQs
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion */}
          <div className="space-y-5">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${isOpen
                    ? "border-purple-500/40 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.03] hover:border-purple-500/30"
                    } backdrop-blur-2xl`}
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                  />

                  {/* Question */}
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    className="relative z-10 flex w-full items-center justify-between gap-5 px-6 py-6 text-left sm:px-8"
                  >
                    <div className="flex items-start gap-4">

                      {/* Number */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white shadow-lg">
                        0{i + 1}
                      </div>

                      {/* Question */}
                      <span className="text-base font-semibold leading-7 text-white sm:text-lg">
                        {faq.q}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl font-light text-white transition-all duration-300 ${isOpen
                        ? "rotate-45 border-purple-500/40 bg-purple-500/10"
                        : ""
                        }`}
                    >
                      +
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative z-10 border-t border-white/5 px-6 pb-6 pt-5 sm:px-8">
                        <p className="max-w-3xl text-sm leading-8 text-slate-400 sm:text-base">
                          {faq.a}
                        </p>
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
