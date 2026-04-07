# Component Patterns — Mindtickle-Aligned

## Core Rule
> Never build ad-hoc. Every component type has ONE correct pattern.
> If it's not here, add it here before building.

---

## Buttons

### 8 Variants (Mindtickle's full set)

| Variant      | Tailwind class / CVA variant | Use Case                         |
|--------------|------------------------------|----------------------------------|
| Primary      | `variant="default"`          | Main CTA — one per screen        |
| Secondary    | `variant="outline"`          | Secondary actions                |
| Tertiary     | `variant="ghost"`            | Subtle / tertiary actions        |
| Text/Link    | `variant="link"`             | Inline text actions              |
| Danger       | `variant="destructive"`      | Delete, remove, irreversible     |
| Success      | (add to CVA) `variant="success"` | Confirm, submit positive     |
| Icon-only    | `variant="ghost" size="icon"`| Icon buttons in toolbars         |
| Ghost+Border | `variant="outline" size="icon"` | Icon with visible border      |

### Sizes
```
size="lg"       h-11 (44px)   Large — prominent CTA
size="default"  h-10 (40px)   Default
size="sm"       h-8  (32px)   Compact — inline, toolbar
size="icon"     w-9 h-9       Square icon button
size="icon-sm"  w-8 h-8       Small icon button
```

### Border Radius — CRITICAL FIX NEEDED
Current `button.tsx` uses `rounded-xl` (hardcoded 16px). 
**Must change to `rounded-[var(--radius-input)]` (4px) for Mindtickle look.**

```tsx
// button.tsx — find and replace:
// FROM: "rounded-xl text-[13px]"
// TO:   "rounded-[var(--radius-input)] text-[13px]"
```

### Spacing between buttons
```tsx
<div className="flex items-center gap-2">    // 8px gap — standard
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

---

## Cards

### Standard Card
```tsx
// Card component already uses dashboard-panel class
// Padding: px-5 py-5 for header, px-5 pb-5 for content

<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>         // 16px, weight 500
    <CardDescription>Subtitle text</CardDescription>  // 12px, muted
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

### Settings Card (no shadow, top-right radius)
```tsx
<div className="dashboard-panel-flat">
  <div className="px-5 py-4 border-b border-[var(--border-secondary)]">
    <h4 className="type-card-title">Setting Group</h4>
  </div>
  {/* grid rows with border-bottom between them */}
  <div className="px-5 py-4 border-b border-[var(--border-secondary)]">
    Row 1
  </div>
  <div className="px-5 py-4">
    Row 2 (no border on last row)
  </div>
</div>
```

### KPI / Stat Card
```tsx
<Card className="dashboard-kpi-card">
  <CardContent className="pt-5">
    <p className="type-label">Total Users</p>
    <p className="text-2xl font-medium mt-1">1,234</p>
    <p className="type-body-muted mt-1">↑ 12% from last month</p>
  </CardContent>
</Card>
```

---

## Inputs

### Text Input — standard form
```tsx
<div className="form-field">
  <label className="form-field-label">
    Email Address <span className="text-[var(--text-danger)]">*</span>
  </label>
  <Input placeholder="name@company.com" />
  {error && <p className="form-field-error">{error}</p>}
</div>
```

### Input sizing
```
Default input: height 32px, border 1px var(--border-default)
Border radius:  var(--radius-input) = 4px  ← change in input.tsx if needed
Focus ring:    2px solid var(--border-accent) = blue
Error state:   border-color var(--border-danger)
Disabled:      bg var(--bg-disabled), color var(--text-disabled)
```

### Search Input (pill shape)
```tsx
<div className="dashboard-search-shell">
  <SearchIcon className="text-[var(--icon-secondary)]" size={14} />
  <input
    className="border-0 bg-transparent outline-none text-sm w-full"
    placeholder="Search..."
  />
</div>
```

---

## Form Layout Patterns

### Standard form section
```tsx
<div className="form-section">
  <h4 className="form-section-title">Personal Information</h4>

  <div className="form-field">
    <label className="form-field-label required">Full Name</label>
    <Input />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="form-field">
      <label className="form-field-label">First Name</label>
      <Input />
    </div>
    <div className="form-field">
      <label className="form-field-label">Last Name</label>
      <Input />
    </div>
  </div>
</div>
```

### Form field gap rule
```
Label → Input gap:    6px  (gap-1.5)
Input → Error gap:    4px  (mt-1)
Field → Field gap:    16px (gap-4 in grid or space-y-4)
Section → Section gap: 24px (gap-6)
```

### Max width for form inputs
```tsx
// Standard content max-width in settings forms
<div className="max-w-[654px]">
  <Input />
</div>
```

---

## Tabs

### Standard Tabs
```tsx
<Tabs defaultValue="overview">
  <TabsList>           // sticky, height 55px, shadow-1
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="settings">...</TabsContent>
</Tabs>
```

### Tab visual rules (update tabs.tsx if needed)
```
Tab nav height:       55px
Tab indicator bar:    3px height, --primary color
Tab gap (spacing):    48px between tabs on wide layouts
Inactive tab:         14px, weight 400, --text-secondary
Active tab:           14px, weight 600, --text-accent
Nav shadow:           var(--shadow-1) — separates from content
Nav background:       var(--card) — white
```

---

## List Items

