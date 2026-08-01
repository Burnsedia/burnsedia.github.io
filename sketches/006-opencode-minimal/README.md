# Variant: OpenCode Minimal

## Design stance
The safest upgrade: your current layout and content exactly as-is (hexagon hero + typing, About, project cards, 6-post build log grid, count-up stats, two-column CTA), with OpenCode restraint applied as chrome — numbered mono section tags (01 about / 02 active builds / 03 build log / 04 receipts / 05 hire), a quiet ⌘K palette trigger, and the bottom status bar. Sans-serif body stays readable; mono is reserved for labels, dates, tags, and numbers.

## Key choices
- Layout: identical to the live site — nothing moved, only restyled
- Typography: system sans for body (readable), mono for labels/tags/dates/stats
- Color: same palette, pink used more sparingly (numbers, active nav, prompts)
- Interaction: ⌘K palette, count-up stats, hover states matching current cards (border → primary)

## Trade-offs
- Strong at: minimal risk — content, hierarchy, and SEO structure unchanged; still gets the OpenCode feel via chrome; friendliest to non-dev visitors
- Weak at: least dramatic of the three; if you want the OpenCode identity to be unmistakable, this is the subtle version

## Best for
Shipping the redesign quickly with the content business intact and the OpenCode vibe as garnish rather than the whole dish.
