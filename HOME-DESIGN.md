---
name: Здоровый питомец — homepage
description: Forest photographic cover with Nunito Sans headings, Manrope body and real clinic photographs
colors:
  forest: "#223f37"
  muted: "#4d6258"
  paper: "#f7f5f0"
  sage: "#e4e9e2"
  cover-copy: "#edf0e6"
  cover-caption: "#d9e4d7"
  cover-note: "#d3dfd2"
  cover-button: "#eff0e5"
  cover-button-hover: "#d4e1d2"
  outline: "#8a9c8f"
  filter-border: "#8fa191"
  field-border: "#a6b8ab"
  inherited-action: "#764636"
  inherited-action-hover: "#603425"
  inherited-secondary-hover: "#1b3e3e"
  inherited-outline-hover: "#8ba394"
  error: "#a12e2e"
typography:
  display:
    fontFamily: "Nunito Sans, Segoe UI, sans-serif"
    fontSize: "clamp(64px, 8.6vw, 126px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Nunito Sans, Segoe UI, sans-serif"
    fontSize: "clamp(34px, 3.8vw, 52px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  category:
    fontFamily: "Nunito Sans, Segoe UI, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 34px)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Nunito Sans, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  cover-body:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  button:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.35
rounded:
  control: "3px"
  photo: "0px"
spacing:
  action-gap: "8px"
  copy-gap: "18px"
  item: "24px"
  narrow-layout: "28px"
  form-column: "32px"
  photo-gap: "40px"
  tablet-layout: "48px"
  mobile-section: "64px"
  spread: "100px"
components:
  button-cover:
    backgroundColor: "{colors.cover-button}"
    textColor: "{colors.forest}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
    height: "52px"
  button-cover-hover:
    backgroundColor: "{colors.cover-button-hover}"
  button-primary:
    backgroundColor: "{colors.inherited-action}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.inherited-action-hover}"
  button-secondary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
    height: "52px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
    height: "52px"
  booking-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
    padding: "12px"
    height: "50px"
  category-disclosure:
    textColor: "{colors.forest}"
    typography: "{typography.category}"
    padding: "26px 0"
  service-row:
    textColor: "{colors.forest}"
    typography: "{typography.title}"
    padding: "22px 0"
---

# Design System: Здоровый питомец — homepage

## Overview

**Creative North Star: "The Clinic Photo Cover"**

This metaphor and the descriptive color names are builder choices under the user's autonomous art-direction request, not user-approved wording. This record describes the shipped homepage content inside its scoped wrapper. The source of truth is `src/app/home.module.css`, its composition is `src/app/page.tsx`, and inherited control behavior comes from `src/app/globals.css`. The existing `DESIGN.md` and `.impeccable/design.json` continue to govern the shared header, footer and other routes.

The homepage uses a forest cover, generous Nunito Sans lettering and a rectangular photograph of the actual clinic's animals. Paper reading sections alternate with sage spreads. Thin rules organize services and practical information; authentic entrance and pharmacy photographs establish the place. Existing phrases, facts, source attribution and booking behavior remain binding product commitments from `PRODUCT.md`.

**Key Characteristics:**

- Large locally hosted Nunito Sans lettering above a continuous photographic field.
- Forest, paper and sage sections with flat surfaces and ruled lists.
- Native disclosures, explicit booking confirmation and real clinic photographs.
- One opening sequence pairs clinic-name tracking with the photo aperture; reduced motion presents both statically.

## Colors

The homepage's forest and quiet pale surfaces form the dominant palette; inherited chestnut actions remain in practical controls.

### Primary

- **Forest:** scoped text, cover and appointment-band background, secondary buttons and text selection background.
- **Muted green:** descriptions and secondary information on light surfaces.

### Secondary

- **Sage:** clinic photo spread, prices and booking surfaces.
- **Inherited chestnut:** existing primary booking-form actions and keyboard focus outside the cover; this is a carried control behavior, not a new homepage accent mandate.

### Neutral

- **Paper:** main reading surface, booking fields, appointment-band button and photographic captions.
- **Cover copy, caption and note:** separate pale foregrounds used on forest.
- **Cover button and hover:** pale action fill and its fine-pointer hover response.
- **Outline, filter border and field border:** observed control strokes. Error remains the inherited red validation state.

