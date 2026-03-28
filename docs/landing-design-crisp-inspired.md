# Landing Design Guide

This guide gives the team a repeatable way to build landing pages with the same level of polish and conversion clarity as Crisp.

Use it for:

- homepage redesigns
- pricing and comparison pages
- feature landing pages
- product launch pages
- section-level reviews before shipping

Related reference: [docs/crisp-ui-analysis.md](/Users/macbookpro/Documents/Conversly/escalation/client_v2/docs/crisp-ui-analysis.md)

## 1. Design principles

### Principle 1: Show the product early

Do not make the hero purely conceptual. Within the first viewport, users should see:

- what the product is
- what outcome it creates
- what the UI looks like
- what action to take next

### Principle 2: Use one strong narrative per section

Every section should answer one question only:

- Why trust us?
- What does this feature do?
- How does this work?
- Which plan fits me?
- Why switch now?

Do not mix three stories into one container.

### Principle 3: Wrap every important thing in a surface

Important content should not float naked on the page. Wrap it in:

- a card
- a ghost shell
- a colored container
- a screenshot frame
- a pricing block

This is what creates the refined SaaS feeling.

### Principle 4: Keep visual hierarchy brutally obvious

Users should instantly understand:

- the page headline
- the primary CTA
- the current section heading
- the key proof signal
- the next action

If everything looks equally important, the design has failed.

### Principle 5: Be decorative only after being useful

Illustrations, textures, gradients, and motion are support actors. Product clarity always comes first.

## 2. Page blueprint

Follow this section order unless there is a strong reason not to.

### A. Optional announcement bar

Use for launches, new AI features, or campaign messaging.

Rules:

- single line
- dark or high-contrast background
- tiny supporting label
- one destination only

### B. Floating header

Structure:

- logo left
- nav center
- utility/search and CTA right

Rules:

- translucent white on scroll
- soft blur
- compact height
- nav items feel like tappable pills, not plain text links

### C. Hero

Required ingredients:

- eyebrow pill or announcement chip
- high-clarity headline
- short subheading
- 2 to 3 benefit pills max
- one primary CTA
- one secondary CTA if truly needed
- trust explainer under CTA
- framed screenshot or short video

Hero copy formula:

`Outcome + audience + mechanism`

Example structure:

- Headline: what changes for the customer
- Subtitle: how the product achieves it
- CTA: start trial / book demo / get started
- Explainer: free trial, no card, fast setup, etc.

### D. Trust strip

Use directly below the hero.

Include one of:

- customer logos
- short rating proof
- customer count
- known brands

Rules:

- keep logos neutral
- equalize heights
- avoid noisy badge colors here

### E. Interactive product showcase

This is the "prove it" section.

Recommended structure:

- section title + short subtitle
- row of tabs or category cards
- large framed preview area below
- preview changes by selected tab

Each tab should contain:

- icon
- short title
- tiny explanation

This lets the page explain multiple features without turning into a long wall of sections.

### F. Alternating feature sections

After the showcase, use 2 to 4 narrative feature sections.

Pattern:

- left copy, right media
- then reverse
- then normal again

Each section includes:

- tag/category
- strong title
- 1 short paragraph
- optional bullet list
- one CTA if needed
- framed image or video

Do not make every section identical. Vary the media container slightly while keeping the same design language.

### G. Pricing / plan choice

Rules:

- all pricing cards use the same anatomy
- one plan can be featured
- every card must answer:
  - who it is for
  - price
  - core included value
  - key differentiators
  - CTA

Do not over-decorate the whole pricing row. Highlight only one plan.

### H. Testimonials / proof section

Recommended mix:

- 1 video testimonial card
- 2 to 4 short review cards
- optional rating/review platform card

Rules:

- cards can vary in content type
- cards should not vary wildly in style
- use faces, logos, and company names to humanize the grid

### I. FAQ

Best layout:

- left: heading, supporting line, contact CTA, optional illustration
- right: accordion list

Why it works:

- the left side softens the section
- the right side stays fast and scannable

### J. Final CTA

Purpose:

- close the page with one clear next step

Include:

- short action-oriented headline
- primary CTA
- maybe secondary CTA
- optional badge/proof row

This section should feel warmer and more emotional than the pricing grid.

## 3. Component construction rules

### Buttons

