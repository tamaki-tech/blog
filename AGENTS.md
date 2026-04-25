# Repository Guidelines

## Project Structure & Module Organization

This is a small Hono + Vite application targeting Cloudflare Pages.

- `src/index.tsx` defines the Hono app, routes, and default export.
- `src/renderer.tsx` contains the JSX document renderer shared by routes.
- `public/static/style.css` holds static CSS served at `/static/style.css`.
- `vite.config.ts` configures the Hono Vite build and local dev server.
- `wrangler.jsonc` contains Cloudflare Pages/Workers configuration.
- `README.md` documents basic setup and Cloudflare type generation.

There is no dedicated test directory yet. If tests are added, prefer colocated tests such as `src/index.test.tsx` or a top-level `test/` directory for integration coverage.

## Build, Test, and Development Commands

Use the package manager already represented by `pnpm-lock.yaml`.

- `pnpm install` installs dependencies.
- `pnpm run dev` starts the Vite development server.
- `pnpm run build` creates the production build.
- `pnpm run preview` runs the built app through `wrangler pages dev`.
- `pnpm run deploy` builds and deploys with Cloudflare Wrangler.
- `pnpm run cf-typegen` regenerates Cloudflare binding types after config changes.

No test script is currently defined. Add one to `package.json` before introducing automated tests.

## Coding Style & Naming Conventions

Use TypeScript and TSX for application code. Follow the existing style: two-space indentation, single quotes, no semicolons, and concise named exports for shared helpers such as `renderer`.

Keep route handlers in `src/index.tsx` until routing grows enough to justify extracting modules. Name components and exported helpers with clear lowerCamelCase or PascalCase according to JSX conventions.

## Testing Guidelines

The repository currently has no testing framework. For future work, prefer focused tests around routes, rendering behavior, and Cloudflare binding usage. Name tests after the unit or route they cover, for example `src/index.test.tsx`.

When adding tests, include a `pnpm test` script and document any required local services or environment variables.

## Commit & Pull Request Guidelines

The current Git history only contains initial commits, so no detailed commit convention is established. Use short, imperative commit messages such as `Add home page renderer` or `Configure Cloudflare preview`.

Pull requests should include a concise description, the commands run for verification, and screenshots when UI output changes. Link related issues when available and call out Cloudflare configuration changes explicitly.

## Security & Configuration Tips

Do not commit secrets, API tokens, or local `.env` files. Keep Cloudflare configuration in `wrangler.jsonc`, and regenerate bindings with `pnpm run cf-typegen` after changing Worker bindings or environment names.
