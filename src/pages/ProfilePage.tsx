import type { FC } from 'hono/jsx'
import { Heading } from '../components/atoms/Heading'
import { CareerTimeline } from '../components/molecules/CareerTimeline'
import { ProfileSummary } from '../components/molecules/ProfileSummary'
import type { CareerProfile } from '../lib/careerProfileClient'
import type { LaprasProfile } from '../lib/laprasClient'

type Props = {
  profile?: LaprasProfile | null
  careerProfile?: CareerProfile | null
}

export const ProfilePage: FC<Props> = ({ profile, careerProfile }) => {
  return (
    <>
      <Heading level={2} size="2xl" className="font-bold">
        Profile
      </Heading>
      <ProfileSummary profile={profile} showMoreLink={false} showSkills={false} />
      <section class="mt-10">
        <Heading level={3} size="xl" className="font-bold">
          Career
        </Heading>
        <CareerTimeline careerProfile={careerProfile} />
      </section>
    </>
  )
}