- Primary buttons should feel dense and confident.
- Add subtle top-light gradients.
- Use icon arrows sparingly on primary actions.
- Press feedback should be tiny and tactile, not bouncy.

### Cards

- Feature cards: roomy, bright, `24px` radius, light borders
- Testimonial cards: smaller radius, tighter content
- Pricing cards: medium radius, more vertical rhythm, clearest internal structure
- Media cards: framed first, content second

### Tabs

- Think "selectable feature cards", not plain tabs
- Each tab must be useful at a glance
- Active state should rely on fill + accent + small indicator

### Pills and badges

- Use pills to summarize benefits or launch status
- Keep them short
- Never stack too many in one line

### Accordions

- Large readable question text
- simple dividers
- obvious open/closed icon
- answer text should feel calmer than the question

## 4. Media placement rules

### Screenshots

Always:

- frame them
- round them
- give them breathing room
- place them inside a parent shell

Never:

- drop them directly into the page without border/shadow
- let them bleed edge-to-edge unless the whole section is a visual takeover

### Product videos

Use short preview-style videos.

Rules:

- poster image first
- visible play control
- soft rounded frame
- keep video aspect ratio stable
- pair each video with nearby explanatory copy

### Illustrations

Use illustrations in support roles:

- FAQ
- CTA
- footer
- empty spaces around rich product sections

Avoid using illustrations as the primary proof of value.

### Logos

Logo strips should feel like trust evidence, not partner promotion.

Rules:

- normalize height
- reduce contrast if needed
- space evenly
- use many, not just three giant logos

## 5. Background strategy

Use layered background treatment, not flat color panels everywhere.

Allowed techniques:

- near-white tinted backgrounds
- soft blue atmospheric washes
- subtle grain
- faint grid texture
- light gradient overlays
- translucent white blur shells

Rules:

- major sections should feel separated without using harsh borders
- background detail should be noticeable only after a second look

## 6. Motion strategy

Use motion carefully and with purpose.

Recommended:

- staggered reveal for benefit pills
- tiny hover lift on pills/cards
- soft press-down on buttons
- fade/slide transition when showcase tabs switch
- subtle sticky header state change

Avoid:

- long float animations
- too many parallax effects
- dramatic scale effects on enterprise UI

## 7. Content density rules

### Good density

- one headline
- one paragraph
- one media block
- one CTA
- optional bullets

### Bad density

- headline + long paragraph + 9 bullets + 2 CTAs + 3 images + badges

If a section feels crowded, split it.

## 8. Copy and hierarchy rules

- Headlines should promise an outcome, not describe a menu.
- Supporting copy should explain the mechanism in one clean paragraph.
- Button text should be action-first: `Start free`, `Book a demo`, `Get your AI agent`.
- Tiny helper copy under the CTA should reduce anxiety: trial length, no card, setup time, pricing simplicity.

## 9. Team do / don't list

### Do

- use bright surfaces with soft borders
- give screenshots a proper frame
- keep blue as the main accent
- make the hero immediately understandable
- vary section rhythm while preserving the same design language
- highlight one plan, not all of them
- use proof repeatedly throughout the page

### Don't

- copy Crisp assets, copy, logos, or illustrations directly
- use too many bold accent colors on one screen
- place screenshots raw on white
- create giant dark sections without a reason
- build tabs that rely only on tiny text labels
- overload the hero with multiple competing CTAs
- make every card the same size if the content types differ

## 10. Reusable build checklist

Before shipping any landing page, confirm:

- The first screen shows product, value, and CTA clearly.
- There is a trust strip within the first two sections.
- Every important screenshot/video is framed.
- Feature sections alternate rhythm and avoid repetition fatigue.
- Primary CTA color is consistent across the page.
- Only one plan or offer is visually dominant.
- FAQ is easy to scan.
- Final CTA is simpler than the body of the page.

## 11. Crisp-inspired approval checklist

The page is ready when it feels:

- soft, not sterile
- premium, not flashy
- clear, not sparse
- product-led, not illustration-led
- modern, not trendy
- conversion-aware, not template-like

If the page feels generic, the likely fixes are:

- strengthen the hero headline
- improve screenshot framing
- reduce accent-color noise
- give sections more breathing room
- simplify card anatomy
- add stronger proof blocks

