# Typography System — Mindtickle-Aligned

## Font
**Current:** Inter (variable font, weights 100–900, loaded via `next/font` in `app/layout.tsx`)

Inter is a variable font — `font-medium` (500) and `font-semibold` (600) render correctly without synthetic weight fallbacks.

---

## Text Color Tokens

| Token               | OKLCH                     | Approx Hex | Use                                         |
|---------------------|---------------------------|------------|---------------------------------------------|
| `--text-default`    | oklch(0.215 0.020 264)    | #262626    | All primary text — headings, body, values   |
| `--text-secondary`  | oklch(0.420 0.015 264)    | #4d4d4d    | Labels, captions, descriptions              |
| `--text-tertiary`   | oklch(0.560 0.010 264)    | #717171    | Hints, placeholders, breadcrumbs            |
| `--text-disabled`   | oklch(0.765 0.005 264)    | #bfbfbf    | Disabled inputs, inactive states            |
| `--text-accent`     | oklch(0.548 0.217 261)    | #1677ff    | Links, active tabs, selected states         |
| `--text-danger`     | oklch(0.548 0.200 22)     | #ff4d4f    | Error messages, destructive actions         |
| `--muted-foreground`| oklch(0.420 0.015 264)    | #4d4d4d    | Tailwind alias — same as `--text-secondary` |

**Why these values were chosen:** `--text-secondary` was previously #595959 (oklch 0.479). On gray surfaces like the sidebar (#f5f7fa), that gave only ~4.1:1 contrast — below WCAG AA (4.5:1 required). The new value #4d4d4d gives ~5.8:1 on gray and ~8.3:1 on white.

---

## Secondary Text: Token vs Opacity

There are two ways to write secondary/descriptive text. Use the right one for the context:

```tsx
// ✅ Use CSS token for text that semantically IS secondary (labels, captions, metadata)
className="text-muted-foreground"       // --muted-foreground = #4d4d4d
className="type-label"                  // same color via CSS class

// ✅ Use opacity for text that IS primary but needs visual softening (subtitles, descriptions)
className="text-foreground/65"          // #262626 at 65% — stays readable on any bg color
className="text-foreground/70"          // feature sub-descriptions (e.g. "Allow AI to escalate...")

// ❌ Don't use text-muted-foreground for feature descriptions — they're primary content
<p className="text-xs text-muted-foreground">Allow AI to escalate to a human agent</p>
// ✅ Correct:
<p className="text-xs text-foreground/70">Allow AI to escalate to a human agent</p>
```

**Rule of thumb:**
- Is it a *label, caption, or metadata*? → `text-muted-foreground` / `--text-secondary`
- Is it a *description of a feature/action* that the user needs to read? → `text-foreground/65` or `/70`

---

## Font Size Scale (Mindtickle XS → 4XL)

| Token        | Value | Mindtickle Name    | Use Case                              |
|--------------|-------|--------------------|---------------------------------------|
| `--font-xs`  | 10px  | XS / labelSmall    | Counts, overlines, status chip labels |
| `--font-s`   | 12px  | S / labelMedium    | Form labels, secondary body, captions |
| `--font-m`   | 14px  | M / body default   | Body text, list items, form values    |
| `--font-l`   | 16px  | L / headingSmall   | Card titles, sidebar items            |
| `--font-xl`  | 20px  | XL / headingMedium | Section titles                        |
| `--font-2xl` | 24px  | 2XL / headingLarge | Page titles                           |
| `--font-3xl` | 28px  | 3XL / headingXLarge| Large display headings                |
| `--font-4xl` | 32px  | 4XL / displayLarge | Hero headings (rare in dashboard)     |

---

## Font Weight Scale

