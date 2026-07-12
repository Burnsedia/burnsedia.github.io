# Schema Markup & 404 Page

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-004
Last Updated: 2026-07-11
Related Issues: #8

## Context

Several interior pages lack BreadcrumbList schema. The Person schema could include more relevant sameAs and knowsAbout entries. There's no custom 404 page — visitors hitting broken links get the default Netlify 404.

## Goal

Expand schema coverage across all pages and create a terminal-themed 404 page that keeps visitors on the site.

## Non-Goals

- No removal of existing schemas
- No changes to the sitemap or robots.txt
- No changes to existing page content

## Requirements

- R1: All interior pages must have BreadcrumbList schema
- R2: Person schema must include knowsAbout + expanded sameAs entries
- R3: 404 page must have terminal-themed "command not found" design
- R4: 404 page must include WebPage schema (not a broken page signal)
- R5: 404 page must link to /products/, /blog/, /membership/, /gallery/

## Acceptance Criteria

- BreadcrumbList schema on about, socials, products pages
- Person schema has knowsAbout with URI references
- 404 page renders with terminal ASCII art
- 404 page returns HTTP 404 status
- npm run build succeeds

## Notes

- knowsAbout values: https://en.wikipedia.org/wiki/Software_development, Artificial_intelligence, Cloud_computing, Open-source_software
- 404 design: ASCII box with "command not found" and suggested commands
- Netlify serves 404.html for unknown routes — Astro outputs this automatically
