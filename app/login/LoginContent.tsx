"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import {
  MessageSquare,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.3C29.4 34.7 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8L6 33.6C9.3 39.6 16 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.6 5l6.5 5.3C42 35.5 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Rule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          valid ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className={valid ? "text-green-600" : "text-red-500"}>{text}</span>
    </div>
  );
}

export default function LoginContent({ next }: { next: string }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { login, register, resendVerification } = useAuth();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  );
  const [resendBusy, setResendBusy] = useState(false);
  const [resentNotice, setResentNotice] = useState<string | null>(null);
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/;
    // Name (only for signup)
    if (isSignup && !/^[A-Za-z\s]{2,30}$/.test(name.trim())) {
      errors.name = "Enter a valid full name";
    }

    // Email
    if (!emailRegex.test(email.trim())) {
      errors.email = "Enter a valid email address";
    }
    // Password
    if (
      !passwordRules.length ||
      !passwordRules.uppercase ||
      !passwordRules.lowercase ||
      !passwordRules.number ||
      !passwordRules.special
    ) {
      errors.password = "Password does not meet requirements";
    }
    return errors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setError(null);
    setResentNotice(null);
    setBusy(true);
    try {
      const res = isSignup
        ? await register(name.trim(), email.trim(), password)
        : await login(email.trim(), password);

      if (res.ok) {
        toast.success(
          isSignup
            ? "Account created! Logging you in..."
            : "Logged in successfully!",
        );
        router.push(next);
        router.refresh();
        return;
      }
      // @ts-ignore
      if (res.requiresVerification) {
        //@ts-ignore
        setVerificationEmail(res.email || email.trim());
        return;
      }
      // @ts-ignore
      setError(res.error ?? "Something went wrong");
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const onResend = async () => {
    if (!verificationEmail) return;
    setResendBusy(true);
    setResentNotice(null);
    try {
      const r = await resendVerification(verificationEmail);
      setResentNotice(
        r.ok
          ? "Verification email sent. Check your inbox (and spam folder)."
          : "Could not resend right now. Please try again in a moment.",
      );
      toast.success(
        "Verification email sent. Check your inbox (and spam folder).",
      );
    } catch {
      toast.error("Could not resend right now. Please try again in a moment.");
    } finally {
      setResendBusy(false);
    }
  };

  const onGoogle = () => {
    console.log("Initiating Google OAuth flow");
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google?next=${encodeURIComponent(next)}`;
  };

  // ---- Verification awaiting screen ----
  if (verificationEmail) {
    return (
      <SiteLayout>
        <section className="flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-[440px] text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={28} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground mb-2">
              Verify your email
            </h1>
            <p className="text-sm text-muted-foreground mb-1">
              We sent a verification link to
            </p>
            <p className="text-sm font-semibold text-foreground mb-6">
              {verificationEmail}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Click the link in that email to activate your account. You will
              not be able to log in until your email is verified.
            </p>

            <button
              onClick={onResend}
              disabled={resendBusy}
              className="inline-block px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition disabled:opacity-60"
            >
              {resendBusy ? "Sending…" : "Resend verification email"}
            </button>

            {resentNotice && (
              <p className="text-xs text-muted-foreground mt-4">
                {resentNotice}
              </p>
            )}

            <p className="text-sm text-muted-foreground mt-8">
              Wrong email?{" "}
              <button
                onClick={() => {
                  setVerificationEmail(null);
                  setResentNotice(null);
                }}
                className="text-primary font-medium hover:underline"
              >
                Go back
              </button>
            </p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  return (
    <SiteLayout>
      <section className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MessageSquare size={22} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isSignup
                ? "Sign up to export, save history, and unlock bulk mode"
                : "Log in to your Comment tools account"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <button
              type="button"
              onClick={onGoogle}
              className="w-full h-11 mb-4 rounded-lg border border-border bg-background hover:bg-muted/40 transition flex items-center justify-center gap-2 text-sm font-semibold text-foreground"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-border flex-1" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                or
              </span>
              <div className="h-px bg-border flex-1" />
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              {isSignup && (
                <div>
                  <div className="relative">
                    <UserIcon
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setFieldErrors((prev) => ({
                          ...prev,
                          name: undefined,
                        }));
                      }}
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-xs text-red-500 mt-1 text-center">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
              )}
              <div>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="password"
                    minLength={6}
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors((prev) => ({
                        ...prev,
                        password: undefined,
                      }));
                    }}
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                {isSignup && (
                  <div className="text-xs mt-2 space-y-1">
                    <Rule
                      valid={passwordRules.length}
                      text="At least 8 characters"
                    />
                    <Rule
                      valid={passwordRules.uppercase}
                      text="One uppercase letter"
                    />
                    <Rule
                      valid={passwordRules.lowercase}
                      text="One lowercase letter"
                    />
                    <Rule valid={passwordRules.number} text="One number" />
                    <Rule
                      valid={passwordRules.special}
                      text="One special character"
                    />
                  </div>
                )}
                {fieldErrors.password && (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {error && (
                <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={(isSignup && !isPasswordValid) || busy}
                className={`${
                  isSignup
                    ? isPasswordValid
                      ? "gradient-primary"
                      : "bg-gray-300"
                    : "gradient-primary"
                } w-full h-11 rounded-lg text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-all active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60`}
              >
                {busy ? "Please wait…" : isSignup ? "Create account" : "Log in"}
                {!busy && <ArrowRight size={15} />}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError(null);
              }}
              className="text-primary font-medium hover:underline"
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
