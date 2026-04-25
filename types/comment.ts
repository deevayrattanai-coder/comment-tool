export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'twitter';

export type TikTokSubMode = 'comment-reply' | 'video-comment';
export type InstagramSubMode = 'post-comment' | 'reels-comment';
export type YouTubeSubMode = 'video-comment' | 'shorts-comment';
export type TwitterSubMode = 'post-comment';

export type SubMode = TikTokSubMode | InstagramSubMode | YouTubeSubMode | TwitterSubMode;

export type AnnotationType = 'highlight' | 'blur' | 'cut';

export interface TextAnnotation {
  type: AnnotationType;
  start: number;
  end: number;
}

export interface CommentData {
  platform: Platform;
  subMode: SubMode;
  username: string;
  displayName: string;
  message: string;
  likes: string;
  time: string;
  timeUnit: string;
  replies: string;
  retweets: string;
  views: string;
  isVerified: boolean;
  avatarSeed: string;
  previewTheme: 'light' | 'dark';
  annotations: TextAnnotation[];
}

export const platformSubModes: Record<Platform, { label: string; value: SubMode }[]> = {
  tiktok: [
    { label: 'Comment Reply', value: 'comment-reply' },
    { label: 'Video Comment', value: 'video-comment' },
  ],
  instagram: [
    { label: 'Post Comment', value: 'post-comment' },
    { label: 'Reels Comment', value: 'reels-comment' },
  ],
  youtube: [
    { label: 'Video Comment', value: 'video-comment' },
    { label: 'Shorts Comment', value: 'shorts-comment' },
  ],
  twitter: [
    { label: 'Post Comment', value: 'post-comment' },
  ],
};

export const defaultCommentData: CommentData = {
  platform: 'tiktok',
  subMode: 'comment-reply',
  username: 'username',
  displayName: 'Display Name',
  message: 'Write any comment and see what happens 😊',
  likes: '114',
  time: '2',
  timeUnit: 'wks',
  replies: '5',
  retweets: '12',
  views: '12K',
  isVerified: false,
  avatarSeed: 'Felix',
  previewTheme: 'light',
  annotations: [],
};
