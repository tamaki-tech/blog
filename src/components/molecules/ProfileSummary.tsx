import type { FC } from 'hono/jsx'
import { Badge } from '../atoms/Badge'
import { Heading } from '../atoms/Heading'
import { Link } from '../atoms/Link'
import type { LaprasProfile } from '../../lib/laprasClient'

type Props = {
  profile?: LaprasProfile | null
  showMoreLink?: boolean
  showSkills?: boolean
}

export const ProfileSummary: FC<Props> = ({ profile, showMoreLink = true, showSkills = true }) => {
  const skills = profile?.getSkillNames() ?? []
  const description = profile?.getDescriptionLines() ?? []

  return (
    <section class="my-4 flex flex-col md:flex-row">
      <div class="mb-8 text-center md:mb-0 md:w-1/3">
        {profile?.getIconImageUrl() && (
          <img
            src={profile.getIconImageUrl()}
            alt="Profile avatar"
            class="mx-auto mb-4 h-40 w-40 rounded-full"
          />
        )}
        <Heading level={3} size="xl" className="font-bold">{profile?.getName()}</Heading>
        <p>Software Developer</p>
      </div>
      <div class="md:w-2/3 md:pl-8">
        <Heading level={3} size="xl" className="font-bold">About Me</Heading>
        <div class="p-2">
          {description.map((text) => <p>{text}</p>)}
          {showMoreLink && (
            <div class="my-4">
              <Link href="/profile" className="text-sm font-medium text-blue-500 hover:text-slate-950">
                VIEW MORE →
              </Link>
            </div>
          )}
        </div>
        {showSkills && (
          <>
            <Heading level={3} size="xl" className="font-bold">
              Skills
            </Heading>
            <div class="mb-6 flex flex-wrap gap-2 p-2">
              {skills.map((skill) => <Badge>{skill}</Badge>)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
