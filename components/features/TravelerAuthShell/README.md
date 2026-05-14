# TravelerAuthShell

Layout wrapper for traveler / photographer onboarding & registration pages. Provides:

- Top `<Navbar variant="guest" />`
- Two-column stage: marketing copy + form card
- Optional illustration

## Import

```tsx
import { TravelerAuthShell } from "@/components/features";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | **required** | Hero title for the copy column. |
| `subtitle` | `ReactNode` | **required** | Supporting copy below the title. |
| `children` | `ReactNode` | **required** | Form content rendered inside the right-hand card. |
| `tone` | `"traveler" \| "photographer"` | `"traveler"` | Switches background gradient tone. |
| `illustrationSrc` | `string` | — | Optional illustration shown under the copy. |
| `illustrationAlt` | `string` | `""` | Alt text for the illustration. |

## Usage

```tsx
<TravelerAuthShell
  title="Welcome back"
  subtitle="Sign in to keep your trip stylish."
  tone="traveler"
>
  <LoginForm />
</TravelerAuthShell>
```

## Do

- Pass the page's primary form/component as `children` — the shell handles layout and chrome.
- Use `tone="photographer"` only on photographer onboarding pages.

## Don't

- Don't render two TravelerAuthShells on one page.
- Don't nest a global Navbar inside `children` — the shell already renders one.
