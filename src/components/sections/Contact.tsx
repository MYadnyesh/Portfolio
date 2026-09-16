"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { services, socialLinks } from "@/data/portfolio";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { ContactFormState } from "@/app/actions/contact";
import { submitToWeb3Forms } from "@/lib/web3forms";

const serviceOptions = services.flatMap((category) =>
  category.items.map((item) => ({
    value: item.toLowerCase().replace(/\s+/g, "-"),
    label: `${category.category}: ${item}`,
  }))
);

const initialState: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
};

export function Contact() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: ContactFormState, formData: FormData): Promise<ContactFormState> => {
      if (formData.get("website")) {
        return { status: "success", message: "Thanks!", errors: {} };
      }

      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;
      const service = formData.get("service") as string;

      const errors: Record<string, string> = {};
      if (!name?.trim()) errors.name = "Name is required";
      if (!email?.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email format";
      if (!message?.trim()) errors.message = "Message is required";
      else if (message.trim().length < 20) errors.message = "Message must be at least 20 characters";
      if (!service?.trim()) errors.service = "Service is required";

      if (Object.keys(errors).length > 0) {
        return { status: "error", message: "Please fix the errors below", errors };
      }

      const validateContact = (await import("@/app/actions/contact")).validateContact;
      const validated = await validateContact({ status: "idle", message: "", errors: {} }, formData);

      if (validated.status !== "validated" || !validated.data) {
        return validated;
      }

      // Server-side checks (spam, rate limit, Turnstile, schema) passed.
      // Deliver to Web3Forms from the browser — their free tier rejects
      // server-to-server submissions.
      return submitToWeb3Forms(validated.data);
    },
    initialState
  );

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <section id="contact" className="section bg-(--color-bg-elevated)">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Info & Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5"
          >
            <span className="eyebrow">Get in touch</span>
            <h2 className="font-display text-h1 mt-3 mb-6 text-balance">Let&apos;s build something useful.</h2>
            <p className="text-lg md:text-xl text-(--color-fg-muted) leading-relaxed mb-10 max-w-md">
              I work with founders, engineering teams, and organizations building AI-native products
              and full-stack applications, a technical prototype, an AI integration, system
              architecture, or a full MVP.
            </p>

            <div>
              <span className="eyebrow block mb-4">What I can help build</span>
              <ul className="divide-y divide-(--color-border)" role="list">
                {services.map((category) => (
                  <li key={category.category} className="py-3">
                    <p className="font-display text-sm text-(--color-accent) mb-1.5">{category.category}</p>
                    <p className="text-(--color-fg-muted) text-base md:text-lg">{category.items.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rule mt-10 pt-6">
              <span className="eyebrow block mb-3">Other ways to connect</span>
              <div className="flex flex-col gap-2 text-sm">
                <a href={socialLinks.email} className="text-(--color-fg) hover:text-(--color-accent) transition-colors">
                  yadnyeshmulay@gmail.com
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-fg) hover:text-(--color-accent) transition-colors"
                >
                  LinkedIn, direct message
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-fg) hover:text-(--color-accent) transition-colors"
                >
                  GitHub, open source & code
                </a>
              </div>
              <p className="text-xs text-(--color-fg-subtle) mt-6 leading-relaxed max-w-sm">
                Form submissions are used only to schedule a conversation, not stored in databases,
                not shared, not used for marketing. No tracking pixels.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="mb-8 border border-(--color-border) p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-display font-bold text-lg">Rather just talk?</p>
                <p className="text-sm text-(--color-fg-muted)">Grab a 30-minute slot on my calendar.</p>
              </div>
              <a
                href={socialLinks.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent shrink-0"
              >
                Book a call &rarr;
              </a>
            </div>

            {state.status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 border border-(--color-success)/40 mb-6 flex items-center gap-3"
                role="status"
                aria-live="polite"
              >
                <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "var(--color-success)" }} />
                <p className="text-sm" style={{ color: "var(--color-success)" }}>{state.message}</p>
              </motion.div>
            )}

            {state.status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 border border-(--color-error)/40 mb-6 flex items-center gap-3"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0" style={{ color: "var(--color-error)" }} />
                <p className="text-sm" style={{ color: "var(--color-error)" }}>{state.message}</p>
              </motion.div>
            )}

            <form action={formAction} className="space-y-6" noValidate>
              <input type="hidden" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

              <div className="grid sm:grid-cols-2 gap-6">
                <Input label="Name *" name="name" required error={state.errors?.name} disabled={isPending} />
                <Input label="Email *" name="email" type="email" required error={state.errors?.email} disabled={isPending} />
              </div>

              <Input label="Company / Organization" name="company" error={state.errors?.company} disabled={isPending} />

              <Select
                label="What do you need help with? *"
                name="service"
                required
                error={state.errors?.service}
                options={serviceOptions}
                disabled={isPending}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <Select
                  label="Budget Range"
                  name="budget"
                  options={[
                    { value: "", label: "Select budget" },
                    { value: "under-10k", label: "Under $10K" },
                    { value: "10k-50k", label: "$10K - $50K" },
                    { value: "50k-100k", label: "$50K - $100K" },
                    { value: "100k+", label: "$100K+" },
                    { value: "not-sure", label: "Not sure yet" },
                  ]}
                  disabled={isPending}
                />
                <Select
                  label="Timeline"
                  name="timeline"
                  options={[
                    { value: "", label: "Select timeline" },
                    { value: "asap", label: "ASAP" },
                    { value: "1-2-months", label: "1-2 months" },
                    { value: "3-6-months", label: "3-6 months" },
                    { value: "6-months+", label: "6+ months" },
                    { value: "exploring", label: "Just exploring" },
                  ]}
                  disabled={isPending}
                />
              </div>

              <Textarea
                label="What are you building? *"
                name="message"
                rows={5}
                required
                error={state.errors?.message}
                disabled={isPending}
              />

              {state.status === "submitting" && (
                <div className="flex items-center gap-2 text-sm text-(--color-fg-muted)" role="status" aria-live="polite">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              )}

              {turnstileSiteKey && (
                <div
                  className="cf-turnstile"
                  data-sitekey={turnstileSiteKey}
                  data-theme="dark"
                />
              )}

              <Button type="submit" size="lg" className="w-full sm:w-auto" loading={isPending}>
                Send Message
              </Button>

              <p className="text-xs text-(--color-fg-subtle)">
                By submitting, you agree to the data handling note above. No spam, ever.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
