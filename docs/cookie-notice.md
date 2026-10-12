# Cookie notice extension

This scoped addition implements the request «сделай файлы куки» through an informational notice and the `/cookies` explanation page. It records acknowledgement of the notice. The implemented site has no connected analytics counters or advertising cookies, and «Понятно» does not enable tracking. This document describes the implementation; it makes no legal compliance claim.

## Inherited product and design

`PRODUCT.md` establishes the clinic identity, Russian copy, existing booking workflow and the need to preserve factual information. Its legal documents remain explicit drafts requiring operator details. The cookie page explains the implemented browser storage and links to the existing privacy document without supplying new operator facts.

`DESIGN.md` supplies the cream foundation, forest text, chestnut actions, local Manrope/Lora pairing and readable document layout. The notice reuses these colors and the existing small `Button`; the explanation page reuses the breadcrumb, page introduction and legal article surface. No new visual identity, imagery, navigation system or button primitive is needed. The floating notice is a local component treatment, rather than a new global elevation rule.

`PRODUCT.md`, `DESIGN.md`, `HOME-DESIGN.md`, `.impeccable/design.json` and `.impeccable/home-design.json` are preserved during this documentation pass. The scoped note supplements the inherited systems without regenerating their tokens or sidecars.

## Implemented behavior

- `CookieNotice` is mounted once in the shared root layout after the footer. Its initial server/client render is absent; an effect schedules a `requestAnimationFrame` check of `document.cookie`. The notice appears when the exact current acknowledgement is absent, invalid or unreadable.
- The acknowledgement is `zp_cookie_notice=v1`, written only when «Понятно» is pressed. Attributes are `Max-Age=15552000` (180 days), `Path=/` and `SameSite=Lax`; HTTPS adds `Secure`. No `Domain` attribute is supplied, so the cookie belongs to the current host. It contains a version marker, without a name, phone number, pet details or booking contents.
- A successful or blocked storage write closes the notice for the current mounted session. Storage read/write exceptions are caught. If the browser prevents persistence, the notice can return after a page reload; deleting or expiring the cookie also allows it to return.
- «Настройки cookie» in the footer and on `/cookies` dispatches `zooprofi:cookie-notice`, reopening the same notice even when the acknowledgement exists. Reopening remembers the active element; acknowledgement restores focus to it if it remains connected. Reopening does not remove the cookie or create tracking preferences.
- The notice is a named, nonmodal `section`, with its heading connected through `aria-labelledby`. It has no backdrop, focus trap or automatic focus move. Its actions are the `/cookies` link and «Понятно» button.
- `/cookies` describes the stored marker, duration, lack of analytics/advertising and browser removal/blocking controls. It includes a reopening button and privacy link. The privacy page links back to `/cookies` with explicit whitespace before its inline link. The cookie page sets robots to `index: false, follow: false`.

## Visual implementation

The cream notice uses inherited forest text and a chestnut small primary button. Its title uses Manrope (20px, line-height 1.3, tracking -0.015em); paragraph text is (14px, line-height 1.65). The details link is underlined (13px, 4px underline offset), with a minimum (44px) target. The button inherits the existing minimum (44px) height, padding (12px 18px), font size (13px) and (10px) corners.

On desktop the notice is fixed (24px) from the left and bottom, at `z-index: 60`, with width `min(440px, calc(100% - 48px))`, padding (24px) and corners (12px). Its local shadow is `0 12px 32px rgb(24 56 47 / 20%)`. Maximum height `calc(100dvh - 160px)` and vertical scrolling keep the content reachable on shorter screens. The action row uses flex alignment, space-between, a (16px) gap and (20px) top margin.

At (760px) and below, horizontal offsets become (12px), width is `calc(100% - 24px)`, padding is (20px) and the action gap is (12px). Bottom placement is `calc(88px + env(safe-area-inset-bottom))`, above the existing fixed mobile call/booking actions at `z-index: 55`. Maximum height becomes `calc(100dvh - 190px - env(safe-area-inset-bottom))`.

The reopening button inherits footer typography/color or document body styles, with transparent background, an underline and a minimum (44px) height. Shared keyboard focus remains a (3px) contrast outline at (4px) offset; the footer supplies its existing cream outline. The notice adds no arrival animation. Button hover/press transitions and reduced-motion behavior come from the existing global rules.

The explanation page inherits Lora headings, Manrope body copy, the centered document column (850px), white article surface, (16px) corners and desktop padding (40px 48px 56px). On mobile its article padding becomes (24px), using the existing responsive document typography and container.

## Source and verification evidence

Behavior sources: `src/components/cookie-notice.tsx`, `src/lib/cookie-notice.ts`, `src/app/layout.tsx`, `src/components/footer.tsx`, `src/app/cookies/page.tsx` and `src/app/privacy/page.tsx`. Visual sources: `src/components/cookie-notice.module.css`, `src/components/ui/button.tsx` and `src/app/globals.css`.

`src/lib/cookie-notice.test.ts` contains eight cases covering the exact current marker, five absent/invalid variants, host-only duration/path/SameSite attributes and the HTTPS Secure flag. The implementation session reports 30 tests passed, including these eight, plus successful production build and lint after the inline whitespace correction. These results are supplied by the implementation session; this documentation pass does not rerun or reinterpret them.

The parent review reports the final verdict **SHIP**, with the sole inline-spacing fix resolved and the browser DOM showing `zp_cookie_notice со` correctly. Final desktop/mobile notice and document captures are in `.impeccable/review/cookies/desktop.png`, `mobile.png`, `document-desktop.png` and `document-mobile.png`. Screenshots are preserved. Its source archive comparison confirms four existing integration files changed (layout, global styles, footer and privacy page), while the homepage, API, data and logo remain unchanged.
