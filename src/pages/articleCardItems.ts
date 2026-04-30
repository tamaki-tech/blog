import type { ArticleCardItem } from '../components/molecules/ArticleCard'
import type { LaprasProfile } from '../lib/laprasClient'

export const getArticleCardItems = (profile?: LaprasProfile | null): ArticleCardItem[] => {
  return profile?.getRecentArticles().map(({ source, article }) => ({
    title: article.getTitle(),
    url: article.getUrl(),
    source,
    publishedAt: article.getDisplayUpdatedAt(),
    summary: article.getSummary(),
    tags: article.getTags(),
    stockersCount: article.getStockersCount(),
  })) ?? []
}
