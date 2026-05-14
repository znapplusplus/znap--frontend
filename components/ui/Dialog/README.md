# Dialog

Centered overlay dialog (modal). Closes on Escape and backdrop click by default. Locks body scroll while open.

## Import

```tsx
import { Dialog } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | **required** | Visibility. |
| `onClose` | `() => void` | **required** | Fires on Escape, backdrop, or close button. |
| `title` | `ReactNode` | — | Header title. |
| `description` | `ReactNode` | — | Subtitle below title. |
| `footer` | `ReactNode` | — | Footer (typically action buttons). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 400 / 560 / 800 px max-width. |
| `hideClose` | `boolean` | `false` | Hide the × button. |
| `preventBackdropClose` | `boolean` | `false` | Disable backdrop-click close. |

## Usage

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm booking"
  description="You will be charged ฿500 once the photographer accepts."
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={confirm}>Confirm</Button>
    </>
  }
>
  Booking details here.
</Dialog>
```

## Do / Don't

- ✅ Always provide a `title` for screen readers (sets `aria-labelledby`).
- ✅ Put primary action on the right in `footer`.
- ❌ Don't stack dialogs.
- ❌ Don't put long forms in `size="sm"`.
