# Public Assets

This folder contains static assets served directly by the Next.js application.

## Folder Structure

```
public/
  ├── icons/           # UI icons (SVG, consistent style)
  ├── images/          # General photos and images
  ├── illustrations/   # Artwork, empty states, onboarding
  ├── logos/           # Brand logos and wordmarks
  └── README.md        # This file
```

## Guidelines

### `icons/`

- SVG format only
- Consistent icon style and sizing
- Use semantic naming: `arrow-right.svg`, `close.svg`, `menu.svg`
- Icons should be simple and monochromatic
- Keep icon files minimal (optimize SVG)

**Example imports:**
```tsx
import arrowIcon from "@/public/icons/arrow-right.svg";
```

### `images/`

- General photography and images
- Use descriptive filenames: `photographer-portfolio.jpg`, `hero-banner.png`
- Optimize images for web (use next/image component)
- Supported formats: JPG, PNG, WebP

**Example usage:**
```tsx
import Image from "next/image";
import portfolioImage from "@/public/images/photographer-portfolio.jpg";

export function Gallery() {
  return <Image src={portfolioImage} alt="Photographer portfolio" />;
}
```

### `illustrations/`

- Large artwork and visual elements
- Empty states, onboarding flows, decorative elements
- Prefer SVG for scalability, PNG for complex illustrations
- Descriptive naming: `empty-state-no-bookings.svg`, `onboarding-step-1.png`

**Example:**
```tsx
import emptyState from "@/public/illustrations/empty-state-no-bookings.svg";
```

### `logos/`

- Brand logos and wordmarks
- Keep both horizontal and vertical versions if needed
- Use SVG for logos (scalable)
- Naming: `logo-horizontal.svg`, `logo-vertical.svg`, `logo-icon.svg`

## Best Practices

1. **Do NOT put React components in public/** — Only static assets
2. **Use consistent naming** — Use kebab-case for filenames
3. **Optimize files** — Compress images and SVGs before committing
4. **Version control** — Keep asset versions consistent with design updates
5. **Accessibility** — Always add `alt` text to images
6. **Performance** — Use Next.js `Image` component for optimization

## Importing Assets

### SVGs
```tsx
import logo from "@/public/logos/logo.svg";
```

### Images
```tsx
import Image from "next/image";
import photo from "@/public/images/photo.jpg";

// In JSX
<Image src={photo} alt="description" />
```

## Updating Assets

When updating brand assets:
1. Save new version to appropriate folder
2. Update all references in components
3. Maintain backward compatibility if possible
4. Document changes in commit message

---

For questions about asset organization or guidelines, refer to the design system documentation.
