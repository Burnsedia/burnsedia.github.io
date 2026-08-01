# Variant: OpenCode Session

## Design stance
The homepage IS an OpenCode session — a chat with the builder. Left sidebar is the file tree (projects, build log entries, commerce folders), the main pane is a conversation: visitor asks, burnsedia answers with live data, stats render as command output, projects as cards, posts as log rows. A composer input at the bottom lets visitors "ask the build log" (demo: appends a canned reply).

## Key choices
- Layout: title bar + sidebar (250px, hidden on mobile) + chat scroll + composer + status bar
- Typography: monospace throughout, 12-14px terminal scale
- Color: same palette; visitor avatars cyan, burnsedia avatars pink
- Interaction: composer (Enter appends a message pair), ⌘K palette, count-up chips, sidebar file-tree navigation

## Trade-offs
- Strong at: the most distinctive and memorable take; perfectly matches OpenCode's actual UI; content-as-conversation fits the content-business pivot
- Weak at: most radical departure from a conventional site; sidebar eats mobile space (hidden <760px); a real implementation needs either a static scripted conversation or an actual chat backend
- Best for: making a statement. The "wow" variant that a dev audience will immediately recognize and talk about.

## Best for
A flagship homepage where recognition matters more than convention — and where the build log is genuinely the product.
