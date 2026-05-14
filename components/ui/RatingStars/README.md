# RatingStars

Star + numeric rating display. Compact by default; can show all 5 stars when needed.

## Import

```tsx
import { RatingStars } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rating` | `number` | **required** | Value between 0 and 5 (clamped). Fractional allowed. |
| `count` | `number` | — | Total review count. Renders as "(N)". |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset. |
| `showValue` | `boolean` | `true` | Show the numeric value (e.g. "4.9"). |
| `showAllStars` | `boolean` | `false` | Show 5 stars instead of a single icon. |

## Usage

```tsx
<RatingStars rating={4.9} count={132} />
<RatingStars rating={4.6} count={67} size="sm" />
<RatingStars rating={5} showAllStars />
```

## Do

- Use the compact (single-star) version inside dense lists or summary cards.
- Use `showAllStars` only in profile / detail pages where the rating is the headline.

## Don't

- Don't use this for editing ratings. Build an interactive star picker separately.
- Don't omit `count` when displaying photographers in a list — users expect to see how many reviews back the rating.
