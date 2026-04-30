import type { FC, PropsWithChildren } from 'hono/jsx'

type Props = {
  href: string
  className?: string
}

export const ButtonLink: FC<PropsWithChildren<Props>> = ({ href, className, children }) => {
  return (
    <a
      href={href}
      class={[
        className,
        'inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium leading-5 text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  )
}
