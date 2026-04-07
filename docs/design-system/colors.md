# Color System — Mindtickle-Aligned

## Philosophy
- Token-first. Never hardcode `#hex`, `rgb()`, `bg-green-500`, `text-red-800`.
- All colors live in `app/globals.css` as CSS variables.
- Use semantic names, not descriptive names. `--text-secondary` not `--gray-500`.
- 4-level surface hierarchy creates visual depth without shadows.

---

## Surface Hierarchy (Background Layers)

```
L0  --background          oklch(1 0 0)              #ffffff   Page canvas
L1  --secondary           oklch(0.968 0.006 264)     #f5f7fa   Sidebar, chrome
L2  --card                oklch(1 0 0)              #ffffff   Cards, panels
L3  --surface-secondary   oklch(0.968 0.006 264)     #f5f7fa   Nested panels
    --surface-tertiary    oklch(0.954 0.008 264)     #f0f2f5   Hover states
```

**How layering works in practice:**
- Page body = `bg-background` (white)
- Sidebar = `bg-sidebar` (light blue-gray #f5f7fa)
- Card on page = `bg-card` (white) + `--shadow-1` to lift it
- Nested panel inside card = `bg-[var(--surface-secondary)]`
- Hover state = `bg-[var(--surface-tertiary)]`

---

## Primary Brand Blue

```
--primary               oklch(0.548 0.217 261)     ≈ #1677ff   Ant Design 5 blue
--primary-foreground    oklch(1 0 0)              #ffffff

Derived states (use color-mix, don't hardcode):
  hover:   color-mix(in oklch, var(--primary) 85%, black)
  active:  color-mix(in oklch, var(--primary) 75%, black)
  subtle:  color-mix(in oklch, var(--primary) 10%, white)
```

---

## Text Hierarchy (4 levels)

| Token               | OKLCH                      | Approx Hex | Use                              |
|---------------------|----------------------------|------------|----------------------------------|
| `--text-default`    | `oklch(0.215 0.020 264)`   | `#262626`  | All body copy, headings          |
| `--text-secondary`  | `oklch(0.479 0.012 264)`   | `#595959`  | Labels, metadata, sub-headings   |
| `--text-tertiary`   | `oklch(0.609 0.008 264)`   | `#8c8c8c`  | Hints, placeholders              |
| `--text-disabled`   | `oklch(0.765 0.005 264)`   | `#bfbfbf`  | Disabled states                  |
| `--text-accent`     | `oklch(0.548 0.217 261)`   | `#1677ff`  | Links, active tab labels         |
| `--text-danger`     | `oklch(0.548 0.200 22)`    | `#ff4d4f`  | Error messages                   |
| `--text-success`    | `oklch(0.516 0.155 142)`   | `#52c41a`  | Success messages                 |
| `--text-warning`    | `oklch(0.620 0.160 75)`    | `#faad14`  | Warning messages                 |
| `--text-inverse`    | `oklch(1 0 0)`             | `#ffffff`  | White text on dark/accent bg     |

**Rules:**
- Body text → `text-foreground` or `color: var(--text-default)`
- Muted/meta → `text-muted-foreground` or `color: var(--text-secondary)`
- Form labels → `color: var(--text-secondary)` + `font-weight: 400`
- Error → `color: var(--text-danger)`, never `text-red-500`
- Links → `color: var(--text-accent)`, never `text-blue-500`

---

## Icon Hierarchy

| Token               | OKLCH                    | Use                              |
|---------------------|--------------------------|----------------------------------|
| `--icon-default`    | `oklch(0.560 0.015 264)` | Standard icons                   |
| `--icon-secondary`  | `oklch(0.660 0.010 264)` | Muted/info icons                 |
| `--icon-disabled`   | `oklch(0.775 0.005 264)` | Disabled tab icons               |
| `--icon-strong`     | `oklch(0.350 0.020 264)` | Drag handles, prominent icons    |
| `--icon-accent`     | `oklch(0.548 0.217 261)` | Active/interactive icons         |
| `--icon-inverse`    | `oklch(1 0 0)`           | White icons on dark/accent bg    |

---

## Border Hierarchy

| Token                 | OKLCH                    | Approx Hex | Use                        |
|-----------------------|--------------------------|------------|----------------------------|
| `--border-default`    | `oklch(0.866 0.005 264)` | `#d9d9d9`  | Inputs, standard borders   |
| `--border-secondary`  | `oklch(0.916 0.004 264)` | `#e8e8e8`  | Dividers, card grid rows   |
| `--border-tertiary`   | `oklch(0.940 0.003 264)` | `#efefef`  | Very subtle separation     |
| `--border-strong`     | `oklch(0.760 0.010 264)` | `#adadad`  | Emphasized borders         |
| `--border-accent`     | `oklch(0.548 0.217 261)` | `#1677ff`  | Focus rings, active state  |
| `--border-danger`     | `oklch(0.750 0.100 18)`  |            | Error state input          |

---

## Semantic Status System

Every status has 3 tokens: `bg` (light fill) + `fg` (text/icon) + `border`.

### Info (Blue)
```css
--status-info-bg:      oklch(0.963 0.028 248)   /* ≈ #e6f4ff */
--status-info-fg:      oklch(0.548 0.217 261)   /* ≈ #1677ff */
--status-info-border:  oklch(0.868 0.075 245)   /* ≈ #91caff */
```

### Success (Green)
```css
--status-success-bg:     oklch(0.971 0.040 148)   /* ≈ #f6ffed */
--status-success-fg:     oklch(0.516 0.155 142)   /* ≈ #389e0d */
--status-success-border: oklch(0.852 0.095 148)   /* ≈ #b7eb8f */
```

### Warning (Amber)
```css
--status-warning-bg:     oklch(0.985 0.042 85)    /* ≈ #fffbe6 */
--status-warning-fg:     oklch(0.620 0.160 75)    /* ≈ #ad6800 */
--status-warning-border: oklch(0.884 0.125 82)    /* ≈ #ffe58f */
```

### Danger (Red)
```css
--status-danger-bg:     oklch(0.976 0.022 20)    /* ≈ #fff2f0 */
--status-danger-fg:     oklch(0.548 0.200 22)    /* ≈ #cf1322 */
--status-danger-border: oklch(0.840 0.095 18)    /* ≈ #ffa39e */
```

### Neutral (Gray)
```css
--status-neutral-bg:     oklch(0.963 0.005 264)
--status-neutral-fg:     oklch(0.479 0.012 264)
--status-neutral-border: oklch(0.900 0.005 264)
```

**Usage — status chips:**
```tsx
// CORRECT
<span className="dashboard-status-chip dashboard-status-chip--success">Passed</span>
<span className="dashboard-status-chip dashboard-status-chip--danger">Failed</span>

// WRONG — never do this
<span className="bg-green-100 text-green-800">Passed</span>
```

---

## Accent / Selected State Backgrounds

```css
--bg-accent-selected:  oklch(0.955 0.032 250)   /* selected row, active list item */
--bg-accent-subtle:    oklch(0.963 0.024 248)   /* softer selection */
--bg-disabled:         oklch(0.960 0.005 264)   /* disabled elements, dividers */
```

---

## Sidebar Colors

```css
--sidebar:                    oklch(0.968 0.006 264)   /* ≈ #f5f7fa bg */
--sidebar-foreground:         oklch(0.215 0.020 264)
--sidebar-primary:            oklch(0.548 0.217 261)   /* active item text */
--sidebar-accent:             oklch(0.955 0.032 250)   /* active item bg */
--sidebar-accent-foreground:  oklch(0.548 0.217 261)
--sidebar-border:             oklch(0.898 0.005 264)
```

---

## Anti-Patterns — What NEVER to do

```tsx
// ❌ Hardcoded hex
style={{ color: '#595959' }}
className="text-[#595959]"

// ❌ Tailwind color scale
className="bg-green-100 text-green-800"
className="bg-red-500 text-white"
className="border-blue-400"

// ❌ Opacity-only tokens without semantic meaning
className="bg-primary/10"   // ok for one-off decorative, not for status

// ✅ Always use semantic tokens
style={{ color: 'var(--text-secondary)' }}
className="text-muted-foreground"
className="dashboard-status-chip dashboard-status-chip--success"
className="bg-[var(--status-danger-bg)] text-[var(--status-danger-fg)]"
```

---

## Dark Mode

All tokens automatically switch when `.dark` class is on the root.
Never write separate dark mode color logic in components — rely on the token swap.

```tsx
// ✅ Token handles dark automatically
<div className="bg-card text-foreground border border-border">

// ❌ Manual dark override — avoid
<div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
```
