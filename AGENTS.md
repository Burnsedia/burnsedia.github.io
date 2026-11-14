# AGENTS.md
Guidance for coding agents working in this repository.

## Project Snapshot
- Framework: Astro 6 (installed 6.1.1) with static output and TypeScript strict mode.
- UI stack: Tailwind CSS v4 + DaisyUI.
- Component mix: `.astro` primary, with React and Vue integrations available.
- Content system: Astro content collections (`blog`, `courses`) defined via glob loaders in `src/content.config.ts`. There is **no `projects` collection** — don't invent one.
- Deployment target: Netlify (`netlify.toml` publishes `dist/`).
- Node version: `24.2.0` (`.nvmrc`, Netlify env).

## Design authority: DESIGN.md

`DESIGN.md` (front-matter + prose) is the design authority — enforce it over framework defaults:
- **Dark only.** No light mode, theme toggle, or light surfaces (`color-scheme: dark`).
- **Flat. No shadows.** Depth comes from borders (`border-base-content/10`) and `surface`/`surface-raised` layering, never `shadow-*`.
- **System fonts.** System sans stack for prose; `font-mono` only for terminal elements. No web-font dependency.
- **Palette.** Electric pink is the sole interaction color; cyan/amber/purple are secondary. Don't add new colors.

## Repository Layout
- `src/pages/`: route files (`index.astro`, `[...slug].astro`, etc.).
- `src/layouts/`: page shell/layout components.
- `src/components/`: reusable UI blocks.
- `src/content/`: markdown content + collection schemas.
- `src/styles/global.css`: Tailwind + DaisyUI setup and theme tokens.
- `astro.config.mjs`: Astro and integrations configuration.
- `tsconfig.json`: extends `astro/tsconfigs/strict`.

## Install And Local Dev
```bash
npm install
npm run dev
```
- `npm run start` is an alias for `npm run dev`.

## Build, Lint, And Test Commands
This repo has no dedicated npm scripts for lint/test; use Astro CLI directly.

### Build
```bash
npm run build
```
- Produces static output in `dist/`.
- Same command used by Netlify deploy build.

### Preview Production Build
```bash
npm run preview
```

### Lint / Typecheck (Primary Gate)
```bash
npm run astro -- check
```
- Treat this as the main lint + type validation command.
- `astro check` emits many **pre-existing hints** (mostly astro(4000) about inline `<script>` blocks). These are informational, not blocking — don't "fix" pre-existing ones unless in-scope.

### Optional Utility Commands
```bash
npm run astro -- sync
npm run astro -- check --minimumFailingSeverity warning
```
- `sync` regenerates content collection types.
- Severity flag can make checks fail on warnings.

## Single-Test / Targeted Validation
There is currently **no automated test framework configured** (`vitest`, `jest`, `playwright`, etc.).
No `*.test.*` or `*.spec.*` files are present.

When asked to run a single test:
- Explicitly state single-test execution is not available yet.
- Use narrowest substitutes:
  - `npm run astro -- check` for diagnostics/type issues.
  - `npm run build` for route/content/build integrity.
- If a test runner is later added, prefer:
  - single file: `npx vitest run path/to/file.test.ts`
  - single case: `npx vitest run -t "test name"`

## Current Baseline Status
- `npm run build` succeeds (with warnings/hints).
- `npm run astro -- check` currently fails on pre-existing repo errors.
- Do not assume a clean diagnostic baseline before edits.
- Focus on avoiding new diagnostics in touched files.

## Code Style Guidelines

### General
- Keep edits minimal, scoped, and aligned with nearby patterns.
- Favor readability and straightforward logic over abstraction.
- Remove dead code and unused imports when touched.

### Imports
- Keep imports at the top of frontmatter/script blocks.
- Order imports: framework/runtime, local components, local utils/styles.
- Use type-only imports where required by TS settings.
  - Example: `import { getCollection, type CollectionEntry } from 'astro:content';`
- Prefer consistent relative import style inside a file.

### Formatting
- Use semicolons in TS/JS contexts.
- Prefer single quotes in TS/JS unless file context strongly differs.
- Keep line length readable; wrap long attributes/objects.
- Keep indentation style consistent within each edited file.
- Preserve frontmatter and markdown formatting in content files.

### Types And Type Safety
- Assume strict TypeScript at all times.
- Avoid implicit `any`; annotate props and function params.
- Type `.astro` props explicitly where practical.
- Guard nullable DOM lookups (`getElementById`, `querySelector`) before use.
- Prefer narrow, explicit types for collection and route data.

### Astro Conventions
- Use `.astro` for static/server-rendered UI.
- Use `client:*` hydration only on framework components (React/Vue), not Astro components.
- Keep page data loading in route files or layout frontmatter.
- Prefer `getCollection` patterns aligned with `src/content/config.ts` schemas.

### Naming
- Components/layouts: PascalCase filenames (`ProjectCard.astro`).
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE (`SITE_TITLE`).
- Routes: Astro conventions (`index.astro`, `[...slug].astro`).
- Avoid filenames that differ only by casing.

### Styling
- Prefer Tailwind utility classes and DaisyUI components.
- Reuse theme variables and patterns from `src/styles/global.css`.
- Avoid inline styles unless truly local and one-off.
- Keep class lists readable; extract repeated UI into components.

### Content And Collections
- Keep frontmatter aligned with the schemas in `src/content.config.ts` (content lives in `src/content/blog/` and `src/content/courses/`). Required: `title`, `description`, `pubDate`.
- Use date values parseable by schema transforms.
- Preserve existing slugs/filenames unless migration is intentional.

### Error Handling And Reliability
- Prefer guards/early returns for invalid state.
- Handle nullable values safely; avoid unsafe non-null assertions.
- Keep browser-only APIs out of server execution paths.
- External scripts/analytics should fail safely without breaking pages.

### Accessibility And SEO
- Preserve semantic heading order and landmarks.
- Ensure meaningful `alt` text on content-bearing images.
- Preserve metadata flow through `BaseHead` and layouts.
- Do not remove sitemap/rss behavior without explicit requirement.

## Commits

- Use **conventional commits** (`feat:`, `fix(seo):`, `chore:`, `content:`) — matches existing history.
- **Commit each change as its own commit.** Keep edits atomic; never bundle unrelated changes.

## Operational gotchas

- **Netlify CSP (netlify.toml).** `script-src`/`img-src`/`connect-src`/`style-src` are locked down. Any new external resource (analytics, GitHub API, fonts, third-party images) must be added to CSP or it is silently blocked at runtime.
- **GA4** uses a hardcoded GA ID (`G-LRMSZ4V1XG`) baked into `src/components/shared/BaseHead.astro`; the `PUBLIC_GA_ID` env var is set but not templated into the script tag.
- **`.opencode/` is a tracked nested project** (its own `package.json` + `node_modules` + agents). It's config, not build input — don't delete it or treat its deps as the app's.

## Agent Workflow Expectations
- Read related files before major edits; match local conventions.
- After behavior changes, run `npm run build` at minimum.
- For type-sensitive edits, run `npm run astro -- check` and report deltas.
- If checks fail due to baseline issues, note whether new failures were introduced.
- Avoid broad refactors unless explicitly requested.

## Cursor / Copilot Rules Audit
Checked repository instruction locations:
- `.cursorrules`: not found.
- `.cursor/rules/`: not found.
- `.github/copilot-instructions.md`: not found.

If these files are added later, treat them as higher-priority project guidance and update this file.
