# Shared UI Components

This folder contains reusable UI components that are used across the application.

## Structure

Each component has its own folder with:

```
ComponentName/
  ├── ComponentName.tsx          # React component
  ├── ComponentName.module.css   # Component styles (CSS Modules)
  ├── index.ts                   # Barrel export
  └── README.md                  # Component documentation
```

### Example: Button

```
Button/
  ├── Button.tsx
  ├── Button.module.css
  ├── index.ts
  └── README.md
```

## Importing Components

Use the barrel export from the component folder:

```typescript
import { Button } from "@/components/ui/Button";
```

Or import directly from the main UI barrel:

```typescript
import { Button, Input, Modal } from "@/components/ui";
```

## Component Guidelines

### 1. Use CSS Modules

All component styles must use CSS Modules (`.module.css`):

```css
/* Button.module.css */
.button {
  height: var(--button-height);
  padding: 0 var(--space-md);
  background: var(--color-primary);
  color: var(--color-surface);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}

.button:hover {
  background: var(--color-primary-hover);
}
```

```typescript
// Button.tsx
import styles from "./Button.module.css";

export function Button({ children, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
```

### 2. Use Design Tokens

**DO:**
```css
color: var(--color-primary);
padding: var(--space-md);
border-radius: var(--radius-md);
transition: var(--transition-normal);
```

**DON'T:**
```css
color: #255AB1;
padding: 16px;
border-radius: 8px;
transition: 0.2s;
```

### 3. No Hardcoded Values

Never hardcode design values. If a token doesn't exist for your use case, add it to `styles/tokens.css`.

### 4. Component Scope Only

This folder is for **shared reusable components only**. Do not place:
- Page-specific components
- One-off layouts
- Business logic components

Move page-specific components to the relevant page folder.

## Current Components

- **Button** — Reusable button with variants (primary, secondary, etc.)
- **Input** — Text input with validation states
- **Modal** — Dialog/modal overlay component

## Creating a New Component

1. Create a folder: `NewComponent/`
2. Create files:
   - `NewComponent.tsx` — Component logic
   - `NewComponent.module.css` — Styles using tokens
   - `index.ts` — Export statement
   - `README.md` — Usage documentation
3. Add export to `ui/index.ts`:
   ```typescript
   export { NewComponent } from "./NewComponent";
   ```

## Naming Conventions

- **Folder name:** PascalCase (e.g., `Button`, `FormInput`, `UserCard`)
- **Component name:** PascalCase matching folder
- **CSS class names:** camelCase or kebab-case in module
- **Props:** Follow React naming conventions

## Accessibility

All components must:
- Support keyboard navigation
- Include proper ARIA labels where needed
- Have sufficient color contrast
- Work with screen readers

## Testing

Each component should have:
- Basic unit tests
- Accessibility tests
- Integration tests if used with other components

---

**Questions?** Check the individual component `README.md` files or update design tokens in `styles/tokens.css`.
