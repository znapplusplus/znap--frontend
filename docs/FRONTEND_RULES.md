# Frontend Rules — กฎเหล็กสำหรับ ZNAP++ Frontend

> เอกสารแรกที่ทุกคนที่จะมาทำงานในโปรเจกต์นี้ต้องอ่าน
>
> **อ่านที่นี่ครั้งเดียว** เพื่อให้โค้ดเดินไปในทิศทางเดียวกัน

หลังจากอ่านจบ ขอแนะนำให้ไปอ่านต่อที่:
- [Design System Reference](./DESIGN_SYSTEM.md) — token catalog
- [Coding Standards](./CODING_STANDARDS.md) — TypeScript / React / CSS
- [Component Guide](./COMPONENT_GUIDE.md) — วิธีสร้าง component ใหม่
- [Contributing](./CONTRIBUTING.md) — branch / commit / PR

---

## TL;DR — 9 กฎเหล็ก

1. ✅ ใช้ **design tokens** เท่านั้น สำหรับสี/spacing/radius/shadow/font
2. ✅ เรียกใช้ component จาก **ส่วนกลาง** (`@/components/...`) เท่านั้น
3. ✅ สร้าง component / icon ใหม่แล้วต้องเก็บ **ในส่วนกลาง** และโชว์ใน `/design-system`
4. ✅ **เช็คก่อนสร้าง** — ห้ามทำซ้ำซ้อนกับของที่มีอยู่
5. ❌ **ห้าม Tailwind** หรือ utility classes อื่น ๆ
6. ❌ **ห้ามใช้ emoji** ใน UI — ใช้ icon จาก library
7. ❌ **ห้ามใช้ inline `style`** สำหรับ design values (เช่น สี, ขนาด, spacing)
8. ✅ TypeScript **strict** — ไม่ใช้ `any`, export Props types เสมอ
9. ✅ **A11y in the box** — keyboard support, focus ring, aria-* ครบ

---

## กฎข้อ 1 — ใช้ Design Tokens เท่านั้น

**ทำไม:** เปลี่ยนสีหรือ spacing ของทั้งระบบที่จุดเดียว (`styles/tokens.css`) แทนที่จะไล่แก้ทุกไฟล์

ใช้ tokens สำหรับทั้ง 5 หมวด:
- **สี** — `var(--color-primary)`, `var(--color-text)`, `var(--color-success-bg)` …
- **Spacing** — `var(--space-xs)` ถึง `var(--space-2xl)` (4 / 8 / 16 / 24 / 32 / 48 px)
- **Radius** — `var(--radius-sm)` ถึง `var(--radius-pill)`
- **Shadow** — `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`
- **Font** — `var(--font-heading)`, `var(--font-body)`, `var(--font-size-md)`, `var(--font-weight-bold)`

ดูรายการ token ทั้งหมดที่ [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) หรือเปิด `/design-system` ในเบราว์เซอร์

### ✅ ทำแบบนี้

```css
.card {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-normal);
}
```

### ❌ ห้ามทำแบบนี้

```css
.card {
  background: #fff;          /* ❌ hardcoded hex */
  color: #333;
  padding: 24px;             /* ❌ hardcoded spacing */
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
  transition: background 0.2s;
}
```

**ข้อยกเว้นเดียว:** decorative gradient stops ใน LandingHero (orb, map panel) — เป็น brand illustration ไม่ใช่ semantic color และต้อง review จากทีม design ก่อนแก้

ถ้า token ที่ต้องการยังไม่มี — **เพิ่มลงใน `styles/tokens.css` ก่อน** แล้วค่อยใช้ พร้อมอัปเดต `DESIGN_SYSTEM.md` ด้วย

---

## กฎข้อ 2 — เรียกใช้ Component จากส่วนกลางเท่านั้น

