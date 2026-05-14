# RangeSlider

Single-value slider with a floating value label and a min/max footer.

## Import

```tsx
import { RangeSlider } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | **required** | Current value (controlled). |
| `onChange` | `(value: number) => void` | **required** | Fires on every change. |
| `min` | `number` | **required** | Lower bound. |
| `max` | `number` | **required** | Upper bound. |
| `step` | `number` | `1` | Increment. |
| `label` | `string` | — | Field label rendered above the slider. |
| `unit` | `string` | `""` | Appended to value/min/max labels. |
| `formatValue` | `(value: number) => string` | — | Overrides default formatting entirely. |
| `disabled` | `boolean` | `false` | — |

## Usage

```tsx
const [budget, setBudget] = useState(500);

<RangeSlider
  label="Hourly budget"
  value={budget}
  min={100}
  max={2000}
  step={50}
  onChange={setBudget}
  formatValue={(n) => `฿${n.toLocaleString()}`}
/>
```

## Do

- Use `formatValue` for currency, distance, or time formatting.
- Pair with a number `Input` for precise entry on mobile.

## Don't

- Don't use RangeSlider for "range with two thumbs" — this component is single-value only.
- Don't bind `onChange` to expensive computations — fires on every drag tick. Debounce upstream if needed.

## Accessibility

- The native `<input type="range">` is preserved for keyboard and screen reader support.
- `aria-valuenow`, `aria-valuetext`, `aria-valuemin`, `aria-valuemax` are all set.
