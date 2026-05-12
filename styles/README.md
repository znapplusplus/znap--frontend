# Design Tokens

This folder contains the central design system tokens for the Znap++ frontend.

## What are Design Tokens?

Design tokens are reusable values that define the visual language of the application. They ensure consistency across all UI components and make it easy to update the design system globally.

## Token Categories

### `tokens.css`

Defines all design tokens as CSS variables organized by category:

- **Colors**: Brand colors, states (success, warning, error), surfaces, text, borders
- **Typography**: Font families (heading, body, Thai), font sizes, weights, line heights
- **Spacing**: xs, sm, md, lg, xl, 2xl
- **Radius**: Border radius values (sm, md, lg, xl, pill)
- **Shadows**: Drop shadows (sm, md, lg)
- **Borders**: Default border styles, focus ring
- **Motion**: Transition durations (fast, normal, slow)
- **Component Tokens**: Button height, input height, modal width, card padding

## How to Use

Use CSS variables throughout your components to access tokens:

```css
.button {
  background: var(--color-primary);
  color: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  transition: background var(--transition-normal);
}
```

### Common Examples

**Colors:**
```css
color: var(--color-text);
background: var(--color-primary);
border-color: var(--color-border);
```

**Spacing:**
```css
padding: var(--space-md);
margin: var(--space-lg);
gap: var(--space-sm);
```

**Typography:**
```css
font-family: var(--font-body);
font-size: var(--font-size-lg);
font-weight: var(--font-weight-bold);
line-height: var(--line-height-base);
```

**Radius & Effects:**
```css
border-radius: var(--radius-md);
box-shadow: var(--shadow-md);
```

**Motion:**
```css
transition: all var(--transition-normal);
```

## Best Practices

1. **Always use tokens** — Do not hardcode colors, spacing, or sizing if a token exists
2. **Use Component Tokens** — For component-specific sizes like `--button-height`, use them consistently
3. **Maintain hierarchy** — Tokens are organized for clarity; follow the naming conventions
4. **Update globally** — When design changes, update tokens here and it cascades to all components

## Next Steps

- Import tokens in `app/globals.css` (already done)
- Use tokens in component module files (`.module.css`)
- Never hardcode design values in component styles
