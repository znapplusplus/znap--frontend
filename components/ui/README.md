# `components/ui/`

App-agnostic UI primitives. Anything imported from `@/components/ui` should be safe to drop into any page without context.

> Full authoring guide: [`docs/COMPONENT_GUIDE.md`](../../docs/COMPONENT_GUIDE.md)
> Design tokens reference: [`docs/DESIGN_SYSTEM.md`](../../docs/DESIGN_SYSTEM.md)

## Components

### Foundations
| Component | Purpose | Doc |
|---|---|---|
| `Avatar` | Circular profile image with initials fallback | [README](./Avatar/README.md) |
| `Badge` | Pill-shaped label / chip with semantic variants | [README](./Badge/README.md) |
| `Button` | Pill button, also renders as `<Link>` | [README](./Button/README.md) |
| `Card` | Generic surface wrapper | [README](./Card/README.md) |
| `Divider` | Horizontal/vertical separator with optional label | [README](./Divider/README.md) |
| `PriceTag` | Currency-formatted price display | [README](./PriceTag/README.md) |
| `RatingStars` | Star + rating value + count | [README](./RatingStars/README.md) |
| `SectionHeader` | Section title + optional "view all" action | [README](./SectionHeader/README.md) |

### Inputs
| Component | Purpose | Doc |
|---|---|---|
| `Input` | Text/email/password/textarea with states | [README](./Input/README.md) |
| `Checkbox` | Styled checkbox with label & error | [README](./Checkbox/README.md) |
| `Switch` | On/off toggle (`role="switch"`) | [README](./Switch/README.md) |
| `Select` | Styled native `<select>` | [README](./Select/README.md) |
| `TagInput` | Free-form tag chips (Enter / `,` to add) | [README](./TagInput/README.md) |
| `RangeSlider` | Single-value slider | [README](./RangeSlider/README.md) |
| `FileUploadCard` | Image upload with preview | [README](./FileUploadCard/README.md) |

### Feedback
| Component | Purpose | Doc |
|---|---|---|
| `Alert` | Inline notification (info/success/warning/error) | [README](./Alert/README.md) |
| `EmptyState` | Empty list / search / initial state placeholder | [README](./EmptyState/README.md) |
| `Skeleton` | Animated loading placeholder | [README](./Skeleton/README.md) |
| `Spinner` | Inline loading spinner | [README](./Spinner/README.md) |
| `StepProgress` | "Step N of M" progress bar | [README](./StepProgress/README.md) |

### Navigation
| Component | Purpose | Doc |
|---|---|---|
| `Tabs` | Tab strip (underline / pill) | [README](./Tabs/README.md) |
| `Pagination` | Numbered page navigation | [README](./Pagination/README.md) |

### Overlays
| Component | Purpose | Doc |
|---|---|---|
| `Dialog` | Centered modal dialog | [README](./Dialog/README.md) |
| `Drawer` | Slide-out panel (left/right/top/bottom) | [README](./Drawer/README.md) |
| `Tooltip` | Hover label | [README](./Tooltip/README.md) |

### Composites
| Component | Purpose | Doc |
|---|---|---|
| `CategoryTile` | Image card with icon + label (Explore) | [README](./CategoryTile/README.md) |
| `QuickActionItem` | Row item with icon + title + chevron | [README](./QuickActionItem/README.md) |

## Import

```tsx
import { Button, Avatar, Badge, Card, Dialog, Drawer } from "@/components/ui";
```

## Folder shape (required)

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── index.ts
└── README.md
```

## Hard rules

- ✅ Use design tokens for **every** color/spacing/radius/shadow.
- ✅ Use CSS Modules — never inline styles, never Tailwind utilities.
- ✅ Provide `aria-*` and keyboard support out of the box.
- ❌ Don't put page-specific components here. Move them under `components/sections/` or co-locate.
- ❌ Don't put layout components here. Move them under `components/layout/`.
- ❌ Don't put feature-scoped components here. Move them under `components/features/`.

## Adding a new component

See [`docs/COMPONENT_GUIDE.md`](../../docs/COMPONENT_GUIDE.md) for the full checklist and template.
