import { TextAnnotation } from '@/types/comment';

interface Props {
  text: string;
  annotations: TextAnnotation[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders text with highlight (yellow bg) and blur (CSS blur filter) annotations.
 */
const AnnotatedText = ({ text, annotations, className, style }: Props) => {
  if (!annotations.length) {
    return <span className={className} style={style}>{text}</span>;
  }

  // Build a list of segments with their annotation types
  const sortedAnnotations = [...annotations].sort((a, b) => a.start - b.start);
  const segments: { text: string; type: AnnotationType | null }[] = [];
  type AnnotationType = 'highlight' | 'blur' | 'cut';

  let cursor = 0;
  for (const ann of sortedAnnotations) {
    const start = Math.max(ann.start, cursor);
    const end = Math.min(ann.end, text.length);
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), type: null });
    }
    if (end > start) {
      segments.push({ text: text.slice(start, end), type: ann.type });
    }
    cursor = end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), type: null });
  }

  return (
    <span className={className} style={style}>
      {segments.map((seg, i) => {
        if (seg.type === 'highlight') {
          return (
            <span
              key={i}
              style={{
                backgroundColor: 'hsl(50, 100%, 60%)',
                borderRadius: 3,
                padding: '1px 2px',
                color: 'inherit',
              }}
            >
              {seg.text}
            </span>
          );
        }
        if (seg.type === 'blur') {
          return (
            <span
              key={i}
              style={{
                filter: 'blur(5px)',
                userSelect: 'none',
                color: 'inherit',
              }}
            >
              {seg.text}
            </span>
          );
        }
        if (seg.type === 'cut') {
          return (
            <span
              key={i}
              style={{
                visibility: 'hidden',
                color: 'inherit',
              }}
            >
              {seg.text}
            </span>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </span>
  );
};

export default AnnotatedText;
