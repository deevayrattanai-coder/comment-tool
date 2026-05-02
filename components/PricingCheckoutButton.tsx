"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import RazorpayCheckout from "./RazorpayCheckout";
import { toast } from "sonner";

/**
 * Pricing page CTA. If logged in, opens Razorpay; otherwise routes to /login
 * with the pricing page as the next destination.
 */
export default function PricingCheckoutButton({
  plan,
  label,
}: {
  plan: "monthly" | "annual";
  label: string;
}) {
  const router = useRouter();
  const { user, refresh } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => {
          setRedirecting(true);
          router.push(`/login?next=/pricing`);
        }}
        disabled={redirecting}
        className="w-full py-2.5 rounded-lg font-semibold text-sm gradient-primary text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-60"
      >
        {redirecting ? "Redirecting…" : `Sign in to ${label.toLowerCase()}`}
      </button>
    );
  }

  return (
    <RazorpayCheckout
      plan={plan}
      label={label}
      onSuccess={async () => {
        toast.success("Payment verified. Your plan is now active.");
        await refresh();
        router.push("/profile");
      }}
      onError={(t) => toast.error(t)}
    />
  );
}
