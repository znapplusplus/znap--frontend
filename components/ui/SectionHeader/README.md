# SectionHeader

Standard header for content sections. Title on the left, optional "view all" action on the right.

## Import

```tsx
import { SectionHeader } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | **required** | Section title text. |
| `description` | `ReactNode` | — | Subtitle / description shown below. |
| `action` | `{ label: string; href?: string; onClick?: () => void }` | — | Right-aligned action like "view all". Renders as `<Link>` if `href`, otherwise a `<button>`. |
| `variant` | `"default" \| "kicker"` | `"default"` | `kicker` renders an uppercase, tracked label (matches "EXPLORE CATEGORIES" / "TRENDING NOW" style). |

## Usage

```tsx
<SectionHeader title="Trending now" action={{ label: "view all", href: "/photographers" }} />

<SectionHeader
  variant="kicker"
  title="EXPLORE CATEGORIES"
  description="Pick a style to start a session"
/>

<SectionHeader title="Quick actions" />
```

## Do

- Use `variant="kicker"` for short labels above grids (`EXPLORE CATEGORIES`, `TRENDING NOW`, `QUICK ACTIONS`).
- Use the default (heading) variant when the title is a real H2.

## Don't

- Don't nest a SectionHeader inside another section's header.
- Don't put complex JSX inside `action` — keep it to a short link label.
