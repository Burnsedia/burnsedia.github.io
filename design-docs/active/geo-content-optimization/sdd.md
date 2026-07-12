# GEO Content Optimization

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-005
Last Updated: 2026-07-11
Related Issues: #13

## Context

Generative Engine Optimization (GEO) is about making content easily extractable by AI search engines (ChatGPT, Perplexity, Gemini, Claude). Traditional SEO focuses on crawlers and rankings. GEO focuses on how AI models parse and cite content. Key patterns: question-format headings, front-loaded answers, and definition lists for key terms.

## Goal

Optimize blog post content so AI search engines can easily extract and cite answers — without changing the substance or voice of the writing.

## Non-Goals

- No AI-generated content or keyword stuffing
- No changes to existing structured data
- No removal of existing content
- No changes to post URLs or metadata

## Requirements

- R1: Add question-format H2 headings to posts (e.g., "What is the best stack for an indie dev?")
- R2: Front-load answers — key answer in first paragraph after each heading
- R3: Add definition lists (<dl>) for key technical terms
- R4: Ensure first paragraph of each post contains the core answer
- R5: No more than 2-3 heading changes per post (keep original structure)

## Acceptance Criteria

- Posts have question-format H2s where appropriate
- Key answer appears immediately after each H2/H3
- <dl> elements present for defined terms
- Content voice is unchanged (just structure)
- npm run build succeeds

## Notes

- Priority posts: neovim-made-me-twice-as-fast, Godot-for-Python-Programmers, SaaS-Checklist, CaseStudy-PrivateCloud-AI-Update
- GEO-friendly headings: "How do I [X]?" "What is [Y]?" "Why does [Z] matter?"
- Definition terms: 'productized service', 'sponsorware', 'build in public', 'local-first'
- Reference: Google's structured data guidelines, GEO best practices from Search Engine Land
