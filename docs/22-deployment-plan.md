# Deployment plan

This document covers how to build, preview, and deploy the Horizoné
frontend, including environment variables, SEO basics, performance, and
error monitoring.

## Build and preview commands

The frontend uses pnpm and Vite.

- **Develop:** `pnpm dev` (runs Vite dev server on port 5173).
- **Typecheck:** `pnpm tsc -b`.
- **Lint:** `pnpm lint`.
- **Build:** `pnpm build` (runs `tsc -b && vite build`, output in
  `frontend/dist`).
- **Preview:** `pnpm preview` (serves the built `dist` folder).

## Environment variables

Set these at build time for the frontend (Vite exposes `VITE_` vars):

```bash
VITE_API_BASE_URL=https://api.horizone.app/api/v1
VITE_UPLOADS_URL=https://api.horizone.app/api/v1/uploads
VITE_MAPS_API_KEY=
VITE_PAYMENT_PROVIDER_KEY=
```

In local development, put them in `frontend/.env.local`. In CI, inject them
as build secrets. Never commit secrets to the repo.

## Static deployment options

`dist` is a static SPA. Any static host works.

| Host | How |
|---|---|
| Vercel | Set the root to `frontend`, build command `pnpm build`, output `dist` |
| Netlify | Same settings, add a `_redirects` rule for SPA fallback |
| Cloudflare Pages | Build command `pnpm build`, output `dist` |
| S3 + CloudFront | Upload `dist/`, enable SPA error redirect to `index.html` |

For every static host, the SPA needs a fallback rewrite so unknown routes
return `index.html` and the client router renders the `NotFound` page.

## SPA fallback rule

Add a fallback so all 404s from the host return `index.html`:

- **Vercel:** `rewrites` in `vercel.json`:
  `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.
- **Netlify:** `public/_redirects` with `/* /index.html 200`.
- **Cloudflare Pages:** the dashboard SPA fallback toggle.
- **S3 + CloudFront:** custom error response for 404 to `/index.html`
  with status 200.

## Backend API URL setup

Point `VITE_API_BASE_URL` at the backend in each environment. Keep the
backend deployment independent of the frontend. Use separate URLs for
development, staging, and production.

The backend must send CORS headers allowing the frontend origin. Match
the `CORS_ORIGIN` env var to the frontend domain.

## SEO basics

The SPA renders client-side today, so SEO is limited. Add the basics now
and plan server rendering later.

- Add a `<title>` and meta description per page (react-router plus a small
  `useDocumentMeta` hook).
- Add Open Graph and Twitter tags for the homepage and hotel pages.
- Generate sitemap and `robots.txt` from the public routes and hotel
  slugs in V5.
- Plan prerendering (for example, Vite SSR or a prerender plugin) so
  hotel detail pages are indexable.

## Performance checklist

- Lazy-load every route page so the initial bundle stays small.
- Lazy-load the Recharts and owner or admin dashboards (the heaviest
  chunks).
- Use `loading="lazy"` on images and prefer the Pexels or blob store
  resized variants.
- Set up font-display swap (already with Inter Variable).
- Keep the Lighthouse performance score above 90 on the homepage, hotel
  listing, and hotel detail.
- Split the dashboard charts into their own chunk.

## Error monitoring suggestions

- Add Sentry (or another RUM tool) with the browser SDK.
- Wrap the app in a top-level React error boundary that reports render
  errors.
- Report `ApiError` throws from the API client as breadcrumbs.
- Set release tagging from the CI build.

## CI checklist

A GitHub Actions workflow should:

1. Checkout.
2. Install with `pnpm install`.
3. Run `pnpm lint`.
4. Run `pnpm tsc -b`.
5. Run `pnpm build`.
6. Run tests when added (`pnpm test`).
7. Deploy the `dist` folder to the host.

## Pre-deploy checklist

- `VITE_API_BASE_URL` is set.
- SPA fallback is configured.
- `robots.txt` and sitemap are present (V5).
- Error monitoring is initialized.
- Build passes lint, typecheck, and build steps.

## Next steps

See `README.md` for the documentation index.