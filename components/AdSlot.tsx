type Props = {
  label?: string;
  size?: 'leaderboard' | 'rectangle' | 'banner' | 'inline';
};

const sizeMap = {
  leaderboard: 'h-24 md:h-28',
  rectangle: 'h-64',
  banner: 'h-20',
  inline: 'h-32',
} as const;

export default function AdSlot({ label = 'Advertisement', size = 'leaderboard' }: Props) {
  return (
    <div
      aria-label="Advertisement slot"
      className={`w-full ${sizeMap[size]} rounded-xl border-2 border-dashed border-border bg-gradient-to-br from-primary/5 via-card to-primary/5 flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-muted-foreground`}
    >
      <span>{label}</span>
    </div>
  );
}
