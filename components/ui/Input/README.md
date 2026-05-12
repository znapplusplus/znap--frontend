# Input Component

A reusable, accessible input component for the Znap++ frontend.

## Purpose

The `Input` component is designed for scalable form UI in the App Router, supporting text entry, password toggles, search, number, date, time, and textarea fields.

## File structure

- `Input.tsx` — component implementation
- `Input.module.css` — CSS Module styling with design tokens
- `index.ts` — barrel export
- `README.md` — usage guide

## Import examples

```tsx
import { Input } from "@/components/ui/Input";
```

or via the shared barrel:

```tsx
import { Input } from "@/components/ui";
```

## Basic usage

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="Use your active email"
/>
```

## Supported variants

- `default`
- `filled`
- `outline`
- `soft`

## Supported sizes

- `sm`
- `md`
- `lg`

## Status examples

```tsx
<Input label="Email" type="email" errorText="Invalid email address" />
<Input label="Phone" type="tel" warningText="Use the format +66 123 456 789" />
<Input label="Name" type="text" successText="Looks good" />
```

## Disabled / readonly examples

```tsx
<Input label="Budget" type="number" disabled placeholder="Disabled field" />
<Input label="Notes" type="textarea" readOnly defaultValue="Read-only note" />
```

## Password example

```tsx
<Input label="Password" type="password" placeholder="Enter password" />
```

## Textarea example

```tsx
<Input label="Comments" type="textarea" rows={5} placeholder="Add your note" />
```

## Do / Don't guidelines

### Do

- Use `label` for every visible field
- Provide `helperText` or `errorText` for assistive guidance
- Use `fullWidth` when the element should stretch across its container
- Keep `type` aligned with expected data

### Don't

- Do not mix Tailwind classes with this component
- Do not apply inline styles to the input element
- Avoid leaving both `errorText` and `successText` active at the same time

## Accessibility notes

- The label is connected with `htmlFor` and `id`
- Status text is connected with `aria-describedby`
- Error state sets `aria-invalid`
- Keyboard focus is visible with a strong ring
- The password field supports a show/hide toggle

## Design token usage

This component uses token values from `styles/tokens.css`:

- `var(--color-primary)`
- `var(--color-error)`
- `var(--color-success)`
- `var(--color-warning)`
- `var(--color-background)`
- `var(--color-surface)`
- `var(--color-border)`
- `var(--color-text)`
- `var(--color-text-muted)`
- `var(--font-body)`
- `var(--input-height)`
- `var(--radius-md)`
- `var(--transition-normal)`
- `var(--focus-ring)`
- `var(--space-sm)`
