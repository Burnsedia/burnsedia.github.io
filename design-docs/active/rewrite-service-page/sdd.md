# Rewrite Service Page Voice

Status: draft
Owner: Bailey Burnsed
Feature ID: CONV-002
Last Updated: 2026-07-11
Related Issues: #4

## Context

The /service/ page reads like a different person wrote it. The homepage says "I build shit that works. No hype. No lock-in." The service page says "Hi, my name is Bailey. I have been writing software for a long time. My job is to help people like you build great software without any hassles." This voice mismatch hurts trust and conversion.

## Goal

Rewrite the service page in the same authentic, direct voice as the rest of the site — matching the "I build shit that works" brand.

## Non-Goals

- No changes to the page URL or layout framework
- No removal of the $4,000/month pricing (keep it)
- No changes to Stripe or Calendly integration

## Requirements

- R1: Hero section must match the homepage voice and tone
- R2: Remove the "I Build Software for:" typing hero (doesn't fit brand)
- R3: Keep the Q&A pricing format but rewrite in first-person
- R4: Remove old project references (Edudate, Dracula, FullerIT, NerdTime, Virtue Tracker, LunarVim)
- R5: Replace third-person bio with first-person voice
- R6: Add FAQPage schema for GEO

## Acceptance Criteria

- Service page reads like the same person who wrote the homepage
- No third-person bio ("Bailey Burnsed is a senior software engineer...")
- No outdated project references
- FAQ schema validates
- npm run build succeeds

## Notes

- Hero copy: "Flat-rate development, no bullshit. $4,000/month. Full-stack. Fixed scope. No hourly tracking."
- Keep the spirit of "How much does it cost to build a mobile app? $4,000/month" format
- Link to /products/ for the full catalog
