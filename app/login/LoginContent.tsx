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
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function LoginContent({ next }: { next: string }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    // Name (only for signup)
    if (isSignup && !/^[A-Za-z\s]{2,50}$/.test(name.trim())) {
      errors.name = "Enter a valid full name";
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address";
    }
    // Password
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setError(null);
    setBusy(true);
    try {
      const res = isSignup
        ? await register(name.trim(), email.trim(), password)
        : await login(email.trim(), password);

      if (!res.ok) {
        setError(res.error ?? "Something went wrong");
      } else {
        router.push(next);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  };

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
                : "Log in to your CommentCraft account"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
                disabled={busy}
                className="w-full h-11 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-all active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60"
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
