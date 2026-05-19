import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function timeLabel(time: string, unit: string): string {
  const map: Record<string, string> = { hrs: "h", days: "d", wks: "w", months: "mo" };
  return `${time}${map[unit] ?? unit}`;
}

function avatarImage(src: string, size: number): string {
   const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

  return `
    <img
     src="${baseUrl}${src}"
      width="${size}"
      height="${size}"
      style="
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        object-fit:cover;
        flex-shrink:0;
        overflow:hidden;
      "
    />
  `;
}

function verifiedBadge(color: string): string {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;vertical-align:middle;">
    <circle cx="12" cy="12" r="10" fill="${color}"/>
    <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ─── Templates ───────────────────────────────────────────────────────────────

function buildInstagramPostComment(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "#000" : "#fff";
  const textPrimary = isDark ? "#fff" : "#121212";
  const textMuted = isDark ? "hsl(0,0%,50%)" : "hsl(0,0%,55%)";
  const tl = timeLabel(p.time, p.timeUnit);

  return `<div id="comment-card" style="display:inline-block;border-radius:16px;background:${bg};padding:16px 18px;max-width:420px;min-width:280px;box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:flex;gap:12px;">
   ${avatarImage(p.avatar, 36)}
    <div style="flex:1;min-width:0;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
        <span style="font-weight:600;font-size:13px;color:${textPrimary};">${escapeHtml(p.username)}</span>
        ${p.isVerified ? verifiedBadge("#3897F0") : ""}
        <span style="font-size:12px;color:${textMuted};">${tl}</span>
      </div>
      <p style="font-size:14px;color:${isDark ? "hsl(0,0%,90%)" : "hsl(0,0%,15%)"};margin:0;line-height:1.45;word-break:break-word;">${escapeHtml(p.message)}</p>
      <div style="margin-top:6px;font-size:12px;font-weight:600;color:${textMuted};">Reply</div>
      ${parseInt(p.replies) > 0 ? `<div style="margin-top:8px;display:flex;align-items:center;gap:8px;font-size:12px;color:${textMuted};"><div style="width:24px;height:1px;background:${isDark ? "hsl(0,0%,30%)" : "hsl(0,0%,80%)"}"></div><span>View ${escapeHtml(p.replies)} more replies</span></div>` : ""}
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;padding-top:8px;flex-shrink:0;color:${textMuted};">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <span style="font-size:11px;">${escapeHtml(p.likes)}</span>
    </div>
  </div>
</div>`;
}

function buildInstagramReelsComment(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "#000" : "#fff";
  const textPrimary = isDark ? "#fff" : "hsl(0,0%,7%)";
  const textMuted = isDark ? "hsl(0,0%,50%)" : "hsl(0,0%,55%)";

  return `<div id="comment-card" style="display:inline-block;border-radius:16px;background:${bg};padding:16px 18px;max-width:320px;min-width:240px;box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:flex;gap:12px;align-items:flex-start;">
    ${avatarImage(p.avatar, 36)}
    <div style="flex:1;min-width:0;">
      <p style="font-weight:500;font-size:14px;color:${textPrimary};margin:0 0 4px 0;line-height:1.4;word-break:break-word;">${escapeHtml(p.message)}</p>
      <p style="font-size:13px;color:${textMuted};margin:0;">Replying to ${escapeHtml(p.username)}</p>
    </div>
  </div>
</div>`;
}

function buildTwitterPostComment(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "#000" : "#fff";
  const textPrimary = isDark ? "#e7e9ea" : "#0f1419";
  const textSecondary = isDark ? "#71767b" : "#536471";
  const tl = timeLabel(p.time, p.timeUnit);

  return `<div id="comment-card" style="display:inline-block;border-radius:16px;background:${bg};padding:12px 16px;max-width:480px;min-width:320px;box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:flex;gap:10px;">
    ${avatarImage(p.avatar, 40)}
    <div style="flex:1;min-width:0;">
      <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
        <span style="font-weight:700;font-size:15px;color:${textPrimary};">${escapeHtml(p.displayName)}</span>
        ${p.isVerified ? `<svg style="width:16px;height:16px;flex-shrink:0;" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#1d9bf0"/><path d="M7 11l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
        <span style="font-size:15px;color:${textSecondary};">@${escapeHtml(p.username)}</span>
        <span style="font-size:15px;color:${textSecondary};">·</span>
        <span style="font-size:15px;color:${textSecondary};">${tl}</span>
        <div style="flex:1;"></div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${textPrimary}"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>
      </div>
      <div style="font-size:15px;line-height:20px;color:${textPrimary};margin-top:2px;word-break:break-word;">${escapeHtml(p.message)}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;color:${textSecondary};">
        <div style="display:flex;align-items:center;gap:4px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span style="font-size:13px;">${escapeHtml(p.replies)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          <span style="font-size:13px;">${escapeHtml(p.retweets)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span style="font-size:13px;">${escapeHtml(p.likes)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>
          <span style="font-size:13px;">${escapeHtml(p.views)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function buildTikTokVideoComment(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "hsl(0,0%,12%)" : "#fff";
  const textPrimary = isDark ? "#fff" : "hsl(0,0%,7%)";
  const textMuted = isDark ? "hsl(0,0%,45%)" : "hsl(0,0%,50%)";
  const tl = timeLabel(p.time, p.timeUnit);

  return `<div id="comment-card" style="display:inline-block;border-radius:16px;background:${bg};padding:18px 20px;max-width:420px;min-width:280px;box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:flex;gap:12px;">
    ${avatarImage(p.avatar, 40)}
    <div style="flex:1;min-width:0;">
      <div style="display:flex;align-items:center;gap:4px;">
        <span style="font-weight:600;font-size:14px;color:${textPrimary};">${escapeHtml(p.username)}</span>
        ${p.isVerified ? verifiedBadge("#20D5EC") : ""}
      </div>
      <p style="font-size:14px;color:${isDark ? "hsl(0,0%,85%)" : "hsl(0,0%,7%)"};margin:2px 0 8px 0;line-height:1.45;word-break:break-word;">${escapeHtml(p.message)}</p>
      <div style="display:flex;align-items:center;gap:16px;font-size:12px;font-weight:500;color:${textMuted};">
        <span>${tl}</span>
        <span style="font-weight:600;">Reply</span>
        <div style="display:flex;align-items:center;gap:4px;margin-left:auto;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>${escapeHtml(p.likes)}</span>
        </div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
      </div>
    </div>
  </div>
</div>`;
}

function buildTikTokCommentReply(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "hsl(0,0%,12%)" : "#fff";
  const textPrimary = isDark ? "#fff" : "hsl(0,0%,7%)";
  const textMuted = isDark ? "hsl(0,0%,55%)" : "hsl(0,0%,50%)";

  return `<div id="comment-card" style="display:inline-block;position:relative;width:380px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="border-radius:16px;padding:20px 24px;background:${bg};color:${textPrimary};box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};min-height:120px;">
    <p style="font-size:14px;color:${textMuted};margin:0 0 8px 0;">Reply to ${escapeHtml(p.username)}'s comment</p>
    <div style="display:flex;gap:12px;align-items:flex-start;">
      ${avatarImage(p.avatar, 44)}
      <div style="flex:1;min-width:0;">
        <p style="font-weight:700;font-size:22px;margin:0;line-height:1.3;word-break:break-word;color:${textPrimary};">${escapeHtml(p.message)}</p>
      </div>
    </div>
  </div>
  <div style="position:absolute;bottom:-12px;left:28px;width:22px;height:22px;clip-path:polygon(0 0,100% 0,0 100%);background:${bg};"></div>
</div>`;
}

function buildYouTubeVideoComment(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "hsl(0,0%,12%)" : "#fff";
  const textPrimary = isDark ? "hsl(0,0%,90%)" : "hsl(0,0%,7%)";
  const textMuted = isDark ? "hsl(0,0%,55%)" : "hsl(0,0%,50%)";
  const replyLinkColor = isDark ? "#3ea6ff" : "#065fd4";
  const hasReplies = parseInt(p.replies) > 0;

  return `<div id="comment-card" style="display:inline-block;border-radius:16px;background:${bg};padding:16px 18px;max-width:480px;min-width:300px;box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};font-family:Roboto,'Noto Sans',Arial,sans-serif;">
  <div style="display:flex;gap:12px;">
    ${avatarImage(p.avatar, 36)}
    <div style="flex:1;min-width:0;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
        <span style="font-weight:500;font-size:13px;color:${textPrimary};">${escapeHtml(p.username)}</span>
        ${p.isVerified ? verifiedBadge("#aaa") : ""}
        <span style="font-size:12px;color:${textMuted};">${timeLabel(p.time, p.timeUnit)}</span>
        <div style="flex:1;"></div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="${textMuted}"><circle cx="8" cy="3" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="8" cy="13" r="1.2"/></svg>
      </div>
      <p style="font-size:14px;line-height:1.4;margin:0 0 10px 0;color:${textPrimary};word-break:break-word;">${escapeHtml(p.message)}</p>
      <div style="display:flex;align-items:center;gap:16px;color:${textMuted};margin-bottom:${hasReplies ? "16px" : "0"};">
        <div style="display:flex;align-items:center;gap:6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          <span style="font-size:12px;font-weight:500;">${escapeHtml(p.likes)}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>
      </div>
      ${hasReplies ? `<span style="font-size:13px;font-weight:600;color:${replyLinkColor};">${escapeHtml(p.replies)} replies ›</span>` : ""}
    </div>
  </div>
</div>`;
}

function buildYouTubeShortsComment(p: Required<Payload>): string {
  const isDark = p.theme === "dark";
  const bg = isDark ? "hsl(0,0%,7%)" : "#fff";
  const textPrimary = isDark ? "#fff" : "hsl(0,0%,7%)";
  const textMuted = isDark ? "hsl(0,0%,50%)" : "hsl(0,0%,55%)";

  return `<div id="comment-card" style="display:inline-block;border-radius:16px;background:${bg};padding:16px 18px;max-width:340px;min-width:240px;box-shadow:${isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};font-family:Roboto,'Noto Sans',Arial,sans-serif;">
  <div style="display:flex;gap:12px;align-items:flex-start;">
    ${avatarImage(p.avatar, 36)}
    <div style="flex:1;min-width:0;">
      <p style="font-size:12px;color:${textMuted};margin:0 0 2px 0;">Comment from @${escapeHtml(p.username)}</p>
      <p style="font-weight:500;font-size:14px;color:${textPrimary};margin:0;line-height:1.45;word-break:break-word;">${escapeHtml(p.message)}</p>
    </div>
  </div>
</div>`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Payload {
  platform: "instagram" | "twitter" | "youtube" | "tiktok";
  message: string;
  commentType:
    | "post-comment"
    | "reels-comment"
    | "video-comment"
    | "shorts-comment"
    | "comment-reply";
  username?: string;
  displayName?: string;
  likes?: string;
  replies?: string;
  retweets?: string;
  views?: string;
  time?: string;
   avatar?: string;
  timeUnit?: "hrs" | "days" | "wks" | "months";
  isVerified?: boolean;
  theme?: "light" | "dark";
  gender?: "male" | "female";
}

function buildHtml(p: Required<Payload>): string {
  let card = "";
  if (p.platform === "instagram") {
    card = p.commentType === "reels-comment"
      ? buildInstagramReelsComment(p)
      : buildInstagramPostComment(p);
  } else if (p.platform === "twitter") {
    card = buildTwitterPostComment(p);
  } else if (p.platform === "tiktok") {
    card = p.commentType === "comment-reply"
      ? buildTikTokCommentReply(p)
      : buildTikTokVideoComment(p);
  } else {
    card = p.commentType === "shorts-comment"
      ? buildYouTubeShortsComment(p)
      : buildYouTubeVideoComment(p);
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>* { box-sizing:border-box; margin:0; padding:0; } body { background:${p.theme === "dark" ? "#111" : "#f5f5f5"}; display:inline-block; padding:24px; }</style>
  </head><body>${card}</body></html>`;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const VALID_PLATFORMS = ["instagram", "twitter", "youtube", "tiktok"];
  const VALID_TYPES = ["post-comment", "reels-comment", "video-comment", "shorts-comment", "comment-reply"];

  if (!body.platform || !VALID_PLATFORMS.includes(body.platform)) {
    return NextResponse.json({ error: `Invalid 'platform'. Must be one of: ${VALID_PLATFORMS.join(", ")}` }, { status: 400 });
  }
  if (!body.message) {
    return NextResponse.json({ error: "Missing required field: 'message'" }, { status: 400 });
  }
  if (!body.commentType || !VALID_TYPES.includes(body.commentType)) {
    return NextResponse.json({ error: `Invalid 'commentType'. Must be one of: ${VALID_TYPES.join(", ")}` }, { status: 400 });
  }


const MALE_PROFILES = [
  {
    username: "alex",
    displayName: "Alex Carter",
    avatar: "/avatars/male1.png",
  },
  {
    username: "johnny",
    displayName: "Johnny Walker",
    avatar: "/avatars/male2.png",
  },
  {
    username: "mikee",
    displayName: "Mike Tyson",
    avatar: "/avatars/male3.png",
  },
  {
    username: "daniel_a",
    displayName: "Daniel Anderson",
    avatar: "/avatars/male4.png",
  },
  {
    username: "noahh",
    displayName: "Noah Wilson",
    avatar: "/avatars/male5.png",
  },
  {
    username: "jamesc",
    displayName: "James Carter",
    avatar: "/avatars/male6.png",
  },
  {
    username: "ethanx",
    displayName: "Ethan Brown",
    avatar: "/avatars/male7.png",
  },
  {
    username: "liamv",
    displayName: "Liam Parker",
    avatar: "/avatars/male8.png",
  },
  {
    username: "ryanl",
    displayName: "Ryan Lewis",
    avatar: "/avatars/male9.png",
  },
  {
    username: "lucas",
    displayName: "Lucas Martin",
    avatar: "/avatars/male10.png",
  },
];

const FEMALE_PROFILES = [
  {
    username: "its_sarah",
    displayName: "Sarah Lee",
    avatar: "/avatars/female1.png",
  },
  {
    username: "emmax",
    displayName: "Emma Watson",
    avatar: "/avatars/female2.png",
  },
  {
    username: "oliviax",
    displayName: "Olivia Smith",
    avatar: "/avatars/female3.png",
  },
  {
    username: "avajoy",
    displayName: "Ava Johnson",
    avatar: "/avatars/female4.png",
  },
  {
    username: "miaworld",
    displayName: "Mia Williams",
    avatar: "/avatars/female5.png",
  },
  {
    username: "sophiek",
    displayName: "Sophie Kim",
    avatar: "/avatars/female6.png",
  },
  {
    username: "tayler_b",
    displayName: "Taylor Brown",
    avatar: "/avatars/female7.png",
  },
  {
    username: "charlottex",
    displayName: "Charlotte Davis",
    avatar: "/avatars/female8.png",
  },
  {
    username: "amelia",
    displayName: "Amelia Clark",
    avatar: "/avatars/female9.png",
  },
  {
    username: "isabella",
    displayName: "Isabella Moore",
    avatar: "/avatars/female10.png",
  },
];  

const RANDOM_USERNAMES = [
  "alex",
  "johnny",
  "viralclips",
  "mikee",
  "its_sarah",
  "noahh",
  "emmax",
  "trendytok",
  "tayler_b",
  "daniel_a",
];

const RANDOM_DISPLAY_NAMES = [
  "Alex Carter",
  "Sarah Lee",
  "Noah Wilson",
  "Emma Watson",
  "Mike Tyson",
  "Olivia",
  "James Carter",
  "Ava Smith",
  "Tayler Brown",
  "Daniel Anderson"
];

const RANDOM_LIKES = [
  "12",
  "48",
  "114",
  "892",
  "1.2K",
  "4.5K",
  "12K",
  "88K",
  "1.1M"
];

const RANDOM_REPLIES = [
  "322",
  "1212",
  "5023",
  "142",
  "88",
  "120",
  "1.2K",
  "3.4K",
  "12K"
];

const RANDOM_RETWEETS = [
  "5631",
  "823",
  "441",
  "120",
  "1.1K",
  "4.5K",
  "12K",
  "88K",
  "1.1M"
];

const RANDOM_VIEWS = [
  "900",
  "5K",
  "12K",
  "88K",
  "1.2M",
  "23k",
  "56K",
  "890K",
  "3.4M"
];

const RANDOM_TIMES = [
  "1",
  "2",
  "5",
  "8",
  "12",
  "20",
  "32",
  "56",
  "120"
];

const RANDOM_TIME_UNITS: Payload["timeUnit"][] = [
  "hrs",
  "days",
  "wks",
  "months"
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const selectedProfiles =
  body.gender === "female"
    ? FEMALE_PROFILES
    : body.gender === "male"
    ? MALE_PROFILES
    : [...MALE_PROFILES, ...FEMALE_PROFILES];

const selectedProfile = randomFrom(selectedProfiles);

const payload: Required<Payload> = {
  platform: body.platform,
  message: body.message,
  commentType: body.commentType,

  username:
    body.username ??
     selectedProfile.username,

      avatar:
    body.avatar ??
    selectedProfile.avatar,

  displayName:
    body.displayName ??
    selectedProfile.displayName,

  likes:
    body.likes ??
    randomFrom(RANDOM_LIKES),

  replies:
    body.replies ??
    randomFrom(RANDOM_REPLIES),

  retweets:
    body.retweets ??
    randomFrom(RANDOM_RETWEETS),

  views:
    body.views ??
    randomFrom(RANDOM_VIEWS),

  time:
    body.time ??
    randomFrom(RANDOM_TIMES),

  timeUnit:
    body.timeUnit ??
    randomFrom(RANDOM_TIME_UNITS),

  isVerified:
    body.isVerified ??
    Math.random() > 0.7,

  theme:
    body.theme ??
    randomFrom(["light", "dark"]),

    gender:
    body.gender ??
    Math.random() > 0.5
      ? "male"
      : "female",
};

  let browser;
  try {
    browser = await puppeteer.launch({
      // If puppeteer can't find Chromium, set CHROMIUM_PATH in your .env.local
      // e.g. CHROMIUM_PATH=/usr/bin/chromium-browser
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });
    await page.setContent(buildHtml(payload), { waitUntil: "load" });

    const element = await page.$("#comment-card");
    if (!element) {
      return NextResponse.json({ error: "Failed to render comment card" }, { status: 500 });
    }

    const screenshot = await element.screenshot({ type: "png" });

    return new NextResponse(Buffer.from(screenshot), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${payload.platform}-comment.png"`,
      },
    });
  } catch (err) {
    console.error("Screenshot error:", err);
    return NextResponse.json({ error: "Failed to generate screenshot" }, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}
