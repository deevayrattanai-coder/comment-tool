import { TweetTheme, VerifiedBadge } from "./tweet-types";
export type { TweetTheme, VerifiedBadge };

export interface BlockData {
  theme: TweetTheme;
  blockerDisplayName: string;
  blockerUsername: string;
  blockerAvatarUrl: string;
  blockerAvatarFile: string | null;
  blockerVerified: VerifiedBadge;
  blockerBio: string;
  blockerFollowing: number;
  blockerFollowers: number;
  coverColor: string;
  viewerUsername: string;
}

export const defaultBlockData: BlockData = {
  theme: "dark",
  blockerDisplayName: "Elon Musk",
  blockerUsername: "elonmusk",
  blockerAvatarUrl: "",
  blockerAvatarFile: null,
  blockerVerified: "blue",
  blockerBio: "CEO of X, Tesla & SpaceX. Technoking.",
  blockerFollowing: 742,
  blockerFollowers: 180000000,
  coverColor: "#1D9BF0",
  viewerUsername: "you",
};
