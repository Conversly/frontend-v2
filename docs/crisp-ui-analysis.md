# Crisp UI Analysis

This document translates Crisp's current landing page and pricing page into a reusable, implementation-friendly UI system for Conversly.

Primary reference inputs:

- Live pages: `https://crisp.chat/en/` and `https://crisp.chat/en/pricing/`
- Local copied stylesheet: [app/crisp/landing-page.css](/Users/macbookpro/Documents/Conversly/escalation/client_v2/app/crisp/landing-page.css)

This is intentionally **Crisp-inspired**, not a literal clone. Reuse the structural logic, spacing discipline, surface treatment, and component behavior. Do not reuse their brand marks, screenshots, videos, illustrations, or exact copy.

## 1. Core visual read

Crisp's UI is built on five repeatable ideas:

1. **Soft enterprise polish**
   Every surface is rounded, bright, lightly outlined, and slightly glossy or blurred.
2. **High trust through clarity**
   Copy is short, layouts are orderly, and major choices are reduced to a few strong CTAs.
3. **Product-first storytelling**
   They explain the product through framed screenshots, lightweight video previews, tabbed showcase panels, and proof blocks instead of decorative hero art.
4. **One accent, many neutrals**
   Blue does most of the heavy lifting. Purple, green, orange, and teal exist as secondary state colors.
5. **Rounded geometry everywhere**
   Buttons, pills, tabs, cards, pricing boxes, FAQ shells, and footer containers all use soft radii with consistent increments.

## 2. Font system

### Primary font families

- Body/UI sans: `Crisp Aeonik Pro`
- Display/title font: `Crisp Inter`

### Practical imitation rule

If you do not have those licensed fonts, use this fallback intent:

- Display/headlines: a clean, assertive grotesk with slightly tighter proportions
- Body/UI: a softer modern sans with friendly rhythm

Suggested substitute direction:

- Headlines: `Inter`, `Suisse Intl`, `General Sans`, or `Plus Jakarta Sans`
- Body/UI: `Inter`, `Manrope`, or `Aeonik` if available

### Type scale extracted from the site

| Role | Approx size | Notes |
|---|---:|---|
| Hero heading | `48px` | tight, bold, centered |
| Hero heading mobile | `38px` | reduced but still prominent |
| Hero subtitle | `18px / 26px` | controlled width, centered |
| Section display title | `38px` to `46px` | used for showcase/pricing headings |
| Feature section title | `32px` to `46px` | depends on hierarchy |
| Card title | `16px` to `20px` | semibold/bold |
| Body | `16px` | default site body |
| Muted UI copy | `13px` to `14.5px` | labels, explainers, meta |
| Small pill/badge text | `12px` | tight utility copy |

### Letter spacing and line-height behavior

- Large headings use slightly negative tracking.
- UI/body text generally keeps neutral tracking.
- Small labels use tiny positive tracking.
- Headings are compact, not airy.

## 3. Color system

### Primary colors seen repeatedly

| Token intent | Value |
|---|---|
| Ink / heading | `#030d26` |
| Strong blue CTA | `#1972f5` |
| Blue hover border | `#1d58ac` |
| Purple accent | `#955cf4` |
| Green accent | `#5fac43` |
| Orange accent | `#ff6f3e` |
| Teal accent | `#20808d` |
| Background white | `#ffffff` |
| Soft page neutral | `#fcfcfd` |
| Border gray | `#eaecf5` |
| Secondary border | `#dcdfea` |
| Muted text | `#667085` |
| Deeper muted text | `#404968` |
| Mid muted text | `#5d6b98` |

### Color usage rules

- Use blue for the primary action, selected state, and strong emphasis.
- Use purple only for premium or special plan emphasis.
- Use green, orange, and teal as semantic support colors, not as layout anchors.
- Keep most layouts white or near-white.
- Use light tinted fills for special states instead of saturated solid blocks.

## 4. Spacing system

### Global wrappers

Extracted from Crisp's wrappers:

- Regular container desktop: `max-width: 1360px`
- Wide container desktop: `max-width: 1800px`
- Desktop side gutters: roughly `128px`
- Tablet gutters: `32px` to `64px`
- Mobile gutters: `16px` to `20px`

### Repeated spacing values

| Token intent | Value |
|---|---:|
| Tight gap | `8px` |
| Small gap | `12px` |
| Default gap | `16px` |
| Medium gap | `20px` |
| Section internal gap | `24px` |
| Larger content gap | `32px` |
| Feature split gap | `64px` |
| Hero top padding | `72px` to `110px` |
| Block separation | `44px` |
| Large section spacing | `80px` to `160px` |

