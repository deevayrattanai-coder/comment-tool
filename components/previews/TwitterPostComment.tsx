import { CommentData } from '@/types/comment';
import AnnotatedText from './AnnotatedText';
const grokLogo = '/assets/grok-logo.png';

interface Props {
  data: CommentData;

  avatarUrl?: string | null;
}

const TwitterPostComment = ({ data, avatarUrl }: Props) => {
  const isDark = data.previewTheme === 'dark';
  const timeDisplay = `${data.time}${data.timeUnit === 'hrs' ? 'h' : data.timeUnit === 'wks' ? 'w' : data.timeUnit === 'days' ? 'd' : data.timeUnit === 'months' ? 'mo' : data.timeUnit}`;

  const textPrimary = isDark ? '#e7e9ea' : '#0f1419';
  const textSecondary = isDark ? '#71767b' : '#536471';
  const cardBg = isDark ? '#000000' : '#ffffff';
  const iconColor = textSecondary;

  return (
    <div
      className="rounded-2xl relative"
      style={{
        width: 480,
        backgroundColor: cardBg,
        padding: '12px 16px',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.5)'
          : '0 4px 24px rgba(0,0,0,0.08)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        {/* Avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: isDark ? '#333639' : '#cfd9de',
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          ) : (
            <svg style={{ width: 22, height: 22, color: isDark ? '#6e7074' : '#8899a6' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header: name, @handle, time, actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {data.displayName || 'Display Name'}
            </span>
            {data.isVerified && (
              <svg style={{ width: 16, height: 16, flexShrink: 0 }} viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#1d9bf0" />
                <path d="M7 11l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span style={{ fontSize: 15, color: textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              @{data.username}
            </span>
            <span style={{ fontSize: 15, color: textSecondary }}>·</span>
            <span style={{ fontSize: 15, color: textSecondary, flexShrink: 0 }}>{timeDisplay}</span>

            <div style={{ flex: 1 }} />

            {/* Grok logo */}
            <img
              src={grokLogo}
              alt=""
              style={{
                width: 16,
                height: 16,
                flexShrink: 0,
                opacity: 1,
                filter: isDark ? 'invert(1)' : 'none',
              }}
            />

            {/* More (...) icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill={textPrimary} style={{ flexShrink: 0, cursor: 'pointer' }}>
              <circle cx="5" cy="12" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="19" cy="12" r="1.8" />
            </svg>
          </div>

          {/* Message body */}
          <div style={{
            fontSize: 15,
            lineHeight: '20px',
            color: textPrimary,
            marginTop: 2,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}>
            <AnnotatedText
              text={data.message || 'Write any comment and see what happens 😊'}
              annotations={data.annotations}
            />
          </div>

          {/* Footer action bar — 5 groups */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            color: iconColor,
          }}>
            {/* 1. Comment / Reply */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 13 }}>{data.replies}</span>
            </div>
            {/* 2. Repost / Reshare */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span style={{ fontSize: 13 }}>{data.retweets}</span>
            </div>
            {/* 3. Like */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span style={{ fontSize: 13 }}>{data.likes}</span>
            </div>
            {/* 4. Insights / Views */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="12" width="4" height="9" rx="1" />
                <rect x="10" y="7" width="4" height="14" rx="1" />
                <rect x="17" y="3" width="4" height="18" rx="1" />
              </svg>
              <span style={{ fontSize: 13 }}>{data.views}</span>
            </div>
            {/* 5. Bookmark + Share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterPostComment;
