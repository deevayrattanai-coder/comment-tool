'use client';

import Link from 'next/link';
import { X, Crown } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function UpgradeDialog({ open, onClose, title, message }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-accent text-muted-foreground"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-md">
          <Crown size={22} className="text-primary-foreground" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground mb-2">
          {title ?? 'Upgrade required'}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {message ??
            "You've reached your Free plan monthly limit. Please purchase a higher plan to continue exporting."}
        </p>
        <div className="flex gap-2">
          <Link
            href="/pricing"
            className="flex-1 h-11 gradient-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-md hover:opacity-90 transition-all flex items-center justify-center"
          >
            See Pricing
          </Link>
          <button
            onClick={onClose}
            className="px-4 h-11 border border-border bg-background text-foreground font-medium text-sm rounded-lg hover:bg-accent transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
