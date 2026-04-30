import type { FC } from 'hono/jsx'
import { Badge } from '../atoms/Badge'
import { Heading } from '../atoms/Heading'
import type { CareerProfile } from '../../lib/careerProfileClient'

type Props = {
  careerProfile?: CareerProfile | null
}

const getUniqueValues = (values: string[]) => {
  return [...new Set(values)]
}

export const CareerTimeline: FC<Props> = ({ careerProfile }) => {
  const timeline = careerProfile?.getTimeline() ?? []

  if (timeline.length === 0) {
    return <p class="mt-4 text-slate-600">職務経歴情報はありません。</p>
  }

  return (
    <ol class="relative mt-6 border-s border-slate-200">
      {timeline.map((company, companyIndex) => {
        const isLastCompany = companyIndex === timeline.length - 1

        return (
          <li class={[isLastCompany ? '' : 'mb-12', 'ms-4'].filter(Boolean).join(' ')}>
            <div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-slate-300" />
            <time class="text-sm leading-none text-slate-500">
              {company.getCompanyPeriod().getLabel()}
            </time>
            <Heading level={3} size="xl" className="mt-2 font-semibold text-slate-950">
              {company.getCompany()}
            </Heading>
            <p class="mt-2 text-sm text-slate-600">{company.getBusiness()}</p>
            {(() => {
              const projects = company.getProjects()
              const roles = getUniqueValues(projects.map((project) => project.getRole()))
              const technologies = getUniqueValues(
                projects.flatMap((project) => project.getTechnologyNames()),
              )

              return (
                <div class="mt-4 space-y-3 rounded-md border border-slate-200 p-4">
                  {roles.length > 0 && (
                    <div class="flex flex-wrap gap-2">
                      {roles.map((role) => <Badge className="bg-slate-100 text-slate-700">{role}</Badge>)}
                    </div>
                  )}
                  {technologies.length > 0 && (
                    <div class="flex flex-wrap gap-2">
                      {technologies.map((technology) => <Badge>{technology}</Badge>)}
                    </div>
                  )}
                </div>
              )
            })()}
          </li>
        )
      })}
    </ol>
  )
}
