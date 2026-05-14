# `components/sections/`

Large composable blocks of a page — hero sections, feature grids, CTA banners, FAQ blocks.

A section is bigger than a primitive but smaller than a whole page. It typically:

- Spans the full content width.
- Composes multiple `ui/` primitives.
- Is reusable across landing-style pages (marketing, product, about).

## Components

| Component | Purpose | Doc |
|---|---|---|
| `LandingHero` | Public landing hero — kicker, headline, CTAs, stats, preview, steps | [README](./LandingHero/README.md) |

## Import

```tsx
import { LandingHero } from "@/components/sections";
```

## When to add here

- It's a self-contained section of a page (hero, features, testimonials, FAQ).
- It composes existing `ui/` primitives — don't build new primitives in `sections/`.
- It could plausibly be reused on a different page in the future.
