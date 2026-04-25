import { CommentData } from '@/types/comment';
import AnnotatedText from './AnnotatedText';

interface Props {
  data: CommentData;
  avatarUrl?: string | null;
}

const TikTokCommentReply = ({ data, avatarUrl }: Props) => {
  const isDark = data.previewTheme === 'dark';

  return (
    <div className="relative" style={{ width: 380 }}>
      <div
        className="rounded-2xl px-6 py-5"
        style={{
          backgroundColor: isDark ? 'hsl(0, 0%, 12%)' : 'white',
          color: isDark ? 'white' : 'hsl(0, 0%, 7%)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.5)'
            : '0 4px 24px rgba(0,0,0,0.08)',
          minHeight: 120,
        }}
      >
        <p
          className="mb-2"
          style={{
            fontSize: 14,
            color: isDark ? 'hsl(0, 0%, 55%)' : 'hsl(0, 0%, 50%)',
          }}
        >
          Reply to {data.username || 'username'}'s{' '}
          {data.isVerified && (
            <svg
              style={{ width: 14, height: 14, display: 'inline-block', verticalAlign: 'middle', marginRight: 2 }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" fill="#20D5EC" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          comment
        </p>

        <div className="flex gap-3 items-start">
          <div
            className="rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              backgroundColor: isDark ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 85%)',
            }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            ) : (
              <svg
                style={{ width: 26, height: 26, color: isDark ? 'hsl(0,0%,45%)' : 'hsl(0,0%,55%)' }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="font-bold leading-snug break-words"
              style={{
                fontSize: 22,
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              <AnnotatedText
                text={data.message || 'Write any comment and see what happens 😊'}
                annotations={data.annotations}
              />
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-3 left-7"
        style={{
          width: 22,
          height: 22,
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          backgroundColor: isDark ? 'hsl(0, 0%, 12%)' : 'white',
        }}
      />
    </div>
  );
};

export default TikTokCommentReply;
