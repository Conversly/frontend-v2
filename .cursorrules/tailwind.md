// Update globs depending on your framework
---
name: tailwind_v4
description: Comprehensive rules and guide for using Tailwind CSS v4 (CSS-first configuration with JS compatibility)
globs: ["**/*.{js,ts,jsx,tsx,mdx,css}"]
tags:
  - tailwind
  - css
---

# Tailwind CSS v4 (Cursor Guide)

## Overview

Tailwind CSS v4 introduces a **CSS-first configuration model** that moves theme and utility definitions directly into CSS via the `@theme` directive.  
Legacy JavaScript/TypeScript configurations remain **fully supported** and can be imported using `@config`.

> 💡 Cursor and Windsurf both support these updated directives and configuration patterns. You can mix CSS-based and JS-based configurations as needed.

---

## 🧩 Configuration

### CSS-first Configuration (New Default)

Configuration is now **done in CSS by default** instead of JavaScript or TypeScript.  
Use the `@theme` directive to define design tokens directly in your stylesheet.

```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 1920px;
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
````

### Legacy JS/TS Configuration (Still Supported)

Legacy-style Tailwind configuration using `tailwind.config.js` or `.ts` is **still supported**.
You can import it directly in CSS using the `@config` directive:

```css
@import "tailwindcss";
@config "../../tailwind.config.js";
```

Use this approach when editing existing projects or if your team still prefers JS configs.

> ✳️ **Best practice:** For new projects, define configuration via `@theme`.
> For existing ones, keep editing configuration where it already lives — JS or CSS.

---

## 🪶 Import Syntax Changes

* **Old (v3):**

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

* **New (v4):**

  ```css
  @import "tailwindcss";
  ```

No need for `postcss-import` or `autoprefixer` anymore — Tailwind v4 handles these internally.

---

## 📦 Package Changes

| Purpose        | Old Package        | New Package            |
| -------------- | ------------------ | ---------------------- |
| PostCSS Plugin | `tailwindcss`      | `@tailwindcss/postcss` |
| CLI            | `tailwindcss`      | `@tailwindcss/cli`     |
| Vite Plugin    | `tailwindcss/vite` | `@tailwindcss/vite`    |

---

## 🎨 Theme Configuration

All design tokens are now exposed as **CSS variables**.

### Example Namespaces

| Category   | Example Variable   | Utility Example |
| ---------- | ------------------ | --------------- |
| Color      | `--color-blue-500` | `bg-blue-500`   |
| Font       | `--font-sans`      | `font-sans`     |
| Text Size  | `--text-xl`        | `text-xl`       |
| Spacing    | `--spacing-4`      | `p-4`           |
| Radius     | `--radius-md`      | `rounded-md`    |
| Shadow     | `--shadow-md`      | `shadow-md`     |
| Breakpoint | `--breakpoint-lg`  | `lg:*`          |

Access them in CSS using:

```css
color: var(--color-blue-500);
```

### Dynamic Spacing Scale

Spacing utilities automatically scale from a base variable:

```css
--spacing: 0.25rem;
```

You can use any numeric spacing value (e.g., `mt-21`) without explicit configuration.

---

## 🧱 New Features

### Container Queries (Built-in)

* Use container queries without plugins:

  ```css
  @container;
  ```
* Variants: `@sm:`, `@md:`, `@max-lg:`
* Combine like `@min-md:@max-xl:hidden`.

### 3D Transforms

Utilities now include 3D transform support:

```
rotate-x-*, rotate-y-*, scale-z-*, translate-z-*, perspective-*
```

### Gradient Enhancements

* Linear gradient angles: `bg-linear-45`
* Interpolation modes: `bg-linear-to-r/oklch`
* Conic and radial gradients supported natively.

### Shadow Enhancements

Combine inset and outer shadows:

```css
shadow-md inset-shadow-sm
```

### New CSS Utilities

* `field-sizing-content`
* `scheme-light` / `scheme-dark`
* `font-stretch-*` for variable fonts

---

## 🧩 New Variants

Tailwind v4 introduces **composable and expressive variants**:

| Variant     | Example              | Description                             |
| ----------- | -------------------- | --------------------------------------- |
| `starting:` | `starting:opacity-0` | Transition start styles                 |
| `not-*:`    | `not-hover:`         | Negate pseudo-classes                   |
| `nth-*:`    | `nth-3:bg-red-500`   | Target specific nth children            |
| `in-*:`     | `in-hover:`          | Like `group-*`, no `group` class needed |
| `open:`     | `open:bg-green-500`  | Works with popovers                     |
| `**:`       | `**:text-blue-500`   | Targets all descendants                 |

Example chaining:

```html
<div class="group-has-data-active:opacity-100"></div>
```

---

## 🛠️ Custom Extensions

### Custom Utilities

```css
@utility tab-4 {
  tab-size: 4;
}
```

### Custom Variants

```css
@variant pointer-coarse (@media (pointer: coarse));
@variant theme-midnight (&:where([data-theme="midnight"] *));
```

### Plugins

Install and reference plugins directly:

```css
@plugin "@tailwindcss/typography";
```

> ⚠️ Some complex plugins may still require v3-style JS configuration. Cursor can fall back automatically when needed.

---

## ⚠️ Breaking Changes

| Feature          | Old               | New              |
| ---------------- | ----------------- | ---------------- |
| `bg-opacity-*`   | `bg-opacity-50`   | `bg-black/50`    |
| `text-opacity-*` | `text-opacity-70` | `text-black/70`  |
| `shadow-sm`      | →                 | `shadow-xs`      |
| `blur-sm`        | →                 | `blur-xs`        |
| `rounded-sm`     | →                 | `rounded-xs`     |
| `outline-none`   | →                 | `outline-hidden` |

Other defaults:

* Border color → `currentColor`
* Default ring width → `1px`
* Placeholder opacity → `50%`
* Hover styles apply only on hover-capable devices

---

## 🧭 Advanced Configuration

### Prefixing

```css
@import "tailwindcss" prefix(tw);
```

Results in: `tw:flex`, `tw:bg-red-500`, `tw:hover:bg-red-600`

### Source Detection

Automatic by default.
You can add or disable sources:

```css
@source "../node_modules/@my-company/ui-lib";
@import "tailwindcss" source(none);
```

### Dark Mode

```css
@variant dark (&:where(.dark, .dark *));
```

### Container Utility

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

---

## 🧩 Using `@apply` in Vue/Svelte

```html
<style>
  @import "tailwindcss";
  @import "tailwindcss/theme" theme(reference);

  h1 {
    @apply font-bold text-2xl text-red-500;
  }
