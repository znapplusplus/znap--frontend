# CategoryTile

Image-first card used for "Explore Categories" — full-bleed photo with circular icon badge top-left and label overlay bottom-left.

## Import

```tsx
import { CategoryTile } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | **required** | Category name shown bottom-left. |
| `imageSrc` | `string` | **required** | Background image URL. |
| `imageAlt` | `string` | `label` | Alt text override. |
| `icon` | `ReactNode` | — | Optional icon in a circular orange badge. |
| `aspect` | `"square" \| "landscape" \| "portrait"` | `"landscape"` | Tile aspect ratio. |
| `href` | `string` | — | Renders as Next.js `<Link>` when set. |
| `onClick` | `() => void` | — | Click handler when no `href`. |

## Usage

```tsx
<CategoryTile
  label="Portrait"
  imageSrc="/categories/portrait.jpg"
  icon={<PortraitIcon />}
  href="/explore/portrait"
/>

<CategoryTile
  label="Wedding"
  imageSrc="/categories/wedding.jpg"
  icon={<RingIcon />}
  aspect="square"
  onClick={() => openCategory("wedding")}
/>
```

## Do

- Always provide `icon` for visual hierarchy — categories without icons look unfinished.
- Use `aspect="square"` for tile grids, `landscape` for hero categories, `portrait` for sidebar accents.

## Don't

- Don't write multi-line labels — the overlay is sized for short category names.
- Don't pass non-photographic backgrounds. The gradient overlay assumes a real image underneath.
