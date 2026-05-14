# Spinner

Inline loading indicator.

## Import

```tsx
import { Spinner } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 15 / 20 / 32 px. |
| `tone` | `"primary" \| "muted" \| "inverse"` | `"primary"` | Color. Use `inverse` on dark backgrounds. |
| `label` | `string` | `"Loading…"` | Accessible label. |

## Usage

```tsx
<Spinner />
<Spinner size="sm" tone="muted" />
<Button disabled><Spinner size="sm" tone="inverse" /> Saving…</Button>
```

## Do / Don't

- ✅ Use inline next to text or inside a Button while async work is in flight.
- ❌ Don't use for long waits (>2s). Show progress or Skeleton instead.
