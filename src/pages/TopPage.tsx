import type { FC } from 'hono/jsx'
import { Badge } from '../components/atoms/Badge'
import { Heading } from '../components/atoms/Heading'
import { Link } from '../components/atoms/Link'
import { ArticleCard } from '../components/molecules/ArticleCard'
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
  const skills = profile?.getSkillNames() ?? []
  const description = profile?.getDescriptionLines() ?? []
  const articleCardItems = getArticleCardItems(profile)
  const eventTimelineItems = getEventTimelineItems(profile)

  return (
    <>
      <section class="my-4 flex flex-col md:flex-row">
        <div class="md:w-1/3 text-center mb-8 md:mb-0">
          <img src={profile?.getIconImageUrl()} alt="Profile Picture" class="rounded-full w-40 h-40 mx-auto mb-4" />
          <Heading level={3} size="xl" className="font-bold">{profile?.getName()}</Heading>
          <p>Software Developer</p>
        </div>
        <div class="md:w-2/3 md:pl-8">
          <Heading level={3} size="xl" className="font-bold">About Me</Heading>
          <div class="p-2">
            {description.map((text) => <p>{text}</p>)}
            <div className="my-4">
              <Link href="/profile" className="text-sm font-medium text-blue-500 hover:text-slate-950">
                VIEW MORE →
              </Link>
            </div>

          </div>
          <Heading level={3} size="xl" className="font-bold">
            Skills
          </Heading>
          <div class="flex flex-wrap gap-2 mb-6 p-2">
            {skills.map((skill) => <Badge>{skill}</Badge>)}
          </div>
        </div>
      </section>
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
