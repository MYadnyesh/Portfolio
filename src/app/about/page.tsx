import type { Metadata } from "next";
import Link from "next/link";
import {
  siteConfig,
  work,
  experience,
  community,
  languages,
  projects,
  socialLinks,
} from "@/data/portfolio";
import { jsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "About Yadnyesh Mulay",
  description:
    "Who is Yadnyesh Mulay? An AI-first, T-shaped full-stack developer and business/AI consultant based in Nashik, India, with an MSc in Computer Science from the University of Greenwich.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${siteConfig.url}/about`,
    title: "About Yadnyesh Mulay",
    description:
      "Who is Yadnyesh Mulay? An AI-first, T-shaped full-stack developer and business/AI consultant based in Nashik, India.",
    images: [siteConfig.ogImage],
  },
};

const faqs = [
  {
    question: "Who is Yadnyesh Mulay?",
    answer:
      "Yadnyesh Mulay is an AI-first, T-shaped full-stack developer and business and AI consultant based in Nashik, India. He builds software end to end, from product decisions and system architecture through to the model layer, and advises on AI and agentic AI transformation.",
  },
  {
    question: "What does Yadnyesh Mulay work on?",
    answer:
      "He builds full-stack web applications and AI-native products using React, Next.js, TypeScript, Node.js, Python and FastAPI, with LLM applications, RAG systems and agentic workflows at the AI layer. He also advises on technical product delivery, business process optimisation and no-code/low-code automation.",
  },
  {
    question: "Where is Yadnyesh Mulay based?",
    answer:
      "Yadnyesh Mulay is based in Nashik, India, and works remotely with clients and teams internationally.",
  },
  {
    question: "What did Yadnyesh Mulay study?",
    answer:
      "He holds an MSc in Computer Science from the University of Greenwich, awarded with Distinction, and is certified as an AWS Solutions Architect – Associate.",
  },
  {
    question: "How can I contact Yadnyesh Mulay?",
    answer:
      "Through the contact form at yadnyesh.dev, or via his LinkedIn and GitHub profiles, which are linked from the site.",
  },
];

export default function AboutPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${siteConfig.url}/about`,
    name: "About Yadnyesh Mulay",
    mainEntity: { "@id": `${siteConfig.url}/#person` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Yadnyesh Mulay", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
    ],
  };

  return (
    <main id="main-content" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([aboutSchema, faqSchema, breadcrumb]),
        }}
      />
      <div className="container max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-fg-muted">
          <Link href="/" className="underline underline-offset-4">
            Yadnyesh Mulay
          </Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </nav>

        <span className="eyebrow">About</span>
        <h1 className="font-display text-h1 mt-3 mb-6 text-balance">
          About Yadnyesh Mulay
        </h1>

        <p className="text-xl text-fg-muted leading-relaxed mb-6">
          Yadnyesh Mulay is an AI-first, T-shaped full-stack developer and business and AI
          consultant based in Nashik, India, working remotely with clients and teams
          internationally.
        </p>
        <p className="text-base text-fg-muted leading-relaxed mb-10">
          He builds useful software and advises on AI-driven business transformation, turning ideas
          into working technical prototypes and processes into AI and agentic AI roadmaps. His work
          spans React, Next.js, TypeScript, Node.js, Python and FastAPI on the engineering side, and
          LLM applications, RAG systems and agentic workflows at the AI layer.
        </p>

        <h2 className="font-display text-2xl mb-4">Where Yadnyesh Mulay works</h2>
        <ul className="space-y-5 mb-10">
          {work.map((job) => (
            <li key={`${job.company}-${job.role}`} className="border-t border-border pt-4">
              <p className="font-medium">
                {job.role}, {job.company}
              </p>
              <p className="text-sm text-fg-muted">
                {job.type} · {job.period} · {job.location}
              </p>
              <p className="text-sm text-fg-muted mt-1">{job.summary}</p>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl mb-4">Education and certifications</h2>
        <ul className="space-y-5 mb-10">
          {experience.map((item) => (
            <li key={`${item.org}-${item.role}`} className="border-t border-border pt-4">
              <p className="font-medium">
                {item.role}, {item.org}
              </p>
              <p className="text-sm text-fg-muted">{item.period}</p>
              <p className="text-sm text-fg-muted mt-1">{item.details}</p>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl mb-4">Community work</h2>
        <ul className="space-y-5 mb-10">
          {community.map((item) => (
            <li key={`${item.org}-${item.role}`} className="border-t border-border pt-4">
              <p className="font-medium">
                {item.role}, {item.org}
              </p>
              <p className="text-sm text-fg-muted">{item.period}</p>
              <p className="text-sm text-fg-muted mt-1">{item.details}</p>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl mb-4">Languages</h2>
        <ul className="space-y-2 mb-10 text-fg-muted">
          {languages.map((language) => (
            <li key={language.name}>
              {language.name} — {language.level}
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl mb-4">Selected projects</h2>
        <ul className="space-y-3 mb-10">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className="underline underline-offset-4"
              >
                {project.name}
              </Link>
              <span className="text-fg-muted"> — {project.tagline}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl mb-4">Frequently asked questions</h2>
        <dl className="space-y-6 mb-10">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-t border-border pt-4">
              <dt className="font-medium mb-2">{faq.question}</dt>
              <dd className="text-fg-muted leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <h2 className="font-display text-2xl mb-4">Elsewhere</h2>
        <ul className="space-y-2 mb-10">
          <li>
            <a
              href={socialLinks.github}
              rel="me noopener noreferrer"
              target="_blank"
              className="underline underline-offset-4"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={socialLinks.linkedin}
              rel="me noopener noreferrer"
              target="_blank"
              className="underline underline-offset-4"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={socialLinks.twitter}
              rel="me noopener noreferrer"
              target="_blank"
              className="underline underline-offset-4"
            >
              X (Twitter)
            </a>
          </li>
        </ul>

        <p className="border-t border-border pt-8 text-sm text-fg-muted">
          <Link href="/" className="underline underline-offset-4">
            Back to yadnyesh.dev
          </Link>
        </p>
      </div>
    </main>
  );
}
