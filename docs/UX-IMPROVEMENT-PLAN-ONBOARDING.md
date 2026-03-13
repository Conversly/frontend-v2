# VerlyAI Onboarding Screen — UX Improvement Plan

**Product:** VerlyAI  
**Screen:** First onboarding step (website + assistant type → build AI assistant)  
**Audience:** Business owners, marketers, founders (non-technical)  
**Goal:** Make the UI feel like a premium AI SaaS product: transparent, intelligent, trustworthy.

---

## SECTION 1 — Overall Layout

**Current state:** Two-panel layout: left = form (title, explanation, website input, assistant type, buttons); right = progress (illustration, status, live updates, progress bar, leave message).

**Assessment:** The split is sound. The left panel is “what you do”; the right is “what we’re doing.” It supports the mental model of “I give you my site → you show me progress.”

**Recommendations:**

1. **Visual hierarchy**
   - Treat the left column as the primary action path. Use slightly more visual weight (e.g. card or soft background) so it reads as “start here.”
   - Keep the right panel visually secondary (e.g. lighter background, `--surface-secondary`) so it doesn’t compete before the user has submitted.

2. **Spacing and alignment**
   - Use a consistent vertical rhythm (e.g. 24px or 32px between major blocks). The current `gap-6` / `gap-5` is good; ensure the same scale is used in the right panel.
   - Align the main title on the left with the “We’re reading your website” headline on the right so the two columns feel like one experience, not two separate screens.

3. **Responsiveness**
   - On small screens, consider stacking: form first, then progress (or a compact “Preparing…” state) so the user isn’t scrolling between two dense columns.

4. **Optional enhancement**
   - Add a subtle connecting element (e.g. a thin line or shared “Step 1” badge) so the two panels read as one step, not two separate UIs.

**Verdict:** Keep the two-panel layout. Improve hierarchy (left = primary), alignment, and rhythm so it feels intentional and premium.

---

## SECTION 2 — Page Title and Description

**Current:**  
- **Title:** “Let’s start with a link”  
- **Description:** “Share your website and we’ll build an AI assistant from your content.”

**Analysis:** The title is friendly but vague (“a link” could be anything). The description is good but doesn’t spell out the outcome or why it’s safe.

**Suggested rewrites:**

**Option A (value-first)**  
- **Title:** “Turn your website into an AI assistant”  
- **Description:** “Enter your site below. We’ll read your pages and create an assistant that answers questions about your business—no coding required.”

**Option B (action-first)**  
- **Title:** “Add your website”  
- **Description:** “We’ll read your public pages and build an AI that can answer visitor questions. You can change how it behaves later.”

**Option C (conversational)**  
- **Title:** “Start with your website”  
- **Description:** “Paste your site URL. We’ll learn your content and prepare an AI assistant that speaks for your business.”

**Recommendation:** Use **Option A** for a strong value statement, or **Option B** if you want the lightest cognitive load. Avoid “link” and “build from your content” without explaining the outcome (an assistant that answers questions).

---

## SECTION 3 — Website Input Experience

