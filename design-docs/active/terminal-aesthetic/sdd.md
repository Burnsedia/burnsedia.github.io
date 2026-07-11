# Terminal Aesthetic Enhancement

Status: draft
Owner: Bailey Burnsed
Feature ID: TERM-001
Last Updated: 2026-07-11
Related Issues: #1

## Context

The site has a dark synthwave theme and a cyberpunk logo, but the visual identity doesn't yet feel like a "nerd terminal" strongly enough. The brand docs call for "Terminal Synth atmosphere" and "Minimal Dark Engineer discipline" — but the current implementation is a standard dark theme with pink accents. Adding CRT scanlines, ASCII dividers, terminal-prompt widgets, and a build-status bar will make the terminal identity tangible and differentiate the site visually.

## Goal

Transform the visual experience so visitors immediately feel they're on a builder-hacker's terminal, not a generic dark-themed portfolio.

## Non-Goals

- No changes to the existing color palette or darksynthwave theme
- No full-screen terminal emulators or interactive shells
- No heavy JavaScript for visual effects (CSS-only where possible)
- No changes to blog content or layouts

## Requirements

- R1: CRT scanline overlay effect must be CSS-only and respect prefers-reduced-motion
- R2: ASCII divider component with configurable character and length
- R3: TerminalPrompt component with configurable prefix, text, and blinking cursor
- R4: Build-status bar in BaseLayout showing last-deploy timestamp
- R5: All new effects must have zero impact on Lighthouse performance score
- R6: Scanlines must use pointer-events: none so they don't block interaction
- R7: Terminal-style blockquote variant for blog content

## Acceptance Criteria

- TerminalPrompt component renders $ prefix with blinking ▊ cursor
- AsciiDivider component renders a configurable line of characters
- Scanline overlay visible on desktop and mobile, disabled when prefers-reduced-motion
- StatusBar shows deploy timestamp
- npm run build succeeds with no new errors
- Lighthouse performance ≥ 90 after changes

## Risks And Constraints

- Scanline effects can trigger migraines — must respect reduced-motion and have a low-opacity default
- Too many terminal gimmicks can hurt usability — keep effects restrained and purposeful
- CSS-only approach limits animation complexity but ensures no JS perf hit

## Dependencies

- Tailwind CSS v4 (already configured)
- BaseLayout.astro (already exists)

## Notes

- Scanline approach: fixed pseudo-element with repeating-linear-gradient, z-index just below interactive elements
- ASCII divider: <pre> element with monospace font and text-base-content/20 opacity
- TerminalPrompt: inline <span> composition, no layout impact
- Reference inspiration: cool-retro-term, Warp terminal, CRT monitor CSS effects
