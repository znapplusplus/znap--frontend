# Contributing

How we ship changes to the Znap++ frontend. Read the relevant section before opening a PR.

---

## Quick start

```bash
# Install
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Lint
npm run lint

# Production build (verify before merging)
npm run build
```

Required tools: Node.js 20+, npm 10+.

---

## Branch naming

Format: `<type>/<short-kebab-description>`

| Type | Use for |
|---|---|
| `feat/` | New feature or component |
| `fix/` | Bug fix |
| `refactor/` | Code restructure without behavior change |
| `style/` | CSS / tokens / design system tweaks |
| `docs/` | Documentation only |
| `chore/` | Tooling, dependencies, CI |
| `perf/` | Performance improvement |

Examples:
- `feat/booking-flow-step-1`
- `fix/navbar-mobile-overflow`
- `style/update-warning-token`
- `refactor/extract-dashboard-stat-card`

---

## Commit messages

Format: `<type>: <short imperative summary>`

```
feat: add Modal component to ui primitives
fix: prevent double-submit on become-creator form
style: align dashboard badges with semantic tokens
refactor: split dashboard topbar into its own component
docs: explain heading clamp() scale
```

Keep the subject line ≤ 72 characters. Add a blank line and a longer body if you need to explain *why*.

For breaking changes, prefix with `!`:

```
refactor!: rename --color-text-dark to --color-text-primary

BREAKING: any CSS module using --color-text-dark must update.
```

---

## Before opening a PR

Run through this checklist. Most points have a corresponding doc — follow the link if unsure.

### Code

- [ ] `npm run lint` passes with no errors.
- [ ] `npm run build` succeeds.
- [ ] No `console.log`, no commented-out code blocks.
- [ ] No new `any` types without an explanation comment.
- [ ] No Tailwind utility classes added. ([Coding Standards](./CODING_STANDARDS.md))

### Design

- [ ] All colors, spacing, radii reference tokens — no raw hex/px. ([Design System](./DESIGN_SYSTEM.md))
- [ ] If you added a token, you also documented it in `DESIGN_SYSTEM.md`.
- [ ] Headings use the responsive `clamp()` scale in `globals.css` — no fixed `font-size` on `<h1>`–`<h6>`.

### Component

- [ ] New components follow the folder shape: `Name/Name.tsx + Name.module.css + index.ts + README.md`. ([Component Guide](./COMPONENT_GUIDE.md))
- [ ] Props are typed; props type is exported.
- [ ] Component is re-exported from the group `index.ts`.
- [ ] No new component imports from `app/`.

### Accessibility

- [ ] Keyboard reachable, with visible focus state.
- [ ] Icon-only controls have `aria-label`.
- [ ] Semantic HTML (`<button>`, `<a>`, `<input>`) used where possible.

### Verification

- [ ] Tested the change in dev on at least: `/`, `/dashboard`, `/design-system` (and the page you touched).
- [ ] Mobile sanity check (Chrome devtools `iPhone 14 Pro` profile is fine).
- [ ] Screenshots or short clip attached for visual changes.

---

## PR description template

Paste this when opening a PR:

```markdown
## What

Short summary of the change.

## Why

What problem does this solve? Link the issue if there is one.

## How

Notable implementation decisions. Skip if the diff is obvious.

## Screenshots

| Before | After |
|---|---|
| ... | ... |

## Checklist

- [ ] Lint + build pass
- [ ] Followed [Coding Standards](./docs/CODING_STANDARDS.md)
- [ ] Tokens used for all design values
- [ ] Tested on mobile + desktop
- [ ] Accessible (keyboard + focus + ARIA)
```

---

## Reviewing a PR

When you review someone else's PR:

1. **Read the description first.** If you can't tell what changed without reading the diff, the description is incomplete — ask for one.
2. **Pull and run locally** for visual changes. Don't approve UI changes based on screenshots alone.
3. **Check the checklist above.** Be explicit about which items aren't met.
4. **Comment with intent.** Prefix non-blocking suggestions with `nit:` so the author knows it's optional.
5. **Approve when ready.** Don't leave a PR in "Comment" state — either request changes or approve.

---

## Releasing

We don't have a formal release cadence yet. Main is the only deployed branch. Merge to main = ship.

Before merging your PR to main:

- [ ] At least one approval.
- [ ] CI green.
- [ ] Conflicts resolved against latest `main`.

---

## Getting help

- Open a draft PR early if you want feedback on direction.
- Tag the relevant founder on:
  - Backend/API contract: backend owner
  - Visual design / tokens: design owner
  - DX / build / repo structure: frontend owner
- For anything design-system-related, link the [Design System reference](./DESIGN_SYSTEM.md) and quote the relevant section in the discussion.
