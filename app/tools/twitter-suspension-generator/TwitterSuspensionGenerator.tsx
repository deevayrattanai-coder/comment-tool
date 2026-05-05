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
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";
  const text = isDark ? "#e7e9ea" : "#0f1419";
  const sub = isDark ? "#71767b" : "#536471";
  const border =
    data.theme === "dim" ? "#38444d" : isDark ? "#2f3336" : "#eff3f4";
  const avatar = data.avatarFile || data.avatarUrl;

  const message =
    data.reason === "custom"
      ? data.customMessage
      : SUSPENSION_MESSAGES[data.reason];

  return (
    <div
      style={{
        backgroundColor: bg,
        fontFamily: "'Inter', -apple-system, sans-serif",
        width: "100%",
        maxWidth: "560px",
      }}
    >
      {/* Minimal profile header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: `1px solid ${border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#536471",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
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
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>
              {getInitials(data.displayName || "U")}
            </span>
          )}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: text, fontWeight: 700, fontSize: 14 }}>
              {data.displayName || "Display Name"}
            </span>
            <VerifiedSvg type={data.verified} />
          </div>
          <span style={{ color: sub, fontSize: 12 }}>
            @{data.username || "username"}
          </span>
        </div>
        {/* X logo */}
        <div style={{ marginLeft: "auto", color: text }}>
          <svg
            viewBox="0 0 24 24"
            style={{ width: 22, height: 22, fill: "currentColor" }}
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.625zM17.083 19.77h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>

      {/* Gray profile strip (greyed out) */}
      <div
        style={{
          height: 90,
          backgroundColor: isDark ? "#1a1a1a" : "#e7e9ea",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -36,
            left: 16,
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: `4px solid ${bg}`,
            backgroundColor: "#536471",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
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
                filter: "grayscale(60%)",
              }}
            />
          ) : (
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>
              {getInitials(data.displayName || "U")}
            </span>
          )}
        </div>
      </div>

      {/* Profile info below grey strip */}
      <div style={{ padding: "44px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: text, fontWeight: 700, fontSize: 18 }}>
            {data.displayName || "Display Name"}
          </span>
          <VerifiedSvg type={data.verified} />
        </div>
        <div style={{ color: sub, fontSize: 14 }}>
          @{data.username || "username"}
        </div>
        <div style={{ color: sub, fontSize: 13, marginTop: 4 }}>
          {data.tweetCount} posts
        </div>
      </div>

      {/* Suspension notice */}
      <div
        style={{
          margin: "0 16px 20px",
          borderRadius: 12,
          padding: "24px 20px",
          textAlign: "center",
        }}
      >
        {/* Warning icon */}

        <div
          style={{
            color: text,
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 8,
          }}
        >
          Account suspended
        </div>
        <div
          style={{ color: sub, fontSize: 14, lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{
            __html:
              message ||
              `Twitter suspends accounts which violate the 
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

  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";
  const up = (patch: Partial<SuspensionData>) => setData({ ...data, ...patch });

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      await downloadElement(previewRef.current, bg, "twitter-suspension");
      toast.success("Image downloaded!");
    } finally {
      setDownloading(false);
    }
  }, [bg]);

  const copyImage = useCallback(async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2,
    });
    canvas.toBlob(async (blob) => {
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      }
    });
    toast.success("Image copied to clipboard!");
  }, [bg]);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => up({ avatarFile: ev.target?.result as string });
    r.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6">
        {/* Form */}
        <aside className="lg:sticky lg:w-[300px] w-full lg:top-20 lg:self-start bg-card border border-border rounded-l-2xl overflow-hidden">
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
        <div className="lg:w-[700px] w-full lg:sticky lg:top-20 lg:self-start">
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
    </div>
  );
}
