# Pagination

Compact page navigation with ellipsis for long ranges and prev/next buttons.

## Import

```tsx
import { Pagination } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | **required** | Current page (1-indexed). |
| `totalPages` | `number` | **required** | Total number of pages. |
| `onChange` | `(page: number) => void` | **required** | Fires on prev/next/page click. |
| `siblingCount` | `number` | `1` | Sibling pages around current. |
| `showInfo` | `boolean` | `false` | Show "Page X of Y" label. |

## Usage

```tsx
const [page, setPage] = useState(1);

<Pagination page={page} totalPages={20} onChange={setPage} />
<Pagination page={page} totalPages={20} onChange={setPage} showInfo siblingCount={2} />
```

## Do / Don't

- ✅ Reuse this in admin tables (users, bookings, photographers).
- ❌ Don't render Pagination when `totalPages <= 1` (it auto-hides).
