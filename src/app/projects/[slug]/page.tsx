import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, siteConfig } from "@/data/portfolio";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  const title = `${project.name} - a project by Yadnyesh Mulay`;
  const description = `${project.tagline} ${project.description}`.slice(0, 300);
  const image = project.screenshots[0] ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.id}`,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: project.description,
    abstract: project.tagline,
    url: `${siteConfig.url}/projects/${project.id}`,
    image: project.screenshots[0] ? `${siteConfig.url}${project.screenshots[0]}` : undefined,
    dateCreated: project.year.toString(),
    genre: project.category,
    programmingLanguage: project.stack,
    keywords: project.stack.join(", "),
    creativeWorkStatus: project.status,
    author: { "@id": `${siteConfig.url}/#person` },
    creator: { "@id": `${siteConfig.url}/#person` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Yadnyesh Mulay", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteConfig.url}/projects/${project.id}`,
      },
    ],
  };

  const links = [
    project.links.live ? { label: "Live site", href: project.links.live } : null,
    project.links.github ? { label: "Source code", href: project.links.github } : null,
    project.links.docs ? { label: "Documentation", href: project.links.docs } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main id="main-content" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }}
      />
      <article className="container max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-fg-muted">
          <Link href="/" className="underline underline-offset-4">
            Yadnyesh Mulay
          </Link>
          <span className="mx-2">/</span>
          <Link href="/projects" className="underline underline-offset-4">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span>{project.name}</span>
        </nav>

        <span className="eyebrow">
          {project.category} · {project.year}
        </span>
        <h1 className="font-display text-h1 mt-3 mb-4 text-balance">{project.name}</h1>
        <p className="text-xl text-fg-muted leading-relaxed mb-8">{project.tagline}</p>

        <p className="text-base text-fg-muted leading-relaxed mb-10">
          {project.name} was designed and built by Yadnyesh Mulay, an AI-first full-stack developer
          based in Nashik, India. {project.description}
        </p>

        <h2 className="font-display text-2xl mb-3">The problem</h2>
        <p className="text-fg-muted leading-relaxed mb-8">{project.problem}</p>

        <h2 className="font-display text-2xl mb-3">The approach</h2>
        <p className="text-fg-muted leading-relaxed mb-8">{project.solution}</p>

        <h2 className="font-display text-2xl mb-3">How it was built</h2>
        {project.longDescription.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-fg-muted leading-relaxed mb-4">
            {paragraph.trim()}
          </p>
        ))}

        <h2 className="font-display text-2xl mt-8 mb-3">Where the AI sits</h2>
        <p className="text-fg-muted leading-relaxed mb-8">{project.aiInvolvement}</p>

        <h2 className="font-display text-2xl mb-3">Stack</h2>
        <ul className="flex flex-wrap gap-2 mb-10">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="text-xs uppercase tracking-wide border border-border rounded-full px-3 py-1 text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <>
            <h2 className="font-display text-2xl mb-3">Links</h2>
            <ul className="space-y-2 mb-10">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="border-t border-border pt-8 text-sm text-fg-muted">
          More work by Yadnyesh Mulay:{" "}
          <Link href="/projects" className="underline underline-offset-4">
            all projects
          </Link>{" "}
          ·{" "}
          <Link href="/about" className="underline underline-offset-4">
            about Yadnyesh Mulay
          </Link>{" "}
          ·{" "}
          <Link href="/" className="underline underline-offset-4">
            home
          </Link>
        </p>
      </article>
    </main>
  );
}
