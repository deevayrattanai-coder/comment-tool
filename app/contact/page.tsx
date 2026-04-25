'use client';

import { useState } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="max-w-[960px] mx-auto px-6 pt-20 pb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get in touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05] mt-3 mb-4" style={{ textWrap: 'balance' }}>
            We would love to hear from you
          </h1>
          <p className="text-base text-muted-foreground max-w-[480px] mx-auto">
            Feedback, partnership ideas, bug reports, feature requests — send it our way.
          </p>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-10">
          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><Mail size={16} /></div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">hello@commentcraft.com</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><MapPin size={16} /></div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Office</h3>
              <p className="text-sm text-muted-foreground">Stockholm, Sweden</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><MessageCircle size={16} /></div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Response time</h3>
              <p className="text-sm text-muted-foreground">Within 24 hours on business days.</p>
            </div>
          </aside>

          <div className="rounded-2xl border border-border bg-card p-7">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Send size={22} />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Message sent</h3>
                <p className="text-sm text-muted-foreground">Thanks for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Your name</label>
                    <input
                      type="text"
                      required
                      className="w-full h-10 px-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full h-10 px-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full h-10 px-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full p-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Tell us a bit more..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  Send message <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
