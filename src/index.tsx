import { Hono } from 'hono'
import { renderer } from './renderer'
import { TopPage } from './pages/TopPage'
import { ProfilePage } from './pages/ProfilePage'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<TopPage />)
})

app.get('/profile', (c) => {
  return c.render(<ProfilePage />)
})

export default app
