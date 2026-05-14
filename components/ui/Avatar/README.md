# Avatar

Circular profile image. Falls back to initials if no `src` is provided or image fails.

## Import

```tsx
import { Avatar } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL. If omitted, falls back to initials. |
| `name` | `string` | — | Display name. Used for initials and alt text. |
| `alt` | `string` | `name` | Alt text override. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Diameter preset (24 / 32 / 40 / 48 / 64 px). |
| `variant` | `"default" \| "traveler" \| "photographer"` | `"default"` | Role border ring (blue for traveler, orange for photographer). |
| `status` | `"online" \| "offline" \| null` | `null` | Small status dot at bottom-right. |

## Usage

```tsx
<Avatar src="/me.jpg" name="Jodaney" size="md" />
<Avatar name="Sofarey" size="lg" variant="photographer" status="online" />
<Avatar name="Mooomoo RedPanda" size="xl" />  {/* shows "MR" initials */}
```

## Do

- Provide `name` even when `src` is set — it's used as `alt` text for accessibility.
- Use `variant="photographer"` (orange ring) for photographer-role displays.

## Don't

- Don't use Avatar for non-person images (logos, products). Use a plain `<img>` instead.
- Don't pass a non-square image without cropping it first — the avatar centers and crops via `object-fit: cover`.
