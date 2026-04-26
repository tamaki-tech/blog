import { jsxRenderer } from 'hono/jsx-renderer'
import { Layout } from './components/templates/Layout'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {import.meta.env.PROD ? (
          <link href="/static/style.css" rel="stylesheet" />
        ) : (
          <script type="module" src="/src/style.css"></script>
        )}
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
})
