import { MetadataRoute } from "next";
import { projects, siteConfig } from "@/data/portfolio";

// The homepage is the canonical entry point. /about and /projects/* are separate
// indexable URLs: each one carries unique copy about Yadnyesh Mulay and his work,
// which gives Google more than a single page to match a name query against.
// (Hash fragments like #projects are not separate URLs and are ignored by crawlers.)
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.7 : 0.5,
    })),
  ];
}
