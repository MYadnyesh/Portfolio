import { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

// Single-page portfolio: search engines index the one canonical URL.
// (Hash fragments like #projects are not separate URLs and are ignored by crawlers.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
