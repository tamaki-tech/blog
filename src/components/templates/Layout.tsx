import type { FC, PropsWithChildren } from 'hono/jsx'
import type { LaprasProfile } from '../../lib/laprasClient'
import { PageHeader } from '../molecules/PageHeader'

type Props = {
  profile?: LaprasProfile | null
}

export const Layout: FC<PropsWithChildren<Props>> = ({ profile, children }) => {
  return (
    <>
      <PageHeader profile={profile} />
      <main class="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </>
  )
}
