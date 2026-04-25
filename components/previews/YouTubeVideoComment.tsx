import { CommentData } from '@/types/comment';
import AnnotatedText from './AnnotatedText';

interface Props {
  data: CommentData;
  avatarUrl?: string | null;
}

const YouTubeVideoComment = ({ data, avatarUrl }: Props) => {
  const isDark = data.previewTheme === 'dark';
  const timeMap: Record<string, string> = {
    hrs: 'hours',
    wks: 'weeks',
    days: 'days',
    months: 'months',
  };
  const timeDisplay = `${data.time} ${timeMap[data.timeUnit] || data.timeUnit} ago`;
  const hasReplies = parseInt(data.replies) > 0;

  const lineColor = isDark ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 75%)';
  const mutedColor = isDark ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 55%)';
  const verifiedBadgeColor = 'hsl(0, 0%, 38%)';
  const replyLinkColor = isDark ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 40%)';

  return (
    <div
      className="rounded-2xl"
      style={{
        width: 440,
        padding: '18px 20px',
        backgroundColor: isDark ? 'hsl(0, 0%, 7%)' : 'hsl(0, 0%, 100%)',
        color: isDark ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 7%)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.5)'
          : '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', columnGap: 12, rowGap: 8 }}>
        <div
          style={{
            position: 'relative',
            width: 40,
            flexShrink: 0,
            gridRow: hasReplies ? '1 / span 2' : '1',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: isDark ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 85%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            ) : (
              <svg
                style={{ width: 24, height: 24, color: isDark ? 'hsl(0,0%,45%)' : 'hsl(0,0%,60%)' }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
          {hasReplies && (
            <div
              style={{
                position: 'absolute',
                top: 48,
                left: 19,
                bottom: 4,
                width: 28,
                borderLeft: `2px solid ${lineColor}`,
                borderBottom: `2px solid ${lineColor}`,
                borderBottomLeftRadius: 20,
              }}
            />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: isDark ? 'hsl(0,0%,100%)' : 'hsl(0,0%,7%)' }}>
                {data.username || 'Username'}
              </span>
              {data.isVerified && (
                <svg style={{ width: 14, height: 14, flexShrink: 0 }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill={verifiedBadgeColor} />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span style={{ fontSize: 12, color: mutedColor }}>
                • {timeDisplay}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="8" cy="3" r="1.2" fill={mutedColor} />
              <circle cx="8" cy="8" r="1.2" fill={mutedColor} />
              <circle cx="8" cy="13" r="1.2" fill={mutedColor} />
            </svg>
          </div>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.4,
              margin: '0 0 10px 0',
              color: isDark ? 'hsl(0,0%,90%)' : 'hsl(0,0%,7%)',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            <AnnotatedText
              text={data.message || 'Write any comment and see what happens 😊'}
              annotations={data.annotations}
            />
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: mutedColor, marginBottom: hasReplies ? 16 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{data.likes}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: mutedColor }}>
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
              <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: mutedColor }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="8" y1="9" x2="16" y2="9" />
              <line x1="8" y1="13" x2="13" y2="13" />
            </svg>
          </div>
        </div>

      {hasReplies && (
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 0, marginTop: -4 }}>
          <span style={{ fontSize: 13, lineHeight: '16px', fontWeight: 600, color: replyLinkColor }}>
            {data.replies} replies ›
          </span>
        </div>
      )}
      </div>
    </div>
  );
};

export default YouTubeVideoComment;
