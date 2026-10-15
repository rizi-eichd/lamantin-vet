# Fullscreen navigation extension

The shared header now opens a forest fullscreen menu on every route. Seven existing navigation links occupy the left column; the right column pairs genuine local photographs with the existing phone, address, booking action and map link. The composition and page motion draw independently on the annnimate fullscreen-slide-menu concept. The clinic's own imagery, Russian content and routing remain the implementation's source of truth.

This is a component extension within the incumbent cream, forest, chestnut and local Manrope/Lora world. `PRODUCT.md`, `DESIGN.md`, `HOME-DESIGN.md` and their design sidecars retain their authority outside this surface. This note records deliberate menu exceptions without regenerating the shared design system.

## Colors

These values are local to `fullscreen-menu.module.css` and describe the fullscreen surface rather than new global primitives.

| Treatment | Value | Purpose |
| --- | --- | --- |
| Forest panel and overlay | `#18382f` | Fullscreen background and cream-button text |
| Soft cream | `#f7f5f0` | Main navigation, controls, focus outline and booking background |
| Muted light green | `#d9e4d7` | Address, brand subtitle and booking hover |
| Mobile divider | `#56786a` | Separates navigation from contact actions |
| Scrollbar thumb | `#8a9c8f` | Visible internal scrolling on the forest surface |
| Photo fallback | `#2c5151` | Reuses the incumbent forest ink while images load |

The cream booking button reverses the panel colors and uses restrained corners (3px). Other shared buttons retain their existing chestnut treatment and radius.

## Typography

The panel inherits local Manrope through the body. Its large links use medium weight (500), tight tracking (-0.035em) and a compact line height (1.2), producing a clear scan of the seven destinations. Desktop sizing is `clamp(32px, 4vw, 58px)`; at 760px and below it becomes `clamp(28px, 7.8vw, 42px)`. Manrope 500 is included in the root font imports.

The panel brand uses Manrope (18px, weight 600, line height 1.3), with a quiet uppercase subtitle (8px, tracking 0.08em). On mobile these sizes become (14px) and (7px). The closed header retains the incumbent serif logo presentation. Phone digits use tabular numerals with `clamp(20px, 2vw, 28px)`; the address is secondary text (13px desktop, 12px mobile). These choices belong to this menu and do not replace the site's heading scale.

## Layout

The dialog fills the dynamic viewport (`100dvh`). Its top row stays separate from a scrollable body, so the close control remains reachable on short screens. The panel clips its outer overflow; the body uses internal vertical scrolling and contained overscroll.

Desktop body columns use a (1.15:1) proportion, a gap (8vw) and side padding (6vw). The photograph is a flat rectangular crop with height `min(43dvh, 410px)` and a minimum (180px). At 760px and below the body becomes a single column, the photograph is hidden, and contact actions follow a divider. The mobile body has side padding (24px) and a bottom inset of `max(24px, env(safe-area-inset-bottom))`. Navigation rows have minimum heights (56px desktop, 48px mobile); trigger and close targets are at least (44px).

The root layout wraps the header, main, footer and cookie notice in `.site-frame`. The dialog portal sits outside that frame, with the overlay and panel at layers (80) and (90).

## Components

### Opening and closing

`FullscreenMenu` uses the existing Radix Dialog dependency as a controlled modal. The trigger is named «Открыть меню»; the close control is named «Закрыть меню». A visually hidden title and description name the navigation dialog. Radix supplies modal focus containment, Escape dismissal, background scroll locking and focus restoration. The desktop control labels disappear on mobile while their accessible names remain.

