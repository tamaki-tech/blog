import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <main class="mx-auto max-w-5xl px-6 py-12">
      <h1 class="text-3xl font-bold text-slate-900">Hello!</h1>
    </main>
  )
})

export default app
