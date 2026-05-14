# PhotographerStyleChips

Chip-style multi-select used during photographer onboarding (icon + label per chip).

## Import

```tsx
import { PhotographerStyleChips } from "@/components/features";
import type { PhotographerStyleOption } from "@/components/features";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `PhotographerStyleOption[]` | **required** | `{ id, label, icon }`. `icon` is plain text/emoji rendered as-is. |
| `selected` | `string[]` | **required** | Selected IDs (controlled). |
| `onChange` | `(selected: string[]) => void` | **required** | Receives the new selection. |
| `columns` | `2 \| 3` | `3` | Grid column count. |

## Usage

```tsx
<PhotographerStyleChips
  options={[
    { id: "portrait", label: "Portrait", icon: "👤" },
    { id: "wedding",  label: "Wedding",  icon: "💍" },
  ]}
  selected={selected}
  onChange={setSelected}
/>
```

## Do

- Use `columns={2}` on narrow forms, `columns={3}` on wide.
- Keep `icon` to a single character/emoji — multi-char strings break layout.

## Don't

- Don't confuse with `StylePreferencePicker` — that one shows photo tiles for travelers; this one shows icon chips for photographers.
- Don't pass remote SVGs through `icon`. Use a separate prop in a fork if you need full icon components.