On opening, the component records a transform origin at the current scroll position plus 35% of the viewport height, then resets the active photograph to `animals/menu-dog-4k.webp`. The underlying page shifts left (-12vw), tilts (-3deg) and shrinks (scale 0.94), with a (700ms) transition using `cubic-bezier(0.23, 1, 0.32, 1)`. The panel enters from `translateX(105%) rotate(4deg)` over (700ms) with the same easing. Closing reverses the panel motion over (420ms), using `cubic-bezier(0.55, 0, 1, 0.45)`; the overlay fades in over (650ms) and out over (420ms). The closed frame returns to its normal geometry as the opening selector stops matching. Closed panel and overlay states ignore pointer events during their exit.

Under `prefers-reduced-motion: reduce`, panel and overlay animations, page transformation, icon movement, arrow transitions and photo crossfades are disabled. The global rule also disables transitions and smooth scrolling. This branch was checked in source; operating-system preference emulation was not performed.

### Navigation and photographs

The links are rendered directly from `src/data/contacts.ts`, preserving names, order and destinations:

| Destination | URL | Desktop photograph |
| --- | --- | --- |
| Главная | `/` | `animals/menu-dog-4k.webp` |
| Услуги | `/#services` | `animals/menu-dog-4k.webp` |
| Цены | `/#prices` | `favorit-vet-reception.webp` |
| О клинике | `/#about` | `favorit-vet-entrance.webp` |
| Специалисты | `/#team` | `favorit-vet-entrance.webp` |
| Отзывы | `/#reviews` | `animals/menu-dog-4k.webp` |
| Контакты | `/#contacts` | `favorit-vet-entrance.webp` |

Pointer entry and keyboard focus both change the active photograph. Images crossfade (280ms) and are decorative within the navigation dialog (`aria-hidden`, empty alt). Their provenance remains in `public/images/SOURCES.md`: the pets image is a user photograph from the clinic's listing, while the entrance and pharmacy images depict the premises. None establishes staff identities or new clinic claims. The link arrow appears on focus and on hover for a fine pointer, with a short (180ms) transition.

Internal links and booking use `onNavigate` to prevent immediate navigation, save the requested URL and close the dialog. `router.push` runs from `onCloseAutoFocus` after the exit animation and dialog unmount release the scroll lock. This ordering lets anchor positions be measured against the restored page and avoids interference from dialog cleanup. Escape and the close button use normal trigger focus restoration. The phone remains `tel:+74732904684`; the existing map link remains an external link with `noopener noreferrer`.

## Evidence and verification

This documentation pass compared the implementation with `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, the menu TSX/CSS, header, root layout, relevant global styles, contacts data and image sources. It visually inspected the current desktop, mobile and closed-header captures alongside the prior cream mobile-menu capture.

The implementation handoff reports successful build and lint, keyboard Tab looping, photo changes on focus, Escape and close-button focus restoration, booking navigation, and Prices navigation with the target heading approximately (130px) below the viewport top. Browser coverage included desktop (1440×900), mobile (375×812), compact mobile (320×568) and the user's current viewport (372×682). Captures are preserved in `.impeccable/review/fullscreen-menu/`: `desktop.png`, `mobile.png`, `compact.png`, `user.png` and `header.png`. Native recaptures returned (1265×712) for the header and (375×811) for mobile; the finish reviewer accepted that backend capture limitation rather than treating these as the requested CSS viewport dimensions.

The scoped detector reported 21 advisory palette/typography findings and no primary findings. The local values above explain this intentional menu treatment; they do not imply a wholesale design-system change. The implementation handoff confirms existing text and data files against the preceding source archive. The fresh finish review returned **SHIP** with no material UI fixes requested. Build, browser and review outcomes are recorded from that handoff; this documentation pass did not rerun them.

## Incumbent documentation drift

The shared `DESIGN.md` Navigation paragraph still describes compact desktop links and a mobile side dialog with bottom quick actions. Its sidecar navigation sample still depicts compact cream links. Those records describe the previous navigation, whereas the current shared header uses this fullscreen dialog at every width. Their broader palette, typography, product truth and other component rules remain inherited context. This scoped pass reports the mismatch and preserves the root artifacts without repairing them.
