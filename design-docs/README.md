# Design Docs

This folder is the source of truth for feature planning and execution.

## Status Flow

`draft -> in-review -> ready -> in-progress -> done -> archived`

## Structure

- `templates/` reusable markdown templates
- `active/<feature-slug>/` in-progress feature docs
- `archive/<feature-slug>/` completed feature docs

## Feature Folder Layout

- `index.md`
- `sdd.md`
- `bdd.md`
- `tdd.md`
- `decision-log.md`

## Feature Naming

Use kebab-case for feature slugs, for example:

- `support-funnel-week-1`
- `support-funnel-week-2`
- `codeblock-theming`

## Required Metadata

Each doc should include:

- `Status`
- `Owner`
- `Feature ID`
- `Last Updated` (YYYY-MM-DD)
- `Related Issues` (short refs like `#45`)

## Active Features

Add new features here as you create them.

| Feature | ID | Status | Issues |
|---|---|---|---|
| support-funnel-week-1 | SUP-001 | draft | #45 #46 #47 #48 #49 #50 #51 |
| support-funnel-week-2 | SUP-002 | draft | #52 #53 #54 #55 #56 #57 #58 |
| codeblock-theming | PLT-001 | draft | #59 #60 #61 #62 |
