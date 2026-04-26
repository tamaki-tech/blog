import type { FC, PropsWithChildren } from 'hono/jsx'
import { PageHeader } from '../molecules/PageHeader'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PageHeader />
      <main class="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </>
  )
}
