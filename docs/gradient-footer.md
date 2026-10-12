# Gradient footer adaptation

Reference: https://annnimate.com/animations/gradient-footer. Public live preview inspected; independent implementation, no premium source copied.

Preserve existing footer logo, navigation, phone, map, copyright and legal links. Add one forest/sage light field below the functional area and an oversized two-line clinic name; no new claims or business information. This is the shared footer on existing routes, not a homepage redesign.

Motion: one small name entrance when first visible, slow transform-only light drift. IntersectionObserver and visibilitychange pause the drift offscreen or in a hidden tab. CSS reduced motion presents a stationary final state. No animation dependency or per-frame JavaScript. Decorative layers do not intercept pointer events; content remains present without client JavaScript.

Implementation: FooterSurface client wrapper and a scoped CSS module; existing Footer supplies server-rendered content. Container-relative type adapts to mobile, with viewport fallback. Check production build/lint, desktop/mobile captures, footer links, overflow and motion running/paused state. Document the scoped addition without replacing the existing page design systems.

## Shipped component values

Source: `src/components/footer-surface.module.css`, `footer-surface.tsx`, `footer.tsx`; inherited rules: `src/app/globals.css`.

- Surface: forest `#18382f`, foreground `#f7f5f0`, secondary copy/legal text `#d9e4d7`, divider `#56786a`; isolated stacking, clipped overflow, desktop padding `72px 0`, functional-area bottom padding `40px`.
- Light: `radial-gradient(ellipse at 53% 100%, #a8c38d99 0%, #789c754d 36%, transparent 68%)` over `radial-gradient(ellipse at 18% 102%, #d3ba8352 0%, transparent 48%)`; inset `30% -16% -12%`, origin `50% 100%`, behind content, pointer events disabled.
- Two-line name: inherited Manrope/Segoe UI/sans-serif, weight `500`, tracking `-0.035em`, line-height `0.98`; second line right aligned. Sizes `19.2cqw` / `22.8cqw`, with fallback `clamp(56px, 16.5vw, 240px)` / `clamp(62px, 19.4vw, 282px)`. Text fill: `linear-gradient(180deg, #f7f5f0 0%, #d9e4d7 58%, #c0d4aa 100%)`; padding `88px 0 32px`.
- At `760px` and below: surface top padding `48px`, functional-area gap/bottom padding `32px`, legal-row gap `12px`, name padding `48px 0 24px`, light inset `45% -25% -8%`. Shared container and footer grid retain their existing responsive rules.
- Drift: `14s ease-in-out infinite alternate`, transform from `translateX(-3%) scaleY(0.92)` to `translateX(3%) scaleY(1.06)`. Paused by default; runs only while intersecting, document visible and reduced motion disabled. Name arrival runs once after first intersection: `650ms cubic-bezier(0.23, 1, 0.32, 1)`, `translateY(16px)` to `0`, clip inset `4% 0 0` to `0`. Reduced motion disables both animations and footer link transitions.
- Links: fine-pointer hover reveals a `1px` underline at `6px` offset over `180ms ease`; inherited keyboard focus remains a `3px` cream outline with `4px` offset. Both decorative layers are `aria-hidden`; the original accessible logo and functional content remain available.

## Inherited design preservation

The addition reuses the shared container, logo, data-driven navigation/phone/map, legal routes, copyright and mobile actions. It introduces no business claims, imagery, global tokens or page composition. The footer values above are component-local overrides; the reference supplies a concept, independently adapted to the clinic's forest/sage palette and local Manrope.

`DESIGN.md`, `.impeccable/design.json`, `HOME-DESIGN.md` and `.impeccable/home-design.json` are preserved byte-identical during this documentation pass. Their existing shared-footer scope statements are supplemented by this component note, without rewriting either system. Fresh finish verdict supplied to this pass: **SHIP**, no fixes; no defect or drift is canonized as a new system rule.
