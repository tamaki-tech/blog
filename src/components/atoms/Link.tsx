import type { FC, PropsWithChildren } from 'hono/jsx'

type Props = {
    href: string
    className?: string
}

export const Link: FC<PropsWithChildren<Props>> = ({ className, href, children }) => {
    return <a class={[className, 'hover:underline'].filter(Boolean).join(' ')} href={href}>{children}</a>
}
