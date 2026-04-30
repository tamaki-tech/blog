import { jsxRenderer } from 'hono/jsx-renderer'
import { cloneElement, isValidElement } from 'hono/jsx'
import { Layout } from './components/templates/Layout'
import { laprasClient } from './lib/laprasClient'

export const renderer = jsxRenderer(async ({ children }) => {
  const profile = await laprasClient.fetchProfileModel().catch(() => null)
  const page = isValidElement(children) ? cloneElement(children, { profile }) : children

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
        <Layout profile={profile}>{page}</Layout>
      </body>
    </html>
  )
})
