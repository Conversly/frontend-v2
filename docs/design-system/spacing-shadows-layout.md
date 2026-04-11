# Spacing, Shadows & Layout — Mindtickle-Aligned

---

## Spacing Scale

Mindtickle uses a consistent spacing vocabulary. These are the values
extracted from actual component code.

| Value | Tailwind   | Use                                              |
|-------|------------|--------------------------------------------------|
| 2px   | `gap-0.5`  | Between sidebar items                            |
| 4px   | `gap-1`    | Icon margin, micro-gap, label→error gap          |
| 6px   | `gap-1.5`  | Label→input gap, breadcrumb gap                  |
| 8px   | `gap-2`    | Standard internal gap, checkbox margin           |
| 10px  | `gap-2.5`  | List item horizontal padding (tight)             |
| 12px  | `gap-3`    | Sidebar item padding, element offsets            |
| 14px  | `px-3.5`   | Standard list item horizontal padding            |
| 16px  | `gap-4`    | Standard section gap, grid column gap            |
| 20px  | `gap-5`    | Content top margin                               |
| 24px  | `gap-6`    | Section padding (cards, page header, history)    |
| 32px  | `gap-8`    | Large section separation                         |
| 48px  | `gap-12`   | Wide tab spacing                                 |

### Standard padding inside cards
```
Card header: px-5 py-5   (20px horizontal, 20px vertical)
Card body:   px-5 pb-5   (20px horizontal, 20px bottom)
Section:     px-6 py-4   (24px h, 16px v) — for sticky headers
```

### Page-level padding
```
Content area: p-6  (24px all sides)
Dense layout: p-4  (16px)
Flush layout: p-0
```

---

## Border Radius System

### The Rule
Mindtickle uses **tight radii**. This is the single biggest visual difference
from modern "round everything" design.

| Token              | Value   | Tailwind equiv      | Use                              |
|--------------------|---------|---------------------|----------------------------------|
| `--radius-input`   | 4px     | `rounded-[4px]`     | Inputs, buttons, tags, dropdowns |
| `--radius-card`    | 8px     | `rounded-[8px]`     | Cards, panels, modals            |
| `--radius`         | 8px     | `rounded-lg`        | Base (= card)                    |
| `--panel-radius-sm`| 6px     | in .theme-workspace | Smaller panel variants           |
| `--panel-radius-md`| 8px     | in .theme-workspace | Standard panels                  |
| `--panel-radius-lg`| 10px    | in .theme-workspace | Larger panels                    |
| `--radius-pill`    | 999px   | `rounded-full`      | Chips, pills, search bars        |

### Asymmetric radius (attached panels)
```css
border-radius: 0 8px 0 0;  /* top-right only — attached panel pattern */
```

### Components that MUST use 4px (not rounded-xl)
- `<Button>` — change `rounded-xl` → `rounded-[var(--radius-input)]`
- `<Input>` — already uses rounded correctly
- `<Select>` / dropdown triggers
- `<Badge>` / tags
- Dropdown menus
- Tooltips

---

## Shadow System (Mindtickle LEVEL 1–4)

### The 4-Level Elevation System

```css
--shadow-1:       0 2px 4px 0 rgba(0,0,0,0.08);    /* LEVEL1 */
--shadow-2:       0 4px 8px 0 rgba(0,0,0,0.08);    /* LEVEL2 */
--shadow-3:       0 8px 16px 0 rgba(0,0,0,0.10);   /* LEVEL3 */
--shadow-4:       0 16px 32px 0 rgba(0,0,0,0.12);  /* LEVEL4 */
--shadow-reverse: 0 -2px 4px 0 rgba(0,0,0,0.08);   /* REVERSE */
```

### When to use each level

| Shadow     | Token       | Tailwind class       | Element                        |
|------------|-------------|----------------------|--------------------------------|
| LEVEL1     | `--shadow-1`| `shadow-card`        | Cards, table shells, toolbars  |
| LEVEL2     | `--shadow-2`| `shadow-dropdown`    | Dropdowns, hover-lifted cards  |
| LEVEL3     | `--shadow-3`| `shadow-elevated`    | Modals, dialogs                |
| LEVEL4     | `--shadow-4`| `shadow-overlay`     | Full-screen overlays           |
| REVERSE    | `--shadow-reverse` | (sticky-footer) | Sticky footer bars            |
| None       | —           | `shadow-none`        | Nested or intentionally flush surfaces |