| Token                   | Value | Mindtickle Name | Use                              |
|-------------------------|-------|-----------------|----------------------------------|
| `--font-weight-light`   | 300   | LIGHT           | Large display headings (h1 area) |
| `--font-weight-regular` | 400   | REGULAR         | Body text, h2, h3                |
| `--font-weight-medium`  | 500   | MEDIUM          | Card titles, sidebar items, h1   |
| `--font-weight-semibold`| 600   | SEMIBOLD        | Small headings, labels, chips    |
| `--font-weight-bold`    | 700   | —               | Only for hero/marketing text     |

---

## Line Heights

| Token       | Value | Formula   |
|-------------|-------|-----------|
| `--line-xs` | 16px  | 10 × 1.6  |
| `--line-s`  | 19px  | 12 × 1.6  |
| `--line-m`  | 21px  | 14 × 1.5  |
| `--line-l`  | 24px  | 16 × 1.5  |
| `--line-xl` | 24px  | 20 × 1.2  |
| `--line-2xl`| 29px  | 24 × 1.2  |
| `--line-3xl`| 34px  | 28 × 1.2  |
| `--line-4xl`| 38px  | 32 × 1.2  |

**Rule:** Headings use 1.2× line height. Body uses 1.5×. Labels/captions use 1.6×.

---

## Heading Hierarchy — The Key Mindtickle Rule

> **Mindtickle uses LIGHTER weights at LARGER sizes.**
> This is the single most distinctive typographic trait.
> H1 is Medium (500), H2 is Regular (400). NOT bold.

```
H1  24px  weight 500  tracking -0.016em   Page title
H2  20px  weight 400  tracking -0.012em   Section title
H3  18px  weight 400  tracking -0.008em   Sub-section title
H4  16px  weight 500  tracking -0.004em   Card title
H5  14px  weight 600  tracking 0          Small heading (semibold)
H6  12px  weight 600  tracking +0.02em    Label heading (uppercase)
```

Both the `h1` base element and `.type-page-title` class use `font-weight: 500`.

Compare to common mistake:
```
❌ h1 { font-weight: 700; }   ← looks too heavy
❌ h1 { font-weight: 400; }   ← looks like body text (previous bug — now fixed)
✅ h1 { font-weight: 500; }   ← clean, professional, Mindtickle style
```

---

## Named TextStyle Classes (use in components)

These CSS classes are defined in `globals.css @layer components`. Use these
instead of raw Tailwind to ensure consistency.

| Class                 | Size  | Weight | Color             | Use                         |
|-----------------------|-------|--------|-------------------|-----------------------------|
| `.type-page-title`    | 24px  | 500    | `--text-default`  | Page `<h1>` equivalent      |
| `.type-section-title` | 20px  | 400    | `--text-default`  | Section headers             |
| `.type-card-title`    | 16px  | 500    | `--text-default`  | Card / panel titles         |
| `.type-heading-small` | 14px  | 600    | `--text-default`  | Small headings in lists     |
| `.type-body`          | 14px  | 400    | `--text-default`  | Default body copy           |
| `.type-body-strong`   | 14px  | 600    | `--text-default`  | Emphasized body             |
| `.type-body-muted`    | 12px  | 400    | `--text-secondary`| Secondary/caption text      |
| `.type-label`         | 12px  | 400    | `--text-secondary`| Form labels (default)       |
| `.type-label-accent`  | 12px  | 500    | `--text-default`  | Emphasized form labels      |
| `.type-caption`       | 10px  | 600    | `--text-secondary`| Counts, overlines, chips    |
| `.type-error`         | 12px  | 400    | `--text-danger`   | Form error messages         |

---

## Shadcn `<Label>` Component

The Radix/Shadcn `<Label>` component (`components/ui/label.tsx`) uses `text-foreground` (dark near-black), not `text-muted-foreground`. This ensures form labels are always clearly readable.

```tsx
// label.tsx — current implementation
const labelVariants = cva(
  "text-xs font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
)

// ❌ Old (grey labels — hard to read)
"text-xs font-medium text-muted-foreground"

// ✅ Current (dark labels)
"text-xs font-medium text-foreground"
```

