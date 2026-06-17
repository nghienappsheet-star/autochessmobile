import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site"

export function getDefaultJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "vi-VN",
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icons/pwa-512x512.png`,
      },
      {
        "@type": "VideoGame",
        name: "Auto Chess Mobile",
        genre: "Strategy",
        applicationCategory: "Game",
        operatingSystem: "Android, iOS",
      },
    ],
  }
}

export function buildArticleJsonLd(input: {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
    datePublished: input.datePublished,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/pwa-512x512.png`,
      },
    },
  }
}

export function buildEntityJsonLd(input: {
  name: string
  description: string
  url: string
  image?: string
  type?: "Thing" | "VideoGameCharacter"
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "Thing",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
  }
}