**Current:** Label “Your website”; placeholder “yourcompany.com”; no helper text; protocol toggle (https:// / http://).

**Improvements:**

| Element | Current | Suggested |
|--------|---------|-----------|
| **Label** | “Your website” | “Website address” or “Your site URL” — slightly more precise without being technical. |
| **Placeholder** | “yourcompany.com” | Keep it, or use “e.g. acme.com” to reinforce domain-only. |
| **Helper text** | None | Add one line below: “Use your main domain. We only read public pages and don’t change anything on your site.” — clarifies scope and safety. |
| **Example URLs** | None | Optional: small text “Examples: yourstore.com, docs.myapp.com” to reduce validation confusion. |
| **Validation** | (handled elsewhere) | Messages should be human-friendly: “Please enter a valid website address (e.g. yourcompany.com)” and “We couldn’t reach this address. Check it and try again.” |

**Additional UX:**

- Keep the protocol selector for power users but make it visually secondary (e.g. smaller, or a dropdown) so the main field is clearly “domain here.”
- On invalid submit, focus the input and show the message directly under it (inline), not only as a toast.
- If the user pastes a full URL, strip protocol/path in the handler (you already do); consider a short success microcopy: “We’ll use yourcompany.com.”

---

## SECTION 4 — Assistant Type Selection

**Current:** Four options: General assistant, Customer support, Docs & help, Sales & conversion. Each has a short description. Label: “Use case.”

**Analysis:** Asking for “use case” up front is useful for tuning the assistant later, but it adds choices at a moment when the user mainly wants to “paste URL and go.” The wording is already non-technical and clear.

**Recommendations:**

1. **Wording**
   - **Section label:** Change “Use case” to “What’s this assistant for?” or “How will you use it?” — more conversational.
   - **Optional subtext:** “Pick the closest fit. You can change this later.” to reduce commitment anxiety.

2. **Layout**
   - Keep the 2×2 grid; it’s scannable. Ensure tap/click targets are large enough (current padding is fine).
   - Consider slightly larger type for the title of each card so the four options are easy to compare.

3. **Descriptions**
   - Keep benefit-focused, one line each. Current set is good; optional tweaks:
     - General: “Answers questions about your business”
     - Customer support: “Helps visitors with questions and issues”
     - Docs & help: “Finds answers in your docs and FAQs”
     - Sales: “Helps visitors learn about your products or services”

4. **Default selection**
   - Pre-select **“General assistant”** so the form is valid by default and users can skip the choice if they want. If analytics show a strong skew (e.g. support), use that as default instead.

5. **Simplification**
   - Keeping the four options is recommended. If you ever need to simplify, a single dropdown “Primary use: General / Support / Docs / Sales” would work but is less visual and discoverable than the current cards.

---

## SECTION 5 — Primary Button

**Current:** “Continue” (idle); “Preparing…” (loading).

**Improvements:**

1. **Idle state**
   - Prefer a clear, action-oriented line that states what happens next:
   - **Recommended:** “Create my assistant” or “Build my assistant”
   - Alternatives: “Start” (short but vague), “Create assistant” (clear).

2. **Loading state**
   - Avoid generic “Processing…” or “Preparing…” without context.
   - **Recommended:** “Creating your assistant…” or “Building your assistant…”
   - Optional: add a short line under the button: “Usually 1–2 minutes. You can stay or leave—we’ll notify you when it’s ready.” (if you have notifications).

3. **Disabled state**
   - When URL is invalid or empty, keep the button disabled and ensure the label doesn’t change (e.g. still “Create my assistant”) so the user knows what will happen once they fix the input.

4. **Secondary button**
   - “Set up manually with other sources” is clear. Optional: “Add content from files or other sources instead” if you want to stress “instead of website.”

---

## SECTION 6 — Progress Experience (Right Panel)

**Current:** Illustration → “We’re reading your website” → “Your assistant will be ready in about 1–2 minutes. Here’s what we’re doing.” → Live updates list → progress bar (stage + “X of Y pages read”) → “X% complete” → leave message after 10s.

**Improvements:**

1. **Stage progress**
   - Make stages explicit so the user always knows: done / in progress / next.
   - Example stages (only in UI copy, no technical terms):
     - **1. Connecting** — “Connecting to your site…”
     - **2. Reading pages** — “Reading your website pages…” (with “X of Y pages read”)
     - **3. Understanding** — “Understanding your content…”
     - **4. Preparing assistant** — “Preparing your AI assistant…”
     - **5. Done** — “Your assistant is ready”
   - Show these as a small stepper or as the single “current stage” line you have, but with clear labels and a sense of sequence.

2. **Friendlier messages**
   - Headline: Keep “We’re reading your website” or use “We’re preparing your assistant.”
   - Subtitle: “We’re reading your pages and learning your content. Your assistant will be ready in about 1–2 minutes.”
   - Avoid any wording that sounds like “training” or “indexing”; stick to “reading,” “understanding,” “preparing.”

3. **What’s happening**
   - One line under the headline that updates with the stage, e.g. “Right now: Reading your website pages (12 of 30 read).”

4. **Estimated time**
   - Keep “about 1–2 minutes” near the top.
   - Optionally, after “Found N pages,” show a simple estimate: “About 1–2 min left” or “Usually done in under 2 minutes” so the user knows the wait is bounded.

---

## SECTION 7 — Live Activity Messages

**Current (already human-friendly):**  
“Connecting to {host}…”, “Checking which pages we can read…”, “Found N pages on your site”, “Reading: Home page”, “Reading: Pricing”, “Understanding your content…”, “Identified key topics and FAQs”, “Organizing content for your assistant…”, etc.

**Assessment:** These are already non-technical. No “crawling,” “extracting,” “chunking,” or “embeddings.”

**Refinements:**

| If you ever see | Prefer |
|-----------------|--------|
| “Crawling /about” | “Reading the About page” |
| “Crawling /pricing” | “Reading the Pricing page” |
| “Extracting content” | “Understanding the content on this page” |
| “Chunking documents” | “Organizing content for your assistant” |
| “Generating embeddings” | “Preparing your assistant to answer questions” |
| “Indexing” | “Getting your content ready” |

**Format:** Prefer “Reading the [Page name] page” over “Reading: [Page name]” for a slightly more natural tone. Keep the list to the last N items (e.g. 8) and auto-scroll so the latest line is always in view.

**Completion:** When the last step runs, show a clear success line: “Your assistant is ready” with a checkmark, and optionally a short line: “You can go to the next step.”

---

## SECTION 8 — Progress Bar Design

**Current:** Bar with stage label, “X of Y pages read,” and “X% complete” or “All set—your assistant is ready to use.”

**Improvements:**

1. **Page counts**
   - Keep “X of Y pages read” next to the bar (or under the stage). Use “read” not “processed” or “crawled.”
   - When there are no pages yet (e.g. connecting), show “Connecting…” without a fraction; once “Found N pages” appears, show “0 of N pages read” and then increment.

2. **Stage indicators**
   - Option A: Small horizontal stepper (e.g. dots or labels) for: Connect → Read pages → Understand → Prepare → Done. Current step highlighted; past steps with a check.
   - Option B: Keep a single line of copy that changes with stage (current approach) but ensure the labels match the list in Section 6 (Connecting, Reading pages, Understanding, Preparing, Done).

3. **Hierarchy**
   - **Primary:** Current stage name (e.g. “Reading your website pages…”).
   - **Secondary:** “X of Y pages read” and the bar.
   - **Tertiary:** “X% complete” or “About 1–2 min left” (optional).
   - At 100%, lead with “Your assistant is ready” and a green state; “All set” can stay as a short confirmation below.

4. **Time estimates**
   - Optional: Under the bar, show “Usually 1–2 minutes total” at the start and “About 1 minute left” when e.g. 50% of pages are read (if you can estimate from page count and average speed).

---

## SECTION 9 — Trust-Building Microcopy

**Suggestions:**

1. **Reassurance**
   - Under URL input: “We only read public pages. We don’t change anything on your site.”
   - Near the button (before submit): “Your site stays as is. We only read it to build your assistant.”

2. **Progress**
   - When “Found N pages” appears: “We found N pages. Reading them now…”
   - When moving to “Understanding”: “We’ve read all your pages. Now we’re making sense of your content.”
   - When moving to “Preparing”: “Almost there. We’re getting your assistant ready to answer questions.”

3. **Completion**
   - When 100%: “Your assistant is ready. You can customize it in the next steps.”
   - Optional: “We’ve learned your content. Your assistant can now answer questions about your business.”

4. **Leave page**
   - Keep: “Feel free to leave this page. We’ll have your assistant ready when you return.”
   - If you have notifications: “You can leave. We’ll notify you when it’s ready.”

5. **Errors**
   - If something fails: “Something went wrong. Please try again or add your content manually.” Avoid technical error codes in the main UI.

---

## SECTION 10 — Micro-interactions

**Suggestions:**

1. **Activity list**
   - New rows: Keep the current subtle slide-in (e.g. from the left) and fade; duration ~200–300 ms.
   - Completed rows: When a row’s status goes from “in progress” to “done,” switch the spinner to a checkmark and optionally a brief green tint or check animation.
   - Auto-scroll: When a new item is added, scroll to bottom smoothly (e.g. `behavior: 'smooth'`) so the list doesn’t jump.

2. **Progress bar**
   - Animate width changes (e.g. 0.3–0.5 s ease-out) so the bar doesn’t jump in big steps.
   - At 100%, a short “complete” animation (e.g. bar turns green and a small check or pulse) reinforces success.

3. **Illustration**
   - Keep the existing gentle motion (rings, sparkle). Optionally speed up or add a subtle “pulse” when a new page is read so the right panel feels alive without being distracting.

4. **Button**
   - On submit: Replace label with “Creating your assistant…” and show a small spinner inside the button; disable the button so double-submit isn’t possible.

5. **Stage changes**
   - When the stage label changes (e.g. from “Reading pages” to “Understanding”), a brief crossfade or slide keeps the transition clear and polished.

---

## SECTION 11 — Top 10 UX Improvements (Priority List)

1. **Value-focused headline and description**  
   Replace “Let’s start with a link” with a clear value line (e.g. “Turn your website into an AI assistant”) and one sentence that explains what happens and that no coding is required.

2. **Reassurance under the URL field**  
   Add one line: “We only read public pages and don’t change anything on your site” to reduce anxiety.

3. **Primary button copy**  
   Change “Continue” to “Create my assistant” and loading to “Creating your assistant…”.

4. **Explicit progress stages**  
   Show a clear sequence (Connect → Read pages → Understand → Prepare → Done) so the user always knows what’s done and what’s next.

5. **Trust microcopy**  
   Add short reassurance and progress confirmations (e.g. “We found N pages,” “We’ve read all your pages,” “Your assistant is ready”) at key moments.

6. **Progress bar hierarchy**  
   Lead with current stage name, then “X of Y pages read,” then the bar; at 100%, lead with “Your assistant is ready” and a green success state.

7. **Assistant type label and default**  
   Change “Use case” to “What’s this assistant for?” and pre-select “General assistant” (or your top use case).

8. **Completion feedback**  
   When progress hits 100%, show a clear success message and a short “You can customize it in the next steps.”

9. **Activity list polish**  
   Use “Reading the [Name] page” where possible; show a checkmark when a step completes; smooth auto-scroll for new items.

10. **Leave-page message**  
    Keep the current “Feel free to leave this page…” and show it after ~10 seconds so users know they don’t have to wait on the screen.

---

## Summary

The current screen is already in good shape: two-panel layout, human-friendly activity messages, and progress tied to “pages read.” The biggest gains come from:

- **Clarity:** A value-focused title and one-line reassurance under the URL.
- **Action:** “Create my assistant” and “Creating your assistant…” on the button.
- **Progress:** Explicit stages and clear “what’s done / what’s next” plus a success state at 100%.
- **Trust:** Short microcopy that explains safety (“we only read”), progress (“we found N pages”), and completion (“your assistant is ready”).

Implementing the top 10 list above will make the experience feel more transparent, intelligent, and trustworthy while keeping the tone simple, friendly, and human-centered.
