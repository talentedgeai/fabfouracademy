# Design System — Fab Four Academy

> Brand & Design System · v2.0 · 2025  
> Dan Absher · fabfouracademy.com

---

## Contents

01. [Visual Theme & Atmosphere](#visual-theme-atmosphere)
02. [Color Palette & Roles](#color-palette-roles)
03. [Typography System](#typography-system)
04. [Button System](#button-system)
05. [Component Stylings](#component-stylings)
06. [Layout & Spacing](#layout-spacing)
07. [Photography & Imagery](#photography-imagery)
08. [Interaction & Motion](#interaction-motion)
09. [Voice & Messaging Patterns](#voice-messaging-patterns)
10. [Do's and Don'ts](#dos-and-donts)
11. [Agent Prompt Guide](#agent-prompt-guide)

---

## 01 Visual Theme & Atmosphere

Fab Four Academy is a leadership education and cultural storytelling brand grounded in the story of The Beatles. The visual identity is clean, bold, and content-forward — a white-dominant light-mode experience built for clarity and warmth. Three distinct accent colors — **Yellow (#F9AD3E)**, **Orange (#CF4B27)**, and **Blue (#2E758D)** — each carry a specific emotional and functional role, balanced against a crisp black-and-white foundation.

The aesthetic communicates approachable authority: large Roboto ExtraBold headings deliver confidence and punch; Arial body text keeps reading comfortable and universally accessible. The overall tone is that of a trusted educator and engaging storyteller — not a tech product.

**Key characteristics:**

- White (`#FFFFFF`) as the dominant background (~90%)
- Black (`#000000`) as primary text
- Yellow for energy and community warmth
- Orange for primary actions and urgency
- Blue for trust and depth
- Charcoal (`#38393A`) for primary CTA buttons and dark surfaces

---

## 02 Color Palette & Roles

### Brand Colors

| Name | Hex | CSS Variable | Role |
|------|-----|-------------|------|
| White | `#FFFFFF` | `--white` | Primary background (~90%) |
| Black | `#000000` | `--black` | Primary text, H1–H4 |
| Yellow | `#F9AD3E` | `--yellow` | Community CTA, warmth accent, rule lines |
| Orange | `#CF4B27` | `--orange` | Action CTA, eyebrow labels, urgency, card hover border, CTA banner |
| Blue | `#2E758D` | `--blue` | Trust CTA, links, input focus states, accent cards |

### UI Supporting Colors

| Name | Hex | CSS Variable | Role |
|------|-----|-------------|------|
| Charcoal | `#38393A` | `--charcoal` | Primary CTA bg, dark cards, nav CTA, cover hero |
| Gray Light | `#F5F5F5` | `--gray-light` | Alternating section bg (~10%) |
| Gray Mid | `#E8E8E8` | `--gray-mid` | Card borders, row dividers |
| Border Gray | `#D9D9D9` | `--gray-border` | White button border, input border |
| Text Muted | `#555555` | `--text-muted` | Body text, card descriptions |
| Text Light | `#888888` | `--text-light` | Captions, meta, placeholder, nav links |

### Hover / Dark Variants

| Name | Hex | CSS Variable |
|------|-----|-------------|
| Yellow Dark | `#D4882A` | `--yellow-dark` |
| Orange Dark | `#A83B1E` | `--orange-dark` |
| Blue Dark | `#235D70` | `--blue-dark` |

---

## 03 Typography System

Two fonts. No exceptions.

- **Headings:** `Roboto` — weight **800 only** — loaded via Google Fonts
- **Body / UI / Buttons:** `Arial, Helvetica, sans-serif` — weight 400 (body) or 700 (buttons, labels)

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@800&display=swap');

--font-heading: 'Roboto', Arial, Helvetica, sans-serif;  /* weight: 800 always */
--font-body:    Arial, Helvetica, sans-serif;            /* weight: 400 body / 700 buttons & labels */
```

### Type Scale

| Role | Tag | Size | Weight | Line Height | Notes |
|------|-----|------|--------|-------------|-------|
| Display Hero | `H1` | 56px | 800 | 1.0 | Roboto · Hero headline only |
| Section Heading | `H2` | 36px | 800 | 1.1 | Roboto · See `heading-divider-brush` variant |
| Sub-heading | `H3` | 24px | 800 | 1.2 | Roboto · Sub-sections, feature titles |
| Feature Title | `H4` | 18px | 800 | 1.3 | Roboto · Card headings, step titles |
| Eyebrow | — | 11px | 700 | — | Arial · uppercase · letter-spacing 3px · color `#CF4B27` |
| Body Large | — | 17px | 400 | 1.6 | Arial · Hero sub-copy, intro paragraphs |
| Body | — | 15px | 400 | 1.6 | Arial · General body, card descriptions |
| Body Small | — | 13px | 400 | 1.5 | Arial · Captions, meta, footnotes |
| Button | — | 14px | 700 | — | Arial · All CTA buttons |

> **Letter spacing rule:** Eyebrow labels only (3px). All other text: 0. Never apply tracking to headings or body copy.

### H2 Variant: `heading-divider-brush`

The `heading-divider-brush` is used when a section opens with a named subject — a person, a pillar, a concept. It splits the heading across two accent colors and anchors it with a real hand-painted brush stroke PNG underline. Always **flush left** — spans full container width.

| Property | Value |
|----------|-------|
| Word 1 color | `#CF4B27` (Orange) — label/prefix word |
| Word 2 color | `#2E758D` (Blue) — subject name |
| Brush image | `heading-divider.png` — real hand-painted PNG |
| Brush sizing | `background-size: 100% 100%` — stretches to full container width |
| Brush height | H1: 24px · H2: 18px (default) · H3: 14px · H4: 12px |
| Brush gap | `margin-top: 4px` |
| Layout | `display: block` — always flush left, never inline |
| Use when | Section opens with a named person, pillar, or concept |

```html
<div class="heading-divider hd-orange-blue">
  <span class="hd-word1">MEET </span>
  <span class="hd-word2">DAN ABSHER</span>
  <span class="hd-brush"></span>
</div>

<!-- Size modifiers:  hd-h1  hd-h3  hd-h4 -->
<!-- Color modifiers: hd-orange-blue  hd-blue-orange  hd-on-dark -->
```

---

## 04 Button System

All buttons share the same base: `border-radius: 4px`, `padding: 13px 26px`, Arial 14px bold, no shadows, `transition: background 0.25s ease`. One primary variant; four secondary color variants for context-specific emphasis.

### Shared Base

```css
border-radius: 4px;          /* rectangular — never pill */
padding: 13px 26px;
font-family: Arial, sans-serif;
font-size: 14px;
font-weight: 700;
border: none;                /* except White variant */
box-shadow: none;            /* always */
transition: background 0.25s ease;
```

### Button Variants

| Variant | Background | Text | Hover bg | Use case |
|---------|-----------|------|----------|----------|
| **Primary** | `#38393A` Charcoal | White | `#222324` | Hero CTA, primary get/download/buy |
| **Yellow** | `#F9AD3E` | White | `#D4882A` | Community, join, warm invite actions |
| **Orange** | `#CF4B27` | White | `#A83B1E` | Book Dan, speaking, urgent register |
| **Blue** | `#2E758D` | White | `#235D70` | Learn more, listen, explore content |
| **White** | `#FFFFFF` | Black | border → `#38393A` | Tertiary on colored bg sections |
| **Ghost Link** | transparent | `#CF4B27` underlined | `#A83B1E` | In-content links, Read more |

> **White button** uses `border: 1px solid #D9D9D9` at rest. Never place on a white background.

> Never place two CTAs of the same color variant side by side.

---

## 05 Component Stylings

### `heading-divider-brush`

See [H2 Variant in Typography](#h2-variant-heading-divider-brush).

### Cards

Cards display **title only** followed by a brush-stroke rule (`card-rule`). No eyebrow or body text inside the card.

| Property | Value |
|----------|-------|
| Background (standard) | `#FFFFFF` |
| Background (dark) | `#38393A` Charcoal |
| Background (blue accent) | `#2E758D` Blue |
| Border (standard) | `1px solid #E8E8E8` |
| Border (dark) | `1px solid rgba(249,173,62,0.2)` |
| Border radius | `6px` |
| Hover (standard) | border → `#CF4B27` + `box-shadow: 0 4px 20px rgba(0,0,0,0.08)` |
| Title font | Roboto 800 · 17px · `#000000` |
| `card-rule` | Brush PNG image · 120×12px · left-aligned |

```html
<div class="card">
  <div class="card-title">The Pillar of Trust</div>
  <div class="card-rule"></div>
</div>
```

### Testimonial Card

| Property | Value |
|----------|-------|
| Background | `#F5F5F5` |
| Left border | `3px solid #CF4B27` |
| Border radius | `6px` |
| Quote | Arial italic · 15px · `#555555` |
| Name | Arial 700 · 14px · `#000000` |
| Role | Arial 400 · 12px · `#888888` |
| Avatar | 40×40px circle · bg `#38393A` · text `#F9AD3E` |

### Badges & Eyebrow Labels

| Property | Value |
|----------|-------|
| Border radius | `3px` |
| Padding | `4px 12px` |
| Font | Arial 700 · 11px · uppercase · letter-spacing 1.5px |

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Default | `#E8E8E8` | `#555555` | `1px solid #D9D9D9` |
| Yellow | `rgba(249,173,62,0.15)` | `#A8681A` | `1px solid rgba(249,173,62,0.35)` |
| Orange | `rgba(207,75,39,0.1)` | `#CF4B27` | `1px solid rgba(207,75,39,0.25)` |
| Blue | `rgba(46,117,141,0.1)` | `#2E758D` | `1px solid rgba(46,117,141,0.25)` |
| Dark | `#38393A` | `#F9AD3E` | none |

### Step / Pillar Framework

| Property | Value |
|----------|-------|
| Step number | Roboto 800 · 28px · `#E8E8E8` at rest → `#F9AD3E` on hover |
| Title | Arial 700 · 15px · `#000000` → `#CF4B27` on hover |
| Description | Arial 400 · 13px · `#888888` |
| Row divider | `border-bottom: 1px solid #E8E8E8` |
| Transition | `0.2s ease` |

### Stat / Metric Callouts

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid #E8E8E8` · radius `6px` |
| Eyebrow | Arial 700 · 10px · uppercase · letter-spacing 2px · `#CF4B27` |
| Number | Roboto 800 · 44px · `#000000` |
| `stat-rule` | Brush PNG image · 80×10px · centered |
| Description | Arial 400 · 12px · `#888888` |

### Navigation

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border bottom | none |
| Logo | Roboto 800 · 16px · `#000000` with Orange accent word |
| Nav links | Arial 400 · 14px · `#555555` → `#CF4B27` on hover |
| CTA button | Primary (Charcoal) variant |

### CTA Banner Section

| Property | Value |
|----------|-------|
| Background | `#CF4B27` Orange |
| Heading | Roboto 800 · 28px · `#FFFFFF` |
| Sub-copy | Arial 400 · 14px · `rgba(255,255,255,0.8)` |
| Inner CTA | Primary (Charcoal) button variant |

### Form / Input Fields

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid #D9D9D9` |
| Border radius | `4px` |
| Focus border | `#2E758D` (Blue) |
| Placeholder | `#888888` |
| Label | Arial 700 · 12px · `#000000` |

### Section Structure Pattern

```
① Title Case Eyebrow Label         — Arial 700, 11px, uppercase, #CF4B27, ls 3px
② Bold H2 Heading                  — Roboto 800, 36px, #000000
③ Body sub-copy (2–3 sentences)    — Arial 400, 15px, #555555
④ CTA Button(s)                    — Primary + optional secondary
```

---

## 06 Layout & Spacing

### Spacing Scale

| Token | Value | Use |
|-------|-------|-----|
| — | 4px | Icon gap |
| — | 8px | Badge padding, tight gaps |
| — | 12px | Button gap, inline spacing |
| — | 16px | Field padding, card internals |
| — | 24px | Card padding, gutters |
| — | 32px | Section internal spacing |
| — | 48px | Section padding (mobile) |
| — | 64px | Section padding (tablet) |
| — | 80px | Section padding (desktop) |
| — | 96px | Hero vertical breathing room |

### Border Radius Scale

| Value | Use |
|-------|-----|
| `3px` | Badges |
| `4px` | Buttons, inputs |
| `6px` | Cards, containers |
| `12px` | Image containers |
| `50%` | Avatars |

### Grid

| Property | Value |
|----------|-------|
| Max-width | `1200px` |
| Gutter | `24px–32px` |
| Columns | 12-column |
| Section padding | `64px–96px` vertical |
| Breakpoints | 480px / 768px / 1024px |

---

## 07 Photography & Imagery

Photography should feel warm, candid, and human — never over-produced. The clean white canvas demands images with genuine character: real stages, real people, real moments.

| Style | Description |
|-------|-------------|
| Hero / Dark | Stage lights, recording studios. Deep warm shadows, high contrast. No tech imagery. |
| Portrait (Dan Absher) | Neutral or dark backgrounds. Head-and-shoulders. Business-casual, natural expression. |
| Editorial / Content | Slightly desaturated lifestyle. Bookshelves, notebooks, vinyl. Warm natural light. |

**Rules:**

- Image containers: `border-radius: 12px`
- Prefer warm tones; avoid harsh flash or clinical white lighting
- Beatles imagery: historically accurate, public domain or licensed only
- No tech/corporate stock photography
- No oversaturated or HDR-processed imagery

---

## 08 Interaction & Motion

Motion is minimal and purposeful. Transitions communicate state — not personality. No bounce, scale, or aggressive animation.

| Element | Transition |
|---------|-----------|
| Button background | `background 0.25s ease` |
| Link / nav color | `color 0.2s ease` |
| Card border + shadow | `0.2s ease` |
| Step title + number hover | `color 0.2s ease` |
| Section reveal (fadeInUp) | `translateY(12px) → 0` · opacity `0 → 1` · 350ms |
| Card hover shadow | `0 4px 20px rgba(0,0,0,0.08)` |

---

## 09 Voice & Messaging Patterns

Warm, earned, and narrative-first. Copy opens with questions or observations — not product claims. Dan Absher's voice is a storyteller and executive educator: measured, curious, generous with insight.

### Section Structure

```
① Title Case Eyebrow Label
② Bold H2 — Question or Revelation
③ Body sub-copy: opens with a question or insight. 2–3 sentences max.
④ Primary CTA  +  optional Secondary CTA
```

### Voice Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| Question-First | Opens with a question the audience is already asking | *"What if the music you've loved still has more to teach you?"* |
| Literary Revelation | Treats the subject as a text to be read more deeply | *"The Beatles not just as musicians — as four humans learning to work together."* |
| Outcome-First Heading | Names the transformation, not the method | *"See your team more clearly."* |
| Minimalist Cadence | Short parallel structure for daily content | *"One song. One insight. Every day."* |
| Earned Authority | Credentials appear through story, not boasting | *"A lifetime of listening and deep study."* |
| Culture, Not Metrics | Avoids corporate KPI language | *"Excellence as culture, not a metric."* |

---

## 10 Do's and Don'ts

### Do

- ✅ Use `#38393A` Charcoal for all primary CTAs
- ✅ Use `#FFFFFF` white as the primary background (~90%)
- ✅ Use `#000000` black for all H1–H4 headings
- ✅ Use `#555555` for body text and card descriptions
- ✅ Use Orange for eyebrow labels, card hover borders, and urgent CTAs
- ✅ Use Yellow for community/join CTAs and decorative rule accents
- ✅ Use Blue for trust CTAs, links, and input focus states
- ✅ Use Roboto weight 800 for headings; Arial for all body and UI text
- ✅ Use `border-radius: 4px` on buttons; `6px` on cards
- ✅ Keep the White button bordered with `#D9D9D9` at rest
- ✅ Follow section structure: Eyebrow → H2 → Sub-copy → CTA
- ✅ Use `heading-divider-brush` component as `display: block` (always flush left)
- ✅ Use brush PNG (`heading-divider.png`) for `card-rule` and `stat-rule` dividers

### Don't

- ❌ Use pill-shaped buttons (`border-radius: 40px`) — not this brand's language
- ❌ Use Yellow, Orange, or Blue as page background surfaces
- ❌ Use cool blue-gray section backgrounds — use neutral `#F5F5F5` only
- ❌ Apply letter-spacing to headings or body text — eyebrows only
- ❌ Place two CTAs of the same color variant side by side
- ❌ Use ALL CAPS for eyebrow labels — Title Case only
- ❌ Apply drop shadows to buttons at rest
- ❌ Use Roboto at weights other than 800
- ❌ Use the White button variant on a white background
- ❌ Use metric-driven copy ("8x IMPACT") — this brand is narrative-first

---

## 11 Agent Prompt Guide

When generating UI, copy, or layouts for Fab Four Academy, apply these exact defaults:

| Token | Value |
|-------|-------|
| H2 — `heading-divider-brush` | Word1: `#CF4B27` · Word2: `#2E758D` · Brush PNG · Roboto 800 36px · height 18px · `display:block` flush-left |
| Page Background (primary) | `#FFFFFF` — ~90% of all surfaces |
| Page Background (secondary) | `#F5F5F5` — alternating sections, testimonial cards |
| Heading Text (H1–H4) | `#000000` · Roboto · weight **800 only** |
| Body Text | `#555555` · Arial · 400 · 15px / lh 1.6 |
| Caption / Meta Text | `#888888` · Arial · 400 · 13px |
| Eyebrow Label | `#CF4B27` · Arial 700 · 11px · uppercase · letter-spacing 3px · no background |
| Primary CTA | bg `#38393A` · text `#FFFFFF` · radius 4px · pad 13px 26px · hover bg `#222324` |
| Secondary CTA — Yellow | bg `#F9AD3E` · text `#FFFFFF` · hover bg `#D4882A` · community/join |
| Secondary CTA — Orange | bg `#CF4B27` · text `#FFFFFF` · hover bg `#A83B1E` · speaking/booking |
| Secondary CTA — Blue | bg `#2E758D` · text `#FFFFFF` · hover bg `#235D70` · learn/explore |
| Secondary CTA — White | bg `#FFFFFF` · text `#000000` · border `1px solid #D9D9D9` · hover border `#38393A` |
| Ghost / Text Link | transparent · color `#CF4B27` · underline on hover |
| Card (standard) | bg `#FFFFFF` · border `1px solid #E8E8E8` · radius 6px · **title only** · `card-rule`: brush PNG 120×12px · hover: border `#CF4B27` + shadow |
| Card (dark) | bg `#38393A` · border `1px solid rgba(249,173,62,0.2)` · radius 6px |
| Card (blue accent) | bg `#2E758D` · no border · radius 6px |
| Testimonial Card | bg `#F5F5F5` · border-left `3px solid #CF4B27` · radius 6px · quote: Arial italic 15px `#555555` |
| Badge (default) | bg `#E8E8E8` · border `1px solid #D9D9D9` · text `#555555` · radius 3px · 4px 12px · 11px uppercase 700 |
| Step Number | Roboto 800 28px · `#E8E8E8` at rest → `#F9AD3E` on hover |
| Step Title hover | color `#CF4B27` |
| Stat Number | Roboto 800 44px `#000000` |
| Stat Eyebrow | Arial 700 · 10px · uppercase · ls 2px · `#CF4B27` |
| `stat-rule` | Brush PNG · 80×10px · centered |
| Navigation | bg `#FFFFFF` · no border-bottom · links `#555555` → `#CF4B27` · CTA: Charcoal btn |
| CTA Banner | bg `#CF4B27` · heading Roboto 800 28px `#FFFFFF` · inner CTA: Charcoal btn |
| Card / Component Border | `#E8E8E8` |
| Card hover border | `#CF4B27` |
| Input Border | `#D9D9D9` · focus: `#2E758D` |
| Accent Rule (`card-rule`, `stat-rule`) | Brush PNG image — `heading-divider.png` |
| Font — Heading | Roboto 800 — H1: 56px/1.0 · H2: 36px/1.1 · H3: 24px/1.2 · H4: 18px/1.3 |
| Font — Body | Arial — Large: 17px/1.6 · Body: 15px/1.6 · Small: 13px/1.5 · Button: 14px 700 |
| Letter Spacing | Eyebrow labels only: 3px · All other text: 0 |
| Button Radius | `4px` — rectangular, not pill |
| Card Radius | `6px` |
| Image Radius | `12px` |
| Tone | Warm, narrative-first, question-led, culturally rich, earned authority |
| Section Structure | Title Case Eyebrow → Roboto H2 → Arial sub-copy → CTA button(s) |

---

*Fab Four Academy Design System v2.0 · 2025 · Dan Absher · fabfouracademy.com*