**The Scope Rule.** Apply these tokens inside the homepage wrapper; preserve the incumbent whole-site system for the shared shell and other routes.

## Typography

**Display Font:** Nunito Sans with Segoe UI and sans-serif fallbacks.
**Body Font:** Manrope. `src/app/layout.tsx` imports local weights 400, 500, 600 and 700 for both families, including Cyrillic subsets.

### Hierarchy

- **Display:** the clinic name uses the frontmatter display role, one unbroken line on desktop. At 760px and below it changes to `clamp(48px, 12.6vw, 88px)` with `-0.035em` tracking, two block spans and a 17% inset on the second span.
- **Headline:** section headings use the frontmatter headline role. At 480px and below the regular section size is 32px. The clinic photo heading uses `clamp(38px, 4.6vw, 64px)`, then 34px at 480px. The appointment heading uses `clamp(38px, 4.6vw, 62px)`, then 38px at 760px. Trust headings use 32px, then 30px at 760px.
- **Category:** native service summaries use the category role, then 25px at 760px.
- **Title:** service titles use the title role, then 16px at 760px. Visit-step titles use 21px/500, then 19px.
- **Body:** inherited body is the frontmatter body role. Cover paragraphs use the cover-body role and a 58ch measure, changing to 14px at 760px. Clinic prose is 15px/1.8 with a 62ch measure, then 14px. Service descriptions are 13px with a 48ch measure, then 12px.
- **Controls:** buttons retain the inherited 700 weight. Booking inputs are 15px, changing to 16px at 760px.

**The Type Rule.** Use Nunito Sans for all heading levels and display lettering on every route. Use Manrope for prose, navigation, buttons, forms and contacts. This pairing follows the user’s font reference.

## Layout

The shared container is `min(1240px, calc(100% - 96px))`; at 760px it becomes `calc(100% - 40px)`. The cover starts with 42px top padding, a title band with 16px gap and 34px bottom padding, a panorama, then a separate reading/action band. The panorama height is `clamp(350px, 31vw, 470px)`, with an image position of `50% 67%`. The reading band uses `1fr / 0.6fr`, a 96px column gap and 30px vertical padding.

The shipped sequence is cover, care strip, services, clinic photo spread, visit steps, team/review information, prices, appointment band, FAQ, contacts and booking form. Services use a `0.34fr / 0.66fr` split with a 100px gap and 112px section padding; the left heading is sticky at 140px. The clinic photo spread uses `0.7fr / 0.3fr`, a 40px gap, minimum photo heights of 400px and 260px, and a 60px downward offset on the smaller photograph. Clinic details use `0.65fr / 0.35fr`; visit content uses `0.42fr / 0.58fr`; team and reviews use equal columns. FAQ and booking content cap at 960px. Contact information has three columns under a full-width 460px entrance photograph.

At 1020px, major spread gaps reduce to 48px and the main clinic photograph minimum height becomes 340px. At 760px, reading/action, service, clinic details, visit, trust and contact information stack; the sticky service heading becomes static. The panorama is 300px high and extends into the 20px container gutters. The clinic photos become `1fr / 104px` with a 12px gap, 280px/240px minimum heights and no vertical offset. The contact photograph is 300px. Most section paddings reduce to 64–72px, while the appointment band uses 48px.

At 480px, the panorama becomes 270px high; clinic photos stack, with the smaller photo at 64% width, aligned right and 180px minimum height. Service rows remove the leading icon. The inherited booking grid collapses from two columns to one at 480px; the homepage form gap is 24px/32px on desktop and 22px at 760px.

## Elevation & Depth

The homepage module defines no box-shadow vocabulary. Forest, paper and sage layering, image scale, asymmetric photo placement and fine dividers establish depth. The photo frame itself remains uncluttered: captions sit at the edge rather than in a floating overlay panel. Preserve the actual shared control behavior without inventing an additional shadow system for this surface.

## Shapes

