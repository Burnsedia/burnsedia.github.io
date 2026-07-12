# HowTo Schema for Blog Posts

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-002
Last Updated: 2026-07-11
Related Issues: #6

## Context

Tutorial-style blog posts (Neovim setup, Godot tutorial, SaaS checklist) have clear step-by-step instructions but no HowTo schema markup. AI search engines pull HowTo structured data directly into generative answers — a user asking "how do I set up Neovim" could get steps from the site cited in the AI response.

## Goal

Add HowTo structured data to tutorial blog posts so AI search engines can surface step-by-step instructions.

## Non-Goals

- No schema on non-tutorial posts (opinion pieces, manifestos, case studies)
- No changes to blog post content or structure
- No forcing every post to fit HowTo format

## Requirements

- R1: Create reusable HowToSchema component
- R2: Identify blog posts suitable for HowTo schema (numbered steps, tutorial structure)
- R3: Add HowTo schema to at least 3 posts
- R4: Steps must have clear names and descriptions
- R5: Conditionally render based on post frontmatter or detected structure

## Acceptance Criteria

- HowToSchema component exists
- At least 3 blog posts have HowTo schema that validates
- Google Rich Results Test shows HowTo schema
- npm run build succeeds

## Notes

- Suitable posts: neovim-made-me-twice-as-fast, Godot-for-Python-Programmers, Python-Pytest, SaaS-Checklist
- Add a `schema: howto` optional field to blog content collection schema in src/content.config.ts
- Steps extracted from H3 headings in markdown content
