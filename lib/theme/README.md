# Theme System Documentation

## Overview

This theme system is centralized and production-ready. All theme values are defined in `lib/theme/index.ts`, making it easy to change the entire application's appearance from one place.

The theme is based on the **AvailabilityModal** design system:
- **Accent Color**: `#2655A3` (hsl(217, 62%, 39%))
- **Background**: White for light mode
- **Text**: Gray scale (900, 700, 600)
- **Borders**: Gray 200, 300
- **Shadows**: shadow-xl, shadow-sm
- **Border Radius**: rounded-lg (0.5rem), rounded-md (0.375rem), rounded-full

## Quick Start

### Using Theme Colors in Components

#### Method 1: Tailwind CSS Classes (Recommended)

```tsx
// Use Tailwind classes that automatically adapt to theme
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Primary Button
  </button>
</div>
```

#### Method 2: CSS Variables

```tsx
// Use CSS variables directly
<div style={{ backgroundColor: 'hsl(var(--background))' }}>
  <button style={{ backgroundColor: 'hsl(var(--primary))' }}>
    Primary Button
  </button>
</div>
```

#### Method 3: Theme Hook

```tsx
import { useTheme } from '@/hooks/use-theme'

function MyComponent() {
  const { accentColor, primaryColor, isDark } = useTheme()
  
  return (
    <div style={{ backgroundColor: accentColor }}>
      Current theme: {isDark ? 'Dark' : 'Light'}
    </div>
  )
}
```

### Theme Toggle Component

Add a theme toggle button anywhere in your app:

```tsx
import { ThemeToggle } from '@/components/shared'

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
```

## Changing the Theme

### To Change Colors Globally

1. Open `lib/theme/index.ts`
2. Modify the values in `lightTheme` or `darkTheme` objects
3. The changes will automatically apply across the entire application

**Example: Change accent color**

```typescript
// In lib/theme/index.ts
const ACCENT_COLOR_HSL = '217 62% 39%' // Change this value

// Or modify directly:
export const lightTheme = {
  primary: '220 70% 50%', // New blue color
  accent: '220 70% 50%',
  // ... rest of theme
}
```

### To Add New Theme Tokens

1. Add the token to both `lightTheme` and `darkTheme` in `lib/theme/index.ts`
2. Add the CSS variable to `app/globals.css` in both `:root` and `.dark`
3. Add the token to Tailwind config if needed

## Available Theme Tokens

### Colors
- `background` - Main background color
- `foreground` - Main text color
- `card` - Card/surface background
- `cardForeground` - Card text color
- `popover` - Popover/dropdown background
- `popoverForeground` - Popover text color
- `primary` - Primary/accent color (#2655A3)
- `primaryForeground` - Text on primary
- `secondary` - Secondary color
- `secondaryForeground` - Text on secondary
- `accent` - Accent color (same as primary)
- `accentForeground` - Text on accent
- `muted` - Muted background
- `mutedForeground` - Muted text
- `destructive` - Error/danger color
- `destructiveForeground` - Text on destructive
- `border` - Border color
- `input` - Input border color
- `ring` - Focus ring color

### Other Tokens
- `radius` - Border radius (0.5rem)

## Tailwind CSS Classes

The theme integrates with Tailwind CSS. Use these classes:

### Background Colors
- `bg-background`
- `bg-card`
- `bg-primary`
- `bg-secondary`
- `bg-accent`
- `bg-muted`
- `bg-destructive`

### Text Colors
- `text-foreground`
- `text-primary`
- `text-secondary`
- `text-accent`
- `text-muted-foreground`
- `text-destructive`

### Border Colors
- `border-border`
- `border-primary`
- `border-accent`

### Border Radius
- `rounded-lg` (uses --radius)
- `rounded-md` (uses --radius - 2px)
- `rounded-sm` (uses --radius - 4px)

## Best Practices

1. **Always use theme tokens** - Don't hardcode colors
2. **Use Tailwind classes** - They automatically adapt to theme
3. **Test both themes** - Ensure your components work in light and dark mode
4. **Use semantic tokens** - Use `primary` instead of `accent` for primary actions
5. **Maintain contrast** - Ensure text is readable on backgrounds

## Examples

### Button Component

```tsx
<button className="bg-primary text-primary-foreground hover:opacity-90 rounded-lg px-4 py-2">
  Click Me
</button>
```

### Card Component

```tsx
<div className="bg-card border border-border rounded-lg shadow-xl p-6">
  <h2 className="text-card-foreground">Card Title</h2>
  <p className="text-muted-foreground">Card description</p>
</div>
```

### Modal Component

```tsx
<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
  <div className="bg-card border border-border rounded-lg shadow-xl p-6 max-w-md">
    {/* Modal content */}
  </div>
</div>
```

## Migration Guide

If you have existing components with hardcoded colors:

1. Replace hardcoded colors with theme tokens
2. Use Tailwind classes instead of inline styles where possible
3. Test in both light and dark modes
4. Update any color pickers or theme customization features

## Support

For questions or issues with the theme system, refer to:
- Theme configuration: `lib/theme/index.ts`
- CSS variables: `app/globals.css`
- Theme provider: `components/shared/theme-provider.tsx`

