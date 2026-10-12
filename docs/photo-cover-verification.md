# Homepage verification — 12 October 2026

## Scope and preservation

The photo-cover direction supersedes the title above a split photo/action stage. Only src/app/page.tsx and src/app/home.module.css changed in production source relative to the archived pre-homepage baseline. Other routes, globals, navigation, shared booking form, API and clinic data are byte-identical. Every original Russian word and every anchor remains present. JSON-LD and service deep links are preserved.

The real cat/dog, entrance and pharmacy photographs are unchanged. Origins are recorded in public/images/SOURCES.md and existing metadata sidecars. No invented clinicians, reviews, prices or opening hours were introduced.

## Technical checks

- Production build: TypeScript succeeds, 20 pages generated, exit 0.
- ESLint after final correction: exit 0.
- Existing Vitest suite: 22 tests passed, zero failures.
- Responsive DOM checks at requested widths 320, 375, 768, 1024, 1280 and 1920: no horizontal overflow or clipped visible headings. The existing offscreen honeypot is intentionally outside the layout.
- Mobile menu opens; Prices closes it and reaches /#prices.
- Prophylaxis disclosure exposes the vaccination service link.
- Price search «Вакцинация» leaves exactly the matching row.
- FAQ opens with Enter and shows the existing explanation.
- Hero/clinic images load; browser warning/error log is empty.
- Reduced-motion CSS removes the photo entrance and arrow/disclosure transitions. Hover motion requires a fine pointer. HomeReveal wrappers are inert server markup.
- The real booking form was not submitted. Delivery still depends on existing server configuration.

## Visual evidence

Captures: .impeccable/review/photo-cover/desktop.png, mobile.png, about.png and services.png. All opened and validated. Supporting section captures are partial viewport views. Native export dimensions: desktop/about/services 1425×990 and mobile 360×779, from requested overrides of 1440×1000 and 375×812. No approved pixel comp or pixel-exact comparison is claimed.

One correction batch aligned the mobile photo bleed with the real 20px container inset and kept an explicit space in confirmation copy. Final captures confirm the corrections.

## Detector

One invocation for this photo-cover revision: 69 advisories (23 color, 42 font-size, 4 radius); zero non-advisory findings. These are intentional homepage deviations against the preserved global DESIGN.md. HOME-DESIGN.md and its scoped sidecar document the shipped homepage system.

## Independent finish review

Fresh impeccable finish reviewer: **disposition: ship**. Its five contract sections are persistence, fidelity, ceiling, material_fixes and keep. No material fixes requested. All four captures accepted; the reviewer confirms the title/photo/action topology differs, both animal faces remain visible and the asymmetric real photo spread is coherent. This is approval against the supplied photo-cover contract; no Awwwards result or universal design-quality claim is made.

The reviewer specifically confirmed one aperture entrance and inert HomeReveal wrappers, truthful retained content and deliberate homepage overrides. Preserve the photograph, large name, forest field, clinic spread, accessible disclosures and confirmation language.
