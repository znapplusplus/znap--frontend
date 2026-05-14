# PhotographerListItem

Photographer summary row: avatar + name + rating + location. Used in "Trending Now", search results, and any photographer list.

Composes `Avatar` and `RatingStars` from `@/components/ui`.

## Import

```tsx
import { PhotographerListItem } from "@/components/features";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | **required** | Display name. |
| `avatarUrl` | `string` | — | Avatar image URL. Initials are used if omitted. |
| `rating` | `number` | **required** | Average rating, 0–5. |
| `ratingCount` | `number` | **required** | Number of reviews. |
| `location` | `string` | **required** | City / region. |
| `href` | `string` | — | Renders as Next.js `<Link>` when set. |
| `onClick` | `() => void` | — | Click handler when no `href`. |
| `size` | `"sm" \| "md"` | `"md"` | Compact variant for dense lists. |

## Usage

```tsx
<PhotographerListItem
  name="Bundee J."
  avatarUrl="/photographers/bundee.jpg"
  rating={4.9}
  ratingCount={132}
  location="Bangkok"
  href="/photographers/bundee"
/>

<PhotographerListItem
  name="Jitdee S."
  rating={4.8}
  ratingCount={92}
  location="Bangkok"
  size="sm"
/>
```

## Do

- Provide `avatarUrl` whenever possible — initials are a fallback, not a default.
- Use `size="sm"` inside narrow side panels (`Trending Now` style).

## Don't

- Don't manually format the rating string — the embedded `RatingStars` does that.
- Don't add custom action buttons inside the item. If you need actions, wrap with a Card and render the item alongside Button(s).
