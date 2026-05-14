# Tooltip

Pure CSS hover tooltip. Wraps any element and shows a small label on hover/focus.

## Import

```tsx
import { Tooltip } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | **required** | Tooltip content. |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Position relative to the trigger. |
| `children` | `ReactNode` | **required** | The trigger element. |

## Usage

```tsx
<Tooltip label="Delete this photo">
  <Button variant="icon" aria-label="Delete"><TrashIcon /></Button>
</Tooltip>
```

## Do / Don't

- ✅ Use for icon-only buttons or terse UI to expose meaning on hover.
- ❌ Don't put critical information inside — tooltips are not reliable on touch devices.
