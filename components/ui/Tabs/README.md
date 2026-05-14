# Tabs

Controlled tab strip with optional count chips. Renders an accessible `role="tablist"`.

## Import

```tsx
import { Tabs } from "@/components/ui";
import type { TabItem } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `TabItem[]` | **required** | List of `{ id, label, count?, disabled? }`. |
| `value` | `string` | **required** | Currently active tab id. |
| `onChange` | `(id: string) => void` | **required** | Fires when tab clicked. |
| `variant` | `"underline" \| "pill"` | `"underline"` | Visual style. |
| `fullWidth` | `boolean` | `false` | Stretch tabs evenly. |

## Usage

```tsx
const [tab, setTab] = useState("active");

<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: "active", label: "Active", count: 3 },
    { id: "history", label: "History", count: 12 },
    { id: "cancelled", label: "Cancelled", disabled: true },
  ]}
/>

<Tabs variant="pill" value={view} onChange={setView} items={...} />
```

## Do / Don't

- ✅ Use the `pill` variant when tabs sit on a colored surface or hero.
- ❌ Don't use for navigation between pages — use `Link`-based nav instead.
