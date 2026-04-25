'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { useAuth } from '@/components/AuthProvider';
import { User as UserIcon, LogOut, Lock, History, Crown, AlertCircle } from 'lucide-react';

type ExportRow = {
  id: number;
  platform: string;
  subMode: string;
  mode: string;
  count: number;
  createdAt: string;
};

type Usage = {
  monthTotal: number;
  limit: number | null;
  plan: string;
  bulkAllowed: boolean;
};

const PLAN_LABEL: Record<string, string> = { free: 'Free', pro: 'Pro', business: 'Business' };

export default function ProfilePage() {
  const { user, loading, logout, refresh } = useAuth();
  const router = useRouter();
  const [exports, setExports] = useState<ExportRow[]>([]);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loadingHist, setLoadingHist] = useState(true);
  const [pwd, setPwd] = useState({ current: '', next: '', msg: '', err: '' });
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login?next=/profile');
  }, [loading, user, router]);

  const loadHistory = async () => {
    setLoadingHist(true);
    try {
      const r = await fetch('/api/exports', { cache: 'no-store' });
      if (r.ok) {
        const data = await r.json();
        setExports(data.exports ?? []);
        setUsage(data.usage ?? null);
      }
    } finally {
      setLoadingHist(false);
    }
  };

  useEffect(() => {
    if (user) loadHistory();
  }, [user]);

  const onChangePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPwd(true);
    setPwd((p) => ({ ...p, msg: '', err: '' }));
    try {
      const r = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.next }),
      });
      const data = await r.json();
      if (r.ok) {
        setPwd({ current: '', next: '', msg: 'Password updated successfully.', err: '' });
      } else {
        setPwd((p) => ({ ...p, err: data.error ?? 'Failed to change password' }));
      }
    } finally {
      setSavingPwd(false);
    }
  };

  const onUpgrade = async (plan: 'pro' | 'business' | 'free') => {
    const r = await fetch('/api/billing/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    if (r.ok) {
      await refresh();
      await loadHistory();
    }
  };

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-20 text-center text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  const limitText =
    usage?.limit === null ? 'Unlimited' : usage ? `${usage.monthTotal} / ${usage.limit}` : '—';
  const overLimit = usage && usage.limit != null && usage.monthTotal >= usage.limit;

  return (
    <SiteLayout>
      <section className="max-w-[1000px] mx-auto px-6 pt-12 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-md">
            <UserIcon size={26} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await logout();
              router.push('/');
            }}
            className="px-3 h-9 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-accent transition-colors flex items-center gap-1.5"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Plan</span>
            <h3 className="text-2xl font-extrabold text-foreground mt-1.5 flex items-center gap-2">
              {PLAN_LABEL[user.plan] ?? user.plan}
              {user.plan !== 'free' && <Crown size={18} className="text-primary" />}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Bulk: {usage?.bulkAllowed ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">This month</span>
            <h3 className="text-2xl font-extrabold text-foreground mt-1.5">{limitText}</h3>
            <p className="text-xs text-muted-foreground mt-1">exports used</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Need more?</span>
            <Link
              href="/pricing"
              className="mt-1.5 inline-flex items-center gap-1.5 text-foreground font-semibold hover:text-primary transition-colors"
            >
              View Pricing →
            </Link>
          </div>
        </div>

        {overLimit && (
          <div className="mb-8 rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3">
            <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">You've reached your Free plan limit</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please purchase a higher plan to continue exporting comment screenshots.
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-3 h-9 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center hover:opacity-90"
            >
              Upgrade
            </Link>
          </div>
        )}

        {/* Quick demo: switch plans (simulated billing) */}
        <div className="mb-10 rounded-xl border border-dashed border-border bg-card/40 p-4">
          <p className="text-xs text-muted-foreground mb-3">
            Demo plan switcher (this stands in for a real billing flow):
          </p>
          <div className="flex flex-wrap gap-2">
            {(['free', 'pro', 'business'] as const).map((p) => (
              <button
                key={p}
                onClick={() => onUpgrade(p)}
                className={`px-3 h-8 rounded-md text-xs font-semibold border transition-colors ${
                  user.plan === p
                    ? 'gradient-primary text-primary-foreground border-transparent'
                    : 'border-border bg-background text-foreground hover:bg-accent'
                }`}
              >
                Switch to {PLAN_LABEL[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Change password</h2>
            </div>
            <form onSubmit={onChangePwd} className="space-y-3">
              <input
                type="password"
                required
                placeholder="Current password"
                value={pwd.current}
                onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="New password (min 6)"
                value={pwd.next}
                onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {pwd.err && <p className="text-xs text-destructive">{pwd.err}</p>}
              {pwd.msg && <p className="text-xs text-emerald-600">{pwd.msg}</p>}
              <button
                type="submit"
                disabled={savingPwd}
                className="h-10 px-4 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-60"
              >
                {savingPwd ? 'Updating…' : 'Update password'}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <History size={16} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Export history</h2>
            </div>
            {loadingHist ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : exports.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No exports yet. Head to the <Link href="/" className="text-primary hover:underline">generator</Link> to create your first one.
              </p>
            ) : (
              <ul className="divide-y divide-border max-h-[360px] overflow-y-auto">
                {exports.map((e) => (
                  <li key={e.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground capitalize">
                        {e.platform} <span className="text-muted-foreground font-normal">· {e.subMode}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {new Date(e.createdAt).toLocaleString()} · {e.mode === 'bulk' ? `Bulk ×${e.count}` : 'Single'}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-accent text-foreground/70 font-medium capitalize">
                      {e.mode}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
