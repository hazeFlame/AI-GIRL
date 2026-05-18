# Cloudflare Worker Runtime Notes

This project runs Next.js through `@opennextjs/cloudflare` on Cloudflare Workers.
Treat it as a Worker-first application, not a traditional Node server.

The most important rule: avoid making the Worker render pages unless the page
really needs per-request user/session data.

## Runtime Model

- Runtime adapter: `@opennextjs/cloudflare`
- Deployment target: Cloudflare Workers
- Database: Cloudflare D1
- Auth: Better Auth + Drizzle adapter
- Media: external storage/CDN, currently Supabase Storage

Do not add `export const runtime = "edge"` to routes. OpenNext Cloudflare already
bundles the app for Workers. Adding Next's Edge Runtime can break assumptions in
the adapter and is not the right optimization path here.

## Rendering Policy

Use the cheapest rendering mode that preserves the product behavior.

| Route | Current mode | Reason |
| --- | --- | --- |
| `/` | SSG | Landing content is not personalized. |
| `/explore` | SSG | Public role list currently comes from local config. |
| `/character/[id]` | SSG | Character profile content is mostly stable. |
| Character comments | CSR island | Comments can change often without forcing the profile page to SSR. |
| `/pricing` | SSG | Pricing UI is static right now. |
| `/login` | SSR/dynamic | Needs callback URL and login-state redirect checks. |
| `/chat` | SSR/dynamic | User/session-specific page. |
| `/profile` | SSR/dynamic | User/session-specific page. |
| `/studio` | SSR/dynamic | User/session-specific creator workspace. |
| `/api/auth/*` | Dynamic API | Better Auth endpoints. |

For SSG routes, prefer:

```ts
export const dynamic = "force-static";
export const revalidate = false;
```

For finite dynamic params like public character detail pages:

```ts
export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;
```

When role cards move from local config to D1, revisit `/explore` and
`/character/[id]`. They may become ISR pages, but only after we configure a real
OpenNext incremental cache such as R2.

## ISR Policy

Do not casually add `export const revalidate = 300`.

On Cloudflare Workers, ISR needs a matching OpenNext incremental cache strategy.
The current config uses `staticAssetsIncrementalCache`, which is correct for
read-only prerendered/SSG data. It is not meant for runtime revalidation.

When we need real ISR:

- Add R2.
- Switch OpenNext incremental cache to R2.
- Decide revalidation windows by route.
- Consider tag/path revalidation only after the cache backend is ready.

Until then, use SSG for public stable pages and CSR for fast-changing widgets.

## Link Prefetch Rule

Next App Router prefetches visible `<Link>` targets in production. On Workers,
that can become a CPU problem because each prefetched RSC request can trigger a
Worker render.

We already hit this issue: one `/explore` refresh caused many requests like:

```txt
/character/mei?_rsc=...
/character/yuna?_rsc=...
/chat?_rsc=...
/studio?_rsc=...
```

Default rule for this project:

```tsx
<Link href="/somewhere" prefetch={false}>
```

Use `prefetch={false}` especially for:

- Header navigation
- Mobile bottom navigation
- Account drawer links
- Character cards
- Large lists/grids
- Links to protected routes such as `/chat`, `/profile`, `/studio`

Only enable prefetch intentionally for a tiny number of hot paths after checking
Cloudflare logs.

## Image Rule

Do not use Worker-side image optimization for now.

`next.config.ts` sets:

```ts
images: {
  unoptimized: true;
}
```

Images should be served by Supabase Storage, Cloudflare Images, R2, or another
media CDN. Running image transforms through the Worker is a fast way to spend CPU.

## Auth And Session Cost

Better Auth session reads can touch D1. Keep session checks out of public SSG
pages.

Allowed:

- Protected layout/page calls `requireUser()` or `requireSession()`.
- `/login` checks whether the user is already authenticated.
- Auth API routes call Better Auth.

Avoid:

- Calling `headers()`, `cookies()`, `requireUser()`, or `getCurrentSession()` in
  `/`, `/explore`, `/character/[id]`, or other public static pages.

