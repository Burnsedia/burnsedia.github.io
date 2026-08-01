# Variant: OpenCode Terminal

## Design stance
Your current homepage structure, restyled as a full OpenCode-style terminal app: sticky title bar, ⌘K command palette, monospace throughout, and OpenCode's signature bottom status bar (`● nerdtime main · 6 commits this week · ? for help`).

## Key choices
- Layout: identical section order to the live site — hero (hexagon + typing) → about → 3 project cards → build log → stats → two-column CTA. Only the chrome changed.
- Typography: monospace for everything (ui-monospace/JetBrains Mono/Hack)
- Color: same darksynthwave palette; pink reserved for prompts, status, and the primary CTA
- Interaction: ⌘K/ctrl+K command palette (fuzzy filter, arrow keys, Enter), count-up stats, typing hero, project cards with status dots (active/live/dev)

## Trade-offs
- Strong at: unmistakable OpenCode identity; keeps all current content and section flow; the status bar makes "building in public" literal
- Weak at: monospace body text is denser; terminal chrome might read as "tool" to non-dev visitors (clients)

## Best for
The full OpenCode commit — you wanted the feel, this is the maximal version of it. Best if the audience is devs and the brand is the personality.
