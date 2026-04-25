import SiteLayout from '@/components/SiteLayout';

export const metadata = { title: 'Terms of Service — CommentCraft' };

export default function TermsPage() {
  return (
    <SiteLayout>
      <section className="max-w-[820px] mx-auto px-6 pt-16 pb-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Legal</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-3 mb-3">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: April 25, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed space-y-5">
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">1. Acceptance of terms</h2>
            <p>
              By accessing or using CommentCraft, you agree to be bound by these Terms of Service and our Privacy
              Policy. If you do not agree, please do not use the service.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">2. Description of service</h2>
            <p>
              CommentCraft generates mock comment screenshots that resemble the user interface of social media
              platforms including TikTok, Instagram, YouTube, and X. These screenshots are for demonstration,
              educational, marketing, and content creation purposes only.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">3. Acceptable use</h2>
            <p>
              You may not use CommentCraft to create deceptive content intended to defraud, harass, defame, or
              impersonate real individuals. You are solely responsible for the content of every comment you
              generate and how you use the resulting images.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">4. Accounts</h2>
            <p>
              You are responsible for maintaining the security of your account credentials and for all activity
              that occurs under your account. Notify us immediately at hello@commentcraft.com if you suspect any
              unauthorized use.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">5. Plans and billing</h2>
            <p>
              We offer a Free plan with monthly export limits, plus paid Pro and Business plans with higher limits
              and bulk generation. Paid plans are billed in the currency and on the cadence shown on the pricing
              page at the time of purchase.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">6. Intellectual property</h2>
            <p>
              The CommentCraft platform, design system, and code are the intellectual property of CommentCraft.
              Logos, trademarks, and trade dress of TikTok, Instagram, YouTube and X belong to their respective
              owners and are referenced under fair use for compatibility purposes.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">7. Disclaimer of warranties</h2>
            <p>
              CommentCraft is provided "as is" without warranties of any kind, either express or implied. We do
              not warrant that the service will be uninterrupted, error-free, or perfectly accurate.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms. You may stop using
              the service at any time.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mt-2 mb-2">9. Contact</h2>
            <p>
              Questions about these Terms? Email us at{' '}
              <a className="text-primary hover:underline" href="mailto:hello@commentcraft.com">
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
