import { FC, PropsWithChildren } from 'hono/jsx'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = '3xl' | '2xl' | 'lg' | 'md' | 'sm' | 'xs'

type Props = {
    level?: HeadingLevel,
    size?: HeadingSize,
    className?: string
}

const defaultSizeMap: Record<HeadingLevel, HeadingSize> = {
    1: '3xl',
    2: '2xl',
    3: 'lg',
    4: 'md',
    5: 'sm',
    6: 'xs',
}

export const Heading: FC = ({ level = 2, size, className, children }: PropsWithChildren<Props>) => {
    const Tag = `h${level}` as const
    const resolvedSize = size ?? defaultSizeMap[level]

    return (
        <Tag class={`${className} text-${resolvedSize}`}>{children}</Tag>
    )
}