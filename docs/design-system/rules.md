# Design System Rules — Enforcement Guide

## The One Sentence Rule
> Every visual value in a component must come from a CSS variable or a
> named design-system class. If you can't point to the token, it's wrong.

---

## NEVER DO

```tsx
// ❌ Hardcoded colors (hex, rgb, oklch)
style={{ color: '#595959' }}
style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
className="text-[#8c8c8c]"

// ❌ Tailwind color scale (green, red, blue, zinc, gray, slate...)
className="bg-green-100 text-green-800"
className="bg-red-500 text-white"
className="text-gray-500"
className="border-zinc-200"

// ❌ Hardcoded font values
style={{ fontSize: '13px', fontWeight: 600 }}
className="text-[15px] font-[550]"

// ❌ Hardcoded shadow
style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
className="shadow-[0_2px_8px_rgba(0,0,0,0.15)]"

// ❌ Hardcoded border-radius
className="rounded-xl"      // use rounded-[var(--radius-input)] or rounded-lg
className="rounded-2xl"
className="rounded-[12px]"

// ❌ Hardcoded z-index
style={{ zIndex: 9999 }}
className="z-[9999]"
```

---

## ALWAYS DO

```tsx
// ✅ Text colors
className="text-foreground"              // primary text
className="text-muted-foreground"        // secondary text
style={{ color: 'var(--text-tertiary)' }}// tertiary/hint
style={{ color: 'var(--text-accent)' }}  // link/accent

// ✅ Background colors
className="bg-background"   // page canvas
className="bg-card"         // card surface
className="bg-secondary"    // sidebar/structural
className="bg-muted"        // tag/skeleton bg
className="bg-[var(--surface-secondary)]"  // nested panel
className="bg-[var(--bg-accent-selected)]" // selected row

// ✅ Borders
className="border border-border"
className="border border-[var(--border-secondary)]"
className="border border-[var(--border-accent)]"  // focus

// ✅ Shadows — use named tokens
className="shadow-[var(--shadow-1)]"    // cards
className="shadow-[var(--shadow-2)]"    // dropdowns
className="shadow-[var(--shadow-3)]"    // modals

// ✅ Status colors — ALWAYS use chips or semantic tokens
className="dashboard-status-chip dashboard-status-chip--success"
className="bg-[var(--status-danger-bg)] text-[var(--status-danger-fg)]"
  
// ✅ Typography — use named classes
className="type-page-title"
className="type-card-title"
className="type-body"
className="type-label"
className="type-caption"
className="type-error"

// ✅ Border radius
className="rounded-[var(--radius-input)]"  // 4px — inputs, buttons
className="rounded-lg"                      // 8px — cards (= --radius)
className="rounded-full"                    // pills, chips

// ✅ Z-index
className="z-[var(--z-modal)]"
className="z-[var(--z-tooltip)]"
```

---

## Component Checklist

Before shipping any component, verify:

### Colors
- [ ] No `bg-green-*`, `bg-red-*`, `bg-blue-*`, `text-gray-*` etc.
- [ ] No hardcoded `#hex` values
- [ ] Status indicators use `dashboard-status-chip`
- [ ] Dark mode works (use token → auto-switches, don't write `dark:` overrides)

### Typography
- [ ] Headings use `h1-h6` tags or `type-*` classes
- [ ] Body text uses `text-sm` (14px) or `type-body`
- [ ] Secondary text uses `text-muted-foreground` or `type-body-muted`
- [ ] Form labels use `type-label` or `text-xs text-muted-foreground`
- [ ] Error messages use `type-error`

### Spacing
- [ ] Card padding is `px-5 py-5` (header) and `px-5 pb-5` (content)
- [ ] Form field label→input gap is `gap-1.5` (6px)
- [ ] Form field→field gap is `gap-4` (16px)
- [ ] Section→section gap is `gap-6` (24px)

### Borders & Radius
- [ ] Inputs use border `border-border` or `border-[var(--border-default)]`
- [ ] Buttons use `rounded-[var(--radius-input)]` not `rounded-xl`
- [ ] Cards use `rounded-lg` (8px)
- [ ] Chips/pills use `rounded-full`

### Shadows
- [ ] Cards use `shadow-[var(--shadow-1)]` or `dashboard-panel` class
- [ ] No custom box-shadow values
- [ ] Sticky footer uses `shadow-[var(--shadow-reverse)]`

---

## Priority Fix List (from audit)

These existing components have violations — fix in this order:

### 🔴 Critical
| File | Issue | Fix |
|------|-------|-----|
| `components/ui/button.tsx:8` | `rounded-xl` hardcoded | → `rounded-[var(--radius-input)]` |
| `components/analytics/recent-feedback-table.tsx:52-58` | `bg-green-100 text-green-800` | → `dashboard-status-chip--success` |
| `components/analytics/summary-cards.tsx:85` | `bg-green-500` | → `bg-[var(--status-success-fg)]` |

### 🟡 Medium
| File | Issue | Fix |
|------|-------|-----|
| Any card using `p-3` or `p-4` | Inconsistent padding | → `px-5 py-5` / `px-5 pb-5` |
| `components/landing/FAQ.tsx` | Hardcoded hex `#dbe5f4` | Keep — landing is separate system |

---

## File Structure Convention

Every feature component should be split:
```
components/
  feature-name/
    FeatureComponent.tsx     — JSX only, no inline styles
    FeatureComponent.types.ts — TypeScript interfaces
```

All styling via:
1. Tailwind utilities (token-mapped)
2. Named CSS classes from globals.css
3. CSS variables via `className="bg-[var(--token)]"` when no Tailwind equivalent

---

## Adding New Colors

When a design needs a color not in the token system:

1. **Check if a semantic token already covers it** — usually it does
2. **If genuinely new** — add to `:root` in `globals.css` with:
   - A semantic name (`--status-archived-bg`, not `--cool-gray`)
   - Both light and dark values
   - Document here in `colors.md`
3. **Never add one-off colors directly in component** — they become design debt

---

## Component Variants Pattern

Use `cva` (class-variance-authority) for any component with 2+ visual states:

```tsx
import { cva } from 'class-variance-authority'

const cardVariants = cva(
  // base classes — always applied
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      elevation: {
        default: "shadow-[var(--shadow-1)] border-[var(--panel-border-soft)]",
        flat:    "shadow-none border-[var(--border-secondary)]",
        raised:  "shadow-[var(--shadow-2)] border-[var(--panel-border-soft)]",
      },
      padding: {
        default: "",      // CardHeader/CardContent handle padding
        flush:   "p-0",
      }
    },
    defaultVariants: {
      elevation: "default",
      padding: "default",
    }
  }
)
```

---

## Cursor Rules (for AI-assisted coding)

If using Cursor/Claude, add these to `.cursor/rules/` or `CLAUDE.md`:

```
NEVER hardcode colors — use CSS variables from globals.css
NEVER use bg-green-*, bg-red-*, text-gray-* Tailwind colors
NEVER use rounded-xl — use rounded-[var(--radius-input)] for buttons/inputs
NEVER write dark: overrides — rely on token swap
ALWAYS use dashboard-status-chip for status indicators
ALWAYS use type-* classes for typography
Card padding: px-5 py-5 (header) and px-5 pb-5 (content)
Form label→input gap: gap-1.5 (6px)
Shadows: shadow-[var(--shadow-1)] for cards, never custom box-shadow
```
