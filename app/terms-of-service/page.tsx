import SiteLayout from "@/components/SiteLayout";

export const metadata = {
  title: "Terms of Service | Comment Tools",
  description:
    "Read the Terms of Service for Comment Tools. Understand your rights, responsibilities, and how to use our platform safely.",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute top-0 left-1/2 h-[420px] w-full -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

          {/* Header */}
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex overflow-hidden rounded-full border border-purple-500/20 bg-white/[0.03] p-[1px] shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-full bg-[#0f172a]/90 px-5 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent">
                  Legal
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>

          </div>

          {/* Intro */}
          <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              Welcome to Comment Tools. These Terms of Service (“Terms”) govern
              your access to and use of our website, tools, and services. By
              accessing or using Comment Tools, you agree to be bound by these
              Terms. If you do not agree, you may not use our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">

            {/* 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                1. Use of Services
              </h2>

              <p className="mb-5 text-base leading-8 text-slate-300">
                By using Comment Tools, you agree to use the platform only for
                lawful purposes and in accordance with these Terms.
              </p>

              <p className="mb-4 text-base font-semibold text-white">
                You agree that you will NOT:
              </p>

              <ul className="space-y-3 text-base text-slate-300">
                <li>• Use generated content to harass, abuse, threaten, or harm others</li>
                <li>• Use generated comments or screenshots to spread misinformation</li>
                <li>• Present generated content as real or misleading evidence</li>
                <li>• Use the tool for illegal, fraudulent, or deceptive activities</li>
                <li>• Violate any applicable laws, regulations, or platform policies</li>
              </ul>

              <p className="mt-5 text-base leading-8 text-slate-300">
                You are solely responsible for how you use the generated
                content.
              </p>
            </div>

            {/* 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                2. Nature of Generated Content
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>
                  • Comment Tools provides simulated comment generation for
                  platforms such as social media
                </li>
                <li>
                  • All generated comments, screenshots, and outputs are
                  fictional and for demonstration purposes only
                </li>
                <li>
                  • Users must ensure that such content is clearly represented
                  as non-authentic when used publicly
                </li>
                <li>
                  • We do not guarantee resemblance to real individuals,
                  accounts, or actual engagement
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                3. Account & Access
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>• Some features require user registration and login</li>
                <li>
                  • You are responsible for maintaining the confidentiality of
                  your account credentials
                </li>
                <li>
                  • You agree to provide accurate and complete information
                </li>
                <li>
                  • We reserve the right to suspend or terminate accounts that
                  violate these Terms
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                4. Subscription & Payments
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>
                  • Certain features (such as bulk generation) are available
                  under paid plans
                </li>
                <li>
                  • All payments are processed securely through third-party
                  payment providers
                </li>
                <li>
                  • Subscription fees are billed as per the selected plan
                  (monthly/annual)
                </li>
                <li>
                  • Unless otherwise stated, payments are non-refundable, except
                  where required by law
                </li>
                <li>
                  • We reserve the right to modify pricing or features at any
                  time
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                5. Intellectual Property
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>
                  • All website content, design, and software are owned by
                  Comment Tools
                </li>
                <li>
                  • You may not copy, distribute, or reverse-engineer any part
                  of the platform
                </li>
                <li>
                  • Generated outputs may be used by you, but responsibility for
                  usage lies with you
                </li>
              </ul>
            </div>

            {/* 6 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                6. Prohibited Use
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>
                  • Use automated systems (bots, scrapers) to access the
                  platform
                </li>
                <li>• Attempt to disrupt or damage the service</li>
                <li>• Reverse engineer or exploit vulnerabilities</li>
                <li>
                  • Use the platform in a way that violates third-party rights
                </li>
              </ul>
            </div>

            {/* 7 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                7. Limitation of Liability
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>
                  • Comment Tools is not responsible for how users utilize
                  generated content
                </li>
                <li>
                  • We are not liable for any direct, indirect, incidental, or
                  consequential damages
                </li>
                <li>• Your use of the platform is at your own risk</li>
              </ul>
            </div>

            {/* 8 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                8. Disclaimer of Warranty
              </h2>

              <p className="mb-5 text-base leading-8 text-slate-300">
                Comment Tools is provided on an “as is” and “as available”
                basis.
              </p>

              <p className="mb-4 text-base font-semibold text-white">
                We do not guarantee that:
              </p>

              <ul className="space-y-3 text-base text-slate-300">
                <li>• The service will be uninterrupted or error-free</li>
                <li>• The output will meet your expectations</li>
                <li>
                  • The platform will always be secure or available
                </li>
              </ul>
            </div>

            {/* 9 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                9. Third-Party Platforms
              </h2>

              <p className="text-base leading-8 text-slate-300">
                Comment Tools is not affiliated with, endorsed by, or associated
                with any social media platforms. All trademarks, platform names,
                and logos belong to their respective owners.
              </p>
            </div>

            {/* 10 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                10. Termination
              </h2>

              <ul className="space-y-3 text-base text-slate-300">
                <li>• You violate these Terms</li>
                <li>• You misuse the platform</li>
                <li>• Required by law or legal authorities</li>
              </ul>
            </div>

            {/* 11 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                11. Changes to Terms
              </h2>

              <p className="text-base leading-8 text-slate-300">
                We may update these Terms from time to time. Continued use of
                the platform after changes means you accept the updated Terms.
              </p>
            </div>

            {/* 12 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">
                12. Contact Us
              </h2>

              <div className="space-y-3 text-base text-slate-300">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:commenttools.business@gmail.com"
                    className="font-medium text-purple-300 transition hover:text-purple-200"
                  >
                    commenttools.business@gmail.com
                  </a>
                </p>

                <p>
                  Website:{" "}
                  <a
                    href="https://commenttools.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-purple-300 transition hover:text-purple-200"
                  >
                    commenttools.com
                  </a>
                </p>
              </div>
            </div>

            {/* Important Note */}
            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6 shadow-xl backdrop-blur-2xl sm:p-8">
              <div className="flex items-start gap-4">

                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10 text-xl">
                  ⚠️
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-bold text-white">
                    Important Note
                  </h2>

                  <p className="text-base leading-8 text-slate-300">
                    Always ensure that generated content is used ethically and
                    transparently. Misuse may result in account suspension or
                    legal consequences.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}