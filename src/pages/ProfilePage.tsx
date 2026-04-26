import type { FC } from 'hono/jsx'
import { Heading } from '../components/atoms/Heading'

export const ProfilePage: FC = () => {
  return (
    <section>
      <Heading level={2} size="2xl" className="font-bold">
        Profile
      </Heading>
      <p class="mt-4">hello profile page!</p>
    </section>
  )
}