Photographs and major sections are rectangular with square corners. Homepage buttons, price-book actions, filter controls and booking fields use the small control radius from the frontmatter. Ruled service groups and visit steps remain flat, open rows rather than separate cards. Photography uses cover cropping; the smaller clinic image shifts its horizontal crop from 45% on desktop to 58% at 760px, then 50% at 480px.

## Components

### Buttons

Buttons retain the shared 52px minimum height, 15px/23px padding and 14px/700 type while using the homepage control radius. The cover action uses its dedicated pale fill and forest text; the appointment-band action uses paper and forest. Both hover to the cover hover fill on a fine pointer. Ordinary primary actions retain chestnut and its inherited hover; secondary actions use forest with the inherited secondary hover. Outlined actions use the outline stroke, then sage fill and the inherited outline hover stroke.

Shared state transitions are background and border color for 180ms/ease and transform for 140ms with the shared ease-out. Active buttons scale to 0.98. Disabled buttons show 0.65 opacity and a wait cursor. Keyboard focus retains a 3px outline with 4px offset, pale on the cover and inherited chestnut elsewhere.

### Inputs / Fields

Booking fields use paper fill, forest text, a 1px field-border stroke, 12px padding and 50px minimum height. Textareas have a 112px minimum height and resize vertically. Validation uses the error token. Price search/select surfaces are transparent with the filter-border stroke. Scoped text inputs and textareas use a forest caret.

### Service Catalogue

Native `details` elements share the name `service-categories`, with the first category initially open. Each summary is a row with category lettering and an inline SVG chevron. The chevron rotates 180 degrees when open, transitioning for 220ms/ease. Service rows use `24px / 1fr / 20px` columns, an 18px gap and top dividers. Fine-pointer hover underlines the title and translates the trailing arrow `3px, -3px` over 180ms/ease. At 760px the columns are `22px / 1fr / 18px`; at 480px only text and trailing arrow remain.

### Photographic Cover

The source is the local `/images/pets.webp` clinic-card photograph; the clinic spread uses `/images/entrance.webp` and `/images/pharmacy.webp`, with provenance in `public/images/SOURCES.md`. The clinic-name heading has one tracking entrance inspired by [Animista's tracking-in reference](https://animista.net/play/text/tracking-in): `titleTrackingIn` runs for 750ms with `cubic-bezier(0.215, 0.61, 0.355, 1)`, once and without delay. It starts at `-0.18em` letter spacing and zero opacity, reaches 0.6 opacity at 40%, and ends at full opacity with the existing tracking (`-0.04em` on desktop, `-0.035em` at 760px and below). Its amplitude and duration are adapted to this heading. The cover aperture continues to animate from `clip-path: inset(0 14% 0 14%)` to `inset(0)` for 850ms with `cubic-bezier(0.23, 1, 0.32, 1)`. These run together as one opening sequence; other text has no entrance animation. Reduced motion disables both entrance animations and disclosure/arrow transitions; the inherited global reduced-motion rule also disables transitions and smooth scrolling. `HomeMotion` and `HomeReveal` are plain wrappers, so content is visible without JavaScript.

### Practical Information

Team and reviews use honest empty-data messages, not invented profile or testimonial cards. Prices remain phone-confirmed. Booking remains a request requiring administrator confirmation. FAQ uses native `details` with ruled rows, 19px summary type and 26px vertical padding, reducing to 16px/22px at 760px. Shared navigation and footer remain governed by `DESIGN.md`; this scoped record does not redefine them.

## Do's and Don'ts

### Do:

- **Do** keep the forest cover, paper reading surface and sage spreads scoped to the homepage.
- **Do** retain locally hosted Nunito Sans and Manrope, real clinic photographs, source attribution and existing copy.
- **Do** preserve native disclosures, visible keyboard focus and the static reduced-motion presentation.
- **Do** preserve the clinic's confirmation requirement and the honest absence of published prices, hours, doctor profiles and verified reviews.

### Don't:

- **Don't** apply this scoped homepage record to the shared shell or other routes.
- **Don't** invent tonal ramps, shadow tokens, proof, clinic facts or replacement product wording.
- **Don't** present the builder's metaphor or descriptive names as user-approved language.
- **Don't** turn the retained section-context labels or the very small cover location line into reusable display roles; they carry existing copy and are not canonized as homepage typography tokens.
