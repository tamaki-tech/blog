import type { FC, PropsWithChildren } from 'hono/jsx'

type Props = {
  className?: string
}

export const Badge: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <span class={['bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
