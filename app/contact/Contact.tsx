"use client";

import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { Mail, MapPin, Send, MessageCircle, Loader } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ErrorState = Partial<FormState>;

export default function Contact() {
  const [sent, setSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const validate = (): ErrorState => {
    const newErrors: ErrorState = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/;
    if (!/^[A-Za-z\s]{2,50}$/.test(form.name)) {
      newErrors.name = "Enter a valid name (only letters)";
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (form.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSent(true);
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(
          data?.error || "Could not send your message. Please try again.",
        );
        return;
      }
      setSent(true);
    } catch (err) {
      setServerError("Network error. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SiteLayout>
      {/* CONTACT HERO */}
      <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-600/10 via-background to-primary/10 p-10 md:p-16 text-center">
          {/* subtle glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-[700px] mx-auto">
            {/* small label */}
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 inline-block">
              Contact
            </span>

            {/* headline */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              Get in Touch with Our Team
            </h1>

            {/* subheadline */}
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-[600px] mx-auto">
              Whether you have a question, need support, or want to explore
              partnerships — we’re here to help.
            </p>

            {/* trust line */}
            <p className="text-xs text-muted-foreground mt-5">
              Typically respond within 24 hours
            </p>

            {/* optional CTA (recommended) */}
            <div className="mt-6">
              <a
                href="#contact-form"
                className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                Send a Message →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="max-w-[960px] mx-auto px-6 pt-20 pb-20"
        id="contact-form"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Get in touch
          </span>
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05] mt-3 mb-4"
            style={{ textWrap: "balance" }}
          >
            We would love to hear from you
          </h1>
          <p className="text-base text-muted-foreground max-w-[480px] mx-auto">
            Feedback, partnership ideas, bug reports, feature requests — send it
            our way.
          </p>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-10">
          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Mail size={16} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Email
              </h3>
              <p className="text-sm text-muted-foreground">
                commenttools.business@gmail.com
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <MapPin size={16} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Office
              </h3>
              <p className="text-sm text-muted-foreground">Stockholm, Sweden</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <MessageCircle size={16} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Response time
              </h3>
              <p className="text-sm text-muted-foreground">
                Within 24 hours on business days.
              </p>
            </div>
          </aside>

          <div className="rounded-2xl border border-border bg-card p-7">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Send size={22} />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Message sent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. We will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Your name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      name={"name"}
                      onChange={handleChange}
                      className={`input ${errors.name ? "border-red-500 w-full h-10 px-3.5 rounded-lg border  bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none" : "w-full h-10 px-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"}`}
                      placeholder="Jane"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      name="email"
                      onChange={handleChange}
                      className={`input ${errors.email ? "border-red-500 w-full h-10 px-3.5 rounded-lg border  bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none" : "w-full h-10 px-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"}`}
                      placeholder="jane@company.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    name="subject"
                    onChange={handleChange}
                    className={`input ${errors.subject ? "border-red-500 w-full h-10 px-3.5 rounded-lg border  bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none" : "w-full h-10 px-3.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"}`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    name="message"
                    className={`w-full p-3.5 rounded-lg border ${errors.message ? "border-red-500" : "border-border"} bg-background text-foreground text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30`}
                    placeholder="Tell us a bit more..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                  {serverError && (
                    <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2">
                      {serverError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader size={14} />
                      <span className="ml-2">Sending...</span>
                    </span>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
