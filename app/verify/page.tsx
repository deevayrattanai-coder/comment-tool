"use client";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Search = { status?: string };

export default function VerifyPage({ searchParams }: { searchParams: Search }) {
  const params = useSearchParams();
  const status = params.get("status");
  const isSuccess = status === "success";
  const title = isSuccess
    ? "Email verified"
    : status === "expired"
      ? "Link expired"
      : "Verification failed";
  const message = isSuccess
    ? "Your account is now active. You are logged in and can start using CommentCraft."
    : status === "expired"
      ? "This verification link has expired or has already been used. You can request a new one from the login page."
      : "We could not verify your email with this link. Please request a new verification email.";

  return (
    <SiteLayout>
      <section className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-[440px] text-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${
              isSuccess
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {isSuccess ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground mb-2">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">{message}</p>
          <Link
            href={isSuccess ? "/profile" : "/login"}
            className="inline-block px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition"
          >
            {isSuccess ? "Go to your profile" : "Back to login"}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
