---
title: "How I use AI as a Senior Developer"
description: "How I intergrate AI into my neovim, linux and devops work"
pubDate: "Jan 24 2026"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["AI", "freelancing", "workflow", "AI workflow", "neovim"]
---

# Intro

As a developer I use AI on a daily basis, from generating boilerplate code to living documentation.

AI is extremely useful but overhyped in my humble opinion. AI can be used to speed up developers or slow them down.

# Problem

Studies have shown that developers feel 20% faster but are actually 19% slower, other studies show AI only speeds senior devs up by 3.6% while having no material impact on joiner devs.

I believe that it depends on how you actually use AI, VibeCoding, AI Augmented coding and AI First Development are terms that get throughn around a lot in developer circles.

When I here VibeCoding, I think that you just Vibe with the AI and blindly use the output of the LLM, it the UI it made feels right, use it, it the UX is right use it, but this create the problem of unmaintable code.

VibeCoding usually creates code that is so bad that there are linkedin job postings to unfuck the VibeCoded sluge that is being pumped out in mass.

AI First Development is in my view a more professional VibeCoding, you are still usng AI coding agents like OpenCode but your are not just blindly trusting the LLM and going with the "Vibes". AI First Development is using LLMs and AI coding agents to rapidly build functions that are repetive and common.

An example of my AI First Development would be when I build a app in Django, I write out my or my clients business requreiments in a document, using a mardkown doc for ease of use, then I create all the models for the app, the user model, and all the other data models one would need for an app. After the models are down then I right tests, then after the dests are writen I use OpenCode to build all the basic CRUD logic of the app.

Most business apps are CRUD with exstra steps, a large persentage of the backend therefor can be build using generic class views in django, allowing me to focuse on the core business logic that is not just crud.

This allows me to get something in front of my client and a working proof of consept done fast.

I often combin this with Template Repos, and AI Augmented Development. This is how I actually see inprovents in my workflow, this have its downsides.

AI can and does still messup in these small, very simple task, I often overcome this by the simple meteric of if the AI cannot oneshoot it, then I do it by hand.

# How do I get the Most out of AI

To get the most out of AI, you need to break the problem down into as small of steps as possbile, this is already best practise for humans. You Design the Contex the AI works in. You manualy write tests to verify the logic, you manualy write the models, to verify data scheam, You only delagate the boilerplate heavy tasks to the AI.

My Flow tends to be AI First Development for the CRUD part of the App, then I transition to AI Augmented Development for the rest of the app.

# Result
