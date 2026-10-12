# Homepage tracking entrance

The clinic-name heading is the only text with a new entrance animation. It opens together with the existing photo aperture, giving the cover one coordinated opening sequence. Supporting copy, section headings, service text, navigation and footer receive no new animation.

The visual concept comes from the public live [Animista tracking-in reference](https://animista.net/play/text/tracking-in), whose generated UI was inspected. This implementation adapts the reference: the initial tracking is `-0.18em` rather than `-0.5em`, and the duration is 750ms rather than 700ms. The existing final letter spacing is retained explicitly. This is a credited adaptation of the concept, not an exact copy.

## Behavior

- `.heroTitle` runs `titleTrackingIn` for 750ms with `cubic-bezier(0.215, 0.61, 0.355, 1)`, one iteration and no delay.
- The opening frame uses `letter-spacing: -0.18em` and `opacity: 0`. Opacity reaches 0.6 at 40% and 1 at the end.
- The final tracking uses `--title-tracking`: `-0.04em` on desktop and `-0.035em` at 760px and below. The static heading uses the same property, so it keeps that spacing after the animation.
- The photo retains its existing 850ms `openPhoto` animation, easing and aperture endpoints.
- Under `prefers-reduced-motion: reduce`, both `.heroTitle` and `.heroPhoto` use `animation: none`. The title and photograph appear in their static final presentation.

The production change is confined to `src/app/home.module.css`; it adds no JavaScript, dependencies, components or markup. The scoped design records describe the motion in `HOME-DESIGN.md` and `.impeccable/home-design.json`. Shared `DESIGN.md`, `.impeccable/design.json` and `PRODUCT.md` remain unchanged.

## Verification

Build and lint passed. Browser DOM inspection found one animated main heading, a computed duration of `0.75s` and an iteration count of `1`. At 1440px and 320px viewport widths there was no horizontal overflow. An opening capture recorded heading opacity around 0.047; the completed heading reached opacity 1.

Screenshots are in `.impeccable/review/tracking-in/`: `desktop.png`, `mobile.png`, `desktop-opening.png` and `mobile-opening.png`. Reduced-motion behavior was verified in source; system-level reduced-motion emulation was not tested.

The detector report at `C:/Users/vivas/Documents/Codex/2026-10-11/new-chat/work/tracking-detector.json` contains 69 advisory findings across the whole incumbent homepage CSS: 23 colors, 42 font sizes and 4 radii. It contains no primary findings. Those advisory totals describe the existing stylesheet and do not measure defects in the narrow animation change. Independent review recommended shipping and requested no fixes.
