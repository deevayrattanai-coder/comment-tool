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
  Heart,
  Reply,
  Repeat2,
  Clock,
} from "lucide-react";

import ToolsSection from "@/components/ToolsSection";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition";

const labelClass =
  "block text-xs font-medium text-muted-foreground mb-1";

const faqs = [
  {
    q: "Is login required?",
    a: "Yes, this tool requires secure account login.",
  },
  {
    q: "Can I create multiple replies?",
    a: "Yes, you can generate full conversation threads and reply chains.",
  },
  {
    q: "Does premium include bulk generation?",
    a: "Absolutely. Premium users can generate replies in bulk.",
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
    type === "gold"
      ? "#F7BA2A"
      : type === "government"
        ? "#829AAB"
        : "#1D9BF0";

  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: 15,
        height: 15,
        fill,
        display: "inline",
        marginLeft: 2,
      }}
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
    data.theme === "dark"
      ? "#000"
      : data.theme === "dim"
        ? "#15202b"
        : "#fff";

  const text = isDark ? "#e7e9ea" : "#0f1419";

  const sub = isDark ? "#71767b" : "#536471";

  const border =
    data.theme === "dim"
      ? "#38444d"
      : isDark
        ? "#2f3336"
        : "#eff3f4";

  return (
    <div
      style={{
        backgroundColor: bg,
        width: "100%",
        maxWidth: 560,
        fontFamily: "'Inter', sans-serif",
        padding: "0 16px",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {data.tweets.map((tweet, idx) => {
        const isLast = idx === data.tweets.length - 1;
        const avatar = tweet.avatarFile || tweet.avatarUrl;

        return (
          <div
            key={tweet.id}
            style={{
              display: "flex",
              gap: 12,
              paddingTop: 12,
            }}
          >
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
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  overflow: "hidden",
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
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

            <div
              style={{
                flex: 1,
                minWidth: 0,
                paddingBottom: isLast ? 16 : 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: text,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {tweet.displayName || "Display Name"}
                </span>

                <VerifiedSvg type={tweet.verified} />

                <span style={{ color: sub, fontSize: 12 }}>
                  @{tweet.username || "username"}
                </span>

                <span style={{ color: sub, fontSize: 12 }}>
                  · {tweet.time} {tweet.timeUnit}
                </span>
              </div>

              {idx > 0 && (
                <div
                  style={{
                    color: sub,
                    fontSize: 12,
                    marginTop: 1,
                  }}
                >
                  Replying to{" "}
                  <span style={{ color: "#1D9BF0" }}>
                    @{data.tweets[idx - 1].username || "username"}
                  </span>
                </div>
              )}

              <div
                style={{
                  color: text,
                  fontSize: 12,
                  lineHeight: 1.5,
                  marginTop: 4,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {renderText(tweet.content || "Tweet content...")}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 20,
                  marginTop: 8,
                  color: sub,
                }}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
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

                    <span style={{ fontSize: 12 }}>
                      {action.label}
                    </span>
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
  const [showVerifiedDropdown, setShowVerifiedDropdown] = useState(false);
  const up = (patch: Partial<ReplyTweet>) =>
    onChange({ ...tweet, ...patch });

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const r = new FileReader();

    r.onload = (ev) =>
      up({ avatarFile: ev.target?.result as string });

    r.readAsDataURL(file);
  };

  const label =
    index === 0 ? "Original Tweet" : `Reply ${index}`;

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
    <div className="rounded-2xl border border-border bg-card overflow-hidden my-4">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1 rounded-lg hover:bg-accent disabled:opacity-30"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <button
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1 rounded-lg hover:bg-accent disabled:opacity-30"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {total > 1 && (
            <button
              onClick={onRemove}
              className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between my-2 items-center">
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
                  <VerifiedIcon type={tweet.verified} />
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
                 ${tweet.verified === badge
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
              placeholder="Display name"
              value={tweet.displayName}
              onChange={(e) =>
                up({ displayName: e.target.value })
              }
              className={inputClass}
            />
            <label className={`${labelClass} my-2`}>
              Username (without @)
            </label>
            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                @
              </span>
              <input
                type="text"
                placeholder="username"
                value={tweet.username}
                onChange={(e) =>
                  up({
                    username: e.target.value.replace(/^@/, ""),
                  })
                }
                className={`${inputClass} pl-7`}
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


        <textarea
          rows={3}
          placeholder="Tweet content..."
          value={tweet.content}
          onChange={(e) => up({ content: e.target.value })}
          className={`${inputClass} resize-none`}
        />

        <div className="flex items-center flex-wrap gap-4">

          <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
            <Clock size={11} className="text-sidebar-text-muted" />
            <input
              type="text"
              value={tweet.time}
              onChange={(e) => up({ time: e.target.value })}
              className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
            />
            <select
              value={tweet.timeUnit}
              onChange={(e) => up({ timeUnit: e.target.value })}
              className="bg-transparent text-sidebar-text-muted text-[10px] cursor-pointer"
            >
              <option value="hrs">hrs</option>
              <option value="days">days</option>
              <option value="wks">wks</option>
              <option value="months">months</option>
            </select>
          </div>

          <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
            <Heart size={11} className="text-pink-400" />
            <input
              type="text"
              value={tweet.likeCount}
              onChange={(e) =>
                up({ likeCount: e.target.value.replace(/[^0-9]/g, "") })
              }
              className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
            />
          </div>

          <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
            <Reply size={11} className="text-sidebar-text-muted" />
            <input
              type="text"
              value={tweet.replyCount}
              onChange={(e) =>
                up({ replyCount: e.target.value.replace(/[^0-9]/g, "") })
              }
              className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
            />
          </div>


          <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
            <Repeat2 size={11} className="text-sidebar-text-muted" />
            <input
              type="text"
              value={tweet.retweetCount}
              onChange={(e) =>
                up({
                  retweetCount: e.target.value.replace(/[^0-9]/g, ""),
                })
              }
              className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
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
      {(["light", "dim", "dark"] as TweetTheme[]).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-xl border px-3 py-2 text-xs font-semibold capitalize transition ${value === t
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border"
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default function ReplyChain() {
  const [data, setData] =
    useState<ReplyChainData>(defaultReplyChain);

  const previewRef = useRef<HTMLDivElement>(null);

  const [downloading, setDownloading] = useState(false);

  const [active, setActive] = useState<number | null>(0);

  const bg =
    data.theme === "dark"
      ? "#000"
      : data.theme === "dim"
        ? "#15202b"
        : "#fff";

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;

    setDownloading(true);

    try {
      const res = await fetch("/api/auth/me");

      const data = await res.json();

      if (!data.user) {
        toast.error("Please login to download");
        return;
      }

      await downloadElement(
        previewRef.current,
        bg,
        "reply-chain",
      );

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

      const html2canvas =
        (await import("html2canvas")).default;

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);

          toast.success("Image copied!");
        }
      });
    } catch {
      toast.error("Copy failed");
    }
  }, []);

  const updateTweet = (idx: number, t: ReplyTweet) => {
    const tweets = [...data.tweets];

    tweets[idx] = t;

    setData({ ...data, tweets });
  };

  const removeTweet = (idx: number) =>
    setData({
      ...data,
      tweets: data.tweets.filter((_, i) => i !== idx),
    });

  const addTweet = () =>
    setData({
      ...data,
      tweets: [...data.tweets, newReply()],
    });

  const moveUp = (idx: number) => {
    if (idx === 0) return;

    const tweets = [...data.tweets];

    [tweets[idx - 1], tweets[idx]] = [
      tweets[idx],
      tweets[idx - 1],
    ];

    setData({ ...data, tweets });
  };

  const moveDown = (idx: number) => {
    if (idx === data.tweets.length - 1) return;

    const tweets = [...data.tweets];

    [tweets[idx], tweets[idx + 1]] = [
      tweets[idx + 1],
      tweets[idx],
    ];

    setData({ ...data, tweets });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-background">


        <div className="max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6  flex justify-center itmes-stretch max-md:flex-col max-md:gap-6">
          {/* Form */}
          <aside className="lg:w-[300px] lg:h-[480px] h-auto w-full flex-shrink-0 bg-sidebar-bg flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="border-b border-border px-4 py-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Reply Chain Builder</h2>
                <span className="text-xs text-muted-foreground">
                  {data.tweets.length} tweet{data.tweets.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="p-4">

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
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center p-4 ">
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
          <div className="flex flex-col flex-1 w-full lg:h-[480px] overflow-y-auto scrollbar-thin">
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
            <main className="flex flex-col items-center gap-4 ">
              <div
                className={`w-full rounded-tb-2xl p-6 py-24 flex items-center justify-center transition-colors duration-300 bg-gray-200 dark-grid-dots`}
              >
                <div
                  ref={previewRef}
                  style={{ width: "100%", maxWidth: 460 }}
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
            </main>
          </div>
        </div>
      </section>
      {/* HERO */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">



        <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight text-center">
            Best Tweet Reply Generator Tool Online
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            The <b><i className="underline">Best Tweet Reply Generator Tool Online</i></b> helps you create realistic reply chains and conversation threads for X instantly. Whether you're designing campaign visuals, engagement mockups, or creative content, this tool simplifies the entire process.
          </p>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            Creators, agencies, and marketers use it to build authentic-looking social media interactions quickly and professionally.

          </p>


        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-6 py-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why Use It
          </span>

          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
            Why Use a Tweet Reply Generator?
          </h2>

          <p className="mt-5 text-muted-foreground leading-relaxed">
            Realistic engagement visuals help improve campaign presentation,
            social proof, and content previews for brands and creators.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {[
              "Create realistic reply chains instantly",
              "Save hours of manual editing",
              "Improve campaign visuals",
              "Generate viral-looking conversations",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1100px] mx-auto px-6 py-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>

          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
            Key Features
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: "💬",
                title: "Realistic Reply Threads",
              },
              {
                icon: "⚙️",
                title: "Advanced Customization",
              },
              {
                icon: "⚡",
                title: "Bulk Generation",
              },
              {
                icon: "🖼️",
                title: "High Quality Export",
              },
              {
                icon: "🔐",
                title: "Secure Login Access",
              },
              {
                icon: "🚀",
                title: "Built For Creators",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition"
              >
                <div className="text-2xl mb-3">
                  {feature.icon}
                </div>

                <h3 className="font-semibold text-lg">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <span className="inline-flex items-center px-3 py-1 text-base font-semibold uppercase tracking-widest text-primary">
            Final Thoughts
          </span>

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            The <b><i className="underline">Best Tweet Reply Generator Tool Online</i></b> helps creators and agencies produce professional-looking conversation threads faster and more efficiently. Additionally, Comment Tools continues expanding with more tools and platform support for modern creators.
            .
          </p>
        </div>
      </section>


      {/* FAQ */}
      <section className="bg-background">
        <div className="max-w-[900px] mx-auto px-6 py-16">
          <div className="text-center">
            <span className="text-base font-semibold uppercase tracking-widest text-primary">
              FAQ
            </span>

            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = active === i;

              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActive(isOpen ? null : i)
                    }
                    className="w-full flex items-center justify-between px-5 py-5 text-left"
                  >
                    <span className="font-semibold">
                      {faq.q}
                    </span>

                    <span className="text-xl">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-5 py-5 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />

                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}