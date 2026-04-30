import type { FC } from 'hono/jsx'
import { Heading } from '../components/atoms/Heading'
import { Link } from '../components/atoms/Link'
import { ArticleCard } from '../components/molecules/ArticleCard'
import { ProfileSummary } from '../components/molecules/ProfileSummary'
import { Timeline } from '../components/molecules/Timeline'
import type { LaprasProfile } from '../lib/laprasClient'
import { getArticleCardItems } from './articleCardItems'

type Props = {
  profile?: LaprasProfile | null
}

const getEventTimelineItems = (profile?: LaprasProfile | null) => {
  return profile?.getRecentEvents().map((event) => ({
    date: event.getDisplayDate(),
    title: event.getTitle(),
    description: event.getRoleDescription(),
    link: {
      href: event.getUrl(),
    },
  })) ?? []
}

export const TopPage: FC<Props> = ({ profile }) => {
  const articleCardItems = getArticleCardItems(profile)
  const eventTimelineItems = getEventTimelineItems(profile)

  return (
    <>
      <ProfileSummary profile={profile} />
      {articleCardItems.length > 0 && (
        <section class="mt-8">
          <div class="mb-4 flex items-center justify-between gap-4">
            <Heading level={3} size="xl" className="font-bold">
              Articles
            </Heading>
            {articleCardItems.length > 3 && (
              <Link href="/articles" className="text-sm font-medium text-blue-500 hover:text-slate-950">
                VIEW MORE →
              </Link>
            )}
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            {articleCardItems.slice(0, 3).map((article) => <ArticleCard article={article} />)}
          </div>
        </section>
      )}
      {eventTimelineItems.length > 0 && (
        <section class="mt-8">
          <Heading level={3} size="xl" className="font-bold">
            Events
          </Heading>
          <Timeline
            items={eventTimelineItems}
            className="mt-4 m-2"
            displayLimit={2}
            moreLink={{ href: '/events' }}
          />
        </section>
      )}
    </>
  )
}
