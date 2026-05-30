"use client";
import { useRef, useState } from "react";
import { TweetData, VerifiedBadge } from "@/lib/tweet-types";
import {
  Upload,
  X,
  ImagePlus,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Eye,
} from "lucide-react";
import ToolsSection from "./ToolsSection";

interface TweetFormProps {
  tweetData: TweetData;
  onChange: (data: TweetData) => void;
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

export default function TweetForm({ tweetData, onChange }: TweetFormProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<TweetData>) =>
    onChange({ ...tweetData, ...patch });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ avatarFile: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ mediaFile: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const [showVerifiedDropdown, setShowVerifiedDropdown] = useState(false);

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
    <div className="lg:w-[300px] w-full lg:h-[400px] h-auto flex-shrink-0 bg-sidebar-bg flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold">Customize Tweet</h2>
        </div>
        <div className="p-4">
          {/* PROFILE */}

          <section>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center my-2">
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
                      <VerifiedIcon type={tweetData.verified} />
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
                              update({ verified: badge });
                              setShowVerifiedDropdown(false);
                            }}
                            className={`
            flex h-9 w-9 items-center justify-center
            rounded-xl transition-all duration-200
            ${tweetData.verified === badge
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
                  placeholder="Elon Musk"
                  value={tweetData.displayName}
                  onChange={(e) => update({ displayName: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="my-2">
                <label className={`${labelClass} my-2`}>
                  Username (without @)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    placeholder="username"
                    value={tweetData.username}
                    onChange={(e) =>
                      update({ username: e.target.value.replace(/^@/, "") })
                    }
                    className={`${inputClass} pl-7`}
                  />
                  <Upload
                    onClick={() => avatarInputRef.current?.click()}
                    size={11}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted cursor-pointer hover:text-sidebar-text"
                  />
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* TWEET CONTENT */}
          <section className="my-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tweet Content
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex gap-2 items-center">
                    <label className={labelClass} style={{ marginBottom: 0 }}>
                      Tweet Text
                    </label>
                    <div className="relative group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-question-mark w-4 h-4 cursor-help text-gray-500"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      <div className="absolute ml-5 left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 bg-gray-800 text-gray-200 border border-white/10">
                        Use @mentions, #hashtags, or <br />
                        URLs — they'll appear highlighted
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs ${tweetData.content.length > 280 ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {tweetData.content.length}/280
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder="What's happening?!"
                  value={tweetData.content}
                  onChange={(e) => update({ content: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                {tweetData.mediaFile || tweetData.mediaUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img
                      src={tweetData.mediaFile || tweetData.mediaUrl || ""}
                      alt="media preview"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => update({ mediaFile: null, mediaUrl: null })}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => mediaInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <ImagePlus className="w-4 h-4" /> Drag and drop or <br />{" "}
                      click here to add image
                    </button>
                  </div>
                )}
                <input
                  ref={mediaInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMediaUpload}
                />
              </div>
            </div>
          </section>

          {/* DATE & TIME */}
          <section className="my-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Date & Time
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Time</label>
                <input
                  type="text"
                  placeholder="3:45 PM"
                  value={tweetData.time}
                  onChange={(e) => update({ time: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="text"
                  placeholder="Jan 1, 2025"
                  value={tweetData.date}
                  onChange={(e) => update({ date: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* ENGAGEMENT */}
          <section className="my-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Engagement Counts
            </h3>
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                <Eye size={11} className="text-sidebar-text-muted" />
                <input
                  type="text"
                  value={tweetData.viewCount}
                  onChange={(e) =>
                    update({ viewCount: e.target.value.replace(/[^0-9]/g, "") })
                  }
                  className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                />
              </div>

              <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                <Heart size={11} className="text-pink-400" />
                <input
                  type="text"
                  value={tweetData.likeCount}
                  onChange={(e) =>
                    update({ likeCount: e.target.value.replace(/[^0-9]/g, "") })
                  }
                  className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                />
              </div>

              <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                <Repeat2 size={11} className="text-sidebar-text-muted" />
                <input
                  type="text"
                  value={tweetData.retweetCount}
                  onChange={(e) =>
                    update({
                      retweetCount: e.target.value.replace(/[^0-9]/g, ""),
                    })
                  }
                  className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                />
              </div>

              <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                <MessageCircle size={11} className="text-sidebar-text-muted" />
                <input
                  type="text"
                  value={tweetData.replyCount}
                  onChange={(e) =>
                    update({ replyCount: e.target.value.replace(/[^0-9]/g, "") })
                  }
                  className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                />
              </div>

              <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                <Bookmark size={11} className="text-sidebar-text-muted" />
                <input
                  type="text"
                  value={tweetData.bookmarkCount}
                  onChange={(e) =>
                    update({
                      bookmarkCount: e.target.value.replace(/[^0-9]/g, ""),
                    })
                  }
                  className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
