"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

let scriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const existing = document.querySelector(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_SCRIPT_URL;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export type RazorpayCheckoutProps = {
  plan: "monthly" | "annual";
  label: string;
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
};

export default function RazorpayCheckout({
  plan,
  label,
  className,
  children,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const [busy, setBusy] = useState(false);

  // Pre-warm the script so the first click doesn't pay the load latency.
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const start = useCallback(async () => {
    setBusy(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay) {
        onError?.("Could not load Razorpay. Check your internet connection.");
        return;
      }

      // 1. Server creates the order (and remembers it for verification).
      const orderRes = await fetch("/api/billing/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (orderRes.status === 401) {
        onError?.("Please log in before purchasing a plan.");
        return;
      }
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        onError?.(orderData?.error ?? "Could not create order");
        return;
      }

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Comment Tools",
        description: `${orderData.planLabel} plan`,
        prefill: {
          name: orderData.user?.name ?? "",
          email: orderData.user?.email ?? "",
        },
        notes: { plan },
        theme: { color: "#7c3aed" },
        modal: {
          ondismiss: () => setBusy(false),
        },
        handler: async (resp: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // 2. Server verifies signature + upgrades plan.
          try {
            const v = await fetch("/api/billing/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            const vd = await v.json();
            if (v.ok) {
              onSuccess?.();
            } else {
              onError?.(vd?.error ?? "Verification failed");
            }
          } catch (e: any) {
            onError?.(e?.message ?? "Verification request failed");
          } finally {
            setBusy(false);
          }
        },
      });

      rzp.on("payment.failed", (resp: any) => {
        onError?.(
          resp?.error?.description ?? "Payment failed. Please try again.",
        );
        setBusy(false);
      });

      rzp.open();
    } catch (e: any) {
      onError?.(e?.message ?? "Something went wrong");
      setBusy(false);
    }
  }, [plan, onSuccess, onError]);

  return (
    <button
      type="button"
      onClick={start}
      disabled={busy}
      className={
        className ??
        "w-full py-2.5 rounded-lg font-semibold text-sm gradient-primary text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
      }
    >
      {busy ? <Loader2 size={14} className="animate-spin" /> : null}
      {children ?? label}
    </button>
  );
}
