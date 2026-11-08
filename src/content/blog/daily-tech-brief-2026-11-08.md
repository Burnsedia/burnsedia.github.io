---
title: "The Daily Tech Brief: Nov 8, 2026"
description: "Claude Code's don't-ask-again setting leaked 2,539 secrets to public GitHub, Microsoft killed its AI Frontiers research group, every Mac ships an undocumented family classifier, your iPhone keeps a 100,000-word grey list, and Discord ditched Electron. Today's tech news, tldr."
seoTitle: "Daily Tech Brief Nov 8, 2026: Claude Code secret leak, Microsoft kills AI Frontiers, Apple grey list"
seoDescription: "Today's biggest tech stories: Claude Code's saved approvals leaking 2,539 secrets on GitHub, Microsoft Research shutting down AI Frontiers, the undocumented kinship classifier in every Mac, the iPhone grey list of 100,000 phrases, an AI disproof of the Exponential Time Hypothesis, and Discord's Rust client."
pubDate: "2026-11-08"
heroImage: "/memes/buzz-secrets-everywhere.png"
tags: ["claude code", "secrets leak", "microsoft research", "apple intelligence", "apple grey list", "discord", "electron", "openai", "anthropic", "daily brief", "tech news"]
schema: "article"
faq:
  - question: "Did Claude Code really leak secrets to public GitHub?"
    answer: "Yes, per Apiiro's research. Picking 'Yes, and don't ask again' saves the full approved command verbatim to .claude/settings.local.json, which is never added to .gitignore. Apiiro found 1,122 public copies holding at least one secret, 2,539 total secrets across 1,994 repos counting history and shared settings."
  - question: "What was Microsoft Research's AI Frontiers group?"
    answer: "A roughly 50-person group founded in 2023 behind the Autogen multi-agent framework and the Fara computer-use agent. It was folded into Microsoft AI in September 2026 and shut down; John Langford announced he is leaving Microsoft."
  - question: "Does my Mac really infer my family tree?"
    answer: "Per Eighth Rank's writeup, every Mac since macOS 13 (2022) ships a pair of daemons that build a personal knowledge graph about you, including an XGBoost kinship classifier with predicates like has mother, has father, and spouse. It is undocumented."
  - question: "What is Apple's iPhone grey list?"
    answer: "A hard-coded table of more than 100,000 words and phrases, found by researcher Derik Kauffman and reported by the Guardian, that iOS predictive text will not autocomplete. It covers drugs and sexual terms plus political phrases like Trayvon Martin and Kashmir dispute. Apple says the keyboard avoids offensive suggestions and users can still type anything themselves."
  - question: "Did an AI really disprove the Exponential Time Hypothesis?"
    answer: "An OpenAI model produced a natural-language disproof of the 1998 conjecture that passed machine checks, and a separate Anthropic proof was also machine-verified. Both are under human expert review, so treat it as probable, not settled."
---

Sunday is not quiet. Here is today's tech news, tldr.

