import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Allow other devices on the LAN (e.g. a phone on the same Wi-Fi) to use the dev server.
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((iface) => iface && iface.family === "IPv4" && !iface.internal)
  .map((iface) => iface!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,
};

export default nextConfig;
