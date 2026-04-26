import type { FC } from 'hono/jsx'
import { Heading } from '../components/atoms/Heading'
import type { LaprasProfile } from '../lib/laprasClient'

type Props = {
  profile?: LaprasProfile | null
}

export const ProfilePage: FC<Props> = ({ profile }) => {
  return (
    <section>
      <Heading level={2} size="2xl" className="font-bold">
        Profile
      </Heading>
      <div class="mt-4 space-y-4">
        <p>{profile?.description ?? 'hello profile page!'}</p>
        {profile && (
          <dl class="grid gap-4 sm:grid-cols-3">
            <div>
              <dt class="text-sm text-slate-500">Engineering</dt>
              <dd class="text-2xl font-bold">{profile.e_score}</dd>
            </div>
            <div>
              <dt class="text-sm text-slate-500">Business</dt>
              <dd class="text-2xl font-bold">{profile.b_score}</dd>
            </div>
            <div>
              <dt class="text-sm text-slate-500">Influence</dt>
              <dd class="text-2xl font-bold">{profile.i_score}</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  )
}
