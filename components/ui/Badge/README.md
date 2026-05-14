# Badge

Pill-shaped label with optional icon. Used for status indicators, category chips, and inline tags.

## Import

```tsx
import { Badge } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "error" \| "info" \| "neutral"` | `"default"` | Color scheme. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset. `sm` is uppercase + tracked for stat-style labels. |
| `icon` | `ReactNode` | — | Optional icon placed before the label. |

## Usage

```tsx
<Badge variant="primary">Friends Moment</Badge>
<Badge variant="secondary" icon={<FireIcon />}>Modern Thai</Badge>
<Badge variant="success" size="sm">Online</Badge>
<Badge variant="warning" size="sm">Coming soon</Badge>
<Badge variant="error">3 errors</Badge>
```

## Do

- Use `success` / `warning` / `error` / `info` for status states — colors come from semantic tokens automatically.
- Use `primary` for category chips that should feel brand-aligned.
- Use `secondary` (orange) sparingly — reserve for accent moments like featured items.

## Don't

- Don't put long-form content in a Badge. If you need wrapping, use a Card instead.
- Don't apply Badge to interactive controls. Use Button with the appropriate variant.
