# Conversly Frontend Design System

> **Single source of truth**: All values live in [app/globals.css](file:///Users/macbookpro/Documents/Conversly/Billing/client_v2/app/globals.css). Never hardcode colors, font sizes, or sizes inline. Reference CSS variables or Tailwind tokens derived from them.

---

## 1. Color System

### Palette Philosophy
All colors use **OKLCH** format for perceptual uniformity. OKLCH ensures colors at the same lightness level look equally bright across hues — something HSL and hex cannot guarantee.

### Core Tokens

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(0.960 0.006 248)` | Page canvas (L0) |
| `--card` | `oklch(1 0 0)` | Content panels (L2) |
| `--sidebar` | `oklch(1 0 0)` | Nav, sidebar chrome |
| `--surface-secondary` | `oklch(0.982 0.003 248)` | Nested panels inside cards |
| `--foreground` | `oklch(0.2101 0.0318 264.66)` | Headings, primary text |
| `--muted-foreground` | `oklch(0.551 0.0234 264.36)` | Captions, labels, disabled |
| `--border` | `oklch(0.9276 0.0058 264.53)` | Dividers, input borders |
| `--primary` | `oklch(0.5461 0.2152 262.88)` | Brand blue, CTAs |
| `--muted` | `oklch(0.9671 0.0021 286.37)` | Tag backgrounds, skeletons |
| `--destructive` | `oklch(0.65 0.20 25)` | Errors, delete actions |

### Color Rules
- ✅ Always use `var(--token-name)` or the Tailwind `text-foreground`, `bg-card` etc. equivalents.
- ✅ For hover darkening on brand blue: `color-mix(in oklch, var(--primary) 85%, black)`.
- ❌ Never use raw hex values like `#1E293B`, `#FFFFFF`, or Tailwind palette classes like `text-zinc-900`, `text-slate-500` in dashboard components.
- ❌ Never use `text-gray-*` or `bg-gray-*` — these bypass the token system.

---

## 2. The 3-Surface Hierarchy

Every page in the dashboard uses three depth layers. **Never break this layering.**

```
Page body
└── bg-background (L0 — tinted canvas, oklch 0.960)
    ├── sidebar / navbar
    │   └── bg-sidebar  (L1 — pure white)
    └── main content area
        └── bg-card     (L2 — pure white, float on canvas with shadow)
            └── nested sub-panels
                └── bg-[--surface-secondary]  (between L1 and L2)
```

### When to Use Each Surface

| Situation | Class to use |
|---|---|
| Page wrapper / full-screen backgrounds | `bg-background` |
| Sidebar, top navbar, tab bars | `bg-sidebar` / `bg-card` |
| Main content cards, settings panels | `bg-card` |
| Table rows (alternating), inner panels | `bg-muted` or `bg-[--surface-secondary]` |
| Input fields | `bg-[--input-background]` |
| Tag, badge, chip backgrounds | `bg-muted` |

> [!IMPORTANT]
> **Never use `bg-white`** in dashboard components. It bypasses the token system entirely and will look wrong if surface values are ever adjusted.

### Shadow Rules — Elevation Matches Layer
| Layer | Shadow class |
|---|---|
| L2 card on L0 canvas | `shadow-card` |
| Elevated card on hover | `shadow-card-hover` |
| Sticky header | `shadow-header` |
| Modals / sheets | `shadow-float` |
| Tooltips / popovers | `shadow-elevated` |

---

## 3. Typography

### Scale — Major Third (×1.25 ratio, 14px base)

| Token | Size | Tailwind | Used For |
|---|---|---|---|
| `--font-h1` | 24px | `text-2xl` | Page titles |
| `--font-h2` | 20px | `text-xl` | Section headings |
| `--font-h3` | 18px | `text-lg` | Card headings, dialog titles |
| `--font-h4` | 16px | — | Sub-section labels |
| `--font-h5` | 14px | — | Tight labels |
| `--font-body` | 14px | `text-sm` | Default body copy |
| `--font-small` | 13px | `text-xs` | Supporting text |
| `--font-xsmall` | 12px | `text-2xs` | Captions, metadata |

### Line Heights
| Level | Multiplier | Reason |
|---|---|---|
| Headings (h1–h3) | 1.2× | Tight and confident |
| Body / UI | 1.5× | Comfortable reading |
| Captions / small | 1.6×+ | Looser for legibility at small sizes |

### Letter Spacing
| Level | Value | Rule |
|---|---|---|
| h1 | `−0.02em` | Large text needs tightening |
| h2 | `−0.015em` | |
| h3 | `−0.01em` | |
| h4 | `−0.005em` | |
| body | `0` | Never adjust body spacing |
| ALL CAPS / labels | `+0.06–0.08em` | Small uppercase needs air |

### Font Weight
| Usage | Weight |
|---|---|
| Page titles, section headings | `700` (bold) |
| Card headings, subheadings | `600` (semibold) |
| Body text | `400` (regular) |
| Buttons, badges, labels | `500` (medium) |

### Typography Utility Classes (ready-made)
Use these instead of writing raw Tailwind combinations:

```html
<h1 class="type-page-title">...</h1>
<h2 class="type-section-title">...</h2>
<p class="type-body">...</p>
<span class="type-body-muted">...</span>
<span class="type-caption">...</span>
<span class="type-label">...</span>  <!-- ALL CAPS -->
```

### Paragraph Spacing
- `<p>` tags automatically get `margin-bottom: var(--paragraph-spacing)` (≈ 14px).
- The last `<p>` in a block has no bottom margin.
- For custom paragraph-like spacing, use `space-y-3` or `space-y-4` on the container.

---

## 4. Spacing

Follow an **8px grid** — all spacing values should be multiples of 4px (preferably 8px).

| Token | Value | Use |
|---|---|---|
| `spacing.xs` | 8px | Tight gaps (icon + label) |
| `spacing.sm` | 12px | Compact layouts |
| `spacing.md` | 16px | Default padding |
| `spacing.lg` | 24px | Section gaps |
| `spacing.xl` | 32px | Page section padding |

### Card Padding
- Standard card: `p-6` (24px)
- Compact card / table cell: `p-4` (16px)
- Large featured card: `p-8` (32px)

### Page Layout
- Page container padding: `px-6 py-6` on desktop, `px-4 py-4` on mobile.
- Max content width: `max-w-[1280px]` (`--content-max-width`).
- Section spacing (between major areas): `mb-8` or `gap-8`.
- Header → content gap: `mb-6`.

---

## 5. Border Radius

| Size | Token | Value | Used For |
|---|---|---|---|
| Small | `rounded-sm` | ~6px | Badges, tags, chips |
| Default | `rounded-md` | ~8px | Inputs, small cards |
| Large | `rounded-lg` | 10px | Cards, panels, dialogs |
| XL | `rounded-xl` | ~14px | Featured cards, modals |
| Full | `rounded-full` | 9999px | Avatars, pill buttons |

---

## 6. Borders & Dividers

- Standard borders: `border border-border` — uses `var(--border)` token.
- Dividers between sections: `<div class="h-px w-full bg-border" />` or `<Separator />` from shadcn.
- ❌ Never use `border-gray-200` or `border-zinc-200` — use `border-border`.

---

## 7. Interactive States

### Buttons
| State | Behavior |
|---|---|
| Default | `bg-primary text-white` |
| Hover | `color-mix(in oklch, var(--primary) 85%, black)` — ~15% darker |
| Focus | `ring-2 ring-ring ring-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` |
| Destructive | `bg-destructive`, hover darkens the same way |

> [!TIP]
> Always pair a hover state with a **smooth transition**: `transition-colors duration-150`.

### Links & Clickable Items
```css
cursor: pointer; /* Already global for button, a, [role="button"], .clickable */
```

### Cards with Hover
Use `.shadow-card-hover` — it handles both the base shadow and the lifted hover state automatically.

### Focus
- Form inputs: `focus-visible:ring-2 focus-visible:ring-ring`
- Avoid `outline: none` without a replacement focus indicator.

---

## 8. Component Patterns

### Page Structure
```tsx
<div className="page-container">
  <div className="page-header">
    <h1 className="page-title">Title</h1>
    <p className="page-subtitle">Description</p>
  </div>
  {/* Content */}
</div>
```

### Standard Content Card
```tsx
<Card className="bg-card shadow-card p-6 rounded-lg">
  <h2 className="type-section-title mb-1">Section</h2>
  <p className="type-body-muted mb-4">Description</p>
  {/* Content */}
</Card>
```

### Nested Panel Inside a Card
```tsx
<div className="bg-[--surface-secondary] rounded-md p-4 border border-border">
  {/* Inner content */}
</div>
```

### Empty States
- Center-aligned, muted icon + `type-body-muted` text + optional CTA button.
- Use [components/shared/empty-state.tsx](file:///Users/macbookpro/Documents/Conversly/Billing/client_v2/components/shared/empty-state.tsx).

### Stat / Metric Cards
- Value: `text-2xl font-bold text-foreground`
- Label: `type-body-muted`
- Trend indicator: green (`text-green-600`) / red (`text-destructive`)

---

## 9. Iconography

- Use `lucide-react` icons throughout (already installed).
- Standard icon size in text context: `h-4 w-4` (16px).
- Icon + button: `h-4 w-4` with `gap-2` between icon and label.
- Standalone action icon: `h-5 w-5` (20px).
- Never color icons with raw hex — use `text-muted-foreground`, `text-primary`, `text-destructive`.

---

## 10. Anti-Patterns — What NOT to Do

| ❌ Don't | ✅ Do instead |
|---|---|
| `bg-white` | `bg-card` or `bg-sidebar` |
| `text-zinc-900` | `text-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `border-gray-200` | `border-border` |
| Inline `style={{ color: '#...' }}` | Use a CSS token or Tailwind class |
| `className="text-[14px]"` | `text-sm` (maps to `--font-body`) |
| `dark:...` classes | Dark mode is disabled — don't add dark variants |
| Hardcoded shadow values | Use `.shadow-card`, `.shadow-float` etc. |
| `font-weight: bold` on small text | Use `font-medium` (500) for small text |

---

## 11. Dark Mode

> [!CAUTION]
> **Dark mode is currently disabled.** The `.dark` CSS block still exists but is not activated. Do not add any `dark:` Tailwind variants to new components — they will never apply and add noise to the codebase.

---

## 12. Component Review Checklist

Before shipping any new page or component, verify:

- [ ] Background uses `bg-background`, `bg-card`, or `bg-sidebar` (not `bg-white`)
- [ ] Text uses `text-foreground` or `text-muted-foreground` (not `text-zinc-*`)
- [ ] Borders use `border-border` (not `border-gray-*`)
- [ ] Cards have either `shadow-card` or a visible border
- [ ] Headings have correct weight (700 for h1/h2, 600 for h3/h4)
- [ ] No `dark:` classes added
- [ ] No inline `style` color values
- [ ] Spacing follows the 8px grid
- [ ] Interactive elements have hover + focus states
