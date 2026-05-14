# LandingHero

Hero section for the public landing page. Includes the kicker badge, headline, CTAs, stat row, preview card, and the "how it works" steps grid.

## Import

```tsx
import { LandingHero } from "@/components/sections";
```

## Usage

```tsx
<LandingHero />
```

This component takes no props.

## Notes

- Uses `clamp()` to fluidly scale the title across breakpoints.
- The map panel uses a hand-tuned brand gradient (`--brand-700` → `--brand-500` → `--brand-400`).
- Avoid editing decorative numeric values (orb size, gradient stops) without a design review — they are tuned to the brand reference image.

## Do

- Adjust copy or step content directly in this file.
- Add new stat cards by extending the `.statRow` grid.

## Don't

- Don't replace token-based colors with hardcoded hex.
- Don't import this on non-landing-style pages without a design review — the gradient and sizing are tuned for full-bleed marketing layouts.
