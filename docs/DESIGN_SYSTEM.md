# Design System Reference

Single source of truth for visual design in the Znap++ frontend.

All values live in [`styles/tokens.css`](../styles/tokens.css). Never hardcode colors, spacing, or sizes in component CSS.

---

## Foundations

### Color

#### Primary
| Token | Hex | When to use |
|---|---|---|
| `--color-primary` | `#255AB1` | Main brand color. CTAs, links, brand marks. |
| `--color-primary-hover` | `#173D7A` | Button hover state. |
| `--color-primary-active` | `#1E4C99` | Button pressed / active state. |
| `--color-secondary` | `#F29900` | Accent. Photographer/creator highlights, focus stops. |
| `--color-accent` | `#D98200` | Darker orange for hover on secondary. |
| `--color-secondary-light` | `#FFB639` | Lighter orange for highlights, caption text. |

#### Surface
| Token | Hex | When to use |
|---|---|---|
| `--color-background` | `#ECECEC` | Page background. |
| `--color-surface` | `#F6F6F7` | Cards, inputs, raised elements. |
| `--color-card` | `#FFFFFF` | Pure white card surface (when contrast with `--color-surface` matters). |

#### Text
| Token | Hex | When to use |
|---|---|---|
| `--color-text` | `#484848` | Default body text. |
| `--color-text-muted` | `#A7A7A7` | Secondary / helper text. |
| `--color-text-caption` | `#FFB639` | Decorative caption (use sparingly). |

#### Border & state
| Token | Hex | When to use |
|---|---|---|
| `--color-border` | `#E2E8F0` | Default borders, dividers. |
| `--color-border-strong` | `#A7A7A7` | Input borders. |
| `--color-disabled` | `#CBD5E1` | Disabled inputs/buttons. |

#### Semantic
| Token | Hex | Token (bg) | Hex | Token (text) | Hex |
|---|---|---|---|---|---|
| `--color-success` | `#42D01F` | `--color-success-bg` | `#C9FFB7` | `--color-success-text` | `#1F7A35` |
| `--color-warning` | `#FFA409` | `--color-warning-bg` | `#F8CC7F` | `--color-warning-text` | `#7A5C00` |
| `--color-error` | `#D92C01` | `--color-error-bg` | `#E87B61` | `--color-error-text` | `#7A1F0A` |
| `--color-info` | `#2E73DA` | `--color-info-bg` | `#B0CAF0` | `--color-info-text` | `#1B4080` |

**Pattern for badges/alerts:** background = `*-bg`, text = `*-text`, border = `*` (the base color).

#### Brand scale (gradients only)
`--brand-50` → `--brand-900`. Use for gradients, decorative orbs, illustrations. Do **not** use as semantic tokens.

---

### Typography

#### Font families
| Token | Family | Use |
|---|---|---|
| `--font-heading` | Montserrat, Noto Sans Thai | All `h1`–`h6`. |
| `--font-body` | Poppins, Noto Sans Thai | Default body. |
| `--font-thai` | Noto Sans Thai, Poppins | Manual override when needed. |
| `--font-mono` | Geist Mono | `code`, `pre`, `kbd`. |

Fonts are loaded via `next/font/google` in [`app/layout.tsx`](../app/layout.tsx) and exposed as CSS variables. Latin + Thai automatically render in the right family thanks to font fallback chains.

#### Heading scale (responsive via `clamp`)
Defined globally in [`app/globals.css`](../app/globals.css). Just write `<h1>` and it scales.

| Element | Mobile | Desktop |
|---|---|---|
| `h1` | 28px | 40px |
| `h2` | 22px | 32px |
| `h3` | 18px | 24px |
| `h4` | 16px | 20px |
| `h5` | 15.2px | 18px |
| `h6` | 14px | 16px |

For non-heading text inside components, use explicit tokens:

| Token | Size |
|---|---|
| `--font-size-xs` | 12px |
| `--font-size-sm` | 14px |
| `--font-size-base` | 16px |
| `--font-size-md` | 18px |
| `--font-size-lg` | 20px |
| `--font-size-xl` | 24px |
| `--font-size-2xl` | 32px |
| `--font-size-3xl` | 40px |

#### Weights
`--font-weight-regular` (400) · `--font-weight-medium` (500) · `--font-weight-semibold` (600) · `--font-weight-bold` (700).

#### Line height
`--line-height-tight` (1.2) · `--line-height-base` (1.5) · `--line-height-loose` (1.75).

---

### Spacing

| Token | px | Name | Common use |
|---|---|---|---|
| `--space-xs` | 4 | XS | Very tight (icon gaps, badge padding) |
| `--space-sm` | 8 | S | Small gaps, inline elements |
| `--space-md` | 16 | M | Default spacing, form gaps |
| `--space-lg` | 24 | L | Card padding, section header spacing |
| `--space-xl` | 32 | XL | Component gap, vertical rhythm |
| `--space-2xl` | 48 | 2XL | Section spacing |

**Rule:** All paddings, margins, and gaps in component CSS should use these tokens. Never use raw `px` or `rem` for layout spacing.

### Radius

| Token | px | Use |
|---|---|---|
| `--radius-sm` | 4 | Tiny chips, focus inner |
| `--radius-md` | 8 | Inputs, default cards |
| `--radius-lg` | 16 | Large cards, panels |
| `--radius-xl` | 24 | Hero cards, banners |
| `--radius-pill` | 9999 | Buttons, badges, avatars |

### Shadow

| Token | Use |
|---|---|
| `--shadow-sm` | Cards at rest |
| `--shadow-md` | Hover, raised panels |
| `--shadow-lg` | Modals, dropdowns |

### Motion

| Token | Duration | Use |
|---|---|---|
| `--transition-fast` | 120ms | Hover state changes |
| `--transition-normal` | 200ms | Default transition |
| `--transition-slow` | 350ms | Panels, drawers |

### Focus

Use `box-shadow: var(--focus-ring)` on any custom focus state. The class `.focus-ring` in `globals.css` applies it as a utility.

---

## Component tokens

Reusable component-level values from `tokens.css`:

| Token | Default | Use |
|---|---|---|
| `--button-height` | 44px | Primary button height baseline |
| `--input-height` | 36px | Default input height |
| `--input-hover-bg` | `#E8F0FE` | Input hover background |
| `--input-active-border` | `#6195E3` | Focus border |
| `--modal-width` | 560px | Default modal width |
| `--card-padding` | 24px | Default card padding |

---

## Live preview

Visit `/design-system` in dev to see Input/Navbar/Button states rendered.

---

## Updating tokens

1. Edit [`styles/tokens.css`](../styles/tokens.css).
2. Run the app and verify high-traffic pages: `/`, `/dashboard`, `/admin`, `/login`, `/design-system`.
3. Open a PR and tag a designer for review if you're changing a primary/semantic color.
