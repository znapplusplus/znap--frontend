# SocialAuthButton

OAuth / SSO sign-in button with real brand colors. Supports Google, Apple, Facebook, and X.

## Import

```tsx
import { SocialAuthButton } from "@/components/ui";
import type { SocialProvider } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `provider` | `"google" \| "apple" \| "facebook" \| "x"` | **required** | Brand. |
| `mode` | `"login" \| "signup" \| "continue"` | `"login"` | Controls the default label prefix. |
| `label` | `string` | — | Override the generated label entirely. |
| `fullWidth` | `boolean` | `true` | Stretch to container. |
| `onClick` | `() => void` | — | Click handler. |

All native button props pass through.

## Usage

```tsx
<SocialAuthButton provider="google" onClick={handleGoogle} />
<SocialAuthButton provider="apple"  onClick={handleApple} />
<SocialAuthButton provider="facebook" onClick={handleFacebook} />
<SocialAuthButton provider="x" onClick={handleX} />

{/* Sign up mode */}
<SocialAuthButton provider="google" mode="signup" onClick={...} />

{/* Custom label */}
<SocialAuthButton provider="apple" label="Use Apple ID" onClick={...} />
```

## Brand icons

If you only need the icons (without the button shell):

```tsx
import {
  GoogleBrandIcon,
  AppleBrandIcon,
  FacebookBrandIcon,
  XBrandIcon,
} from "@/components/ui";

<GoogleBrandIcon size={32} />
```

Each accepts a `size` prop in pixels. Brand colors are baked in — they do not inherit `currentColor`.

## Do / Don't

- ✅ Stack vertically with `gap: var(--space-sm)` for a clean auth flow.
- ✅ Place a `Divider label="or"` between the email form and the social buttons.
- ❌ Don't recolor brand icons — they must keep their real brand colors.
- ❌ Don't mix `mode` values within the same group — keep one mode per page (Login or Sign up).
