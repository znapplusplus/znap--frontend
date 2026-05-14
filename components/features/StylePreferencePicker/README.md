# StylePreferencePicker

Image-tile multi-select used during onboarding to capture style preferences.

## Import

```tsx
import { StylePreferencePicker } from "@/components/features";
import type { StyleOption } from "@/components/features";
```

## Props

| Prop | Type | Description |
|---|---|---|
| `options` | `StyleOption[]` | List of `{ id, label, imageUrl }`. |
| `selected` | `string[]` | Selected IDs (controlled). |
| `onChange` | `(selected: string[]) => void` | Receives the new selection. |

## Usage

```tsx
const [selected, setSelected] = useState<string[]>([]);

<StylePreferencePicker
  options={[
    { id: "portrait", label: "Portrait", imageUrl: "/styles/portrait.jpg" },
    { id: "street",   label: "Street",   imageUrl: "/styles/street.jpg" },
  ]}
  selected={selected}
  onChange={setSelected}
/>
```

## Do

- Provide square-ish images — the grid expects ~1:1 aspect ratio.
- Cap the number of selections at the form level (this component doesn't enforce a max).

## Don't

- Don't use for single-select — toggling here always multi-selects. For single-choice, build a radio-style picker.
- Don't pass remote URLs without verifying they're CDN-cached — every tile loads its image eagerly.
