import SiteLayout from "@/components/SiteLayout";

export const metadata = {
  title: "Terms of Service | Comment Tools",
  description:
    "Read the Terms of Service for Comment Tools. Understand your rights, responsibilities, and how to use our platform safely.",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <section className="max-w-[900px] mx-auto px-6 pt-16 pb-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Legal
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-3 mb-3">
          Terms of Service
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          Last updated: April 2026
        </p>

        <div className="space-y-6">
          {/* 1 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">1. Agreement to Terms</h2>
            <p className="text-sm text-muted-foreground">
              By accessing or using <strong>Comment Tools</strong>, you agree to
              these Terms. If you do not agree, you must stop using the service.
            </p>
          </div>

          {/* 2 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-3">
              2. Description of Service
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              Comment Tools provides tools to generate and create social media
              comment-style content for:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>TikTok</li>
              <li>Instagram</li>
              <li>YouTube</li>
              <li>X (Twitter)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              This is a creative and simulation tool and is not affiliated with
              these platforms.
            </p>
          </div>

          {/* 3 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">3. Eligibility</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>
                You must be at least 18 years old (or legal age in your region)
              </li>
              <li>You must provide accurate information</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">4. User Responsibilities</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>
                Do not use the tool for illegal, harmful, or misleading
                activities
              </li>
              <li>Do not impersonate others</li>
              <li>Do not create deceptive or fraudulent content</li>
              <li>Do not violate platform rules or laws</li>
            </ul>
          </div>

          {/* 5 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">5. User Content</h2>
            <p className="text-sm text-muted-foreground">
              You retain ownership of content you create. You are solely
              responsible for how you use generated content. We are not liable
              for misuse.
            </p>
          </div>

          {/* 6 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">
              6. Payments & Subscriptions
            </h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Some features may require payment</li>
              <li>Payments are processed via secure third-party providers</li>
              <li>Prices may change with prior notice</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Refund Policy:</strong> Refunds may be provided at our
              discretion or as required by law. Abuse of refund policy may lead
              to account termination.
            </p>
          </div>

          {/* 7 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">7. Intellectual Property</h2>
            <p className="text-sm text-muted-foreground">
              All platform content, branding, and software belong to Comment
              Tools. You may not copy, resell, or exploit the service.
            </p>
          </div>

          {/* 8 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">8. Prohibited Activities</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Reverse engineering the platform</li>
              <li>Using bots or automation to abuse the system</li>
              <li>Attempting unauthorized access</li>
            </ul>
          </div>

          {/* 9 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">9. Service Availability</h2>
            <p className="text-sm text-muted-foreground">
              We do not guarantee uninterrupted or error-free service. Features
              may be modified or discontinued at any time.
            </p>
          </div>

          {/* 10 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">10. Termination</h2>
            <p className="text-sm text-muted-foreground">
              We may suspend or terminate access if you violate these terms or
              misuse the platform.
            </p>
          </div>

          {/* 11 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">11. Disclaimer</h2>
            <p className="text-sm text-muted-foreground">
              Comment Tools is provided “as is” without warranties of any kind.
            </p>
          </div>

          {/* 12 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">
              12. Limitation of Liability
            </h2>
            <p className="text-sm text-muted-foreground">
              We are not liable for indirect or consequential damages, loss of
              data, revenue, or misuse of generated content.
            </p>
          </div>

          {/* 13 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">13. Governing Law</h2>
            <p className="text-sm text-muted-foreground">
              These terms are governed by the laws of India.
            </p>
          </div>

          {/* 14 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">14. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground">
              We may update these terms at any time. Continued use of the
              service means you accept the updated terms.
            </p>
          </div>

          {/* 15 */}
          <div className="p-5 rounded-2xl border bg-background shadow-sm">
            <h2 className="text-lg font-bold mb-2">15. Contact</h2>
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