### Spacing philosophy

- The site feels roomy because outer spacing is generous.
- Inner component spacing is controlled and consistent.
- They rarely stack dense UI without a container shell.

## 5. Radius system

| Use | Radius |
|---|---:|
| Micro tag | `6px` |
| Small button | `12px` |
| Medium button | `14px` |
| Large button | `16px` |
| Rounded CTA button | `30px` to `40px` |
| Screenshot frame | `16px` to `22px` |
| Feature card | `24px` |
| Pill | `32px` or full round |
| Large footer / giant cards | `32px` to `46px` |

Rule: every larger container gets a larger radius. They do not flatten big surfaces.

## 6. Shadow, border, and blur language

### Border style

- Thin, low-contrast borders
- Usually `1px`
- Border color sits in the `#eaecf5` / `#dcdfea` family

### Shadow style

- Light, diffused
- Often layered
- Used to separate white surfaces from white backgrounds

### Blur usage

- Sticky/floating header uses blur plus translucent white
- Pills and ghost containers use blur to create a "frosted" effect
- Screenshots often sit in translucent framed shells

### Surface recipe

```css
background: rgba(255, 255, 255, 0.9);
border: 1px solid rgba(220, 223, 234, 0.7);
backdrop-filter: blur(8px);
box-shadow: 0 1px 2px rgba(42, 59, 81, 0.12);
```

## 7. Component teardown

### 7.1 Header

Traits:

- Fixed top bar
- Translucent white when floating
- Rounded menu hit areas
- Small search capsule
- Primary CTA on the right

Specs:

- Header height: `68px`
- Nav links: `14px`
- Link padding: about `10px 13px`
- Link hover: soft gray fill, no loud movement
- Search input shell: small blur card with border and tiny hotkey chip

### 7.2 Hero

Traits:

- Small announcement pill above headline
- Strong headline with one emphasized word
- Benefit pills under headline
- One dominant CTA block
- Large product screenshot in a soft framed shell
- Subtle textured/gradient background behind the hero

Specs:

- Headline centered inside a constrained wrapper
- Benefit pills use icon + 2-line copy
- CTA includes a small explainer under it
- Screenshot uses `22px` top corners, heavy blur shell, and bottom fade mask

### 7.3 Buttons

Sizes extracted:

- Extra small: `4px 8px`, `8px` radius
- Small: `6px 18px`, `12px` radius
- Medium: `10px 20px`, `14px` radius
- Large: `12px 22px`, `16px` radius
- Roundish variants: `20px`, `30px`, `40px`

Button styles:

- Primary blue gradient button
- Dark/black gradient button
- White ghost/secondary button
- Premium purple button

Behavior:

- Fast transitions
- Tiny `translateY(1px)` on press
- Border and fill shift on hover, never dramatic scale

### 7.4 Pills and badges

Pill types:

- Announcement pill
- Benefit pill
- Plan badge
- Tiny color tag

Shared characteristics:

- High radius or full round
- White/translucent shell
- Small shadow
- Tiny colored icon plate or badge insert

### 7.5 Tabs / showcase switchers

The showcase section uses card-like tabs rather than underlined navigation.

Traits:

- Tabs inside a bordered container
- Each tab has icon + title + tiny explanation
- Active tab gets subtle background fill plus a bottom indicator
- Content below swaps image/video preview

Key values:

- Tab shell radius: `10px`
- Tab icon tile: `46px`
- Tab title: `16px`
- Tab helper text: `13.5px`

### 7.6 Cards

Card families used on the site:

- Feature cards
- Testimonial cards
- Video testimonial cards
- Pricing cards
- Footer CTA cards

Common card recipe:

- White or near-white background
- Very light border
- Rounded corners
- Subtle hover shift in background/shadow only

Recommended Crisp-inspired variants:

1. `feature-card`
   - Radius: `24px`
   - Padding: `24px` to `32px`
   - Border: `1px solid #eaecf5`
2. `testimonial-card`
   - Radius: `12px`
   - Padding: `20px` to `24px`
3. `pricing-card`
   - Radius: `16px`
   - Padding: `24px 26px`
   - Shadow: deeper than standard card
4. `media-frame-card`
   - Radius: `16px` to `22px`
   - Used for screenshots/videos only

### 7.7 Pricing cards

Current plan structure from the live page:

