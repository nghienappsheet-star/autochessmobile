---
name: design-review
description: Audits UI changes against design-system and component rules for brand consistency. Use before finishing any UI work, when reviewing visual changes, or when the user asks for a design consistency check.
---

# Design Review

Run this checklist before completing any UI change.

## Color tokens

- [ ] Uses `brand-*` tokens — no raw hex (`#050505`, `#111`, `#333`, etc.)
- [ ] Cards: `bg-brand-card border-brand-border`
- [ ] Primary CTA: `bg-gold-gradient` (not flat `bg-brand-gold`)
- [ ] Text: `text-brand-text-main` / `text-brand-text-sub`
- [ ] Tier badges: `tier-s`, `tier-a`, `tier-b`, `tier-c` variants from `Badge`

## Typography

- [ ] Font: Inter via `font-sans`
- [ ] Headings: `font-bold` or `font-semibold`, `tracking-tight` — **no `italic`**
- [ ] No `font-black`
- [ ] Uppercase only on badges, eyebrow labels, small stat labels

## Border radius

- [ ] Cards, buttons, inputs: `rounded-xl` (8px)
- [ ] Badges: `rounded-md`
- [ ] `rounded-full` only for avatars, status dots, circular icon buttons
- [ ] No `rounded-2xl` / `rounded-3xl` on ordinary cards

## Components

- [ ] Uses shared components from `src/components/ui/core.tsx`
- [ ] Layout: `PageContainer`, `PageHeader` (public) or admin components (admin)
- [ ] Nav from `NAV_ITEMS` — not duplicated
- [ ] Hero cost colors via `heroCostBarClass()` / `heroCostBadgeClass()`
- [ ] Class merging via `cn()`

## Charts (if applicable)

- [ ] Stroke: `#F5B43C`, area fill at 15% opacity
- [ ] Grid: `rgba(255,255,255,0.05)`, axis ticks `#8A8F98`

## Rule references

- [design-system.mdc](../../rules/design-system.mdc)
- [components.mdc](../../rules/components.mdc)

Report findings as:
- **Critical**: breaks brand consistency or uses forbidden patterns
- **Suggestion**: minor deviation worth fixing
- **Pass**: compliant
