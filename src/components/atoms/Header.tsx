import type { FC, PropsWithChildren } from 'hono/jsx'

type Props = {
  className?: string
}

export const Header: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return <header class={className}>{children}</header>
}
