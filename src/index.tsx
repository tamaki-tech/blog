import { Hono } from 'hono'
import { renderer } from './renderer'
import { TopPage } from './pages/TopPage'
import { ProfilePage } from './pages/ProfilePage'
import { EventsPage } from './pages/EventsPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { ProductsPage } from './pages/ProductsPage'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<TopPage />)
})

app.get('/profile', (c) => {
  return c.render(<ProfilePage />)
})

app.get('/products', (c) => {
  return c.render(<ProductsPage />)
})

app.get('/events', (c) => {
  return c.render(<EventsPage />)
})

app.get('/articles', (c) => {
  return c.render(<ArticlesPage />)
})

export default app
