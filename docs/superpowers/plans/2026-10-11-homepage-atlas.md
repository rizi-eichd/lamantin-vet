# Homepage Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox syntax for tracking.

**Goal:** A complete, distinctive homepage redesign, preserving all clinic facts, wording, links and workflows.
**Architecture:** Keep shared layout, header/footer, booking and service pages unchanged. Import a CSS module from the homepage and scope all shared component overrides inside its root. A homepage-only client wrapper manages progressive animation enhancement, small pointer parallax, and scroll progress; content stays visible with JavaScript absent and reduced motion enabled.
**Tech Stack:** Existing Next App Router, TypeScript, Motion, Lucide, local Manrope, system Georgia. No dependencies added.
**Spec:** User's current request: redesign homepage only, asymmetric composition, original design, responsive, animation, honest facts, existing functionality. Previous instruction to preserve phrases remains in force.

## Constraints
- Edit only src/app/page.tsx; create src/app/home.module.css and src/components/home-motion.tsx.
- Do not edit global stylesheet, shared layout or data/components used on other routes.
- Preserve /#services, /#about, /#team, /#prices, /#reviews, /#contacts and every booking/map/telephone link.
- Keep all data driven doctor/review conditions and existing booking and price components.
- Use existing real local photographs. No invented facts, prices, testimonials or clinical outcomes.

## Review Focus
- Styles must not leak to booking, legal or service pages.
- All content is visible without JS and under prefers-reduced-motion.
- No horizontal overflow at 320/375/768/1024/1920 px.
- Sticky section headings and animated art must not cover links or form fields.
- Navigation, price filtering, selected-service booking, FAQ and form validation must still work.

## Tasks
- [x] Capture existing content and protected-file hashes; inspect code and browser.
- [x] Recompose homepage: oversized editorial hero, grouped service index, dark photographic spread, numbered visit path, ledger pricing, terracotta CTA, reviews, FAQ, entrance/location layout and booking desk.
- [x] Implement scoped CSS and progressive reveal/path drawing/pointer/hover/scroll effects; responsive layout and reduced motion.
- [x] Build, lint, existing tests; browser visual/functional checks; verify protected hashes and preserved phrases; independent review; refresh source ZIP and screenshots.

## Decisions
- Use Georgia as a local serif accent with the existing Manrope; avoids external fonts and loading regressions.
- New ordinal numbers are navigation markers, not clinic statistics.
- Shared header/footer remain exactly unchanged, as requested for non-home routes.
