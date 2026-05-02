"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { useAuth } from "@/components/AuthProvider";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import {
  User as UserIcon,
  LogOut,
  Lock,
  History,
  Crown,
  AlertCircle,
  Clock,
} from "lucide-react";

type ExportRow = {
  id: number;
  platform: string;
  subMode: string;
  mode: string;
  count: number;
  createdAt: string;
};

type PerPlatform = Record<
  string,
  { used: number; limit: number; remaining: number; nextResetAt: string | null }
>;

type Usage = {
  plan: string;
  unlimited: boolean;
  bulkAllowed: boolean;
  windowHours: number;
  perPlatform: PerPlatform;
  planExpiresAt: string | null;
};

const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  monthly: "Monthly",
  annual: "Annual",
  pro: "Pro",
  business: "Business",
};

const PLATFORM_LABEL: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  twitter: "X (Twitter)",
};

function formatResetIn(iso: string | null): string {
  if (!iso) return "—";
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "now";
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const mins = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export default function ProfilePage() {
  const { user, loading, logout, refresh } = useAuth();
  const router = useRouter();
  const [exports, setExports] = useState<ExportRow[]>([]);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loadingHist, setLoadingHist] = useState(true);
  const [pwd, setPwd] = useState({ current: "", next: "", msg: "", err: "" });
  const [savingPwd, setSavingPwd] = useState(false);
  const [billingMsg, setBillingMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login?next=/profile");
  }, [loading, user, router]);

  const loadHistory = async () => {
    setLoadingHist(true);
    try {
      const r = await fetch("/api/exports", { cache: "no-store" });
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
    setPwd((p) => ({ ...p, msg: "", err: "" }));
    try {
      const r = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwd.current,
          newPassword: pwd.next,
        }),
      });
      const data = await r.json();
      if (r.ok) {
        setPwd({
          current: "",
          next: "",
          msg: "Password updated successfully.",
          err: "",
        });
      } else {
        setPwd((p) => ({
          ...p,
          err: data.error ?? "Failed to change password",
        }));
      }
    } finally {
      setSavingPwd(false);
    }
  };

  const onDowngrade = async () => {
    if (!confirm("Cancel your paid plan and switch back to Free?")) return;
    const r = await fetch("/api/billing/upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: "free" }),
    });
    if (r.ok) {
      setBillingMsg({ type: "ok", text: "Switched to Free plan." });
      await refresh();
      await loadHistory();
    } else {
      const d = await r.json().catch(() => ({}));
      setBillingMsg({ type: "err", text: d?.error ?? "Could not change plan" });
    }
  };

  const onPaymentSuccess = async () => {
    setBillingMsg({
      type: "ok",
      text: "Payment verified. Your plan is active.",
    });
    await refresh();
    await loadHistory();
  };

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-20 text-center text-muted-foreground">
          Loading…
        </div>
      </SiteLayout>
    );
  }

  const plan = usage?.plan ?? user.plan ?? "free";
  const isFree = plan === "free";

  return (
    <SiteLayout>
      <section className="max-w-[1000px] mx-auto px-6 pt-12 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-md">
            <UserIcon size={26} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-foreground">
              {user.name}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="px-3 h-9 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-accent transition-colors flex items-center gap-1.5"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Plan
            </span>
            <h3 className="text-2xl font-extrabold text-foreground mt-1.5 flex items-center gap-2">
              {PLAN_LABEL[plan] ?? plan}
              {!isFree && <Crown size={18} className="text-primary" />}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Bulk: {usage?.bulkAllowed ? "Enabled" : "Disabled"}
            </p>
            {usage?.planExpiresAt && (
              <p className="text-[11px] text-muted-foreground mt-1">
                Renews / expires:{" "}
                {new Date(usage.planExpiresAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5 md:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Last 24 hours
            </span>
            {usage?.unlimited ? (
              <h3 className="text-xl font-extrabold text-foreground mt-1.5">
                Unlimited exports
              </h3>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                {Object.entries(usage?.perPlatform ?? {}).map(([p, info]) => (
                  <div
                    key={p}
                    className="rounded-lg border border-border bg-background p-2.5"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      {PLATFORM_LABEL[p] ?? p}
                    </p>
                    <p className="text-base font-extrabold text-foreground mt-0.5 tabular-nums">
                      {info.used} / {info.limit}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock size={10} />
                      {info.used > 0 && info.nextResetAt
                        ? `+1 in ${formatResetIn(info.nextResetAt)}`
                        : "All credits available"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Billing section */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Crown size={16} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Billing</h2>
          </div>

          {billingMsg && (
            <div
              className={`mb-4 text-xs rounded-md px-3 py-2 ${
                billingMsg.type === "ok"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {billingMsg.text}
            </div>
          )}

          {isFree ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Upgrade to unlock unlimited exports and bulk generation.
                Payments are processed securely through Razorpay.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Monthly
                  </p>
                  <p className="text-2xl font-extrabold text-foreground mt-1">
                    ₹329
                    <span className="text-xs text-muted-foreground font-normal">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Unlimited exports + bulk
                  </p>
                  <RazorpayCheckout
                    plan="monthly"
                    label="Buy Monthly"
                    onSuccess={onPaymentSuccess}
                    onError={(t) => setBillingMsg({ type: "err", text: t })}
                  />
                </div>
                <div className="rounded-xl border border-primary bg-background p-4 relative">
                  <span className="absolute -top-2 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full gradient-primary text-primary-foreground">
                    Best value
                  </span>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Annual
                  </p>
                  <p className="text-2xl font-extrabold text-foreground mt-1">
                    ₹1,699
                    <span className="text-xs text-muted-foreground font-normal">
                      /yr
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Unlimited exports + bulk
                  </p>
                  <RazorpayCheckout
                    plan="annual"
                    label="Buy Annual"
                    onSuccess={onPaymentSuccess}
                    onError={(t) => setBillingMsg({ type: "err", text: t })}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-foreground font-semibold">
                  You're on the {PLAN_LABEL[plan]} plan
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {usage?.planExpiresAt
                    ? `Active until ${new Date(usage.planExpiresAt).toLocaleString()}`
                    : "No expiration on file"}
                </p>
              </div>
              <button
                onClick={onDowngrade}
                className="px-3 h-9 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-accent"
              >
                Switch to Free
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                Change password
              </h2>
            </div>
            <form onSubmit={onChangePwd} className="space-y-3">
              <input
                type="password"
                required
                placeholder="Current password"
                value={pwd.current}
                onChange={(e) =>
                  setPwd((p) => ({ ...p, current: e.target.value }))
                }
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="New password (min 6)"
                value={pwd.next}
                onChange={(e) =>
                  setPwd((p) => ({ ...p, next: e.target.value }))
                }
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {pwd.err && <p className="text-xs text-destructive">{pwd.err}</p>}
              {pwd.msg && <p className="text-xs text-emerald-600">{pwd.msg}</p>}
              <button
                type="submit"
                disabled={savingPwd}
                className="h-10 px-4 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-60"
              >
                {savingPwd ? "Updating…" : "Update password"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <History size={16} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                Export history
              </h2>
            </div>
            {loadingHist ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : exports.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No exports yet. Head to the{" "}
                <Link href="/" className="text-primary hover:underline">
                  generator
                </Link>{" "}
                to create your first one.
              </p>
            ) : (
              <ul className="divide-y divide-border max-h-[360px] overflow-y-auto">
                {exports.map((e) => (
                  <li
                    key={e.id}
                    className="py-2.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground capitalize">
                        {e.platform}{" "}
                        <span className="text-muted-foreground font-normal">
                          · {e.subMode}
                        </span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {new Date(e.createdAt).toLocaleString()} ·{" "}
                        {e.mode === "bulk" ? `Bulk ×${e.count}` : "Single"}
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
