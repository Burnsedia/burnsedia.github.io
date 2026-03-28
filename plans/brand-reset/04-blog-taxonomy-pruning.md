# Blog Taxonomy and Pruning Plan

## Objective
Keep the blog authentic, searchable, and aligned with the current brand.

## Taxonomy

### Pillar 1: Godot and Game Systems
- Godot workflows
- GDScript/Python transitions
- Game mechanics and tooling notes

### Pillar 2: Neovim and Developer Workflow
- Neovim setup and productivity
- Automation scripts
- CLI and workflow systems

### Pillar 3: Build in Public Business
- Build logs and postmortems
- Product and pricing experiments
- Open-source growth strategy

## Content Decision Matrix

### Keep Indexed
- Strong personal voice.
- Matches current pillars.
- Has traffic, links, or conversion relevance.

### Rewrite and Keep
- Valuable topic but generic/AI-polished language.
- Low CTR with meaningful impressions.

### Archive to Backup
- Off-brand legacy posts.
- Low strategic value.
- No meaningful traffic or links.

### Noindex (Temporary)
- Unsure whether to keep.
- Useful for transition periods before final archive.

## Immediate Priority URLs to Improve
- `/blog/how-to-use-django-for-multi-tenant-saas/`
- `/blog/godot-for-python-programers/`
- `/blog/adding-authentication-with-djoser-and-simplejwt-updated/`

## Pruning Policy
- Move archive candidates into `backup-AI-Post/` first.
- Maintain a markdown ledger for moved posts and reasons.
- Avoid hard deletion on first pass.

## Redirect and URL Policy
- Use 301 when a replacement page exists.
- Use noindex for short-term uncertainty.
- Use 410 only when content should be permanently removed and has no replacement.

## Internal Linking Model
- Each post links to:
  - one pillar track page,
  - two related posts,
  - one destination CTA (newsletter/project/service as appropriate).
- Add related reading section to all updated posts.

## Publishing Standards
- Every post must include:
  - one real artifact from current work,
  - one concrete takeaway,
  - one internal link and one CTA.

## Review Cadence
- Weekly: classify new content and update link graph.
- Monthly: prune weak content and review pillar coverage.
