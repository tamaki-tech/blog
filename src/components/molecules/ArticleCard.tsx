import type { FC } from 'hono/jsx'
import { Badge } from '../atoms/Badge'
import { ExternalLinkIcon } from '../atoms/ExternalLinkIcon'
import { Heading } from '../atoms/Heading'
import { Link } from '../atoms/Link'

export type ArticleCardItem = {
  title: string
  url: string
  source: string
  publishedAt: string
  summary?: string
  tags?: string[]
  stockersCount?: number
}

type Props = {
  article: ArticleCardItem
}

export const ArticleCard: FC<Props> = ({ article }) => {
  const tags = article.tags?.slice(0, 3) ?? []

  return (
    <article class="flex h-full flex-col rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div class="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span class="font-medium text-slate-700">{article.source}</span>
        <span aria-hidden="true">/</span>
        <time>{article.publishedAt}</time>
      </div>
      <Heading level={4} size="md" className="font-semibold leading-7 text-slate-950">
        <Link href={article.url} className="inline text-slate-950 hover:text-slate-700">
          {article.title}{' '}
          <ExternalLinkIcon className="inline-block h-4 w-4 align-[-0.125em]" />
        </Link>
      </Heading>
      <div class="mt-auto pt-5">
        {tags.length > 0 && (
          <div class="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => <Badge className="bg-slate-100 text-slate-700">{tag}</Badge>)}
          </div>
        )}
        {article.stockersCount !== undefined && (
          <p class="text-xs font-medium text-slate-500">{article.stockersCount} stocks</p>
        )}
      </div>
    </article>
  )
}
