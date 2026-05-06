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
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";
  const text = isDark ? "#e7e9ea" : "#0f1419";
  const sub = isDark ? "#71767b" : "#536471";
  const border =
    data.theme === "dim" ? "#38444d" : isDark ? "#2f3336" : "#eff3f4";
  const btnBorder = isDark ? "#536471" : "#cfd9de";
  const avatar = data.blockerAvatarFile || data.blockerAvatarUrl;

  return (
    <div
      style={{
        backgroundColor: bg,
        fontFamily: "'Inter', -apple-system, sans-serif",
        width: "100%",
        maxWidth: 560,
        overflow: "hidden",
      }}
    >
      {/* Cover photo */}
      <div
        style={{
          height: 30,
          backgroundColor: data.coverColor,
          position: "relative",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.15))",
          }}
        />
      </div>

      {/* Profile section */}
      <div style={{ padding: "0 16px" }}>
        {/* Avatar row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: -46,
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              overflow: "hidden",
              border: `4px solid ${bg}`,
              backgroundColor: "#1D9BF0",
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
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 28 }}>
                {getInitials(data.blockerDisplayName || "U")}
              </span>
            )}
          </div>

          {/* Blocked button */}
          <button
            style={{
              marginBottom: 8,
              border: `1px solid ${btnBorder}`,
              borderRadius: 20,
              padding: "6px 16px",
              backgroundColor: "transparent",
              color: text,
              fontSize: 14,
              fontWeight: 700,
              cursor: "default",
            }}
          >
            Blocked
          </button>
        </div>

        {/* Name */}
        <div style={{ marginTop: 6 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: text, fontWeight: 700, fontSize: 18 }}>
              {data.blockerDisplayName || "Display Name"}
            </span>
            <VerifiedSvg type={data.blockerVerified} />
          </div>
          <div style={{ color: sub, fontSize: 14, marginTop: 1 }}>
            @{data.blockerUsername || "username"}
          </div>
        </div>

        {/* Bio */}
        {data.blockerBio && (
          <div
            style={{
              color: text,
              fontSize: 14,
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            {data.blockerBio}
          </div>
        )}

        {/* Following / Followers */}
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          <span style={{ color: sub, fontSize: 14 }}>
            <span style={{ color: text, fontWeight: 700 }}>
              {formatNum(data.blockerFollowing)}
            </span>{" "}
            Following
          </span>
          <span style={{ color: sub, fontSize: 14 }}>
            <span style={{ color: text, fontWeight: 700 }}>
              {formatNum(data.blockerFollowers)}
            </span>{" "}
            Followers
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: border, margin: "16px 0" }} />

        {/* Block notice box */}
        <div
          style={{
            border: `1px solid ${border}`,
            borderRadius: 12,
            padding: "20px 16px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {/* Lock icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{ width: 28, height: 28, fill: text }}
            >
              <path d="M17 10V7A5 5 0 0 0 7 7v3H5v12h14V10h-2zM9 7a3 3 0 1 1 6 0v3H9V7zm3 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </div>
          <div
            style={{
              color: text,
              fontWeight: 700,
              fontSize: 19,
              marginBottom: 4,
            }}
          >
            You're blocked
          </div>
          <div style={{ color: sub, fontSize: 14, lineHeight: 1.6 }}>
            You can't follow or see @{data.blockerUsername || "username"}'s
            posts.{" "}
            {data.viewerUsername &&
              data.viewerUsername !== "you" &&
              `@${data.viewerUsername} `}
            <span style={{ color: "#1D9BF0", cursor: "pointer" }}>
              Learn more
            </span>
          </div>
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

  return (
    <div className="min-h-screen">
      <div className=" max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6">
        {/* Form */}
        <aside className="lg:sticky lg:w-[300px] w-full lg:top-20 lg:self-start bg-card border border-border rounded-tl-2xl overflow-hidden">
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
        <div className="lg:w-[700px] w-full lg:sticky lg:top-20 lg:self-start ">
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
    </div>
  );
}
