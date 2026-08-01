# Variant: Terminal Session

## Design stance
The homepage IS a terminal window on a live system — every section reads as a shell command (`whoami`, `tail -f`, `uptime --proof`, `ls ~/build-log`). Content-first: the build log is the primary product.

## Key choices
- Layout: single full-width column, terminal chrome bar with traffic-light dots + prompt-style nav
- Typography: mono everywhere (ui-monospace/Hack), pink `$` prompts, cyan paths
- Color: pure black bg, surface panels for windows, pink primary, green live-status dot
- Interaction: typing animation in hero, tabbed build widget (commits / status / next) with live status dot

## Trade-offs
- Strong at: unmistakable brand identity; makes "building in public" tangible; memorable
- Weak at: traditional marketing readability; less conventional for non-dev visitors (clients); mono body text is denser to scan

## Best for
The Burnsedia brand as-is: dev-first audience (GitHub, X/Twitter, YouTube), where the terminal IS the personality. Risk: potential clients may find it too "nerd."
