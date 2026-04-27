"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  plan: "free" | "pro" | "business";
};

export type AuthResult =
  | { ok: true; user?: AuthUser }
  | {
      ok: false;
      error?: string;
      requiresVerification?: boolean;
      email?: string;
    };

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResult>;
  resendVerification: (email: string) => Promise<{ ok: boolean }>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await r.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await r.json();
      if (!r.ok) {
        return {
          ok: false,
          error: data.error ?? "Login failed",
          requiresVerification: !!data.requiresVerification,
          email: data.email,
        };
      }
      setUser(data.user);
      return { ok: true, user: data.user };
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<AuthResult> => {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await r.json();
      if (!r.ok) {
        return {
          ok: false,
          error: data.error ?? "Sign up failed",
          requiresVerification: !!data.requiresVerification,
          email: data.email,
        };
      }
      // Successful register no longer logs the user in — they must verify first.
      if (data.requiresVerification) {
        return { ok: false, requiresVerification: true, email: data.email };
      }
      if (data.user) setUser(data.user);
      return { ok: true, user: data.user };
    },
    [],
  );

  const resendVerification = useCallback(async (email: string) => {
    try {
      const r = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return { ok: r.ok };
    } catch {
      return { ok: false };
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <Ctx.Provider
      value={{
        user,
        loading,
        refresh,
        login,
        register,
        resendVerification,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
