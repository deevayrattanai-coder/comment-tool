import { TweetTheme, VerifiedBadge, formatCount } from "./tweet-types";

export type { TweetTheme, VerifiedBadge };
export { formatCount };

export interface ReplyTweet {
  id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  avatarFile: string | null;
  verified: VerifiedBadge;
  content: string;
  time: string;
  replyCount: number;
  retweetCount: number;
  likeCount: number;
  viewCount: number;
}

export interface ReplyChainData {
  theme: TweetTheme;
  tweets: ReplyTweet[];
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

export function newReply(overrides?: Partial<ReplyTweet>): ReplyTweet {
  return {
    id: makeId(),
    displayName: "John Doe",
    username: "johndoe",
    avatarUrl: "",
    avatarFile: null,
    verified: "none",
    content: "Replying to this tweet...",
    time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    replyCount: 12,
    retweetCount: 45,
    likeCount: 230,
    viewCount: 8900,
    ...overrides,
  };
}

export const defaultReplyChain: ReplyChainData = {
  theme: "dark",
  tweets: [
    {
      id: makeId(),
      displayName: "Elon Musk",
      username: "elonmusk",
      avatarUrl: "",
      avatarFile: null,
      verified: "blue",
      content: "The thing I find most surprising is how few people realize that the future is going to be unbelievably good.",
      time: "3:42 PM",
      replyCount: 4821,
      retweetCount: 12500,
      likeCount: 98400,
      viewCount: 5200000,
    },
    {
      id: makeId(),
      displayName: "Jane Smith",
      username: "janesmith",
      avatarUrl: "",
      avatarFile: null,
      verified: "none",
      content: "Couldn't agree more! The pace of innovation is truly staggering. What excites you most about the next decade?",
      time: "4:01 PM",
      replyCount: 142,
      retweetCount: 380,
      likeCount: 2100,
      viewCount: 45000,
    },
  ],
};
