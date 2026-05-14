# Divider

Visual separator. Supports horizontal/vertical, solid/dashed, and optional centered label.

## Import

```tsx
import { Divider } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction. |
| `label` | `ReactNode` | — | Centered label (horizontal only). |
| `variant` | `"solid" \| "dashed"` | `"solid"` | Line style. |

## Usage

```tsx
<Divider />
<Divider variant="dashed" />
<Divider label="OR" />
<Divider orientation="vertical" />
```
