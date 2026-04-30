import type { FC } from 'hono/jsx'
import { Heading } from '../components/atoms/Heading'
import { Timeline } from '../components/molecules/Timeline'
import type { LaprasProfile } from '../lib/laprasClient'

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

export const EventsPage: FC<Props> = ({ profile }) => {
  const eventTimelineItems = getEventTimelineItems(profile)

  return (
    <section>
      <Heading level={2} size="2xl" className="font-bold">
        Events
      </Heading>
      {eventTimelineItems.length > 0 ? (
        <Timeline items={eventTimelineItems} className="mt-6" />
      ) : (
        <p class="mt-4 text-slate-600">イベント情報はありません。</p>
      )}
    </section>
  )
}
