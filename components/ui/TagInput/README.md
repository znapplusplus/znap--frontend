# TagInput

Free-form tag input. Adds a tag on `Enter` or `,`. Removes the last tag on `Backspace` when the input is empty.

## Import

```tsx
import { TagInput } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string[]` | **required** | Current tag list (controlled). |
| `onChange` | `(tags: string[]) => void` | **required** | Receives the next list of tags. |
| `label` | `string` | — | Field label rendered above the input. |
| `placeholder` | `string` | `"Type and press Enter to add"` | Empty-state placeholder. |
| `helperText` | `string` | — | Helper text below the field. |
| `errorText` | `string` | — | Error message (red border + text). |
| `disabled` | `boolean` | `false` | Disable input & removal. |
| `maxTags` | `number` | — | Optional cap. Input is disabled once reached. |

## Usage

```tsx
const [tags, setTags] = useState<string[]>(["portrait", "street"]);

<TagInput
  label="Styles"
  value={tags}
  onChange={setTags}
  helperText="Add up to 5 styles"
  maxTags={5}
/>
```

## Do

- Trim whitespace upstream if you persist tags to the server.
- Use `maxTags` to cap user input rather than validating after submit.

## Don't

- Don't pre-fill `value` with duplicates — duplicates are silently dropped by the component.
- Don't put TagInput inside a `<form>` without `onKeyDown` handling — `Enter` is intercepted to add a tag, never to submit.
