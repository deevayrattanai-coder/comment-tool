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
      <section className="max-w-[900px] mx-auto px-6 pt-16 pb-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Legal
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-3 mb-3">
          Privacy Policy
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          Last updated: April 2026
        </p>

        <div className="space-y-6">
          {/* INTRO */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">1. Introduction</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Welcome to <strong>Comment Tools</strong> (“we”, “our”, “us”). We
              respect your privacy and are committed to protecting your personal
              data. This Privacy Policy explains how we collect, use, and
              safeguard your information when you use our platform.
              <br />
              <br />
              By using Comment Tools, you agree to this policy. If you do not
              agree, please discontinue use.
            </p>
          </div>

          {/* DATA COLLECTION */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-3">
              2. Information We Collect
            </h2>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>a. Information You Provide</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Account login details</li>
                <li>Support messages or inquiries</li>
              </ul>

              <p className="pt-2">
                <strong>b. Automatically Collected Data</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Device & browser information</li>
                <li>Usage data (pages visited, features used)</li>
              </ul>

              <p className="pt-2">
                <strong>c. Tool Input Data</strong>
              </p>
              <p>
                Generated content is processed in real-time. We do not store
                user-generated content permanently unless required for
                functionality or analytics.
              </p>
            </div>
          </div>

          {/* USAGE */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Provide and operate our services</li>
              <li>Process payments and subscriptions</li>
              <li>Improve product performance</li>
              <li>Prevent fraud and misuse</li>
              <li>Communicate updates and support</li>
            </ul>
          </div>

          {/* PAYMENTS */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">4. Payments & Billing</h2>
            <p className="text-sm text-muted-foreground">
              Payments are securely processed via third-party providers (such as
              Stripe or Razorpay). We do not store your full payment details.
              Billing data is handled according to provider security standards.
            </p>
          </div>

          {/* COOKIES */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">5. Cookies & Tracking</h2>
            <p className="text-sm text-muted-foreground">
              We use cookies to maintain sessions, analyze traffic, and improve
              user experience. You can disable cookies in your browser settings.
            </p>
          </div>

          {/* DATA SHARING */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">6. Data Sharing</h2>
            <p className="text-sm text-muted-foreground">
              We do NOT sell your personal data. We may share data only with
              trusted services such as payment processors, analytics providers,
              or when required by law.
            </p>
          </div>

          {/* RETENTION */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">7. Data Retention</h2>
            <p className="text-sm text-muted-foreground">
              We retain your data only as long as necessary for service
              operation, legal compliance, and security purposes. After that,
              data is deleted or anonymized.
            </p>
          </div>

          {/* RIGHTS */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">8. Your Rights</h2>
            <p className="text-sm text-muted-foreground">
              Depending on your location, you may have rights to access,
              correct, delete your data, or withdraw consent. Contact us to
              exercise these rights.
            </p>
          </div>

          {/* SECURITY */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">9. Security</h2>
            <p className="text-sm text-muted-foreground">
              We use industry-standard measures to protect your data, but no
              system is 100% secure.
            </p>
          </div>

          {/* CHILDREN */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">10. Children’s Privacy</h2>
            <p className="text-sm text-muted-foreground">
              Comment Tools is not intended for users under 13 (or 18 depending
              on jurisdiction).
            </p>
          </div>

          {/* LINKS */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">11. Third-Party Links</h2>
            <p className="text-sm text-muted-foreground">
              Our site may contain links to third-party websites. We are not
              responsible for their policies.
            </p>
          </div>

          {/* UPDATES */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">
              12. Updates to This Policy
            </h2>
            <p className="text-sm text-muted-foreground">
              We may update this policy periodically. Continued use means
              acceptance of updates.
            </p>
          </div>

          {/* CONTACT */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">13. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              For any questions, contact us at{" "}
              <a
                href="mailto:support@commenttools.com"
                className="text-primary font-medium hover:underline"
              >
                support@commenttools.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