</style>
```

---

## 🧠 Editor Notes

* Works in **Cursor**, **Windsurf**, and other compatible AI editors.
* Cursor understands the new directives:

  * `@theme`, `@config`, `@plugin`, `@utility`, `@variant`
* You can install this ruleset into Cursor via:

  ```bash
  npx ctxs add "https://ctxs.ai/r/gh/danhollick/tailwind-css-v4.json"
  ```

  or plaintext:

  ```bash
  curl https://ctxs.ai/gh/danhollick/tailwind-css-v4.txt
  ```

---

## ✅ Summary

Tailwind v4 modernizes the workflow:

* Configuration moves to **CSS-first** (with full JS compatibility)
* Built-in **container queries**, **3D transforms**, and **native variants**
* Simplified plugin system using `@plugin`
* Cleaner defaults and real CSS layers

This ruleset ensures Cursor (and compatible editors) apply Tailwind v4 syntax correctly while maintaining backward compatibility for mixed JS/CSS setups.

---

**Authors:**

* @danhollick
* @brandonmcconnell
* @danfascia
* @martinklepsch

*Last updated: Nov 2025*

```

---

Would you like me to also generate a **shorter version** (for Cursor sidebar rule display, ~⅓ the length, highlighting only syntax and directives)? It’s useful if you want to keep the `.mdc` lightweight and link the full doc elsewhere.
```
Here’s a **final, polished `tailwind-css-v4.mdc` file** for Cursor — updated based on the full Tailwind v4 guide you shared **and the comments by @brandonmcconnell, @danhollick, and others**.

This version improves clarity, adds plugin notes, references both CSS-first and JS legacy configuration, and mentions editor compatibility (Cursor, Windsurf, etc.).
It’s production-ready for `.mdc` use with Cursor.

---

````md
// Update globs depending on your framework
---
name: tailwind_v4
description: Comprehensive rules and guide for using Tailwind CSS v4 (CSS-first configuration with JS compatibility)
globs: ["**/*.{js,ts,jsx,tsx,mdx,css}"]
tags:
  - tailwind
  - css
---

# Tailwind CSS v4 (Cursor Guide)

## Overview

Tailwind CSS v4 introduces a **CSS-first configuration model** that moves theme and utility definitions directly into CSS via the `@theme` directive.  
Legacy JavaScript/TypeScript configurations remain **fully supported** and can be imported using `@config`.

> 💡 Cursor and Windsurf both support these updated directives and configuration patterns. You can mix CSS-based and JS-based configurations as needed.

---

## 🧩 Configuration

### CSS-first Configuration (New Default)

Configuration is now **done in CSS by default** instead of JavaScript or TypeScript.  
Use the `@theme` directive to define design tokens directly in your stylesheet.

```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 1920px;
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
````

