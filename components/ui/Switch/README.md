# Switch

On/off toggle. Uses `role="switch"` on the underlying input.

## Import

```tsx
import { Switch } from "@/components/ui";
```

## Props

| Prop | Type | Description |
|---|---|---|
| `label` | `ReactNode` | Left-side label. |
| `description` | `ReactNode` | Secondary text below the label. |
| `size` | `"sm" \| "md"` | Track size. |

All native checkbox props pass through (use `checked` + `onChange` for controlled use).

## Usage

```tsx
<Switch label="Available for bookings" description="Show your profile in search" />
<Switch label="Email updates" defaultChecked />
```

## Do / Don't

- ✅ Use for instant on/off changes (settings, toggles).
- ❌ Don't use Switch when the user must Save afterward — use Checkbox in that case.
