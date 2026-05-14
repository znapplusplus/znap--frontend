# Znap++ Frontend

On-demand vacation photography — Next.js 16, React 19, TypeScript.

> **👋 New to the project?** **อ่าน [`docs/FRONTEND_RULES.md`](./docs/FRONTEND_RULES.md) ก่อนเลย** — กฎเหล็ก 9 ข้อ (เขียนเป็นภาษาไทย) ที่ทุกคนในทีมต้องอ่าน เพื่อให้โค้ดเดินไปในทิศทางเดียวกัน

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build
```

Requires Node 20+, npm 10+.

---

## Documentation

| Doc | What's inside |
|---|---|
| **⭐ [Frontend Rules (ไทย)](./docs/FRONTEND_RULES.md)** | **กฎเหล็ก 9 ข้อ — อ่านก่อนเขียนโค้ด** |
| [Design System](./docs/DESIGN_SYSTEM.md) | All design tokens — colors, typography, spacing, radius, shadows, semantic states. |
| [Coding Standards](./docs/CODING_STANDARDS.md) | TypeScript, React, CSS rules, naming, folder structure. |
| [Component Guide](./docs/COMPONENT_GUIDE.md) | How to build a component, templates, Do/Don't, a11y checklist. |
| [Contributing](./docs/CONTRIBUTING.md) | Branch naming, commit format, PR checklist. |

**แนะนำลำดับการอ่าน:** Frontend Rules → Design System → Coding Standards → Component Guide → Contributing

---

## Project structure

```
znap-frontend/
├── app/                       # Next.js App Router (pages, layouts)
├── components/
│   ├── ui/                    # Primitives (Button, Input, TagInput, …)
│   ├── layout/                # Site chrome (Navbar, Footer)
│   ├── sections/              # Page sections (LandingHero, …)
│   └── features/              # Feature-scoped (auth, booking, wallet, …)
├── docs/                      # ← Documentation hub
├── lib/                       # Utilities, API clients
├── public/                    # Static assets
└── styles/
    └── tokens.css             # Design tokens — single source of truth
```

**Where new code goes:**

| Type | Location |
|---|---|
| Reusable primitive (Button, Card, Slider) | `components/ui/` |
| Layout chrome (Navbar, Footer, Sidebar) | `components/layout/` |
| Page section (Hero, FAQ, CTA banner) | `components/sections/` |
| Feature-scoped component (auth, booking, …) | `components/features/` |
| One-off element used once | Inside the page's `page.tsx` |

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + TypeScript
- **Styling:** CSS Modules + design tokens (no Tailwind)
- **Fonts:** Montserrat (heading), Poppins (body), Noto Sans Thai (Thai), Geist Mono (code) — all via `next/font`
- **Backend:** .NET 10 Web API
- **Database:** Supabase PostgreSQL + PostGIS

## Live preview

- `/` — Landing page
- `/design-system` — Component / token preview, browseable by category
- `/dashboard` — Authenticated dashboard
- `/admin` — Admin shell

---

## Working with this repo

- We don't use Tailwind. All styles use CSS Modules + design tokens. See [Coding Standards](./docs/CODING_STANDARDS.md).
- Every new visual change should reference an existing design token. If you need a new value, add it to `styles/tokens.css` first and document it.
- See [Contributing](./docs/CONTRIBUTING.md) before opening a PR.

## Conventions cheat sheet

| Thing | Convention |
|---|---|
| Component folder | `PascalCase/` |
| File names | `PascalCase.tsx`, `PascalCase.module.css` |
| CSS classes | `camelCase` |
| Path imports | `@/...` for cross-folder, `./` for same-folder |
| Spacing in CSS | `var(--space-md)` — never `16px` |
| Colors in CSS | `var(--color-primary)` — never `#255AB1` |
| Headings (`h1`–`h6`) | Use as-is. Sizes auto-scale via `clamp()` in `globals.css`. |