| Plan | Price | Seats |
|---|---:|---:|
| Free | Free forever | 2 |
| Mini | `$45` / workspace / month | 4 |
| Essentials | `$95` / workspace / month | 10 |
| Plus | `$295` / workspace / month | 20+ |

Visual behavior:

- Four cards in a clean row
- One featured premium card
- Featured card uses purple emphasis and stronger glow/border
- Every card has: title, description, price, CTA, divider, highlighted core feature, seat count, AI credits, benefits list

Design lesson:

- Pricing is readable because each card follows the exact same anatomy.
- Differentiation comes from accent color and emphasis tier, not from changing layout structure.

### 7.8 FAQ

Traits:

- Large illustrated container
- Left column: title + support CTA + illustration
- Right column: accordion list
- Questions use clear blue text and plus icons
- Borders are simple horizontal dividers

Useful pattern:

- Put FAQ inside a tinted container, not as loose content.
- Keep question list plain to offset the richer sections above it.

### 7.9 Footer CTA + footer

Footer strategy:

- Big decorative CTA before the true footer
- Footer itself is another softened shell
- Decorative imagery stays low-contrast
- Link groups are evenly spaced, very legible, and not over-designed

## 8. Media placement rules

This is one of the most important parts of the Crisp look.

### Images and screenshots

- Almost never float loose on the page
- Always framed inside a card, ghost shell, colored container, or device-like wrapper
- Often use a soft mask or fade near the edges
- Corners are always rounded

### Videos

- Usually treated as product previews, not cinematic heroes
- Video thumbnails use soft poster frames
- Play affordances are obvious but compact
- Video containers preserve aspect ratio and never feel oversized for the copy beside them

### Illustrations and graphics

- Used to soften transitions or support FAQ/CTA sections
- Placed asymmetrically near corners or edges
- Usually sit behind or beside real product UI, not instead of it

### Logos and trust proof

- Placed in horizontal strips
- Same visual weight
- Neutral presentation
- No noisy brand colors competing with the product story

## 9. Crisp-inspired starter tokens

Use this as a starting layer for implementation:

```css
:root {
  --crisp-ink: #030d26;
  --crisp-text: #242f47;
  --crisp-text-muted: #5d6b98;
  --crisp-text-soft: #667085;

  --crisp-bg: #ffffff;
  --crisp-bg-soft: #fcfcfd;
  --crisp-bg-tint: #f8f8fc;

  --crisp-border: #eaecf5;
  --crisp-border-strong: #dcdfea;

  --crisp-blue: #1972f5;
  --crisp-blue-hover: #1d58ac;
  --crisp-purple: #955cf4;
  --crisp-green: #5fac43;
  --crisp-orange: #ff6f3e;
  --crisp-teal: #20808d;

  --crisp-radius-tag: 6px;
  --crisp-radius-button-sm: 12px;
  --crisp-radius-button-md: 14px;
  --crisp-radius-button-lg: 16px;
  --crisp-radius-card: 24px;
  --crisp-radius-frame: 16px;
  --crisp-radius-pill: 32px;
  --crisp-radius-shell: 40px;

  --crisp-space-1: 8px;
  --crisp-space-2: 12px;
  --crisp-space-3: 16px;
  --crisp-space-4: 20px;
  --crisp-space-5: 24px;
  --crisp-space-6: 32px;
  --crisp-space-7: 44px;
  --crisp-space-8: 64px;
  --crisp-space-9: 96px;
  --crisp-space-10: 128px;

  --crisp-shadow-sm: 0 1px 2px rgba(42, 59, 81, 0.12);
  --crisp-shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  --crisp-shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.10);
}
```

## 10. Implementation rules for Conversly

- Keep the **structure** faithful: floating header, proof strip, showcase tabs, framed product media, tiered pricing, testimonial proof, illustrated FAQ, large CTA footer.
- Keep the **surface language** faithful: soft white cards, thin borders, rounded corners, light shadows, occasional blur.
- Adapt the **brand layer** for Conversly: your colors, copy, screenshots, icons, illustrations, and voice.
- Never place raw screenshots directly on white without a shell.
- Never overload a section with too many accent colors.
- Never use heavy dark blocks unless the section is intentionally special.

## 11. What to copy vs what to adapt

### Safe to copy conceptually

- rounded enterprise SaaS card language
- framed screenshot treatment
- tabbed showcase interaction
- pricing card anatomy
- FAQ split layout
- restrained trust-strip design

### Must adapt

- hero headline and promise
- screenshots, demo videos, and product diagrams
- brand accent palette
- iconography set
- illustrations and mascots
- testimonial visuals and review copy

