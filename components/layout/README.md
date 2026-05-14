# `components/layout/`

Site chrome — components that appear on every page or define the page frame.

## Components

| Component | Purpose | Doc |
|---|---|---|
| `Navbar` | Top navigation (guest / traveler / photographer variants) | [README](./Navbar/README.md) |
| `Footer` | Public footer with brand line and nav links | [README](./Footer/README.md) |

## Import

```tsx
import { Navbar, Footer } from "@/components/layout";
```

## When to add here

- The component is part of the page **frame** (header, footer, sidebar, breadcrumb).
- It's used on multiple pages or page groups.

If a layout piece is page-specific (e.g. an admin sidebar that only exists in `/admin`), keep it inside that page's folder instead.
