# Navbar

Top-level site navigation. Renders three variants for guest, traveler, and photographer users.

## Import

```tsx
import { Navbar } from "@/components/layout";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"guest" \| "traveler" \| "photographer"` | `"guest"` | Role-based layout switch. |
| `user` | `{ name?: string; avatarUrl?: string }` | — | Required for traveler / photographer variants. |
| `searchValue` | `string` | — | Controlled search input value (traveler only). |
| `searchPlaceholder` | `string` | `"hint for searching..."` | Placeholder text. |
| `onSearchChange` | `(value: string) => void` | — | Search input change handler. |
| `onSignOut` | `() => void` | — | Profile button click handler. |

## Usage

```tsx
<Navbar variant="guest" />

<Navbar
  variant="traveler"
  user={{ name: "Jodaney" }}
  searchValue={query}
  onSearchChange={setQuery}
  onSignOut={handleLogout}
/>

<Navbar variant="photographer" user={{ name: "Sofarey", avatarUrl: "/me.jpg" }} />
```

## Do

- Wrap with `Suspense` boundary if `onSignOut` triggers route changes.
- Provide `user.name` for traveler/photographer variants (avatar falls back to first letter).

## Don't

- Don't fork this component to add nav links — extend the existing `nav` block, or open an issue if a new variant is needed.
- Don't use it inside scrollable containers — it expects to span the full viewport width.

## Accessibility

- The `<header>` element labels its `nav` via `aria-label`.
- Icon-only links have `aria-label` attributes.
- Search uses a `<label>` wrapper for screen readers.