### Standard interactive list item
```tsx
<div
  className="dashboard-list-row"
  data-active={isActive}
>
  {/* Left: icon or index */}
  <span className="type-caption mr-3 w-5 text-right shrink-0">
    {index}
  </span>

  {/* Main content */}
  <div className="flex-1 min-w-0">
    <p className="type-body truncate">{title}</p>
    <p className="type-body-muted truncate">{subtitle}</p>
  </div>

  {/* Right: action icon (visible on hover) */}
  <button className="opacity-0 group-hover:opacity-100 ...">
    <MoreIcon />
  </button>
</div>
```

### List item states
```
Default:  bg white
Hover:    bg var(--surface-secondary)  ← --surface-tertiary is the fallback
Active:   bg var(--bg-accent-selected)
Selected: bg var(--bg-accent-subtle)
```

### List item sizing
```
min-height: 38px      (Mindtickle's baseline touch target)
padding:    8px 14px
font-size:  14px (--font-m) for primary text
            12px (--font-s) for sub-heading/meta
```

---

## Status Chips / Badges

```tsx
// Inline status badge
<span className="dashboard-status-chip dashboard-status-chip--success">
  Passed
</span>

// With dot indicator
<span className="dashboard-status-chip dashboard-status-chip--warning">
  <span className="w-1.5 h-1.5 rounded-full bg-current" />
  In Progress
</span>
```

### Sizing
```
Height:      20px
Padding:     0 8px
Font:        10px, weight 600, uppercase, tracking +0.04em
Border:      1px solid status-border
Border-radius: 999px (pill)
```

---

## Modals / Dialogs

```tsx
<Dialog>
  <DialogContent className="max-w-[520px]">
    {/* Header */}
    <div className="px-6 py-4 border-b border-[var(--border-default)]">
      <h3 className="type-card-title">Dialog Title</h3>
    </div>
    {/* Body */}
    <div className="px-6 py-5">
      {children}
    </div>
    {/* Footer */}
    <div className="px-6 py-4 border-t border-[var(--border-default)]
                    flex items-center justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </DialogContent>
</Dialog>
```

### Modal sizing (from Mindtickle MODAL_SIZE)
```
Small:   max-w-[400px]
Medium:  max-w-[520px]
Large:   max-w-[720px]
XLarge:  max-w-[960px]
```

---

## Drawers / Side Panels

```tsx
<Sheet>
  <SheetContent side="right" className="w-[400px] p-0">
    {/* Header */}
    <div className="sticky-header">
      <h3 className="type-card-title">Panel Title</h3>
    </div>
    {/* Content */}
    <div className="p-6 overflow-y-auto">
      {content}
    </div>
    {/* Footer */}
    <div className="sticky-footer">
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  </SheetContent>
</Sheet>
```

---

## Page Header (sticky)

```tsx
<div className="sticky-header justify-between">
  <div className="flex flex-col gap-1">
    <nav className="breadcrumb">
      <a>Home</a>
      <span>/</span>
      <span className="breadcrumb-current">Settings</span>
    </nav>
    <h1 className="page-title">Settings</h1>
  </div>
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm">Export</Button>
    <Button size="sm">Save Changes</Button>
  </div>
</div>
```

---

## Alert Banners

```tsx
// Inline alert — left border style
<div className="alert-info p-3 rounded-[var(--radius-input)]">
  <p className="type-body">Informational message here.</p>
</div>

<div className="alert-warning ...">...</div>
<div className="alert-danger ...">...</div>
<div className="alert-success ...">...</div>
```

---

## Sidebar Navigation

```tsx
<nav className="flex flex-col gap-0.5 p-2">
  <a
    href="/dashboard"
    className={cn("sidebar-item", isActive && "active")}
    data-active={isActive}
  >
    <HomeIcon size={16} />
    Dashboard
  </a>
  <a href="/users" className="sidebar-item">
    <UsersIcon size={16} />
    Users
  </a>
</nav>
```

### Sidebar item rules
```
Height:       36px
Padding:      0 12px
Icon size:    16px
Font:         14px, weight 500
Border-radius: var(--radius-input) = 4px
Gap:          0.5rem (2px) between items
```

---

## Dividers

```tsx
// Horizontal
<div className="divider-h my-4" />

// Vertical (inline)
<div className="divider-v mx-2" />

// Section divider (inside card grid)
<div className="border-b border-[var(--border-secondary)]" />
```

---

## Tables

### Standard table shell
```tsx
<div className="dashboard-table-shell">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id}>
          <TableCell className="type-body">{row.name}</TableCell>
          <TableCell>
            <span className={`dashboard-status-chip dashboard-status-chip--${row.status}`}>
              {row.status}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
```

---

## Empty States

```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="w-12 h-12 rounded-[var(--radius-card)] bg-[var(--surface-secondary)]
                  flex items-center justify-center mb-4">
    <FileIcon size={20} className="text-[var(--icon-secondary)]" />
  </div>
  <h4 className="type-card-title">No results found</h4>
  <p className="type-body-muted mt-1 max-w-[280px]">
    Try adjusting your search or filters.
  </p>
  <Button size="sm" className="mt-4">Add Item</Button>
</div>
```

---

## Tooltips

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon-sm">
      <InfoIcon size={14} />
    </Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p className="type-body-muted">Helpful description</p>
  </TooltipContent>
</Tooltip>
```
