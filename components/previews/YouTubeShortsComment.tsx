import { CommentData } from '@/types/comment';
import AnnotatedText from './AnnotatedText';

interface Props {
  data: CommentData;
  avatarUrl?: string | null;
}

const YouTubeShortsComment = ({ data, avatarUrl }: Props) => {
  const isDark = data.previewTheme === 'dark';

  return (
    <div
      className="rounded-2xl"
      style={{
        width: 340,
        padding: '16px 18px',
        backgroundColor: isDark ? 'hsl(0, 0%, 7%)' : 'white',
        color: isDark ? 'white' : 'hsl(0, 0%, 7%)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.5)'
          : '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex gap-3 items-start">
        <div
          className="rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            backgroundColor: isDark ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 88%)',
          }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          ) : (
            <svg
              style={{ width: 20, height: 20, color: isDark ? 'hsl(0,0%,45%)' : 'hsl(0,0%,55%)' }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 12, color: isDark ? 'hsl(0,0%,50%)' : 'hsl(0,0%,55%)', marginBottom: 2 }}>
            Comment from @{data.username || 'Username'}
          </p>
          <p
            className="font-medium leading-snug break-words"
            style={{
              fontSize: 14,
              color: isDark ? 'white' : 'hsl(0,0%,7%)',
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
  );
};

export default YouTubeShortsComment;
