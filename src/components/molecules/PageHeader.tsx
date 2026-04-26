import type { FC } from 'hono/jsx'
import { Header } from '../atoms/Header'
import { Heading } from '../atoms/Heading'
import { Link } from '../atoms/Link'

export const PageHeader: FC = () => {
  return (
    <Header>
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-slate-950">
          <Heading level={1} size="3xl">
            naokimat Blog
          </Heading>
        </Link>
        <nav class="flex items-center gap-8 text-sm text-slate-700">
          <Link href="/profile">profile</Link>
          <Link href="/profile">products</Link>
          <Link href="/profile">articles</Link>
        </nav>
      </div>
    </Header>
  )
}
