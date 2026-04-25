'use client';

import Link from 'next/link';
import { X, Lock } from 'lucide-react';

type Props = { open: boolean; onClose: () => void };

export default function LoginRequiredDialog({ open, onClose }: Props) {
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
          <Lock size={22} className="text-primary-foreground" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground mb-2">Login required</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          You need an account to export and download comment screenshots. Sign up takes 10 seconds.
        </p>
        <div className="flex gap-2">
          <Link
            href="/login"
            className="flex-1 h-11 gradient-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-md hover:opacity-90 transition-all flex items-center justify-center"
          >
            Login or Sign up
          </Link>
          <button
            onClick={onClose}
            className="px-4 h-11 border border-border bg-background text-foreground font-medium text-sm rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
