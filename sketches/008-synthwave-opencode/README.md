# Variant: Synthwave OpenCode

## Design stance
The true blend: your current site's identity (hexagon logo, darksynthwave palette, pink primary, "I build shit that works" + typing) inside OpenCode's website structure and chrome (monospace, sharp corners, flat borders, hero badge + tabs, stat figure band, FAQ accordion, subscribe block).

## Key choices
- Layout: keeps your current hero grid (hexagon left, text right) and the About → Projects → Build Log → split-CTA section order, then adds OpenCode's hero badge, offer tabs under the hero, stat band, FAQ, and newsletter
- Typography: monospace everywhere (Berkeley Mono stack) like opencode.ai — bigger shift than colors
- Color: your exact oklch tokens from global.css — black bg, pink primary, cyan secondary, amber tertiary, green status
- Interaction: offer tabs (dev/saas/games/support), FAQ accordion, count-up stats, newsletter success state

## Trade-offs
- Strong at: keeps the brand you built while borrowing OpenCode's structure and vibe; the tabs pattern surfaces all 4 revenue streams right under the hero — perfect for the content-business pivot; feels like a dev tool product
- Weak at: monospace body text is denser than your current sans; sharp corners replace DaisyUI's rounded boxes (closest to OpenCode's look, but a real change from today)

## Best for
The strongest candidate for "my current site + the opencode website" — your brand, their skeleton.

## Recommended hybrid tweak (if you pick this)
Keep the sharp-corner chrome but let blog prose stay sans-serif for readability — mono for labels/headings, sans for paragraphs. Best of both.
