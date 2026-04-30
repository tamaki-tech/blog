import type { FC } from 'hono/jsx'
import { Heading } from '../components/atoms/Heading'
import { ArticleCard } from '../components/molecules/ArticleCard'
import type { LaprasProfile } from '../lib/laprasClient'
import { getArticleCardItems } from './articleCardItems'

type Props = {
  profile?: LaprasProfile | null
}

export const ArticlesPage: FC<Props> = ({ profile }) => {
  const articleCardItems = getArticleCardItems(profile)

  return (
    <section>
      <Heading level={2} size="2xl" className="font-bold">
        Articles
      </Heading>
      {articleCardItems.length > 0 ? (
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          {articleCardItems.map((article) => <ArticleCard article={article} />)}
        </div>
      ) : (
        <p class="mt-4 text-slate-600">記事情報はありません。</p>
      )}
    </section>
  )
}
