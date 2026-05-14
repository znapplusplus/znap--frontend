# PriceTag

Formatted price display with currency symbol, amount, and optional unit/discount styles.

## Import

```tsx
import { PriceTag } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `amount` | `number` | **required** | Numeric amount. |
| `currency` | `"THB" \| "USD" \| "EUR" \| "JPY" \| string` | `"THB"` | Currency code. |
| `unit` | `string` | — | Unit suffix (e.g. `/hr`, `/session`). |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Font scale. |
| `muted` | `boolean` | `false` | Subdued color. |
| `strikethrough` | `boolean` | `false` | Old/discount price. |
| `emphasis` | `boolean` | `false` | Brand primary color. |

## Usage

```tsx
<PriceTag amount={500} unit="/hr" />
<PriceTag amount={1200} size="xl" emphasis />
<PriceTag amount={2000} strikethrough size="sm" />
```

## Do / Don't

- ✅ Use `emphasis` for the headline price on a booking detail page.
- ❌ Don't put PriceTag inside a Button — pass plain text instead so the button's font scale applies.
