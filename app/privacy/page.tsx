import SiteLayout from "@/components/SiteLayout";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy | Comment Tools",
  description:
    "Learn how Comment Tools collects, uses, and protects your data. Your privacy and security are our top priorities.",
  path: "/privacy-policy",
});
export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="max-w-[820px] mx-auto px-6 pt-16 pb-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-3 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: April 25, 2026
        </p>

        <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed space-y-5">
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              1. Information we collect
            </h2>
            <p>
              When you create an account, we store your name, email address, and
              a hashed version of your password. We never store passwords in
              plain text. When you export a comment screenshot, we record the
              platform, template, mode (single or bulk), and count of items
              exported so we can show you your usage history.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              2. How we use your information
            </h2>
            <p>
              We use your account information to authenticate you, enforce plan
              limits, and display your export history on your profile page. We
              do not sell or share your personal information with third parties.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              3. Cookies
            </h2>
            <p>
              We use a single secure, HTTP-only session cookie to keep you
              logged in. We do not use third-party tracking cookies on our
              marketing pages.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              4. Data retention
            </h2>
            <p>
              We keep your account information for as long as your account
              remains active. You may request deletion of your account at any
              time by contacting us at hello@commentcraft.com.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              5. Children's privacy
            </h2>
            <p>
              CommentCraft is not directed to children under the age of 13 and
              we do not knowingly collect personal information from children
              under 13.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              6. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. The "last updated"
              date at the top of the page indicates when changes were last made.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">
              7. Contact
            </h2>
            <p>
              Questions about this Privacy Policy? Email us at{" "}
              <a
                className="text-primary hover:underline"
                href="mailto:hello@commentcraft.com"
              >
                hello@commentcraft.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </SiteLayout>
  );
}
