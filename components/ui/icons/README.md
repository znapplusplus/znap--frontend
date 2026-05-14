# Icons

42 hand-tuned SVG icons. All share a `size` + `color` API and inherit color from `currentColor`.

## Import

```tsx
import { CameraIcon, PinIcon, StarFilledIcon } from "@/components/ui/icons";
```

## Props

All icons share this prop type:

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `20` | Width + height in px. |
| `strokeWidth` | `number` | `2` | Stroke width for line icons. |
| `...` | `SVGProps` | — | All native `<svg>` props. |

Color is set via the parent's CSS `color`:

```tsx
<span style={{ color: "var(--color-primary)" }}>
  <CameraIcon size={24} />
</span>
```

## Usage

```tsx
// In a Button
<Button variant="icon" aria-label="Delete">
  <TrashIcon size={18} />
</Button>

// In a Badge
<Badge variant="secondary" icon={<FireIcon size={12} />}>
  Trending
</Badge>

// Standalone
<HeartFilledIcon size={32} style={{ color: "var(--color-error)" }} />
```

## Available icons

### Navigation
`ChevronDownIcon` · `ChevronUpIcon` · `ChevronLeftIcon` · `ChevronRightIcon` · `ArrowLeftIcon` · `ArrowRightIcon` · `MenuIcon` · `CloseIcon`

### Action
`SearchIcon` · `PlusIcon` · `CheckIcon` · `EditIcon` · `TrashIcon` · `DownloadIcon` · `UploadIcon` · `ShareIcon` · `HeartIcon` · `HeartFilledIcon` · `EyeIcon` · `EyeOffIcon` · `FilterIcon`

### Status
`CheckCircleIcon` · `AlertCircleIcon` · `AlertTriangleIcon` · `InfoIcon`

### Domain (ZNAP++)
`CameraIcon` · `ImageIcon` · `GalleryIcon` · `StarIcon` · `StarFilledIcon` · `PinIcon` · `BellIcon` · `SendIcon` · `WalletIcon` · `SparkleIcon` · `FireIcon` · `UserIcon` · `CalendarIcon` · `ClockIcon` · `SettingsIcon` · `LogoutIcon` · `HomeIcon`

Browse all icons live at `/design-system` → **Icons**.

## Registry

For tooling (the design-system preview), all icons are also exported through `ICON_REGISTRY`:

```ts
import { ICON_REGISTRY } from "@/components/ui/icons";

ICON_REGISTRY.forEach(({ name, displayName, Component, group }) => {
  // ...
});
```

## Do

- Use icons inside `<Button variant="icon">` with `aria-label` for icon-only buttons.
- Match the icon size to the surrounding text (~`1em` or one of: 14, 16, 18, 20, 24, 32, 48).
- Set color via CSS, not by patching `stroke`/`fill`.

## Don't

- Don't use emojis in production UI — use these icons.
- Don't size icons via CSS `width`/`height` — use the `size` prop so SVG width/height stay in sync.
- Don't recolor inside the SVG — wrap with a parent that sets `color`.
