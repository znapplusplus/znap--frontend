# Alert

Inline notification banner with a leading icon, title, message, and optional dismiss.

## Import

```tsx
import { Alert } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Color scheme. |
| `title` | `ReactNode` | — | Optional bold title line. |
| `children` | `ReactNode` | — | Message body. |
| `icon` | `ReactNode` | — | Custom icon. Defaults to a variant icon. |
| `onClose` | `() => void` | — | Adds a dismiss × button. |

## Usage

```tsx
<Alert variant="success" title="Saved" onClose={() => {}}>
  Your profile has been updated.
</Alert>

<Alert variant="error">Unable to upload the photo. Try again.</Alert>
```

## Do / Don't

- ✅ Use `error` for blocking issues, `warning` for caution, `success` for confirmations, `info` for context.
- ❌ Don't auto-dismiss alerts inline. Use Toast for ephemeral notifications.
