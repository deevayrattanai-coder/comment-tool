import { forwardRef } from "react";
import { TweetData, formatCount } from "@/lib/tweet-types";
import { SiX } from "react-icons/si";

interface TweetPreviewProps {
  tweetData: TweetData;
}

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function renderTweetText(content: string, theme: string) {
  const linkColor = "#1D9BF0";
  const parts = content.split(/([@#]\w+|https?:\/\/\S+)/g);
  return parts.map((part, i) => {
    if (/^[@#]\w+$/.test(part) || /^https?:\/\/\S+$/.test(part)) {
      return (
        <span key={i} style={{ color: linkColor }}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const TweetPreview = forwardRef<HTMLDivElement, TweetPreviewProps>(
  ({ tweetData }, ref) => {
    const isDark = tweetData.theme === "dark" || tweetData.theme === "dim";
    const bg =
      tweetData.theme === "dark"
        ? "#000000"
        : tweetData.theme === "dim"
          ? "#15202b"
          : "#ffffff";
    const textPrimary = isDark ? "#e7e9ea" : "#0f1419";
    const textSecondary = isDark ? "#71767b" : "#536471";
    const borderColor = isDark
      ? tweetData.theme === "dim"
        ? "#38444d"
        : "#2f3336"
      : "#eff3f4";
    const iconColor = textSecondary;
    const avatarSrc = tweetData.avatarFile || tweetData.avatarUrl;

    return (
      <div
        ref={ref}
        className=""
        style={{
          backgroundColor: bg,
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          width: "100%",
          maxWidth: "560px",
          padding: "12px 16px",
          boxSizing: "border-box",
        }}
        data-testid="tweet-preview"
      >
        {/* Top row: avatar + name + X logo */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#1D9BF0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                crossOrigin="anonymous"
              />
            ) : (
              <span
                style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}
              >
                {getInitials(tweetData.displayName || "U")}
              </span>
            )}
          </div>

          {/* Name + username */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <span
                    style={{
                      color: textPrimary,
                      fontWeight: 700,
                      fontSize: "15px",
                      lineHeight: 1.3,
                    }}
                  >
                    {tweetData.displayName || "Display Name"}
                  </span>
                  <VerifiedIcon type={tweetData.verified} />
                </div>
                <div
                  style={{
                    color: textSecondary,
                    fontSize: "14px",
                    lineHeight: 1.3,
                  }}
                >
                  @{tweetData.username || "username"}
                </div>
              </div>
              {/* X logo */}
              <div style={{ flexShrink: 0, color: textPrimary }}>
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "24px",
                    height: "24px",
                    fill: "currentColor",
                  }}
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.625zM17.083 19.77h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tweet text */}
        <div
          style={{
            color: textPrimary,
            fontSize: "20px",
            lineHeight: 1.5,
            marginTop: "12px",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {renderTweetText(
            tweetData.content || "Your tweet content here...",
            tweetData.theme,
          )}
        </div>

        {/* Media */}
        {(tweetData.mediaFile || tweetData.mediaUrl) && (
          <div
            style={{
              marginTop: "12px",
              borderRadius: "16px",
              overflow: "hidden",
              border: `1px solid ${borderColor}`,
              maxHeight: "320px",
            }}
          >
            <img
              src={tweetData.mediaFile || tweetData.mediaUrl || ""}
              alt="media"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "320px",
                objectFit: "cover",
                display: "block",
              }}
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* Time · Date · Source */}
        <div
          style={{
            marginTop: "12px",
            paddingBottom: "12px",
            borderBottom: `1px solid ${borderColor}`,
            color: textSecondary,
            fontSize: "14px",
          }}
        >
          {tweetData.time} · {tweetData.date}
          {tweetData.showSource && tweetData.sourceApp && (
            <span>
              {" "}
              · <span style={{ color: "#1D9BF0" }}>{tweetData.sourceApp}</span>
            </span>
          )}
        </div>

        {/* Stats row */}
        {tweetData.showMetrics && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              paddingTop: "12px",
              paddingBottom: "12px",
              borderBottom: `1px solid ${borderColor}`,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Views", value: formatCount(tweetData.viewCount) },
              { label: "Likes", value: formatCount(tweetData.likeCount) },
              { label: "Reposts", value: formatCount(tweetData.retweetCount) },
              { label: "Replies", value: formatCount(tweetData.replyCount) },
              {
                label: "Bookmarks",
                value: formatCount(tweetData.bookmarkCount),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{ display: "flex", gap: "4px", alignItems: "baseline" }}
              >
                <span
                  style={{
                    color: textPrimary,
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {value}
                </span>
                <span style={{ color: textSecondary, fontSize: "14px" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action icons row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "4px",
            maxWidth: "425px",
          }}
        >
          {[
            { icon: "reply", count: formatCount(tweetData.replyCount) },
            { icon: "retweet", count: formatCount(tweetData.retweetCount) },
            { icon: "like", count: formatCount(tweetData.likeCount) },
            { icon: "views", count: formatCount(tweetData.viewCount) },
            { icon: "bookmark" },
            { icon: "share" },
          ].map(({ icon, count }) => (
            <div
              key={icon}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: iconColor,
              }}
            >
              {icon === "reply" && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
              )}
              {icon === "retweet" && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "currentColor",
                  }}
                >
                  <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.932 9.48.568 8.02 5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46L19.5 20.12l-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                </svg>
              )}
              {icon === "like" && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
              {icon === "views" && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "currentColor",
                  }}
                >
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
                </svg>
              )}
              {icon === "bookmark" && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              )}
              {icon === "share" && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              )}

              {count && <span style={{ fontSize: "13px" }}>{count}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

TweetPreview.displayName = "TweetPreview";
export default TweetPreview;
