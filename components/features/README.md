# `components/features/`

Feature-scoped components — built for a specific product feature (auth flows, photographer discovery, booking, wallet, …) and shared only across the routes that use that feature.

Today this folder hosts auth/onboarding components and photographer list items. As more features ship (booking, wallet, review), new feature components land here too.

## Components

| Component | Purpose | Doc |
|---|---|---|
| `TravelerAuthShell` | Two-column layout shell (copy + form) | [README](./TravelerAuthShell/README.md) |
| `StylePreferencePicker` | Image-tile multi-select for traveler styles | [README](./StylePreferencePicker/README.md) |
| `PhotographerStyleChips` | Icon-chip multi-select for photographer styles | [README](./PhotographerStyleChip/README.md) |
| `PhotographerListItem` | Photographer summary row (avatar + rating + location) | [README](./PhotographerListItem/README.md) |

> `StepProgress` is a generic primitive — import it from `@/components/ui` instead.

## Import

```tsx
import {
  TravelerAuthShell,
  StylePreferencePicker,
  PhotographerStyleChips,
  PhotographerListItem,
} from "@/components/features";
```

## When to add here

- The component is tied to a specific product feature (e.g. booking step, wallet card).
- It's reused across the routes that implement that feature.
- It's **not** generic enough to belong in `ui/`.
- It's **not** layout chrome or a page section.

If a feature grows large, split it into a sub-folder (e.g. `features/booking/`) and re-export through this barrel.
