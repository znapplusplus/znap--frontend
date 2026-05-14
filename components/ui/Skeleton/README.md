# Skeleton

Animated placeholder for content that's loading.

## Import

```tsx
import { Skeleton } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `shape` | `"rect" \| "circle" \| "text"` | `"rect"` | Visual shape. |
| `width` | `number \| string` | `100%` | Width — number is px. |
| `height` | `number \| string` | — | Height — required for rect/circle. |
| `lines` | `number` | `1` | For `text` shape — number of lines to render. |

## Usage

```tsx
<Skeleton shape="circle" width={40} />
<Skeleton width="60%" height={20} />
<Skeleton shape="text" lines={3} />
```

## Do / Don't

- ✅ Match the shape and size of the real content as closely as possible.
- ❌ Don't show Skeletons longer than necessary — once data lands, swap immediately.
