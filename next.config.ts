import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Allow other devices on the LAN (e.g. a phone on the same Wi-Fi) to use the dev server.
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((iface) => iface && iface.family === "IPv4" && !iface.internal)
  .map((iface) => iface!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,

  // Lighthouse "Best Practices" flags each of these as missing. Deliberately
  // no Content-Security-Policy here: the page embeds Calendly, Turnstile and
  // GA, so a CSP needs to be built against those origins and verified in a
  // real browser before it's safe to enforce. COOP is same-origin-allow-popups
  // rather than same-origin so third-party auth popups keep working.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default nextConfig;