The site header currently uses `authClient.useSession()` on the client. That can
still call the auth API after page load, but it does not create an RSC prefetch
storm. If CPU remains high, make the session UI lazier.

Better Auth rate limiting needs a client IP. On Cloudflare Workers, configure it
to read Cloudflare's visitor IP header:

```ts
advanced: {
  ipAddress: {
    ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
  },
}
```

Keep `cf-connecting-ip` first because it is the trusted Cloudflare visitor IP
header for this deployment. `x-forwarded-for` is only a compatibility fallback.
If Cloudflare's "Remove visitor IP headers" Managed Transform is enabled, these
headers can be removed and Better Auth will warn that rate limiting was skipped.

## Component Splitting Rules

Component boundaries matter in this project. They decide how much code runs in
the Worker, how much JavaScript ships to the browser, and whether a public page
can stay static.

Default rule:

- Keep pages and layouts as small composition files.
- Put reusable UI into `src/components/**`.
- Keep data/config mapping out of JSX-heavy page files when it grows.
- Split large route files once they mix layout, cards, forms, drawers, and
  interactive widgets.

Server component rules:

- Use server components for static/public display content.
- Server components must stay free of browser hooks such as `useState`,
  `useEffect`, `usePathname`, `useTheme`, and auth client hooks.
- Do not import client-only components into broad layouts unless the UI truly
  needs to appear everywhere.
- Do not call `headers()`, `cookies()`, or auth session helpers from components
  used by SSG routes.

Client component rules:

- Use `"use client"` only at small interaction boundaries.
- Good client islands: comments, drawers, theme toggles, forms, search inputs,
  chat composer, like/favorite buttons, upload controls.
- Avoid making an entire page a client component just because one section is
  interactive.
- Keep `authClient.useSession()` inside the smallest possible account/login UI,
  not inside public content sections.

Route-specific guidance:

- Character detail pages should keep the stable profile content as SSG and move
  fast-changing pieces such as comments, likes, favorite state, and follow state
  into client islands.
- Explore pages should keep the public grid static until role data moves to a
  real backend. Filters/search can become client islands.
- Studio/chat/profile can be dynamic, but their forms, sidebars, cards, and
  drawers should still be split into focused components as they grow.

Before adding a new component, ask:

1. Does this need per-request user/session data?
2. Does this need browser state or effects?
3. Can the parent page remain SSG if this becomes a client island?
4. Will importing this component into a layout make every route heavier?

## OpenNext Config

Current config:

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
```

This matches the current SSG-heavy strategy. Do not switch to R2 cache until R2
is available and ISR is actually needed.

## Worker CPU Debug Checklist

When Cloudflare logs show `Worker exceeded CPU time limit`:

1. Check whether logs contain many `?_rsc=` requests.
2. If yes, look for `<Link>` without `prefetch={false}`.
3. Check whether public routes accidentally became dynamic.
4. Search for `headers()`, `cookies()`, `requireUser()`, `force-dynamic`.
5. Check image optimization is still disabled.
6. Check protected routes are not being prefetched.
7. Only after that, investigate cold start and bundle weight.

Useful commands:

```bash
rg -n "<Link|prefetch=" src/app src/components
rg -n "headers\\(|cookies\\(|requireUser|requireSession|force-dynamic|force-static|revalidate" src
rg -n "runtime =" src
```

## Deployment Notes

- Worker environment variables are configured in Cloudflare, not committed.
- `.dev.vars` is for local Worker-style development only.
- Keep secrets out of `wrangler.jsonc`; use Cloudflare secrets for sensitive values.
- `BETTER_AUTH_URL` should not have a trailing slash.
- `GOOGLE_CLIENT_ID` can be plain env, but `GOOGLE_CLIENT_SECRET` should be a secret.

## Current Decision Log

- Disabled broad Next Link prefetching after `_rsc` requests caused excessive
  Worker renders.
- Made stable public pages SSG.
- Kept login, chat, profile, and studio dynamic because they depend on session
  state.
- Split character comments into a client component so comments can evolve toward
  CSR without forcing the role profile page to SSR.
- Disabled Next image optimization globally.
