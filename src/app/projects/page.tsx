import type { Metadata } from "next";
import Link from "next/link";
import { projects, siteConfig } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects by Yadnyesh Mulay",
  description:
    "Software projects built by Yadnyesh Mulay, AI-first full-stack developer: AI-native products, full-stack applications, NLP tooling and machine learning pipelines.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: "Projects by Yadnyesh Mulay",
    description:
      "Software projects built by Yadnyesh Mulay: AI-native products, full-stack applications, NLP tooling and machine learning pipelines.",
    images: [siteConfig.ogImage],
  },
};

export default function ProjectsIndex() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Yadnyesh Mulay",
    url: `${siteConfig.url}/projects`,
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: `${siteConfig.url}/projects/${project.id}`,
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Yadnyesh Mulay", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
    ],
  };

  return (
    <main id="main-content" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([listSchema, breadcrumb]) }}
      />
      <div className="container max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-fg-muted">
          <Link href="/" className="underline underline-offset-4">
            Yadnyesh Mulay
          </Link>
          <span className="mx-2">/</span>
          <span>Projects</span>
        </nav>

        <span className="eyebrow">Projects</span>
        <h1 className="font-display text-h1 mt-3 mb-6 text-balance">
          Projects built by Yadnyesh Mulay
        </h1>
        <p className="text-lg text-fg-muted leading-relaxed max-w-2xl mb-12">
          A record of what Yadnyesh Mulay has designed, built and shipped, from AI-native products
          and full-stack applications to NLP tooling and machine learning pipelines. Each entry
          covers the problem, the approach taken, and the stack it was built on.
        </p>

        <ul className="space-y-10">
          {projects.map((project) => (
            <li key={project.id} className="border-t border-border pt-8">
              <h2 className="font-display text-2xl md:text-3xl mb-2">
                <Link href={`/projects/${project.id}`} className="underline-offset-4 hover:underline">
                  {project.name}
                </Link>
              </h2>
              <p className="text-fg-muted mb-3">{project.tagline}</p>
              <p className="text-sm text-fg-muted leading-relaxed mb-3">{project.description}</p>
              <p className="text-xs uppercase tracking-wide text-fg-muted">
                {project.category} · {project.year} · {project.stack.slice(0, 5).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
