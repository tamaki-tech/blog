import type { FC, PropsWithChildren } from 'hono/jsx'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

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

const sizeClassMap: Record<HeadingSize, string> = {
  '3xl': 'text-3xl',
  '2xl': 'text-2xl',
  xl: 'text-xl',
  lg: 'text-lg',
  md: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs',
}

export const Heading: FC<PropsWithChildren<Props>> = ({ level = 2, size, className, children }) => {
  const Tag = `h${level}` as const
  const resolvedSize = size ?? defaultSizeMap[level]

  return (
    <Tag class={[className, sizeClassMap[resolvedSize]].filter(Boolean).join(' ')}>{children}</Tag>
  )
}
