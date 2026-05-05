import { useRef } from "react";
import { TweetData, TweetTheme, VerifiedBadge } from "@/lib/tweet-types";
import { Upload, X, ImagePlus } from "lucide-react";
import ToolsSection from "./ToolsSection";

interface TweetFormProps {
  tweetData: TweetData;
  onChange: (data: TweetData) => void;
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function NumberInput({
  label,
  value,
  testId,
  onChange,
}: {
  label: string;
  value: number;
  testId: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className={inputClass}
        data-testid={testId}
      />
    </div>
  );
}

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

  return (
    <div className="lg:w-[300px] w-full">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Customize Tweet</h2>
      </div>
      <div className="p-4 space-y-5 max-h-[calc(100vh-140px)] overflow-y-auto">
        {/* PROFILE */}

        <ToolsSection />
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Profile
          </h3>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Profile Picture</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center overflow-hidden cursor-pointer border-2 border-border hover:border-primary transition-colors"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  {tweetData.avatarFile || tweetData.avatarUrl ? (
                    <img
                      src={tweetData.avatarFile || tweetData.avatarUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="text-xs text-primary hover:underline"
                  >
                    Upload photo
                  </button>
                  {(tweetData.avatarFile || tweetData.avatarUrl) && (
                    <button
                      onClick={() =>
                        update({ avatarFile: null, avatarUrl: "" })
                      }
                      className="block text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Or paste URL below
                  </p>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={tweetData.avatarUrl}
                    onChange={(e) =>
                      update({ avatarUrl: e.target.value, avatarFile: null })
                    }
                    className={inputClass}
                  />
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Display Name</label>
              <input
                type="text"
                placeholder="Elon Musk"
                value={tweetData.displayName}
                onChange={(e) => update({ displayName: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Username (without @)</label>
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
              </div>
            </div>

            <div>
              <label className={labelClass}>Verified Badge</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  ["none", "blue", "gold", "government"] as VerifiedBadge[]
                ).map((badge) => (
                  <button
                    key={badge}
                    onClick={() => update({ verified: badge })}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                      tweetData.verified === badge
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {badge === "none"
                      ? "None"
                      : badge === "blue"
                        ? "🔵"
                        : badge === "gold"
                          ? "🟡"
                          : "🏛️"}
                    <span className="block text-[10px] mt-0.5">{badge}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TWEET CONTENT */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Tweet Content
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={labelClass} style={{ marginBottom: 0 }}>
                  Tweet Text
                </label>
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
              <p className="text-xs text-muted-foreground mt-1">
                Use @mentions, #hashtags, or URLs — they'll appear highlighted
              </p>
            </div>

            <div>
              <label className={labelClass}>Media Image (optional)</label>
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
                    <ImagePlus className="w-4 h-4" /> Upload image
                  </button>
                  <input
                    type="url"
                    placeholder="Or paste image URL..."
                    value={tweetData.mediaUrl || ""}
                    onChange={(e) =>
                      update({ mediaUrl: e.target.value || null })
                    }
                    className={inputClass}
                  />
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
        <section>
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
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Engagement Counts
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <NumberInput
              label="Views"
              value={tweetData.viewCount}
              testId="input-view-count"
              onChange={(v) => update({ viewCount: v })}
            />
            <NumberInput
              label="Likes"
              value={tweetData.likeCount}
              testId="input-like-count"
              onChange={(v) => update({ likeCount: v })}
            />
            <NumberInput
              label="Reposts"
              value={tweetData.retweetCount}
              testId="input-retweet-count"
              onChange={(v) => update({ retweetCount: v })}
            />
            <NumberInput
              label="Replies"
              value={tweetData.replyCount}
              testId="input-reply-count"
              onChange={(v) => update({ replyCount: v })}
            />
            <NumberInput
              label="Bookmarks"
              value={tweetData.bookmarkCount}
              testId="input-bookmark-count"
              onChange={(v) => update({ bookmarkCount: v })}
            />
          </div>
        </section>

        {/* OPTIONS */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Options
          </h3>
          <div className="space-y-3">
            {[
              { label: "Show Metrics Bar", key: "showMetrics" as const },
              { label: "Show Source App", key: "showSource" as const },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-foreground">{label}</label>
                <button
                  role="switch"
                  aria-checked={tweetData[key] as boolean}
                  onClick={() => update({ [key]: !tweetData[key] })}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${tweetData[key] ? "bg-primary" : "bg-muted"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${tweetData[key] ? "translate-x-4" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            ))}
            {tweetData.showSource && (
              <div>
                <label className={labelClass}>Source App</label>
                <input
                  type="text"
                  placeholder="Twitter for iPhone"
                  value={tweetData.sourceApp}
                  onChange={(e) => update({ sourceApp: e.target.value })}
                  className={inputClass}
                />
              </div>
            )}
          </div>
        </section>

        {/* THEME */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Tweet Theme
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "dim", "dark"] as TweetTheme[]).map((theme) => {
              const bg =
                theme === "dark"
                  ? "#000"
                  : theme === "dim"
                    ? "#15202b"
                    : "#fff";
              const text = theme === "light" ? "#0f1419" : "#e7e9ea";
              const border =
                theme === "light"
                  ? "#eff3f4"
                  : theme === "dim"
                    ? "#38444d"
                    : "#2f3336";
              return (
                <button
                  key={theme}
                  onClick={() => update({ theme })}
                  className={`relative rounded-xl p-3 border-2 transition-all ${tweetData.theme === theme ? "border-primary" : "border-border"}`}
                  style={{ backgroundColor: bg }}
                >
                  <div className="space-y-1">
                    <div className="flex gap-1 items-center">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: text, opacity: 0.8 }}
                      />
                      <div
                        className="h-2 w-10 rounded"
                        style={{ backgroundColor: text, opacity: 0.7 }}
                      />
                    </div>
                    <div
                      className="h-1.5 w-full rounded"
                      style={{ backgroundColor: text, opacity: 0.4 }}
                    />
                    <div
                      className="h-1.5 w-2/3 rounded"
                      style={{ backgroundColor: text, opacity: 0.4 }}
                    />
                    <div
                      className="h-px mt-1"
                      style={{ backgroundColor: border }}
                    />
                  </div>
                  <span
                    className="block text-xs font-medium mt-2 capitalize"
                    style={{ color: text }}
                  >
                    {theme}
                  </span>
                  {tweetData.theme === theme && (
                    <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-primary flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-2 h-2 fill-white">
                        <path
                          d="M10 3L5 8.5 2 5.5"
                          stroke="white"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
