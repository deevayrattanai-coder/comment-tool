import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to get started',
    features: [
      'All 4 platforms (TikTok, Instagram, YouTube, X)',
      '7 comment templates',
      'Single comment generation',
      'Light & dark mode previews',
      'PNG export & clipboard copy',
      'Custom avatars & verified badges',
      'Smart randomizer profiles',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For power users and agencies',
    features: [
      'Everything in Free',
      'Bulk comment generation',
      'Priority export quality (4x)',
      'Custom brand watermarks',
      'API access for automation',
      'Priority support',
      'Early access to new templates',
    ],
    cta: 'Coming Soon',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored for large teams',
    features: [
      'Everything in Pro',
      'Unlimited API calls',
      'White-label solution',
      'Dedicated account manager',
      'Custom template development',
      'SLA guarantee',
      'Team collaboration tools',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes, Pro is month-to-month. Cancel from your account settings — no questions asked.' },
  { q: 'Do you offer refunds?', a: 'We offer a 14-day refund window on Pro for any reason.' },
  { q: 'Is there a student discount?', a: 'Yes — 50% off Pro with a valid .edu email. Contact us to request the discount code.' },
];

export default function PricingPage() {
  return (
    <SiteLayout>
      <section className="max-w-[920px] mx-auto px-6 pt-20 pb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Pricing</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05] mt-3 mb-4" style={{ textWrap: 'balance' }}>
          Simple, transparent pricing
        </h1>
        <p className="text-base text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
          Start free with full single-mode functionality. Upgrade when you need bulk generation and advanced features.
        </p>
      </section>

      <section className="max-w-[1040px] mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 relative ${
                plan.highlighted ? 'border-primary bg-card shadow-xl md:scale-[1.02]' : 'border-border bg-card'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Most popular
                </div>
              )}
              <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-4xl font-extrabold text-foreground tabular-nums">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.name === 'Free' ? (
                <Link
                  href="/"
                  className="block w-full text-center py-2.5 rounded-lg font-semibold text-sm border border-border text-foreground hover:bg-accent transition-all active:scale-[0.97]"
                >
                  {plan.cta}
                </Link>
              ) : plan.name === 'Enterprise' ? (
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 rounded-lg font-semibold text-sm border border-border text-foreground hover:bg-accent transition-all active:scale-[0.97]"
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-2.5 rounded-lg font-semibold text-sm gradient-primary text-primary-foreground shadow-md opacity-90 cursor-not-allowed"
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground tracking-tight text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-border bg-background p-5 group">
                <summary className="font-medium text-foreground text-sm cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
