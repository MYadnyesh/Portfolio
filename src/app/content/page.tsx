import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, socialLinks } from "@/data/portfolio";
import { contentItems, hasContent } from "@/content/posts";
import { displayTitle, schemaTypeFor } from "@/content/content-meta";
import { ContentList } from "@/components/content/ContentList";

const title = "Writing and posts by Yadnyesh Mulay";
const description =
  "Posts, articles and other writing by Yadnyesh Mulay on building software with AI, full-stack engineering and turning ideas into useful products.";

// Until the first item exists this page is an empty shell: keep it out of the
// index (and out of the sitemap and navigation, see sitemap.ts and page.tsx)
// so search engines never see a thin page.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/content" },
  robots: hasContent ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/content`,
    title,
    description,
    images: [siteConfig.ogImage],
  },
};

export default function ContentPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: `${siteConfig.url}/content`,
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: contentItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": schemaTypeFor(item),
          headline: displayTitle(item),
          url: item.url,
          datePublished: item.publishedOn,
          author: { "@id": `${siteConfig.url}/#person` },
          ...(item.tags ? { keywords: item.tags.join(", ") } : {}),
        },
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Yadnyesh Mulay", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Content", item: `${siteConfig.url}/content` },
    ],
  };

  return (
    <main id="main-content" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([collectionSchema, breadcrumb]) }}
      />
      <div className="container max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-fg-muted">
          <Link href="/" className="underline underline-offset-4">
            Yadnyesh Mulay
          </Link>
          <span className="mx-2">/</span>
          <span>Content</span>
        </nav>

        <span className="eyebrow">Content</span>
        <h1 className="font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-4xl sm:text-5xl md:text-6xl mt-3 mb-6 text-balance">
          Writing <span className="text-serif-italic normal-case text-accent-readable">and</span> posts
        </h1>
        <p className="text-lg md:text-xl text-fg-muted leading-relaxed max-w-2xl mb-14">
          Everything I write and publish, in one place: posts, articles and anything else I put
          out about building software with AI and turning ideas into products. Each entry links to
          the original.
        </p>

        {hasContent ? (
          <ContentList items={contentItems} />
        ) : (
          <div className="rule pt-10 max-w-2xl">
            <p className="text-fg-muted leading-relaxed">
              Nothing here yet. The first posts are on their way. In the meantime, you can{" "}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-fg"
              >
                follow me on LinkedIn
              </a>
              .
            </p>
          </div>
        )}

        <p className="rule mt-8 pt-8 text-sm text-fg-muted">
          <Link href="/" className="underline underline-offset-4">
            Back to yadnyesh.dev
          </Link>
          {" · "}
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            LinkedIn
          </a>
        </p>
      </div>
    </main>
  );
}
