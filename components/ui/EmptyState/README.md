# EmptyState

Placeholder for empty lists, search results, or initial states.

## Import

```tsx
import { EmptyState } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | **required** | Main heading. |
| `description` | `ReactNode` | — | Supporting copy. |
| `icon` | `ReactNode` | — | Illustration or icon. |
| `action` | `ReactNode` | — | Primary action area (typically a Button). |
| `variant` | `"default" \| "compact"` | `"default"` | `compact` removes vertical padding. |

## Usage

```tsx
<EmptyState
  icon={<CameraIcon />}
  title="No bookings yet"
  description="Once a photographer accepts your request, it'll appear here."
  action={<Button href="/find-photographer">Find a photographer</Button>}
/>
```

## Do / Don't

- ✅ Always include an `action` when the user can do something next.
- ❌ Don't use for error states — use Alert for errors.
