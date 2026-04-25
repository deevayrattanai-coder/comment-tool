import { CommentData } from '@/types/comment';
import { Heart, ThumbsDown } from 'lucide-react';
import AnnotatedText from './AnnotatedText';

interface Props {
  data: CommentData;
  avatarUrl?: string | null;
}

const TikTokVideoComment = ({ data, avatarUrl }: Props) => {
  const isDark = data.previewTheme === 'dark';
  const timeMap: Record<string, string> = { wks: 'w', hrs: 'h', days: 'd', months: 'mo' };
  const timeDisplay = `${data.time}${timeMap[data.timeUnit] || data.timeUnit}`;

  return (
    <div
      className="rounded-2xl"
      style={{
        width: 420,
        minHeight: 100,
        padding: '18px 20px',
        backgroundColor: isDark ? 'hsl(0, 0%, 12%)' : 'white',
        color: isDark ? 'white' : 'hsl(0, 0%, 7%)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.5)'
          : '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex gap-3">
        <div
          className="rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            backgroundColor: isDark ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 85%)',
          }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          ) : (
            <svg
              style={{ width: 24, height: 24, color: isDark ? 'hsl(0,0%,45%)' : 'hsl(0,0%,55%)' }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span
              className="font-semibold"
              style={{
                fontSize: 14,
                color: isDark ? 'white' : 'hsl(0, 0%, 7%)',
              }}
            >
              {data.username || 'username'}
            </span>
            {data.isVerified && (
              <svg
                style={{ width: 14, height: 14, flexShrink: 0 }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" fill="#20D5EC" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <p
            className="mt-0.5 leading-snug break-words"
            style={{
              fontSize: 14,
              color: isDark ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 7%)',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            <AnnotatedText
              text={data.message || 'Write any comment and see what happens 😊'}
              annotations={data.annotations}
            />
          </p>

          <div
            className="flex items-center gap-4 mt-2"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: isDark ? 'hsl(0, 0%, 45%)' : 'hsl(0, 0%, 50%)',
            }}
          >
            <span>{timeDisplay}</span>
            <span className="font-semibold">Reply</span>
            <div className="flex items-center gap-1 ml-auto">
              <Heart size={15} />
              <span>{data.likes}</span>
            </div>
            <ThumbsDown size={15} />
          </div>

          {parseInt(data.replies) > 0 && (
            <div
              className="mt-2 flex items-center gap-2"
              style={{
                fontSize: 12,
                color: isDark ? 'hsl(0, 0%, 45%)' : 'hsl(0, 0%, 50%)',
              }}
            >
              <div
                className="h-px"
                style={{
                  width: 20,
                  backgroundColor: isDark ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 80%)',
                }}
              />
              <span>View {data.replies} replies ▾</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TikTokVideoComment;
