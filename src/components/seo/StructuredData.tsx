import { siteConfig, socialLinks, projects, experience, services, work } from "@/data/portfolio";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: "Yadnyesh",
    givenName: "Yadnyesh",
    familyName: "Mulay",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/photos/Yadnyesh.png`,
    sameAs: Object.values(socialLinks).filter((link) => link.startsWith("http")),
    jobTitle: "AI-first T-shaped Full Stack Developer / Business & AI Transformation Consultant",
    worksFor: work
      .filter((job) => job.current)
      .map((job) => ({
        "@type": "Organization",
        name: job.company,
        ...(job.link ? { url: job.link } : {}),
      })),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "FastAPI",
      "LLM Applications",
      "RAG Systems",
      "Agentic Workflows",
      "AI/ML",
      "Tailwind CSS",
      "Framer Motion",
      "AWS",
      "Azure",
      "Docker",
      "AI & Agentic AI Transformation",
      "Business Process Optimization",
      "Technical Product & Program Delivery",
      "No-Code / Low-Code Automation",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Greenwich",
    },
    hasOccupation: work.map((job) => ({
      "@type": "Occupation",
      name: job.role,
      description: job.summary,
      occupationLocation: {
        "@type": "Place",
        name: job.location,
      },
    })),
  };

  const workOrgSchemas = work.map((job) => ({
    "@context": "https://schema.org",
    "@type": "OrganizationRole",
    roleName: job.role,
    startDate: job.period,
    memberOf: {
      "@type": "Organization",
      name: job.company,
      ...(job.link ? { url: job.link } : {}),
    },
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: ["Yadnyesh", "yadnyesh.dev"],
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#person` },
  };

  // Tells Google this page is the profile of the Person above.
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteConfig.url,
    name: `${siteConfig.name} | ${siteConfig.title}`,
    mainEntity: { "@id": `${siteConfig.url}/#person` },
  };

  const projectSchemas = projects
    .filter((p) => p.featured)
    .map((project) => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.description,
      url: project.links.live || project.links.github,
      image: project.screenshots[0] ? `${siteConfig.url}${project.screenshots[0]}` : undefined,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      dateCreated: project.year.toString(),
      programmingLanguage: project.stack,
      genre: project.category,
      keywords: project.stack.join(", "),
    }));

  const serviceSchemas = services.flatMap((category) =>
    category.items.map((item) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: item,
      description: `${category.category}: ${item}`,
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "Worldwide",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${siteConfig.url}#contact`,
      },
    }))
  );

  const educationSchemas = experience
    .filter((e) => e.role.includes("MSc") || e.role.includes("Certified") || e.role.includes("Accelerator"))
    .map((edu) => ({
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      name: edu.role,
      recognizedBy: {
        "@type": "Organization",
        name: edu.org,
      },
      dateCreated: edu.period,
      description: edu.details,
    }));

  const allSchemas = [personSchema, websiteSchema, profilePageSchema, ...workOrgSchemas, ...projectSchemas, ...serviceSchemas, ...educationSchemas];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
    />
  );
}