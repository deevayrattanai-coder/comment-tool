import { TweetTheme, VerifiedBadge } from "./tweet-types";
export type { TweetTheme, VerifiedBadge };

export interface SuspensionData {
  theme: TweetTheme;
  displayName: string;
  username: string;
  avatarUrl: string;
  avatarFile: string | null;
  verified: VerifiedBadge;
  tweetCount: string;
  reason: "rules" | "unusual" | "spam" | "custom";
  customMessage: string;
}

export const defaultSuspensionData: SuspensionData = {
  theme: "dark",
  displayName: "Suspended User",
  username: "suspendeduser",
  avatarUrl: "",
  avatarFile: null,
  verified: "none",
  tweetCount: "1,204",
  reason: "rules",
  customMessage: "",
};

export const SUSPENSION_MESSAGES: Record<string, string> = {
  rules: `Twitter suspends accounts which violate the <span style="color:#1D9BF0">Twitter Rules</span>.`,
  unusual: "This account has been suspended due to unusual activity. If you think this is a mistake, please contact our support team.",
  spam: "This account has been suspended due to multiple or repeat violations of the Twitter Rules on platform manipulation and spam.",
  custom: "",
};