### Legacy JS/TS Configuration (Still Supported)

Legacy-style Tailwind configuration using `tailwind.config.js` or `.ts` is **still supported**.
You can import it directly in CSS using the `@config` directive:

```css
@import "tailwindcss";
@config "../../tailwind.config.js";
```

Use this approach when editing existing projects or if your team still prefers JS configs.

> ✳️ **Best practice:** For new projects, define configuration via `@theme`.
> For existing ones, keep editing configuration where it already lives — JS or CSS.

---

## 🪶 Import Syntax Changes

* **Old (v3):**

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

* **New (v4):**

  ```css
  @import "tailwindcss";
  ```

No need for `postcss-import` or `autoprefixer` anymore — Tailwind v4 handles these internally.

---

## 📦 Package Changes

| Purpose        | Old Package        | New Package            |
| -------------- | ------------------ | ---------------------- |
| PostCSS Plugin | `tailwindcss`      | `@tailwindcss/postcss` |
| CLI            | `tailwindcss`      | `@tailwindcss/cli`     |
| Vite Plugin    | `tailwindcss/vite` | `@tailwindcss/vite`    |

---

## 🎨 Theme Configuration

All design tokens are now exposed as **CSS variables**.

### Example Namespaces

| Category   | Example Variable   | Utility Example |
| ---------- | ------------------ | --------------- |
| Color      | `--color-blue-500` | `bg-blue-500`   |
| Font       | `--font-sans`      | `font-sans`     |
| Text Size  | `--text-xl`        | `text-xl`       |
| Spacing    | `--spacing-4`      | `p-4`           |
| Radius     | `--radius-md`      | `rounded-md`    |
| Shadow     | `--shadow-md`      | `shadow-md`     |
| Breakpoint | `--breakpoint-lg`  | `lg:*`          |

Access them in CSS using:

```css
color: var(--color-blue-500);
```

### Dynamic Spacing Scale

Spacing utilities automatically scale from a base variable:

```css
--spacing: 0.25rem;
```

You can use any numeric spacing value (e.g., `mt-21`) without explicit configuration.

---

## 🧱 New Features

### Container Queries (Built-in)

* Use container queries without plugins:

  ```css
  @container;
  ```
