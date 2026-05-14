# Card

Generic surface wrapper. Use as the building block for panels, action cards, info blocks.

## Import

```tsx
import { Card } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "outline" \| "elevated" \| "ghost"` | `"default"` | Border / shadow style. |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Inner padding from spacing tokens. |
| `interactive` | `boolean` | `false` | Adds hover lift + focus ring. Use when the whole card is clickable. |
| `as` | `"div" \| "section" \| "article" \| "li"` | `"div"` | Semantic element. |

All other native attributes pass through to the root element.

## Usage

```tsx
<Card>Default card with padding md</Card>
<Card variant="outline" padding="lg">Outline card with larger padding</Card>
<Card variant="elevated" padding="md">Lifted card with shadow-md</Card>
<Card variant="ghost" padding="md">Dashed placeholder card</Card>
<Card interactive as="li" onClick={() => {}}>Clickable list card</Card>
```

## Do

- Use `interactive` when the entire card is the click target (avoid putting buttons inside an interactive Card).
- Use `padding="none"` when the card hosts a media element that should bleed to the edge — apply inner padding to children.

## Don't

- Don't nest interactive Cards inside each other.
- Don't use Card variants to encode meaning (status, success). Use Badge or Alert patterns instead.
