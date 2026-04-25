# Comment Creator Studio — Next.js

Converted from the original Vite + React project to Next.js 15 (App Router) + React 19.

## Stack

- Next.js 15 (App Router, RSC)
- React 19
- TypeScript
- Tailwind CSS 3 + shadcn/ui
- Radix UI primitives
- TanStack Query
- lucide-react icons
- html2canvas for screenshot export

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build & start

```bash
npm run build
npm start
```

## Routes

| URL | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/blog` | `app/blog/page.tsx` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/pricing` | `app/pricing/page.tsx` |
| `/login` | `app/login/page.tsx` |
| 404 | `app/not-found.tsx` |

## What changed during conversion

- Replaced Vite (`vite`, `vitest`, `lovable-tagger`) with Next.js 15.
- Replaced `react-router-dom` with `next/link` and `next/navigation`
  (`useRouter`, `usePathname`, `useSearchParams`, `notFound`).
- Each page from `src/pages/*` was moved into the App Router under `app/<route>/page.tsx`.
- `src/index.css` → `app/globals.css`, imported in the root layout.
- Added `'use client'` directives to components that use state, refs, browser APIs, or event handlers.
- Providers (`QueryClientProvider`, `TooltipProvider`, `Toaster`, Sonner) extracted to `app/providers.tsx`.
- Removed the unused `react-router-dom` `NavLink` shim.
- Removed Vite-only files: `vite.config.ts`, `vite-env.d.ts`, `index.html`, `src/main.tsx`, `tsconfig.app.json`, `tsconfig.node.json`, Playwright/Vitest configs.
- Tailwind `content` glob updated to scan `app/`, `components/`, `hooks/`, `lib/`.
- React upgraded to v19 to match Next.js 15's recommended pairing.
- `tsconfig.json` paths use `"@/*": ["./*"]` (project root), matching App Router conventions.

## Project structure

```
.
├── app/                     # Next.js App Router pages + layout
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── login/
│   ├── pricing/
│   └── not-found.tsx
├── components/              # Shared UI components (shadcn/ui + custom)
├── hooks/
├── lib/
├── data/
├── types/
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```
