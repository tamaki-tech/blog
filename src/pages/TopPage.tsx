import type { FC } from 'hono/jsx'
import { Badge } from '../components/atoms/Badge'
import { Heading } from '../components/atoms/Heading'
import type { LaprasProfile } from '../lib/laprasClient'

type Props = {
  profile?: LaprasProfile | null
}

const getSkills = (profile?: LaprasProfile | null) => {
  const skills = profile?.github_repositories.flatMap((repository) =>
    repository.languages.map((language) => language.name),
  )
  return [...new Set(skills)].slice(0, 12)
}

export const TopPage: FC<Props> = ({ profile }) => {
  const skills = getSkills(profile)
  const description = profile?.description.split('\n').filter(Boolean) ?? []

  return (
    <section class="my-4 flex flex-col md:flex-row">
      <div class="md:w-1/3 text-center mb-8 md:mb-0">
        <img src={profile?.iconimage_url} alt="Profile Picture" class="rounded-full w-40 h-40 mx-auto mb-4" />
        <Heading level={3} size="xl" className="font-bold">{profile?.name}</Heading>
        <p>Software Developer</p>
      </div>
      <div class="md:w-2/3 md:pl-8">
        <Heading level={3} size="xl" className="font-bold">About Me</Heading>
        <div class="p-2">
          {description.map((text) => <p>{text}</p>)}
        </div>
        <Heading level={3} size="xl" className="font-bold">
          Skills
        </Heading>
        <div class="flex flex-wrap gap-2 mb-6 p-2">
          {skills.map((skill) => <Badge>{skill}</Badge>)}
        </div>
      </div>
    </section>
  )
}
