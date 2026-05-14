# Coding Standards

How we write code in the Znap++ frontend. Read this before opening a PR.

## TL;DR

- TypeScript everywhere. No `any` unless commented why.
- CSS Modules + design tokens. **No Tailwind, no inline styles.**
- One folder per component. Always.
- All shared components live under `components/ui/`.
- Path alias `@/*` maps to project root.

---

## Folder & file structure

```
znap-frontend/
├── app/                       # Next.js App Router
│   ├── globals.css            # Base reset + responsive headings
│   ├── layout.tsx             # Font setup, html shell
│   ├── page.tsx               # Public landing
│   ├── design-system/         # Live token / component preview
│   ├── login/  register/
│   ├── dashboard/             # Authenticated traveler/photographer
│   ├── become-creator/
│   ├── admin/                 # Admin shell + nested pages
│   └── photographer/
├── components/
│   ├── ui/                    # Shared primitives (Button, Input, …)
│   ├── layout/                # Site chrome (Navbar, Footer)
│   ├── sections/              # Page sections (LandingHero, …)
│   └── features/              # Feature-scoped (auth, booking, …)
├── docs/                      # ← you are here
├── lib/                       # Pure TS utilities, API clients
├── public/                    # Static assets
└── styles/
    └── tokens.css             # Design tokens (single source of truth)
```

### Where new code goes

| Type of code | Location |
|---|---|
| Reusable primitive (Button, Card, Slider, StepProgress) | `components/ui/<Name>/` |
| Layout chrome (Navbar, Footer, Sidebar) | `components/layout/<Name>/` |
| Page section (Hero, FAQ block, CTA banner) | `components/sections/<Name>/` |
| Feature-scoped component (auth shell, booking step) | `components/features/<Name>/` |
| One-off element used once in a page | Inside that page's `page.tsx` |
| Pure utility (date format, currency) | `lib/<name>.ts` |
| API client | `lib/<area>-api.ts` |
| Design token | `styles/tokens.css` (only place) |
| Base reset / global rule | `app/globals.css` |

---

## Naming

| Thing | Convention | Example |
|---|---|---|
| Component folder | `PascalCase` | `FileUploadCard/` |
| Component file | `PascalCase.tsx` | `FileUploadCard.tsx` |
| CSS module | `PascalCase.module.css` | `FileUploadCard.module.css` |
| CSS class name | `camelCase` | `.cameraButton` |
| Hook | `useCamelCase` | `useUser`, `useDebounced` |
| Util function | `camelCase` | `formatCurrency` |
| Constant | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_SIZE` |
| Type / Interface | `PascalCase` | `ButtonProps`, `Role` |
| Boolean prop | `is`/`has`/`should` prefix | `isLoading`, `hasError` |
| Event handler | `on` prefix | `onChange`, `onClose` |

---

## TypeScript rules

- **Always type your props.** Export the props type so callers can extend.
  ```tsx
  export type ButtonProps = {
    variant?: "primary" | "secondary";
    children: ReactNode;
  };
  ```
- **Prefer `type` over `interface`** unless you need declaration merging.
- **Don't use `any`.** Use `unknown` and narrow, or `never` for exhaustive checks. If you absolutely must, leave a `// eslint-disable-next-line` with a one-line justification.
- **Avoid non-null assertion (`!`).** Use a guard or default.
- **Use discriminated unions** for state machines instead of multiple booleans.
  ```tsx
  // Good
  type Status = { kind: "idle" } | { kind: "loading" } | { kind: "error"; message: string };
  // Avoid
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  ```

---

## React rules

- **Functional components only.** No class components.
- **Use hooks at the top.** Never inside conditions/loops.
- **No `useEffect` for derived state.** Compute during render or use `useMemo`.
- **Co-locate small subcomponents** in the same file if they're truly internal. Promote to their own file when they're imported elsewhere or grow past ~40 lines.
- **`"use client"` directives** only where needed (anything using state, effects, refs, browser APIs).
- **Server components by default** under `app/`.

### Imports order

```tsx
// 1. React / Next
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libs
import { z } from "zod";

// 3. Project (via @/ alias)
import { Button } from "@/components/ui";
import { fetchUser } from "@/lib/admin-api";

// 4. Same-folder (relative)
import styles from "./Component.module.css";
```

Always use `@/...` for cross-folder imports. Use `./` only within the same component folder.

---

## CSS rules

### Always

- ✅ Use `Component.module.css` for every component.
- ✅ Use design tokens for **every** color, spacing, radius, shadow, transition.
- ✅ Reference tokens via `var(--token-name)`.

### Never

- ❌ No Tailwind utility classes anywhere.
- ❌ No inline `style={{...}}` for design values. Inline styles are allowed **only** for dynamic values that can't live in CSS (e.g. `style={{ left: \`${percent}%\` }}`).
- ❌ No hardcoded hex/rgb in `.module.css`. If a token is missing, add it to `tokens.css` first.
- ❌ No `!important` unless you can write a paragraph justifying it.
- ❌ Don't redefine spacing as `1rem`, `1.25rem`, etc. Use `--space-md`, `--space-lg`.

### Patterns

```css
/* Good */
.card {
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-normal);
}

/* Bad */
.card {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
}
```

### Responsive

Prefer `clamp()` and intrinsic CSS (`min()`, `max()`, `grid-template-columns: repeat(auto-fit, …)`) before reaching for `@media`. Use media queries for layout breakpoints, not for typography.

Recommended breakpoints (mobile-first):
- `@media (min-width: 640px)` — small tablet
- `@media (min-width: 768px)` — tablet
- `@media (min-width: 1024px)` — desktop
- `@media (min-width: 1280px)` — wide

---

## Linting & formatting

- ESLint config: `eslint.config.mjs` (extends `next/core-web-vitals` + project rules).
- Run before pushing:
  ```bash
  npm run lint
  ```
- Editor: enable format-on-save. We follow the default Prettier/ESLint conventions baked into the Next.js template.

---

## Accessibility (a11y) minimums

Every interactive element must:

- Be focusable via keyboard (Tab / Shift+Tab).
- Have a visible focus state (use `var(--focus-ring)`).
- Have an accessible name. Icon-only buttons require `aria-label`.
- Use semantic HTML first: `<button>` for actions, `<a>` for navigation, `<input>` for input.
- Maintain contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text.

Run a quick check with Lighthouse → Accessibility before merging significant UI changes.

---

## Performance defaults

- Use `next/image` for raster assets in pages (not in inline SVGs).
- Lazy-load anything below the fold (`loading="lazy"`).
- Avoid `useEffect` for data fetching in Server Components — fetch in the server function.
- Memoize heavy computations with `useMemo`; memoize stable callbacks with `useCallback` only when they cross a memo boundary.
