# Select

Native `<select>` styled to match Input. Custom chevron, status states, native a11y.

## Import

```tsx
import { Select } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | **required** | List of `{ value, label, disabled? }`. |
| `label` | `ReactNode` | — | Label above. |
| `placeholder` | `string` | — | First disabled option shown when no value. |
| `helperText` | `ReactNode` | — | Helper text below. |
| `errorText` | `string` | — | Error message (also tints the field). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height preset. |
| `fullWidth` | `boolean` | `false` | Stretch to container. |

All native `<select>` props pass through.

## Usage

```tsx
const cities = [
  { value: "bkk", label: "Bangkok" },
  { value: "cnx", label: "Chiang Mai" },
  { value: "hkt", label: "Phuket" },
];

<Select
  label="City"
  placeholder="Choose a city"
  options={cities}
  value={city}
  onChange={(e) => setCity(e.target.value)}
  fullWidth
/>
```

## Do / Don't

- ✅ Use for simple, short option lists.
- ❌ Don't use for searching — build a combobox component instead.
