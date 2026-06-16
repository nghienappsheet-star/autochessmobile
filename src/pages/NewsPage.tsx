import * as React from "react"
import { Card, Button, SectionHeader } from "@/components/ui/core"
import { useAppStore } from "@/contexts/DataContext"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "@/components/layout/PageHeader"
import {
  FilterToolbar,
  FilterToolbarRow,
  FilterSearchInput,
  FilterClearButton,
  FilterResultMeta,
  FilterChipGroup,
} from "@/components/layout/FilterToolbar"
import { NewsFeaturedHero } from "@/components/news/NewsFeaturedHero"
import { NewsSecondaryCard } from "@/components/news/NewsSecondaryCard"
import { NewsPostCard } from "@/components/news/NewsPostCard"
import { NewsPostListItem } from "@/components/news/NewsPostListItem"
import { NewsSidebar } from "@/components/news/NewsSidebar"
import { getPageIcon } from "@/config/icons"
import { useFilterParams } from "@/hooks/useFilterParams"
import {
  filterNewsPosts,
  getPublishedPosts,
  getCategoryCounts,
  getPopularPosts,
  getPostAuthors,
  parseTimeRange,
  splitFeaturedPosts,
  NEWS_TIME_RANGES,
} from "@/lib/news-utils"
import { useTranslation } from "react-i18next"

const FILTER_KEYS = ["q", "category", "author", "time"] as const

export function NewsPage() {
  const { t } = useTranslation(["news", "common"])
  const { posts } = useAppStore()
  const navigate = useNavigate()
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams()

  const searchTerm = getParam("q")
  const selectedCategory = getParam("category") || null
  const selectedAuthor = getParam("author") || null
  const selectedTime = parseTimeRange(getParam("time") || null)
  const activeFilters = hasActiveFilters([...FILTER_KEYS])

  const publishedPosts = React.useMemo(() => getPublishedPosts(posts), [posts])

  const filteredPosts = React.useMemo(
    () =>
      filterNewsPosts(posts, {
        q: searchTerm,
        category: selectedCategory,
        author: selectedAuthor,
        time: selectedTime,
      }),
    [posts, searchTerm, selectedCategory, selectedAuthor, selectedTime]
  )

  const categoryCounts = React.useMemo(() => getCategoryCounts(publishedPosts), [publishedPosts])
  const popularPosts = React.useMemo(() => getPopularPosts(publishedPosts, 5), [publishedPosts])
  const allAuthors = React.useMemo(() => getPostAuthors(publishedPosts), [publishedPosts])

  const authorChipOptions = React.useMemo(
    () => allAuthors.map((author) => ({ value: author, label: author })),
    [allAuthors]
  )

  const timeChipOptions = React.useMemo(
    () =>
      NEWS_TIME_RANGES.map((range) => ({
        value: range,
        label: t(
          range === "7d"
            ? "news:time7d"
            : range === "30d"
              ? "news:time30d"
              : "news:time90d"
        ),
      })),
    [t]
  )

  const showEditorial = !activeFilters
  const { featured, secondary, rest } = React.useMemo(
    () => splitFeaturedPosts(publishedPosts),
    [publishedPosts]
  )

  const openPost = (postId: string) => navigate(`/tin-tuc/${postId}`)

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={t("news:listTitle")}
        description={t("news:listDescription")}
        icon={getPageIcon("news")}
      />

      <div className="space-y-2">
        <FilterToolbar>
          <FilterToolbarRow>
            <FilterSearchInput
              value={searchTerm}
              onChange={(value) => setParams({ q: value || null })}
              placeholder={t("news:searchPlaceholder")}
              aria-label={t("news:searchPlaceholder")}
            />

            {authorChipOptions.length > 0 && (
              <FilterChipGroup
                options={authorChipOptions}
                selected={selectedAuthor}
                onSelect={(value) => setParams({ author: value })}
                label={t("news:filterByAuthor")}
              />
            )}

            <FilterChipGroup
              options={timeChipOptions}
              selected={selectedTime}
              onSelect={(value) => setParams({ time: value })}
              label={t("news:filterByTime")}
            />

            <FilterClearButton
              visible={activeFilters}
              onClick={() => clearParams([...FILTER_KEYS])}
            />
          </FilterToolbarRow>
        </FilterToolbar>

        <FilterResultMeta
          shown={filteredPosts.length}
          total={publishedPosts.length}
          className="px-1"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50">
          <p className="text-brand-text-sub font-medium">{t("news:emptyFiltered")}</p>
          {activeFilters && (
            <Button
              variant="outline"
              onClick={() => clearParams([...FILTER_KEYS])}
              className="rounded-xl border-brand-border"
            >
              {t("common:clearFilters")}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            {showEditorial && (
              <>
                {featured && (
                  <NewsFeaturedHero post={featured} onClick={() => openPost(featured.id)} />
                )}

                {secondary.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {secondary.map((post, idx) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.05, 0.2) }}
                      >
                        <NewsSecondaryCard post={post} onClick={() => openPost(post.id)} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {showEditorial ? (
              <div className="space-y-4">
                <SectionHeader title={t("news:latestArticles")} />
                {rest.length > 0 ? (
                  <div className="space-y-3">
                    {rest.map((post, idx) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.04, 0.25) }}
                      >
                        <NewsPostListItem post={post} onClick={() => openPost(post.id)} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-brand-card border-brand-border p-8 text-center rounded-xl">
                    <p className="text-brand-text-sub text-sm">{t("news:noMoreArticles")}</p>
                  </Card>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.04, 0.25) }}
                  >
                    <NewsPostCard post={post} onClick={() => openPost(post.id)} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <NewsSidebar
              categories={categoryCounts}
              popularPosts={popularPosts}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => setParams({ category })}
              onPostClick={openPost}
            />
          </div>
        </div>
      )}
    </div>
  )
}
