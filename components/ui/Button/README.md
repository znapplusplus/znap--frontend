# Button

Reusable pill-shaped button. Renders as `<button>` by default, or as a Next.js `<Link>` when `href` is provided.

## Import

```tsx
import { Button } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "accent" \| "danger" \| "icon" \| "unstyled"` | `"primary"` | Visual style. Use `unstyled` to opt out of all built-in styles. Use `accent` (orange) for creator/photographer-related CTAs. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height & padding scale (28 / 42 / 52px). |
| `fullWidth` | `boolean` | `false` | Stretch to container width. |
| `href` | `string` | — | When set, renders as a Next.js `<Link>`. |
| `disabled` | `boolean` | `false` | Disabled state (works for both button and link). |

All other native `<button>` or `<a>` attributes are passed through.

## Usage

```tsx
<Button variant="primary" size="lg" fullWidth>Book now</Button>
<Button href="/dashboard" variant="outline">Open dashboard</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
<Button variant="icon" aria-label="Close"><CloseIcon /></Button>
```

## Variants at a glance

- **primary** — main CTA, brand blue fill
- **secondary** — neutral, white surface with border
- **outline** — brand blue border, white fill
- **ghost** — transparent, used inside dense UIs
- **accent** — orange fill, for creator/photographer-related CTAs
- **danger** — destructive actions (uses `--color-error`)
- **icon** — compact circular icon button
- **unstyled** — escape hatch when you need a `<button>` element without our visual style (e.g. you supply a custom class)

## Do

- Use `Button` for any clickable action — never a raw `<div onClick>`.
- Use `href` instead of nesting `<Link><Button /></Link>`.
- Pass `aria-label` when the button shows only an icon.

## Don't

- Don't mix Tailwind utility classes with `Button`. Wrap or extend via CSS Modules.
- Don't inline-style `Button` — extend with `className` if you really need to.
- Don't use `variant="unstyled"` unless you're explicitly building a new pattern.

## Accessibility

- Renders `aria-disabled` on the link variant (which is otherwise still keyboard-focusable).
- Visible focus ring via `--focus-ring`.
- `aria-disabled="true"` links don't fire `onClick`.
