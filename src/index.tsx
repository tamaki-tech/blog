import { Hono } from 'hono'
import { renderer } from './renderer'
import { Heading } from './components/atoms/Heading'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <main class='mx-auto max-w-5xl px-6 py-12'>
      <Heading level={1} size='3xl' className="font-bold">naokimat Blog</Heading>
    </main >
  )
})

export default app