**ทำไม:** ทุก feature ใน ZNAP++ ใช้ pattern เดียวกัน — ปุ่ม / input / dialog หน้าตาเหมือนกันหมด ทำให้ user เรียนรู้ครั้งเดียวใช้ทั้ง app ได้

โครงสร้าง component:

```
components/
├── ui/                       ← Primitives (Button, Input, Dialog, Card, …)
│   └── icons/                ← Icon library (42 ตัว)
├── layout/                   ← Site chrome (Navbar, Footer)
├── sections/                 ← Page sections (LandingHero, …)
└── features/                 ← Feature-scoped (TravelerAuthShell, PhotographerListItem, …)
```

### ✅ ทำแบบนี้

```tsx
import { Button, Input, Alert, Checkbox, Divider, SocialAuthButton } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import { TravelerAuthShell } from "@/components/features";
import { CameraIcon, StarFilledIcon } from "@/components/ui/icons";

<Button variant="primary" size="lg" fullWidth>Login</Button>
<Input label="Email" type="email" errorText={errors.email} fullWidth />
<Alert variant="error" onClose={dismiss}>{error}</Alert>
```

### ❌ ห้ามทำแบบนี้

```tsx
{/* ❌ สร้าง button เองในหน้า — ไม่ใช้ของส่วนกลาง */}
<button
  className="my-custom-button"
  style={{ background: "#255AB1", padding: "12px 24px" }}
>
  Login
</button>

{/* ❌ ก็อปโค้ดจากที่อื่นมาใส่ในหน้าใหม่ */}
<div className="my-alert" style={{ background: "#fef2f2" }}>
  Error
</div>
```

---

## กฎข้อ 3 — สร้างใหม่ ต้องเก็บในส่วนกลาง

**ทำไม:** ถ้าคนที่ 2 ต้องการ pattern เดียวกันแต่หาไม่เจอ จะสร้างซ้ำ → กลายเป็นมี 2 button คนละแบบในระบบ

ก่อนสร้าง component / icon / token ใหม่:

1. **เปิด `/design-system` ในเบราว์เซอร์** ดูว่ามีของเดิมอยู่ไหม
2. ถ้ามี — ใช้เลย หรือเพิ่ม variant ให้กว้างขึ้น (ขออนุญาตจาก reviewer)
3. ถ้าไม่มี — สร้างใหม่ใน folder ที่ถูก:

| สิ่งใหม่ | ใส่ที่ไหน |
|---|---|
| Primitive (ปุ่ม, input, card) ที่ใช้ได้ทั้ง app | `components/ui/<Name>/` |
| Icon ใหม่ | `components/ui/icons/icons.tsx` + เพิ่มใน `registry.ts` |
| Layout chrome (Navbar, Footer ส่วนเสริม) | `components/layout/<Name>/` |
| Page section (Hero, FAQ block) | `components/sections/<Name>/` |
| Feature-scoped (auth, booking, wallet) | `components/features/<Name>/` |
| Design token (สีใหม่, spacing ใหม่) | `styles/tokens.css` |