* Variants: `@sm:`, `@md:`, `@max-lg:`
* Combine like `@min-md:@max-xl:hidden`.

### 3D Transforms

Utilities now include 3D transform support:

```
rotate-x-*, rotate-y-*, scale-z-*, translate-z-*, perspective-*
```

### Gradient Enhancements

* Linear gradient angles: `bg-linear-45`
* Interpolation modes: `bg-linear-to-r/oklch`
* Conic and radial gradients supported natively.

### Shadow Enhancements

Combine inset and outer shadows:

```css
shadow-md inset-shadow-sm
```

### New CSS Utilities

* `field-sizing-content`
* `scheme-light` / `scheme-dark`
* `font-stretch-*` for variable fonts

---

## 🧩 New Variants

Tailwind v4 introduces **composable and expressive variants**:

| Variant     | Example              | Description                             |
| ----------- | -------------------- | --------------------------------------- |
| `starting:` | `starting:opacity-0` | Transition start styles                 |
| `not-*:`    | `not-hover:`         | Negate pseudo-classes                   |
| `nth-*:`    | `nth-3:bg-red-500`   | Target specific nth children            |
| `in-*:`     | `in-hover:`          | Like `group-*`, no `group` class needed |
| `open:`     | `open:bg-green-500`  | Works with popovers                     |
| `**:`       | `**:text-blue-500`   | Targets all descendants                 |

Example chaining:

```html
<div class="group-has-data-active:opacity-100"></div>
```

---

## 🛠️ Custom Extensions

### Custom Utilities

```css
@utility tab-4 {
  tab-size: 4;
}
```

### Custom Variants

```css
@variant pointer-coarse (@media (pointer: coarse));
@variant theme-midnight (&:where([data-theme="midnight"] *));
```

### Plugins

Install and reference plugins directly:

```css
@plugin "@tailwindcss/typography";
```

> ⚠️ Some complex plugins may still require v3-style JS configuration. Cursor can fall back automatically when needed.

---

## ⚠️ Breaking Changes

| Feature          | Old               | New              |
| ---------------- | ----------------- | ---------------- |
| `bg-opacity-*`   | `bg-opacity-50`   | `bg-black/50`    |
| `text-opacity-*` | `text-opacity-70` | `text-black/70`  |
| `shadow-sm`      | →                 | `shadow-xs`      |
| `blur-sm`        | →                 | `blur-xs`        |
| `rounded-sm`     | →                 | `rounded-xs`     |
| `outline-none`   | →                 | `outline-hidden` |

Other defaults:

* Border color → `currentColor`
* Default ring width → `1px`
* Placeholder opacity → `50%`
* Hover styles apply only on hover-capable devices

---

## 🧭 Advanced Configuration

### Prefixing

```css
@import "tailwindcss" prefix(tw);
```

Results in: `tw:flex`, `tw:bg-red-500`, `tw:hover:bg-red-600`

### Source Detection

Automatic by default.
You can add or disable sources:

```css
@source "../node_modules/@my-company/ui-lib";
@import "tailwindcss" source(none);
```

### Dark Mode

```css
@variant dark (&:where(.dark, .dark *));
```

### Container Utility

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

---

## 🧩 Using `@apply` in Vue/Svelte

```html
<style>
  @import "tailwindcss";
  @import "tailwindcss/theme" theme(reference);

  h1 {
    @apply font-bold text-2xl text-red-500;
  }
</style>
```

---

## 🧠 Editor Notes

* Works in **Cursor**, **Windsurf**, and other compatible AI editors.
* Cursor understands the new directives:

  * `@theme`, `@config`, `@plugin`, `@utility`, `@variant`
* You can install this ruleset into Cursor via:

  ```bash
  npx ctxs add "https://ctxs.ai/r/gh/danhollick/tailwind-css-v4.json"
  ```

  or plaintext:

  ```bash
  curl https://ctxs.ai/gh/danhollick/tailwind-css-v4.txt
  ```

---