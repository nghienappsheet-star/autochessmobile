import { data } from "react-router"
import { CLASSES, COMPS, DEFAULT_COMMUNITY_POSTS, DEFAULT_POSTS, HEROES, ITEMS, RACES, DEFAULT_RELICS } from "@/data"
import { pageTitle, SITE_NAME, SITE_URL } from "@/config/site"
import { buildPageMeta, resolveOgImage, type PageMetaInput } from "@/lib/seo/meta"
import { buildArticleJsonLd, buildEntityJsonLd } from "@/lib/seo/jsonld"
import { isPostImageUrl } from "@/lib/media-url"

export function heroDetailLoader({ params }: { params: { id?: string } }) {
  const hero = HEROES.find((h) => h.id === params.id)
  if (!hero) throw data("Not Found", { status: 404 })
  return { hero }
}

export function heroDetailMeta({ data: loaderData }: { data?: { hero?: (typeof HEROES)[number] } }) {
  const hero = loaderData?.hero
  if (!hero) return [{ title: pageTitle("Tướng") }]
  const description =
    hero.description?.trim() ||
    `${hero.name} — chỉ số, kỹ năng và meta Auto Chess Mobile VN.`
  return [
    ...buildPageMeta({
      path: `/tuong/${hero.id}`,
      title: pageTitle(hero.name),
      description,
      image: hero.image ?? hero.imageUrl ?? hero.portraitUrl ?? hero.iconUrl,
    }),
    {
      "script:ld+json": buildEntityJsonLd({
        name: hero.name,
        description,
        url: `${SITE_URL}/tuong/${hero.id}`,
        image: resolveOgImage(hero.image ?? hero.imageUrl ?? hero.portraitUrl ?? hero.iconUrl),
        type: "VideoGameCharacter",
      }),
    },
  ]
}

export function compDetailLoader({ params }: { params: { id?: string } }) {
  const comp = COMPS.find((c) => c.id === params.id)
  if (!comp) throw data("Not Found", { status: 404 })
  return { comp }
}

export function compDetailMeta({ data: loaderData }: { data?: { comp?: (typeof COMPS)[number] } }) {
  const comp = loaderData?.comp
  if (!comp) return [{ title: pageTitle("Đội hình") }]
  const description =
    comp.desc?.trim() ||
    `Đội hình ${comp.name} tier ${comp.tier} — meta Auto Chess Mobile VN.`
  return buildPageMeta({
    path: `/doi-hinh/${comp.id}`,
    title: pageTitle(comp.name),
    description,
  })
}

export function itemDetailLoader({ params }: { params: { id?: string } }) {
  const item = ITEMS.find((i) => i.id === params.id)
  if (!item) throw data("Not Found", { status: 404 })
  return { item }
}

export function itemDetailMeta({ data: loaderData }: { data?: { item?: (typeof ITEMS)[number] } }) {
  const item = loaderData?.item
  if (!item) return [{ title: pageTitle("Trang bị") }]
  const description =
    item.description?.trim() ||
    `${item.name} — hiệu ứng trang bị Auto Chess Mobile VN.`
  return buildPageMeta({
    path: `/trang-bi/${item.id}`,
    title: pageTitle(item.name),
    description,
    image: "imageUrl" in item && typeof item.imageUrl === "string" ? item.imageUrl : undefined,
  })
}

export function relicDetailLoader({ params }: { params: { id?: string } }) {
  const relic = DEFAULT_RELICS.find((r) => r.id === params.id)
  if (!relic) throw data("Not Found", { status: 404 })
  return { relic }
}

export function relicDetailMeta({
  data: loaderData,
}: {
  data?: { relic?: (typeof DEFAULT_RELICS)[number] }
}) {
  const relic = loaderData?.relic
  if (!relic) return [{ title: pageTitle("Dị vật") }]
  const description =
    relic.effect?.trim() ||
    `${relic.name} — dị vật Auto Chess Mobile VN.`
  return buildPageMeta({
    path: `/di-vat/${relic.id}`,
    title: pageTitle(relic.name),
    description,
  })
}

export function traitDetailLoader({ params }: { params: { kind?: string; id?: string } }) {
  const kind = params.kind
  const id = params.id
  if (kind === "toc") {
    const race = RACES.find((r) => r.id === id)
    if (!race) throw data("Not Found", { status: 404 })
    return { trait: race, kind: "toc" as const }
  }
  if (kind === "he") {
    const cls = CLASSES.find((c) => c.id === id)
    if (!cls) throw data("Not Found", { status: 404 })
    return { trait: cls, kind: "he" as const }
  }
  throw data("Not Found", { status: 404 })
}

export function traitDetailMeta({
  data: loaderData,
}: {
  data?: { trait?: { id: string; name: string; description?: string; icon?: string }; kind?: "toc" | "he" }
}) {
  const trait = loaderData?.trait
  const kind = loaderData?.kind
  if (!trait || !kind) return [{ title: pageTitle("Tộc / Hệ") }]
  const description =
    trait.description?.trim() ||
    `${trait.name} — synergy ${kind === "toc" ? "tộc" : "hệ"} Auto Chess Mobile VN.`
  return buildPageMeta({
    path: `/toc-he/${kind}/${trait.id}`,
    title: pageTitle(trait.name),
    description,
    image: trait.icon,
  })
}

export function newsDetailLoader({ params }: { params: { id?: string } }) {
  const post = DEFAULT_POSTS.find((p) => p.id === params.id && p.status === "Xuất bản")
  if (!post) throw data("Not Found", { status: 404 })
  return { post }
}

export function newsDetailMeta({ data: loaderData }: { data?: { post?: (typeof DEFAULT_POSTS)[number] } }) {
  const post = loaderData?.post
  if (!post) return [{ title: pageTitle("Tin tức") }]
  const description = post.excerpt?.trim() || post.title
  const image = isPostImageUrl(post.image) ? post.image : undefined
  return [
    ...buildPageMeta({
      path: `/tin-tuc/${post.id}`,
      title: pageTitle(post.title),
      description,
      image,
      type: "article",
    }),
    {
      "script:ld+json": buildArticleJsonLd({
        title: post.title,
        description,
        url: `${SITE_URL}/tin-tuc/${post.id}`,
        image: resolveOgImage(image),
        datePublished: post.date,
      }),
    },
  ]
}

export function adminStaticMeta(path: string, label: string): PageMetaInput {
  return {
    path,
    title: `${label} | Admin — ${SITE_NAME}`,
    description: `Quản trị ${label} — ${SITE_NAME}.`,
  }
}

export function communityDetailLoader({ params }: { params: { id?: string } }) {
  const post = DEFAULT_COMMUNITY_POSTS.find((p) => p.id === params.id)
  if (!post) throw data("Not Found", { status: 404 })
  return { post }
}

export function communityDetailMeta({
  data: loaderData,
}: {
  data?: { post?: (typeof DEFAULT_COMMUNITY_POSTS)[number] }
}) {
  const post = loaderData?.post
  if (!post) return [{ title: pageTitle("Thảo luận") }]
  const description =
    post.content?.trim().slice(0, 160) ||
    `${post.title} — thảo luận cộng đồng Auto Chess Mobile VN.`
  return buildPageMeta({
    path: `/thao-luan/${post.id}`,
    title: pageTitle(post.title),
    description,
    type: "article",
  })
}