แล้ว:
- ✅ Re-export ผ่าน barrel `index.ts` ของ folder นั้น
- ✅ เพิ่ม preview ใน `/design-system` (อัปเดต `app/design-system/page.tsx`)
- ✅ เขียน `README.md` ใน folder ของ component (Props table + Do/Don't + Usage)

ดูเทมเพลตเต็มที่ [`docs/COMPONENT_GUIDE.md`](./COMPONENT_GUIDE.md)

---

## กฎข้อ 4 — ห้ามซ้ำซ้อน เช็คก่อนสร้างเสมอ

**ทำไม:** การมี Button 3 แบบ / Card 2 แบบ / Modal กับ Dialog ที่ทำอย่างเดียวกัน ทำให้ดูแลยาก + ผู้ใช้สับสน

ก่อนเริ่มเขียนโค้ดใหม่ ถามตัวเองเสมอ:

1. **มี component ส่วนกลางที่ใช้แทนได้ไหม?** → เปิด `/design-system` หรือ `components/ui/README.md`
2. **มี icon ตัวนี้อยู่แล้วใน icon library ไหม?** → เปิด `/design-system` → Icons (กรองด้วย search)
3. **มี hook / util ที่ทำงานคล้ายกันใน `lib/` แล้วไหม?**
4. **มี token ที่ตรงกับสีนี้ใน `tokens.css` แล้วไหม?**

ถ้ายังหาไม่เจอจริง ๆ — ค่อยสร้าง และเก็บไว้ในส่วนกลางตามกฎข้อ 3

### ตัวอย่างที่ขาดการเช็ค

```tsx
// ❌ สร้าง <SuccessAlert /> ใหม่ — แต่ Alert variant="success" มีอยู่แล้ว
function SuccessAlert({ children }) {
  return <div style={{ background: "#c9ffb7" }}>{children}</div>;
}

// ❌ inline SVG camera icon — แต่ CameraIcon อยู่ใน icon library แล้ว
<svg viewBox="0 0 24 24" stroke="currentColor"><path d="..." /></svg>
```

```tsx
// ✅ ใช้ของเดิม
<Alert variant="success">{children}</Alert>
<CameraIcon size={20} />
```

---

## กฎข้อ 5 — ห้าม Tailwind / Utility classes

**ทำไม:** โปรเจกต์นี้ใช้ **CSS Modules + design tokens** เป็น single styling system ถ้าเอา Tailwind มาผสมจะมี 2 system ที่ต้อง maintain

### ❌ ห้ามทำแบบนี้

```tsx
<div className="flex items-center gap-4 px-6 py-3 bg-blue-600 text-white rounded-xl">
  Hello
</div>
```

### ✅ ทำแบบนี้

`Component.tsx`:
```tsx
import styles from "./Component.module.css";

<div className={styles.row}>Hello</div>
```

`Component.module.css`:
```css
.row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-primary);
  color: var(--color-surface);
  border-radius: var(--radius-lg);
}
```

---

## กฎข้อ 6 — ห้ามใช้ Emoji ใน UI

**ทำไม:**
- Emoji ดูไม่เหมือนกันในแต่ละ OS / browser (`💍` บน Mac vs Windows vs Android หน้าตาต่างกัน)
- ปรับสีตามแบรนด์ไม่ได้
- เปลี่ยนขนาดให้ pixel-perfect ไม่ได้

ใช้ icon library ที่มี **42 SVG icons** จัดไว้แล้ว:

```tsx
import {
  CameraIcon, HeartIcon, StarFilledIcon, FireIcon,
  CalendarIcon, ClockIcon, PinIcon, UserIcon, /* ... */
} from "@/components/ui/icons";
```

เปิด `/design-system` → **Icons** เพื่อ browse ทั้งหมด คลิก tile เพื่อ copy import

### ❌ ห้ามทำแบบนี้

```tsx
<button>📷 Take a photo</button>
<span>🔥 Trending</span>
const styles = [{ label: "Wedding", icon: "💍" }];
```

### ✅ ทำแบบนี้

```tsx
<Button><CameraIcon size={18} /> Take a photo</Button>
<Badge variant="secondary" icon={<FireIcon size={12} />}>Trending</Badge>
const styles = [{ label: "Wedding", icon: <HeartIcon size={18} /> }];
```

ถ้าต้องการ icon ใหม่ที่ยังไม่มี — เพิ่มใน `components/ui/icons/icons.tsx` + `registry.ts` (กฎข้อ 3)

---

## กฎข้อ 7 — ห้ามใช้ Inline `style` สำหรับ Design Values

**ทำไม:** inline styles bypass design tokens ทำให้ไม่อยู่ในระบบ และยากต่อการเปลี่ยน theme ในอนาคต

### ❌ ห้ามทำแบบนี้

```tsx
<div style={{ color: "#255AB1", padding: 16, fontSize: 14 }}>Hello</div>
<button style={{ backgroundColor: "var(--color-primary)" }}>Click</button>
```

### ✅ ทำแบบนี้

```tsx
{/* ใช้ CSS Module class */}
<div className={styles.label}>Hello</div>

{/* หรือใช้ component ส่วนกลาง */}
<Button variant="primary">Click</Button>
```

**ข้อยกเว้น:** inline style ใช้ได้สำหรับ **ค่าที่ dynamic จริง ๆ** ที่เขียนใน CSS ไม่ได้:

```tsx
{/* ✅ ตำแหน่ง dynamic จาก state */}
<div style={{ left: `${percent}%` }} />

{/* ✅ background image จาก data */}
<div style={{ backgroundImage: `url(${imageUrl})` }} />
```

---

## กฎข้อ 8 — TypeScript Strict

**ทำไม:** Type safety ช่วยจับ bug ก่อน production และทำให้ refactor ปลอดภัย

### ✅ Always

- **Type ทุก prop** และ **export props type** เพื่อให้ฝั่งเรียกใช้ extend ได้:
  ```tsx
  export type CardProps = {
    variant?: "default" | "elevated";
    children: ReactNode;
  };

  export function Card({ variant = "default", children }: CardProps) { ... }
  ```

- **Discriminated union** สำหรับ state machines แทน boolean หลายตัว:
  ```tsx
  // ✅
  type Status = { kind: "idle" } | { kind: "loading" } | { kind: "error"; message: string };

  // ❌
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  ```

- **Prefer `type` over `interface`** ยกเว้นต้องการ declaration merging

### ❌ Never

- `any` (ถ้าจำเป็นจริง ๆ ต้องมี `// eslint-disable-next-line` พร้อมเหตุผล 1 บรรทัด)
- Non-null assertion `!` (ใช้ guard / default แทน)
- Implicit `any` ใน function parameters

ดูเต็ม ๆ ที่ [`docs/CODING_STANDARDS.md`](./CODING_STANDARDS.md#typescript-rules)

---

## กฎข้อ 9 — A11y In The Box

**ทำไม:** ZNAP++ เป็น web app — ต้องใช้กับ keyboard + screen reader + ปุ่มลัด

ทุก interactive element ต้อง:

- ✅ **Reachable by Tab** — ใช้ `<button>` / `<a>` / `<input>` แทน `<div onClick>`
- ✅ **Visible focus state** — ใช้ `box-shadow: var(--focus-ring)` หรือ `:focus-visible`
- ✅ **Accessible name** — `aria-label` สำหรับ icon-only button
- ✅ **Semantic HTML** — `<button>` สำหรับ action, `<a>` สำหรับ navigation, `<form>` สำหรับ submit
- ✅ **Color contrast** — ≥ 4.5:1 สำหรับ body text (สีใน token ผ่านอยู่แล้ว)

### ❌ ห้ามทำแบบนี้

```tsx
<div onClick={handleClick} className={styles.btn}>Click me</div>
<Button variant="icon"><TrashIcon /></Button>   {/* ขาด aria-label */}
```

### ✅ ทำแบบนี้

```tsx
<Button onClick={handleClick}>Click me</Button>
<Button variant="icon" aria-label="Delete photo"><TrashIcon /></Button>

{/* ถ้าทำ custom interactive element เอง */}
<button type="button" onClick={...} className={styles.tile}>
  ...
</button>
```

ดู checklist เต็มที่ [`docs/COMPONENT_GUIDE.md#accessibility-checklist`](./COMPONENT_GUIDE.md#accessibility-checklist)

---

## โครงสร้างไฟล์ที่ควรรู้

```
znap-frontend/
├── app/                       # Next.js App Router (pages, layouts)
├── components/
│   ├── ui/                    # Primitives + Icons
│   ├── layout/                # Site chrome
│   ├── sections/              # Page sections
│   └── features/              # Feature-scoped
├── docs/                      # คุณอยู่ตรงนี้
├── lib/                       # Utilities, API clients
├── public/                    # Static assets
└── styles/
    └── tokens.css             # ⭐ Design tokens — แก้ที่นี่จุดเดียวเท่านั้น
```

**ทุก component folder** ต้องมีไฟล์ 4 ตัวนี้เสมอ:

```
ComponentName/
├── ComponentName.tsx          # implementation
├── ComponentName.module.css   # CSS Module
├── index.ts                   # barrel re-export
└── README.md                  # Props + Usage + Do/Don't
```

---

## ก่อน Push / PR

Checklist สั้น ๆ ให้รันก่อนเปิด PR:

- [ ] `npm run lint` ผ่าน
- [ ] `npm run build` ผ่าน
- [ ] เปิดเบราว์เซอร์ดูหน้าที่แก้ — ทั้ง mobile + desktop
- [ ] เช็คทุก color/spacing ในไฟล์ที่เพิ่มหรือแก้ ใช้ token ครบ ไม่มี hardcoded hex/px
- [ ] ถ้าสร้าง component ใหม่ — มี folder + 4 ไฟล์ + barrel export + preview ใน `/design-system`
- [ ] ถ้าใช้ icon — มาจาก `@/components/ui/icons` (ไม่ใช่ emoji หรือ inline SVG)
- [ ] Keyboard navigation ผ่าน (Tab / Shift+Tab / Enter / Space)

ดู PR template เต็มที่ [`docs/CONTRIBUTING.md`](./CONTRIBUTING.md#pr-description-template)

---

## คำถามที่พบบ่อย

**Q: ต้องการสีใหม่ที่ token ยังไม่มี ต้องทำยังไง?**
A: ขั้นที่ 1 ถามทีม design ก่อนว่ามี token เดิมที่ใช้แทนได้ไหม ขั้นที่ 2 ถ้าจำเป็นจริง ๆ เพิ่มใน `styles/tokens.css` + update `docs/DESIGN_SYSTEM.md`

**Q: เจอ pattern ที่ใช้ซ้ำกัน 3 หน้า ควร extract เป็น component ไหม?**
A: ใช่ — promote ขึ้นไปที่ `components/ui/` (ถ้าทั่วไป) หรือ `components/features/` (ถ้า feature-scoped) ตามกฎข้อ 3

**Q: หน้าผม "ต้อง" ใช้ Tailwind เพราะ copy ตัวอย่างจาก library อื่นมา จะทำยังไง?**
A: แปลงเป็น CSS Modules ก่อน merge — ดูตัวอย่างที่ทีมเพิ่ง refactor `dashboard/page.tsx` และ `become-creator/page.tsx`

**Q: Icon ที่ผมอยากใช้ไม่มีใน library — ใช้ inline SVG จากที่อื่นได้ไหม?**
A: ห้าม inline ในหน้า — เพิ่มลงใน `components/ui/icons/icons.tsx` + `registry.ts` ก่อน แล้วค่อย import มาใช้ (กฎข้อ 3 + 6)

**Q: ตั้งใจฝ่าฝืนกฎเพราะ urgent fix ได้ไหม?**
A: ได้ แต่ต้องมี TODO comment ระบุชัดว่าจะกลับมาแก้เมื่อไร และเปิด issue/ticket ติดตาม

---

## สรุปอีกครั้ง

อ่านครบแล้วจำง่าย ๆ ด้วย 4 คำ:

> **Token. Central. Reuse. Document.**

- **Token** — สี/spacing/font ทั้งหมดมาจาก `tokens.css`
- **Central** — เรียก component จาก `@/components/...` เท่านั้น
- **Reuse** — เช็คก่อนสร้าง อย่าทำซ้ำซ้อน
- **Document** — สิ่งใหม่ต้องมี README + preview ใน design-system

ขอบคุณที่ช่วยกันรักษาความสม่ำเสมอของ codebase นี้ครับ 🙌
