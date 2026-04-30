import type { FC } from 'hono/jsx'
import { ButtonLink } from '../atoms/ButtonLink'
import { Heading } from '../atoms/Heading'
import { Link } from '../atoms/Link'

type TimelineLink = {
  href: string
}

type MoreLink = {
  href: string
  label?: string
}

export type TimelineItem = {
  date: string
  title: string
  description: string
  link?: TimelineLink
}

type Props = {
  items: TimelineItem[]
  className?: string
  displayLimit?: number
  moreLink?: MoreLink
}

export const Timeline: FC<Props> = ({ items, className, displayLimit, moreLink }) => {
  const visibleItems = displayLimit === undefined ? items : items.slice(0, displayLimit)
  const hasMoreItems = displayLimit !== undefined && items.length > displayLimit

  return (
    <div class={className}>
      <ol class="relative border-s border-slate-200">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1

          return (
            <li class={[isLast ? '' : 'mb-10', 'ms-4'].filter(Boolean).join(' ')}>
              <div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-slate-300" />
              <time class="text-sm font-normal leading-none text-slate-500">{item.date}</time>
              <Heading level={3} size="lg" className="my-2 font-semibold text-slate-950">
                {item.link ? (
                  <Link href={item.link.href} className="text-slate-950 hover:text-slate-700">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </Heading>
              <p class="text-sm font-normal text-slate-600">{item.description}</p>
            </li>
          )
        })}
      </ol>
      {hasMoreItems && moreLink && (
        <div class="mt-6">
          <ButtonLink href={moreLink.href}>{moreLink.label ?? 'もっと見る'}</ButtonLink>
        </div>
      )}
    </div>
  )
}
