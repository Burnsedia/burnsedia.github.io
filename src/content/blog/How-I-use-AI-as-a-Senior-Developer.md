---
title: "How I Use AI as a Senior Developer"
description: "My practical AI workflow in Neovim, Linux, and DevOps: what I delegate, what I never do, and how I apply it across my products."
pubDate: "2026-07-30"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["AI", "workflow", "neovim", "indie dev", "tools"]
---

# How I Use AI as a Senior Developer

AI is useful. I use it every day.

It is also overhyped. Used wrong, it slows you down and leaves you with code debt.

The way I see it: AI is leverage, not judgment.

## The Problem

The problem is not AI itself. The problem is using AI without a system.

A lot of devs slide into what people call "vibe coding": prompt the model, copy output, ship if the UI feels right. That might look fast in the moment, but it usually creates unmaintainable code and cleanup work later.

You can see the same pattern in research: some studies show devs feel faster while output quality or actual speed does not match that feeling. So the question is not "Is AI good or bad?" The real question is how you use it.

## My System

My workflow is simple and repeatable.

First, I write requirements in Markdown — for client work or my own products like boomerbill or BulkPost.
Then I define the data models manually.
Then I write tests manually.
Only after that do I use Codex or OpenCode to scaffold repetitive CRUD logic.

Most business apps are CRUD with extra steps. So I let AI handle repetitive scaffolding and boilerplate, while I focus on the parts that actually matter: business rules, architecture, and edge cases.

In Django terms: models and tests are human-owned, CRUD scaffolding is AI-assisted, core domain logic is human-led.

I combine this with template repos and custom agents in my Neovim workflow. That gives me speed without giving up control.

For my products — BulkPost's agent stack, boomerbill's billing engine, Dracula's offline architecture — AI writes the repetitive layers. I design the systems.

## My Rules

I run AI with hard guardrails:

- If it cannot one-shot the task, I do it by hand.
- I own schema and tests manually.
- I do not blindly delegate business-critical logic.
- Every AI-generated change gets reviewed before merge.
- I break work into small steps and design context on purpose.

These rules are what stop "AI help" from turning into long-term tech debt.

## What This Gets Me

This approach helps me ship proof-of-concepts faster, get working software in front of users earlier, and avoid a lot of refactor pain later.

AI still messes up simple tasks sometimes. That is normal. The point is to have a system that catches it early and keeps quality high.

## Final Thought

AI will not replace engineering judgment. It amplifies it.

If you are going to use AI in production work, do not run on vibes. Run a system.