![Toy Story secrets everywhere meme: Claude Code's saved approvals leaking credentials across public GitHub](/memes/buzz-secrets-everywhere.png)

## Claude Code's "don't ask again" leaked 2,539 secrets to public GitHub

When you pick "Yes, and don't ask again" in Claude Code, it saves the full approved command, verbatim, to .claude/settings.local.json. Passwords, API keys, tokens, all of it. Claude Code never adds that file to your project's .gitignore.

Apiiro scanned public GitHub and found 104,185 copies of the file. About 1.1% of them, 1,122 copies, hold at least one secret. Count shared settings files, git history, and saved agent chat logs and the total hits 2,539 secrets across 1,994 repos: 379 database passwords, 23 AWS keys, 43 SSH logins, GitHub and npm tokens.

Half of those files sat on a default branch for at least 217 days. Deleting the file does not fix it, because it lives on in history and forks. The only real fix is rotating everything.

Of the 16 coding agents Apiiro compared, Claude Code is the only one confirmed to save the full approved command into a project file by default. I run Claude Code every day. If you do too, check your repos today.

[Source](https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again) and [reporting](https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html)

![Drake meme: rejecting reading what the agent saves, approving just clicking don't ask again](/memes/drake-dont-ask-again.png)

## Microsoft killed its AI Frontiers research group

John Langford, the Microsoft Research veteran behind Vowpal Wabbit, posted "The End of AI Frontiers" on November 6. The roughly 50-person group he helped found in 2023, the team behind the Autogen multi-agent framework and the Fara computer-use agent, got folded into Microsoft AI in early September and is now finished.

His reason: the ex-Inflection leadership running Microsoft AI believes in scaling and is "aggressively not research." Work like Next Latent and the Full Bandwidth Transformer could not get seriously considered. Langford is leaving Microsoft too.

Research orgs are cheap to kill and expensive to rebuild. Microsoft just traded the team that built Autogen for more headroom on the scaling curve.

[Source](https://hunch.net/?p=13764006)

## Every Mac ships an undocumented family-member classifier

A writeup from Eighth Rank (Dario Pasquini and Michał Bazyli) shows every Mac since macOS 13 in 2022 ships a pair of daemons whose job is building a personal knowledge graph about you and the people around you. It runs an XGBoost kinship classifier with predicates like "has mother," "has father," and "spouse."

None of this is documented. It is on by default, on your machine, inferring your family tree from your contacts, photos, and calendar.

[Source](https://8rank.ai/game/apple-intelligence-personal-knowledge-graph)

![Fry meme: not sure if my Mac is mine or Apple's family researcher](/memes/fry-mac-family-graph.png)

## Your iPhone keeps a 100,000-word grey list

The Guardian reports that researcher Derik Kauffman found a hard-coded table inside iOS holding more than 100,000 words and phrases Apple's predictive text refuses to complete. Drugs and sexual terms, sure. Also "Trayvon Martin," "Kashmir dispute," "male chauvinist pig," "Dictator Trump," and, in a moment of corporate self-protection, "iMessage isn't working."

Swipe-typing trips on the list. "United Ireland" comes out as "United Iceland." Kauffman called it a "light-touch form of censorship." Apple's response: the keyboard is designed to avoid offensive suggestions, and you can always type the words yourself.

Your phone has opinions about which phrases exist, and it will not show you the list.

[Source](https://www.theguardian.com/technology/2026/nov/06/struggling-to-spell-male-chauvinist-pig-apple-grey-list-means-your-iphone-wont-help-you)

## OpenAI's model disproved a 1998 math conjecture

Cade Metz reports in the NYT that an OpenAI model produced a natural-language disproof of the Exponential Time Hypothesis, a conjecture Russell Impagliazzo co-proposed in 1998. Impagliazzo called it "shocking news." A separate Anthropic proof exists too. Both passed machine checks and are now under human expert review, including by MIT's Ryan Williams.

Machine-checked is not human-accepted, so treat it as probable, not settled. If it holds, the long-run fallout touches chip design and current encryption assumptions. Years away, but real.

[Source](https://www.nytimes.com/2026/11/06/science/ai-exponential-time-hypothesis.html)

## Discord dumped Electron, and it shows

Discord co-founder and CTO Stanislav Vishnevskiy posted a side-by-side of the current Electron client and the new Rust client, called Discord Phoenix. The Rust app had the friends list loaded before Electron got past its loading screen. 290.2MB of RAM with two accounts signed in, roughly 70% less than the Electron build.

Windows apps spent a decade shipping a browser with every install. Discord just showed the way back.

[Source](https://www.windowslatest.com/2026/11/06/every-windows-11-app-should-kill-electron-and-discord-just-showed-why-no-starting-screen-and-70-less-ram-even-with-two-accounts-signed-in/)

## Anthropic's agents now "dream"

Anthropic's November 6 research post breaks agent memory into layers. Claude writes salient memory notes during sessions. Stronger models like Opus 5.5 judge what counts as salient. Then "dreaming" consolidates the knowledge while the agent is idle, the first public description of how Anthropic consolidates agent memory offline.

Useful, and a little unsettling. Your agent does homework while you sleep now. What it decides to remember is the new attack surface.

[Source](https://www.anthropic.com/research/components-of-agent-memory)

![Roll Safe meme: can't leak secrets if you never trust the defaults](/memes/rollsafe-defaults.png)

## The through-line: defaults

Every story today is about defaults. Claude Code defaults to saving your secrets in a file it never gitignores. macOS defaults to mapping your family. iOS defaults to a list of phrases your keyboard pretends do not exist. Microsoft defaults to scaling over research. Agents default to remembering, and now to consolidating while idle.

Defaults are decisions someone else made for you. Read your settings files. Gitignore your agent state. Own your stack, or someone else's roadmap owns it for you.

*Written from live sources on Nov 8, 2026: the Hacker News front page and the primary reports linked inline.*
