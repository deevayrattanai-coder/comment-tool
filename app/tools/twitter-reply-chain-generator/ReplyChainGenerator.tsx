"use client";
import { useState, useRef, useCallback } from "react";
import {
  ReplyChainData,
  ReplyTweet,
  defaultReplyChain,
  newReply,
  formatCount,
  TweetTheme,
} from "@/lib/reply-types";
import { VerifiedBadge } from "@/lib/tweet-types";
import { downloadElement } from "@/lib/download";
import {
  Plus,
  Trash2,
  Upload,
  Download,
  ChevronDown,
  Copy,
  ChevronUp,
} from "lucide-react";
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
      style={{ width: 15, height: 15, fill, display: "inline", marginLeft: 2 }}
    >
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.8 3.91s2.52 1.26 3.91.8C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
  );
}

function renderText(content: string) {
  const parts = content.split(/([@#]\w+|https?:\/\/\S+)/g);
  return parts.map((p, i) =>
    /^[@#]\w+$/.test(p) || /^https?:\/\/\S+$/.test(p) ? (
      <span key={i} style={{ color: "#1D9BF0" }}>
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function ReplyPreview({ data }: { data: ReplyChainData }) {
  const isDark = data.theme !== "light";
  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";
  const text = isDark ? "#e7e9ea" : "#0f1419";
  const sub = isDark ? "#71767b" : "#536471";
  const border =
    data.theme === "dim" ? "#38444d" : isDark ? "#2f3336" : "#eff3f4";

  return (
    <div
      style={{
        backgroundColor: bg,
        width: "100%",
        maxWidth: 560,
        fontFamily: "'Inter', sans-serif",
        padding: "0 16px",
      }}
    >
      {data.tweets.map((tweet, idx) => {
        const isLast = idx === data.tweets.length - 1;
        const avatar = tweet.avatarFile || tweet.avatarUrl;
        return (
          <div
            key={tweet.id}
            style={{ display: "flex", gap: 12, paddingTop: 12 }}
          >
            {/* Left column: avatar + thread line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#1D9BF0",
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}
                  >
                    {getInitials(tweet.displayName || "U")}
                  </span>
                )}
              </div>
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 12,
                    backgroundColor: border,
                    margin: "4px 0",
                  }}
                />
              )}
            </div>

            {/* Right column: content */}
            <div
              style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 16 : 4 }}
            >
              {/* Name row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: text, fontWeight: 700, fontSize: 15 }}>
                  {tweet.displayName || "Display Name"}
                </span>
                <VerifiedSvg type={tweet.verified} />
                <span style={{ color: sub, fontSize: 14 }}>
                  @{tweet.username || "username"}
                </span>
                <span style={{ color: sub, fontSize: 14 }}>· {tweet.time}</span>
              </div>

              {/* Reply label for non-first tweets */}
              {idx > 0 && (
                <div style={{ color: sub, fontSize: 13, marginTop: 1 }}>
                  Replying to{" "}
                  <span style={{ color: "#1D9BF0" }}>
                    @{data.tweets[idx - 1].username || "username"}
                  </span>
                </div>
              )}

              {/* Tweet text */}
              <div
                style={{
                  color: text,
                  fontSize: 15,
                  lineHeight: 1.5,
                  marginTop: 4,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {renderText(tweet.content || "Tweet content...")}
              </div>

              {/* Actions */}
              <div
                style={{ display: "flex", gap: 20, marginTop: 8, color: sub }}
              >
                {[
                  {
                    label: formatCount(tweet.replyCount),
                    path: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z",
                    stroke: true,
                  },
                  {
                    label: formatCount(tweet.retweetCount),
                    svgPath:
                      "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.932 9.48.568 8.02 5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46L19.5 20.12l-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
                    stroke: false,
                  },
                  {
                    label: formatCount(tweet.likeCount),
                    path: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
                    stroke: true,
                  },
                  {
                    label: formatCount(tweet.viewCount),
                    svgPath:
                      "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z",
                    stroke: false,
                  },
                ].map((action, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      style={{
                        width: 16,
                        height: 16,
                        fill: action.stroke ? "none" : "currentColor",
                        stroke: action.stroke ? "currentColor" : "none",
                        strokeWidth: 1.5,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={action.path || action.svgPath}
                      />
                    </svg>
                    <span style={{ fontSize: 12 }}>{action.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TweetEditor({
  tweet,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  tweet: ReplyTweet;
  index: number;
  total: number;
  onChange: (t: ReplyTweet) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const avatarRef = useRef<HTMLInputElement>(null);
  const up = (patch: Partial<ReplyTweet>) => onChange({ ...tweet, ...patch });

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => up({ avatarFile: ev.target?.result as string });
    r.readAsDataURL(file);
  };

  const label = index === 0 ? "Original Tweet" : `Reply ${index}`;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-muted/40 px-3 py-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1 rounded hover:bg-accent disabled:opacity-30"
            data-testid={`btn-up-${index}`}
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1 rounded hover:bg-accent disabled:opacity-30"
            data-testid={`btn-down-${index}`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {total > 1 && (
            <button
              onClick={onRemove}
              className="p-1 rounded hover:bg-destructive/10 text-destructive"
              data-testid={`btn-remove-${index}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3 space-y-2">
        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center overflow-hidden cursor-pointer border border-border"
            onClick={() => avatarRef.current?.click()}
          >
            {tweet.avatarFile || tweet.avatarUrl ? (
              <img
                src={tweet.avatarFile || tweet.avatarUrl}
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
          <div className="flex-1 grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Display name"
              value={tweet.displayName}
              onChange={(e) => up({ displayName: e.target.value })}
              className={inputClass}
              data-testid={`input-name-${index}`}
            />
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                @
              </span>
              <input
                type="text"
                placeholder="username"
                value={tweet.username}
                onChange={(e) =>
                  up({ username: e.target.value.replace(/^@/, "") })
                }
                className={`${inputClass} pl-6`}
                data-testid={`input-user-${index}`}
              />
            </div>
          </div>
        </div>

        {/* Avatar URL */}
        <input
          type="url"
          placeholder="Avatar URL (optional)"
          value={tweet.avatarUrl}
          onChange={(e) => up({ avatarUrl: e.target.value, avatarFile: null })}
          className={inputClass}
          data-testid={`input-avatar-url-${index}`}
        />

        {/* Verified */}
        <div className="flex gap-1">
          {(["none", "blue", "gold", "government"] as VerifiedBadge[]).map(
            (b) => (
              <button
                key={b}
                onClick={() => up({ verified: b })}
                className={`flex-1 py-1 rounded text-[10px] font-medium border transition-all ${tweet.verified === b ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
              >
                {b === "none"
                  ? "—"
                  : b === "blue"
                    ? "🔵"
                    : b === "gold"
                      ? "🟡"
                      : "🏛️"}
              </button>
            ),
          )}
        </div>

        {/* Content */}
        <textarea
          rows={2}
          placeholder="Tweet content..."
          value={tweet.content}
          onChange={(e) => up({ content: e.target.value })}
          className={`${inputClass} resize-none`}
          data-testid={`input-content-${index}`}
        />

        {/* Time + stats */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelClass}>Time</label>
            <input
              type="text"
              value={tweet.time}
              onChange={(e) => up({ time: e.target.value })}
              className={inputClass}
              data-testid={`input-time-${index}`}
            />
          </div>
          <div>
            <label className={labelClass}>Likes</label>
            <input
              type="number"
              min={0}
              value={tweet.likeCount}
              onChange={(e) => up({ likeCount: +e.target.value })}
              className={inputClass}
              data-testid={`input-likes-${index}`}
            />
          </div>
          <div>
            <label className={labelClass}>Replies</label>
            <input
              type="number"
              min={0}
              value={tweet.replyCount}
              onChange={(e) => up({ replyCount: +e.target.value })}
              className={inputClass}
              data-testid={`input-replies-${index}`}
            />
          </div>
          <div>
            <label className={labelClass}>Reposts</label>
            <input
              type="number"
              min={0}
              value={tweet.retweetCount}
              onChange={(e) => up({ retweetCount: +e.target.value })}
              className={inputClass}
              data-testid={`input-retweets-${index}`}
            />
          </div>
        </div>
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

export default function ReplyChain() {
  const [data, setData] = useState<ReplyChainData>(defaultReplyChain);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const bg =
    data.theme === "dark" ? "#000" : data.theme === "dim" ? "#15202b" : "#fff";

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      await downloadElement(previewRef.current, bg, "reply-chain");
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

  const updateTweet = (idx: number, t: ReplyTweet) => {
    const tweets = [...data.tweets];
    tweets[idx] = t;
    setData({ ...data, tweets });
  };
  const removeTweet = (idx: number) =>
    setData({ ...data, tweets: data.tweets.filter((_, i) => i !== idx) });
  const addTweet = () =>
    setData({ ...data, tweets: [...data.tweets, newReply()] });
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const tweets = [...data.tweets];
    [tweets[idx - 1], tweets[idx]] = [tweets[idx], tweets[idx - 1]];
    setData({ ...data, tweets });
  };
  const moveDown = (idx: number) => {
    if (idx === data.tweets.length - 1) return;
    const tweets = [...data.tweets];
    [tweets[idx], tweets[idx + 1]] = [tweets[idx + 1], tweets[idx]];
    setData({ ...data, tweets });
  };

  return (
    <div className="min-h-screen">
      <div className=" max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-6  flex justify-center itmes-center max-md:flex-col max-md:gap-6">
        {/* Form */}
        <aside className="lg:sticky lg:w-[300px] w-full lg:top-20 lg:self-start bg-card border border-border rounded-l-2xl overflow-hidden">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Reply Chain Builder</h2>
            <span className="text-xs text-muted-foreground">
              {data.tweets.length} tweet{data.tweets.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            <ToolsSection />

            {data.tweets.map((tweet, idx) => (
              <TweetEditor
                key={tweet.id}
                tweet={tweet}
                index={idx}
                total={data.tweets.length}
                onChange={(t) => updateTweet(idx, t)}
                onRemove={() => removeTweet(idx)}
                onMoveUp={() => moveUp(idx)}
                onMoveDown={() => moveDown(idx)}
              />
            ))}

            {data.tweets.length < 6 && (
              <button
                onClick={addTweet}
                data-testid="btn-add-tweet"
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Reply
              </button>
            )}

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
          <div className="w-full flex rounded-tr-2xl items-center justify-between px-4 py-2 border-b border-border bg-card backdrop-blur-sm">
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
              <div
                ref={previewRef}
                style={{ width: "100%", maxWidth: 560 }}
                className="relative"
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <svg
                    viewBox="0 0 33 32"
                    aria-hidden="true"
                    fill="#6B7280"
                    className="r-4qtqp9 w-5 h-5 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd"
                  >
                    <g>
                      <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                    </g>
                  </svg>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#6B7280"
                  >
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </div>
                <ReplyPreview data={data} />
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
