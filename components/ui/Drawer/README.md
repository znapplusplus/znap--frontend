# Drawer

Slide-out panel. Used for mobile menus, filter panels, and side sheets.

## Import

```tsx
import { Drawer } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | **required** | Visibility. |
| `onClose` | `() => void` | **required** | Fires on Escape, backdrop, or close button. |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Slide direction. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Width (left/right) or height (top/bottom). |
| `title` | `ReactNode` | — | Header title. |
| `footer` | `ReactNode` | — | Footer (typically action buttons). |
| `hideClose` | `boolean` | `false` | Hide the × button. |

## Usage

```tsx
<Drawer open={open} onClose={close} side="left" title="Menu" size="sm">
  <nav>...</nav>
</Drawer>

<Drawer open={open} onClose={close} side="bottom" size="md" title="Filters">
  <FilterForm />
</Drawer>
```

## Do / Don't

- ✅ Use `side="left"` for mobile main navigation.
- ✅ Use `side="bottom"` on mobile when the drawer is a sheet.
- ❌ Don't nest drawers.
