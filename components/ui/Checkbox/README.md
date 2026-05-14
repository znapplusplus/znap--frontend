# Checkbox

Custom-styled checkbox preserving the native `<input>` for accessibility.

## Import

```tsx
import { Checkbox } from "@/components/ui";
```

## Props

| Prop | Type | Description |
|---|---|---|
| `label` | `ReactNode` | Right-side label. |
| `description` | `ReactNode` | Secondary text below the label. |
| `errorText` | `string` | Inline error. |
| `size` | `"sm" \| "md"` | Box size. Defaults to `md`. |

All native `<input type="checkbox">` props pass through.

## Usage

```tsx
<Checkbox label="I agree to the terms" />
<Checkbox label="Remember me" description="Stay logged in on this device" />
<Checkbox label="Promotions" defaultChecked />
```

## Do / Don't

- ✅ Pair with a Form to enable validation flow.
- ❌ Don't use for single-on/off binary states — use Switch.
