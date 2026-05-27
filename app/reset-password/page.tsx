"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function Rule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${valid ? "bg-green-500" : "bg-red-500"}`} />
      <span className={valid ? "text-green-600" : "text-red-500"}>{text}</span>
    </div>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const valid = Object.values(rules).every(Boolean);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || !token) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/profile"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive font-semibold">Invalid reset link.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">Password set!</h2>
        <p className="text-sm text-muted-foreground">Redirecting you to your profile…</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-md">
          <Lock size={22} className="text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Set a new password</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Choose a strong password for your account.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-xs mt-2 space-y-1">
              <Rule valid={rules.length} text="At least 8 characters" />
              <Rule valid={rules.uppercase} text="One uppercase letter" />
              <Rule valid={rules.lowercase} text="One lowercase letter" />
              <Rule valid={rules.number} text="One number" />
              <Rule valid={rules.special} text="One special character" />
            </div>
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!valid || busy}
            className="w-full h-11 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition disabled:opacity-60"
          >
            {busy ? "Saving…" : "Set password & log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <SiteLayout>
      <section className="flex items-center justify-center px-6 py-20">
        <Suspense fallback={<div>Loading…</div>}>
          <ResetPasswordForm />
        </Suspense>
      </section>
    </SiteLayout>
  );
}
