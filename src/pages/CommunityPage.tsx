import * as React from "react"
import { Card, Button, Badge } from "@/components/ui/core"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "@/components/motion/MotionProvider"
import { PageHeader } from "@/components/layout/PageHeader"
import {
  FilterToolbar,
  FilterToolbarRow,
  FilterSearchInput,
  FilterClearButton,
  FilterResultMeta,
} from "@/components/layout/FilterToolbar"
import { UnderlineTabs } from "@/components/layout/UnderlineTabs"
import { CommunityPostCard } from "@/components/community/CommunityPostCard"
import { getPageIcon } from "@/config/icons"
import { useAppStore } from "@/contexts/DataContext"
import { useFilterParams } from "@/hooks/useFilterParams"
import {
  sortCommunityPosts,
  filterCommunityPosts,
  TRENDING_TOPICS,
  parseCommunitySort,
  COMMUNITY_SORT_KEYS,
  type CommunitySortKey,
} from "@/lib/community-utils"

const FILTER_KEYS = ["q", "sort"] as const

export function CommunityPage() {
  const { t } = useTranslation(["community", "common", "nav"])
  const navigate = useNavigate()
  const { communityPosts, comments } = useAppStore()
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams()
  const [upvotedIds, setUpvotedIds] = React.useState<Set<string>>(new Set())

  const searchTerm = getParam("q")
  const sortKey = parseCommunitySort(getParam("sort") || null)
  const activeFilters = hasActiveFilters([...FILTER_KEYS])

  const filteredPosts = React.useMemo(() => {
    const filtered = filterCommunityPosts(communityPosts, searchTerm)
    return sortCommunityPosts(filtered, sortKey)
  }, [communityPosts, searchTerm, sortKey])

  const toggleUpvote = (postId: string) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={t("nav:discussion")}
        description={t("community:description")}
        icon={getPageIcon("community")}
      >
        <Button
          onClick={() => navigate("/dang-bai")}
          className="font-semibold h-11 px-6 rounded-xl shrink-0"
        >
          {t("community:createPost")}
        </Button>
      </PageHeader>

      <div className="space-y-2">
        <FilterToolbar>
          <FilterToolbarRow>
            <FilterSearchInput
              value={searchTerm}
              onChange={(value) => setParams({ q: value || null })}
              placeholder={t("community:searchPlaceholder")}
              aria-label={t("community:searchPlaceholder")}
            />

            <FilterClearButton
              visible={activeFilters}
              onClick={() => clearParams([...FILTER_KEYS])}
            />
          </FilterToolbarRow>
        </FilterToolbar>

        <FilterResultMeta
          shown={filteredPosts.length}
          total={communityPosts.length}
          className="px-1"
        />
      </div>

      <UnderlineTabs
        tabs={COMMUNITY_SORT_KEYS.map((key) => ({
          id: key,
          label: t(`community:sort.${key}`),
        }))}
        activeTab={sortKey}
        onTabChange={(tab) =>
          setParams({ sort: tab === "latest" ? null : (tab as CommunitySortKey) })
        }
        layoutId="activeTabCommunity"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="bg-brand-card border-brand-border p-12 text-center rounded-xl">
              <p className="text-brand-text-sub text-sm">{t("community:emptyFiltered")}</p>
              {activeFilters && (
                <Button
                  variant="outline"
                  onClick={() => clearParams([...FILTER_KEYS])}
                  className="rounded-xl border-brand-border mt-4"
                >
                  {t("common:clearFilters")}
                </Button>
              )}
            </Card>
          ) : (
            filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
              >
                <CommunityPostCard
                  post={{
                    ...post,
                    likes: post.likes + (upvotedIds.has(post.id) ? 1 : 0),
                  }}
                  upvoted={upvotedIds.has(post.id)}
                  onUpvote={() => toggleUpvote(post.id)}
                  onNavigate={() => navigate(`/thao-luan/${post.id}`)}
                />
              </motion.div>
            ))
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <Card className="bg-brand-card border-brand-border p-5 space-y-4 rounded-xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              {t("community:communityStats")}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-brand-card-2 rounded-xl p-3 border border-brand-border">
                <div className="text-lg font-bold text-brand-gold">{communityPosts.length}</div>
                <div className="text-[10px] text-brand-text-sub uppercase tracking-widest">
                  {t("community:totalPosts")}
                </div>
              </div>
              <div className="bg-brand-card-2 rounded-xl p-3 border border-brand-border">
                <div className="text-lg font-bold text-brand-text-main">{comments.length}</div>
                <div className="text-[10px] text-brand-text-sub uppercase tracking-widest">
                  {t("community:totalComments")}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-brand-card border-brand-border p-5 space-y-3 rounded-xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              {t("community:trendingTopics")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TOPICS.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="bg-brand-card-2 text-brand-text-sub cursor-pointer hover:border-brand-gold/30"
                  onClick={() => setParams({ q: topic.replace(/^#/, "") })}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
