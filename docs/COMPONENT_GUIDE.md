# Component Authoring Guide

How to build, name, and ship a component in the Znap++ frontend.

## When to create a new shared component

Create a new component under `components/ui/` only if it's:

1. **Reused in 2+ places** (or you're confident it will be).
2. **Self-contained** — has no implicit dependency on a specific page.
3. **Visually defined** — has a clear spec or design.

If it doesn't tick all three, **co-locate** the component inside the page or page-group folder. Promote it later when reuse is real.

---

## Folder shape

Every component lives in its own folder under PascalCase:

```
ComponentName/
├── ComponentName.tsx         # implementation
├── ComponentName.module.css  # styles (CSS Module)
├── index.ts                  # barrel re-export
└── README.md                 # usage + Do/Don't
```

Then re-export from the group barrel:

```ts
// components/ui/index.ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

---

## Templates

### `ComponentName.tsx`

```tsx
import type { ReactNode } from "react";
import styles from "./ComponentName.module.css";

export type ComponentNameProps = {
  /** Short description of what this prop does. */
  variant?: "primary" | "secondary";
  /** Children are required. */
  children: ReactNode;
  /** Optional className escape hatch — merged at the end. */
  className?: string;
};

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export function ComponentName({
  variant = "primary",
  children,
  className,
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        styles.root,
        styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
        className,
      )}
    >
      {children}
    </div>
  );
}
```

### `ComponentName.module.css`

```css
.root {
  padding: var(--space-md);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: background var(--transition-normal);
}

.variantPrimary {
  background: var(--color-primary);
  color: var(--color-surface);
}

.variantSecondary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
```

### `index.ts`

```ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

### `README.md`

Use this skeleton:

```markdown
# ComponentName

One-line description.

## Import

\`\`\`tsx
import { ComponentName } from "@/components/ui";
\`\`\`

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary"` | `"primary"` | What it does. |

## Usage

\`\`\`tsx
<ComponentName variant="primary">Hello</ComponentName>
\`\`\`

## Do

- Item

## Don't

- Item

## Accessibility

- Notes here.
```

---

## Do / Don't

### ✅ Do

- **Use design tokens** for every visual value. If a token doesn't exist, add it to `tokens.css` first.
- **Type your props** and export the props type from the component.
- **Provide an `aria-label`** for icon-only or visually-unlabeled controls.
- **Provide controlled and uncontrolled support** when it makes sense (`value` + `defaultValue`).
- **Forward refs** if the component wraps a native input/button (use `forwardRef`).
- **Keep state local.** If the component needs cross-component state, raise it to the page or use a context.
- **Test with keyboard alone.** Tab through, activate with Enter / Space.

### ❌ Don't

- **No Tailwind, no inline styles**, no hardcoded hex.
- **Don't accept unstructured `style` props.** Accept `className` instead.
- **Don't fetch data inside primitives.** Data fetching belongs in pages or hooks.
- **Don't import from `app/`** in shared components. Components must be context-free.
- **Don't create a `<div>` with `onClick`** when a `<button>` would do.
- **Don't use `useEffect` to sync state.** Compute derived values during render or with `useMemo`.

---

## How to use existing primitives

The `components/ui/index.ts` barrel exports everything from one place:

```tsx
import { Button, Input, Navbar, TagInput, RangeSlider, FileUploadCard } from "@/components/ui";
```

Each primitive has its own README. Open `components/ui/<Name>/README.md` for full props and examples.

### Quick recipes

```tsx
// Form field with validation
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  errorText={emailError}
  fullWidth
/>

// Brand CTA
<Button variant="primary" size="lg" href="/register" fullWidth>
  Get started
</Button>

// Destructive action
<Button variant="danger" onClick={handleDelete}>
  Delete photo
</Button>

// Tag list
<TagInput
  label="Styles"
  value={tags}
  onChange={setTags}
  maxTags={5}
/>
```

---

## Accessibility checklist

Before opening a PR with a new component, verify:

- [ ] Reachable by `Tab` and reverse `Shift+Tab`.
- [ ] Activated by `Enter` (links/buttons) and `Space` (buttons).
- [ ] Visible focus state (`var(--focus-ring)` or `:focus-visible`).
- [ ] Has an accessible name (text content, `aria-label`, or `aria-labelledby`).
- [ ] If interactive, uses native semantic element (`<button>`, `<a>`, `<input>`) or has `role` set correctly.
- [ ] Color contrast: text ≥ 4.5:1, large text ≥ 3:1, interactive borders ≥ 3:1.
- [ ] Works with `prefers-reduced-motion` (no auto-animations that can't be disabled).
- [ ] Tested with VoiceOver / NVDA at least once for complex components.

---

## Reviewing a component PR

When reviewing someone else's component, check:

1. **Folder shape** — `Component/Component.tsx + .module.css + index.ts + README.md`.
2. **Tokens** — no hardcoded colors, spacing, or sizes.
3. **Types** — props are typed and exported.
4. **A11y** — keyboard support, ARIA, semantic HTML.
5. **Reuse intent** — is this really shared, or does it belong in a page folder?
6. **No bleed** — component doesn't import from `app/` or from a sibling page folder.

---

## Promoting a page-level component to shared

When a component lives in `app/<page>/page.tsx` or `components/<group>/` and proves reusable:

1. Move the file(s) into `components/ui/<Name>/`.
2. Generalize props (remove page-specific assumptions).
3. Add `index.ts` and a `README.md`.
4. Add to `components/ui/index.ts`.
5. Replace the old usage with the new import.
6. Note the promotion in your PR description.
