# Typography System

## Font Family

**Primary Font**: Inter
- Fallback: `'Inter', 'Helvetica Neue', 'Arial', sans-serif`
- Loaded via Next.js Google Fonts
- CSS Variable: `--font-inter`

## Typography Hierarchy

Based on the AvailabilityModal design system:

| Element | Size | Weight | Color | Tailwind Classes | Purpose |
|---------|------|--------|-------|-----------------|---------|
| **h2** (Primary Title) | `text-lg` (18px) | `font-semibold` (600) | `text-gray-900` | `text-lg font-semibold text-gray-900` | Primary headings |
| **p** (Body Text) | `text-sm` (14px) | `font-normal` (400) | `text-gray-700` | `text-sm text-gray-700` | Body messages |
| **small** (Subtext) | `text-xs` (12px) | `font-normal` (400) | `text-gray-600` | `text-xs text-gray-600` | Secondary info |
| **button** | `text-sm` (14px) | `font-medium` (500) | Theme contrast | `text-sm font-medium` | Action buttons |

## Usage Examples

### Headings (h2)
```tsx
<h2 className="text-lg font-semibold text-gray-900">
  Primary Title
</h2>
```

### Body Text
```tsx
<p className="text-sm text-gray-700">
  Body message content goes here.
</p>
```

### Subtext/Secondary Info
```tsx
<small className="text-xs text-gray-600">
  Secondary information or notes
</small>
```

### Buttons
```tsx
<button className="text-sm font-medium bg-primary text-primary-foreground">
  Click Me
</button>
```

## Theme Integration

The typography system is integrated with the theme system:

- **Light Mode**: Uses `text-gray-900`, `text-gray-700`, `text-gray-600`
- **Dark Mode**: Automatically adapts via theme tokens
- **Colors**: Can use theme tokens like `text-foreground`, `text-muted-foreground`

## Font Weights Available

- `font-normal` (400) - Body text, subtext
- `font-medium` (500) - Buttons
- `font-semibold` (600) - Headings
- `font-bold` (700) - Strong emphasis

## Font Sizes Available

- `text-xs` (12px) - Subtext/secondary info
- `text-sm` (14px) - Body text, buttons
- `text-base` (16px) - Base body
- `text-lg` (18px) - h2 Primary title
- `text-xl` (20px)
- `text-2xl` (24px)
- `text-3xl` (30px)

## Configuration Files

- **Font Loading**: `app/layout.tsx`
- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`
- **Theme Tokens**: `lib/theme/index.ts`

## Best Practices

1. **Use semantic HTML**: Use `<h2>`, `<p>`, `<small>` tags appropriately
2. **Consistent sizing**: Stick to the defined hierarchy
3. **Theme-aware**: Use theme tokens for colors when possible
4. **Accessibility**: Ensure sufficient contrast ratios

