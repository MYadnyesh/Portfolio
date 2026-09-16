import type { ContactFormState } from "@/app/actions/contact";

type ContactFormData = NonNullable<ContactFormState["data"]>;

// Delivers a validated submission to Web3Forms from the browser. Web3Forms'
// free tier rejects server-to-server calls ("Use our API in client side or
// contact support with server IP address — Pro plan required"), so this
// must run client-side using the public access key (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY).
export async function submitToWeb3Forms(data: ContactFormData): Promise<ContactFormState> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      status: "error",
      message: "Form delivery is not configured. Please email yadnyeshmulay@gmail.com directly.",
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio inquiry from ${data.name} - ${data.service}`,
        from_name: data.name,
        name: data.name,
        email: data.email,
        company: data.company || "(not provided)",
        service: data.service,
        budget: data.budget || "(not provided)",
        timeline: data.timeline || "(not provided)",
        message: data.message,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let result: { success?: boolean; message?: string } = {};
    try {
      result = await response.json();
    } catch {
      // non-JSON response, fall through to the ok-but-unparseable check below
    }

    if (response.ok && result.success) {
      return {
        status: "success",
        message: "Thanks! I'll get back to you within 1-2 business days.",
      };
    }
    throw new Error(result.message || "Form submission failed");
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
