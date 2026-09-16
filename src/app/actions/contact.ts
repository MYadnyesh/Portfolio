"use server";

import { z } from "zod";
import { headers } from "next/headers";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  company: z.string().max(100).optional(),
  service: z.string().min(1, "Service is required"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(5000),
  // Honeypot field - if filled, it's likely a bot
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string>>;
};

/* ------------------------------------------------------------------ */
/* Rate limiting - in-memory sliding window, keyed by client IP.       */
/* Good baseline protection per serverless instance. For strict,    */
/* distributed limits across instances, set UPSTASH_* and swap this    */
/* for @upstash/ratelimit (noted in .env.example).                     */
/* ------------------------------------------------------------------ */
const RATE_LIMIT_MAX = 3; // submissions
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes

type Hit = { count: number; resetAt: number };
type GlobalWithRateStore = typeof globalThis & {
  __contactRateStore?: Map<string, Hit>;
};
// Module-scoped map persists for the life of the instance.
const globalWithStore = globalThis as GlobalWithRateStore;
const rateStore: Map<string, Hit> = globalWithStore.__contactRateStore ?? new Map();
globalWithStore.__contactRateStore = rateStore;

function checkRateLimit(ip: string): { ok: boolean; retryAfterMin?: number } {
  const now = Date.now();
  const hit = rateStore.get(ip);
  if (!hit || now > hit.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (hit.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterMin: Math.ceil((hit.resetAt - now) / 60000) };
  }
  hit.count += 1;
  return { ok: true };
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return h.get("x-real-ip") || "unknown";
}

/* ------------------------------------------------------------------ */
/* Cloudflare Turnstile verification                                   */
/* ------------------------------------------------------------------ */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured, skip (keeps local dev working). In
  // production, set TURNSTILE_SECRET_KEY so this is enforced.
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (ip && ip !== "unknown") body.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function sendMessageAction(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1) Honeypot - silently accept so bots don't learn
  if (formData.get("website")) {
    return { status: "success", message: "Thanks!" };
  }

  const ip = await getClientIp();

  // 2) Rate limit
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return {
      status: "error",
      message: `Too many requests. Please try again in about ${rl.retryAfterMin} minute(s), or email yadnyeshmulay@gmail.com directly.`,
    };
  }

  // 3) Cloudflare Turnstile
  const turnstileToken = (formData.get("cf-turnstile-response") as string) || "";
  const humanVerified = await verifyTurnstile(turnstileToken, ip);
  if (!humanVerified) {
    return {
      status: "error",
      message: "Verification failed. Please complete the anti-spam check and try again.",
    };
  }

  // 4) Validate
  const validated = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Please fix the errors below",
      errors: Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [k, v?.[0] || ""])
      ) as Partial<Record<keyof ContactFormData, string>>,
    };
  }

  const data = validated.data;

  try {
    const endpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/placeholder";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return {
        status: "success",
        message: "Thanks! I'll get back to you within 1-2 business days.",
      };
    }
    throw new Error("Form submission failed");
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return {
        status: "error",
        message: "Request timed out. Please try emailing directly: yadnyeshmulay@gmail.com",
      };
    }
    console.error("Contact form error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try emailing directly: yadnyeshmulay@gmail.com",
    };
  }
}
