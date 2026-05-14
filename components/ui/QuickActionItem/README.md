# QuickActionItem

Row item with leading icon, title + subtitle, and trailing chevron. Used in "Quick Actions" panels, menu lists, and settings groups.

## Import

```tsx
import { QuickActionItem } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | **required** | Leading icon — shown in a tinted circular wrap. |
| `title` | `string` | **required** | Primary line. |
| `subtitle` | `string` | — | Secondary line below the title. |
| `href` | `string` | — | Renders as Next.js `<Link>` when set. |
| `onClick` | `() => void` | — | Click handler when no `href`. |
| `tone` | `"primary" \| "secondary" \| "muted"` | `"primary"` | Icon background tint. |
| `hideChevron` | `boolean` | `false` | Hide the trailing chevron. |

## Usage

```tsx
<QuickActionItem
  icon={<PinIcon />}
  title="Near me"
  subtitle="Find photographers nearby"
  href="/find-photographer?near=me"
/>

<QuickActionItem
  icon={<CameraIcon />}
  title="Find a photographer"
  subtitle="Search with filters"
  href="/find-photographer"
/>

<QuickActionItem
  icon={<FireIcon />}
  title="Trending this month"
  subtitle="Best photographers"
  tone="secondary"
/>
```

## Do

- Use inside a Card or list container — the divider style assumes a stacked context.
- Pair with `SectionHeader` to label the group.

## Don't

- Don't put more than ~6 items in a single QuickActions group — split with another SectionHeader.
- Don't use this for primary CTAs. Use Button.