### Key insight: Most things use LEVEL1 only
```
Dashboard panels  → shadow-1
Toolbars          → shadow-1
Tables            → shadow-1
Dropdowns         → shadow-2 (slightly more to float above)
Modals            → shadow-3
Sticky footer     → shadow-reverse (upward shadow)
Sidebar           → no shadow (border only)
```

---

## Z-Index Stack

```
--z-toast:    9999   Toast notifications
--z-loader:   9990   Full-page loader
--z-overlay:  9980   Backdrop overlay
--z-confirm:  9970   Confirmation dialogs
--z-tooltip:  9950   Tooltips
--z-popover:  9940   Popovers
--z-modal:    9912   Modal container
--z-header:   9900   Sticky header / nav
Internal:     1–10   Component-level stacking
```

---

## Layout Structure

### Page Shell (authenticated)
```
┌─────────────────────────────────────────────────────┐
│  HEADER  (sticky, h-[55px], shadow-1, z-[9900])     │
├─────────────┬───────────────────────────────────────┤
│             │  Page Header (sticky, px-6 py-4)      │
│  SIDEBAR    ├───────────────────────────────────────┤
│  bg-sidebar │                                       │
│  w-[240px]  │  Page Content (p-6, overflow-auto)    │
│  border-r   │                                       │
│             │                                       │
└─────────────┴───────────────────────────────────────┘
```

### Content hierarchy inside a page
```
Page
  └─ page-header (title + breadcrumb + action buttons)
       └─ h1.page-title
       └─ p.page-subtitle
  └─ Tabs (if tabbed)
       └─ TabsList (sticky, 55px)
       └─ TabsContent
  └─ Content area
       └─ dashboard-toolbar (filter bar)
       └─ dashboard-table-shell / Card grid
```

### Toolbar + content gap
```tsx
<div className="flex flex-col gap-4">
  <div className="dashboard-toolbar">
    {/* filters, search, actions */}
  </div>
  <div className="dashboard-table-shell">
    {/* table */}
  </div>
</div>
```

---

## Responsive Breakpoints

```
xs:  0px     mobile
sm:  640px   large mobile
md:  768px   tablet (main breakpoint for layout shifts)
lg:  1024px  desktop
xl:  1280px  wide desktop
2xl: 1440px  ultrawide
```

---

## Grid System

### Standard 12-column grid
```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">Main content</div>
  <div className="col-span-4">Sidebar panel</div>
</div>
```

### KPI card grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {kpis.map(k => <Card className="dashboard-kpi-card" key={k.id} />)}
</div>
```

### Form grid (2-column fields)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="form-field">...</div>
  <div className="form-field">...</div>
</div>
```

---

## Sticky Elements Pattern

### Sticky header
```tsx
<div className="sticky top-0 z-[var(--z-header)] bg-card border-b
                border-[var(--border-default)] shadow-[var(--shadow-1)]
                h-[55px] flex items-center px-6">
```

### Sticky footer (form/modal actions)
```tsx
<div className="sticky bottom-0 bg-card border-t border-[var(--border-default)]
                shadow-[var(--shadow-reverse)] px-6 py-3
                flex items-center gap-3">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

---

## Transition Timing

Mindtickle uses very short, functional transitions — no animations for their own sake.

```css
/* Standard interactive transition */
transition: background 150ms ease, color 150ms ease;

/* Border/shadow on hover */
transition: border-color 150ms ease, box-shadow 150ms ease;

/* Sidebar collapse */
transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);

/* Card hover lift */
transition: box-shadow 200ms ease, transform 200ms ease;
/* transform: translateY(-1px) — very subtle, not -4px */
```

---

## Control Heights

```
--control-height-sm:  28px   Small selects, compact inputs
--control-height-md:  32px   Standard inputs, buttons (size="sm")
--control-height-lg:  36px   Default button height equivalent
```

---

## Common Gotchas

1. **Never use gap-6 inside a card header** — use gap-2 (8px) between title and description
2. **Section padding is 24px** — use `px-6` not `px-5` for main sections
3. **List items use min-height 38px** — never let them collapse shorter
4. **Dividers are 1px border-secondary** — not border-default (too dark)
5. **Card grid rows get border-bottom except the last** — use `[&:last-child]:border-0`
6. **Toolbar padding is 8px 12px** — compact, not full 16px