---

## Tailwind Mapping (v4)

```
text-2xs   → 10px  (--font-xs)
text-xs    → 12px  (--font-s)
text-sm    → 14px  (--font-m)
text-base  → 14px  (--font-m, aligns with MT body default)
text-lg    → 16px  (--font-l)
text-xl    → 20px  (--font-xl)
text-2xl   → 24px  (--font-2xl)
```

---

## Letter Spacing Rules

```
Large headings (24px+): -0.018em to -0.012em  (negative — tighter)
Medium headings (16-20px): -0.008em to -0.004em
Small headings (14px): 0
Body: 0 (no adjustment)
Labels/captions (uppercase): +0.04em to +0.08em (wider)
```

---

## Paragraph Spacing

```css
--paragraph-spacing: 14px;   /* = 1× body font size */

p { margin-bottom: var(--paragraph-spacing); }
p:last-child { margin-bottom: 0; }
```

---

## Usage Patterns

### Page structure
```tsx
<div className="page-header">
  <h1 className="page-title">Users</h1>
  <p className="page-subtitle">Manage your team members</p>
</div>
```

### Page subtitle / section description
```tsx
// Subtitle under a page heading or section — softer but dark-based
<p className="text-xs text-foreground/65">
  Define when and how conversations escalate to a human agent.
</p>
```

### Card title + description
```tsx
<CardTitle>                    // 16px, weight 500, --text-default (text-foreground)
<CardDescription>              // 12px, weight 500, --text-secondary
```

### Feature toggle row (title + sub-description)
```tsx
<p className="text-sm font-medium text-foreground">Enable Human Handoff</p>
<p className="text-xs text-foreground/70">Allow AI to escalate to a human agent</p>
// ↑ /70 not text-muted-foreground — this is a feature description, not metadata
```

### Section overline header (uppercase divider)
```tsx
<p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
  Escalation Triggers
</p>
// Or use the CSS class:
<p className="type-caption">ESCALATION TRIGGERS</p>
```

### Form field label
```tsx
// Using Shadcn Label component (recommended — uses text-foreground)
<Label htmlFor="email">Email Address</Label>

// Using CSS class (uses --text-secondary = #4d4d4d)
<label className="form-field-label required">Email Address</label>
```

### Status / metadata
```tsx
<span className="type-caption">COMPLETED</span>   // 10px uppercase semibold
<span className="type-body-muted">2 hours ago</span>  // 12px muted
```

---

## Anti-Patterns

```tsx
// ❌ Arbitrary sizes
className="text-[15px] font-[550]"

// ❌ Tailwind weight + raw size combo
className="text-sm font-bold"   // sm=14px bold=700 → too heavy

// ❌ Hardcoded in style
style={{ fontSize: '13px', fontWeight: 600 }}

// ❌ text-muted-foreground for feature descriptions
className="text-xs text-muted-foreground"  // for "Allow AI to escalate..." type text

// ✅ Use named styles
className="type-body"
className="type-label"

// ✅ Opacity-based for descriptions of features/actions
className="text-xs text-foreground/70"

// ✅ Token-based for genuine metadata/labels
className="text-xs text-muted-foreground"   // captions, timestamps, hints
```

---

## Special Cases

### Tab labels
```css
/* inactive */ font-size: 14px; font-weight: 400; color: var(--text-secondary);
/* active   */ font-size: 14px; font-weight: 600; color: var(--text-accent);
```

### List item index/count
```css
font-size: 10px;    /* --font-xs / labelSmall */
font-weight: 600;
color: var(--icon-strong);
```

### Disabled state
```css
color: var(--text-disabled);   /* oklch(0.765 0.005 264) ≈ #bfbfbf */
```

### Error text (below form fields)
```css
font-size: 12px;   /* --font-s */
font-weight: 400;
color: var(--text-danger);
margin-top: 4px;
```
