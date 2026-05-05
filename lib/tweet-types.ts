export type TweetTheme = "light" | "dark" | "dim";
export type VerifiedBadge = "none" | "blue" | "gold" | "government";

export interface TweetData {
  displayName: string;
  username: string;
  avatarUrl: string;
  avatarFile: string | null;
  verified: VerifiedBadge;
  content: string;
  date: string;
  time: string;
  replyCount: number;
  retweetCount: number;
  likeCount: number;
  viewCount: number;
  bookmarkCount: number;
  theme: TweetTheme;
  mediaUrl: string | null;
  mediaFile: string | null;
  showMetrics: boolean;
  showSource: boolean;
  sourceApp: string;
}

export const defaultTweetData: TweetData = {
  displayName: "Elon Musk",
  username: "elonmusk",
  avatarUrl: "",
  avatarFile: null,
  verified: "blue",
  content: "The thing I find most surprising is how few people realize that the future is going to be unbelievably good.",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
  replyCount: 4821,
  retweetCount: 12500,
  likeCount: 98400,
  viewCount: 5200000,
  bookmarkCount: 3200,
  theme: "dark",
  mediaUrl: null,
  mediaFile: null,
  showMetrics: true,
  showSource: true,
  sourceApp: "Twitter for iPhone",
};

export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}