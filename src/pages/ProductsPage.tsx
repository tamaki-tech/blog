import type { FC } from 'hono/jsx'
import { Badge } from '../components/atoms/Badge'
import { ButtonLink } from '../components/atoms/ButtonLink'
import { ExternalLinkIcon } from '../components/atoms/ExternalLinkIcon'
import { Heading } from '../components/atoms/Heading'
import { Link } from '../components/atoms/Link'
import type { LaprasProfile } from '../lib/laprasClient'

type ProductItem = {
  name: string
  status: string
  description: string
  highlights: string[]
  technologies: string[]
  url: string
}

type Props = {
  profile?: LaprasProfile | null
}

const productRepositoryTitles = [
  'tamaki-tech/ptcg-simulator',
  'tamaki-tech/blog',
]

const createProductItems = (profile?: LaprasProfile | null): ProductItem[] => {
  const repositories = profile?.getGitHubRepositories() ?? []

  return productRepositoryTitles.flatMap((title) => {
    const repository = repositories.find((item) => item.getTitle() === title)

    if (!repository) {
      return []
    }

    const primaryLanguage = repository.getPrimaryLanguage()

    return [{
      name: repository.getTitle(),
      status: primaryLanguage || 'GitHub',
      description: repository.getDescription() || 'GitHub リポジトリで公開しているプロダクトです。',
      highlights: [
        `${repository.getContributions()} contributions`,
        `${repository.getStargazersCount()} stars`,
        `${repository.getForks()} forks`,
      ],
      technologies: repository.getLanguageNames(),
      url: repository.getUrl(),
    }]
  })
}

export const ProductsPage: FC<Props> = ({ profile }) => {
  const productItems = createProductItems(profile)

  return (
    <>
      <section>
        <div class="max-w-3xl">
          <Heading level={2} size="2xl" className="font-bold">
            Products
          </Heading>
          <p class="mt-4 text-sm leading-7 text-slate-600">
            これまでに作ったプロダクトや、継続的に改善している開発基盤をまとめています。
            小さく作り、運用しながら磨いているものを中心に掲載します。
          </p>
        </div>
      </section>

      <section class="mt-8">
        {productItems.length > 0 ? (
          <div class="grid gap-4 md:grid-cols-2">
            {productItems.map((product) => (
              <article class="flex h-full flex-col rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-medium text-slate-500">GitHub Repository</p>
                    <Heading level={3} size="xl" className="mt-1 font-bold leading-7 text-slate-950">
                      <Link href={product.url} className="inline text-slate-950 hover:text-slate-700">
                        {product.name}{' '}
                        <ExternalLinkIcon className="inline-block h-4 w-4 align-[-0.125em]" />
                      </Link>
                    </Heading>
                  </div>
                  <Badge className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {product.status}
                  </Badge>
                </div>

                <p class="text-sm leading-7 text-slate-600">{product.description}</p>

                <div class="mt-5">
                  <Heading level={4} size="sm" className="font-semibold text-slate-950">
                    Highlights
                  </Heading>
                  <ul class="mt-3 grid gap-2 text-sm text-slate-600">
                    {product.highlights.map((highlight) => (
                      <li class="flex gap-2">
                        <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="mt-auto pt-5">
                  <div class="flex flex-wrap gap-2">
                    {product.technologies.map((technology) => (
                      <Badge className="bg-slate-100 text-slate-700">{technology}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p class="text-sm leading-7 text-slate-600">プロダクト情報はありません。</p>
        )}
      </section>

      <section class="mt-10 rounded-md border border-slate-200 bg-slate-50 p-5">
        <Heading level={3} size="lg" className="font-bold text-slate-950">
          More products coming soon
        </Heading>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          公開可能なプロダクトから順に、背景・役割・技術選定を追記していきます。
        </p>
        <div class="mt-4">
          <ButtonLink href="/profile">プロフィールを見る</ButtonLink>
        </div>
      </section>
    </>
  )
}
